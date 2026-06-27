import { useState } from 'react'
import { getThresholds } from '../data/neobiliData'

export default function NeoBili() {
  const [ga, setGa] = useState(null)
  const [tsb, setTsb] = useState('')
  const [hours, setHours] = useState('')
  const [riskFactors, setRiskFactors] = useState({
    albumin: false,
    ihd: false,
    g6pd: false,
    hemolytic: false,
    sepsis: false,
    instability: false,
  })
  const [lastTsb, setLastTsb] = useState('')
  const [lastHours, setLastHours] = useState('')
  const [result, setResult] = useState(null)
  const [fieldErrors, setFieldErrors] = useState({})

  function handleCalculate() {
    const errors = {}
    if (!ga) errors.ga = 'Select a gestational age'
    if (!tsb || isNaN(parseFloat(tsb))) errors.tsb = 'Enter a valid TSB value'
    if (!hours || isNaN(parseFloat(hours))) errors.hours = 'Enter hours of life'
    if (Object.keys(errors).length > 0) { setFieldErrors(errors); return }
    setFieldErrors({})

    const tsbVal = parseFloat(tsb)
    const hoursVal = parseFloat(hours)

    const riskAny = Object.values(riskFactors).some(v => v === true)
    const { pt, et } = getThresholds(ga, hoursVal, riskAny)

    const tsbMgdl = tsbVal / 17.1
    const ptUmol = pt * 17.1
    const etUmol = et * 17.1
    const diffFromPt = tsbVal - ptUmol

    let status
    if (tsbMgdl >= et) {
      status = 'Above exchange transfusion threshold'
    } else if (tsbMgdl >= et - 2) {
      status = 'Escalation of care (Approaching ET level)'
    } else if (tsbMgdl >= pt) {
      status = 'Phototherapy indicated (Above photolevel)'
    } else if (tsbMgdl >= pt - 3) {
      status = 'Borderline (Approaching photolevel)'
    } else {
      status = 'Within normal limit of threshold'
    }

    let rate
    const lastTsbVal = parseFloat(lastTsb)
    const lastHoursVal = parseFloat(lastHours)
    if (!isNaN(lastTsbVal) && !isNaN(lastHoursVal) && hoursVal !== lastHoursVal) {
      rate = Math.round(((tsbVal - lastTsbVal) / (hoursVal - lastHoursVal)) * 10) / 10
    }

    setResult({ ptUmol, etUmol, status, rate, diffFromPt, tsbMgdl, currentTsb: tsbVal, ptMgdl: pt, etMgdl: et })
  }

  function clear() {
    setGa(null)
    setTsb('')
    setHours('')
    setRiskFactors({ albumin: false, ihd: false, g6pd: false, hemolytic: false, sepsis: false, instability: false })
    setLastTsb('')
    setLastHours('')
    setResult(null)
    setFieldErrors({})
  }

  return (
    <div className="page neobili-page">
      <div className="dyslipid-header">
        <div>
          <h1><span className="material-symbols-outlined page-heading-icon">healing</span> NeoBili</h1>
          <p className="page-subtitle">
            Neonatal Total Serum Bilirubin — Phototherapy & Exchange Transfusion Thresholds<br />
            <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>AAP 2022 Hyperbilirubinemia Management Guidelines</span>
          </p>
        </div>
      </div>
      <div className="dyslipid-body">
        <div className="ref-card">
          <div className="ref-card-header">
            <span className="material-symbols-outlined">edit_note</span>
            <h2>Patient Data</h2>
          </div>
          <div className="ref-card-body">
            <div className="neobili-inputs">
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '16px' }}>
                <div style={{ flex: '1 1 280px' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: 4, color: 'var(--on-surface-variant)' }}>Gestational Age (weeks)</label>
                  <div style={{ display: 'flex', gap: 4, padding: 8, border: `1px dashed ${fieldErrors.ga ? '#e74c3c' : 'var(--outline-variant)'}`, borderRadius: 6 }}>
                    {[35, 36, 37, 38, 39, 40].map(v => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => { setGa(v); setFieldErrors(s => ({ ...s, ga: undefined })) }}
                        style={{
                          flex: 1,
                          padding: '8px 2px',
                          borderRadius: 6,
                          border: `1px solid ${ga === v ? 'var(--primary)' : 'var(--outline-variant)'}`,
                          background: ga === v ? 'var(--primary)' : 'var(--surface)',
                          color: ga === v ? '#fff' : 'var(--on-surface)',
                          fontWeight: ga === v ? 700 : 400,
                          cursor: 'pointer',
                          fontSize: '0.8rem',
                          transition: 'all 0.15s',
                        }}
                      >{v}{v === 40 ? '≥' : ''}</button>
                    ))}
                  </div>
                  {fieldErrors.ga ? (
                    <div style={{ color: '#e74c3c', fontSize: '0.75rem', marginTop: 2 }}>{fieldErrors.ga}</div>
                  ) : (
                    <div style={{ color: 'var(--on-surface-variant)', fontSize: '0.75rem', marginTop: 2, opacity: ga ? 0.35 : 0.6 }}>Tap a week to begin</div>
                  )}
                </div>
                <div style={{ flex: '1 1 180px' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: 4, color: 'var(--on-surface-variant)' }}>Current TSB (µmol/L)</label>
                  <input type="number" step="0.1" min="0" placeholder="e.g. 200" value={tsb} onChange={e => { setTsb(e.target.value); setFieldErrors(s => ({ ...s, tsb: undefined })) }} style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: `1px solid ${fieldErrors.tsb ? '#e74c3c' : 'var(--outline-variant)'}`, background: 'var(--surface)', color: 'var(--on-surface)', fontSize: '0.9rem', boxSizing: 'border-box' }} />
                  {fieldErrors.tsb && <div style={{ color: '#e74c3c', fontSize: '0.75rem', marginTop: 2 }}>{fieldErrors.tsb}</div>}
                </div>
                <div style={{ flex: '1 1 180px' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: 4, color: 'var(--on-surface-variant)' }}>Hours of Life</label>
                  <input type="number" min="0" max="336" placeholder="e.g. 48" value={hours} onChange={e => { setHours(e.target.value); setFieldErrors(s => ({ ...s, hours: undefined })) }} style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: `1px solid ${fieldErrors.hours ? '#e74c3c' : 'var(--outline-variant)'}`, background: 'var(--surface)', color: 'var(--on-surface)', fontSize: '0.9rem', boxSizing: 'border-box' }} />
                  {fieldErrors.hours && <div style={{ color: '#e74c3c', fontSize: '0.75rem', marginTop: 2 }}>{fieldErrors.hours}</div>}
                </div>
              </div>

              <fieldset style={{ border: '1px solid var(--outline-variant)', borderRadius: 8, padding: '12px 16px', marginBottom: 16 }}>
                <legend style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--on-surface-variant)', padding: '0 8px' }}>Neurotoxicity Risk Factors</legend>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 24px' }}>
                  {[
                    { key: 'albumin', label: 'Albumin <30 g/L' },
                    { key: 'ihd', label: 'IHD (positive DAT)*' },
                    { key: 'g6pd', label: 'G6PD deficiency' },
                    { key: 'hemolytic', label: 'Other hemolytic condition**' },
                    { key: 'sepsis', label: 'Sepsis' },
                    { key: 'instability', label: 'Instability (past 24h)' },
                  ].map(rf => (
                    <label key={rf.key} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: '0.85rem' }}>
                      <input type="checkbox" checked={riskFactors[rf.key]} onChange={e => setRiskFactors(s => ({ ...s, [rf.key]: e.target.checked }))} />
                      {rf.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div style={{ display: 'flex', gap: 12, marginTop: -8, marginBottom: 16 }}>
                <div className="drug-detail-box" style={{ flex: 1, background: 'color-mix(in srgb, var(--primary) 10%, transparent)', border: '1px solid color-mix(in srgb, var(--primary) 20%, transparent)' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '1rem', flexShrink: 0, marginTop: 2, color: 'var(--primary)' }}>info</span>
                  <div style={{ fontSize: '0.8rem', lineHeight: 1.5 }}>
                    * IHD = Isoimmune Hemolytic Disease<br />
                    (ABO/Rh incompatibility with positive<br />
                    Direct Antiglobulin Test)
                  </div>
                </div>
                <div className="drug-detail-box" style={{ flex: 1, background: 'color-mix(in srgb, var(--primary) 10%, transparent)', border: '1px solid color-mix(in srgb, var(--primary) 20%, transparent)' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '1rem', flexShrink: 0, marginTop: 2, color: 'var(--primary)' }}>info</span>
                  <div style={{ fontSize: '0.8rem', lineHeight: 1.5 }}>
                    ** Eg Thalassemia,<br />
                    Hemoglobinopathy
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '16px' }}>
                <div style={{ flex: '1 1 180px' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: 4, color: 'var(--on-surface-variant)' }}>Last TSB (µmol/L, optional)</label>
                  <input type="number" step="0.1" min="0" placeholder="e.g. 150" value={lastTsb} onChange={e => setLastTsb(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid var(--outline-variant)', background: 'var(--surface)', color: 'var(--on-surface)', fontSize: '0.9rem', boxSizing: 'border-box' }} />
                </div>
                <div style={{ flex: '1 1 180px' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: 4, color: 'var(--on-surface-variant)' }}>Last Hours of Life (optional)</label>
                  <input type="number" min="0" max="336" placeholder="e.g. 24" value={lastHours} onChange={e => setLastHours(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid var(--outline-variant)', background: 'var(--surface)', color: 'var(--on-surface)', fontSize: '0.9rem', boxSizing: 'border-box' }} />
                </div>
              </div>

              <div className="calc-actions" style={{ marginBottom: 16 }}>
                <button className="btn btn-primary" onClick={handleCalculate}>Calculate</button>
                <button className="btn btn-secondary" onClick={clear}>Clear</button>
              </div>

              {result && (() => {
                const s = result
                const tsb = s.tsbMgdl, pt = s.ptMgdl, et = s.etMgdl
                const statusBg = tsb >= et ? '#e74c3c'
                  : tsb >= et - 2 ? '#e74c3c'
                  : tsb >= pt ? '#d4a017'
                  : tsb >= pt - 3 ? '#fff3cd'
                  : '#27ae60'
                const statusColor = tsb >= et ? '#e74c3c'
                  : tsb >= pt - 3 ? '#d4a017'
                  : '#27ae60'
                const headerTextColor = tsb >= pt - 3 && tsb < pt ? '#856404' : '#fff'
                const headerIcon = tsb >= pt ? 'warning' : tsb >= pt - 3 ? 'info' : 'check_circle'
                return (
                  <div style={{ border: `2px solid ${statusColor}`, borderRadius: 8, overflow: 'hidden', marginBottom: 16 }}>
                    <div style={{ padding: '10px 16px', background: statusBg, color: headerTextColor, fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>
                        {headerIcon}
                      </span>
                      {result.status}
                    </div>
                    <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.85rem', background: 'var(--surface)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: 'var(--on-surface-variant)' }}>Single Phototherapy (SP) level</span>
                        <span style={{ fontWeight: 700 }}>{result.ptUmol.toFixed(1)} µmol/L</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: 'var(--on-surface-variant)' }}>Exchange Transfusion (ET) level</span>
                        <span style={{ fontWeight: 700 }}>{result.etUmol.toFixed(1)} µmol/L</span>
                      </div>
                      <div style={{ borderTop: '1px solid var(--outline-variant)', margin: '4px 0' }} />
                      {result.rate !== undefined && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: 'var(--on-surface-variant)' }}>Rate of TSB increase</span>
                          <span style={{ fontWeight: 700 }}>{result.rate.toFixed(1)} µmol/L/hr</span>
                        </div>
                      )}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: 'var(--on-surface-variant)' }}>Current TSB</span>
                        <span style={{ fontWeight: 700 }}>{result.currentTsb.toFixed(1)} µmol/L</span>
                      </div>
                    </div>
                  </div>
                )
              })()}

              <p className="widget-note" style={{ marginTop: '12px' }}>
                Based on AAP 2022 Clinical Practice Guideline: Management of Hyperbilirubinemia in the Newborn Infant 35 or More Weeks of Gestation.
              </p>
              <p className="widget-note">
                Thresholds are for Total Serum Bilirubin (TSB). If measurement was TcB, obtain confirmatory TSB if TcB ≥15 mg/dL or within 3 mg/dL of phototherapy threshold. For accurate rate calculation, ensure Last TSB was measured before Current TSB.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
