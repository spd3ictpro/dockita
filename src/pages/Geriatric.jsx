import { useState } from 'react'
import { clinicalFrailtyScale, barthelIndex } from '../data/geriatricData'
import { GeriatricIcon } from '../components/icons'

function CFSWidget() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="geriatric-card">
      <div className="geriatric-card-header">
        <GeriatricIcon size={22} className="geriatric-card-icon" />
        <div>
          <h3 className="geriatric-card-title">{clinicalFrailtyScale.title}</h3>
          <p className="geriatric-card-desc">{clinicalFrailtyScale.description}</p>
        </div>
      </div>

      <div className="cfs-spectrum">
        <div className="cfs-spectrum-labels">
          <span>Fit</span>
          <span>Frail</span>
        </div>
        <div className="cfs-grid">
          {clinicalFrailtyScale.levels.map(lvl => (
            <button
              key={lvl.score}
              className={`cfs-btn ${selected?.score === lvl.score ? 'selected' : ''}`}
              onClick={() => setSelected(selected?.score === lvl.score ? null : lvl)}
            >
              <span className="cfs-btn-score">{lvl.score}</span>
              <span className="cfs-btn-label">{lvl.label}</span>
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <div className="cfs-detail">
          <div className="cfs-detail-header">
            <span className="cfs-detail-score">Level {selected.score}</span>
            <span className="cfs-detail-label">{selected.label}</span>
          </div>
          <p className="cfs-detail-text">{selected.description}</p>
        </div>
      )}
    </div>
  )
}

const barthelScores = [
  { value: 0, label: 'Dependent' },
  { value: 5, label: 'Assisted' },
  { value: 10, label: 'Indep.' },
  { value: 15, label: 'Full' },
]

function BarthelWidget() {
  const [answers, setAnswers] = useState({})

  const answeredCount = Object.keys(answers).length
  const allAnswered = answeredCount === barthelIndex.items.length
  const total = barthelIndex.items.reduce((sum, item) => sum + (answers[item.key] ?? 0), 0)
  const cat = allAnswered ? barthelIndex.getCategory(total) : null

  const handleSelect = (key, value) => {
    setAnswers(prev => prev[key] === value
      ? Object.fromEntries(Object.entries(prev).filter(([k]) => k !== key))
      : { ...prev, [key]: value }
    )
  }

  return (
    <div className="geriatric-card">
      <div className="geriatric-card-header">
        <GeriatricIcon size={22} className="geriatric-card-icon" />
        <div>
          <h3 className="geriatric-card-title">{barthelIndex.title}</h3>
          <p className="geriatric-card-desc">{barthelIndex.description}</p>
        </div>
      </div>

      <div className="barthel-progress">
        <span className="barthel-progress-text">
          {answeredCount === 0
            ? 'Select a level for each activity'
            : `${answeredCount} of ${barthelIndex.items.length} scored`}
        </span>
        <div className="barthel-progress-bar">
          <div className="barthel-progress-fill" style={{ width: `${(answeredCount / barthelIndex.items.length) * 100}%` }} />
        </div>
      </div>

      <div className="barthel-grid">
        <div className="barthel-grid-header">
          <span className="barthel-col-num">#</span>
          <span className="barthel-col-question">Activity</span>
          {barthelScores.map(({ value, label }) => (
            <span key={value} className="barthel-col-score">
              <span className="barthel-col-score-label">{label}</span>
              <span className="barthel-col-score-num">{value}</span>
            </span>
          ))}
        </div>

        {barthelIndex.items.map((item, idx) => {
          const selected = answers[item.key]
          return (
            <div key={item.key} className={`barthel-row ${selected !== undefined ? 'barthel-row-answered' : ''}`}>
              <span className="barthel-row-num">{idx + 1}</span>
              <span className="barthel-row-question">{item.question}</span>
              {barthelScores.map(({ value }) => {
                const opt = item.options.find(o => o.value === value)
                return opt ? (
                  <label key={value} className="barthel-radio" title={opt.label}>
                    <input type="radio" name={item.key} value={value} checked={selected === value} onChange={() => handleSelect(item.key, opt.value)} />
                    <span className={`barthel-radio-btn ${selected === value ? 'selected' : ''}`}>{value}</span>
                  </label>
                ) : (
                  <span key={value} className="barthel-radio-empty" />
                )
              })}
              <span className="barthel-selected-label">
                {selected !== undefined
                  ? item.options.find(o => o.value === selected)?.label
                  : '\u00a0'}
              </span>
            </div>
          )
        })}
      </div>

      <div className="barthel-footer">
        <div className="barthel-total">
          <span className="barthel-total-label">Total</span>
          <span className="barthel-total-value">{answeredCount > 0 ? total : '\u2014'}</span>
          <span className="barthel-total-max">/ 100</span>
          {cat && (
            <span className="barthel-category" style={{ background: cat.color, color: cat.textColor }}>
              {cat.label}
            </span>
          )}
        </div>

        <div className="barthel-actions">
          <button className="barthel-btn" onClick={() => setAnswers({})}>
            <span className="material-symbols-outlined" style={{ fontSize: '0.9rem' }}>restart_alt</span>
            Clear
          </button>
        </div>
      </div>

      <div className="barthel-scale-ref">
        <span className="barthel-scale-item"><span className="barthel-scale-dot" style={{ background: 'var(--risk-high)' }} /> 0–20: Total</span>
        <span className="barthel-scale-item"><span className="barthel-scale-dot" style={{ background: '#ff922b' }} /> 21–60: Severe</span>
        <span className="barthel-scale-item"><span className="barthel-scale-dot" style={{ background: 'var(--risk-mod)' }} /> 61–90: Moderate</span>
        <span className="barthel-scale-item"><span className="barthel-scale-dot" style={{ background: 'var(--risk-low-mid)' }} /> 91–99: Mild</span>
        <span className="barthel-scale-item"><span className="barthel-scale-dot" style={{ background: 'var(--risk-low)' }} /> 100: Independent</span>
      </div>
    </div>
  )
}

export default function Geriatric() {
  return (
    <div className="page geriatric-page">
      <div className="geriatric-page-header">
        <h1><GeriatricIcon size={28} className="page-heading-icon" /> Geriatric Assessment Tools</h1>
        <p className="page-subtitle">Frailty and functional assessment for elderly patients</p>
      </div>
      <div className="geriatric-grid">
        <CFSWidget />
        <BarthelWidget />
      </div>
    </div>
  )
}