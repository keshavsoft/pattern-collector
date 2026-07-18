# Troubleshooting Dependency Propagation Issue (v1.4.4)

This document explains why version `1.4.4` of `express-check-any-for-import` did not trigger the downstream dependency update workflow in `express-fix-any-js`, the changes made to improve visibility, and the steps to resolve and test it.

---

## 1. Problem Analysis

When version `1.4.4` was manually triggered and published, the workflow run succeeded:
* The **`publish`** job succeeded (deploying `1.4.4` to NPM).
* The **`notify-dependents`** job also succeeded.

However, the downstream repository `express-fix-any-js` did **not** trigger its `Update dependency` workflow. 

### Silent Curl Failure
The Callee workflow `notify-dependents.yml` calls the GitHub Repository Dispatches API via `curl`:
```bash
curl -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer ${{ secrets.REPO_DISPATCH_TOKEN }}" \
  https://api.github.com/repos/keshavsoft/express-fix-any-js/dispatches \
  -d '{"event_type":"dependency-updated"}'
```
By default, `curl` exits with status code `0` (success) even when the API returns an error status code (such as `401 Unauthorized` or `404 Not Found`). Because `curl` did not fail the build step, the workflow ran completely green, hiding the authorization/dispatch failure.

---

## 2. Changes Implemented

To bring visibility to the API dispatch responses and make debugging possible, the `-i` flag has been added to `curl` in the notification workflows across these repositories:
* `express-check-any-for-import/.github/workflows/notify-dependents.yml`
* `express-fix-any-js/.github/workflows/notify-dependents.yml`
* `express-fix-endpoints-get-js/.github/workflows/notify-dependents.yml`

Using `curl -i` dumps the HTTP response status, headers, and JSON error responses directly into the GitHub Actions step logs.

---

## 3. Resolution Steps

Follow these steps to check, update, and verify the propagation:

### Step 1: Verify the Repository Secrets
The `REPO_DISPATCH_TOKEN` must be a valid GitHub Personal Access Token (PAT) with write access to the destination repository.
1. Go to the **`express-check-any-for-import`** repository on GitHub.
2. Click **Settings** -> **Secrets and variables** -> **Actions**.
3. Under **Repository secrets**, ensure that **`REPO_DISPATCH_TOKEN`** exists.
4. If it has expired or is invalid:
   * Create a new GitHub Personal Access Token (classic) with `repo` scope.
   * Update the value of `REPO_DISPATCH_TOKEN` in the repository settings.

### Step 2: Trigger the Workflow and Inspect Logs
1. Go to the **Actions** tab in `express-check-any-for-import`.
2. Select **Publish Package to npmjs with Notification**.
3. Click **Run workflow** (run on the `main` branch).
4. Wait for the workflow to reach the `notify-dependents` job, click it, and expand the **Notify express-fix-any-js** step.
5. Inspect the response headers:
   * **`HTTP/2 204`**: Success! The downstream dispatch has successfully triggered the update.
   * **`HTTP/2 401` or `HTTP/2 404`**: The token is invalid, expired, or lacks write access permissions on the destination repository.
