# Workspace Repositories Dependency & Workflow Analysis (Dashboard)

This dashboard provides an overview of the 12 micro-packages connected in the workspace. It highlights their dependencies, registry synchronization status, and automated cascading workflow paths.

---

## 1. Complete Dependency & Cascade Topology

Below is the complete graph showing package dependencies and GitHub Actions automated repository dispatch triggers.
- **Solid lines (`-->`):** Automated trigger cascade via `publish-conditional.yml` (manual trigger / push starts it, then dispatches downstream).
- **Dashed lines (`-.->`):** Peer/consumer NPM dependencies inside the workspace without trigger links.

```mermaid
graph TD
    classDef default fill:#1f2937,stroke:#374151,stroke-width:1px,color:#f3f4f6;
    classDef active fill:#1e3a8a,stroke:#3b82f6,stroke-width:2px,color:#ffffff;
    classDef ahead fill:#78350f,stroke:#eab308,stroke-width:2px,color:#ffffff;
    classDef private fill:#3f3f46,stroke:#71717a,stroke-width:2px,color:#ffffff;

    %% Nodes
    PC["pattern-collector<br>(v1.5.10)"]:::active
    PCBR["pattern-collector-base-regex<br>(v1.2.1)"]:::active
    PCRI["pattern-collector-routesjs-import<br>(v1.4.7)"]:::active
    PCRU["pattern-collector-routesjs-use<br>(v1.4.4)"]:::active
    PCRIER["pattern-collector-routesjs-import-extract-regex<br>(v1.3.6)"]:::active
    PCRIE["pattern-collector-routesjs-import-extract<br>(v1.9.2)"]:::ahead
    PCRUE["pattern-collector-routesjs-use-extract<br>(v1.5.4)"]:::active
    PCRPL["pattern-collector-routesjs-pull-lines<br>(v1.6.6)"]:::active
    PCRBS["pattern-collector-routesjs-build-story<br>(v1.4.1)"]:::active
    PCRFC["pattern-collector-routesjs-fix-consumption<br>(v1.3.1)"]:::active
    PCR["pattern-collector-routesjs<br>(v1.5.2)"]:::active
    VSC["vs-code-ext-from-any-js<br>(v1.15.5)"]:::active

    %% Trigger Dispatches
    PC -->|dispatches| PCRI
    PC -->|dispatches| PCRU
    
    PCBR -->|dispatches| PCRIE
    PCRI -->|dispatches| PCRIE
    PCRIER -->|dispatches| PCRIE
    
    PCRU -->|dispatches| PCRUE
    
    PCRIE -->|dispatches| PCRPL
    PCRUE -->|dispatches| PCRPL
    
    PCRPL -->|dispatches| PCR
    PCRBS -->|dispatches| PCR
    PCRFC -->|dispatches| PCR

    %% Dependencies without direct dispatch triggers
    PCRIE -.->|dependency of| VSC
```

---

## 2. Workspace Packages Summary

There are **12 packages** configured. The table below lists their local version, NPM registry version, status, and direct internal workspace dependencies.

| Folder / Repo Name | Package Name | Local | NPM Registry | Status | Workspace Dependencies |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [pattern-collector](file:///d:/KeshavSoftRepos/2026-07-22(5)/pattern-collector) | `pattern-collector` | `1.5.10` | `1.5.10` | ✅ Up to date | None |
| [pattern-collector-base-regex](file:///d:/KeshavSoftRepos/2026-07-22(5)/pattern-collector-base-regex) | `pattern-collector-base-regex` | `1.2.1` | `1.2.1` | ✅ Up to date | None |
| [pattern-collector-routesjs](file:///d:/KeshavSoftRepos/2026-07-22(5)/pattern-collector-routesjs) | `pattern-collector-routesjs` | `1.5.2` | `1.5.2` | ✅ Up to date | [pattern-collector-routesjs-pull-lines](file:///d:/KeshavSoftRepos/2026-07-22(5)/pattern-collector-routesjs-pull-lines) (`^1.6.4`)<br>[pattern-collector-routesjs-build-story](file:///d:/KeshavSoftRepos/2026-07-22(5)/pattern-collector-routesjs-build-story) (`^1.4.1`) |
| [pattern-collector-routesjs-build-story](file:///d:/KeshavSoftRepos/2026-07-22(5)/pattern-collector-routesjs-build-story) | `pattern-collector-routesjs-build-story` | `1.4.1` | `1.4.1` | ✅ Up to date | None |
| [pattern-collector-routesjs-fix-consumption](file:///d:/KeshavSoftRepos/2026-07-22(5)/pattern-collector-routesjs-fix-consumption) | `pattern-collector-routesjs-fix-consumption` | `1.3.1` | `1.3.1` | ✅ Up to date | [pattern-collector-routesjs-pull-lines](file:///d:/KeshavSoftRepos/2026-07-22(5)/pattern-collector-routesjs-pull-lines) (`^1.6.4`) |
| [pattern-collector-routesjs-import](file:///d:/KeshavSoftRepos/2026-07-22(5)/pattern-collector-routesjs-import) | `pattern-collector-routesjs-import` | `1.4.7` | `1.4.7` | ✅ Up to date | [pattern-collector](file:///d:/KeshavSoftRepos/2026-07-22(5)/pattern-collector) (`^1.5.10`) |
| [pattern-collector-routesjs-import-extract](file:///d:/KeshavSoftRepos/2026-07-22(5)/pattern-collector-routesjs-import-extract) | `pattern-collector-routesjs-import-extract` | `1.9.2` | `1.8.3` | ⚠️ Local Ahead | [pattern-collector-base-regex](file:///d:/KeshavSoftRepos/2026-07-22(5)/pattern-collector-base-regex) (`^1.2.1`)<br>[pattern-collector-routesjs-import](file:///d:/KeshavSoftRepos/2026-07-22(5)/pattern-collector-routesjs-import) (`^1.4.7`) |
| [pattern-collector-routesjs-import-extract-regex](file:///d:/KeshavSoftRepos/2026-07-22(5)/pattern-collector-routesjs-import-extract-regex) | `pattern-collector-routesjs-import-extract-regex` | `1.3.6` | `1.3.6` | ✅ Up to date | None |
| [pattern-collector-routesjs-pull-lines](file:///d:/KeshavSoftRepos/2026-07-22(5)/pattern-collector-routesjs-pull-lines) | `pattern-collector-routesjs-pull-lines` | `1.6.6` | `1.6.6` | ✅ Up to date | [pattern-collector-routesjs-import-extract](file:///d:/KeshavSoftRepos/2026-07-22(5)/pattern-collector-routesjs-import-extract) (`^1.8.3`)<br>[pattern-collector-routesjs-use-extract](file:///d:/KeshavSoftRepos/2026-07-22(5)/pattern-collector-routesjs-use-extract) (`^1.5.4`) |
| [pattern-collector-routesjs-use](file:///d:/KeshavSoftRepos/2026-07-22(5)/pattern-collector-routesjs-use) | `pattern-collector-routesjs-use` | `1.4.4` | `1.4.4` | ✅ Up to date | [pattern-collector](file:///d:/KeshavSoftRepos/2026-07-22(5)/pattern-collector) (`^1.5.10`) |
| [pattern-collector-routesjs-use-extract](file:///d:/KeshavSoftRepos/2026-07-22(5)/pattern-collector-routesjs-use-extract) | `pattern-collector-routesjs-use-extract` | `1.5.4` | `1.5.4` | ✅ Up to date | [pattern-collector-routesjs-use](file:///d:/KeshavSoftRepos/2026-07-22(5)/pattern-collector-routesjs-use) (`^1.4.4`) |
| [vs-code-ext-from-any-js](file:///d:/KeshavSoftRepos/2026-07-22(5)/vs-code-ext-from-any-js) | `vs-code-ext-from-any-js` | `1.15.5` | `1.15.5` | ✅ Up to date | [pattern-collector-routesjs-import-extract](file:///d:/KeshavSoftRepos/2026-07-22(5)/pattern-collector-routesjs-import-extract) (`^1.2.2`) |

---

## 3. Detailed Sub-Reports

To prevent a single markdown file from growing too large, detailed analyses have been separated into the following sub-reports:

1. 📂 **[Detailed Package Breakdown](file:///d:/KeshavSoftRepos/2026-07-22(5)/pattern-collector/package_details.md)**: Descriptions, dependencies, and local/registry status details for each package.
2. 🔄 **[Workflow & Dispatch Cascades](file:///d:/KeshavSoftRepos/2026-07-22(5)/pattern-collector/workflow_dispatch_analysis.md)**: Full analysis of GitHub Actions trigger methods, dispatch cascade loops, and event structures.
3. 🛠️ **[Propagation Troubleshooting Guide](file:///d:/KeshavSoftRepos/2026-07-22(5)/pattern-collector/propagation-troubleshooting.md)**: Diagnostic guidelines for silent curl workflow failures and token configuration.
