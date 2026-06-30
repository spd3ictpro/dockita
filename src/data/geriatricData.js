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

export const barthelIndex = {
  id: 'barthel',
  title: 'Barthel Index',
  description: '10-item ADL assessment for functional independence (score 0–100)',
  items: [
    {
      key: 'feeding',
      question: 'Feeding',
      options: [
        { value: 0, label: 'Dependent (needs help with feeding)' },
        { value: 5, label: 'Needs help with cutting, spreading butter, etc.' },
        { value: 10, label: 'Independent (able to feed self)' },
      ],
    },
    {
      key: 'bathing',
      question: 'Bathing',
      options: [
        { value: 0, label: 'Dependent (needs help)' },
        { value: 5, label: 'Independent (washes self without help)' },
      ],
    },
    {
      key: 'grooming',
      question: 'Grooming',
      options: [
        { value: 0, label: 'Needs help with personal care' },
        { value: 5, label: 'Independent (face, hair, teeth, shaving)' },
      ],
    },
    {
      key: 'dressing',
      question: 'Dressing',
      options: [
        { value: 0, label: 'Dependent (needs help)' },
        { value: 5, label: 'Needs help but can do half unaided' },
        { value: 10, label: 'Independent (buttons, zips, laces)' },
      ],
    },
    {
      key: 'bowels',
      question: 'Bowels',
      options: [
        { value: 0, label: 'Incontinent (or needs enemas)' },
        { value: 5, label: 'Occasional accidents (≤1/week)' },
        { value: 10, label: 'Continent' },
      ],
    },
    {
      key: 'bladder',
      question: 'Bladder',
      options: [
        { value: 0, label: 'Incontinent (or catheterised, unable to manage)' },
        { value: 5, label: 'Occasional accidents (≤1/day)' },
        { value: 10, label: 'Continent' },
      ],
    },
    {
      key: 'toilet',
      question: 'Toilet Use',
      options: [
        { value: 0, label: 'Dependent (needs help)' },
        { value: 5, label: 'Needs some help, but can do some alone' },
        { value: 10, label: 'Independent (on and off, wiping, flushing)' },
      ],
    },
    {
      key: 'transfers',
      question: 'Transfers (bed to chair & back)',
      options: [
        { value: 0, label: 'Unable — no sitting balance' },
        { value: 5, label: 'Major help (one or two people, physical lift)' },
        { value: 10, label: 'Minor help (verbal or physical cue)' },
        { value: 15, label: 'Independent' },
      ],
    },
    {
      key: 'mobility',
      question: 'Mobility (on level surfaces)',
      options: [
        { value: 0, label: 'Immobile or <50 yards' },
        { value: 5, label: 'Wheelchair independent (includes corners)' },
        { value: 10, label: 'Walks with help of one person (verbal or physical)' },
        { value: 15, label: 'Independent (but may use aid, e.g. stick)' },
      ],
    },
    {
      key: 'stairs',
      question: 'Stairs',
      options: [
        { value: 0, label: 'Unable' },
        { value: 5, label: 'Needs help (verbal, physical, carrying aid)' },
        { value: 10, label: 'Independent (up and down)' },
      ],
    },
  ],
  getCategory: (score) => {
    if (score <= 20) return { label: 'Total dependency', color: 'var(--risk-high)', textColor: 'var(--risk-high-text)' }
    if (score <= 60) return { label: 'Severe dependency', color: '#ff922b', textColor: '#000' }
    if (score <= 90) return { label: 'Moderate dependency', color: 'var(--risk-mod)', textColor: 'var(--risk-mod-text)' }
    if (score <= 99) return { label: 'Mild dependency', color: 'var(--risk-low-mid)', textColor: 'var(--risk-low-mid-text)' }
    return { label: 'Independent', color: 'var(--risk-low)', textColor: 'var(--risk-low-text)' }
  },
  keywords: 'barthel index adl activities of daily living functional independence assessment geriatric elderly',
}
