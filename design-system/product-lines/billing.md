# Product line module: Billing

Load when the request involves:

- subscription / plan / pricing
- invoice / payment / checkout

## Module-specific rules

- Prices and units must be explicit (currency, billing cycle, tax).
- Destructive billing actions (cancel plan, refund) must be guarded and confirmed.
- Provide clear status mapping (trialing/active/past_due/canceled) and do not rely on color only.

