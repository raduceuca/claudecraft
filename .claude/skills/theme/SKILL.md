---
name: theme
description: Create custom DaisyUI themes from natural language descriptions. No token knowledge required.
---

# Theme Builder Skill

Create custom DaisyUI themes through conversation. Designers describe their vision, this skill generates the theme configuration.

## How to Use

- `/theme` - Start interactive theme builder
- `/theme [description]` - Generate theme from description
  - Example: `/theme purple and gold, dark mode, luxury feel`
  - Example: `/theme ocean vibes with teal primary`
  - Example: `/theme match brand colors #FF5733 and #3498DB`

## DaisyUI Theme Structure

A complete DaisyUI theme needs these colors:

```js
{
  "mytheme": {
    // Main brand colors
    "primary": "#6366f1",          // Main action color (buttons, links)
    "primary-content": "#ffffff",  // Text on primary backgrounds

    "secondary": "#f472b6",        // Secondary actions
    "secondary-content": "#ffffff",

    "accent": "#22d3ee",           // Highlights, decorative elements
    "accent-content": "#000000",

    // Neutral tones for UI
    "neutral": "#1f2937",          // Cards, headers, less prominent UI
    "neutral-content": "#d1d5db",

    // Base/background colors
    "base-100": "#ffffff",         // Main background
    "base-200": "#f3f4f6",         // Slightly darker (cards, sections)
    "base-300": "#e5e7eb",         // Borders, dividers
    "base-content": "#1f2937",     // Main text color

    // Semantic/feedback colors
    "info": "#3b82f6",
    "info-content": "#ffffff",
    "success": "#22c55e",
    "success-content": "#ffffff",
    "warning": "#f59e0b",
    "warning-content": "#000000",
    "error": "#ef4444",
    "error-content": "#ffffff",
  }
}
```

## Quick Color Palettes

### Dark Themes

**Midnight Purple**
```js
"primary": "#a855f7",
"secondary": "#6366f1",
"accent": "#f472b6",
"neutral": "#1e1b4b",
"base-100": "#0f0d1a",
"base-200": "#1a1625",
"base-300": "#2a2640",
"base-content": "#e0e0ff",
```

**Ocean Dark**
```js
"primary": "#0ea5e9",
"secondary": "#06b6d4",
"accent": "#22d3ee",
"neutral": "#0c4a6e",
"base-100": "#0c1929",
"base-200": "#132436",
"base-300": "#1e3a54",
"base-content": "#e0f2fe",
```

**Forest Night**
```js
"primary": "#22c55e",
"secondary": "#16a34a",
"accent": "#84cc16",
"neutral": "#14532d",
"base-100": "#0a1a0f",
"base-200": "#122318",
"base-300": "#1a3324",
"base-content": "#dcfce7",
```

### Light Themes

**Warm Sand**
```js
"primary": "#d97706",
"secondary": "#ea580c",
"accent": "#facc15",
"neutral": "#78716c",
"base-100": "#fffbeb",
"base-200": "#fef3c7",
"base-300": "#fde68a",
"base-content": "#451a03",
```

**Cool Mint**
```js
"primary": "#14b8a6",
"secondary": "#0d9488",
"accent": "#5eead4",
"neutral": "#475569",
"base-100": "#f0fdfa",
"base-200": "#ccfbf1",
"base-300": "#99f6e4",
"base-content": "#134e4a",
```

**Clean Corporate**
```js
"primary": "#2563eb",
"secondary": "#4f46e5",
"accent": "#0ea5e9",
"neutral": "#334155",
"base-100": "#ffffff",
"base-200": "#f8fafc",
"base-300": "#e2e8f0",
"base-content": "#0f172a",
```

## Process

When user describes a theme:

### 1. Parse the Request
Extract from their description:
- Main color(s) or mood
- Light or dark preference
- Any specific hex codes provided
- Vibe/feeling (luxury, playful, corporate, etc.)

### 2. Generate Color Palette
- Start with primary color (most important)
- Derive secondary and accent as complementary/analogous
- For dark themes: base-100 should be very dark (#0f... to #1a...)
- For light themes: base-100 should be near white (#fff... to #f8...)
- Ensure content colors have sufficient contrast (4.5:1 ratio)

### 3. Present Theme

```markdown
## Generated Theme: [Name]

Here's your custom DaisyUI theme based on "[their description]":

**Preview colors:**
- Primary: 🟣 #a855f7 (main action color)
- Secondary: 🔵 #6366f1 (secondary actions)
- Accent: 💗 #f472b6 (highlights)
- Background: ⬛ #0f0d1a (dark mode)

**To add this theme:**

1. Open `tailwind.config.js`
2. Find the `daisyui.themes` array
3. Add this object:

\`\`\`js
{
  "custom-name": {
    "primary": "#a855f7",
    "primary-content": "#ffffff",
    "secondary": "#6366f1",
    "secondary-content": "#ffffff",
    "accent": "#f472b6",
    "accent-content": "#ffffff",
    "neutral": "#1e1b4b",
    "neutral-content": "#d1d5db",
    "base-100": "#0f0d1a",
    "base-200": "#1a1625",
    "base-300": "#2a2640",
    "base-content": "#e0e0ff",
    "info": "#3b82f6",
    "info-content": "#ffffff",
    "success": "#22c55e",
    "success-content": "#ffffff",
    "warning": "#f59e0b",
    "warning-content": "#000000",
    "error": "#ef4444",
    "error-content": "#ffffff"
  }
}
\`\`\`

4. To use it, either:
   - Set as default in ThemeContext
   - Select from ThemeSelector dropdown
   - Set `data-theme="custom-name"` on HTML element
```

### 4. Offer to Apply
Ask if user wants Claude to:
- Add the theme to `tailwind.config.js`
- Update the default theme in `ThemeContext.tsx`

## Tips for Good Themes

### Contrast
- Text on backgrounds: 4.5:1 minimum (WCAG AA)
- Large text/graphics: 3:1 minimum
- Use tools like WebAIM Contrast Checker

### Color Relationships
- **Complementary**: Colors opposite on wheel (high contrast, energetic)
- **Analogous**: Colors next to each other (harmonious, calm)
- **Triadic**: Three evenly spaced colors (balanced, vibrant)

### Dark Theme Tips
- Don't use pure black (#000000) - use very dark grays
- Increase contrast slightly compared to light themes
- Accent colors can be more saturated

### Light Theme Tips
- Don't use pure white backgrounds if possible
- Keep primary colors bold enough to stand out
- Muted accents work well

## Quick Modifications

User wants to adjust:
- "Make it darker" → Decrease base-100/200/300 lightness
- "More contrast" → Increase difference between base-content and base-100
- "Warmer" → Shift hues toward red/orange/yellow
- "Cooler" → Shift hues toward blue/cyan
- "More muted" → Reduce saturation
- "More vibrant" → Increase saturation

## Reference

- [DaisyUI Theme Generator](https://daisyui.com/theme-generator/)
- [Tailwind CSS Colors](https://tailwindcss.com/docs/customizing-colors)
- Preview on `/components` page
