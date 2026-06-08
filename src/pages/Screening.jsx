import { useState } from 'react'
import { screeningCategories } from '../data/screeningData'

export default function Screening() {
  const [expanded, setExpanded] = useState(null)

  return (
    <div className="page">
      <h1>📋 Screening Guidelines</h1>
      <p className="page-subtitle">Malaysia CPG-based screening recommendations</p>

      <div className="screening-list">
        {screeningCategories.map(cat => (
          <div key={cat.id} className={`screening-card ${expanded === cat.id ? 'expanded' : ''}`}>
            <button className="screening-card-header" onClick={() => setExpanded(e => e === cat.id ? null : cat.id)}>
              <div>
                <h3>{cat.title}</h3>
                <span className="screening-source">{cat.source}</span>
              </div>
              <span className="expand-icon">{expanded === cat.id ? '▾' : '▸'}</span>
            </button>
            {expanded === cat.id && (
              <div className="screening-card-body">
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
                        <td>{g.age}</td>
                        <td>{g.test}</td>
                        <td className="note-cell">{g.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
