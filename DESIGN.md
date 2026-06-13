---
name: dockita
description: Medical Officer Daily Dashboard
colors:
  primary: "#4f6ef7"
  primary-hover: "#3b5bdb"
  primary-active: "#2e4bd4"
  bg: "#f4f6f9"
  surface: "#ffffff"
  text: "#1e293b"
  text-muted: "#64748b"
  border: "#e2e8f0"
  sidebar-bg: "#ffffff"
  sidebar-active-bg: "#4f6ef7"
  sidebar-text: "#475569"
  sidebar-hover: "#f1f5f9"
  input-bg: "#ffffff"
  input-border: "#d1d5db"
  btn-secondary-bg: "#e2e8f0"
  risk-low: "#d3f9d8"
  risk-low-mid: "#fff3bf"
  risk-mid: "#ffd8a8"
  risk-high-mid: "#ffc9c9"
  risk-high: "#ffa8a8"
  bmi-under: "#d0ebff"
  bmi-normal: "#d3f9d8"
  bmi-over: "#fff3bf"
  bmi-obese1: "#ffd8a8"
  bmi-obese2: "#ffc9c9"
  bmi-obese3: "#dee2e6"
typography:
  display:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(1.8rem, 4vw, 2.2rem)"
    fontWeight: 700
    lineHeight: 1.3
  headline:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1.6rem"
    fontWeight: 700
    lineHeight: 1.3
  title:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.82rem"
    fontWeight: 500
    lineHeight: 1.4
  mono:
    fontFamily: "SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace"
    fontSize: "0.85rem"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "20px"
  xl: "24px"
  xxl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "8px 18px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-secondary:
    backgroundColor: "{colors.btn-secondary-bg}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    padding: "8px 18px"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
  input:
    backgroundColor: "{colors.input-bg}"
    rounded: "{rounded.md}"
    padding: "8px 12px"
  sidebar-link:
    backgroundColor: "transparent"
    textColor: "{colors.sidebar-text}"
    rounded: "{rounded.md}"
    padding: "10px 12px"
  sidebar-link-active:
    backgroundColor: "{colors.sidebar-active-bg}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "10px 12px"
---

# Design System: dockita

## 1. Overview

**Creative North Star: "The Morning Round Companion"**

dockita is the tool a medical officer reaches for in the quiet moments between patients — quick, clear, and clinically precise. Like a trusted senior colleague's summary card, it presents what matters and nothing else. The interface is calm by design: restrained color, clean typography, flat surfaces with gentle borders. No decorative flourish survives unless it serves the clinical task.

The system explicitly rejects two anti-patterns: the cluttered, beige-and-blue aesthetic of legacy hospital EMRs, and the overly casual, gamified feel of consumer health apps. dockita occupies the middle ground — professional without being cold, warm without being casual.

**Key Characteristics:**
- Flat surfaces with border-defined hierarchy; shadows appear only on hover and focus
- Single accent color ("Trust Blue") used sparingly, never on more than ~10% of any screen
- System-native sans-serif typeface for maximum rendering reliability across clinical environments
- Risk and measurement colors follow traffic-light semantics (green → yellow → orange → red)
- Responsive: reflows from sidebar-and-main on desktop to stacked layout on mobile

## 2. Colors

The palette is restrained by design: one blue-indigo accent, a warm neutral background, and a traffic-light system for clinical risk communication. Dark mode inverts the neutrals while preserving the accent and risk colors at adjusted saturations.

### Primary

- **Trust Blue** (`#4f6ef7`): The sole accent. Used for primary actions (Calculate buttons), active navigation links, focus rings, and interactive element highlights. On dark mode shifts to `#818cf8`. *The accent's rarity is the point — it should draw the eye exactly where action is needed.*

### Risk (Functional)

- **Low Risk** (`#d3f9d8`): Green-tinted result cards for normal/below-threshold outcomes. Dark mode: `#1b4332`.
- **Low-Moderate Risk** (`#fff3bf`): Warm yellow for borderline results. Dark mode: `#5c4a00`.
- **Moderate Risk** (`#ffd8a8`): Orange for intermediate scores. Dark mode: `#7a4a00`.
- **High-Moderate Risk** (`#ffc9c9`): Coral for concerning scores. Dark mode: `#5c1a1a`.
- **High Risk** (`#ffa8a8`): Red for critical outcomes requiring attention. Dark mode: `#7a1a1a`.

### BMI (Functional)

Mirrors the risk scale but for weight classification: blue (underweight) → green (normal) → yellow (overweight) → orange (obese I) → red (obese II) → gray (obese III).

### Neutral

- **Background** (`#f4f6f9`): Cool off-white page background. Dark mode: `#0f172a`.
- **Surface** (`#ffffff`): Card, sidebar, search, and input backgrounds. Dark mode: `#1e293b`.
- **Text** (`#1e293b`): High-contrast body text (slate-800). Dark mode: `#e2e8f0`.
- **Text Muted** (`#64748b`): Secondary information, metadata, descriptions. Dark mode: `#94a3b8`.
- **Border** (`#e2e8f0`): Card borders, dividers, separator lines. Dark mode: `#334155`.

## 3. Typography

**Body Font:** System-native sans-serif (`-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`)
**Mono Font:** System-native monospace (`SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace`)

**Character:** Clean, unopinionated, universally legible. The system font stack guarantees no loading delay and native rendering on every device a clinician might use — from a hospital desktop to a ward tablet. No custom typefaces; reliability trumps personality.

### Hierarchy

- **Display** (700, `clamp(1.8rem, 4vw, 2.2rem)`, 1.3): Page-level headings — "dockita" on the home page only.
- **Headline** (700, `1.6rem`, 1.3): Section headings — "Screening Guidelines", "Calculators", "Scores & Scales".
- **Title** (600, `1rem`, 1.4): Card titles — each tool or widget's heading.
- **Body** (400, `0.9rem` / 15px base, 1.6): Paragraphs, descriptions, instructions. **The primary reading size.**
- **Label** (500, `0.82rem`, 1.4): Input labels, table headers, score category labels, metadata.
- **Mono** (400, `0.85rem`, 1.5): Calculator displays, numeric readouts.

## 4. Elevation

**Flat by default.** Surfaces rest on the page with no shadow. Hierarchy is expressed through borders (`1px solid var(--border)`) and tonal separation (white cards on a tinted background).

Shadow appears only as a response to interaction:
- **Hover shadow** (`0 4px 12px rgba(0,0,0,0.1)`): Applied to clickable cards on hover to signal affordance.
- **Rest shadow** (`0 1px 3px rgba(0,0,0,0.08)`): Minimal separation on cards at rest; nearly imperceptible.

In dark mode, shadows intensify to compensate for the darker canvas: `0 1px 3px rgba(0,0,0,0.3)` at rest, `0 4px 12px rgba(0,0,0,0.4)` on hover.

## 5. Components

### Buttons

- **Shape:** Gently rounded corners (8px radius).
- **Primary:** Trust Blue background (`#4f6ef7`), white text, 8px 18px padding. Hover: darkens to `#3b5bdb`.
- **Secondary:** Light gray background (`#e2e8f0`), slate text (`#1e293b`), same padding and radius. Hover: darkens to `#cbd5e1`.
- **States:** All buttons have `0.2s ease` transitions. No outline or ghost variants currently.

### Cards / Containers

- **Corner Style:** Rounded generously (12px radius).
- **Background:** White (`#ffffff`).
- **Border:** 1px solid `#e2e8f0`.
- **Shadow at rest:** Minimal (`0 1px 3px rgba(0,0,0,0.08)`).
- **Shadow on hover:** Lifted (`0 4px 12px rgba(0,0,0,0.1)`) with `-2px` translateY for clickable cards.
- **Internal padding:** 16–20px depending on card type.

### Inputs & Fields

- **Style:** White background (`#ffffff`), 1px `#d1d5db` border, 8px radius.
- **Focus:** Trust Blue border + 3px semi-transparent focus ring.
- **Padding:** 8px 12px for text inputs, 8px 12px for selects.
- **Font:** Inherits body size.

### Navigation (Sidebar)

- **Position:** Fixed left rail, full viewport height.
- **Width:** 260px expanded, 64px collapsed.
- **Style:** White background, right border divider.
- **Links:** 10px 12px padding, 8px radius. Hover: light gray overlay. Active: Trust Blue background with white text.
- **Collapse button:** Minimal, sits in the sidebar header.

### Search Bar

- **Position:** Sticky top of main content area.
- **Style:** White background, 1px border, 12px radius container.
- **Focus:** Trust Blue border + focus ring (matches input pattern).
- **Results dropdown:** White background, shadow-lg, max 400px scrollable list.

### Result Cards (Risk/Score/Calculation)

- **Style:** Solid background matching the risk level (green/yellow/orange/red), white or dark text depending on contrast.
- **Layout:** 12px 16px padding, 8px radius.
- **Content:** Score value displayed prominently, followed by category label. Optional sub-text for recommendations.

## 6. Do's and Don'ts

### Do:
- **Do** use Trust Blue sparingly — accent on ≤10% of any screen. Its rarity is what makes it effective.
- **Do** use the traffic-light risk colors (green → yellow → orange → red) consistently for all clinical scores and measurements.
- **Do** prefer flat surfaces with border-defined hierarchy over shadows and layers.
- **Do** keep card titles short and descriptive — clinicians scan, not read.
- **Do** use system fonts for maximum rendering reliability across devices.

### Don't:
- **Don't** use decorative illustrations, gradients, or glassmorphism — they undermine clinical credibility.
- **Don't** wrap content in nested cards; cards are single-layer containers.
- **Don't** animate layout properties (width, height, margin, padding) — use transform and opacity instead.
- **Don't** use bounce or elastic easing — all transitions use `0.2s ease`.
- **Don't** use gray text on colored backgrounds — use a darker shade of the background's own hue.
- **Don't** add custom typefaces that delay rendering or mismatch across operating systems.
- **Don't** replicate the beige-and-blue, cluttered aesthetic of legacy hospital EMRs.
- **Don't** use consumer health app patterns — no gamification, no casual illustrations, no bright multi-color palettes.
