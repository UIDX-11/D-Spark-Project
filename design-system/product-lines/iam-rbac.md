# Product line module: IAM / RBAC

Load when the request involves:

- users / roles / permissions / groups
- org / workspace / tenant

## Module-specific rules

- Prefer **least privilege** defaults; make permission impact explainable.
- For denied actions, prefer **disabled + reason** over silent failure.
- Permission editing must include:
  - scope (tenant/project/resource)
  - inheritance / overrides (if any)
  - auditability (who changed what, when)

