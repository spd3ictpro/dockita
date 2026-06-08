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

## Changes Made (Cervical Cancer Screening)
- `src/data/screeningData.js` — Updated cervical cancer entry:
  - Age `<30`: Cytology yearly ×2 then 3-yearly (was `25–29`: Pap every 3 years)
  - Age `30–65`: HPV DNA test every 5 years (was Pap/co-testing)
  - Age `>65 with no prior screening`: HPV testing can be offered (was discontinue)
  - Source confirmed as 2023
  - Keywords: added `vaccination`
- `src/pages/Screening.jsx` — Removed `DueChecker` component, `monthsAgo` helper, and Due Checker widgets (Mammogram, iFOBT)
- `src/data/searchIndex.js` — Removed `mammogramDue`, `iFOBTDue` imports and entries
- `src/data/screeningData.js` — Removed `mammogramDue`, `iFOBTDue` exports
- `src/pages/Home.jsx` — Updated screening card description; removed Mammogram Due quick tool

## Pending Work
### High Priority
- **PatientInfo.jsx** — 6 education cards are empty placeholders, need SVG/infographic content
- **useTheme.js** — Orphaned hook; ThemeToggle and App.jsx duplicate its logic
- **Favicon path** — `/favicon.svg` should be `/dockita/favicon.svg` for production build
- **BasicCalc division by zero** — `X ÷ 0 =` displays "Infinity"

### Medium Priority
- **Breast Cancer Screening** — Needs risk stratification (general vs high risk), deferred as complex
- **Scores.jsx** — Component functions called as `t.component()` instead of `<t.component />`
- **SearchBar.jsx** — Search logic duplicated between `useEffect` and `onFocus`; `listRef` unused
- **EDD calculator** — Future LMP date produces negative GA weeks
- **README.md** — Still default Vite template

### Low Priority
- Framingham lacks input bounds validation
- Dark mode contrast audit on result cards
- `public/icons.svg` is orphaned
- No print styles, no `<label>` elements on inputs

## References
- Cervical cancer: Malaysia MOH CPG Cervical Cancer Screening 2023
- Breast cancer: CPG Management of Breast Cancer (3rd Edition) 2019
