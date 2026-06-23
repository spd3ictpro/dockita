import { useNavigate, useSearchParams } from 'react-router-dom'
import { screeningCategories } from '../data/screeningData'
import { ScreeningIcon, FemaleIcon, BreastIcon, GutIcon, DropletIcon, HeartIcon, ChartBarIcon, BoneIcon, LungsIcon, LiverIcon, PulseIcon } from '../components/icons'

const categoryMeta = {
  'cervical-cancer': { icon: FemaleIcon, color: '#f06595' },
  'breast-cancer': { icon: BreastIcon, color: '#f59f00' },
  'colorectal-cancer': { icon: GutIcon, color: '#9775fa' },
  'diabetes': { icon: DropletIcon, color: '#20c997' },
  'hypertension': { icon: HeartIcon, color: '#fa5252' },
  'dyslipidaemia': { icon: ChartBarIcon, color: '#ff922b' },
  'osteoporosis': { icon: BoneIcon, color: '#748ffc' },
  'lung-cancer': { icon: LungsIcon, color: '#38d9a9' },
  'hep-b': { icon: LiverIcon, color: '#fcc419' },
  'cvd-risk': { icon: PulseIcon, color: '#4f6ef7' },
}

const focusTitles = {
  'cervical-cancer': 'Cervical Cancer',
  'breast-cancer': 'Breast Cancer',
  'colorectal-cancer': 'Colorectal Cancer',
  'diabetes': 'Diabetes Mellitus',
  'hypertension': 'Hypertension',
  'dyslipidaemia': 'Dyslipidaemia',
  'osteoporosis': 'Osteoporosis',
  'lung-cancer': 'Lung Cancer',
  'hep-b': 'Hepatitis B',
  'cvd-risk': 'CVD Risk',
}

export default function Screening() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const focus = searchParams.get('focus')
  const showAll = !focus || !focusTitles[focus]

  if (!showAll) {
    const cat = screeningCategories.find(c => c.id === focus)
    if (!cat) {
      return (
        <div className="page">
          <button className="focus-back" onClick={() => navigate('/screening')}>
            <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>arrow_back</span>
            All Screening Guidelines
          </button>
          <h1><ScreeningIcon size={28} className="page-heading-icon" /> Screening Guidelines</h1>
          <p className="page-subtitle">Category not found</p>
        </div>
      )
    }
    const meta = categoryMeta[cat.id] || {}
    const Icon = meta.icon
    return (
      <div className="page">
        <button className="focus-back" onClick={() => navigate('/screening')}>
          <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>arrow_back</span>
          All Screening Guidelines
        </button>

        <div className="score-detail-header">
          <div>
            <div className="score-card-category">{cat.condition}</div>
            <h1>{focusTitles[focus]}</h1>
          </div>
          {Icon && <Icon size={40} className="score-card-icon" style={{ color: meta.color }} />}
        </div>
        <p className="score-detail-desc">{cat.source}</p>

        <div className="score-detail-form">
          <table className="screening-table">
            <thead>
              <tr>
                <th>Population</th>
                <th>Recommendation</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {cat.guidelines.map((g, i) => (
                <tr key={i}>
                  <td className="cell-population">{g.age}</td>
                  <td className="cell-test">{g.test}</td>
                  <td className="note-cell">{g.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  return (
    <div className="page" style={{ paddingTop: 0 }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--on-surface)' }}>Screening Guidelines</h2>
        <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.9rem', marginTop: 4 }}>Malaysia CPG-based screening recommendations</p>
      </div>

      <div className="scores-bento">
        {screeningCategories.map(cat => {
          const meta = categoryMeta[cat.id] || {}
          const Icon = meta.icon
          return (
            <div
              key={cat.id}
              className="score-card"
              onClick={() => navigate('/screening?focus=' + cat.id)}
            >
              <div className="score-card-header">
                <div>
                  <div className="score-card-category">{cat.condition}</div>
                  <div className="score-card-title">{cat.title}</div>
                </div>
                {Icon && <Icon size={32} className="score-card-icon" style={{ color: meta.color }} />}
              </div>
              <p className="score-card-desc">{cat.source}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
