import { useState } from 'react'
import { screeningCategories } from '../data/screeningData'
import { framingham } from '../data/scoresData'
import { ChartBarIcon, HeartIcon } from '../components/icons'

const dyslipidemiaScreening = screeningCategories.find(c => c.id === 'dyslipidaemia')

const lipidClassification = [
  { lipid: 'Total Cholesterol (TC)', optimal: '<5.2 mmol/L', borderline: '5.2–6.2 mmol/L', high: '>6.2 mmol/L' },
  { lipid: 'LDL Cholesterol', optimal: '<2.6 mmol/L', borderline: '2.6–4.1 mmol/L', high: '>4.1 mmol/L' },
  { lipid: 'HDL Cholesterol (Male)', optimal: '≥1.0 mmol/L', borderline: '—', high: '<1.0 mmol/L (low)' },
  { lipid: 'HDL Cholesterol (Female)', optimal: '≥1.3 mmol/L', borderline: '—', high: '<1.3 mmol/L (low)' },
  { lipid: 'Triglycerides (TG)', optimal: '<1.7 mmol/L', borderline: '1.7–2.2 mmol/L', high: '>2.2 mmol/L' },
]

const treatmentTargets = [
  { risk: 'Low risk (0–1 risk factor, no CVD/DM/CKD)', ldl: '<3.4 mmol/L', tc: '<5.2 mmol/L', nonHdl: '<3.4 mmol/L' },
  { risk: 'Moderate risk (≥2 risk factors, no CVD/DM/CKD)', ldl: '<2.6 mmol/L', tc: '<4.1 mmol/L', nonHdl: '<3.4 mmol/L' },
  { risk: 'High risk (DM, CKD, FH, or ASCVD equivalent)', ldl: '<1.8 mmol/L', tc: '<3.1 mmol/L', nonHdl: '<2.6 mmol/L' },
  { risk: 'Very high risk (ASCVD, recent ACS, PAD, prior stroke)', ldl: '<1.4 mmol/L', tc: '<2.6 mmol/L', nonHdl: '<2.1 mmol/L' },
]

function FraminghamWidget() {
  const [vals, setVals] = useState({ gender: 'male', age: '', cholesterol: '', hdl: '', sbp: '', treated: '0', smoker: '0', diabetes: '0' })
  const [result, setResult] = useState(null)

  const set = (k) => (e) => setVals(v => ({ ...v, [k]: e.target.value }))
  const calc = () => {
    const r = framingham.calculate(vals)
    if (!r) { setResult({ error: 'Please fill in all fields with valid values.' }); return }
    const interpretation = framingham.interpret(r.risk)
    setResult({ points: r.points, risk: r.risk, ...interpretation })
  }
  const clear = () => { setVals({ gender: 'male', age: '', cholesterol: '', hdl: '', sbp: '', treated: '0', smoker: '0', diabetes: '0' }); setResult(null) }

  return (
    <div className="screening-card expanded" style={{ '--card-accent': '#ff922b' }}>
      <div className="screening-card-header" style={{ cursor: 'default' }}>
        <div className="screening-card-header-left">
          <HeartIcon size={24} className="screening-card-icon" style={{ color: '#ff922b' }} />
          <div>
            <h3>{framingham.title}</h3>
            <span className="screening-source">{framingham.description}</span>
          </div>
        </div>
      </div>
      <div className="screening-card-body visible">
        <div className="score-inputs">
          {framingham.inputs.map(inp => (
            inp.type === 'select' ? (
              <select key={inp.key} value={vals[inp.key]} onChange={set(inp.key)}>
                {inp.options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            ) : (
              <input key={inp.key} type="number" placeholder={inp.label} value={vals[inp.key]} onChange={set(inp.key)} min={inp.min} max={inp.max} step={inp.step || 1} />
            )
          ))}
        </div>
        <div className="calc-actions">
          <button className="btn btn-primary" onClick={calc}>Calculate Risk</button>
          <button className="btn btn-secondary" onClick={clear}>Clear</button>
        </div>
        {result && (
          result.error ? <div className="calc-result">{result.error}</div> : (
            <div className="calc-result" style={{ '--result-color': result.color }}>
              10-Year Risk: <strong>{result.risk}%</strong> ({result.category})
              {result.points !== undefined && <div className="widget-sub">Points: {result.points}</div>}
            </div>
          )
        )}
        <p className="widget-note" style={{ marginTop: '12px' }}>{framingham.note}</p>
      </div>
    </div>
  )
}

export default function Dyslipidemia() {
  return (
    <div className="page">
      <h1><ChartBarIcon size={28} className="page-heading-icon" /> Dyslipidaemia</h1>
      <p className="page-subtitle">Lipid classification, treatment targets, and CV risk assessment</p>

      <div className="screening-list">
        <FraminghamWidget />
        <div className="screening-card expanded">
          <div className="screening-card-header">
            <div className="screening-card-header-left">
              <ChartBarIcon size={24} className="screening-card-icon" style={{ color: '#ff922b' }} />
              <div>
                <h3>Lipid Classification</h3>
                <span className="screening-source">Malaysia CPG: Management of Dyslipidaemia 2022</span>
              </div>
            </div>
          </div>
          <div className="screening-card-body visible">
            <table className="screening-table">
              <thead>
                <tr>
                  <th>Lipid</th>
                  <th>Optimal</th>
                  <th>Borderline</th>
                  <th>High</th>
                </tr>
              </thead>
              <tbody>
                {lipidClassification.map((l, i) => (
                  <tr key={i}>
                    <td className="cell-population">{l.lipid}</td>
                    <td>{l.optimal}</td>
                    <td>{l.borderline}</td>
                    <td>{l.high}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="screening-card expanded">
          <div className="screening-card-header">
            <div className="screening-card-header-left">
              <ChartBarIcon size={24} className="screening-card-icon" style={{ color: '#ff922b' }} />
              <div>
                <h3>Lipid Treatment Targets by CV Risk</h3>
                <span className="screening-source">Malaysia CPG: Management of Dyslipidaemia 2022</span>
              </div>
            </div>
          </div>
          <div className="screening-card-body visible">
            <table className="screening-table">
              <thead>
                <tr>
                  <th>Risk Category</th>
                  <th>LDL-C Target</th>
                  <th>TC Target</th>
                  <th>Non-HDL-C Target</th>
                </tr>
              </thead>
              <tbody>
                {treatmentTargets.map((t, i) => (
                  <tr key={i}>
                    <td className="cell-population">{t.risk}</td>
                    <td>{t.ldl}</td>
                    <td>{t.tc}</td>
                    <td>{t.nonHdl}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="widget-note" style={{ marginTop: '12px' }}>
              Non-HDL-C = TC − HDL-C. Consider statin as first-line therapy. Targets should be individualised.
            </p>
          </div>
        </div>

        <div className="screening-card expanded">
          <div className="screening-card-header">
            <div className="screening-card-header-left">
              <ChartBarIcon size={24} className="screening-card-icon" style={{ color: '#ff922b' }} />
              <div>
                <h3>{dyslipidemiaScreening.title}</h3>
                <span className="screening-source">{dyslipidemiaScreening.source}</span>
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
                {dyslipidemiaScreening.guidelines.map((g, i) => (
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
