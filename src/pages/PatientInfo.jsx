import { useState } from 'react'
import { patientInfoItems } from '../data/patientInfoData'
import { PatientInfoIcon, ImageIcon } from '../components/icons'
import Lightbox from '../components/Lightbox'

export default function PatientInfo() {
  const [lightbox, setLightbox] = useState(null)

  return (
    <div className="page page--narrow">
      <h1><PatientInfoIcon size={28} className="page-heading-icon" /> Infographics</h1>
      <p className="page-subtitle">Visual aids for patient counselling and education</p>

      <div className="info-grid">
        {patientInfoItems.map(item => (
          <button
            key={item.id}
            className={`info-card${item.images.length === 0 ? ' info-card--empty' : ''}`}
            onClick={() => item.images.length > 0 && setLightbox({ images: item.images, idx: 0 })}
          >
            {item.images.length > 0 ? (
              <div className="info-thumb-wrap">
                <img src={item.images[0]} alt={item.title} className="info-thumb" />
                {item.images.length > 1 && <span className="info-count">{item.images.length} images</span>}
              </div>
            ) : (
              <div className="info-placeholder">
                <ImageIcon size={32} className="info-placeholder-icon" />
              </div>
            )}
            <div className="info-card-body">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </button>
        ))}
      </div>

      {lightbox && (
        <Lightbox
          images={lightbox.images}
          initialIndex={lightbox.idx}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  )
}
