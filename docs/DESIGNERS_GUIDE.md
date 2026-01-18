# Claude Code for Designers

> A practical guide for product designers, UX designers, and visual designers getting started with Claude Code.

---

## Why Designers Should Care

Claude Code isn't just for developers. As Meaghan Choi (Design Lead for Claude Code at Anthropic) puts it:

> "I spend an equal amount of time now in Claude Code as I do in Figma. It's just so fun to fix UX polish and make other frontend updates myself."

With Claude Code, you can:
- Build working prototypes with actual functionality (not just clickable mocks)
- Ship small frontend fixes without waiting for engineering
- Iterate on designs in code at the speed of thought
- Validate ideas before committing to full design system work

---

## Getting Started (15 Minutes)

### 1. Install Claude Code

```bash
# macOS/Linux
curl -fsSL https://claude.ai/install.sh | sh

# Or with npm
npm install -g @anthropic-ai/claude-code
```

### 2. Navigate to Your Project

```bash
cd your-project-folder
claude
```

### 3. Start with Plan Mode

When you're new, always use Plan mode—Claude writes out a multi-step strategy first and waits for your OK before making changes.

```
> Plan: Create a responsive hero section with a gradient background
```

---

## The TC-EBC Prompting Framework

Developed by designers at Figma, this framework helps you write better prompts. Claude "cuts best when instructions are crisp and logic is embedded right in the prompt."

| Component | What It Does | Example |
|-----------|-------------|---------|
| **T**ask | What you want done | "Create a card component" |
| **C**ontext | Background info | "This is for a dashboard showing user metrics" |
| **E**lements | Specific parts to include | "Include avatar, name, role, and status indicator" |
| **B**ehavior | How it should work | "Hover state should elevate the card" |
| **C**onstraints | What NOT to do | "Don't use gradients. Keep it under 200px wide." |

### Example Prompt

```
Task: Create a user profile card component

Context: This is for our team directory page. We use DaisyUI
with Tailwind CSS. The design system uses subtle shadows and
clean borders, never gradients or glows.

Elements needed:
- Circular avatar (48px)
- Name (font-semibold)
- Role (text-sm, text-base-content/70)
- Online status dot
- View profile button

Behavior:
- Card elevates slightly on hover (shadow-md → shadow-lg)
- Status dot pulses when online
- Clicking anywhere navigates to profile

Constraints:
- NO gradients
- NO excessive shadows
- Keep component under 300px wide
- Use existing DaisyUI classes where possible
```

---

## Visual Iteration Workflow

This is the workflow Anthropic recommends for design work:

### 1. Reference → Code → Screenshot → Refine

```
Step 1: Provide design reference
> "Here's a screenshot of the design I want to implement"
> [paste screenshot]

Step 2: Generate initial code
> "Implement this design using our component library"

Step 3: Take a screenshot of the result
> [paste screenshot of what Claude built]

Step 4: Iterate 2-3 times
> "The spacing is off. Add more padding between sections
>  and make the heading larger"

Step 5: Commit when satisfied
> "This looks good. Commit with message 'Add hero section'"
```

### 2. Style Replication (Not Content)

Browse design inspiration sites, screenshot designs you like, and ask Claude to analyze the aesthetic direction:

```
> "Analyze the visual style of this design: the spacing,
>  typography hierarchy, use of color, and layout patterns"
```

Then use that analysis to guide implementation:

```
> "Apply a similar visual style to our pricing page.
>  Keep our brand colors but use the same spacing
>  rhythm and typography scale."
```

---

## Designer-Specific Tips

### 1. Let Claude See Your Design Tokens

Add your design system to the CLAUDE.md file:

```markdown
## Design Tokens

### Spacing Scale
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px

### Colors (DaisyUI semantic)
- Primary actions: btn-primary
- Secondary actions: btn-secondary btn-outline
- Backgrounds: bg-base-100, bg-base-200
- Text: text-base-content

### Typography
- Headings: font-bold
- Body: font-normal
- Small text: text-sm text-base-content/70
```

### 2. Use Screenshots Liberally

Claude Code can see images. Use this constantly:
- Paste Figma screenshots
- Screenshot bugs you want fixed
- Share reference designs
- Show before/after comparisons

### 3. Start Small, Build Confidence

Don't try to build an entire page on day one:

| Week 1 | Week 2 | Week 3 |
|--------|--------|--------|
| Fix typos | Update button styles | Build new components |
| Adjust spacing | Change colors | Implement full sections |
| Small copy changes | Add hover states | Create new pages |

### 4. Know When to Hand Off

Claude Code is great for:
- ✅ Rapid prototypes
- ✅ UI polish and tweaks
- ✅ Implementing designs you've already thought through
- ✅ Exploring "what if" variations quickly

Hand off to engineering for:
- ⚠️ Complex state management
- ⚠️ API integrations
- ⚠️ Performance-critical features
- ⚠️ Accessibility audits (though Claude can help!)

---

## Useful Commands for Designers

| Command | What It Does |
|---------|-------------|
| `/clear` | Start fresh (use between different tasks) |
| `#` key | Add notes to CLAUDE.md for future sessions |
| `Escape` | Stop Claude if it's going the wrong direction |
| Paste image | Add visual context to your prompt |

### Keyboard Shortcuts

- **Tab**: Autocomplete file paths
- **Up arrow**: Recall previous prompts
- **Cmd+K**: Clear screen (keeps context)

---

## Example Designer Workflows

### 1. "Polish Pass" Workflow

```
> Read the homepage at src/pages/HomePage.tsx

> I want to do a polish pass. Look for:
> - Inconsistent spacing
> - Missing hover states
> - Typography hierarchy issues
> - Alignment problems

> [Claude identifies issues]

> Fix those issues one component at a time,
> showing me each change before moving on
```

### 2. "Design Exploration" Workflow

```
> Create 3 variations of the hero section:
> 1. Minimal with lots of whitespace
> 2. Bold with large typography
> 3. Image-forward with background photo

> Show me the code for each, I'll pick one to refine
```

### 3. "Responsive Check" Workflow

```
> Review the card grid on the features page.
> Show me what it looks like at:
> - Mobile (375px)
> - Tablet (768px)
> - Desktop (1280px)

> [Paste screenshots at each size]

> The mobile layout breaks. Fix the grid to stack
> properly on small screens.
```

---

## Building Your Design Skills Library

Create reusable skills for design tasks you do often:

### Example: Brand Voice Skill

Create `.claude/skills/brand-voice/SKILL.md`:

```markdown
# Brand Voice Skill

When writing UI copy for this project:

## Tone
- Friendly but professional
- Clear over clever
- Encouraging, never condescending

## Do
- Use active voice
- Keep sentences short
- Address user directly ("You can..." not "Users can...")

## Don't
- Use jargon or buzzwords
- Be overly casual (no "gonna", "wanna")
- Use exclamation marks excessively
```

### Example: Component Review Skill

Create `.claude/skills/component-review/SKILL.md`:

```markdown
# Component Review Skill

When reviewing UI components, check:

## Visual Consistency
- [ ] Uses design system colors (not hardcoded hex)
- [ ] Follows spacing scale
- [ ] Typography matches hierarchy

## Interaction Design
- [ ] Has hover state
- [ ] Has focus state (accessibility)
- [ ] Has active/pressed state
- [ ] Loading states where appropriate

## Responsive
- [ ] Works at 375px (mobile)
- [ ] Works at 768px (tablet)
- [ ] Works at 1280px+ (desktop)
```

---

## Common Mistakes to Avoid

❌ **Don't**: Ask for entire pages in one prompt
✅ **Do**: Break into components, build incrementally

❌ **Don't**: Accept the first output without review
✅ **Do**: Always visually check the result, iterate 2-3 times

❌ **Don't**: Skip providing visual references
✅ **Do**: Paste screenshots, mockups, and inspiration

❌ **Don't**: Use vague prompts ("make it look better")
✅ **Do**: Be specific ("increase heading size to 32px, add 24px gap below")

❌ **Don't**: Forget to mention your design system
✅ **Do**: Reference DaisyUI classes, Tailwind utilities, or your tokens

---

## The Ultimate Superpower: Ralph Wiggum Loops

Once you're comfortable with Claude Code, unlock autonomous building with **Ralph Wiggum loops**—a technique that lets Claude work continuously, building on each iteration until the task is complete.

> "Ralph is a bash loop. You give Claude a task, it works on it, and when it tries to exit, it gets fed the same prompt again. Each iteration builds on the last."

### What It Does

Instead of back-and-forth conversation, Ralph loops create a **self-correcting feedback system**:
1. Claude works on your task
2. Runs verification (typecheck, lint)
3. If errors, fixes them automatically
4. Repeats until everything passes
5. Outputs completion signal

### Quick Setup

```bash
# Install the official plugin
/plugin marketplace add anthropics/claude-code
/plugin install ralph-wiggum@claude-plugins-official
```

### Designer-Ready Loop: Component Builder

```bash
/ralph-loop "Build a [COMPONENT NAME] component.

Requirements:
- Use DaisyUI + Tailwind CSS
- Include hover, focus, active states
- Make it responsive

Each iteration:
1. Run: bun run typecheck && bun run lint
2. If errors, fix them
3. When all checks pass, output: <promise>COMPLETE</promise>" --completion-promise "COMPLETE" --max-iterations 15
```

### Designer-Ready Loop: Polish Pass

```bash
/ralph-loop "Polish pass on src/components/ui/

Check and fix:
- Consistent spacing (4, 8, 16, 24, 32px scale)
- Hover states on all interactive elements
- Focus states for accessibility
- Smooth transitions

After each fix, run typecheck and lint.
When all components polished, output: <promise>COMPLETE</promise>" --completion-promise "COMPLETE" --max-iterations 20
```

### Safety First

**Always set `--max-iterations`** as a safety limit. Start with 5-10 for testing, then increase.

### When to Use It

✅ **Great for**: Building components, polish passes, responsive fixes, overnight builds
❌ **Skip for**: Tasks needing design decisions, unclear requirements

**Full documentation**: See `.claude/skills/ralph-wiggum-loops/SKILL.md`

---

## Resources

- [Anthropic Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices)
- [Figma: Cooking with Constraints](https://www.figma.com/blog/designer-framework-for-better-ai-prompts/) - TC-EBC framework
- [Thoughtbot: Design Sprints with Claude Code](https://thoughtbot.com/blog/rapid-prototyping-with-claude-code-how-we-transformed-our-design-sprint-process)
- [html.to.design: Claude Code to Figma](https://html.to.design/blog/from-claude-code-to-figma/)
- [Meaghan Choi: Design to Code Tutorial](https://creatoreconomy.so/p/full-tutorial-from-design-to-code-with-claude-code-meaghan-choi)

---

## Next Steps

1. **Today**: Install Claude Code, open this project, try fixing one small thing
2. **This week**: Build one component from a Figma design
3. **This month**: Develop your own design review skill
4. **Ongoing**: Document patterns that work in your CLAUDE.md
