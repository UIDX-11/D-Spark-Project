# Product line module: Audit logs

Load when the request involves:

- audit / compliance / traceability
- “who did what” history

## Module-specific rules

- Every audit entry should include: actor, action, target, timestamp, outcome.
- Provide filters (actor/action/time) and export for compliance needs.
- Protect sensitive fields; respect tenancy boundaries.

