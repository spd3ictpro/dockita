import { screeningCategories, mammogramDue, iFOBTDue } from './screeningData'
import { framingham, ipss, gad7, phq9, curb65, cha2ds2vasc, hasbled } from './scoresData'
import { clinicalFrailtyScale, morseFallScale } from './geriatricData'
import { patientInfoItems } from './patientInfoData'

export const searchIndex = [
  { path: '/', label: 'Home', keywords: 'home dashboard dockita' },
  { path: '/screening', label: 'Screening Home', keywords: 'screening guidelines cpg' },
  ...screeningCategories.map(s => ({ path: '/screening', label: s.title, keywords: s.keywords })),
  { path: '/screening', label: mammogramDue.title, keywords: mammogramDue.keywords },
  { path: '/screening', label: iFOBTDue.title, keywords: iFOBTDue.keywords },

  { path: '/calculators', label: 'Calculators Home', keywords: 'calculators calculation tools' },
  { path: '/calculators', label: 'BMI Calculator', keywords: 'bmi body mass index obesity weight height calculator' },
  { path: '/calculators', label: 'eGFR Calculator', keywords: 'egfr ckd epi kidney creatinine renal function calculator' },
  { path: '/calculators', label: 'Age Calculator', keywords: 'age calculator year birth' },
  { path: '/calculators', label: 'EDD Calculator', keywords: 'edd expected delivery date naegele pregnancy calculator' },
  { path: '/calculators', label: 'Basic Calculator', keywords: 'basic calculator arithmetic add subtract multiply divide' },

  { path: '/scores', label: framingham.title, keywords: framingham.keywords },
  { path: '/scores', label: ipss.title, keywords: ipss.keywords },
  { path: '/scores', label: gad7.title, keywords: gad7.keywords },
  { path: '/scores', label: phq9.title, keywords: phq9.keywords },
  { path: '/scores', label: curb65.title, keywords: curb65.keywords },
  { path: '/scores', label: cha2ds2vasc.title, keywords: cha2ds2vasc.keywords },
  { path: '/scores', label: hasbled.title, keywords: hasbled.keywords },

  { path: '/geriatric', label: clinicalFrailtyScale.title, keywords: clinicalFrailtyScale.keywords },
  { path: '/geriatric', label: morseFallScale.title, keywords: morseFallScale.keywords },

  ...patientInfoItems.map(p => ({ path: '/patient-info', label: p.title, keywords: p.keywords })),
]
