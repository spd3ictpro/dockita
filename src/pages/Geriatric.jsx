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

      <div className={`adl-layout ${allAnswered ? 'adl-layout-complete' : ''}`}>
        <div className="adl-items">
          <div className="adl-progress">
            <div className="adl-progress-text">{answeredCount} of {barthelIndex.items.length} activities scored</div>
            <div className="adl-progress-bar">
              <div className="adl-progress-fill" style={{ width: `${(answeredCount / barthelIndex.items.length) * 100}%` }} />
            </div>
          </div>

          {barthelIndex.items.map((item, idx) => (
            <div key={item.key} className={`adl-item ${answers[item.key] !== undefined ? 'adl-item-done' : ''}`}>
              <div className="adl-item-header">
                <span className="adl-item-num">{idx + 1}</span>
                <span className="adl-item-question">{item.question}</span>
              </div>
              <div className="adl-options">
                {item.options.map(opt => (
                  <button
                    key={opt.value}
                    className={`adl-opt ${answers[item.key] === opt.value ? 'selected' : ''}`}
                    onClick={() => handleSelect(item.key, opt.value)}
                  >
                    <span className={`adl-opt-dot ${answers[item.key] === opt.value ? 'filled' : ''}`} />
                    <span className="adl-opt-score">{opt.value}</span>
                    <span className="adl-opt-label">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="adl-result-panel">
          <div className="adl-result-sticky">
            <div className="adl-result-header">Total Score</div>
            <div className={`adl-result-score ${cat ? `adl-result-score-${cat.label.split(' ')[0].toLowerCase()}` : ''}`}>
              <span className="adl-result-value">{answeredCount > 0 ? total : '\u2014'}</span>
              <span className="adl-result-max">/ 100</span>
            </div>
            {allAnswered && cat ? (
              <div className="adl-result-chip" style={{ background: cat.color, color: total > 80 ? '#1e293b' : '#fff' }}>
                {cat.label}
              </div>
            ) : (
              <div className="adl-result-prompt">
                {answeredCount === 0
                  ? 'Select a level of independence for each activity'
                  : `${barthelIndex.items.length - answeredCount} activities remaining`}
              </div>
            )}

            <button className="adl-reset-btn" onClick={() => setAnswers({})}>
              <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>restart_alt</span>
              Clear All
            </button>

            <div className="adl-scale-ref">
              <div className="adl-scale-ref-header">Scale</div>
              <div className="adl-scale-ref-item">
                <span className="adl-scale-dot" style={{ background: 'var(--risk-high)' }} />
                0–20: Total dependency
              </div>
              <div className="adl-scale-ref-item">
                <span className="adl-scale-dot" style={{ background: '#ff922b' }} />
                21–60: Severe dependency
              </div>
              <div className="adl-scale-ref-item">
                <span className="adl-scale-dot" style={{ background: 'var(--risk-mod)' }} />
                61–90: Moderate dependency
              </div>
              <div className="adl-scale-ref-item">
                <span className="adl-scale-dot" style={{ background: 'var(--risk-low-mid)' }} />
                91–99: Mild dependency
              </div>
              <div className="adl-scale-ref-item">
                <span className="adl-scale-dot" style={{ background: 'var(--risk-low)' }} />
                100: Independent
              </div>
            </div>
          </div>
        </div>
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