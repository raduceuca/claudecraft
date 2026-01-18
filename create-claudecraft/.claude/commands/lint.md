# /lint Command

Run ESLint and provide a structured summary of linting issues.

## Steps

1. Run `bun run lint` to execute ESLint

2. Parse the output for:
   - Errors (blocking issues)
   - Warnings (suggestions)
   - File locations and line numbers

3. Format results as:

```markdown
## Lint Results

**Status:** ✅ No issues | ⚠️ X warnings | ❌ Y errors

### Errors
| File | Line | Rule | Message |
|------|------|------|---------|
| ... | ... | ... | ... |

### Warnings
| File | Line | Rule | Message |
|------|------|------|---------|
| ... | ... | ... | ... |

### Summary
- Files checked: X
- Errors: Y
- Warnings: Z
```

4. For fixable issues:
   - Offer to run `bun run lint --fix`

5. For manual fixes:
   - Suggest specific code changes
