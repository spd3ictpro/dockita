import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const categories = [
  { path: '/screening', icon: 'clinical_notes', title: 'Screening', desc: 'Malaysia CPG screening guidelines for 10 conditions' },
  { path: '/calculators', icon: 'calculate', title: 'Calculators', desc: 'BMI, eGFR, Age, EDD, and a basic calculator' },
  { path: '/scores', icon: 'analytics', title: 'Scores & Scales', desc: 'Framingham, IPSS, GAD-7, PHQ-9, CURB-65, CHA₂DS₂-VASc, HAS-BLED' },
  { path: '/geriatric', icon: 'elderly', title: 'Geriatric', desc: 'Clinical Frailty Scale and Morse Fall Scale' },
  { path: '/patient-info', icon: 'monitoring', title: 'Patient Info', desc: 'Infographics and visual aids for patient education' },
  { path: '/drugs', icon: 'pill', title: 'Drug Database', desc: '148 medications available in formulary' },
]

const quotes = [
  { text: 'The art of medicine consists of amusing the patient while nature cures the disease.', author: 'Voltaire' },
  { text: 'Wherever the art of medicine is loved, there is also a love of humanity.', author: 'Hippocrates' },
  { text: 'Medicine is a science of uncertainty and an art of probability.', author: 'William Osler' },
  { text: 'The good physician treats the disease; the great physician treats the patient who has the disease.', author: 'William Osler' },
  { text: 'Prevention is better than cure.', author: 'Desiderius Erasmus' },
  { text: 'Let food be thy medicine and medicine be thy food.', author: 'Hippocrates' },
  { text: 'He who has health has hope, and he who has hope has everything.', author: 'Arabian Proverb' },
  { text: 'The greatest medicine of all is teaching people how not to need it.', author: 'Hippocrates' },
]

export default function Home() {
  const navigate = useNavigate()
  const [now, setNow] = useState(new Date())
  const [quote] = useState(() => quotes[Math.floor(Math.random() * quotes.length)])

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30000)
    return () => clearInterval(id)
  }, [])

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  const timeStr = now.toLocaleTimeString('en-MY', { hour: '2-digit', minute: '2-digit', hour12: false })
  const dayStr = days[now.getDay()]
  const dateStr = `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`

  return (
    <div className="home-page">
      <section className="home-header">
        <div className="home-greeting">
          <h2>Welcome, Medical Officer</h2>
          <p>Centralized decision support and clinical guidelines for your shift.</p>
        </div>
        <div className="home-time-card">
          <span className="time">{timeStr}</span>
          <span className="date-day">{dayStr}</span>
          <span className="date-full">{dateStr}</span>
        </div>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
        {categories.map(cat => (
          <button
            key={cat.path}
            className="card"
            onClick={() => navigate(cat.path)}
            style={{ padding: '20px', cursor: 'pointer', textAlign: 'left', border: 'none', background: 'var(--surface-container-lowest)', display: 'flex', flexDirection: 'column', gap: '8px' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '1.5rem', color: 'var(--primary)' }}>{cat.icon}</span>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--on-surface)', marginBottom: 2 }}>{cat.title}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--on-surface-variant)', lineHeight: 1.4 }}>{cat.desc}</div>
            </div>
          </button>
        ))}
      </section>

      <section className="home-quote-section">
        <blockquote>
          <p>&ldquo;{quote.text}&rdquo;</p>
          <footer>&mdash; {quote.author}</footer>
        </blockquote>
      </section>
    </div>
  )
}
