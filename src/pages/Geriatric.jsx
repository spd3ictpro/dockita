import { useState } from 'react'
import { clinicalFrailtyScale, morseFallScale } from '../data/geriatricData'

function CFSWidget() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="score-widget">
      <h3>👴 {clinicalFrailtyScale.title}</h3>
      <p className="widget-desc">{clinicalFrailtyScale.description}<br />Click a level for details.</p>
      <div className="cfs-grid">
        {clinicalFrailtyScale.levels.map(lvl => (
          <button
            key={lvl.score}
            className={`cfs-level ${selected?.score === lvl.score ? 'selected' : ''}`}
            onClick={() => setSelected(lvl)}
          >
            <span className="cfs-score">{lvl.score}</span>
            <span className="cfs-label">{lvl.label}</span>
          </button>
        ))}
      </div>
      {selected && (
        <div className="calc-result cfs-detail">
          <strong>Level {selected.score}: {selected.label}</strong>
          <p>{selected.description}</p>
        </div>
      )}
    </div>
  )
}

function MorseWidget() {
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)

  const setAns = (key) => (e) => setAnswers(a => ({ ...a, [key]: Number(e.target.value) }))
  const calc = () => {
    const total = morseFallScale.items.reduce((sum, item) => sum + (answers[item.key] || 0), 0)
    setResult({ total, ...morseFallScale.getCategory(total) })
  }
  const clear = () => { setAnswers({}); setResult(null) }

  return (
    <div className="score-widget">
      <h3>🦯 {morseFallScale.title}</h3>
      <p className="widget-desc">{morseFallScale.description}</p>
      {morseFallScale.items.map(item => (
        <div key={item.key} className="question-row compact">
          <label>{item.question}</label>
          <div className="question-options">
            {item.options.map(opt => (
              <button
                key={opt.value}
                className={`q-opt ${answers[item.key] === opt.value ? 'selected' : ''}`}
                onClick={() => setAns(item.key)({ target: { value: opt.value } })}
              >
                {opt.label} {opt.value > 0 && `(+${opt.value})`}
              </button>
            ))}
          </div>
        </div>
      ))}
      <div className="calc-actions">
        <button className="btn btn-primary" onClick={calc}>Calculate</button>
        <button className="btn btn-secondary" onClick={clear}>Clear</button>
      </div>
      {result && (
        <div className="calc-result" style={{ backgroundColor: result.color }}>
          Score: <strong>{result.total}</strong> — {result.label}
        </div>
      )}
    </div>
  )
}

export default function Geriatric() {
  return (
    <div className="page">
      <h1>👴 Geriatric Assessment Tools</h1>
      <p className="page-subtitle">Frailty and fall risk assessment for elderly patients</p>
      <div className="scores-grid">
        <CFSWidget />
        <MorseWidget />
      </div>
    </div>
  )
}
