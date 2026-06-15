import { screeningCategories } from './screeningData'
import { framingham, ipss, gad7, phq9, curb65, cha2ds2vasc, hasbled } from './scoresData'
import { clinicalFrailtyScale, morseFallScale } from './geriatricData'
import { patientInfoItems } from './patientInfoData'

export const searchIndex = [
  { path: '/', label: 'Home', keywords: 'home dashboard dockita' },
  { path: '/screening', label: 'Screening Home', keywords: 'screening guidelines cpg' },
  ...screeningCategories.map(s => ({ path: '/screening', label: s.title, keywords: s.keywords, id: s.id })),

  { path: '/diabetes', label: 'Diabetes Mellitus', keywords: 'diabetes diabetic dm sugar hba1c glucose screening diagnostic criteria glycemic targets' },
  { path: '/hypertension', label: 'Hypertension', keywords: 'hypertension high blood pressure htn bp cardiovascular risk classification medication initiation' },
  { path: '/dyslipidemia', label: 'Dyslipidaemia', keywords: 'lipid cholesterol dyslipidaemia dyslipidemia hdl ldl tg screening classification treatment targets' },

  { path: '/calculators', label: 'Calculators Home', keywords: 'calculators calculation tools' },
  { path: '/calculators', label: 'BMI Calculator', keywords: 'bmi body mass index obesity weight height calculator', id: 'bmi' },
  { path: '/calculators', label: 'eGFR Calculator', keywords: 'egfr ckd epi kidney creatinine renal function calculator', id: 'egfr' },
  { path: '/calculators', label: 'FIB-4 Index', keywords: 'fib4 fibrosis liver ast alt platelets calculator nafl nafld diabetes', id: 'fib4' },
  { path: '/calculators', label: 'Age Calculator', keywords: 'age calculator year birth', id: 'age' },
  { path: '/calculators', label: 'EDD Calculator', keywords: 'edd expected delivery date naegele pregnancy calculator', id: 'edd' },
  { path: '/calculators', label: 'Basic Calculator', keywords: 'basic calculator arithmetic add subtract multiply divide', id: 'basic' },

  { path: '/scores', label: framingham.title, keywords: framingham.keywords, id: framingham.id },
  { path: '/scores', label: ipss.title, keywords: ipss.keywords, id: ipss.id },
  { path: '/scores', label: gad7.title, keywords: gad7.keywords, id: gad7.id },
  { path: '/scores', label: phq9.title, keywords: phq9.keywords, id: phq9.id },
  { path: '/scores', label: curb65.title, keywords: curb65.keywords, id: curb65.id },
  { path: '/scores', label: cha2ds2vasc.title, keywords: cha2ds2vasc.keywords, id: cha2ds2vasc.id },
  { path: '/scores', label: hasbled.title, keywords: hasbled.keywords, id: hasbled.id },

  { path: '/geriatric', label: clinicalFrailtyScale.title, keywords: clinicalFrailtyScale.keywords, id: clinicalFrailtyScale.id },
  { path: '/geriatric', label: morseFallScale.title, keywords: morseFallScale.keywords, id: morseFallScale.id },

  { path: '/drugs', label: 'Drug Database', keywords: 'drug medication medicine pharmaceutical database search prescription formulary' },

  ...patientInfoItems.map(p => ({ path: '/patient-info', label: p.title, keywords: p.keywords })),
]
