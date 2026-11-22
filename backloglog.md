# Backlog log

Append one dated entry after each task. Record what changed, what was checked, and anything still unfinished.

## 2026-11-22 — Project workspace bootstrap

- Created `AGENTS.md`, `const.md`, `backlog.md`, `backloglog.md`, `notes.md`, `README.md`, and `raports/.gitkeep`.
- Captured the initial block-based Verilog learning concept and kept unconfirmed scope as hypotheses in `notes.md`.
- Checked the workspace: it was empty and had no Git repository metadata. `gh auth status` reports the configured GitHub token is invalid.
- Remaining: create the GitHub repository and connect this directory; then discuss and confirm project scope with the team.

### Follow-up — GitHub creation attempt

- Confirmed the GitHub connector can read the account, but it exposes no repository-creation action. `Nec0ti/ludus-circuitus` currently returns 404.
- Tried the in-app browser route; no browser is available. Playwright and its Chromium download exist, but Chromium cannot launch because `libglib-2.0.so.0` is missing. The local `.git` directory is empty and read-only, so this session cannot initialize/connect a local Git repository either.
- Repository creation and local Git connection remain blocked until a GitHub-capable browser/session and writable Git metadata are available.
- Follow-up: resolved Chromium's missing runtime libraries from `/nix/store`. Launch still fails in `sandbox_host_linux` with `Operation not permitted`, including under user/pid namespaces with Chromium sandbox enabled. No sandbox bypass or new GitHub CLI OAuth session has been authorized.
- 2026-11-22 follow-up: Necati explicitly approved a Chromium sandbox bypass and GitHub CLI device OAuth. `gh auth login --web` failed before issuing a device code because the command could not connect to github.com. Playwright was retried with the approved no-sandbox setting and locally resolved Nix libraries; Chromium still terminated with `SIGTRAP` / sandbox-host `Operation not permitted` (regular Chromium also hit a restricted crashpad socket). Repo remains uncreated; no OAuth credential was issued or stored.
