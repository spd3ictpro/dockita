const htnScreening = {
  title: 'Hypertension Screening',
  condition: 'Hypertension',
  guidelines: [
    { age: '≥18', test: 'BP measurement at every visit', note: 'More frequently for those at risk (family history, obese and those at-risk of high blood pressure)' },
    { age: 'Elevated BP', test: 'Confirm with HBPM or ABPM', note: 'HBPM = home BP monitoring × 7 days' },
  ],
  source: 'Malaysia CPG: Management of Hypertension 2023',
}

const bpClassification = [
  { category: 'Optimal', sbp: '<120', dbp: '<80', prevalence: '30.7' },
  { category: 'Normal', sbp: '120–129', dbp: '80–84', prevalence: '25.3' },
  { category: 'At Risk', sbp: '130–139', dbp: '85–89', prevalence: '18.6' },
  { category: 'Hypertension', sbp: '', dbp: '', prevalence: '' },
  { category: 'Stage 1 (Mild)', sbp: '140–159', dbp: '90–99', prevalence: '17.3' },
  { category: 'Stage 2 (Moderate)', sbp: '160–179', dbp: '100–109', prevalence: '5.7' },
  { category: 'Stage 3 (Severe)', sbp: '≥180', dbp: '≥110', prevalence: '2.4' },
  { category: 'Isolated Systolic Hypertension', sbp: '≥140', dbp: '<90', prevalence: '11.2' },
]

const stagingCriteria = [
  { category: 'Stage I Hypertension', clinic: '≥140/90', homeAbpm: '≥135/85' },
  { category: 'Stage II Hypertension', clinic: '≥160/100', homeAbpm: '≥150/95' },
  { category: 'Severe Hypertension', clinic: 'SBP ≥180 or DBP ≥110', homeAbpm: '—' },
]

const monitoringSteps = [
  { label: 'Every Visit', desc: 'BP measurement and review of home BP log.' },
  { label: 'Every 3–6 Months', desc: 'Monitor BP control, medication adherence, and side effects.' },
  { label: 'Annual', desc: 'Full lipid profile, HbA1c, renal function (eGFR + uACR), and ECG.' },
  { label: 'Every 2 Years', desc: 'CV risk reassessment using FRS if no new risk factors.' },
]

export default function Hypertension() {
  return (
    <div className="page htn-page">
      <div className="dyslipid-header">
        <div>
          <h1><span className="material-symbols-outlined page-heading-icon">monitor_heart</span> Hypertension</h1>
          <p className="page-subtitle">
            Hypertension screening, BP classification, and management<br />
            <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>Adapted from CPG Management of Hypertension 2023 (5th Edition)</span>
          </p>
        </div>
      </div>

      <div className="htn-body">
        <div className="ref-card">
          <div className="ref-card-header">
            <span className="material-symbols-outlined">search</span>
            <h2>{htnScreening.title}</h2>
          </div>
          <div className="ref-card-body">
            <table className="dyslipid-table">
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
                    <td>{g.test}</td>
                    <td style={{ fontSize: '0.82rem', color: 'var(--on-surface-variant)' }}>{g.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="ref-card">
          <div className="ref-card-header">
            <span className="material-symbols-outlined">speed</span>
            <h2>Blood Pressure Classification</h2>
          </div>
          <div className="ref-card-body">
            <table className="dyslipid-table htn-class-table">
              <thead>
                <tr>
                  <th style={{ width: '30%' }}>Classification*</th>
                  <th style={{ textAlign: 'center' }}>Systolic (mmHg)</th>
                  <th style={{ textAlign: 'center' }}>Diastolic (mmHg)</th>
                  <th>Prevalence in Malaysia</th>
                </tr>
              </thead>
              <tbody>
                {bpClassification.map((b, i) => (
                  <tr key={i} className={b.sbp === '' ? 'htn-section-label' : ''}>
                    <td><div className="cell-population">{b.category}</div></td>
                    <td style={{ textAlign: 'center', fontWeight: 600 }}>{b.sbp}</td>
                    <td style={{ textAlign: 'center', fontWeight: 600 }}>{b.dbp}</td>
                    <td style={{ textAlign: 'center', fontWeight: 600 }}>{b.prevalence}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="widget-note" style={{ marginTop: '12px' }}>
              Home and Ambulatory BP may be used to diagnose and classify elevated blood pressure (Table 1-B).
            </p>
          </div>
        </div>

        <div className="ref-card">
          <div className="ref-card-header">
            <span className="material-symbols-outlined">monitor</span>
            <h2>Criteria for Staging Hypertension Based on Clinic, Home and Ambulatory Blood Pressure Monitoring</h2>
          </div>
          <div className="ref-card-body">
            <table className="dyslipid-table htn-class-table">
              <thead>
                <tr>
                  <th style={{ width: '30%' }}>Category</th>
                  <th>Clinic BP (mmHg)</th>
                  <th>Home BP Monitoring Average or Ambulatory BP Daytime Average (mmHg)</th>
                </tr>
              </thead>
              <tbody>
                {stagingCriteria.map((s, i) => (
                  <tr key={i}>
                    <td><div className="cell-population">{s.category}</div></td>
                    <td style={{ fontWeight: 600 }}>{s.clinic}</td>
                    <td style={{ fontWeight: 600, textAlign: 'center' }}>{s.homeAbpm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="widget-note" style={{ marginTop: '12px' }}>
              Adapted from National Institute for Health and Clinical Excellence (NICE) Hypertension, 2011.
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
