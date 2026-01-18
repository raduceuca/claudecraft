# Ralph Wiggum Loop Quick Start

Start an autonomous Ralph Wiggum loop for common design tasks.

## Prerequisites

First, install the plugin if you haven't:
```bash
/plugin marketplace add anthropics/claude-code
/plugin install ralph-wiggum@claude-plugins-official
```

## Available Loop Templates

### 1. Component Builder
Build a new component with full polish:
```bash
/ralph-loop "Build a $ARGUMENTS component.

Requirements:
- Use DaisyUI + Tailwind CSS from our design system
- Follow patterns in src/components/ui/
- Include hover, focus, and active states
- Make responsive (mobile, tablet, desktop)
- Add TypeScript props interface

Each iteration:
1. Check component exists
2. Run: bun run typecheck
3. Run: bun run lint
4. If errors, fix them
5. When all pass, output: <promise>COMPLETE</promise>

Escape: After 12 iterations, document blockers and complete." --completion-promise "COMPLETE" --max-iterations 15
```

### 2. Polish Pass
Run a design polish pass on a file or directory:
```bash
/ralph-loop "Polish pass on $ARGUMENTS

Check and fix:
- Consistent spacing (4, 8, 16, 24, 32px)
- Typography hierarchy
- Hover states on interactive elements
- Focus states for accessibility
- Smooth transitions (150-300ms)
- No hardcoded colors

After each fix:
1. Run: bun run typecheck
2. Run: bun run lint
3. If errors, fix them

When all polished and checks pass, output: <promise>COMPLETE</promise>" --completion-promise "COMPLETE" --max-iterations 20
```

### 3. Responsive Fix
Make a component/page fully responsive:
```bash
/ralph-loop "Make $ARGUMENTS fully responsive.

Breakpoints:
- Mobile: 375px (touch targets 44px+)
- Tablet: 768px
- Desktop: 1280px+

Process:
1. Review current responsive behavior
2. Fix layout issues at each breakpoint
3. Run typecheck and lint
4. When fully responsive, output: <promise>COMPLETE</promise>" --completion-promise "COMPLETE" --max-iterations 15
```

### 4. Overnight Feature Build
Build a complete feature while you sleep:
```bash
/ralph-loop "Build $ARGUMENTS feature.

Phases:
1. Create component structure
2. Implement core functionality
3. Style with DaisyUI
4. Make responsive
5. Add TypeScript types

Each iteration:
- Work on current phase
- Run: bun run typecheck && bun run lint
- If errors, fix them
- If phase complete, move to next

When all phases done and checks pass, output: <promise>COMPLETE</promise>

Escape: After 25 iterations, document progress and complete." --completion-promise "COMPLETE" --max-iterations 30
```

## Usage

Pick a template above, replace `$ARGUMENTS` with your target, and run.

## Safety

- **Always** use `--max-iterations`
- Start small (5-10) to test, then increase
- Use `/cancel-ralph` to stop anytime

## Tips

- More specific prompts = better results
- Include verification steps (typecheck, lint)
- Add escape hatches for stuck loops
- Check `.claude/skills/ralph-wiggum-loops/SKILL.md` for full docs
