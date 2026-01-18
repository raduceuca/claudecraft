# /build Command

Run the project build and provide a structured summary of results.

## Steps

1. Run `bun run build` to execute TypeScript compilation and Vite build

2. Parse the output for:
   - TypeScript errors (with file locations)
   - Build warnings
   - Bundle size information
   - Build success/failure status

3. Format results as:

```markdown
## Build Results

**Status:** ✅ Success | ❌ Failed

### TypeScript Errors (if any)
| File | Line | Error |
|------|------|-------|
| ... | ... | ... |

### Warnings (if any)
- ...

### Bundle Info
- Output directory: dist/
- Total size: X KB
```

4. If errors found:
   - Suggest fixes for common issues
   - Offer to fix automatically if straightforward

5. If successful:
   - Report build time
   - Note any optimization opportunities
