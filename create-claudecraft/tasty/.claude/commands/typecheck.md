# /typecheck Command

Run TypeScript type checking and provide categorized error summary.

## Steps

1. Run `npx tsc --noEmit` to check types without emitting files

2. Parse errors and categorize by:
   - **Critical:** Type mismatches, missing properties
   - **Warning:** Implicit any, unused variables
   - **Info:** Style issues, unnecessary type assertions

3. Format results as:

```markdown
## TypeScript Check Results

**Status:** ✅ No errors | ⚠️ X errors found

### Critical Errors
| File | Line | Code | Message |
|------|------|------|---------|
| src/App.tsx | 42 | TS2322 | Type 'string' is not assignable to type 'number' |

### Warnings
| File | Line | Code | Message |
|------|------|------|---------|
| ... | ... | ... | ... |

### Summary
- Critical: X
- Warnings: Y
- Total files checked: Z
```

4. For each critical error:
   - Show the problematic code snippet
   - Suggest the fix
   - Offer to apply fix

5. If no errors:
   - Report "All X files passed type checking"
   - Note any strict mode opportunities
