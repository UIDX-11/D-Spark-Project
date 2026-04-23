# States & Variants

This document standardizes how **variants** and **states** map to tokens and component specs.

## Definitions

- **Variant**: a named visual/behavior style for a component (e.g., Primary vs Secondary).
- **State**: an interaction/validation status (e.g., Default/Hover/Focus/Disabled/Error).

## Canonical naming rule

Use:

`type/kind/shape/size/state`

Example:

- `button/primary/rounded/md/default`
- `input/text/rounded/lg/focus`

## Token binding rules


| What                     | Token layer | Example                                   |
| ------------------------ | ----------- | ----------------------------------------- |
| Cross-UI meaning         | Semantic    | `text.primary`, `border.default`          |
| Component-specific roles | Component   | `button.primary.bg`, `input.border.focus` |
| Raw values               | Primitive   | `space.4`, `radius.md`                    |


## Required states (baseline)


| State          | Applies to           | Notes                                      |
| -------------- | -------------------- | ------------------------------------------ |
| Default        | all                  | Resting state                              |
| Hover (web)    | interactive          | Must not be the only affordance            |
| Focus          | interactive + inputs | Visible focus ring/border; no layout shift |
| Active/Pressed | buttons/toggles      | Press feedback                             |
| Disabled       | all                  | Still readable; non-interactive            |
| Error          | inputs/forms         | Error message + field association          |


Component specs may add additional states (e.g., Selected, Loading, Typing).