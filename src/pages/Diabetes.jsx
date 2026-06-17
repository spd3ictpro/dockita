import { screeningCategories } from '../data/screeningData'
import { DropletIcon } from '../components/icons'

const diabetesScreening = screeningCategories.find(c => c.id === 'diabetes')

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

export default function Diabetes() {
  return (
    <div className="page page--narrow">
      <h1><DropletIcon size={28} className="page-heading-icon" /> Diabetes Mellitus</h1>
      <p className="page-subtitle">Type 2 diabetes screening, diagnostic criteria, and glycemic targets</p>

      <div className="screening-list">
        <div className="screening-card expanded">
          <div className="screening-card-header">
            <div className="screening-card-header-left">
              <DropletIcon size={24} className="screening-card-icon" style={{ color: '#20c997' }} />
              <div>
                <h3>{diabetesScreening.title}</h3>
                <span className="screening-source">{diabetesScreening.source}</span>
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
                {diabetesScreening.guidelines.map((g, i) => (
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
              <DropletIcon size={24} className="screening-card-icon" style={{ color: '#20c997' }} />
              <div>
                <h3>Diagnostic Criteria for Diabetes Mellitus</h3>
                <span className="screening-source">Malaysia CPG: Management of T2DM 2021</span>
              </div>
            </div>
          </div>
          <div className="screening-card-body visible">
            <div className="diag-grid">
              <div>
                <h4 className="section-label">Table 2-3: Venous Plasma Glucose</h4>
                <table className="screening-table">
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
                        <td className="cell-test">{d.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="widget-note">
                  In symptomatic individuals, one abnormal glucose value is diagnostic. In asymptomatic individuals, 2 abnormal test results (plasma glucose and HbA1c) from the same sample or from 2 separate test samples are required for diagnosis.
                </p>

                <h4 className="section-label" style={{ marginTop: '20px' }}>Table 2-5: HbA1c</h4>
                <table className="screening-table">
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
                        <td className="cell-test">{h.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="widget-note">
                  A repeat HbA1c should be done 4 weeks after the first positive test for asymptomatic patients (if an accompanying FPG or RPG is indeterminate). For symptomatic patients, a single positive test is sufficient.
                </p>
              </div>
              <div>
                <h4 className="section-label">Table 2-3: OGTT (75 g glucose load)</h4>
                <table className="screening-table">
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
                        <td className="cell-test">{o.hr0}</td>
                        <td className="cell-test">{o.hr2}</td>
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
        </div>

        <div className="screening-card expanded">
          <div className="screening-card-header">
            <div className="screening-card-header-left">
              <DropletIcon size={24} className="screening-card-icon" style={{ color: '#20c997' }} />
              <div>
                <h3>Glycaemic Control Targets</h3>
                <span className="screening-source">Malaysia CPG: Management of T2DM 2021</span>
              </div>
            </div>
          </div>
          <div className="screening-card-body visible">
            <table className="screening-table">
              <thead>
                <tr>
                  <th>Population</th>
                  <th>HbA1c</th>
                  <th>Fasting Glucose</th>
                  <th>Postprandial Glucose</th>
                </tr>
              </thead>
              <tbody>
                {glycemicTargets.map((t, i) => (
                  <tr key={i}>
                    <td className="cell-population">{t.group}</td>
                    <td>{t.hba1c}</td>
                    <td>{t.fpg}</td>
                    <td>{t.ppg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="widget-note" style={{ marginTop: '12px' }}>
              Targets should be individualised based on age, comorbidities, hypoglycaemia risk, and patient preference.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
