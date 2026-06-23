import { useState } from 'react'
import { framingham } from '../data/scoresData'

const ldlTargets = [
  { tier: 'low', risk: 'Low*', criteria: '<10% 10-year CVD risk', drugThreshold: 'Clinical judgement**', ldlTarget: '<3.0', nonHdlTarget: '<3.8' },
  { tier: 'moderate', risk: 'Intermediate (Moderate)*', criteria: <>10–20% 10-year CVD risk<br />Diabetics &lt;50 years old, &lt;10-year duration, no CV risk factors</>, drugThreshold: '>2.6**', ldlTarget: '<2.6', nonHdlTarget: '<3.4' },
  { tier: 'high', risk: 'High', criteria: <>&gt;20% 10-year CVD risk<br />Diabetes &gt;10-year duration without TOD + ≥1 CV risk factor<br />CKD with eGFR 30–&lt;60 ml/min/1.73m²</>, drugThreshold: '>1.8', ldlTarget: '≤1.8 and a reduction of >50% from baseline', nonHdlTarget: '≤2.6 and a reduction of >50% from baseline' },
  { tier: 'very-high', risk: 'Very High*', criteria: <>Established CVD<br />Diabetes with CVD/TOD or &gt;3 CV risk factors<br />CKD with eGFR &lt;30 ml/min/1.73m² ****</>, drugThreshold: '>1.4', ldlTarget: '≤1.4 and a reduction of >50% from baseline', nonHdlTarget: '≤2.2 and a reduction of >50% from baseline' },
  { tier: 'none', risk: '*** Recurrent CV events within 2 years', criteria: 'despite achieving LDL-C <1.4 mmol/L', drugThreshold: '—', ldlTarget: '<1.0', nonHdlTarget: '—' },
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
    drugs: ['Atorvastatin 10–20 mg', 'Rosuvastatin 5–10 mg', 'Simvastatin 20–40 mg', 'Pravastatin 40–80 mg'],
  },
  {
    intensity: 'Low-Intensity**',
    description: 'Daily dose lowers LDL-C on average, by < 30%',
    drugs: ['Simvastatin 10 mg', 'Pravastatin 10–20 mg'],
  },
]

const monitoringSteps = [
  { label: 'Baseline', desc: 'Lipid panel, ALT, and HbA1c before starting statin therapy.' },
  { label: '4 – 12 Weeks', desc: 'Repeat lipid panel to assess adherence and response to therapy.' },
  { label: 'Every 3 – 12 Months', desc: 'Periodic assessment of lipids based on clinical judgment and stability.' },
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

  const SegmentedGroup = ({ label, value, options, onChange }) => (
    <div className="framingham-field">
      <span className="field-label">{label}</span>
      <div className="segmented-control">
        {options.map(o => (
          <button key={o.value} className={`segmented-btn ${value === o.value ? 'active' : ''}`} onClick={() => onChange(o.value)} type="button">{o.label}</button>
        ))}
      </div>
    </div>
  )

  return (
    <div className="ref-card">
      <div className="ref-card-header">
        <span className="material-symbols-outlined">edit_note</span>
        <h2>Framingham 10-Year Risk Score</h2>
      </div>
      <div className="ref-card-body">
        <div className="framingham-grid">
          <div className="framingham-field">
            <span className="field-label">Age (Years)</span>
            <input type="number" value={vals.age} onChange={set('age')} min={20} max={100} placeholder="e.g. 45" />
          </div>
          <SegmentedGroup label="Gender" value={vals.gender} options={[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }]} onChange={v => setVals(s => ({ ...s, gender: v }))} />
          <div className="framingham-field">
            <span className="field-label">Total Cholesterol (mmol/L)</span>
            <input type="number" value={vals.cholesterol} onChange={set('cholesterol')} min={1} max={15} step={0.1} placeholder="e.g. 5.2" />
          </div>
          <div className="framingham-field">
            <span className="field-label">HDL Cholesterol (mmol/L)</span>
            <input type="number" value={vals.hdl} onChange={set('hdl')} min={0.1} max={5} step={0.1} placeholder="e.g. 1.1" />
          </div>
          <div className="framingham-field">
            <span className="field-label">Systolic BP (mmHg)</span>
            <input type="number" value={vals.sbp} onChange={set('sbp')} min={60} max={300} placeholder="e.g. 135" />
          </div>
          <SegmentedGroup label="On BP Medication" value={vals.treated} options={[{ value: '1', label: 'Yes' }, { value: '0', label: 'No' }]} onChange={v => setVals(s => ({ ...s, treated: v }))} />
          <SegmentedGroup label="Smoking Status" value={vals.smoker} options={[{ value: '1', label: 'Current Smoker' }, { value: '0', label: 'Non-Smoker' }]} onChange={v => setVals(s => ({ ...s, smoker: v }))} />
          <SegmentedGroup label="Diabetes" value={vals.diabetes} options={[{ value: '1', label: 'Yes' }, { value: '0', label: 'No' }]} onChange={v => setVals(s => ({ ...s, diabetes: v }))} />
        </div>

        <div className="framingham-actions">
          <button className="btn btn-primary" onClick={calc}>
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>analytics</span>
            Generate Risk Score
          </button>
          <button className="btn btn-secondary" onClick={clear}>Clear</button>
        </div>

        {result && (
          result.error ? (
            <p className="widget-note" style={{ color: 'var(--error)', fontStyle: 'normal', fontWeight: 600 }}>{result.error}</p>
          ) : (
            <div className="framingham-result-card">
              <div>
                <div className="framingham-result-label">10-Year CV Risk</div>
                <div className="framingham-result-value">{result.risk}%</div>
              </div>
              <span className="framingham-badge" style={{ background: result.color, color: result.textColor || '#fff' }}>
                {result.category}
              </span>
            </div>
          )
        )}

        {framingham.note && <p className="widget-note">{framingham.note}</p>}
      </div>
    </div>
  )
}

export default function Dyslipidemia() {
  return (
    <div className="page">
      <div className="dyslipid-header">
        <div>
          <h1><span className="material-symbols-outlined page-heading-icon">monitor_heart</span> Dyslipidaemia</h1>
          <p className="page-subtitle">Clinical reference for lipid management and risk stratification</p>
        </div>
      </div>

      <div className="dyslipid-body">
        <div className="dyslipid-bento">
          <div id="framingham-widget">
            <FraminghamWidget />
          </div>
          <div className="ref-card">
            <div className="ref-card-header">
              <span className="material-symbols-outlined">schedule</span>
              <h2>Monitoring Schedule</h2>
            </div>
            <div className="ref-card-body">
              <div className="monitoring-timeline">
                {monitoringSteps.map((step, i) => (
                  <div key={i} className="timeline-item">
                    <div className="timeline-dot" />
                    <div className="timeline-label">{step.label}</div>
                    <p className="timeline-desc">{step.desc}</p>
                  </div>
                ))}
              </div>
              <div className="monitoring-note">
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>info</span>
                Monitor ALT only if symptoms of hepatotoxicity occur.
              </div>
            </div>
          </div>
        </div>

        <div className="ref-card">
          <div className="ref-card-header">
            <span className="material-symbols-outlined">lab_profile</span>
            <h2>Target LDL-C Levels (mmol/L)</h2>
          </div>
          <div className="ref-card-body">
            <table className="dyslipid-table">
              <thead>
                <tr>
                  <th style={{ width: '30%' }}>Global Risk<div className="header-sub">(CV Risk)</div></th>
                  <th style={{ width: '22%', textAlign: 'center' }}>Initiate Drug Therapy (LDL-c)</th>
                  <th style={{ width: '24%', textAlign: 'center' }}>Target LDL-C</th>
                  <th style={{ width: '24%', textAlign: 'center' }}>Target Non-HDL-C</th>
                </tr>
              </thead>
              <tbody>
                {ldlTargets.map((t, i) => (
                  <tr key={i} data-tier={t.tier}>
                    <td>
                      <div className={`cell-population tier-${t.tier}`}>{t.risk}</div>
                      <div className="ldl-criteria">{t.criteria}</div>
                    </td>
                    <td style={{ textAlign: 'center', fontWeight: 600 }}>{t.drugThreshold}</td>
                    <td style={{ textAlign: 'center', fontWeight: 600 }}>{t.ldlTarget}</td>
                    <td style={{ textAlign: 'center', fontWeight: 600 }}>{t.nonHdlTarget}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="footnote-cards">
              {[
                { sym: '*', label: 'CV Risk Assessment', text: 'Low and Moderate CV risk is assessed using the FRS- General CVD Risk Score' },
                { sym: '**', label: 'Therapeutic Trial', text: 'After a therapeutic trial of 8–12 weeks of TLC and following discussion of the risk: benefit ratio of drug therapy with the patient.' },
                { sym: '***', label: 'Risk Factor Management', text: 'All other CV risk factors should be treated to target.' },
                { sym: '****', label: 'CKD & Dialysis',
                  content: (
                    <>
                      <p className="footnote-card-text">Lipid-lowering therapy reduces the risk of atherosclerotic CVD in CKD patients.</p>
                      <p className="footnote-card-text" style={{ marginTop: '6px' }}>Dialysis patients are at very high CV risk, but this stems from non-atherosclerotic CVD:</p>
                      <ul className="footnote-card-list">
                        <li>Medial calcific arteriosclerosis</li>
                        <li>LVH (left ventricular hypertrophy)</li>
                        <li>Coronary artery calcification</li>
                        <li>Arrhythmias, etc.</li>
                      </ul>
                      <p className="footnote-card-text" style={{ marginTop: '6px' }}>Thus, lipid-lowering therapy is not initiated in dialysis patients. However, if they have established CVD or were already on statins before becoming dialysis-dependent, treatment should be continued.</p>
                    </>
                  )
                },
              ].map((fn, i) => (
                <div key={i} className="footnote-card">
                  <div className="footnote-card-header">
                    <span className="footnote-card-sym">{fn.sym}</span>
                    <span className="footnote-card-label">{fn.label}</span>
                  </div>
                  {fn.content ? fn.content : <p className="footnote-card-text">{fn.text}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="ref-card">
          <div className="ref-card-header">
            <span className="material-symbols-outlined">pill</span>
            <h2>Recommended Doses of Statin Therapy</h2>
          </div>
          <div className="ref-card-body">
            <div className="statin-grid">
              {statinDoses.map((s, i) => (
                <div key={i} className={`statin-tier-card statin-tier-${i}`}>
                  <div className="statin-tier-header">
                    <div className="statin-tier-indicator" />
                    <div className="statin-tier-label">{s.intensity}</div>
                  </div>
                  <p className="statin-tier-desc">{s.description}</p>
                  <ul className="statin-drug-list">
                    {s.drugs.map((d, j) => (
                      <li key={j}>{d}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
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
