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
      { age: 'General', test: 'Low-dose CT thoracic imaging', note: 'Gold standard for lung cancer screening' },
      { age: '45–75', test: 'Low-dose CT thoracic imaging', note: 'Tobacco smoking history ≥20 pack-years (current or former smoker)' },
      { age: '>40 (high-risk non-smokers)', test: 'Low-dose CT thoracic imaging', note: 'Significant family history (first-degree relative) of lung cancer' },
    ],
    source: 'CPG for the Peri-Operative Management of Resectable Early-Stage Non-Small Cell Lung Cancer in Malaysia 1st Edition (April 2025)',
    keywords: 'lung cancer ldct ct chest smoking screening nsclc low-dose computed tomography',
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
    id: 'diabetes-mellitus',
    title: 'Type 2 Diabetes Screening',
    condition: 'Diabetes mellitus',
    sections: [
      {
        type: 'symptomatic',
        title: 'Symptomatic Individuals',
        rows: [
          {
            population: 'Symptomatic individuals',
            symptoms: [
              'Fatigue or lethargy',
              'Polyuria (frequent urination)',
              'Nocturia (waking at night to urinate)',
              'Polydipsia (excessive thirst)',
              'Polyphagia (increased appetite)',
              'Unexplained weight loss',
              'Pruritus vulvae (vulval itching)',
              'Balanitis (recurrent penile infection)',
            ],
          },
        ],
      },
      {
        type: 'asymptomatic',
        title: 'Asymptomatic Individuals',
        rows: [
          {
            population: 'Women with history of GDM',
            notes: '',
          },
          {
            population: 'All individuals with prediabetes (HbA1c ≥5.7%–6.2% [39 mmol/mol–44 mmol/mol], IGT, or IFG)',
            notes: 'Should be tested yearly',
          },
          {
            population: 'Adults who are overweight or obese (BMI ≥23 kg/m² or waist circumference ≥80 cm for women and ≥90 cm for men) with ANY of the risk factors listed below',
            notes: '',
          },
          {
            population: 'In those without the above risk factors, testing should begin at the age of 30 years',
            notes: '',
          },
        ],
        footnote: 'If tests are normal, screening should be performed annually.',
      },
      {
        type: 'risk-factors',
        title: 'Risk Factors for Asymptomatic Adults',
        items: [
          'History of CVD',
          '1° relatives with T2DM',
          'Hypertension (BP ≥140/90 mmHg or on therapy for hypertension)',
          'HDL-C <0.9 mmol/L or TG >2.8 mmol/L',
          'Women who have delivered a baby weighing ≥4 kg',
          'Those who were born from mothers with GDM',
          'Other endocrine conditions associated with insulin resistance:\n    • PCOS\n    • Cushing\'s syndrome\n    • Acromegaly\n    • Phaeochromocytoma\n    • Presence of acanthosis nigricans',
          'Physical inactivity and sedentary lifestyle',
          'Those receiving long-term treatment with:\n    • corticosteroids\n    • anti-retroviral therapy\n    • atypical anti-psychotic drugs\n    • thiazide diuretics\n    • β-adrenergic blockers\n    • 3-Hydroxy-3-methyl-glutaryl-CoA (HMG-CoA) reductase inhibitors [statins]',
        ],
      },
      {
        type: 'adolescents',
        title: 'Adolescents',
        items: [
          'Adolescents* who are overweight (85th percentile) or obese (95th percentile), and who have one or more additional risk factors:',
          '    • maternal history of diabetes or GDM during the child\'s gestation',
          '    • family history of T2DM in a 1° relative',
          '    • recurrent abscess and/or pruritus genitalia',
          '    • signs of insulin resistance or conditions associated with insulin resistance:',
          '        – dyslipidaemia',
          '        – hypertension',
          '        – polycystic ovary syndrome',
          '        – acanthosis nigricans',
          '        – small for gestational age birth weight',
        ],
        footnote: '*After the onset of puberty or after 10 years of age, whichever occurs earlier.\n\nIf tests are normal, repeat screening at a minimum of 3-year intervals, or more frequently if BMI is increasing.',
      },
      {
        type: 'screening-test',
        title: 'Screening Test',
        rows: [
          { test: 'Random capillary plasma glucose ≥7.8 mmol/L', interpretation: '→ confirmatory test required' },
          { test: 'Fasting capillary plasma glucose ≥5.6 mmol/L', interpretation: '→ confirmatory test required' },
        ],
        confirmatory: [
          'fasting plasma glucose (FPG)',
          'oral glucose tolerance test (OGTT)',
          'HbA1c',
        ],
      },
    ],
    source: 'Malaysia CPG: Management of T2DM 2021 — adapted from ADA Standards of Care in Diabetes 2020',
    keywords: 'diabetes diabetic dm sugar hba1c glucose screening prediabetes ifg ogtt risk factors gdm pcos acanthosis nigricans adolescent overweight obese symptomatic asymptomatic capillary',
  },
]


