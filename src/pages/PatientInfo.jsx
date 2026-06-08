import { patientInfoItems } from '../data/patientInfoData'

export default function PatientInfo() {
  return (
    <div className="page">
      <h1>🖼️ Patient Education</h1>
      <p className="page-subtitle">Infographics and visual aids for patient counselling</p>
      <div className="info-grid">
        {patientInfoItems.map(item => (
          <div key={item.id} className="info-card">
            <div className="info-card-placeholder">
              <span className="info-placeholder-icon">📷</span>
              <span className="info-placeholder-text">[ {item.title} ]</span>
            </div>
            <div className="info-card-body">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
