# Overlay: Data-heavy Table (B2B)

Load this overlay when the request involves tables with:

- sorting / filtering / pagination
- batch actions
- import/export
- dense data columns

## Rules

- **Column priority**:
  - Always define primary identifying columns (name/id/status).
  - De-prioritize long text into detail panels or tooltips.
- **Batch actions**:
  - Batch actions must appear only when selection exists.
  - Selection state must be obvious and reversible.
- **Pagination**:
  - Keep pagination position stable (bottom-right or bottom).
  - Preserve filters across pagination.
- **Performance**:
  - Avoid rendering thousands of rows at once; use pagination/virtualization (implementation-dependent).
- **A11y**:
  - Table must have headers, keyboard navigation, and focus handling.

