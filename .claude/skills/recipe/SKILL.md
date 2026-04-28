---
name: recipe
description: Add a new recipe to recipes.ts. Guides through title, categories, ingredients, and steps, then writes the entry.
disable-model-invocation: true
---

Add a new recipe to `/Users/sambehrens/Documents/repos/recipes/src/recipes.ts`.

## Rules

- **No `notes` field** — not supported by the Recipe type.
- **No measurements in steps** — steps never include specific quantities ("the flour", not "2 cups of flour"). Quantities live only in the ingredients list.
- **Timer tokens** — any concrete timer-able time reference in a step should use `{label|duration}` inline. Label is 1–3 words. Examples: `{Bake|25-35 minutes}`, `{Rest|30 minutes}`, `{Marinate|3 hours}`. Do NOT wrap intervals ("every 5 minutes") or vague times ("a few minutes").
- **Scaler** — use `Scaler.Multiply` for quantities that scale with servings. Use `Scaler.Constant` with `quantity: 0, measurement: "noQuantity"` for seasoning-to-taste items (salt, pepper, oil).
- **Salt and pepper** — always list as two separate ingredients, never combined into one.
- **Placement** — append the new recipe object just before the closing `];` at the end of the `recipes` array.
- **Step granularity** — each step should be one complete action. Small side actions (e.g. wiping out a skillet, transferring to a bowl) can stay attached to the main step they follow. Split steps where the cook must shift focus or technique — don't bundle unrelated actions into one step.

## Workflow

1. **If `$ARGUMENTS` contains a recipe name**, use it as the working title. Otherwise ask for it.

2. **Gather information** using `AskUserQuestion`. Collect in as few rounds as possible:
   - Source URL (optional)
   - Categories (1–3 from the list above)
   - Whether the recipe is weight-primary (`defaultMeasurement: "weight"`)
   - Ingredients (name, quantity, measurement, whether it scales)
   - Steps

   If the user pastes a full recipe text, extract everything from it — don't ask for fields you can derive.

3. **Draft the TypeScript object** and show it to the user for review before writing anything.

4. **Write** — append the recipe object to `recipes.ts` just before the closing `];` using the Edit tool.

5. **Confirm** — tell the user the recipe was added. Do not run a build or restart the server unless asked.
