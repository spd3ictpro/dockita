export const framingham = {
  id: 'framingham',
  title: 'Framingham Risk Score',
  description: '10-year cardiovascular risk estimate',
  inputs: [
    { key: 'gender', label: 'Gender', type: 'select', options: [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
    ]},
    { key: 'age', label: 'Age (years)', type: 'number', min: 20, max: 100 },
    { key: 'cholesterol', label: 'Total Cholesterol (mmol/L)', type: 'number', step: 0.1, min: 1, max: 20 },
    { key: 'hdl', label: 'HDL Cholesterol (mmol/L)', type: 'number', step: 0.1, min: 0.1, max: 5 },
    { key: 'sbp', label: 'Systolic BP (mmHg)', type: 'number', min: 60, max: 280 },
    { key: 'treated', label: 'Antihypertensive Medication', type: 'select', options: [
      { value: '0', label: 'Not on antihypertensive' },
      { value: '1', label: 'On antihypertensive' },
    ]},
    { key: 'smoker', label: 'Smoking Status', type: 'select', options: [
      { value: '0', label: 'Non-Smoker' },
      { value: '1', label: 'Smoker' },
    ]},
    { key: 'diabetes', label: 'Diabetes', type: 'select', options: [
      { value: '0', label: 'Non-Diabetic' },
      { value: '1', label: 'Diabetic' },
    ]},
  ],
  calculate: (values) => {
    const gender = values.gender
    const age = Number(values.age)
    const hdl = Number(values.hdl)
    const cholesterol = Number(values.cholesterol)
    const sbp = Number(values.sbp)
    const treated = values.treated === '1'
    const smoker = values.smoker === '1'
    const diabetes = values.diabetes === '1'

    if (isNaN(age) || isNaN(hdl) || isNaN(cholesterol) || isNaN(sbp)) return null
    if (age < 20 || age > 100) return null

    let points = 0

    if (gender === 'male') {
      if (age < 30) points += 0
      else if (age <= 34) points += 0
      else if (age <= 39) points += 2
      else if (age <= 44) points += 5
      else if (age <= 49) points += 6
      else if (age <= 54) points += 8
      else if (age <= 59) points += 10
      else if (age <= 64) points += 11
      else if (age <= 69) points += 12
      else if (age <= 74) points += 14
      else points += 15

      if (hdl >= 1.6) points -= 2
      else if (hdl >= 1.3) points -= 1
      else if (hdl >= 1.2) points += 0
      else if (hdl >= 0.9) points += 1
      else points += 2

      if (cholesterol < 4.2) points += 0
      else if (cholesterol < 5.2) points += 1
      else if (cholesterol < 6.3) points += 2
      else if (cholesterol < 7.4) points += 3
      else points += 4

      if (treated) {
        if (sbp < 120) points += 0
        else if (sbp < 130) points += 2
        else if (sbp < 140) points += 3
        else if (sbp < 160) points += 4
        else points += 5
      } else {
        if (sbp < 120) points -= 2
        else if (sbp < 130) points += 0
        else if (sbp < 140) points += 1
        else if (sbp < 160) points += 2
        else points += 3
      }

      if (smoker) points += 2
      if (diabetes) points += 2

      const maleTable = {
        '-3': 1, '-2': 1.1, '-1': 1.4, '0': 1.6, '1': 1.9, '2': 2.3,
        '3': 2.8, '4': 3.3, '5': 3.9, '6': 4.7, '7': 5.6, '8': 6.7,
        '9': 7.9, '10': 9.4, '11': 11.2, '12': 13.2, '13': 15.6,
        '14': 18.4, '15': 21.6, '16': 25.3, '17': 29.4, '18': '>30',
      }
      return { risk: maleTable[String(points)] || '>30', points }
    }

    if (age < 30) points += 0
    else if (age <= 34) points += 0
    else if (age <= 39) points += 2
    else if (age <= 44) points += 4
    else if (age <= 49) points += 5
    else if (age <= 54) points += 7
    else if (age <= 59) points += 8
    else if (age <= 64) points += 9
    else if (age <= 69) points += 10
    else if (age <= 74) points += 11
    else points += 12

    if (hdl >= 1.6) points -= 2
    else if (hdl >= 1.3) points -= 1
    else if (hdl >= 1.2) points += 0
    else if (hdl >= 0.9) points += 1
    else points += 2

    if (cholesterol < 4.2) points += 0
    else if (cholesterol < 5.2) points += 1
    else if (cholesterol < 6.3) points += 3
    else if (cholesterol < 7.4) points += 4
    else points += 5

    if (treated) {
      if (sbp < 120) points -= 1
      else if (sbp < 130) points += 2
      else if (sbp < 140) points += 3
      else if (sbp < 150) points += 5
      else if (sbp < 160) points += 6
      else points += 7
    } else {
      if (sbp < 120) points -= 3
      else if (sbp < 130) points += 0
      else if (sbp < 140) points += 1
      else if (sbp < 150) points += 2
      else if (sbp < 160) points += 4
      else points += 5
    }

    if (smoker) points += 2
    if (diabetes) points += 2

    const femaleTable = {
      '-2': '<1', '-1': '1.0', '0': '1.2', '1': '1.5', '2': '1.7',
      '3': '2.0', '4': '2.4', '5': '2.8', '6': '3.3', '7': '3.9',
      '8': '4.5', '9': '5.3', '10': '6.3', '11': '7.3', '12': '8.6',
      '13': '10.0', '14': '11.7', '15': '13.7', '16': '15.9', '17': '18.5',
      '18': '21.5', '19': '24.8', '20': '28.5', '21': '>30',
    }
    return { risk: femaleTable[String(points)] || '>30', points }
  },
  interpret: (riskVal) => {
    const risk = parseFloat(riskVal)
    if (isNaN(risk)) return { category: 'High Risk', color: 'var(--risk-high)' }
    if (risk < 10) return { category: 'Low Risk', color: 'var(--risk-low)' }
    if (risk <= 20) return { category: 'Moderate Risk', color: 'var(--risk-mod)' }
    return { category: 'High Risk', color: 'var(--risk-high)' }
  },
  getCategory: (riskVal) => {
    const r = framingham.interpret(riskVal)
    return { label: r.category, color: r.color }
  },
  keywords: 'framingham cardiovascular cv risk score heart cholesterol 10 year',
}

export const ipss = {
  id: 'ipss',
  title: 'IPSS — International Prostate Symptom Score',
  description: 'Benign prostatic hyperplasia symptom assessment (7 questions, 0–5 each)',
  symptomOptions: [
    { value: 0, label: 'Not at all' },
    { value: 1, label: 'Less than 1 in 5 times' },
    { value: 2, label: 'Less than half the time' },
    { value: 3, label: 'About half the time' },
    { value: 4, label: 'More than half the time' },
    { value: 5, label: 'Almost always' },
  ],
  questions: [
    { key: 'q1', text: 'Incomplete emptying — How often have you had the sensation of not emptying your bladder?', low: 'Not at all', high: 'Almost always' },
    { key: 'q2', text: 'Frequency — How often have you had to urinate again less than 2 hours after you finished urinating?', low: 'Not at all', high: 'Almost always' },
    { key: 'q3', text: 'Intermittency — How often have you found you stopped and started again several times when you urinated?', low: 'Not at all', high: 'Almost always' },
    { key: 'q4', text: 'Urgency — How often have you found it difficult to postpone urination?', low: 'Not at all', high: 'Almost always' },
    { key: 'q5', text: 'Weak stream — How often have you had a weak urinary stream?', low: 'Not at all', high: 'Almost always' },
    { key: 'q6', text: 'Straining — How often have you had to push or strain to begin urination?', low: 'Not at all', high: 'Almost always' },
    { key: 'q7', text: 'Nocturia — How many times did you most typically get up to urinate from the time you went to bed at night until the time you got up in the morning?', low: '0 times', high: '5+ times' },
  ],
  maxScore: 35,
  cutoffLow: 7,
  cutoffMod: 19,
  getCategory: (score) => {
    if (score <= 7) return { label: 'Mild', color: 'var(--risk-low)' }
    if (score <= 19) return { label: 'Moderate', color: 'var(--risk-mod)' }
    return { label: 'Severe', color: 'var(--risk-high)' }
  },
  qol: {
    text: 'If you were to spend the rest of your life with your urinary condition just the way it is now, how would you feel about that?',
    options: [
      { value: 0, label: 'Delighted' },
      { value: 1, label: 'Pleased' },
      { value: 2, label: 'Mostly satisfied' },
      { value: 3, label: 'Mixed' },
      { value: 4, label: 'Mostly dissatisfied' },
      { value: 5, label: 'Unhappy' },
      { value: 6, label: 'Terrible' },
    ],
    getCategory: (score) => {
      if (score <= 1) return { label: 'Satisfied', color: 'var(--risk-low)' }
      if (score <= 3) return { label: 'Mixed', color: 'var(--risk-mod)' }
      return { label: 'Dissatisfied', color: 'var(--risk-high)' }
    },
  },
  keywords: 'ipss prostate bph urinary symptom score',
}

export const gad7 = {
  id: 'gad7',
  title: 'GAD-7 — Generalised Anxiety Disorder',
  description: 'Anxiety symptom assessment (7 questions, 0–3 each)',
  questions: [
    'Feeling nervous, anxious, or on edge',
    'Not being able to stop or control worrying',
    'Worrying too much about different things',
    'Trouble relaxing',
    'Being so restless that it is hard to sit still',
    'Becoming easily annoyed or irritable',
    'Feeling afraid as if something awful might happen',
  ].map((text, i) => ({ key: `q${i+1}`, text })),
  maxScore: 21,
  getCategory: (score) => {
    if (score <= 4) return { label: 'Minimal anxiety', color: 'var(--risk-low)' }
    if (score <= 9) return { label: 'Mild anxiety', color: 'var(--risk-low-mid)' }
    if (score <= 14) return { label: 'Moderate anxiety', color: 'var(--risk-mod)' }
    return { label: 'Severe anxiety', color: 'var(--risk-high)' }
  },
  keywords: 'gad7 gad anxiety mental health screening',
}

export const phq9 = {
  id: 'phq9',
  title: 'PHQ-9 — Patient Health Questionnaire',
  description: 'Depression severity assessment (9 questions, 0–3 each)',
  questions: [
    'Little interest or pleasure in doing things',
    'Feeling down, depressed, or hopeless',
    'Trouble falling or staying asleep, or sleeping too much',
    'Feeling tired or having little energy',
    'Poor appetite or overeating',
    'Feeling bad about yourself — or that you are a failure or have let yourself or your family down',
    'Trouble concentrating on things, such as reading the newspaper or watching television',
    'Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual',
    'Thoughts that you would be better off dead, or of hurting yourself',
  ].map((text, i) => ({ key: `q${i+1}`, text })),
  maxScore: 27,
  getCategory: (score) => {
    if (score <= 4) return { label: 'Minimal depression', color: 'var(--risk-low)' }
    if (score <= 9) return { label: 'Mild depression', color: 'var(--risk-low-mid)' }
    if (score <= 14) return { label: 'Moderate depression', color: 'var(--risk-mod)' }
    if (score <= 19) return { label: 'Moderately severe depression', color: 'var(--risk-high-mid)' }
    return { label: 'Severe depression', color: 'var(--risk-high)' }
  },
  keywords: 'phq9 phq depression mental health screening',
}

export const cvRiskHtn = {
  id: 'cv-risk-htn',
  title: 'CV Risk for HTN Medication Initiation',
  description: 'Malaysia CPG Hypertension (5th Ed) — Assess CV risk to determine threshold for starting antihypertensive medication',
  inputs: [
    { key: 'gender', label: 'Gender', type: 'select', options: [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
    ]},
    { key: 'age', label: 'Age (years)', type: 'number', min: 18, max: 120 },
    { key: 'sbp', label: 'Systolic BP (mmHg)', type: 'number', min: 80, max: 280 },
    { key: 'dbp', label: 'Diastolic BP (mmHg)', type: 'number', min: 40, max: 180 },
    { key: 'smoking', label: 'Smoking Status', type: 'select', options: [
      { value: '0', label: 'Non-Smoker' },
      { value: '1', label: 'Current Smoker' },
    ]},
    { key: 'diabetes', label: 'Diabetes', type: 'select', options: [
      { value: '0', label: 'No' },
      { value: '1', label: 'Yes' },
    ]},
    { key: 'family_hx', label: 'Family History of Premature CVD', type: 'select', options: [
      { value: '0', label: 'No' },
      { value: '1', label: 'Yes (male &lt;55 / female &lt;65)' },
    ]},
    { key: 'obesity', label: 'Obesity (BMI ≥30 or abdominal obesity)', type: 'select', options: [
      { value: '0', label: 'No' },
      { value: '1', label: 'Yes' },
    ]},
    { key: 'dyslipidemia', label: 'Dyslipidemia (TC >6.2 / LDL >4.1 / HDL <1.0)', type: 'select', options: [
      { value: '0', label: 'No' },
      { value: '1', label: 'Yes' },
    ]},
  ],
  calculate: (values) => {
    const gender = values.gender
    const age = Number(values.age)
    const sbp = Number(values.sbp)
    const dbp = Number(values.dbp)
    const smoking = values.smoking === '1'
    const diabetes = values.diabetes === '1'
    const familyHx = values.family_hx === '1'
    const obesity = values.obesity === '1'
    const dyslipidemia = values.dyslipidemia === '1'

    if (isNaN(age) || isNaN(sbp) || isNaN(dbp)) return null

    let riskCount = 0
    if ((gender === 'male' && age >= 55) || (gender === 'female' && age >= 65)) riskCount++
    if (smoking) riskCount++
    if (diabetes) riskCount++
    if (familyHx) riskCount++
    if (obesity) riskCount++
    if (dyslipidemia) riskCount++

    let riskCategory
    if (riskCount >= 3 || diabetes) {
      riskCategory = 'High'
    } else if (riskCount >= 1) {
      riskCategory = 'Moderate'
    } else {
      riskCategory = 'Low'
    }

    let bpGrade
    if (sbp < 120 && dbp < 80) bpGrade = 'Optimal'
    else if (sbp < 130 && dbp < 85) bpGrade = 'Normal'
    else if (sbp < 140 && dbp < 90) bpGrade = 'High Normal'
    else if (sbp < 160 && dbp < 100) bpGrade = 'Grade 1'
    else bpGrade = 'Grade 2'

    let recommendation
    if (bpGrade === 'Optimal' || bpGrade === 'Normal') {
      recommendation = 'Reassess in 1–3 years. Maintain lifestyle measures.'
    } else if (bpGrade === 'High Normal') {
      if (riskCategory === 'High') {
        recommendation = 'Lifestyle modification + consider pharmacological therapy.'
      } else {
        recommendation = 'Lifestyle modification. Reassess in 6–12 months.'
      }
    } else if (bpGrade === 'Grade 1') {
      if (riskCategory === 'Low') {
        recommendation = 'Lifestyle modification for 3–6 months. Consider medication if BP remains ≥140/90.'
      } else {
        recommendation = 'Lifestyle modification + pharmacological therapy. Target BP &lt;140/90.'
      }
    } else {
      recommendation = 'Lifestyle modification + pharmacological therapy. Consider combination therapy. Target BP &lt;140/90.'
    }

    return {
      riskCategory,
      riskCount,
      bpGrade,
      sbp,
      dbp,
      recommendation,
    }
  },
  getCategory: (result) => {
    if (result.riskCategory === 'High') return { label: 'High CV Risk', color: 'var(--risk-high)' }
    if (result.riskCategory === 'Moderate') return { label: 'Moderate CV Risk', color: 'var(--risk-mod)' }
    return { label: 'Low CV Risk', color: 'var(--risk-low)' }
  },
  keywords: 'hypertension cpg malaysia cardiovascular risk medication initiation blood pressure',
}

export const act = {
  id: 'act',
  title: 'ACT — Asthma Control Test',
  description: 'Asthma control assessment (5 questions, 1–5 each)',
  questions: [
    { key: 'q1', text: 'How much of the time did your asthma keep you from getting as much done at work, school or home?', labels: ['None of the time', 'A little of the time', 'Some of the time', 'Most of the time', 'All of the time'] },
    { key: 'q2', text: 'How often have you had shortness of breath?', labels: ['Not at all', 'Once or twice a week', '3–6 times a week', 'Once a day', 'More than once a day'] },
    { key: 'q3', text: 'How often did asthma symptoms wake you up at night or earlier than usual?', labels: ['Not at all', '1–2 times a month', '1–2 times a week', '3–4 nights a week', '4 or more nights a week'] },
    { key: 'q4', text: 'How often have you used your rescue inhaler or nebuliser?', labels: ['Not at all', 'Once a week or less', 'A few times a week', '1–2 times per day', '3 or more times per day'] },
    { key: 'q5', text: 'How would you rate your asthma control?', labels: ['Completely controlled', 'Well controlled', 'Somewhat controlled', 'Poorly controlled', 'Not controlled at all'] },
  ],
  maxScore: 25,
  getCategory: (score) => {
    if (score >= 20) return { label: 'Well controlled', color: 'var(--risk-low)' }
    if (score >= 16) return { label: 'Partly controlled', color: 'var(--risk-mod)' }
    return { label: 'Uncontrolled', color: 'var(--risk-high)' }
  },
  keywords: 'act asthma control test respiratory',
}

export const cat = {
  id: 'cat',
  title: 'CAT — COPD Assessment Test',
  description: 'COPD impact assessment (8 questions, 0–5 each)',
  questions: [
    { key: 'q1', text: 'I never cough' },
    { key: 'q2', text: 'I have no phlegm (mucus) in my chest at all' },
    { key: 'q3', text: 'My chest does not feel tight at all' },
    { key: 'q4', text: 'When I walk up a hill or one flight of stairs I am not breathless' },
    { key: 'q5', text: 'I am not limited doing any activities at home' },
    { key: 'q6', text: 'I am confident leaving home despite my lung condition' },
    { key: 'q7', text: 'I sleep soundly' },
    { key: 'q8', text: 'I have lots of energy' },
  ],
  maxScore: 40,
  getCategory: (score) => {
    if (score <= 10) return { label: 'Low impact', color: 'var(--risk-low)' }
    if (score <= 20) return { label: 'Medium impact', color: 'var(--risk-mod)' }
    if (score <= 30) return { label: 'High impact', color: 'var(--risk-high-mid)' }
    return { label: 'Very high impact', color: 'var(--risk-high)' }
  },
  keywords: 'cat copd assessment test respiratory lung',
}

export const aria = {
  id: 'aria',
  title: 'ARIA — Allergic Rhinitis Classification',
  description: 'Allergic Rhinitis and its Impact on Asthma — classify severity by duration and symptom impact',
  severityItems: [
    { key: 'sleep', label: 'Sleep disturbance' },
    { key: 'daily', label: 'Impairment of daily activities, sport, leisure' },
    { key: 'work', label: 'Impairment of work or school' },
    { key: 'symptoms', label: 'Troublesome symptoms' },
  ],
  getCategory: (duration, severityCount) => {
    const sev = severityCount > 0 ? 'Moderate–Severe' : 'Mild'
    const dur = duration === 'persistent' ? 'Persistent' : 'Intermittent'
    const color = severityCount > 0 ? 'var(--risk-mod)' : 'var(--risk-low)'
    return { label: `${sev} ${dur}`, color }
  },
  keywords: 'aria allergic rhinitis classification hayfever',
}

export const stopbang = {
  id: 'stopbang',
  title: 'STOP-BANG — OSA Screening',
  description: 'Obstructive sleep apnoea risk assessment (8 items)',
  items: [
    { key: 'snore', question: 'Do you snore loudly (louder than talking or through closed doors)?' },
    { key: 'tired', question: 'Do you often feel tired, fatigued, or sleepy during daytime?' },
    { key: 'observed', question: 'Has anyone observed you stop breathing while sleeping?' },
    { key: 'pressure', question: 'Do you have or are you treated for high blood pressure?' },
    { key: 'bmi', question: 'BMI > 35 kg/m²?' },
    { key: 'age', question: 'Age > 50 years?' },
    { key: 'neck', question: 'Neck circumference > 40 cm (16 inches)?' },
    { key: 'gender', question: 'Male gender?' },
  ],
  calculate: (vals) => Object.values(vals).filter(v => v === '1').length,
  getCategory: (score) => {
    if (score <= 2) return { label: 'Low risk', color: 'var(--risk-low)' }
    if (score <= 4) return { label: 'Intermediate risk', recommendation: 'Consider sleep study referral', color: 'var(--risk-mod)' }
    return { label: 'High risk', recommendation: 'Strongly consider sleep study referral', color: 'var(--risk-high)' }
  },
  keywords: 'stopbang osa sleep apnoea obstructive screening',
}

export const epworth = {
  id: 'epworth',
  title: 'Epworth Sleepiness Scale',
  description: 'Daytime sleepiness assessment (8 situations, 0–3 each)',
  questions: [
    'Sitting and reading',
    'Watching TV',
    'Sitting inactive in a public place (theatre, meeting)',
    'As a passenger in a car for an hour without a break',
    'Lying down to rest in the afternoon when circumstances permit',
    'Sitting and talking to someone',
    'Sitting quietly after a lunch without alcohol',
    'In a car, while stopped for a few minutes in traffic',
  ].map((text, i) => ({ key: `q${i+1}`, text })),
  maxScore: 24,
  getCategory: (score) => {
    if (score <= 10) return { label: 'Normal', color: 'var(--risk-low)' }
    if (score <= 12) return { label: 'Mild sleepiness', color: 'var(--risk-low-mid)' }
    if (score <= 15) return { label: 'Moderate sleepiness', color: 'var(--risk-mod)' }
    return { label: 'Severe sleepiness', color: 'var(--risk-high)' }
  },
  des: ['Would never doze', 'Slight chance of dozing', 'Moderate chance of dozing', 'High chance of dozing'],
  keywords: 'epworth sleepiness scale ess daytime sleep',
}
