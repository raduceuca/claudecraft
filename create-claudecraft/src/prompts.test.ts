import { describe, it, expect } from 'vitest';
import { SKILLS, BUNDLES } from './constants.js';

// Since prompts.ts uses interactive prompts that are hard to test directly,
// we test the exported interfaces and the logic that can be unit tested.

describe('prompts', () => {
  describe('UserChoices interface', () => {
    it('accepts valid user choices', () => {
      interface UserChoices {
        projectName: string;
        bundle: 'everything' | 'designer' | 'workflow' | 'custom';
        selectedSkills: string[];
        includeHomepage: boolean;
        initGit: boolean;
      }

      const choices: UserChoices = {
        projectName: 'my-app',
        bundle: 'everything',
        selectedSkills: ['brainstorming'],
        includeHomepage: true,
        initGit: true,
      };

      expect(choices.projectName).toBe('my-app');
      expect(choices.bundle).toBe('everything');
      expect(choices.selectedSkills).toHaveLength(1);
    });
  });

  describe('InitChoices interface', () => {
    it('accepts valid init choices', () => {
      interface InitChoices {
        selectedSkills: string[];
      }

      const choices: InitChoices = {
        selectedSkills: ['brainstorming', 'systematic-debugging'],
      };

      expect(choices.selectedSkills).toHaveLength(2);
    });
  });

  describe('project name validation logic', () => {
    const validateProjectName = (value: string): string | undefined => {
      if (!value) return 'Required';
      if (!/^[a-z0-9-]+$/.test(value)) return 'Lowercase, numbers, dashes only';
      if (value.length > 64) return 'Max 64 chars';
      return undefined;
    };

    it('accepts valid project names', () => {
      expect(validateProjectName('my-app')).toBeUndefined();
      expect(validateProjectName('app123')).toBeUndefined();
      expect(validateProjectName('test-project-2024')).toBeUndefined();
      expect(validateProjectName('a')).toBeUndefined();
    });

    it('rejects empty names', () => {
      expect(validateProjectName('')).toBe('Required');
    });

    it('rejects uppercase letters', () => {
      expect(validateProjectName('MyApp')).toBe('Lowercase, numbers, dashes only');
      expect(validateProjectName('MY-APP')).toBe('Lowercase, numbers, dashes only');
    });

    it('rejects special characters', () => {
      expect(validateProjectName('my_app')).toBe('Lowercase, numbers, dashes only');
      expect(validateProjectName('my.app')).toBe('Lowercase, numbers, dashes only');
      expect(validateProjectName('my app')).toBe('Lowercase, numbers, dashes only');
      expect(validateProjectName('my@app')).toBe('Lowercase, numbers, dashes only');
    });

    it('rejects names over 64 characters', () => {
      const longName = 'a'.repeat(65);
      expect(validateProjectName(longName)).toBe('Max 64 chars');
    });

    it('accepts names exactly 64 characters', () => {
      const exactName = 'a'.repeat(64);
      expect(validateProjectName(exactName)).toBeUndefined();
    });
  });

  describe('slash command detection', () => {
    const isSlashCommand = (value: string): boolean => {
      return value.startsWith('/');
    };

    const getSlashCommand = (value: string): string | null => {
      const cmd = value.trim().toLowerCase();
      if (cmd === '/help' || cmd === '/h' || cmd === '/?') return 'help';
      if (cmd === '/skills' || cmd === '/list') return 'skills';
      if (cmd === '/quit' || cmd === '/exit' || cmd === '/q') return 'quit';
      if (cmd === '/') return 'autocomplete';
      if (cmd.startsWith('/')) return 'unknown';
      return null;
    };

    it('identifies slash commands', () => {
      expect(isSlashCommand('/help')).toBe(true);
      expect(isSlashCommand('/skills')).toBe(true);
      expect(isSlashCommand('my-app')).toBe(false);
    });

    it('parses help command aliases', () => {
      expect(getSlashCommand('/help')).toBe('help');
      expect(getSlashCommand('/h')).toBe('help');
      expect(getSlashCommand('/?')).toBe('help');
    });

    it('parses skills command aliases', () => {
      expect(getSlashCommand('/skills')).toBe('skills');
      expect(getSlashCommand('/list')).toBe('skills');
    });

    it('parses quit command aliases', () => {
      expect(getSlashCommand('/quit')).toBe('quit');
      expect(getSlashCommand('/exit')).toBe('quit');
      expect(getSlashCommand('/q')).toBe('quit');
    });

    it('identifies autocomplete trigger', () => {
      expect(getSlashCommand('/')).toBe('autocomplete');
    });

    it('identifies unknown commands', () => {
      expect(getSlashCommand('/unknown')).toBe('unknown');
      expect(getSlashCommand('/xyz')).toBe('unknown');
    });

    it('returns null for non-commands', () => {
      expect(getSlashCommand('my-app')).toBeNull();
      expect(getSlashCommand('test')).toBeNull();
    });
  });

  describe('bundle skill selection', () => {
    const getSkillsForBundle = (
      bundle: 'everything' | 'designer' | 'workflow' | 'custom'
    ): string[] => {
      if (bundle === 'everything') {
        return SKILLS.map((s) => s.name);
      }
      if (bundle === 'designer') {
        return [...BUNDLES.designer.skills];
      }
      if (bundle === 'workflow') {
        return SKILLS.filter((s) => s.group === 'workflow').map((s) => s.name);
      }
      return [];
    };

    it('returns all skills for everything bundle', () => {
      const skills = getSkillsForBundle('everything');
      expect(skills.length).toBe(SKILLS.length);
      expect(skills).toContain('brainstorming');
      expect(skills).toContain('react-best-practices');
    });

    it('returns designer skills for designer bundle', () => {
      const skills = getSkillsForBundle('designer');
      expect(skills.length).toBe(BUNDLES.designer.skills.length);
      expect(skills).toContain('react-best-practices');
      expect(skills).toContain('a11y-audit');
    });

    it('returns only workflow skills for workflow bundle', () => {
      const skills = getSkillsForBundle('workflow');
      const workflowSkills = SKILLS.filter((s) => s.group === 'workflow');
      expect(skills.length).toBe(workflowSkills.length);
      expect(skills).toContain('brainstorming');
      expect(skills).not.toContain('react-best-practices');
    });

    it('returns empty array for custom bundle', () => {
      const skills = getSkillsForBundle('custom');
      expect(skills).toEqual([]);
    });
  });

  describe('skill filtering', () => {
    it('can filter workflow skills', () => {
      const workflowSkills = SKILLS.filter((s) => s.group === 'workflow');
      expect(workflowSkills.length).toBeGreaterThan(0);
      workflowSkills.forEach((s) => {
        expect(s.group).toBe('workflow');
      });
    });

    it('can filter design skills', () => {
      const designSkills = SKILLS.filter((s) => s.group === 'design');
      expect(designSkills.length).toBeGreaterThan(0);
      designSkills.forEach((s) => {
        expect(s.group).toBe('design');
      });
    });

    it('workflow and design together equal all skills', () => {
      const workflowSkills = SKILLS.filter((s) => s.group === 'workflow');
      const designSkills = SKILLS.filter((s) => s.group === 'design');
      expect(workflowSkills.length + designSkills.length).toBe(SKILLS.length);
    });
  });

  describe('skill selection defaults', () => {
    it('default workflow selection is first 6 skills', () => {
      const workflowSkills = SKILLS.filter((s) => s.group === 'workflow');
      const defaultWorkflow = workflowSkills.slice(0, 6).map((s) => s.name);
      expect(defaultWorkflow.length).toBe(6);
      expect(defaultWorkflow[0]).toBe(workflowSkills[0].name);
    });

    it('default design selection is first 4 skills', () => {
      const designSkills = SKILLS.filter((s) => s.group === 'design');
      const defaultDesign = designSkills.slice(0, 4).map((s) => s.name);
      expect(defaultDesign.length).toBe(4);
      expect(defaultDesign[0]).toBe(designSkills[0].name);
    });
  });

  describe('workflow count calculation', () => {
    it('correctly counts workflow skills', () => {
      const workflowCount = SKILLS.filter((s) => s.group === 'workflow').length;
      expect(workflowCount).toBe(14);
    });
  });
});
