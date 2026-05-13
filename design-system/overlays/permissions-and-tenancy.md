# Overlay: Permissions (RBAC) & Tenancy (Multi-tenant)

Load this overlay when the request involves:

- permissions / roles / RBAC
- org / workspace / tenant
- disabled states caused by access control

## Rules

- **Visibility vs availability**:
  - If user lacks permission to *see* a feature → hide it.
  - If user can see but not use → show disabled + explain why (tooltip/help text).
- **Disabled must be explicit**:
  - Disabled buttons/fields must have a reason (copy).
  - Never rely on color-only indication.
- **Auditability**:
  - Destructive actions must be confirmable and traceable (copy + logs, if applicable).
- **Tenant context**:
  - Tenant/workspace switcher must be persistent and obvious.
  - Cross-tenant operations must be clearly labeled and guarded.

