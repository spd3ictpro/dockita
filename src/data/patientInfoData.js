import kneeOaAnatomy from '../assets/infographics/knee-oa/knee-oa-anatomy.png'
import kneeOaManagement from '../assets/infographics/knee-oa/knee-oa-management.png'
import kneeOaSurgery from '../assets/infographics/knee-oa/knee-oa-surgery.png'
import ckdStages from '../assets/infographics/ckd/ckd-stages.png'
import carpal1 from '../assets/infographics/carpal-tunnel/carpaltunnel1.png'
import carpal2 from '../assets/infographics/carpal-tunnel/carpaltunnel2.png'
import carpal3 from '../assets/infographics/carpal-tunnel/carpaltunnel3.png'
import carpal4 from '../assets/infographics/carpal-tunnel/carpaltunnel 4.png'
import pfAnatomy from '../assets/infographics/plantar-fasciitis/1-anatomy.png'
import pfPhysio from '../assets/infographics/plantar-fasciitis/2-physiotherapy.png'
import pfSplint from '../assets/infographics/plantar-fasciitis/3-night-splint.png'
import pfInjection from '../assets/infographics/plantar-fasciitis/4-steroid-injection.png'
import pfSurgery from '../assets/infographics/plantar-fasciitis/5-surgery.png'
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
    images: [carpal1, carpal2, carpal3, carpal4],
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
    images: [pfAnatomy, pfPhysio, pfSplint, pfInjection, pfSurgery],
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
