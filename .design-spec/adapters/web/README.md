# Web Adapters

This folder describes how the design spec and tokens map to concrete web UI implementations.

## Target stacks

- Vue (Arco Design)
- React (project-specific; ensure controlled components wrap the underlying UI library)

## Adapter responsibilities

- Provide a **controlled component layer** that matches the component specs in `../../docs/components/`.
- Prevent “escape hatches” that bypass tokens (e.g., raw colors/px values).
- Map tokens to the UI library theme system (where available).

