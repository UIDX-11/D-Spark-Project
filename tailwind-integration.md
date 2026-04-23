# Tailwind Integration (Optional)

This project’s design-spec focuses on **tokens + controlled components**. Tailwind is optional.

If you choose to use Tailwind in any subproject, these are the integration rules.

## Core rule: tokens first

- Do not hardcode colors/spacing/radius/typography in Tailwind classes.
- Prefer using **CSS variables** generated from tokens, then reference them in Tailwind.

## Recommended approach

1. Generate CSS variables from tokens to `.design-spec/tokens/dist/web.css`
2. Configure Tailwind to use those variables in `theme.extend`:

```js
// tailwind.config.js (example)
module.exports = {
  theme: {
    extend: {
      colors: {
        bg: {
          page: "var(--bg-page)",
          surface: "var(--bg-surface)",
        },
        text: {
          primary: "var(--text-primary)",
        },
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
      },
      spacing: {
        2: "var(--space-2)",
        3: "var(--space-3)",
        4: "var(--space-4)",
      },
    },
  },
};
```

## Disallowed patterns


| Pattern                                 | Why                                                    |
| --------------------------------------- | ------------------------------------------------------ |
| `text-[#fff]`, `bg-[#000]`              | Hardcoded color bypasses token system                  |
| `p-[13px]`, `rounded-[7px]`             | Non-token sizing breaks consistency                    |
| Copying Figma export Tailwind literally | Figma exports are references, not production contracts |


## Controlled components

Even with Tailwind enabled, schema-driven UI should compose **controlled components** and should not inject arbitrary Tailwind class strings into schema.