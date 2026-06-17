import kneeOaAnatomy from '../assets/infographics/knee-oa/knee-oa-anatomy.png'
import kneeOaManagement from '../assets/infographics/knee-oa/knee-oa-management.png'
import kneeOaSurgery from '../assets/infographics/knee-oa/knee-oa-surgery.png'
import ckdStages from '../assets/infographics/ckd/ckd-stages.png'
import carpalAnatomy from '../assets/infographics/carpal-tunnel/carpal-tunnel-anatomy.svg'
import carpalHand from '../assets/infographics/carpal-tunnel/carpal-tunnel-hand.svg'
import plantarFasciaAnatomy from '../assets/infographics/plantar-fasciitis/plantar-fascia-anatomy.svg'
import plantarFasciitisPain from '../assets/infographics/plantar-fasciitis/plantar-fasciitis-pain.svg'
import paederusBeetle from '../assets/infographics/paederus-dermatitis/paederus-beetle.png'
import paederusRash1 from '../assets/infographics/paederus-dermatitis/paederus-rash-1.png'
import paederusRash2 from '../assets/infographics/paederus-dermatitis/paederus-rash-2.png'

export const patientInfoItems = [
  {
    id: 'knee-oa',
    title: 'Knee Osteoarthritis',
    description: 'Common knee pathology — anatomy, conservative management, and surgical options.',
    images: [kneeOaAnatomy, kneeOaManagement, kneeOaSurgery],
    keywords: 'knee osteoarthritis OA knee pain infographic',
  },
  {
    id: 'cervical-cancer',
    title: 'Cervical Cancer Screening',
    description: 'HPV and Pap smear screening pathway, including HPV vaccination recommendations and abnormal result follow-up algorithm.',
    images: [],
    keywords: 'cervical cancer cervix hpv pap smear screening infographic',
  },
  {
    id: 'ifobt',
    title: 'iFOBT / FIT Screening',
    description: 'Colorectal cancer screening using immunochemical faecal occult blood test (iFOBT/FIT). Shows the screening pathway from positive result to colonoscopy.',
    images: [],
    keywords: 'ifobt fit colon colorectal cancer screening infographic stool blood',
  },
  {
    id: 'ckd',
    title: 'Chronic Kidney Disease',
    description: 'CKD stages (1–5) with eGFR ranges, clinical actions, and referral criteria at each stage. Includes risk factors and prevention tips.',
    images: [ckdStages],
    keywords: 'ckd chronic kidney disease stages egfr infographic renal failure',
  },
  {
    id: 'carpal-tunnel',
    title: 'Carpal Tunnel Syndrome',
    description: 'Carpal tunnel anatomy, median nerve compression, common symptoms and signs (Tinel, Phalen), conservative management, and surgical referral criteria.',
    images: [carpalAnatomy, carpalHand],
    keywords: 'carpal tunnel syndrome wrist median nerve compression infographic',
  },
  {
    id: 'breast-self-exam',
    title: 'Breast Self-Examination',
    description: 'Step-by-step breast self-examination guide — visual inspection and palpation techniques, when to perform, and what to look for.',
    images: [],
    keywords: 'breast self examination bse breast cancer screening infographic',
  },
  {
    id: 'plantar-fasciitis',
    title: 'Plantar Fasciitis',
    description: 'Plantar fascia anatomy, common causes of heel pain, risk factors (flat feet, high arches, obesity), conservative management including stretching, orthotics, and night splints.',
    images: [plantarFasciaAnatomy, plantarFasciitisPain],
    keywords: 'plantar fasciitis heel pain plantar fascia foot infographic',
  },
  {
    id: 'paederus-dermatitis',
    title: 'Paederus Dermatitis',
    description: 'Rove beetle (Paederus) identification, mechanism of pederin toxin, linear rash pattern, treatment with topical steroids and antihistamines, and prevention tips.',
    images: [paederusBeetle, paederusRash1, paederusRash2],
    keywords: 'paederus dermatitis rove beetle blister beetle dermatitis linearis infographic',
  },
]
