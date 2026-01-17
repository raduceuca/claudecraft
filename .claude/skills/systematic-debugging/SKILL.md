---
name: systematic-debugging
description: Four-phase debugging methodology for root cause analysis. Use when encountering bugs, test failures, unexpected behavior, or when something "doesn't work." Triggers on error messages, broken functionality, regression issues, or debugging requests.
---

# Systematic Debugging Methodology

## Core Principle

**NEVER apply fixes before understanding the root cause.**

Symptom-focused patches mask deeper problems and create technical debt.

---

## Four-Phase Process

### Phase 1: Root Cause Investigation
**Goal: Understand WHY before fixing WHAT**

1. **Observe the symptom precisely**
   - What exactly is happening vs. what should happen?
   - When does it occur? (always, intermittently, specific conditions)

2. **Reproduce consistently**
   - Create minimal reproduction steps
   - Verify you can trigger the issue reliably

3. **Trace backward**
   - Where does the error appear?
   - What is the immediate cause?
   - What triggered that cause?
   - Keep asking "why" until you reach the origin

4. **Collect diagnostic data**
   - Console logs, network requests, state values
   - Component render count, props/state changes

### Phase 2: Pattern Analysis
**Goal: Compare broken vs. working implementations**

1. **Find working examples**
   - Does similar code work elsewhere in the codebase?
   - Are there documented patterns for this feature?

2. **Identify differences**
   - Line-by-line comparison between working and broken
   - Check: props, state, CSS specificity, event handlers

3. **Understand dependencies**
   - What does this code depend on?
   - Are all dependencies present and configured?

### Phase 3: Hypothesis Testing
**Goal: Scientific verification of root cause**

1. **Form ONE clear hypothesis**
   - "The bug occurs because X"
   - Be specific and testable

2. **Design minimal test**
   - Change ONE variable at a time
   - Predict the outcome before testing

3. **Verify prediction**
   - Did the change produce expected result?
   - If not, form new hypothesis

### Phase 4: Implementation
**Goal: Clean, verified fix**

1. **Create failing test** (if applicable)
   - Test should fail before fix, pass after

2. **Apply minimal fix**
   - Change only what's necessary
   - Don't "clean up" unrelated code

3. **Verify completely**
   - Does original issue resolve?
   - Did we introduce new issues?
   - Run full test suite

---

## Anti-Patterns (STOP IMMEDIATELY)

### ❌ "Let me try a quick fix"
**Problem:** Bypasses root cause investigation
**Reality:** Quick fixes become permanent tech debt

### ❌ Multiple simultaneous changes
**Problem:** Can't isolate what actually worked
**Do instead:** One change, one test, one verification

### ❌ "It works now" without understanding why
**Problem:** The "fix" may be coincidental
**Do instead:** Explain the mechanism before declaring fixed

### ❌ Adding !important or force-flags
**Problem:** Masks specificity/configuration issues
**Do instead:** Find and fix the actual conflict

### ❌ Copy-pasting from Stack Overflow
**Problem:** May fix symptom but not root cause
**Do instead:** Understand WHY the solution works first

---

## Stop Rule

**If 3 consecutive fixes fail, STOP.**

This signals:
- Architectural issue beyond local fix
- Missing context or requirements
- Need to escalate or discuss with team

---

## Debugging Checklist

```markdown
## Bug: [Brief description]

### Phase 1: Investigation
- [ ] Symptom observed:
- [ ] Reproduction steps:
  1.
  2.
  3.
- [ ] Expected behavior:
- [ ] Actual behavior:
- [ ] Error messages/logs:

### Phase 2: Pattern Analysis
- [ ] Working example found:
- [ ] Key differences identified:
- [ ] Dependencies verified:

### Phase 3: Hypothesis
- [ ] Hypothesis: "The bug occurs because..."
- [ ] Test plan: "If I change X, then Y should happen"
- [ ] Result: [confirmed/disproved]

### Phase 4: Fix
- [ ] Minimal fix applied
- [ ] Original issue resolved
- [ ] No regressions introduced
- [ ] Root cause understood and documented
```

---

## Common Debug Scenarios

### CSS Not Applying
1. Check specificity (DevTools Computed tab)
2. Check if class is actually in DOM
3. Check Tailwind config includes the file
4. Check for typos in class name

### Event Handler Not Firing
1. Check if element is clickable (not covered by overlay)
2. Check `pointer-events-none` on ancestors
3. Check if handler is actually attached (React DevTools)
4. Check for event.stopPropagation() elsewhere

### State Not Updating
1. Check if setState is called (add console.log)
2. Check if value is actually different (React won't re-render for same value)
3. Check for stale closures in callbacks
4. Check if component is actually re-rendering (React DevTools Profiler)

### Tailwind Classes Not Working
1. Check Tailwind config `content` paths
2. Check if using arbitrary values correctly `[value]`
3. Check for conflicting classes (later wins)
4. Run `bun dev` to regenerate CSS
