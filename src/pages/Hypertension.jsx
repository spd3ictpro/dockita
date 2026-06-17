import { useState } from 'react'
import { screeningCategories } from '../data/screeningData'
import { cvRiskHtn } from '../data/scoresData'
import { HeartIcon } from '../components/icons'

const htnScreening = screeningCategories.find(c => c.id === 'hypertension')

const bpClassification = [
  { category: 'Optimal', sbp: '<120', dbp: '<80', action: 'Reassess in 1–3 years' },
  { category: 'Normal', sbp: '120–129', dbp: '80–84', action: 'Reassess in 1 year' },
  { category: 'High Normal', sbp: '130–139', dbp: '85–89', action: 'Reassess in 6–12 months' },
  { category: 'Grade 1 Hypertension', sbp: '140–159', dbp: '90–99', action: 'Confirm with HBPM/ABPM; initiate management' },
  { category: 'Grade 2 Hypertension', sbp: '≥160', dbp: '≥100', action: 'Prompt pharmacological therapy' },
]

function CvRiskWidget() {
  const [vals, setVals] = useState({
    gender: 'male', age: '', sbp: '', dbp: '',
    smoking: '0', diabetes: '0', family_hx: '0', obesity: '0', dyslipidemia: '0',
  })
  const [result, setResult] = useState(null)

  const set = (k) => (e) => setVals(v => ({ ...v, [k]: e.target.value }))
  const calc = () => {
    const r = cvRiskHtn.calculate(vals)
    if (!r) { setResult({ error: 'Please fill in age and BP values.' }); return }
    const cat = cvRiskHtn.getCategory(r)
    setResult({ ...r, color: cat.color, label: cat.label })
  }
  const clear = () => {
    setVals({ gender: 'male', age: '', sbp: '', dbp: '', smoking: '0', diabetes: '0', family_hx: '0', obesity: '0', dyslipidemia: '0' })
    setResult(null)
  }

  return (
    <div className="score-widget">
      <h3><HeartIcon size={20} className="widget-heading-icon" /> {cvRiskHtn.title}</h3>
      <p className="widget-desc">{cvRiskHtn.description}</p>
      <div className="score-inputs">
        {cvRiskHtn.inputs.map(inp => (
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
        <button className="btn btn-primary" onClick={calc}>Assess Risk</button>
        <button className="btn btn-secondary" onClick={clear}>Clear</button>
      </div>
      {result && (
        result.error ? <div className="calc-result">{result.error}</div> : (
          <div className="calc-result" style={{ '--result-color': result.color }}>
            <div><strong>{result.label}</strong> — {result.riskCount} risk factor(s)</div>
            <div className="widget-sub">BP: {result.sbp}/{result.dbp} mmHg ({result.bpGrade})</div>
            <div className="widget-sub" style={{ marginTop: '8px' }}>{result.recommendation}</div>
          </div>
        )
      )}
    </div>
  )
}

export default function Hypertension() {
  return (
    <div className="page page--narrow">
      <h1><HeartIcon size={28} className="page-heading-icon" /> Hypertension</h1>
      <p className="page-subtitle">Hypertension screening, BP classification, and CV risk-guided management</p>

      <div className="screening-list">
        <div className="screening-card expanded">
          <div className="screening-card-header">
            <div className="screening-card-header-left">
              <HeartIcon size={24} className="screening-card-icon" style={{ color: '#fa5252' }} />
              <div>
                <h3>{htnScreening.title}</h3>
                <span className="screening-source">{htnScreening.source}</span>
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
                {htnScreening.guidelines.map((g, i) => (
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

        <div className="screening-card expanded">
          <div className="screening-card-header">
            <div className="screening-card-header-left">
              <HeartIcon size={24} className="screening-card-icon" style={{ color: '#fa5252' }} />
              <div>
                <h3>Blood Pressure Classification</h3>
                <span className="screening-source">Malaysia CPG: Management of Hypertension 2023</span>
              </div>
            </div>
          </div>
          <div className="screening-card-body visible">
            <table className="screening-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>SBP (mmHg)</th>
                  <th>DBP (mmHg)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bpClassification.map((b, i) => (
                  <tr key={i}>
                    <td className="cell-population">{b.category}</td>
                    <td>{b.sbp}</td>
                    <td>{b.dbp}</td>
                    <td className="note-cell">{b.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="section-label">CV Risk Assessment Tool</div>
        <CvRiskWidget />
      </div>
    </div>
  )
}
