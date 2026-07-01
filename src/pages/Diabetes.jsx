import { useNavigate } from 'react-router-dom'

const venousPlasmaGlucose = [
  { type: 'Fasting', value: '≥7.0 mmol/L' },
  { type: 'Random', value: '≥11.1 mmol/L' },
]

const ogtt = [
  { category: 'Normal', hr0: '<6.1', hr2: '<7.8' },
  { category: 'IFG', hr0: '6.1–6.9', hr2: '—' },
  { category: 'IGT', hr0: '—', hr2: '7.8–11.0' },
  { category: 'T2DM', hr0: '≥7.0', hr2: '≥11.1' },
]

const hba1cDiagnostic = [
  { category: 'Normal', value: '<5.7% (<39 mmol/mol)' },
  { category: 'Prediabetes', value: '5.7% – <6.3% (39–44 mmol/mol)' },
  { category: 'T2DM', value: '≥6.3% (≥45 mmol/mol)' },
]

const glycemicTargets = [
  { group: 'Most adults', hba1c: '<6.5–7.0%', fpg: '4.4–6.1 mmol/L', ppg: '6.0–8.0 mmol/L' },
  { group: 'Elderly / Frail', hba1c: '<7.5–8.0%', fpg: '5.0–8.3 mmol/L', ppg: '6.0–10.0 mmol/L' },
  { group: 'Pregnancy (pregestational DM)', hba1c: '<6.0%', fpg: '3.5–5.3 mmol/L', ppg: '<7.8 mmol/L' },
]

const monitoringSteps = [
  { label: 'Every 3 Months', desc: 'HbA1c assessment for patients not meeting targets or undergoing therapy adjustment.' },
  { label: 'Every 6 Months', desc: 'HbA1c assessment for patients who are stable and meeting targets.' },
  { label: 'Annual', desc: 'Comprehensive foot examination, dilated eye exam, renal function (eGFR + uACR), and lipid profile.' },
  { label: 'Every Visit', desc: 'Blood pressure monitoring and review of self-monitoring blood glucose (SMBG) log.' },
]

export default function Diabetes() {
  const navigate = useNavigate()
  return (
    <div className="page diabetes-page">
      <div className="dyslipid-header">
        <div>
          <h1><span className="material-symbols-outlined page-heading-icon">monitoring</span> Diabetes Mellitus</h1>
          <p className="page-subtitle">
            Type 2 diabetes screening, diagnostic criteria, and glycemic targets<br />
            <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>Adapted from CPG Management of T2DM 2021 (6th Edition)</span>
          </p>
        </div>
      </div>

      <div className="diabetes-body">
        <div className="ref-card" style={{ cursor: 'pointer' }} onClick={() => navigate('/screening?focus=diabetes-mellitus')}>
          <div className="ref-card-header">
            <span className="material-symbols-outlined">search</span>
            <h2>Type 2 Diabetes Screening</h2>
            <span className="material-symbols-outlined" style={{ marginLeft: 'auto', fontSize: '1.1rem', color: 'var(--primary)' }}>open_in_new</span>
          </div>
          <div className="ref-card-body" style={{ paddingBlock: '1.5rem' }}>
            <p style={{ color: 'var(--on-surface-variant)', margin: 0, fontSize: '0.9rem' }}>
              View the full CPG-based screening recommendations for Type 2 Diabetes Mellitus.
            </p>
          </div>
        </div>

        <div className="dyslipid-bento">
          <div className="ref-card">
            <div className="ref-card-header">
              <span className="material-symbols-outlined">lab_profile</span>
              <h2>Diagnostic Criteria</h2>
            </div>
            <div className="ref-card-body">
              <h4 className="section-label">Venous Plasma Glucose</h4>
              <table className="dyslipid-table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Diagnostic Value</th>
                  </tr>
                </thead>
                <tbody>
                  {venousPlasmaGlucose.map((d, i) => (
                    <tr key={i}>
                      <td className="cell-population">{d.type}</td>
                      <td>{d.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="widget-note">
                In symptomatic individuals, one abnormal glucose value is diagnostic. In asymptomatic individuals, 2 abnormal test results (plasma glucose and HbA1c) from the same sample or from 2 separate test samples are required for diagnosis.
              </p>

              <h4 className="section-label" style={{ marginTop: '20px' }}>HbA1c</h4>
              <table className="dyslipid-table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>HbA1c</th>
                  </tr>
                </thead>
                <tbody>
                  {hba1cDiagnostic.map((h, i) => (
                    <tr key={i}>
                      <td className="cell-population">{h.category}</td>
                      <td>{h.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="widget-note">
                A repeat HbA1c should be done 4 weeks after the first positive test for asymptomatic patients (if an accompanying FPG or RPG is indeterminate). For symptomatic patients, a single positive test is sufficient.
              </p>
            </div>
          </div>

          <div className="ref-card">
            <div className="ref-card-header">
              <span className="material-symbols-outlined">science</span>
              <h2>OGTT (75 g glucose load)</h2>
            </div>
            <div className="ref-card-body">
              <table className="dyslipid-table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>0-hour (mmol/L)</th>
                    <th>2-hour (mmol/L)</th>
                  </tr>
                </thead>
                <tbody>
                  {ogtt.map((o, i) => (
                    <tr key={i}>
                      <td className="cell-population">{o.category}</td>
                      <td>{o.hr0}</td>
                      <td>{o.hr2}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="widget-note">
                In adolescents, the glucose load in OGTT is based on body weight (1.75 g/kg body weight, maximum of 75 g).
              </p>
            </div>
          </div>
        </div>

        <div className="ref-card">
          <div className="ref-card-header">
            <span className="material-symbols-outlined">track_changes</span>
            <h2>Glycaemic Control Targets</h2>
          </div>
          <div className="ref-card-body">
            <table className="dyslipid-table">
              <thead>
                <tr>
                  <th style={{ width: '30%' }}>Population</th>
                  <th style={{ textAlign: 'center' }}>HbA1c</th>
                  <th style={{ textAlign: 'center' }}>Fasting Glucose</th>
                  <th style={{ textAlign: 'center' }}>Postprandial Glucose</th>
                </tr>
              </thead>
              <tbody>
                {glycemicTargets.map((t, i) => (
                  <tr key={i}>
                    <td><div className="cell-population">{t.group}</div></td>
                    <td style={{ textAlign: 'center', fontWeight: 600 }}>{t.hba1c}</td>
                    <td style={{ textAlign: 'center', fontWeight: 600 }}>{t.fpg}</td>
                    <td style={{ textAlign: 'center', fontWeight: 600 }}>{t.ppg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="widget-note">
              Targets should be individualised based on age, comorbidities, hypoglycaemia risk, and patient preference.
            </p>
          </div>
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
          </div>
        </div>
      </div>
    </div>
  )
}
