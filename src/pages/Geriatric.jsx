import { useState } from 'react'
import { clinicalFrailtyScale } from '../data/geriatricData'
import { GeriatricIcon, ActiveIcon, StandingIcon, CaneIcon, SeatedIcon, EndIcon } from '../components/icons'

function CFSWidget() {
  const [selected, setSelected] = useState(null)

  const tierIcons = [ActiveIcon, ActiveIcon, StandingIcon, StandingIcon, CaneIcon, CaneIcon, SeatedIcon, SeatedIcon, EndIcon]

  return (
    <div className="score-widget">
      <h3><GeriatricIcon size={20} className="widget-heading-icon" /> {clinicalFrailtyScale.title}</h3>
      <p className="widget-desc">{clinicalFrailtyScale.description}<br />Click a level for details.</p>
      <div className="cfs-grid">
        {clinicalFrailtyScale.levels.map(lvl => {
          const Icon = tierIcons[lvl.score - 1]
          const tier = Math.min(Math.ceil(lvl.score / 2), 5)
          return (
            <button
              key={lvl.score}
              className={`cfs-level ${selected?.score === lvl.score ? 'selected' : ''}`}
              data-tier={tier}
              onClick={() => setSelected(lvl)}
            >
              <span className="cfs-icon"><Icon size={20} /></span>
              <span className="cfs-score">{lvl.score}</span>
              <span className="cfs-label">{lvl.label}</span>
            </button>
          )
        })}
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

export default function Geriatric() {
  return (
    <div className="page">
      <h1><GeriatricIcon size={28} className="page-heading-icon" /> Geriatric Assessment Tools</h1>
      <p className="page-subtitle">Frailty assessment for elderly patients</p>
      <div className="scores-grid">
        <CFSWidget />
      </div>
    </div>
  )
}
