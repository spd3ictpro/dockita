import { useNavigate, useSearchParams } from 'react-router-dom'
import { screeningCategories } from '../data/screeningData'
import { ScreeningIcon, FemaleIcon, BreastIcon, GutIcon, BoneIcon, LungsIcon, LiverIcon, DropletIcon } from '../components/icons'

const categoryMeta = {
  'cervical-cancer': { icon: FemaleIcon, color: '#f06595' },
  'breast-cancer': { icon: BreastIcon, color: '#f59f00' },
  'colorectal-cancer': { icon: GutIcon, color: '#9775fa' },
  'osteoporosis': { icon: BoneIcon, color: '#748ffc' },
  'lung-cancer': { icon: LungsIcon, color: '#38d9a9' },
  'hep-b': { icon: LiverIcon, color: '#fcc419' },
  'diabetes-mellitus': { icon: DropletIcon, color: '#0c8599' },
}

const sectionIcons = {
  symptomatic: 'symptoms',
  asymptomatic: 'groups',
  'risk-factors': 'list_alt',
  adolescents: 'child_care',
  'screening-test': 'lab_profile',
}

const focusTitles = {
  'cervical-cancer': 'Cervical Cancer',
  'breast-cancer': 'Breast Cancer',
  'colorectal-cancer': 'Colorectal Cancer',
  'osteoporosis': 'Osteoporosis',
  'lung-cancer': 'Lung Cancer',
  'hep-b': 'Hepatitis B',
  'diabetes-mellitus': 'Diabetes Mellitus',
}

export default function Screening() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const focus = searchParams.get('focus')
  const showAll = !focus || !focusTitles[focus]

  if (!showAll) {
    const cat = screeningCategories.find(c => c.id === focus)
    if (!cat) {
      return (
        <div className="page">
          <button className="focus-back" onClick={() => navigate('/screening')}>
            <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>arrow_back</span>
            All Screening Guidelines
          </button>
          <h1><ScreeningIcon size={28} className="page-heading-icon" /> Screening Guidelines</h1>
          <p className="page-subtitle">Category not found</p>
        </div>
      )
    }
    const meta = categoryMeta[cat.id] || {}
    const Icon = meta.icon
    return (
      <div className="page page--narrow">
        <button className="focus-back" onClick={() => navigate('/screening')}>
          <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>arrow_back</span>
          All Screening Guidelines
        </button>

        <div className="score-detail-header">
          <div>
            <div className="score-card-category">{cat.condition}</div>
            <h1>{focusTitles[focus]}</h1>
          </div>
          {Icon && <Icon size={40} className="score-card-icon" style={{ color: meta.color }} />}
        </div>
        <p className="score-detail-desc">{cat.source}</p>

        {cat.sections ? (
          <div className="score-detail-form" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {cat.sections.map((section, si) => (
              <div key={si} className="ref-card">
                <div className="ref-card-header">
                  <span className="material-symbols-outlined">{sectionIcons[section.type]}</span>
                  <h2>{section.title}</h2>
                </div>
                <div className="ref-card-body">
                  {(section.type === 'symptomatic' || section.type === 'asymptomatic') && (
                    <table className="screening-table">
                      <thead>
                        <tr>
                          <th>Who should be screened</th>
                          {section.type === 'symptomatic' ? <th>Symptoms suggestive of T2DM</th> : <th>Notes</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {section.rows.map((r, ri) => (
                          <tr key={ri}>
                            <td className="cell-population" style={section.type === 'asymptomatic' ? { whiteSpace: 'normal' } : undefined}>{r.population}</td>
                            <td style={section.type === 'symptomatic' ? undefined : { fontSize: '0.82rem', color: 'var(--on-surface-variant)' }}>
                              {section.type === 'symptomatic'
                                ? <div style={{ lineHeight: 1.6 }}>{r.symptoms.map((s, si) => <div key={si}>{s}</div>)}</div>
                                : r.notes}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}

                  {section.type === 'risk-factors' && (
                    <table className="screening-table">
                      <thead>
                        <tr>
                          <th>Risk Factors</th>
                        </tr>
                      </thead>
                      <tbody>
                        {section.items.map((item, ri) => (
                          <tr key={ri}>
                            <td style={{ whiteSpace: 'pre-line', lineHeight: 1.6, fontSize: '0.82rem', color: 'var(--on-surface-variant)' }}>{item}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}

                  {section.type === 'adolescents' && (
                    <table className="screening-table">
                      <thead>
                        <tr>
                          <th>Criteria</th>
                        </tr>
                      </thead>
                      <tbody>
                        {section.items.map((item, ri) => (
                          <tr key={ri}>
                            <td style={{ whiteSpace: 'pre-line', lineHeight: 1.6, fontSize: '0.82rem', color: 'var(--on-surface-variant)' }}>{item}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}

                  {section.type === 'screening-test' && (
                    <>
                      <table className="screening-table">
                        <thead>
                          <tr>
                            <th>Test</th>
                            <th>Interpretation</th>
                          </tr>
                        </thead>
                        <tbody>
                          {section.rows.map((r, ri) => (
                            <tr key={ri}>
                          <td className="cell-test">{r.test}</td>
                          <td style={{ fontSize: '0.82rem', color: 'var(--on-surface-variant)' }}>{r.interpretation}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <p className="widget-note" style={{ marginTop: '0.5rem' }}>
                        Confirmatory tests:<br />
                        {section.confirmatory.map((c, ci) => <span key={ci}>• {c}<br /></span>)}
                      </p>
                    </>
                  )}

                  {section.footnote && (
                    <p className="widget-note" style={{ marginTop: '0.5rem', whiteSpace: 'pre-line' }}>{section.footnote}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="score-detail-form">
            <table className="screening-table">
              <thead>
                <tr>
                  <th>Population</th>
                  <th>Recommendation</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {cat.guidelines.map((g, i) => (
                  <tr key={i}>
                    <td className="cell-population">{g.age}</td>
                    <td className="cell-test">{g.test}</td>
                    <td className="note-cell">{g.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="page" style={{ paddingTop: 0 }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--on-surface)' }}>Screening Guidelines</h2>
        <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.9rem', marginTop: 4 }}>Malaysia CPG-based screening recommendations</p>
      </div>

      <div className="scores-bento">
        {screeningCategories.map(cat => {
          const meta = categoryMeta[cat.id] || {}
          const Icon = meta.icon
          return (
            <div
              key={cat.id}
              className="score-card"
              onClick={() => navigate('/screening?focus=' + cat.id)}
            >
              <div className="score-card-header">
                <div>
                  <div className="score-card-category">{cat.condition}</div>
                  <div className="score-card-title">{cat.title}</div>
                </div>
                {Icon && <Icon size={32} className="score-card-icon" style={{ color: meta.color }} />}
              </div>
              <p className="score-card-desc">{cat.source}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
