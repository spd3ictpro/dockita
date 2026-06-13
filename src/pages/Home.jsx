import { useNavigate } from 'react-router-dom'
import { ScreeningIcon, CalculatorIcon, ScoresIcon, GeriatricIcon, PatientInfoIcon, Logo } from '../components/icons'

const categories = [
  { path: '/screening', icon: ScreeningIcon, title: 'Screening', desc: 'Malaysia CPG screening guidelines for 10 conditions — cervical, breast, colorectal cancer, diabetes, hypertension, and more', color: '#4f6ef7' },
  { path: '/calculators', icon: CalculatorIcon, title: 'Calculators', desc: 'BMI, eGFR, Age, EDD, and a basic calculator for quick clinical computations', color: '#845ef7' },
  { path: '/scores', icon: ScoresIcon, title: 'Scores & Scales', desc: 'Framingham, IPSS, GAD-7, PHQ-9, CURB-65, CHA\u2082DS\u2082-VASc, and HAS-BLED', color: '#0ca678' },
  { path: '/geriatric', icon: GeriatricIcon, title: 'Geriatric', desc: 'Clinical Frailty Scale and Morse Fall Scale for elderly patient assessment', color: '#f59f00' },
  { path: '/patient-info', icon: PatientInfoIcon, title: 'Patient Info', desc: 'Infographics and visual aids for patient education and counselling', color: '#e64980' },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="page home-page">
      <div className="home-header">
        <Logo size={40} className="home-logo-icon" />
        <h1>dockita</h1>
        <p className="home-subtitle">Medical Officer Daily Dashboard</p>
      </div>
      <div className="home-grid">
        {categories.map(cat => {
          const Icon = cat.icon
          return (
            <button key={cat.path} className="home-card" style={{ '--card-accent': cat.color }} onClick={() => navigate(cat.path)}>
              <Icon size={32} className="home-card-icon" />
              <div className="home-card-body">
                <h3>{cat.title}</h3>
                <p>{cat.desc}</p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
