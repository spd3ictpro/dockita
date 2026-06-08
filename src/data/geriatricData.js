export const clinicalFrailtyScale = {
  id: 'cfs',
  title: 'Clinical Frailty Scale',
  description: '9-point global frailty assessment based on clinical judgment',
  levels: [
    { score: 1, label: 'Very Fit', description: 'People who are robust, active, energetic, and motivated. They commonly exercise regularly and are among the fittest for their age.' },
    { score: 2, label: 'Well', description: 'People who have no active disease symptoms but are less fit than category 1. Often they exercise or are very active occasionally, e.g. seasonally.' },
    { score: 3, label: 'Managing Well', description: 'People whose medical problems are well controlled, but are not regularly active beyond routine walking.' },
    { score: 4, label: 'Vulnerable', description: 'While not dependent on others for daily help, symptoms often limit activities. A common complaint is being "slowed up" and/or being tired during the day.' },
    { score: 5, label: 'Mildly Frail', description: 'These people often have more evident slowing and need help in high-order IADLs (finances, transportation, heavy housework). Typically mild frailty progressively impairs shopping and walking outside alone.' },
    { score: 6, label: 'Moderately Frail', description: 'People need help with all outside activities and with keeping house. Inside, they often have problems with stairs and need help with bathing and might need minimal assistance with dressing.' },
    { score: 7, label: 'Severely Frail', description: 'Completely dependent for personal care, from whatever cause (physical or cognitive). Even so, they seem stable and not at high risk of dying (within ~6 months).' },
    { score: 8, label: 'Very Severely Frail', description: 'Completely dependent, approaching the end of life. Typically they could not recover even from a minor illness.' },
    { score: 9, label: 'Terminally Ill', description: 'Approaching the end of life. This category applies to people with a life expectancy <6 months, who are not otherwise evidently frail.' },
  ],
  keywords: 'clinical frailty scale cfs frailty geriatric elderly assessment',
}

export const morseFallScale = {
  id: 'morse',
  title: 'Morse Fall Scale',
  description: 'Fall risk assessment (6 items) — scores ≥45 indicate high fall risk',
  items: [
    {
      key: 'falls',
      question: 'History of falling (immediate or previous admission)',
      options: [
        { value: 0, label: 'No' },
        { value: 25, label: 'Yes' },
      ],
    },
    {
      key: 'secondary',
      question: 'Secondary diagnosis (≥2 medical diagnoses)',
      options: [
        { value: 0, label: 'No' },
        { value: 15, label: 'Yes' },
      ],
    },
    {
      key: 'aid',
      question: 'Ambulatory aid',
      options: [
        { value: 0, label: 'None / bed rest / nurse assist' },
        { value: 15, label: 'Crutches / cane / walker' },
        { value: 30, label: 'Furniture' },
      ],
    },
    {
      key: 'iv',
      question: 'IV / Heparin lock / Saline lock',
      options: [
        { value: 0, label: 'No' },
        { value: 20, label: 'Yes' },
      ],
    },
    {
      key: 'gait',
      question: 'Gait / Transferring',
      options: [
        { value: 0, label: 'Normal / bed rest / wheelchair' },
        { value: 10, label: 'Weak (stooped, short steps, holds furniture)' },
        { value: 20, label: 'Impaired (difficulty rising, unsteady, shuffling)' },
      ],
    },
    {
      key: 'mental',
      question: 'Mental status',
      options: [
        { value: 0, label: 'Oriented to own ability' },
        { value: 15, label: 'Overestimates / forgets limitations' },
      ],
    },
  ],
  getCategory: (score) => {
    if (score < 25) return { label: 'Low risk', color: 'var(--risk-low)' }
    if (score < 45) return { label: 'Moderate risk', color: 'var(--risk-mod)' }
    return { label: 'High risk', color: 'var(--risk-high)' }
  },
  keywords: 'morse fall scale risk assessment elderly geriatric',
}
