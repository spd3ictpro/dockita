import { useState } from 'react'
import { framingham } from '../data/scoresData'
import { ChartBarIcon, HeartIcon } from '../components/icons'

const ldlTargets = [
  {
    risk: 'Low CV Risk*',
    criteria: '<10% 10-year CVD risk',
    drugThreshold: 'Clinical judgement**',
    ldlTarget: '<3.0',
    nonHdlTarget: '<3.8',
  },
  {
    risk: 'Intermediate (Moderate) CV Risk*',
    criteria: (
      <>
        10–20% 10-year CVD risk<br />
        Diabetics &lt;50 years old, &lt;10-year duration, no CV risk factors
      </>
    ),
    drugThreshold: '>2.6**',
    ldlTarget: '<2.6',
    nonHdlTarget: '<3.4',
  },
  {
    risk: 'High CV Risk',
    criteria: (
      <>
        &gt;20% 10-year CVD risk<br />
        Diabetes &gt;10-year duration without TOD + ≥1 CV risk factor<br />
        CKD with eGFR 30–&lt;60 ml/min/1.73m²
      </>
    ),
    drugThreshold: '>1.8',
    ldlTarget: '≤1.8 and a reduction of >50% from baseline',
    nonHdlTarget: '≤2.6 and a reduction of >50% from baseline',
  },
  {
    risk: 'Very High CV Risk*',
    criteria: (
      <>
        Established CVD<br />
        Diabetes with CVD/TOD or &gt;3 CV risk factors<br />
        CKD with eGFR &lt;30 ml/min/1.73m² ****
      </>
    ),
    drugThreshold: '>1.4',
    ldlTarget: '≤1.4 and a reduction of >50% from baseline',
    nonHdlTarget: '≤2.2 and a reduction of >50% from baseline',
  },
  {
    risk: '*** Recurrent CV events within 2 years',
    criteria: 'despite achieving LDL-C <1.4 mmol/L',
    drugThreshold: '—',
    ldlTarget: '<1.0',
    nonHdlTarget: '—',
  },
]

const statinDoses = [
  {
    intensity: 'High-Intensity*',
    description: 'Daily dose lowers LDL-C on average, by approximately ≥ 50%',
    drugs: ['Atorvastatin 40–80 mg', 'Rosuvastatin 20–40 mg'],
  },
  {
    intensity: 'Moderate-Intensity',
    description: 'Daily dose lowers LDL-C on average, by approximately 30% – < 50%',
    drugs: ['Atorvastatin 10–20 mg', 'Rosuvastatin 5–10 mg', 'Simvastatin 20–40 mg', 'Pravastatin 40–80 mg', 'Lovastatin 40 mg', 'Fluvastatin 40 mg bid', 'Pitavastatin 2–4 mg'],
  },
  {
    intensity: 'Low-Intensity**',
    description: 'Daily dose lowers LDL-C on average, by < 30%',
    drugs: ['Simvastatin 10 mg', 'Pravastatin 10–20 mg', 'Lovastatin 20 mg', 'Fluvastatin 20–40 mg', 'Pitavastatin 1 mg'],
  },
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
        {framingham.note && (
          <p className="widget-note" style={{ marginTop: '12px' }}>{framingham.note}</p>
        )}
      </div>
    </div>
  )
}

export default function Dyslipidemia() {
  return (
    <div className="page page--narrow">
      <h1><ChartBarIcon size={28} className="page-heading-icon" /> Dyslipidaemia</h1>
      <p className="page-subtitle">Lipid classification, treatment targets, and CV risk assessment</p>

      <div className="screening-list">
        <FraminghamWidget />
        <div className="screening-card expanded">
          <div className="screening-card-header">
            <div className="screening-card-header-left">
              <ChartBarIcon size={24} className="screening-card-icon" style={{ color: '#ff922b' }} />
              <div>
                <h3>Target LDL-C Levels</h3>
                <span className="screening-source">Malaysia CPG: Management of Dyslipidaemia 2023 (6th edition)</span>
              </div>
            </div>
          </div>
          <div className="screening-card-body visible">
            <table className="screening-table" style={{ tableLayout: 'fixed' }}>
              <thead>
                <tr>
                  <th style={{ width: '30%' }}>Global Risk</th>
                  <th style={{ width: '22%', textAlign: 'center' }}>Initiate Drug Therapy (LDL-C, mmol/L)</th>
                  <th style={{ width: '24%', textAlign: 'center' }}>Target LDL-C (mmol/L)</th>
                  <th style={{ width: '24%', textAlign: 'center' }}>Target Non-HDL-C (mmol/L)</th>
                </tr>
              </thead>
              <tbody>
                {ldlTargets.map((t, i) => (
                  <tr key={i}>
                    <td>
                      <div className="cell-population">{t.risk}</div>
                      <div className="ldl-criteria">{t.criteria}</div>
                    </td>
                    <td style={{ textAlign: 'center', fontWeight: 600 }}>{t.drugThreshold}</td>
                    <td style={{ textAlign: 'center', fontWeight: 600 }}>{t.ldlTarget}</td>
                    <td style={{ textAlign: 'center', fontWeight: 600 }}>{t.nonHdlTarget}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="widget-note" style={{ marginTop: '12px' }}>
              * Low and Moderate CV risk is assessed using the FRS- General CVD Risk Score<br />
              ** After a therapeutic trial of 8–12 weeks of TLC and following discussion of the risk: benefit ratio of drug therapy with the patient.<br />
              *** All other CV risk factors should be treated to target.<br />
              **** Lipid lowering therapy lowers the risk of atherosclerotic CVD in CKD patients. Those who are on dialysis are at very high CV risk, but it is for non-atherosclerotic CVD e.g. due to medial calcific arteriosclerosis, LVH, coronary artery calcification, arrhythmias etc. Thus, lipid lowering therapy is not initiated in patients on dialysis but if they have CVD or are already on statins before becoming dialysis dependent, then it should be continued.
            </p>
          </div>
        </div>

        <div className="screening-card expanded">
          <div className="screening-card-header">
            <div className="screening-card-header-left">
              <ChartBarIcon size={24} className="screening-card-icon" style={{ color: '#ff922b' }} />
              <div>
                <h3>Recommended Doses of Statin Therapy</h3>
                <span className="screening-source">Malaysia CPG: Management of Dyslipidaemia 2023 (6th edition)</span>
              </div>
            </div>
          </div>
          <div className="screening-card-body visible">
            <table className="screening-table statin-table">
              <thead>
                <tr>
                  {statinDoses.map((s, i) => (
                    <th key={i} style={{ textAlign: 'center' }}>{s.intensity}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {statinDoses.map((s, i) => (
                    <td key={i} style={{ verticalAlign: 'top', textAlign: 'center' }}>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>{s.description}</div>
                      <ul className="statin-drug-list">
                        {s.drugs.map((d, j) => (
                          <li key={j}>{d}</li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
            <p className="widget-note" style={{ marginTop: '12px' }}>
              * High-intensity statin therapy is recommended for all patients with established CVD, very high CV risk, and high CV risk.<br />
              ** Low-intensity statin therapy may be considered in patients who cannot tolerate higher doses.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
