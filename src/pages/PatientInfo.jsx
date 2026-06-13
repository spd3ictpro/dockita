import { patientInfoItems } from '../data/patientInfoData'
import { PatientInfoIcon, ImageIcon } from '../components/icons'

export default function PatientInfo() {
  return (
    <div className="page">
      <h1><PatientInfoIcon size={28} className="page-heading-icon" /> Patient Education</h1>
      <p className="page-subtitle">Infographics and visual aids for patient counselling</p>
      <div className="info-grid">
        {patientInfoItems.map(item => (
          <div key={item.id} className="info-card">
            <div className="info-card-placeholder">
              <ImageIcon size={40} className="info-placeholder-icon" />
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
