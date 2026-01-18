# AI Coding Assistant Compatibility Analysis

> **Status**: Research complete, implementation pending
> **Date**: 2026-01-18
> **Goal**: Make claudecraft configuration work across Claude Code, OpenAI Codex, GitHub Copilot, Cursor, and other AI coding tools

---

## Current Configuration (claudecraft)

| Component | Location | Purpose |
|-----------|----------|---------|
| Main instructions | `CLAUDE.md` | Project context, commands, patterns |
| Commands | `.claude/commands/*.md` | Slash commands (/build, /lint, etc.) |
| Skills | `.claude/skills/*/SKILL.md` | Specialized behaviors |
| Hooks | `.claude/hooks/*.js` | Event-triggered automation |
| Settings | `.claude/settings.json` | Tool permissions |

---

## Configuration File Formats by Tool

| Tool | Main Instructions File | Path-Specific Rules | Commands/Skills | Hooks |
|------|------------------------|---------------------|-----------------|-------|
| **Claude Code** | `CLAUDE.md` | Nested `CLAUDE.md` files | `.claude/commands/*.md` | `.claude/hooks/*.js` |
| **OpenAI Codex** | `AGENTS.md` | Nested `AGENTS.md` files | Via MCP servers | N/A |
| **GitHub Copilot** | `.github/copilot-instructions.md` | `.github/instructions/*.instructions.md` (with frontmatter) | N/A | N/A |
| **Cursor** | `.cursorrules` (legacy) | `.cursor/rules/*.mdc` (new) | N/A | N/A |
| **Aider** | `CONVENTIONS.md` | N/A | N/A | N/A |
| **Continue.dev** | `.continuerules` | Via `config.yaml` | Continue Hub blocks | N/A |
| **Windsurf** | `.windsurfrules` | `.windsurf/rules/*` | Via memories | N/A |
| **Amazon Q** | `.amazonq/rules/*.md` | Glob patterns in config | Custom agents | N/A |
| **Zed** | `.rules` files | `.zed/settings.json` | N/A | N/A |
| **Gemini Code Assist** | N/A (settings only) | `.aiexclude` | N/A | N/A |
| **Sourcegraph Cody** | N/A (prompts only) | N/A | Prompt Library | N/A |

---

## Compatibility Tiers

### Tier 1: High Compatibility (Markdown-based, simple copy/symlink)

| Tool | File | Effort to Support |
|------|------|-------------------|
| **OpenAI Codex** | `AGENTS.md` | Symlink or copy `CLAUDE.md` → `AGENTS.md` |
| **Aider** | `CONVENTIONS.md` | Symlink or copy main content |
| **Continue.dev** | `.continuerules` | Symlink or copy main content |

These tools all read plain Markdown files with similar semantics. You can likely use:
```bash
ln -s CLAUDE.md AGENTS.md
ln -s CLAUDE.md CONVENTIONS.md
ln -s CLAUDE.md .continuerules
```

### Tier 2: Medium Compatibility (needs restructuring)

| Tool | Required Changes |
|------|------------------|
| **GitHub Copilot** | Move to `.github/copilot-instructions.md`; path-specific rules need YAML frontmatter with `applyTo` globs |
| **Cursor** | Convert to `.cursor/rules/*.mdc` format with MDC frontmatter (description, globs, alwaysApply) |
| **Windsurf** | Copy to `.windsurfrules`; granular rules need `.windsurf/rules/` structure |
| **Amazon Q** | Split into `.amazonq/rules/*.md` files |
| **Zed** | Create `.rules` files, configure in `.zed/settings.json` |

### Tier 3: Low Compatibility (fundamentally different)

| Tool | Issue |
|------|-------|
| **Gemini Code Assist** | No project instructions file; uses `~/.gemini/settings.json` for MCP only |
| **Sourcegraph Cody** | Prompt Library model, not file-based instructions |

---

## Implementation Options

### Option A: Symlink Strategy (Minimal Effort)

```
project/
├── CLAUDE.md              # Source of truth
├── AGENTS.md              # Symlink → CLAUDE.md (Codex)
├── CONVENTIONS.md         # Symlink → CLAUDE.md (Aider)
├── .continuerules         # Symlink → CLAUDE.md (Continue)
└── .windsurfrules         # Symlink → CLAUDE.md (Windsurf)
```

**Pros**: Zero maintenance, single source of truth
**Cons**: Doesn't handle tool-specific features (commands, hooks, skills)

### Option B: Build Script / Generator

Create a `sync-ai-config.js` script that:
1. Reads `CLAUDE.md` as the source of truth
2. Generates tool-specific files with appropriate transformations
3. Handles frontmatter for Cursor/Copilot
4. Splits into multiple files for Amazon Q

```javascript
// Example structure
{
  "source": "CLAUDE.md",
  "targets": [
    { "tool": "codex", "output": "AGENTS.md" },
    { "tool": "copilot", "output": ".github/copilot-instructions.md" },
    { "tool": "cursor", "output": ".cursor/rules/main.mdc", "addFrontmatter": true },
    { "tool": "windsurf", "output": ".windsurfrules" },
    { "tool": "amazonq", "output": ".amazonq/rules/main.md" }
  ]
}
```

### Option C: Universal Format Specification

Create a structured format that can be transformed:

```markdown
---
# Universal AI Instructions Header
tool_compatibility:
  claude: true
  codex: true
  copilot: true
  cursor: true
applies_to: "**/*.tsx"  # For tools that support path-specific rules
---

# Project Instructions
...content...
```

Then build transpilers for each target format.

---

## Feature Compatibility Matrix

| Feature | Claude | Codex | Copilot | Cursor | Aider | Continue | Windsurf | Amazon Q |
|---------|--------|-------|---------|--------|-------|----------|----------|----------|
| **Plain Markdown instructions** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Path-specific rules** | ✅ (nested) | ✅ (nested) | ✅ (frontmatter) | ✅ (globs) | ❌ | ✅ | ✅ | ✅ (globs) |
| **Custom commands** | ✅ | ❌ (MCP) | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (agents) |
| **Event hooks** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Skills/behaviors** | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ (Hub) | ❌ | ❌ |
| **MCP support** | ✅ | ✅ | ❌ | ✅ | ❌ | ✅ | ❌ | ❌ |

---

## Recommended Action Plan

### Phase 1: Quick Wins (5 min)
Add symlinks for tools with high compatibility:
```bash
ln -s CLAUDE.md AGENTS.md
ln -s CLAUDE.md CONVENTIONS.md
ln -s CLAUDE.md .continuerules
ln -s CLAUDE.md .windsurfrules
```

### Phase 2: Manual Setup (30 min)
- Create `.github/copilot-instructions.md` (copy main content)
- Create `.cursor/rules/project.mdc` with frontmatter
- Create `.amazonq/rules/main.md`

### Phase 3: Automation (2-4 hours)
Build a generator script that:
- Reads `CLAUDE.md` as source of truth
- Generates all target formats
- Runs on pre-commit or via npm script

---

## References

- [OpenAI Codex AGENTS.md Guide](https://developers.openai.com/codex/guides/agents-md)
- [GitHub Copilot Custom Instructions](https://docs.github.com/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot)
- [Cursor Rules for AI](https://docs.cursor.com/context/rules-for-ai)
- [Aider Conventions Documentation](https://aider.chat/docs/usage/conventions.html)
- [Continue.dev Rule Blocks](https://blog.continue.dev/creating-rule-blocks-on-continue-hub-a-developers-guide/)
- [Windsurf Documentation](https://docs.windsurf.com)
- [Amazon Q Developer Project Rules](https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/context-project-rules.html)
- [Zed Agent Settings](https://zed.dev/docs/ai/agent-settings)

---

## Notes

The industry is converging on Markdown-based instructions with optional YAML frontmatter. The `CLAUDE.md` content is already 80-90% portable—the main gaps are:

1. **Commands/Hooks/Skills**: These are Claude-specific and would need MCP servers or tool-specific equivalents
2. **Frontmatter**: Cursor and Copilot want metadata for path-scoping

Consider participating in or watching the [AAIF (Agentic AI Foundation)](https://developers.openai.com/codex/guides/agents-md) standardization efforts.
