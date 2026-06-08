import { useState } from 'react'
import { screeningCategories } from '../data/screeningData'

function DueChecker({ title, intervalYears, startAge, endAge }) {
  const [age, setAge] = useState('')
  const [lastDate, setLastDate] = useState('')
  const [result, setResult] = useState(null)

  const calc = () => {
    if (!age || !lastDate) { setResult(null); return }
    const a = Number(age)
    if (a < startAge || a > endAge) {
      setResult({ msg: `Typically not screened outside ${startAge}–${endAge} years. Discuss with patient.`, due: false })
      return
    }
    const last = new Date(lastDate)
    const next = new Date(last)
    next.setFullYear(next.getFullYear() + intervalYears)
    const now = new Date()
    const overdue = now > next
    const monthsLeft = overdue ? 0 : Math.round((next - now) / (30.44 * 86400000))
    setResult({
      msg: overdue
        ? `🔴 Overdue — next ${title.toLowerCase()} was due ${monthsAgo(now, next)} months ago.`
        : `🟢 Next due in ${monthsLeft} month(s) (${next.toLocaleDateString('en-MY')}).`,
      due: overdue,
    })
  }

  const clear = () => { setAge(''); setLastDate(''); setResult(null) }

  return (
    <div className="screening-tool">
      <h3>{title}</h3>
      <p className="tool-desc">Enter age and last screening date to check when next is due.</p>
      <div className="due-inputs">
        <input type="number" placeholder="Age (years)" value={age} onChange={e => setAge(e.target.value)} min={0} max={120} />
        <input type="date" value={lastDate} onChange={e => setLastDate(e.target.value)} />
        <button className="btn btn-primary" onClick={calc}>Check</button>
        <button className="btn btn-secondary" onClick={clear}>Clear</button>
      </div>
      {result && <div className={`due-result ${result.due ? 'overdue' : ''}`}>{result.msg}</div>}
    </div>
  )
}

function monthsAgo(now, past) {
  return Math.round((now - past) / (30.44 * 86400000))
}

export default function Screening() {
  const [expanded, setExpanded] = useState(null)

  return (
    <div className="page">
      <h1>📋 Screening Guidelines</h1>
      <p className="page-subtitle">Malaysia CPG-based screening recommendations</p>

      <div className="screening-tools-row">
        <DueChecker title="Mammogram Due" intervalYears={2} startAge={40} endAge={74} />
        <DueChecker title="iFOBT / FIT Due" intervalYears={2} startAge={50} endAge={75} />
      </div>

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
