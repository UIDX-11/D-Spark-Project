# D-Spark Design Spec (AI-Retrievable)

This directory is the **single entrypoint** for D-Spark UI generation rules.

## What this is

- A design-system knowledge base optimized for **AI retrieval** and **schema-driven UI generation**
- Covers **Foundations, Components, Layouts, Content, Accessibility, I18n**
- Targets **Web (React + Vue)** and **Flutter**

## How to use (for humans & agents)

- Start at `docs/design.md` for the overview and global rules.
- Use the component library in `docs/components/`.
- Use `docs/components/intent-index.md` to go from **intent → recommended patterns/components**.
- For generators/validators, enforce `generator/schema-ui-contract.md`.

## Files that tools should read first

- `manifest.json`
- `docs/design.md`
- `generator/schema-ui-contract.md`
- `docs/components/intent-index.md`