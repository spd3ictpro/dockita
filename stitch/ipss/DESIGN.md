---
name: Clinical Precision
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#444654'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#747686'
  outline-variant: '#c4c5d7'
  surface-tint: '#2d50d9'
  primary: '#2a4dd7'
  on-primary: '#ffffff'
  primary-container: '#4868f1'
  on-primary-container: '#fffbff'
  inverse-primary: '#b9c3ff'
  secondary: '#4f5b93'
  on-secondary: '#ffffff'
  secondary-container: '#b5c0ff'
  on-secondary-container: '#424d84'
  tertiary: '#954500'
  on-tertiary: '#ffffff'
  tertiary-container: '#bb5800'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dde1ff'
  primary-fixed-dim: '#b9c3ff'
  on-primary-fixed: '#001257'
  on-primary-fixed-variant: '#0034c0'
  secondary-fixed: '#dde1ff'
  secondary-fixed-dim: '#b9c3ff'
  on-secondary-fixed: '#08154c'
  on-secondary-fixed-variant: '#38437a'
  tertiary-fixed: '#ffdbc8'
  tertiary-fixed-dim: '#ffb68a'
  on-tertiary-fixed: '#321300'
  on-tertiary-fixed-variant: '#743500'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  mono-data:
    fontFamily: monospace
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 32px
---

## Brand & Style

The design system is engineered for high-stakes medical environments where clarity and cognitive load reduction are paramount. The brand personality is clinical, calm, and hyper-professional, designed to serve as a reliable tool for medical officers rather than a decorative interface. 

The visual style is **Corporate / Modern** with a strict **Flat** execution. It rejects all forms of decorative depth—no gradients, no glassmorphism, and no illustrative flourishes. Hierarchy is established through a rigorous 1px border-defined system and purposeful use of white space. The aesthetic is utilitarian and trustworthy, ensuring that critical patient data remains the sole focus of the user's attention.

## Colors

The palette is restricted to prioritize data legibility and risk assessment. 

- **Primary Accent:** Trust Blue (#4F6EF7) is reserved for primary actions and active states. It must never exceed 10% of the screen real estate to prevent visual fatigue.
- **Neutrals:** The background uses a pristine White (#FFFFFF) or very light Grey (#F8F9FA) for secondary containers.
- **Borders:** A medium-grey (#E2E8F0) is used for all structural containment.
- **Functional (Risk):** Traffic-light semantics are used strictly for clinical status. 
    - *Green*: Stable / Normal.
    - *Yellow*: Observation required.
    - *Orange*: Urgent attention.
    - *Red*: Critical / Emergency.

**Dark Mode:** Invert neutrals (Background: #0F172A, Surface: #1E293B, Border: #334155). Preserve the hex values for primary accent and risk semantics to ensure consistent clinical interpretation across lighting conditions.

## Typography

This design system utilizes **Inter**, a system-native sans-serif stack, for its exceptional legibility in data-dense environments. 

- **Headlines:** Use Semi-Bold (600) for clear section identification.
- **Body:** Standard weight (400) is used for all patient notes and descriptors.
- **Labels:** Small, uppercase labels with slight letter spacing are used for table headers and metadata tags.
- **Data:** Use a monospaced font for vital signs and numerical values to ensure digit alignment in lists.
- **Transitions:** All state changes (hover, focus) must utilize a `0.2s ease` transition to provide a responsive yet professional feel.

## Layout & Spacing

The layout is a **Fixed Grid** on desktop (1280px max-width) and a **Fluid Grid** on mobile devices.

- **Grid:** 12-column structure with a 16px gutter.
- **Rhythm:** An 8px (0.5rem) base unit governs all padding and margins. 
- **Density:** High-density spacing is used within patient data cards (8px internal padding) to maximize information visibility without scrolling.
- **Responsive:** On mobile, side margins are 16px. Cards stack vertically, and complex data tables transition to expanded list items.

## Elevation & Depth

This design system avoids traditional elevation levels. Depth is communicated primarily through **Tonal Layers** and **1px Borders**.

- **Surfaces:** The primary background is #FFFFFF. Secondary containers or sidebars use #F8F9FA.
- **Outlines:** All cards and interactive elements are defined by a 1px solid border (#E2E8F0).
- **Interactive State:** Only upon hover do cards display depth, using a subtle ambient shadow (`0 4px 12px rgba(0,0,0,0.1)`). This provides a clear affordance that the element is actionable without cluttering the resting state of the dashboard.

## Shapes

The shape language is **Soft**. 
- Standard UI elements (buttons, inputs, cards) use a `0.25rem` (4px) corner radius.
- Larger containers or modal windows use `0.5rem` (8px). 
This slight rounding prevents the "harshness" of sharp corners in a high-stress medical environment while maintaining a professional, structured appearance.

## Components

- **Buttons:** Solid #4F6EF7 for primary actions. Ghost buttons with 1px borders for secondary actions. Text-only for tertiary actions.
- **Cards:** The primary layout unit. White background, 1px grey border, 4px border-radius. On hover, apply the 12px blur shadow.
- **Status Chips:** Small, pill-shaped indicators using the Traffic-light semantic colors. Text should be high-contrast (e.g., dark text on light semantic background).
- **Input Fields:** 1px grey border. On focus, the border changes to Primary Blue with a 1px inner stroke. No drop shadows.
- **Data Tables:** Borderless rows with 1px horizontal separators only. Use `mono-data` typography for numerical values.
- **Lists:** Clean, strictly aligned rows. Use 16px padding between list items to maintain tap targets on mobile.