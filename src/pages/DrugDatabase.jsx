import { useState, useEffect, useMemo, useRef } from 'react'
import { DrugIcon, ClearIcon, SearchIcon } from '../components/icons'
import { fetchDrugs, searchDrugs } from '../data/drugData'

function renderHtml(html) {
  return <span dangerouslySetInnerHTML={{ __html: html }} />
}

function DrugDetail({ drug }) {
  if (!drug) return null

  const fields = [
    { label: 'Brand Name', value: drug.brandName, skip: !drug.brandName },
    { label: 'Prescriber Category', value: drug.prescriberCategory, skip: !drug.prescriberCategory || drug.prescriberCategory === 'NOT APPLICABLE' },
    { label: 'Indications', value: drug.indications, skip: !drug.indications, html: true },
    { label: 'Prescribing Restrictions', value: drug.prescribingRestrictions, skip: !drug.prescribingRestrictions, html: true },
    { label: 'Dosages', value: drug.dosages, skip: !drug.dosages, html: true },
    { label: 'Adverse Reactions', value: drug.adverseReactions, skip: !drug.adverseReactions, html: true },
    { label: 'Contraindications', value: drug.contraindications, skip: !drug.contraindications, html: true },
    { label: 'Interactions', value: drug.interactions, skip: !drug.interactions, html: true },
    { label: 'Precautions', value: drug.precautions, skip: !drug.precautions, html: true },
    { label: 'Method of Purchase', value: drug.methodOfPurchase, skip: !drug.methodOfPurchase },
    { label: 'Notes', value: drug.notes, skip: !drug.notes, html: true },
  ]

  return (
    <div className="drug-detail">
      <h2 className="drug-detail-title">{drug.genericName}</h2>
      {fields.filter(f => !f.skip).map(f => (
        <div key={f.label} className="drug-detail-section">
          <strong className="drug-detail-label">{f.label}</strong>
          <div className={f.html ? 'drug-detail-html' : ''}>
            {f.html ? renderHtml(f.value) : f.value}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function DrugDatabase() {
  const [drugs, setDrugs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const inputRef = useRef(null)
  const listRef = useRef(null)

  useEffect(() => {
    let cancelled = false
    fetchDrugs()
      .then(data => { if (!cancelled) { setDrugs(data); setLoading(false) } })
      .catch(err => { if (!cancelled) { setError(err.message); setLoading(false) } })
    return () => { cancelled = true }
  }, [])

  const results = useMemo(() => searchDrugs(query, drugs), [query, drugs])

  const handleSelect = (drug) => {
    setSelected(drug)
    inputRef.current?.focus()
  }

  if (loading) {
    return (
      <div className="page">
        <h1><DrugIcon size={28} className="page-heading-icon" /> Drug Database</h1>
        <p className="page-subtitle">Loading {drugs.length > 0 ? `${drugs.length} drugs` : 'drug database'}…</p>
        <div className="drug-loading">Loading drug data…</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="page">
        <h1><DrugIcon size={28} className="page-heading-icon" /> Drug Database</h1>
        <p className="page-subtitle">Failed to load drug database</p>
        <div className="calc-result" style={{ backgroundColor: 'var(--risk-high-mid)' }}>
          Error: {error}. Please ensure <code>drugs.json</code> is available in the public directory.
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <h1><DrugIcon size={28} className="page-heading-icon" /> Drug Database</h1>
      <p className="page-subtitle">{drugs.length.toLocaleString()} drugs — search by generic name, brand, or synonym</p>

      <div className="drug-search-container">
        <div className="drug-search-bar">
          <SearchIcon size={20} className="drug-search-icon" />
          <input
            ref={inputRef}
            type="text"
            className="drug-search-input"
            placeholder="Search drugs… (e.g. metformin, Ziagen, ABC)"
            value={query}
            onChange={e => { setQuery(e.target.value); setSelected(null) }}
          />
          {query && (
            <button className="drug-search-clear" onClick={() => { setQuery(''); setSelected(null); inputRef.current?.focus() }}>
              <ClearIcon size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="drug-layout">
        <div className="drug-list-panel" ref={listRef}>
          {query && results.length === 0 && (
            <div className="drug-no-results">No drugs found matching &ldquo;{query}&rdquo;</div>
          )}
          {results.length > 0 && (
            <ul className="drug-list">
              {results.map(d => (
                <li
                  key={d.id}
                  className={`drug-list-item ${selected?.id === d.id ? 'selected' : ''}`}
                  onClick={() => handleSelect(d)}
                >
                  <span className="drug-list-name">{d.genericName}</span>
                  {d.brandName && <span className="drug-list-brand">{d.brandName}</span>}
                  {d.prescriberCategory && d.prescriberCategory !== 'NOT APPLICABLE' && (
                    <span className="drug-list-cat">{d.prescriberCategory}</span>
                  )}
                </li>
              ))}
            </ul>
          )}
          {!query && (
            <div className="drug-no-results">Type a search term to find drugs</div>
          )}
        </div>

        <div className="drug-detail-panel">
          {selected ? (
            <DrugDetail drug={selected} />
          ) : (
            query ? (
              <div className="drug-detail-empty">Select a drug to view details</div>
            ) : (
              <div className="drug-detail-empty">Search for a drug above</div>
            )
          )}
        </div>
      </div>
    </div>
  )
}
