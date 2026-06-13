import { useState } from 'react'
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

export default function Screening() {
  const [expanded, setExpanded] = useState(null)

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