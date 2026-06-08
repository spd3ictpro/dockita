import { useNavigate } from 'react-router-dom'

const categories = [
  { path: '/screening', icon: '📋', title: 'Screening', desc: 'Malaysia CPG screening guidelines', color: '#4f6ef7' },
  { path: '/calculators', icon: '🧮', title: 'Calculators', desc: 'BMI, eGFR, Age, EDD, and basic calculator', color: '#845ef7' },
  { path: '/scores', icon: '📊', title: 'Scores & Scales', desc: 'Framingham, IPSS, GAD-7, PHQ-9, CURB-65, CHA₂DS₂-VASc, HAS-BLED', color: '#0ca678' },
  { path: '/geriatric', icon: '👴', title: 'Geriatric', desc: 'Clinical Frailty Scale, Morse Fall Scale', color: '#f59f00' },
  { path: '/patient-info', icon: '🖼️', title: 'Patient Info', desc: 'Infographics for patient education', color: '#e64980' },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="page home-page">
      <div className="home-header">
        <h1>☤ dockita</h1>
        <p className="home-subtitle">Medical Officer Daily Dashboard</p>
      </div>
      <div className="home-grid">
        {categories.map(cat => (
          <button key={cat.path} className="home-card" style={{ '--card-accent': cat.color }} onClick={() => navigate(cat.path)}>
            <span className="home-card-icon">{cat.icon}</span>
            <div className="home-card-body">
              <h3>{cat.title}</h3>
              <p>{cat.desc}</p>
            </div>
          </button>
        ))}
      </div>
      <div className="home-quick-tools">
        <h2>Quick Tools</h2>
        <div className="quick-tool-list">
          <button className="quick-tool" onClick={() => navigate('/calculators')}>📊 BMI</button>
          <button className="quick-tool" onClick={() => navigate('/calculators')}>🩺 eGFR</button>
          <button className="quick-tool" onClick={() => navigate('/scores')}>❤️ Framingham</button>
          <button className="quick-tool" onClick={() => navigate('/scores')}>🧠 PHQ-9</button>
          <button className="quick-tool" onClick={() => navigate('/geriatric')}>👴 CFS</button>
        </div>
      </div>
    </div>
  )
}
