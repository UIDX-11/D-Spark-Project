# Component: Steps

## Level

Molecular

## Aliases

- stepper
- process steps
- wizard steps

## Best practices

- **Use for**: showing progress through a multi-step flow.
- **Keep short**: 3–6 steps recommended; if > 6, consider grouping or using vertical with scroll.
- **Status meaning (from Figma)**:
  - `completed`: check icon
  - `current/in-progress`: filled circle with number
  - `pending`: outlined circle with number + muted text
  - `error`: red circle with close icon + red title
  - `disabled`: muted border/text; not clickable

## Layout patterns

- **Horizontal**: common for wizards and forms.
- **Vertical**: for long step titles/descriptions or sidebars.
- **With description**: title + a short line of description.

## Anti-patterns

- Making future steps clickable without validation (must define rule).
- Using Steps as primary navigation for unrelated pages.
- Hiding error state details; always provide guidance near the step content.

## Accessibility essentials

- Use list semantics: `ol > li`.
- Current step: `aria-current="step"`.
- Completed steps can be links/buttons if clickable; otherwise plain text.
- Error step should be announced; provide `aria-describedby` for error message in content region.

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `steps/horizontal/connected/lg/default`
  - `steps/vertical/connected/md/with-description`
  - `steps/horizontal/connected/lg/error`

## Anatomy

```
[icon/number] Title
            (optional) Description
            (optional) Connector line to next
```

## Variants

| **Kind** | **Orientation** | **Connector** | **Description** |
| --- | --- | --- | --- |
| `default` | horizontal | optional | title only |
| `with-description` | horizontal/vertical | optional | title + description |
| `vertical` | vertical | optional | better for long text |

## Sizes (from Figma)

| **Size** | **Step icon box** | **Title** | **Desc** | **Connector length** |
| --- | ---:| --- | --- | ---:|
| `LG` | 28 | 16 / 22 | 14 / 20 | 28 |
| `MD` | 24 | 14 / 20 | 14 / 20 | 28 |

## States

| **State** | **Icon** | **Title color** | **Connector** |
| --- | --- | --- | --- |
| `completed` | check | primary | solid (dark) |
| `current` | filled number | primary (semibold) | subtle |
| `pending` | outlined number | secondary | subtle |
| `error` | red close | danger | subtle |
| `disabled` | muted outlined number | muted | subtle |

## Executable interaction rules

### Step navigation policy (required)

- **Default**: user may go back to any completed step.
- User may not jump forward beyond the first pending step unless `allowSkip=true`.
- When a user clicks a completed step, navigate and preserve previously entered data.

### Validation gate

- On “Next”, validate current step fields.
- If invalid, keep current step, mark state `error`, and focus first invalid field.

### Connector logic

- Connector reflects completion:
  - connector before current: `completed` style
  - connector after current: `pending` style

### Keyboard

- If steps are clickable: each step title is focusable.
- Enter/Space activates navigation.

## Component token bindings (required)

| **Token path** | **CSS var** |
| --- | --- |
| `tokens.steps.icon.sizeLg` | `--component-steps-icon-size-lg` |
| `tokens.steps.icon.sizeMd` | `--component-steps-icon-size-md` |
| `tokens.steps.icon.bgCurrent` | `--component-steps-icon-bg-current` |
| `tokens.steps.icon.borderPending` | `--component-steps-icon-border-pending` |
| `tokens.steps.icon.borderDisabled` | `--component-steps-icon-border-disabled` |
| `tokens.steps.icon.bgError` | `--component-steps-icon-bg-error` |
| `tokens.steps.icon.textOnCurrent` | `--component-steps-icon-text-on-current` |
| `tokens.steps.icon.textPending` | `--component-steps-icon-text-pending` |
| `tokens.steps.icon.textDisabled` | `--component-steps-icon-text-disabled` |
| `tokens.steps.title.text` | `--component-steps-title-text` |
| `tokens.steps.title.textCurrent` | `--component-steps-title-text-current` |
| `tokens.steps.title.textPending` | `--component-steps-title-text-pending` |
| `tokens.steps.title.textError` | `--component-steps-title-text-error` |
| `tokens.steps.title.textDisabled` | `--component-steps-title-text-disabled` |
| `tokens.steps.desc.text` | `--component-steps-desc-text` |
| `tokens.steps.connector.track` | `--component-steps-connector-track` |
| `tokens.steps.connector.trackCompleted` | `--component-steps-connector-track-completed` |
| `tokens.steps.connector.length` | `--component-steps-connector-length` |
| `tokens.steps.gap` | `--component-steps-gap` |
