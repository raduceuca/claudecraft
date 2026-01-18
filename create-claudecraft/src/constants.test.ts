import { describe, it, expect } from 'vitest';
import {
  PACKAGE_NAME,
  VERSION,
  DEFAULT_PORT,
  DEFAULT_THEME,
  TAGLINE,
  STACK,
  ASSETS,
  SKILLS,
  BUNDLES,
  COMMANDS,
  ERRORS,
  type Skill,
} from './constants.js';

describe('constants', () => {
  describe('package metadata', () => {
    it('has valid package name', () => {
      expect(PACKAGE_NAME).toBe('create-claudecraft');
    });

    it('has semver version', () => {
      expect(VERSION).toMatch(/^\d+\.\d+\.\d+$/);
    });

    it('has valid default port', () => {
      expect(DEFAULT_PORT).toBe(6969);
      expect(DEFAULT_PORT).toBeGreaterThan(0);
      expect(DEFAULT_PORT).toBeLessThan(65536);
    });

    it('has valid default theme', () => {
      expect(DEFAULT_THEME).toBe('halloween');
      expect(typeof DEFAULT_THEME).toBe('string');
    });

    it('has tagline', () => {
      expect(TAGLINE).toBe('Your taste. Their labor. Finally.');
      expect(TAGLINE.length).toBeGreaterThan(0);
    });
  });

  describe('STACK versions', () => {
    it('has all required stack entries', () => {
      expect(STACK).toHaveProperty('react');
      expect(STACK).toHaveProperty('typescript');
      expect(STACK).toHaveProperty('vite');
      expect(STACK).toHaveProperty('tailwind');
      expect(STACK).toHaveProperty('daisyui');
    });

    it('has valid version formats', () => {
      expect(STACK.react).toMatch(/^\d+\.x$/);
      expect(STACK.typescript).toMatch(/^\d+\.x$/);
      expect(STACK.vite).toMatch(/^\d+\.x$/);
      expect(STACK.tailwind).toMatch(/^\d+\.x$/);
      expect(STACK.daisyui).toMatch(/^\d+\.x$/);
    });
  });

  describe('ASSETS counts', () => {
    it('has all required asset counts', () => {
      expect(ASSETS).toHaveProperty('skills');
      expect(ASSETS).toHaveProperty('commands');
      expect(ASSETS).toHaveProperty('themes');
      expect(ASSETS).toHaveProperty('hooks');
      expect(ASSETS).toHaveProperty('components');
    });

    it('has positive counts', () => {
      expect(ASSETS.skills).toBeGreaterThan(0);
      expect(ASSETS.commands).toBeGreaterThan(0);
      expect(ASSETS.themes).toBeGreaterThan(0);
      expect(ASSETS.hooks).toBeGreaterThan(0);
      expect(ASSETS.components).toBeGreaterThan(0);
    });

    it('matches actual SKILLS array length', () => {
      expect(ASSETS.skills).toBe(SKILLS.length);
    });
  });

  describe('SKILLS array', () => {
    it('has expected number of skills', () => {
      expect(SKILLS.length).toBe(27);
    });

    it('all skills have required properties', () => {
      SKILLS.forEach((skill: Skill) => {
        expect(skill).toHaveProperty('name');
        expect(skill).toHaveProperty('description');
        expect(skill).toHaveProperty('group');
        expect(skill).toHaveProperty('bytes');

        expect(typeof skill.name).toBe('string');
        expect(typeof skill.description).toBe('string');
        expect(['workflow', 'design']).toContain(skill.group);
        expect(typeof skill.bytes).toBe('number');
        expect(skill.bytes).toBeGreaterThan(0);
      });
    });

    it('has unique skill names', () => {
      const names = SKILLS.map((s) => s.name);
      const uniqueNames = new Set(names);
      expect(uniqueNames.size).toBe(names.length);
    });

    it('has both workflow and design skills', () => {
      const workflowSkills = SKILLS.filter((s) => s.group === 'workflow');
      const designSkills = SKILLS.filter((s) => s.group === 'design');

      expect(workflowSkills.length).toBeGreaterThan(0);
      expect(designSkills.length).toBeGreaterThan(0);
    });

    it('has correct skill counts per group', () => {
      const workflowSkills = SKILLS.filter((s) => s.group === 'workflow');
      const designSkills = SKILLS.filter((s) => s.group === 'design');

      expect(workflowSkills.length).toBe(14);
      expect(designSkills.length).toBe(13);
    });

    it('includes known skills', () => {
      const names = SKILLS.map((s) => s.name);
      expect(names).toContain('brainstorming');
      expect(names).toContain('systematic-debugging');
      expect(names).toContain('react-best-practices');
      expect(names).toContain('a11y-audit');
    });
  });

  describe('BUNDLES', () => {
    it('has all bundle types', () => {
      expect(BUNDLES).toHaveProperty('everything');
      expect(BUNDLES).toHaveProperty('designer');
      expect(BUNDLES).toHaveProperty('workflow');
    });

    describe('everything bundle', () => {
      it('includes all skills', () => {
        expect(BUNDLES.everything.skills.length).toBe(SKILLS.length);
      });

      it('has correct metadata', () => {
        expect(BUNDLES.everything.name).toBe('Everything');
        expect(BUNDLES.everything.description).toBeTruthy();
        expect(BUNDLES.everything.commands).toBeGreaterThan(0);
        expect(BUNDLES.everything.files).toBeGreaterThan(0);
      });
    });

    describe('designer bundle', () => {
      it('has subset of skills', () => {
        expect(BUNDLES.designer.skills.length).toBeLessThan(SKILLS.length);
        expect(BUNDLES.designer.skills.length).toBeGreaterThan(0);
      });

      it('includes design-focused skills', () => {
        expect(BUNDLES.designer.skills).toContain('react-best-practices');
        expect(BUNDLES.designer.skills).toContain('ui-skills');
        expect(BUNDLES.designer.skills).toContain('a11y-audit');
      });

      it('all skills exist in SKILLS array', () => {
        const skillNames = SKILLS.map((s) => s.name);
        BUNDLES.designer.skills.forEach((name) => {
          expect(skillNames).toContain(name);
        });
      });
    });

    describe('workflow bundle', () => {
      it('only includes workflow skills', () => {
        const workflowSkills = SKILLS.filter((s) => s.group === 'workflow').map((s) => s.name);
        BUNDLES.workflow.skills.forEach((name) => {
          expect(workflowSkills).toContain(name);
        });
      });

      it('includes all workflow skills', () => {
        const workflowSkills = SKILLS.filter((s) => s.group === 'workflow').map((s) => s.name);
        expect(BUNDLES.workflow.skills.length).toBe(workflowSkills.length);
      });
    });
  });

  describe('COMMANDS', () => {
    it('has expected number of commands', () => {
      expect(COMMANDS.length).toBe(7);
    });

    it('all commands have name and description', () => {
      COMMANDS.forEach((cmd) => {
        expect(cmd).toHaveProperty('name');
        expect(cmd).toHaveProperty('description');
        expect(cmd.name).toMatch(/^\//);
        expect(cmd.description.length).toBeGreaterThan(0);
      });
    });

    it('includes expected commands', () => {
      const names = COMMANDS.map((c) => c.name);
      expect(names).toContain('/build');
      expect(names).toContain('/typecheck');
      expect(names).toContain('/lint');
      expect(names).toContain('/brainstorm');
    });
  });

  describe('ERRORS', () => {
    it('has dirExists error generator', () => {
      const error = ERRORS.dirExists('my-project');
      expect(error.title).toContain('my-project');
      expect(error.body).toBeTruthy();
      expect(error.body).toContain('--init');
    });

    it('has noBun error generator', () => {
      const error = ERRORS.noBun();
      expect(error.title).toContain('Bun');
      expect(error.body).toContain('bun.sh');
    });

    it('has network error generator', () => {
      const error = ERRORS.network();
      expect(error.title).toBeTruthy();
      expect(error.body).toContain('npm');
    });

    it('has noProject error generator', () => {
      const error = ERRORS.noProject();
      expect(error.title).toBeTruthy();
      expect(error.body).toContain('--init');
      expect(error.body).toContain('package.json');
    });
  });
});
