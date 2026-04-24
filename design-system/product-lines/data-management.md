# Product line module: Data management

Load when the request involves:

- import / export
- bulk edit / batch operations
- schema mapping

## Module-specific rules

- Import must be explainable: template + validation + error report.
- Bulk edit must be reversible or confirmable with clear scope.
- Prefer idempotent operations; show progress and partial failures.

