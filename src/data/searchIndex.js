import { screeningCategories } from './screeningData'
import { framingham, ipss, gad7, phq9, cvRiskHtn, act, cat, aria, stopbang, epworth } from './scoresData'
import { clinicalFrailtyScale, barthelIndex } from './geriatricData'
import { patientInfoItems } from './patientInfoData'

const allScoreData = [framingham, ipss, gad7, phq9, cvRiskHtn, act, cat, aria, stopbang, epworth]

export const searchIndex = [
  { path: '/', label: 'Home', keywords: 'home dashboard dockita' },
  { path: '/screening', label: 'Screening Home', keywords: 'screening guidelines cpg' },
  ...screeningCategories.map(s => ({ path: '/screening', label: s.title, keywords: s.keywords, id: s.id })),

  { path: '/diabetes', label: 'Diabetes Mellitus', keywords: 'diabetes diabetic dm sugar hba1c glucose screening diagnostic criteria glycemic targets prediabetes ifg ogtt complications monitoring medication initiation foot retina kidney neuropathy' },
  { path: '/hypertension', label: 'Hypertension', keywords: 'hypertension high blood pressure htn bp cardiovascular risk classification medication initiation staging abpm home monitoring nice 2011 target organ damage' },
  { path: '/dyslipidemia', label: 'Dyslipidaemia', keywords: 'lipid cholesterol dyslipidaemia dyslipidemia hdl ldl tg screening classification treatment targets statin dose framingham risk lifestyle therapy' },
  { path: '/neobili', label: 'NeoBili — Neonatal Bilirubin', keywords: 'neobili bilirubin neonatal jaundice tsb phototherapy exchange transfusion hyperbilirubinemia newborn aap 2022 risk factors ihd dat g6pd deficiency hemolytic albumin sepsis instability threshold' },

  { path: '/calculators', label: 'Calculators Home', keywords: 'calculators calculation tools' },
  { path: '/calculators', label: 'BMI Calculator', keywords: 'bmi body mass index obesity weight height calculator', id: 'bmi' },
  { path: '/calculators', label: 'eGFR Calculator', keywords: 'egfr ckd epi kidney creatinine renal function calculator', id: 'egfr' },
  { path: '/calculators', label: 'FIB-4 Index', keywords: 'fib4 fibrosis liver ast alt platelets calculator nafl nafld diabetes', id: 'fib4' },
  { path: '/calculators', label: 'Age Calculator', keywords: 'age calculator year birth', id: 'age' },
  { path: '/calculators', label: 'EDD Calculator', keywords: 'edd expected delivery date naegele pregnancy calculator', id: 'edd' },
  { path: '/calculators', label: 'Basic Calculator', keywords: 'basic calculator arithmetic add subtract multiply divide', id: 'basic' },
  { path: '/calculators', label: 'Mentzer Index', keywords: 'mentzer index anaemia anemia thalassaemia thalassemia iron deficiency mcv rbc haematology hematology', id: 'mentzer' },
  { path: '/calculators', label: 'Post-ACEi Creatinine Review', keywords: 'acei ace inhibitor creatinine renal function post acei monitoring nephropathy arb kidney', id: 'postAcei' },

  ...allScoreData.map(s => ({ path: '/scores', label: s.title, keywords: s.keywords, id: s.id })),

  { path: '/geriatric', label: clinicalFrailtyScale.title, keywords: clinicalFrailtyScale.keywords, id: clinicalFrailtyScale.id },
  { path: '/geriatric', label: barthelIndex.title, keywords: barthelIndex.keywords, id: barthelIndex.id },

  { path: '/drugs', label: 'Drug Database', keywords: 'drug medication medicine pharmaceutical database search prescription formulary' },

  ...patientInfoItems.map(p => ({ path: '/patient-info', label: p.title, keywords: p.keywords })),
]
