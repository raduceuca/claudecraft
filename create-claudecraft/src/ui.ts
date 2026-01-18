import figlet from 'figlet';
import gradient from 'gradient-string';
import pc from 'picocolors';
import { DEFAULT_PORT, VERSION } from './constants.js';

// Split gradients for two-line logo
const claudeGradient = gradient(['#00ff9f', '#00b8ff']); // Green → Cyan (fresh)
const craftGradient = gradient(['#a855f7', '#6d28d9']);  // Purple → Violet (deep)

// Generate ASCII art for each word separately
const asciiClaude = figlet.textSync('CLAUDE', { font: 'ANSI Shadow', horizontalLayout: 'fitted' });
const asciiCraft = figlet.textSync('CRAFT', { font: 'ANSI Shadow', horizontalLayout: 'fitted' });

// Get today's date for the revision block
const today = new Date().toISOString().split('T')[0].replace(/-/g, '.');

// ═══════════════════════════════════════════════════════════════════════════
// ALIGNMENT: Frame width = 76 chars exactly
// Normal row:   "  │ │  " (7) + content (66) + "│ │" (3) = 76
// CAP HT row:   "  │ │  " (7) + content (58) + "│◀┼─ CAP HT" (11) = 76
// BASELINE row: "  │ │  " (7) + content (56) + "│◀┼─ BASELINE" (13) = 76
// ASCII art: CLAUDE=49 chars, CRAFT=41 chars
// ═══════════════════════════════════════════════════════════════════════════
const FRAME = 76;
const PREFIX = '  │ │  ';     // 7 chars
const SUFFIX = '│ │';         // 3 chars
const INNER = 66;             // Normal content width

// Pad content to exact width (strips ANSI codes for length calc)
const padTo = (line: string, width: number): string => {
  // eslint-disable-next-line no-control-regex
  const visible = line.replace(/\x1b\[[0-9;]*m/g, '').length;
  return line + ' '.repeat(Math.max(0, width - visible));
};

// Build a normal row: prefix(7) + content(66) + suffix(3) = 76 chars
const row = (content: string): string => {
  return `${pc.dim(PREFIX)}${padTo(content, INNER)}${pc.dim(SUFFIX)}`;
};

// Build a callout row with specific suffix
const calloutRow = (content: string, suffix: string): string => {
  const contentWidth = FRAME - PREFIX.length - suffix.length;
  return `${pc.dim(PREFIX)}${padTo(content, contentWidth)}${pc.dim(suffix)}`;
};

export function renderHeader(): string {
  // Apply gradients and filter empty lines
  const claudeLines = claudeGradient(asciiClaude).split('\n').filter(l => l.trim());
  const craftLines = craftGradient(asciiCraft).split('\n').filter(l => l.trim());

  const lines: string[] = [];

  // ═══ TOP FRAME (76 chars) ════════════════════════════════════════════════
  // "  ⊕" (3) + "─┬" (2) + dashes (68) + "┬─" (2) + "⊕" (1) = 76
  lines.push(pc.cyan('  ⊕') + pc.dim('─┬' + '─'.repeat(68) + '┬─') + pc.cyan('⊕'));
  // "    │ ◀" (7) + dashes (28) + " 72 COLS " (9) + dashes (28) + "▶ │" (4) = 76
  lines.push(pc.dim('    │ ◀' + '─'.repeat(28) + ' 72 COLS ' + '─'.repeat(28) + '▶ │ '));
  // "  ┌─┼" (5) + dashes (68) + "┼─┐" (3) = 76
  lines.push(pc.dim('  ┌─┼' + '─'.repeat(68) + '┼─┐'));

  // ═══ CONTENT AREA ════════════════════════════════════════════════════════
  // Ruler
  lines.push(row('┆ · · · · ┆ · · · · ┆ · · · · ┆ · · · · ┆ · · · · ┆ · · · · ┆ ·'));

  // CLAUDE with CAP HT callout on first line
  claudeLines.forEach((line, i) => {
    if (i === 0) {
      lines.push(calloutRow(line, '│◀┼─ CAP HT'));
    } else {
      lines.push(row(line));
    }
  });

  // Baseline separator (content = 76 - 7 - 13 = 56, so 53 dashes + 2 for ├┤ = 55)
  lines.push(calloutRow('├' + '─'.repeat(53) + '┤', '│◀┼─ BASELINE'));

  // CRAFT
  craftLines.forEach((line) => {
    lines.push(row(line));
  });

  // Measurement ruler
  lines.push(row('0        10        20        30        40        50        60'));

  // ═══ BOTTOM FRAME (76 chars) ══════════════════════════════════════════════
  // "  └─┼" (5) + dashes (68) + "┼─┘" (3) = 76
  lines.push(pc.dim('  └─┼' + '─'.repeat(68) + '┼─┘'));

  // CMYK bar + revision block (76 chars)
  // "    │  " (7) + "■ C  ■ M  ■ Y  ■ K" (18) + spaces (11) + rev (37) + "  │" (3) = 76
  const cmyk = pc.cyan('■') + pc.dim(' C  ') + pc.magenta('■') + pc.dim(' M  ') + pc.yellow('■') + pc.dim(' Y  ') + pc.white('■') + pc.dim(' K');
  const rev = pc.green(`REV ${VERSION}`) + pc.dim(` │ ${today} │ `) + pc.yellow('WORKS ON MAC');
  lines.push(pc.dim('    │  ') + cmyk + pc.dim('           ') + rev + pc.dim('  │'));

  // Bottom registration marks: "  ⊕" (3) + "─┴" (2) + dashes (68) + "┴─" (2) + "⊕" (1) = 76
  lines.push(pc.cyan('  ⊕') + pc.dim('─┴' + '─'.repeat(68) + '┴─') + pc.cyan('⊕'));

  return '\n' + lines.join('\n') + '\n';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function renderMiniHeader(_step?: number, _total?: number): string {
  // Condensed ASCII logo with measurement tick - split gradient
  const logoGradient = gradient(['#00ff9f', '#00b8ff', '#a855f7', '#6d28d9']);
  const logo = logoGradient('▓▒░ CLAUDECRAFT');
  const tick = pc.dim('┆');
  return `
  ${tick} ${logo} ${pc.dim(`v${VERSION}`)} ${tick}
`;
}

export function renderStepHeader(
  step: number,
  total: number,
  _title: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _required = false
): string {
  return renderMiniHeader(step, total);
}

export function renderStepFooter(): string {
  return '';
}

export function renderSpecs(specs: Array<{ label: string; value: string }>): string {
  return specs.map((s) => `  ${pc.dim('│')} ${pc.dim(s.label + ':')} ${s.value}`).join('\n');
}

export function renderAnnotation(text: string): string {
  return `  ${pc.dim('│')} ${pc.dim(text)}`;
}

export function renderError(title: string, body: string): string {
  return `
  ${pc.dim('╭─── ERROR ────────────────────────────────────────────────────────────╮')}
  ${pc.dim('│')} ${pc.red('✗')} ${pc.bold(pc.red(title))}
  ${pc.dim('├─────────────────────────────────────────────────────────────────────┤')}
${body
  .split('\n')
  .map((line) => `  ${pc.dim('│')} ${line}`)
  .join('\n')}
  ${pc.dim('╰─────────────────────────────────────────────────────────────────────╯')}
`;
}

export interface ProgressTask {
  name: string;
  status: 'done' | 'active' | 'queued';
  progress?: number;
  time?: string;
  detail?: string;
}

export function renderProgress(tasks: ProgressTask[]): string {
  const lines = tasks.map((t, i) => {
    const width = 24;
    let bar = '';
    let statusText = '';
    const lineNum = pc.dim(`${String(i + 1).padStart(2)}`);

    if (t.status === 'done') {
      bar = pc.green('█'.repeat(width));
      statusText = pc.green('✓ done');
    } else if (t.status === 'active') {
      const filled = Math.floor(((t.progress || 0) / 100) * width);
      // Animated-looking bar with gradient feel
      bar = pc.cyan('▓'.repeat(filled)) + pc.dim('░'.repeat(width - filled));
      statusText = pc.yellow(`◐ ${t.progress}%`);
    } else {
      bar = pc.dim('·'.repeat(width));
      statusText = pc.dim('○ waiting');
    }

    const detail = t.detail ? pc.dim(` ${t.detail}`) : '';

    return `  ${pc.dim('│')} ${lineNum} ${t.name.padEnd(12)} ${bar} ${statusText.padEnd(10)}${detail}`;
  });

  return `
  ${pc.dim('╭─── PROGRESS ─────────────────────────────────────────────────────────╮')}
${lines.join('\n')}
  ${pc.dim('├─────────────────────────────────────────────────────────────────────┤')}`;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function renderProgressFooter(elapsed: string, _eta: string): string {
  return `  ${pc.dim('│')} elapsed: ${elapsed}
  ${pc.dim('╰─────────────────────────────────────────────────────────────────────╯')}
`;
}

export function renderComplete(
  projectName: string,
  stats: Record<string, string | number>
): string {
  // Existential dread for designers
  const dread = [
    "The blank canvas awaits. It judges you silently.",
    "You wanted this. Remember that when it's 3am.",
    "The cursor blinks. It will outlast us all.",
    "Another project. Another chance to mass Cmd+Z.",
    "Ship it before the doubt sets in.",
    "The robots built this. You still have to design it.",
    "Perfection is the enemy. So is that deadline.",
    "It works on localhost. That's something.",
    "Congratulations. You've automated your anxiety.",
    "The PRD was 'make it pop'. Good luck.",
    "Your taste exceeds your velocity. As always.",
    "Claude believes in you. Claude is wrong sometimes.",
    "27 skills. 0 excuses.",
    "The slop awaits your curation.",
    "localhost:6969. Nice.",
  ];
  const randomDread = dread[Math.floor(Math.random() * dread.length)];

  // Stats with units for designer feel
  const filesVal = String(stats.files).padEnd(4);
  const skillsVal = String(stats.skills).padEnd(4);
  const timeVal = String(stats.time).padEnd(6);

  return `
  ${pc.dim('╭─── COMPLETE ─────────────────────────────────────────────────────────╮')}
  ${pc.dim('│')} ${pc.green('✓')} ${pc.bold('Ready')} ${pc.dim('·')} ${pc.dim(randomDread)}
  ${pc.dim('├─── NEXT ─────────────────────────────────────────────────────────────┤')}
  ${pc.dim('│')} ${pc.dim('01')} ${pc.cyan('$')} cd ${projectName}
  ${pc.dim('│')} ${pc.dim('02')} ${pc.cyan('$')} bun dev
  ${pc.dim('│')} ${pc.dim('03')} ${pc.cyan('$')} open http://localhost:${DEFAULT_PORT}
  ${pc.dim('├─── STATS ────────────────────────────────────────────────────────────┤')}
  ${pc.dim('│')} files ${filesVal} ${pc.dim('│')} skills ${skillsVal} ${pc.dim('│')} time ${timeVal} ${pc.dim('│')} deps 0
  ${pc.dim('├─── COMMANDS ─────────────────────────────────────────────────────────┤')}
  ${pc.dim('│')} ${pc.cyan('/build')}       ${pc.dim('compile and hope')}
  ${pc.dim('│')} ${pc.cyan('/brainstorm')}  ${pc.dim('poke holes in your ideas')}
  ${pc.dim('│')} ${pc.cyan('/ralph')}       ${pc.dim('sleep while Claude ships')}
  ${pc.dim('│')} ${pc.cyan('/write-plan')}  ${pc.dim('think before you regret')}
  ${pc.dim('├─────────────────────────────────────────────────────────────────────┤')}
  ${pc.dim('│')} ${pc.dim('github.com/raduceuca/claudecraft')} ${pc.dim('·')} ${pc.dim('MIT')} ${pc.dim('·')} ${pc.dim(`v${VERSION}`)}
  ${pc.dim('╰─────────────────────────────────────────────────────────────────────╯')}
`;
}

export function renderInitComplete(stats: {
  files: number;
  skills: number;
  commands: number;
  time: string;
}): string {
  // Existential dread for existing projects
  const dread = [
    "Your existing chaos now has structure. Briefly.",
    "The slop has been organized. Alphabetically, even.",
    "Claude will remember this project. Unfortunately.",
    "Skills injected. Side effects may include productivity.",
    ".claude/ added. Your git diff weeps.",
    "Now Claude knows your codebase. Be afraid.",
    "Legacy code meets AI. Pray.",
    "27 guardrails installed. You're still the driver.",
    "Your technical debt now has company.",
  ];
  const randomDread = dread[Math.floor(Math.random() * dread.length)];

  return `
  ${pc.dim('╭─── INIT COMPLETE ────────────────────────────────────────────────────╮')}
  ${pc.dim('│')} ${pc.green('✓')} ${pc.bold('Skills injected')} ${pc.dim('·')} ${pc.dim(randomDread)}
  ${pc.dim('├─── ADDED ────────────────────────────────────────────────────────────┤')}
  ${pc.dim('│')} .claude/skills/     ${pc.dim(`${stats.skills} skills`)}
  ${pc.dim('│')} .claude/commands/   ${pc.dim(`${stats.commands} commands`)}
  ${pc.dim('│')} .claude/hooks/      ${pc.dim('2 hooks')}
  ${pc.dim('│')} .claude/settings/   ${pc.dim('config + MCP guide')}
  ${pc.dim('│')} CLAUDE.md           ${pc.dim('project context (if missing)')}
  ${pc.dim('├─── FIGMA INTEGRATION ────────────────────────────────────────────────┤')}
  ${pc.dim('│')} ${pc.cyan('$')} claude mcp add --transport http figma https://mcp.figma.com/mcp
  ${pc.dim('│')} ${pc.dim('Then /mcp → figma → Authenticate')}
  ${pc.dim('├─── STATS ────────────────────────────────────────────────────────────┤')}
  ${pc.dim('│')} files ${String(stats.files).padEnd(4)} ${pc.dim('│')} skills ${String(stats.skills).padEnd(4)} ${pc.dim('│')} time ${stats.time}
  ${pc.dim('├─── NEXT ─────────────────────────────────────────────────────────────┤')}
  ${pc.dim('│')} ${pc.cyan('/brainstorm')}  ${pc.dim('start a conversation')}
  ${pc.dim('│')} ${pc.cyan('/write-plan')}  ${pc.dim('plan before building')}
  ${pc.dim('│')} ${pc.dim('See .claude/settings/MCP_SETUP.md for more integrations')}
  ${pc.dim('╰─────────────────────────────────────────────────────────────────────╯')}
`;
}

