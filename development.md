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
- **2 geriatric tools** (Clinical Frailty Scale, Morse Fall Scale)
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
- `public/icons.svg` is orphaned
- No print styles, no `<label>` elements on inputs

## References
- Cervical cancer: Malaysia MOH CPG Cervical Cancer Screening 2023
- Breast cancer: CPG Management of Breast Cancer (3rd Edition) 2019
