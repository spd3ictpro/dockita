# dockita — AGENTS.md

## Commands
- `npm run dev` — Vite dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — preview production build
- `npm run lint` — ESLint (flat config, js/jsx)
- `npm run lint:design` — scan src/ for UI anti-patterns (Impeccable)
- `npm run deploy` — `gh-pages -d dist`
- **No test runner configured** — do not assume one exists

## Architecture
- **React 19 + Vite 8 + React Router v7** — plain JSX (no TypeScript)
- **HashRouter** (not BrowserRouter) — required for gh-pages compatibility
- **Single CSS file** `src/App.css` (~1147 lines, CSS custom properties for light/dark)
- **No backend** — all data is static JS in `src/data/`
- **6 routes** under Layout: `/`, `/screening`, `/calculators`, `/scores`, `/geriatric`, `/patient-info`

## Build quirk
Vite config sets `base: '/dockita/'` for gh-pages. The favicon link in `index.html` uses `/favicon.svg` but should be `/dockita/favicon.svg` in production — known bug.

## Data files (`src/data/`)
- `screeningData.js` → `screeningCategories[]` (10 CPG screening guidelines)
- `scoresData.js` → named exports: `framingham`, `ipss`, `gad7`, `phq9`, `curb65`, `cha2ds2vasc`, `hasbled`
- `geriatricData.js` → `clinicalFrailtyScale`, `morseFallScale`
- `patientInfoData.js` → `patientInfoItems` (6 placeholder cards, no images)
- `searchIndex.js` → aggregates all above into flat searchable array

## Known issues (things agents commonly miss)
- **Scores.jsx:149** calls components as `t.component()` instead of JSX `<t.component />` — works but non-standard.
- **SearchBar.jsx** search logic duplicated between `useEffect` and `onFocus` handler. `listRef` assigned but never read.
- **EDD Calculator** future LMP dates give negative gestational age.
- **`public/icons.svg`** orphaned (not referenced anywhere).

## Style conventions
- CSS class names: kebab-case
- Component files: `*.jsx`, data files: `*.js`
- Theme via `data-theme` attribute on `<html>`, persisted to `localStorage('dockita-theme')`

## Design quality (Impeccable)
- `npm run lint:design` runs `npx impeccable detect src/` to catch UI anti-patterns (layout thrashing, a11y, typography, color issues)
- Impeccable AI skill commands available: `/audit`, `/critique`, `/polish`, `/distill`, `/clarify`, `/harden`, `/optimize`, `/animate`, `/colorize`, `/bolder`, `/quieter`, `/typeset`, `/layout`, `/adapt`, `/onboard`, `/delight`, `/extract`, `/overdrive`
- Run `npx impeccable skills update` to keep the skill current (requires `unzip` on PATH on Windows, or use PowerShell `Expand-Archive` as workaround)

## Design context
- `PRODUCT.md` — strategic product context (register, users, brand, design principles)
- `DESIGN.md` — visual design system (colors, typography, elevation, components)
- `.impeccable/design.json` — machine-readable design tokens and component snippets
- `.impeccable/live/config.json` — live mode config for browser iteration

## References
- `development.md` — full dev log with pending work, change history
