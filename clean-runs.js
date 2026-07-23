import readline from 'readline';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

// Helper to extract owner and repo from git URL
function parseGitUrl(url) {
    if (!url || typeof url !== 'string') return null;
    let cleanUrl = url.replace(/^git\+/, '').replace(/\.git$/, '');
    
    // Match patterns like:
    // https://github.com/owner/repo
    // git@github.com:owner/repo
    let match = cleanUrl.match(/github\.com[\/:][^\/]+\/[^\/]+/);
    if (match) {
        const parts = match[0].split(/[\/:]/);
        return {
            owner: parts[1],
            repo: parts[2]
        };
    }
    return null;
}

// Locate package.json and extract repo info
function getRepoInfo() {
    const pathsToTry = [
        path.join(process.cwd(), 'package.json'),
        path.join(path.dirname(fileURLToPath(import.meta.url)), 'package.json')
    ];

    for (const p of pathsToTry) {
        try {
            if (fs.existsSync(p)) {
                const pkg = JSON.parse(fs.readFileSync(p, 'utf8'));
                
                // Try repository object/string first
                if (pkg.repository) {
                    const url = typeof pkg.repository === 'string' ? pkg.repository : pkg.repository.url;
                    const parsed = parseGitUrl(url);
                    if (parsed) return parsed;
                }
                
                // Fallback to package name if repository field is missing
                if (pkg.name) {
                    return {
                        owner: "keshavsoft", // Default owner
                        repo: pkg.name
                    };
                }
            }
        } catch (e) {
            // Ignore error and try next path
        }
    }
    return null;
}

// Locate and load .env file manually into process.env
function loadEnv() {
    const pathsToTry = [
        path.join(process.cwd(), '.env'),
        path.join(path.dirname(fileURLToPath(import.meta.url)), '.env')
    ];

    for (const p of pathsToTry) {
        try {
            if (fs.existsSync(p)) {
                const content = fs.readFileSync(p, 'utf8');
                content.split(/\r?\n/).forEach(line => {
                    const trimmed = line.trim();
                    if (trimmed && !trimmed.startsWith('#')) {
                        const parts = trimmed.split('=');
                        const key = parts[0].trim();
                        const val = parts.slice(1).join('=').trim().replace(/^['"]|['"]$/g, '');
                        process.env[key] = val;
                    }
                });
                break;
            }
        } catch (e) {
            // Ignore
        }
    }
}

async function main() {
    console.log("=== GitHub Actions Workflow Runs Cleaner ===");

    if (typeof fetch === 'undefined') {
        console.error("Error: 'fetch' is not defined. Please run this script using Node.js version 18 or higher.");
        rl.close();
        return;
    }

    loadEnv();

    const repoInfo = getRepoInfo();
    if (!repoInfo) {
        console.error("Error: Could not locate a valid package.json with repository information.");
        rl.close();
        return;
    }

    const { owner, repo } = repoInfo;
    console.log(`Target Repository: ${owner}/${repo}`);
    
    let token = process.env.GITHUB_TOKEN;
    let runs = [];
    let fetched = false;

    // First try GITHUB_TOKEN from process.env (silently)
    if (token) {
        try {
            const url = `https://api.github.com/repos/${owner}/${repo}/actions/runs?per_page=100`;
            const response = await fetch(url, {
                headers: {
                    "Accept": "application/vnd.github+json",
                    "Authorization": `Bearer ${token}`,
                    "X-GitHub-Api-Version": "2022-11-28",
                    "User-Agent": "NodeJS-Fetch"
                }
            });
            if (response.ok) {
                const data = await response.json();
                runs = data.workflow_runs || [];
                fetched = true;
            }
        } catch (err) {
            // Ignore error and fall back to prompting
        }
    }

    // Prompt if process.env GITHUB_TOKEN failed or was missing
    if (!fetched) {
        token = await question("Enter your GitHub Personal Access Token (PAT) with actions:write scope: ");
        if (!token) {
            console.error("Error: GitHub Token is required.");
            rl.close();
            return;
        }

        console.log(`\nFetching workflow runs for ${owner}/${repo}...`);
        try {
            const url = `https://api.github.com/repos/${owner}/${repo}/actions/runs?per_page=100`;
            const response = await fetch(url, {
                headers: {
                    "Accept": "application/vnd.github+json",
                    "Authorization": `Bearer ${token}`,
                    "X-GitHub-Api-Version": "2022-11-28",
                    "User-Agent": "NodeJS-Fetch"
                }
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch runs: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            runs = data.workflow_runs || [];
        } catch (error) {
            console.error("An error occurred during fetch:", error.message);
            rl.close();
            return;
        }
    }

    if (runs.length === 0) {
        console.log("No workflow runs found.");
        rl.close();
        return;
    }

    console.log(`Found ${runs.length} workflow runs. Starting deletion...`);

    try {
        for (const run of runs) {
            const deleteUrl = `https://api.github.com/repos/${owner}/${repo}/actions/runs/${run.id}`;
            const delRes = await fetch(deleteUrl, {
                method: "DELETE",
                headers: {
                    "Accept": "application/vnd.github+json",
                    "Authorization": `Bearer ${token}`,
                    "X-GitHub-Api-Version": "2022-11-28",
                    "User-Agent": "NodeJS-Fetch"
                }
            });

            if (delRes.status === 204) {
                console.log(`✅ Deleted run #${run.run_number} (ID: ${run.id}) - Event: ${run.event} (${run.name})`);
            } else {
                console.warn(`❌ Failed to delete run #${run.run_number} (ID: ${run.id}). Status: ${delRes.status}`);
            }
        }

        console.log("\nCleanup completed successfully!");
    } catch (error) {
        console.error("An error occurred:", error.message);
    } finally {
        rl.close();
    }
}

main();
