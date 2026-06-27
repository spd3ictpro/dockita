export const screeningCategories = [
  {
    id: 'cervical-cancer',
    title: 'Cervical Cancer Screening',
    condition: 'Cervical cancer',
    guidelines: [
      { age: '<30', test: 'Cytology (conventional or LBC)', note: 'Initial: yearly for 2 years, then 3-yearly if normal' },
      { age: '30–65', test: 'HPV DNA test every 5 years', note: 'Primary screening method for this age group' },
      { age: '>65 with no prior screening', test: 'HPV testing can be offered', note: 'Discontinue if adequate prior normal screening' },
    ],
    source: 'Malaysia CPG: Cervical Cancer Screening 2023',
    keywords: 'cervix pap hpv smear colposcopy cervix cancer screening vaccination',
  },
  {
    id: 'breast-cancer',
    title: 'Breast Cancer Screening',
    condition: 'Breast cancer',
    guidelines: [
      { age: '40–49', test: 'Mammogram every 2 years', note: 'Shared decision-making; discuss benefits vs harms' },
      { age: '50–74', test: 'Mammogram every 2 years', note: 'Routine screening recommended' },
      { age: '≥75', test: 'Individualise', note: 'Consider life expectancy and comorbidities' },
      { age: 'High risk', test: 'Annual mammogram ± MRI', note: 'High risk = strong FH, BRCA1/2, prior chest RT' },
    ],
    source: 'Malaysia CPG: Breast Cancer Screening 2022',
    keywords: 'breast mammogram mammo mamogram breast cancer screening',
  },
  {
    id: 'colorectal-cancer',
    title: 'Colorectal Cancer Screening',
    condition: 'Colorectal cancer',
    guidelines: [
      { age: '50–75', test: 'iFOBT (FIT) every 1–2 years', note: 'FIT preferred over gFOBT' },
      { age: '50–75', test: 'Colonoscopy every 10 years', note: 'If FIT positive → colonoscopy within 6 months' },
      { age: '>75', test: 'Individualise', note: 'Discontinue if prior adequate screening' },
      { age: 'High risk', test: 'Colonoscopy every 3–5 years', note: 'High risk = FH, IBD, polyps, hereditary syndromes' },
    ],
    source: 'Malaysia CPG: Colorectal Cancer Screening 2021',
    keywords: 'colon colorectal bowel iFOBT FIT stool blood cancer screening',
  },
  {
    id: 'osteoporosis',
    title: 'Osteoporosis Screening',
    condition: 'Osteoporosis',
    guidelines: [
      { age: '≥65', test: 'DXA scan', note: 'Routine screening for all women ≥65' },
      { age: '50–64', test: 'DXA scan if FRAX ≥20% major or ≥3% hip', note: 'Use FRAX tool to assess' },
      { age: 'Fragility fracture', test: 'DXA scan regardless of age', note: 'Any low-trauma fracture warrants assessment' },
    ],
    source: 'Malaysia CPG: Management of Osteoporosis 2022',
    keywords: 'osteoporosis bone density dxa scan frax screening',
  },
  {
    id: 'lung-cancer',
    title: 'Lung Cancer Screening',
    condition: 'Lung cancer',
    guidelines: [
      { age: '50–80', test: 'Low-dose CT chest annually', note: 'For high-risk: ≥30 pack-year smoking history, current smoker or quit <15 years' },
    ],
    source: 'Malaysia CPG: Lung Cancer Screening 2021',
    keywords: 'lung cancer ldct ct chest smoking screening',
  },
  {
    id: 'hep-b',
    title: 'Hepatitis B Screening',
    condition: 'Hepatitis B',
    guidelines: [
      { age: 'All adults', test: 'HBsAg screening at least once', note: 'Especially high-risk groups: MSM, IVDU, household contacts, HD patients' },
      { age: 'Pregnancy', test: 'Routine HBsAg screening', note: 'Screen at first antenatal visit' },
    ],
    source: 'Malaysia CPG: Management of Hepatitis B 2021',
    keywords: 'hepatitis b hbsag liver screening',
  },
  {
    id: 'cvd-risk',
    title: 'Cardiovascular Risk Assessment',
    condition: 'CVD risk',
    guidelines: [
      { age: '≥40', test: 'ASCVD / Framingham Risk Score every 3–5 years', note: 'Start at 30–39 if ≥1 risk factor' },
      { age: 'Diabetic', test: 'Annual risk assessment', note: 'Diabetics are automatically high risk' },
    ],
    source: 'Malaysia CPG: Primary Prevention of CVD 2022',
    keywords: 'cardiovascular cvd risk ascvd framingham heart screening',
  },
]


