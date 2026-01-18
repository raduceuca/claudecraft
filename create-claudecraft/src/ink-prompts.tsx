import React, { useState, useEffect } from 'react';
import { render, Box, Text, useInput, useApp } from 'ink';
import TextInput from 'ink-text-input';
import SelectInput from 'ink-select-input';
import figlet from 'figlet';
import gradient from 'gradient-string';
import fs from 'fs';
import path from 'path';
import { SKILLS, BUNDLES, VERSION } from './constants.js';

// Split gradients for two-line logo
const claudeGradient = gradient(['#00ff9f', '#00b8ff']); // Green → Cyan (fresh)
const craftGradient = gradient(['#a855f7', '#6d28d9']);  // Purple → Violet (deep)

// Generate ASCII art for each word separately
const asciiClaude = figlet.textSync('CLAUDE', {
  font: 'ANSI Shadow',
  horizontalLayout: 'fitted',
});

const asciiCraft = figlet.textSync('CRAFT', {
  font: 'ANSI Shadow',
  horizontalLayout: 'fitted',
});

// Get today's date for the revision block
const today = new Date().toISOString().split('T')[0].replace(/-/g, '.');

// ═══════════════════════════════════════════════════════════════════════════
// ALIGNMENT: Frame width = 76 chars exactly (must match ui.ts)
// Normal row:   "  │ │  " (7) + content (66) + "│ │" (3) = 76
// CAP HT row:   "  │ │  " (7) + content (58) + "│◀┼─ CAP HT" (11) = 76
// BASELINE row: "  │ │  " (7) + content (56) + "│◀┼─ BASELINE" (13) = 76
// ASCII: CLAUDE=49 chars, CRAFT=41 chars
// ═══════════════════════════════════════════════════════════════════════════
const INNER = 66;         // Normal row content width
const CAP_HT_WIDTH = 58;  // CAP HT row content width (76-7-11)
const BASELINE_WIDTH = 56; // BASELINE row content width (76-7-13)

// Pad to exact width (strips ANSI codes for length calc)
const padTo = (line: string, width: number): string => {
  // eslint-disable-next-line no-control-regex
  const visible = line.replace(/\x1b\[[0-9;]*m/g, '').length;
  return line + ' '.repeat(Math.max(0, width - visible));
};

// Types
export interface UserChoices {
  projectName: string;
  bundle: 'everything' | 'designer' | 'workflow' | 'custom';
  selectedSkills: string[];
  includeHomepage: boolean;
  initGit: boolean;
}

export interface InitChoices {
  selectedSkills: string[];
}

// Existential dread collections
const DREAD = {
  help: [
    "You're not being replaced. You're being... augmented. Involuntarily.",
    "The AI can't feel impostor syndrome. That's still your job.",
    "Remember when 'prompt engineering' wasn't a career? Good times.",
    "The robots write code now. You write prompts. This is fine.",
    "At least the AI doesn't have opinions about your font choices. Yet.",
  ],
  reassurance: [
    "But hey, someone still needs taste. That's you. Allegedly.",
    "Breathe. The AI still can't center a div without help.",
    "Keep going. The AI believes in you. (It doesn't. It can't.)",
  ],
  cancel: [
    "You'll be back. They always come back.",
    "Ctrl+C won't save you from the future.",
    "Quitting is a valid design decision.",
  ],
};

const random = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// Slash commands
const COMMANDS = [
  { name: '/help', hint: 'existential guidance' },
  { name: '/skills', hint: 'what the AI knows' },
  { name: '/quit', hint: 'escape while you can' },
];

// Progress panel - 76 chars wide to match header
function ProgressPanel({ step, total, labels }: { step: number; total: number; labels: string[] }) {
  const stepWidth = Math.floor(66 / total);

  return (
    <Box flexDirection="column">
      <Text dimColor>  ╭─── PROGRESS {'─'.repeat(57)}╮</Text>
      <Text dimColor>  │                                                                      │</Text>
      <Text>
        <Text dimColor>  │  </Text>
        {Array.from({ length: total }, (_, i) => {
          const num = i + 1;
          const label = labels[i] || `Step ${num}`;
          const isComplete = num < step;
          const isCurrent = num === step;
          const isPending = num > step;

          return (
            <React.Fragment key={num}>
              {isComplete && <Text color="green">● {label.substring(0, stepWidth - 3).padEnd(stepWidth - 1)}</Text>}
              {isCurrent && <Text color="cyan">◉ {label.substring(0, stepWidth - 3).padEnd(stepWidth - 1)}</Text>}
              {isPending && <Text dimColor>○ {label.substring(0, stepWidth - 3).padEnd(stepWidth - 1)}</Text>}
            </React.Fragment>
          );
        })}
        <Text dimColor>│</Text>
      </Text>
      <Text dimColor>  │                                                                      │</Text>
      <Text dimColor>  ╰{'─'.repeat(72)}╯</Text>
    </Box>
  );
}

// Step labels for progress panel
const STEP_LABELS = ['Name', 'Skills', 'Homepage', 'Git'];

// Technical Drawing Header with prepress marks (76 chars wide, perfectly aligned)
function Header({ step, totalSteps }: { step?: number; totalSteps?: number }) {
  // Apply gradients and filter empty lines
  const claudeLines = claudeGradient(asciiClaude).split('\n').filter(l => l.trim());
  const craftLines = craftGradient(asciiCraft).split('\n').filter(l => l.trim());

  return (
    <Box flexDirection="column" marginBottom={1}>
      {/* ═══ TOP FRAME (76 chars) ═══ */}
      <Text>
        <Text color="cyan">  ⊕</Text>
        <Text dimColor>─┬{'─'.repeat(68)}┬─</Text>
        <Text color="cyan">⊕</Text>
      </Text>
      <Text dimColor>    │ ◀{'─'.repeat(26)} 72 COLS {'─'.repeat(26)}▶ │</Text>
      <Text dimColor>  ┌─┼{'─'.repeat(68)}┼─┐</Text>

      {/* ═══ CONTENT AREA ═══ */}
      {/* Ruler - normal row */}
      <Text>
        <Text dimColor>  │ │  </Text>
        <Text dimColor>{padTo('┆ · · · · ┆ · · · · ┆ · · · · ┆ · · · · ┆ · · · · ┆ · · · · ┆ ·', INNER)}</Text>
        <Text dimColor>│ │</Text>
      </Text>

      {/* CLAUDE with CAP HT callout on first line */}
      {claudeLines.map((line, i) => (
        <Text key={`claude-${i}`}>
          <Text dimColor>  │ │  </Text>
          {i === 0 ? (
            <>
              <Text>{padTo(line, CAP_HT_WIDTH)}</Text>
              <Text dimColor>│◀┼─ CAP HT</Text>
            </>
          ) : (
            <>
              <Text>{padTo(line, INNER)}</Text>
              <Text dimColor>│ │</Text>
            </>
          )}
        </Text>
      ))}

      {/* Baseline separator - callout row */}
      <Text>
        <Text dimColor>  │ │  </Text>
        <Text dimColor>{padTo('├' + '─'.repeat(53) + '┤', BASELINE_WIDTH)}</Text>
        <Text dimColor>│◀┼─ BASELINE</Text>
      </Text>

      {/* CRAFT - normal rows */}
      {craftLines.map((line, i) => (
        <Text key={`craft-${i}`}>
          <Text dimColor>  │ │  </Text>
          <Text>{padTo(line, INNER)}</Text>
          <Text dimColor>│ │</Text>
        </Text>
      ))}

      {/* Measurement ruler - normal row */}
      <Text>
        <Text dimColor>  │ │  </Text>
        <Text dimColor>{padTo('0        10        20        30        40        50        60', INNER)}</Text>
        <Text dimColor>│ │</Text>
      </Text>

      {/* ═══ BOTTOM FRAME (76 chars) ═══ */}
      <Text dimColor>  └─┼{'─'.repeat(68)}┼─┘</Text>

      {/* CMYK bar + revision block (76 chars) */}
      <Text>
        <Text dimColor>    │  </Text>
        <Text color="cyan">■</Text><Text dimColor> C  </Text>
        <Text color="magenta">■</Text><Text dimColor> M  </Text>
        <Text color="yellow">■</Text><Text dimColor> Y  </Text>
        <Text color="white">■</Text><Text dimColor> K     </Text>
        <Text color="green">REV {VERSION}</Text>
        <Text dimColor> │ {today} │ </Text>
        <Text color="yellow">WORKS ON MAC</Text>
        <Text dimColor>  │</Text>
      </Text>

      {/* Bottom registration marks (76 chars) */}
      <Text>
        <Text color="cyan">  ⊕</Text>
        <Text dimColor>─┴{'─'.repeat(68)}┴─</Text>
        <Text color="cyan">⊕</Text>
      </Text>

      {/* Progress panel (specs panel removed) */}
      {step && totalSteps ? (
        <Box marginTop={1}>
          <ProgressPanel step={step} total={totalSteps} labels={STEP_LABELS} />
        </Box>
      ) : null}
    </Box>
  );
}

// Autocomplete dropdown - matches design language
function Autocomplete({
  query,
  commands,
  onSelect
}: {
  query: string;
  commands: typeof COMMANDS;
  onSelect: (cmd: string) => void;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const filtered = commands.filter(c =>
    c.name.toLowerCase().startsWith(query.toLowerCase())
  );

  useInput((input, key) => {
    if (key.downArrow) {
      setSelectedIndex(i => Math.min(i + 1, filtered.length - 1));
    } else if (key.upArrow) {
      setSelectedIndex(i => Math.max(i - 1, 0));
    } else if (key.return && filtered[selectedIndex]) {
      onSelect(filtered[selectedIndex].name);
    }
  });

  if (filtered.length === 0) return null;

  return (
    <Box flexDirection="column">
      <Text dimColor>├─── COMMANDS ─────────────────────────────────────────────────────────┤</Text>
      {filtered.map((cmd, i) => (
        <Box key={cmd.name}>
          <Text dimColor>│ </Text>
          <Text color={i === selectedIndex ? 'cyan' : 'white'}>
            {i === selectedIndex ? '› ' : '  '}
            {cmd.name.padEnd(10)}
          </Text>
          <Text dimColor>{cmd.hint}</Text>
        </Box>
      ))}
      <Text dimColor>╰─────────────────────────────────────────────────────────────────────╯</Text>
    </Box>
  );
}

// Help panel - matches specs panel design
function HelpPanel({ onClose }: { onClose: () => void }) {
  useInput((_, key) => {
    if (key.escape || key.return) onClose();
  });

  return (
    <Box flexDirection="column">
      <Text dimColor>╭─── HELP ─────────────────────────────────────────────────────────────╮</Text>
      <Text dimColor>│ <Text>{random(DREAD.help).padEnd(69)}</Text>│</Text>
      <Text dimColor>├─── COMMANDS ─────────────────────────────────────────────────────────┤</Text>
      <Text dimColor>│   <Text color="cyan">/help</Text>     <Text dimColor>you are here (existentially, too)</Text>                     │</Text>
      <Text dimColor>│   <Text color="cyan">/skills</Text>   <Text dimColor>see what the robots learned</Text>                           │</Text>
      <Text dimColor>│   <Text color="cyan">/quit</Text>     <Text dimColor>rage quit</Text>                                             │</Text>
      <Text dimColor>├─── NAVIGATION ───────────────────────────────────────────────────────┤</Text>
      <Text dimColor>│   ↑↓        move through options                                     │</Text>
      <Text dimColor>│   space     toggle selection                                         │</Text>
      <Text dimColor>│   enter     confirm your life choices                                │</Text>
      <Text dimColor>│   esc       cancel (the project, not your career)                    │</Text>
      <Text dimColor>├─────────────────────────────────────────────────────────────────────┤</Text>
      <Text dimColor>│ <Text>{random(DREAD.reassurance).padEnd(69)}</Text>│</Text>
      <Text dimColor>├─────────────────────────────────────────────────────────────────────┤</Text>
      <Text dimColor>│ <Text dimColor>Press Enter or Esc to continue...</Text>                                │</Text>
      <Text dimColor>╰─────────────────────────────────────────────────────────────────────╯</Text>
    </Box>
  );
}

// Skills panel - matches specs panel design
function SkillsPanel({ onClose }: { onClose: () => void }) {
  useInput((_, key) => {
    if (key.escape || key.return) onClose();
  });

  const workflow = SKILLS.filter(s => s.group === 'workflow');
  const design = SKILLS.filter(s => s.group === 'design');

  return (
    <Box flexDirection="column">
      <Text dimColor>╭─── SKILLS ───────────────────────────────────────────────────────────╮</Text>
      <Text dimColor>│ Things the AI learned so you don't have to:                          │</Text>
      <Text dimColor>├─── WORKFLOW ({String(workflow.length).padEnd(2)}) ──────────────────────────────────────────────────────┤</Text>
      {workflow.map(s => (
        <Text key={s.name} dimColor>│   {s.name.padEnd(24)} <Text dimColor>{s.description.substring(0, 40).padEnd(40)}</Text>│</Text>
      ))}
      <Text dimColor>├─── DESIGN ({String(design.length).padEnd(2)}) ────────────────────────────────────────────────────────┤</Text>
      {design.map(s => (
        <Text key={s.name} dimColor>│   {s.name.padEnd(24)} <Text dimColor>{s.description.substring(0, 40).padEnd(40)}</Text>│</Text>
      ))}
      <Text dimColor>├─────────────────────────────────────────────────────────────────────┤</Text>
      <Text dimColor>│ Press Enter or Esc to continue...                                   │</Text>
      <Text dimColor>╰─────────────────────────────────────────────────────────────────────╯</Text>
    </Box>
  );
}

// Frame component - matches specs panel design
function Frame({ title, children, hint }: { title: string; children: React.ReactNode; hint?: string }) {
  // Calculate padding for consistent width
  const titleSection = `─── ${title} `;
  const hintSection = hint ? ` ${hint} ` : ' ';
  const remaining = 71 - titleSection.length - hintSection.length;
  const padding = '─'.repeat(Math.max(0, remaining));

  return (
    <Box flexDirection="column">
      <Text dimColor>╭───{' '}<Text bold color="cyan">{title}</Text>{' '}{hint ? <Text dimColor>{hint}</Text> : null}{' '}{padding}╮</Text>
      <Box flexDirection="column" paddingLeft={1}>
        <Text dimColor>│</Text>
        {children}
        <Text dimColor>│</Text>
      </Box>
      <Text dimColor>╰─────────────────────────────────────────────────────────────────────╯</Text>
    </Box>
  );
}

// Input with slash command support
function CommandInput({
  value,
  onChange,
  onSubmit,
  placeholder,
  validate,
}: {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  placeholder: string;
  validate?: (value: string) => string | undefined;
}) {
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    setShowAutocomplete(value.startsWith('/') && value.length < 10);
  }, [value]);

  const handleSubmit = (val: string) => {
    if (val.startsWith('/')) {
      // Handle as command
      onSubmit(val);
    } else {
      // Validate and submit
      const err = validate?.(val);
      if (err) {
        setError(err);
      } else {
        setError(undefined);
        onSubmit(val);
      }
    }
  };

  return (
    <Box flexDirection="column">
      <Box>
        <Text color="cyan">› </Text>
        <TextInput
          value={value}
          onChange={onChange}
          onSubmit={handleSubmit}
          placeholder={placeholder}
        />
      </Box>
      {showAutocomplete && (
        <Box marginTop={1}>
          <Autocomplete
            query={value}
            commands={COMMANDS}
            onSelect={(cmd) => {
              onChange(cmd);
              onSubmit(cmd);
            }}
          />
        </Box>
      )}
      {error && (
        <Box marginTop={1}>
          <Text color="red">✗ {error}</Text>
        </Box>
      )}
    </Box>
  );
}

// Main wizard app
type Step = 'name' | 'bundle' | 'skills-workflow' | 'skills-design' | 'homepage' | 'git' | 'done';
type Panel = 'help' | 'skills' | null;

function WizardApp({
  defaultName,
  onComplete
}: {
  defaultName?: string;
  onComplete: (choices: UserChoices) => void;
}) {
  const { exit } = useApp();
  const [step, setStep] = useState<Step>('name');
  const [panel, setPanel] = useState<Panel>(null);
  const [input, setInput] = useState(defaultName || '');

  // Collected choices
  const [projectName, setProjectName] = useState('');
  const [bundle, setBundle] = useState<UserChoices['bundle']>('everything');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [includeHomepage, setIncludeHomepage] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_initGit, setInitGit] = useState(true);

  // Handle escape to quit
  useInput((_, key) => {
    if (key.escape && !panel) {
      console.log('\n' + random(DREAD.cancel));
      exit();
    }
  });

  // Handle slash commands
  const handleCommand = (cmd: string) => {
    const normalized = cmd.toLowerCase().trim();
    if (normalized === '/help' || normalized === '/h') {
      setPanel('help');
    } else if (normalized === '/skills' || normalized === '/list') {
      setPanel('skills');
    } else if (normalized === '/quit' || normalized === '/q' || normalized === '/exit') {
      console.log('\n' + random(DREAD.cancel));
      exit();
    }
    setInput('');
  };

  // Handle name submission
  const handleNameSubmit = (value: string) => {
    if (value.startsWith('/')) {
      handleCommand(value);
      return;
    }
    setProjectName(value);
    setStep('bundle');
  };

  // Validate project name
  const validateName = (value: string): string | undefined => {
    if (!value) return 'Required';
    if (!/^[a-z0-9-]+$/.test(value)) return 'Lowercase, numbers, dashes only';
    if (value.length > 64) return 'Max 64 chars';
    const targetDir = path.resolve(process.cwd(), value);
    if (fs.existsSync(targetDir)) return `Directory "${value}" already exists`;
    return undefined;
  };

  // Bundle options
  const bundleOptions = [
    { label: 'Everything', value: 'everything', hint: `All ${SKILLS.length} skills · no restraint` },
    { label: 'Designer Essentials', value: 'designer', hint: `${BUNDLES.designer.skills.length} skills · UI, a11y, Figma` },
    { label: 'Workflow Only', value: 'workflow', hint: `${SKILLS.filter(s => s.group === 'workflow').length} skills · process only` },
    { label: 'Let Me Pick', value: 'custom', hint: 'Control freak? Respect.' },
  ];

  const handleBundleSelect = (item: { value: string }) => {
    const b = item.value as UserChoices['bundle'];
    setBundle(b);

    if (b === 'custom') {
      setStep('skills-workflow');
    } else {
      // Set skills based on bundle
      if (b === 'everything') {
        setSelectedSkills(SKILLS.map(s => s.name));
      } else if (b === 'designer') {
        setSelectedSkills([...BUNDLES.designer.skills]);
      } else {
        setSelectedSkills(SKILLS.filter(s => s.group === 'workflow').map(s => s.name));
      }
      setStep('homepage');
    }
  };

  // Homepage options
  const homepageOptions = [
    { label: 'Yes', value: true, hint: '+6 files · delete it later' },
    { label: 'No', value: false, hint: 'Blank App.tsx · the void awaits' },
  ];

  // Git options
  const gitOptions = [
    { label: 'Yes', value: true, hint: 'Fresh repo · future you says thanks' },
    { label: 'No', value: false, hint: 'No .git · living dangerously' },
  ];

  // Render panels
  if (panel === 'help') {
    return (
      <Box flexDirection="column">
        <Header />
        <HelpPanel onClose={() => setPanel(null)} />
      </Box>
    );
  }

  if (panel === 'skills') {
    return (
      <Box flexDirection="column">
        <Header />
        <SkillsPanel onClose={() => setPanel(null)} />
      </Box>
    );
  }

  // Show full header with specs only on first screen
  const isFirstScreen = step === 'name';

  // Map step to number for progress bar
  const stepToNum: Record<Step, number> = {
    'name': 1,
    'bundle': 2,
    'skills-workflow': 2,
    'skills-design': 2,
    'homepage': 3,
    'git': 4,
    'done': 4,
  };
  const currentStep = stepToNum[step];
  const totalSteps = 4;

  // Render steps
  return (
    <Box flexDirection="column">
      <Header
        step={isFirstScreen ? undefined : currentStep}
        totalSteps={isFirstScreen ? undefined : totalSteps}
      />

      {step === 'name' && (
        <Frame title="PROJECT NAME" hint="lowercase · numbers · dashes · /help">
          <Text>What are we calling this?</Text>
          <Box marginTop={1}>
            <CommandInput
              value={input}
              onChange={setInput}
              onSubmit={handleNameSubmit}
              placeholder="my-app"
              validate={validateName}
            />
          </Box>
        </Frame>
      )}

      {step === 'bundle' && (
        <Frame title="SKILL BUNDLE">
          <Text>How much help do you want?</Text>
          <Box marginTop={1}>
            <SelectInput
              items={bundleOptions.map(o => ({
                label: `${o.label} - ${o.hint}`,
                value: o.value
              }))}
              onSelect={handleBundleSelect}
            />
          </Box>
        </Frame>
      )}

      {step === 'homepage' && (
        <Frame title="EXAMPLE HOMEPAGE">
          <Text>Include the example homepage?</Text>
          <Box marginTop={1}>
            <SelectInput
              items={homepageOptions.map(o => ({
                label: `${o.label} - ${o.hint}`,
                value: o.value
              }))}
              onSelect={(item) => {
                setIncludeHomepage(item.value as boolean);
                setStep('git');
              }}
            />
          </Box>
        </Frame>
      )}

      {step === 'git' && (
        <Frame title="GIT INIT">
          <Text>Initialize git?</Text>
          <Box marginTop={1}>
            <SelectInput
              items={gitOptions.map(o => ({
                label: `${o.label} - ${o.hint}`,
                value: o.value
              }))}
              onSelect={(item) => {
                setInitGit(item.value as boolean);
                // Complete!
                onComplete({
                  projectName,
                  bundle,
                  selectedSkills,
                  includeHomepage,
                  initGit: item.value as boolean,
                });
              }}
            />
          </Box>
        </Frame>
      )}

      {/* Fixed bottom hint - matches design language */}
      <Box marginTop={1} flexDirection="column">
        <Text dimColor>╭─────────────────────────────────────────────────────────────────────╮</Text>
        <Text dimColor>│ Type / for commands · ↑↓ navigate · Enter confirm · Esc quit       │</Text>
        <Text dimColor>╰─────────────────────────────────────────────────────────────────────╯</Text>
      </Box>
    </Box>
  );
}

// Export the prompt runner
export function runInkPrompts(defaultName?: string): Promise<UserChoices | null> {
  return new Promise((resolve) => {
    const { unmount, waitUntilExit } = render(
      <WizardApp
        defaultName={defaultName}
        onComplete={(choices) => {
          unmount();
          resolve(choices);
        }}
      />
    );

    waitUntilExit().then(() => {
      resolve(null);
    });
  });
}

// Init mode prompts (simpler)
function InitApp({ onComplete }: { onComplete: (choices: InitChoices) => void }) {
  const { exit } = useApp();

  useInput((_, key) => {
    if (key.escape) {
      console.log('\n' + random(DREAD.cancel));
      exit();
    }
  });

  const bundleOptions = [
    { label: 'Everything', value: 'everything', hint: `All ${SKILLS.length} skills` },
    { label: 'Designer Essentials', value: 'designer', hint: `${BUNDLES.designer.skills.length} skills` },
    { label: 'Workflow Only', value: 'workflow', hint: `${SKILLS.filter(s => s.group === 'workflow').length} skills` },
  ];

  const handleSelect = (item: { value: string }) => {
    let skills: string[];
    if (item.value === 'everything') {
      skills = SKILLS.map(s => s.name);
    } else if (item.value === 'designer') {
      skills = [...BUNDLES.designer.skills];
    } else {
      skills = SKILLS.filter(s => s.group === 'workflow').map(s => s.name);
    }
    onComplete({ selectedSkills: skills });
  };

  return (
    <Box flexDirection="column">
      <Header />
      <Frame title="INIT MODE" hint="Adding to existing project">
        <Text>Which skills do you want?</Text>
        <Box marginTop={1}>
          <SelectInput
            items={bundleOptions.map(o => ({
              label: `${o.label} - ${o.hint}`,
              value: o.value
            }))}
            onSelect={handleSelect}
          />
        </Box>
      </Frame>
      {/* Bottom hint - matches design language */}
      <Box marginTop={1} flexDirection="column">
        <Text dimColor>╭─────────────────────────────────────────────────────────────────────╮</Text>
        <Text dimColor>│ ↑↓ navigate · Enter confirm · Esc quit                              │</Text>
        <Text dimColor>╰─────────────────────────────────────────────────────────────────────╯</Text>
      </Box>
    </Box>
  );
}

export function runInkInitPrompts(): Promise<InitChoices | null> {
  return new Promise((resolve) => {
    const { unmount, waitUntilExit } = render(
      <InitApp onComplete={(choices) => {
        unmount();
        resolve(choices);
      }} />
    );

    waitUntilExit().then(() => {
      resolve(null);
    });
  });
}
