import { screeningCategories } from '../data/screeningData'
import { DropletIcon } from '../components/icons'

const diabetesScreening = screeningCategories.find(c => c.id === 'diabetes')

const diagnosticCriteria = [
  { test: 'Fasting Plasma Glucose', value: '≥7.0 mmol/L (126 mg/dL)', note: 'No caloric intake for ≥8 hours' },
  { test: 'HbA1c', value: '≥6.5% (48 mmol/mol)', note: 'NGSP-certified, standardized assay' },
  { test: 'OGTT 2h Plasma Glucose', value: '≥11.1 mmol/L (200 mg/dL)', note: '75 g oral glucose load' },
  { test: 'Random Plasma Glucose', value: '≥11.1 mmol/L', note: 'With classic hyperglycaemic symptoms' },
]

const glycemicTargets = [
  { group: 'Most adults', hba1c: '<6.5–7.0%', fpg: '4.4–6.1 mmol/L', ppg: '6.0–8.0 mmol/L' },
  { group: 'Elderly / Frail', hba1c: '<7.5–8.0%', fpg: '5.0–8.3 mmol/L', ppg: '6.0–10.0 mmol/L' },
  { group: 'Pregnancy (pregestational DM)', hba1c: '<6.0%', fpg: '3.5–5.3 mmol/L', ppg: '<7.8 mmol/L' },
]

export default function Diabetes() {
  return (
    <div className="page">
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
              </div>
            </div>
          </div>
          <div className="screening-card-body visible">
            <table className="screening-table">
              <thead>
                <tr>
                  <th>Test</th>
                  <th>Diagnostic Value</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {diagnosticCriteria.map((d, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>{d.test}</td>
                    <td className="cell-test">{d.value}</td>
                    <td className="note-cell">{d.note}</td>
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
