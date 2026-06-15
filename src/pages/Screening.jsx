import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { screeningCategories } from '../data/screeningData'
import { ScreeningIcon, FemaleIcon, BreastIcon, GutIcon, DropletIcon, HeartIcon, ChartBarIcon, BoneIcon, LungsIcon, LiverIcon, PulseIcon, ChevronRight } from '../components/icons'

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
  const [searchParams, setSearchParams] = useSearchParams()
  const [expanded, setExpanded] = useState(null)
  const focus = searchParams.get('focus')
  const showAll = !focus || !focusTitles[focus]

  if (!showAll) {
    const cat = screeningCategories.find(c => c.id === focus)
    if (!cat) {
      return (
        <div className="page">
          <button className="focus-back" onClick={() => setSearchParams({})}>
            ← All Screening Guidelines
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
        <button className="focus-back" onClick={() => setSearchParams({})}>
          ← All Screening Guidelines
        </button>
        <h1><ScreeningIcon size={28} className="page-heading-icon" /> {focusTitles[focus]}</h1>
        <div className="screening-list">
          <div className="screening-card expanded" style={{ '--card-accent': meta.color }}>
            <div className="screening-card-header" style={{ cursor: 'default' }}>
              <div className="screening-card-header-left">
                {Icon && <Icon size={24} className="screening-card-icon" style={{ color: meta.color }} />}
                <div>
                  <h3>{cat.title}</h3>
                  <span className="screening-source">{cat.source}</span>
                </div>
              </div>
            </div>
            <div className="screening-card-body visible">
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
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <h1><ScreeningIcon size={28} className="page-heading-icon" /> Screening Guidelines</h1>
      <p className="page-subtitle">Malaysia CPG-based screening recommendations</p>

      <div className="screening-list">
        {screeningCategories.map(cat => {
          const meta = categoryMeta[cat.id] || {}
          const Icon = meta.icon
          const isExpanded = expanded === cat.id

          return (
            <div
              key={cat.id}
              className={`screening-card ${isExpanded ? 'expanded' : ''}`}
              style={{ '--card-accent': meta.color }}
            >
              <button className="screening-card-header" onClick={() => setExpanded(e => e === cat.id ? null : cat.id)}>
                <div className="screening-card-header-left">
                  {Icon && <Icon size={24} className="screening-card-icon" style={{ color: meta.color }} />}
                  <div>
                    <h3>{cat.title}</h3>
                    <span className="screening-source">{cat.source}</span>
                  </div>
                </div>
                <ChevronRight size={20} className={`screening-chevron ${isExpanded ? 'expanded' : ''}`} />
              </button>
              <div className={`screening-card-body ${isExpanded ? 'visible' : ''}`}>
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
        })}
      </div>
    </div>
  )
}