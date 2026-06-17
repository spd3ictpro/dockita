import { useNavigate } from 'react-router-dom'
import { Logo } from '../components/icons'
import quotes from '../data/quotes'

export default function Home() {
  const navigate = useNavigate()
  let recent = []
  try { recent = JSON.parse(localStorage.getItem('dockita-recent') || '[]') } catch {}

  let text = 'First do no harm.'
  let author = 'Hippocrates'
  try {
    const today = new Date()
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate()
    const q = quotes[seed % quotes.length]
    if (q) { text = q.text; author = q.author }
  } catch {}

  return (
    <div className="page page--narrow home-page">
      <div className="home-header">
        <Logo size={40} className="home-logo-icon" />
        <h1>dockita</h1>
        <p className="home-subtitle">Medical Officer Daily Dashboard</p>
      </div>

      <div className="home-quote-card">
        <p className="home-quote-text">{text}</p>
        <p className="home-quote-author">— {author}</p>
      </div>

      {recent.length > 0 && (
        <div className="home-recent">
          <h3 className="home-section-title">Recently Used</h3>
          <div className="home-recent-chips">
            {recent.slice(0, 6).map(r => (
              <button key={r.path} className="home-recent-chip" onClick={() => navigate(r.path)}>
                {r.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
