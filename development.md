# dockita — Development Log

## Project Overview
Medical Officer Dashboard built with React 19 + Vite.  
Provides clinical tools: screening guidelines, calculators, scores, geriatric assessments.

## Current Progress
- **17 source files** audited, ~85% complete functionally
- **All routes** (6) and navigation working
- **5 calculators** implemented (BMI, eGFR, Age, EDD, Basic)
- **7 scoring tools** implemented (Framingham, IPSS, GAD-7, PHQ-9, CURB-65, CHA2DS2-VASc, HAS-BLED)
- **10 screening guideline categories** with accordion tables
- **2 geriatric tools** (Clinical Frailty Scale, Barthel Index)
- **Global search** with keyboard navigation
- **Dark/light theme** toggle
- **Responsive layout**

## Changes Made (Bug fixes & cleanup)
- `src/data/drugData.js` — Fixed regex in `extractPops()` to handle `<br>` inside population markers (e.g., `<strong>Children:<br></strong>`)
- `src/pages/Calculators.jsx` — Added division-by-zero guard in BasicCalc (`"Cannot divide by zero"` message)
- `src/pages/Calculators.jsx` — Added future-LMP validation in EDD calculator (`"LMP cannot be in the future"`)
- `src/components/ThemeToggle.jsx` — Created new file, extracted inline `ThemeToggle` from Sidebar.jsx
- `src/components/Sidebar.jsx` — Imported `ThemeToggle` instead of defining inline
- `index.html` — Changed favicon href from `/favicon.svg` to `%BASE%favicon.svg` (fixes gh-pages production path)
- `AGENTS.md` — Removed stale `useTheme.js` and `BasicCalc` entries from Known Issues
- `src/pages/NeoBili.jsx` — New neonatal bilirubin calculator with AAP 2022 thresholds, color-coded result box, field validation, GA pill buttons
- `src/data/neobiliData.js` — Corrected PT/ET threshold tables verified against PediTools API at 60+ points; fixed GA 35-37 curve direction (96-336h); independently populated any-risk tables, removed flawed derivation
- `src/pages/Diabetes.jsx` — Redesigned to match Dyslipid layout
- `src/pages/Hypertension.jsx` — Redesigned to match Dyslipid layout, BP classification table with section-label rows
- `src/pages/Screening.jsx` — Removed Diabetes, Hypertension, Dyslipidemia cards (moved to dedicated pages)
- `src/data/screeningData.js` — Removed diabetes, hypertension, dyslipidaemia entries
- `src/components/Sidebar.jsx` — Restructured: Calculators is now an expandable group with NeoBili as child item
- `src/pages/Calculators.jsx` — Added NeoBili card
- `src/App.css` — Added sidebar group toggle and child link styles; added `.neobili-page` max-width; `.htn-class-table` section-label styling
- Removed orphaned files: `08062026 session.txt`, `stitch/`, `icons/`

## 28 Jun 2026 — UI polish & Geriatric page overhaul
- **UI anti-pattern fixes** (Impeccable detect):
  - `.calc-result`: Replaced `border-left: 4px` with `border-top: 3px` accent
  - `.screening-card` & `.drug-list-item`: Replaced `border-left: 4px` with `::before` pseudo-element
  - `.screening-card-body`: Replaced `max-height`/`padding` transition with performant `grid-template-rows`
- **Lint cleanup** (91 errors → 0):
  - `eslint.config.js`: Added `.agents/**` to `globalIgnores`
  - `Sidebar.jsx`: Supressed `set-state-in-effect` rule for nav auto-expand
  - `Calculators.jsx`: Removed empty initializers on `let` vars; removed unused `isAction`
  - `DrugDatabase.jsx`: Removed unused `badgeChar`; moved `useMemo` before early return
  - `Dyslipidemia.jsx`: Extracted `SegmentedGroup` to module scope
  - `Scores.jsx`: Removed unused `useNavigate` in `Scores` component
- **Geriatric page — complete redesign**:
  - `geriatricData.js`: Removed Morse Fall Scale; added Barthel Index (10-item ADL, 0–100, 5 dependency levels)
  - `searchIndex.js`: Updated imports and search entries
  - `Geriatric.jsx`: New CFS widget (clean 3×3 grid, bigger buttons, inline detail, hover lift, no tier colors); new Barthel widget (live scoring, progress bar, full-label radio rows, sticky results panel with scale reference)
  - `App.css`: Replaced all CFS/Barthel CSS with new `.geriatric-card`, `.cfs-spectrum`, `.adl-checklist` system

## Pending Work
### High Priority
- **PatientInfo.jsx** — 6 education cards are empty placeholders, need SVG/infographic content

### Medium Priority
- **Breast Cancer Screening** — Needs risk stratification (general vs high risk), deferred as complex
- **Scores.jsx** — Component functions called as `t.component()` instead of `<t.component />`
- **SearchBar.jsx** — Search logic duplicated between `useEffect` and `onFocus`; `listRef` unused
- **README.md** — Still default Vite template

### Low Priority
- Framingham lacks input bounds validation
- Dark mode contrast audit on result cards
- `public/icons.svg`, `icons/`, `stitch/` — removed (orphaned)
- No print styles, no `<label>` elements on inputs

## References
- Cervical cancer: Malaysia MOH CPG Cervical Cancer Screening 2023
- Breast cancer: CPG Management of Breast Cancer (3rd Edition) 2019
