import { useState, useEffect, useMemo, useRef } from 'react'
import { fetchDrugs, searchDrugs, parseDosages } from '../data/drugData'

function R({ html, value }) {
  if (!value) return null
  return html ? <span dangerouslySetInnerHTML={{ __html: value }} /> : <>{value}</>
}

function badgeChar(cat) {
  if (!cat || cat === 'NOT APPLICABLE' || cat.startsWith('DELISTED') || cat.startsWith('NOT APPLICABLE')) return null
  const m = cat.match(/^([A-Za-z*])/)
  return m ? m[1] : null
}

const popIcon = { adult: 'person', child: 'child_care', neonate: 'child_care' }
const popLabel = { adult: 'Adult', child: 'Child', neonate: 'Neonate' }

function DosageCards({ parsed }) {
  if (!parsed) return null
  const { sections } = parsed

  const isGeneral = sections.every(s => s.general)
  if (isGeneral) {
    return <div className="drug-detail-html drug-detail-mono"><R html value={sections[0].general} /></div>
  }

  return (
    <div className="drug-dosage-sections">
      {sections.map((sec, idx) => {
        const pops = []
        if (sec.adult) pops.push({ key: 'adult', icon: popIcon.adult, label: popLabel.adult, content: sec.adult })
        if (sec.child) pops.push({ key: 'child', icon: popIcon.child, label: popLabel.child, content: sec.child })
        if (sec.neonate) pops.push({ key: 'neonate', icon: popIcon.neonate, label: popLabel.neonate, content: sec.neonate })

        return (
          <div key={idx} className={idx > 0 ? 'drug-dosage-section drug-dosage-section-bordered' : 'drug-dosage-section'}>
            {sec.label && <div className="drug-dosage-label">{sec.label}</div>}
            <div className="drug-dosage-cards">
              {pops.map(p => (
                <div key={p.key} className="drug-dosage-card">
                  <div className="drug-dosage-card-header">
                    <span className="material-symbols-outlined drug-dosage-card-icon">{p.icon}</span>
                    <span className="drug-dosage-card-label">{p.label}</span>
                  </div>
                  <div className="drug-detail-html drug-detail-mono"><R html value={p.content} /></div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function DrugDetail({ drug }) {
  if (!drug) return null
  const cat = drug.prescriberCategory
  const showCat = cat && cat !== 'NOT APPLICABLE' && !cat.startsWith('DELISTED') && !cat.startsWith('NOT APPLICABLE')
  const parsedDosages = useMemo(() => parseDosages(drug.dosages), [drug.dosages])

  return (
    <div className="drug-detail-inner">
      <div className="drug-detail-header">
        <h2 className="drug-detail-title">{drug.genericName}</h2>
        {showCat && (
          <div className="drug-category-badge">
            <span className="drug-category-badge-label">Category</span>
            <div className="drug-category-badge-box">
              <span className="drug-category-badge-char">{cat}</span>
            </div>
          </div>
        )}
      </div>

      <div className="drug-detail-body">
        {(drug.brandName || (drug.methodOfPurchase && drug.methodOfPurchase !== 'NOT APPLICABLE')) && (
          <div className="drug-detail-grid-2">
            {drug.brandName && (
              <div className="drug-detail-field">
                <span className="drug-detail-label">Brand Name</span>
                <p className="drug-detail-text">{drug.brandName}</p>
              </div>
            )}
            {drug.methodOfPurchase && drug.methodOfPurchase !== 'NOT APPLICABLE' && (
              <div className="drug-detail-field">
                <span className="drug-detail-label">Method of Purchase</span>
                <p className="drug-detail-text">{drug.methodOfPurchase}</p>
              </div>
            )}
          </div>
        )}

        {drug.indications && (
          <div className="drug-detail-field">
            <span className="drug-detail-label">Indications</span>
            <div className="drug-detail-html"><R html value={drug.indications} /></div>
          </div>
        )}

        {drug.prescribingRestrictions && (
          <div className="drug-detail-field">
            <span className="drug-detail-label">Prescribing Restrictions</span>
            <div className="drug-detail-box drug-detail-box-info">
              <span className="material-symbols-outlined drug-detail-box-icon">info</span>
              <div className="drug-detail-html"><R html value={drug.prescribingRestrictions} /></div>
            </div>
          </div>
        )}

        {drug.dosages && (
          <div className="drug-detail-field">
            <span className="drug-detail-label">Dosages</span>
            <DosageCards parsed={parsedDosages} />
          </div>
        )}

        {drug.contraindications && (
          <div className="drug-detail-field">
            <span className="drug-detail-label">Contraindications</span>
            <div className="drug-detail-box drug-detail-box-warning">
              <span className="material-symbols-outlined drug-detail-box-icon">warning</span>
              <div className="drug-detail-html"><R html value={drug.contraindications} /></div>
            </div>
          </div>
        )}

        {(drug.adverseReactions || drug.interactions || drug.precautions) && (
          <div className="drug-detail-grid-3">
            {drug.adverseReactions && (
              <div className="drug-detail-field">
                <span className="drug-detail-label">Adverse Reactions</span>
                <div className="drug-detail-html"><R html value={drug.adverseReactions} /></div>
              </div>
            )}
            {drug.interactions && (
              <div className="drug-detail-field">
                <span className="drug-detail-label">Interactions</span>
                <div className="drug-detail-html"><R html value={drug.interactions} /></div>
              </div>
            )}
            {drug.precautions && (
              <div className="drug-detail-field">
                <span className="drug-detail-label">Precautions</span>
                <div className="drug-detail-html"><R html value={drug.precautions} /></div>
              </div>
            )}
          </div>
        )}

        {drug.notes && (
          <div className="drug-detail-field drug-detail-notes">
            <span className="drug-detail-label">Notes</span>
            <div className="drug-detail-html drug-detail-html-notes"><R html value={drug.notes} /></div>
          </div>
        )}
      </div>
    </div>
  )
}

function SkeletonRow() {
  return (
    <div className="drug-list-item drug-skeleton" aria-hidden="true">
      <span className="drug-skeleton-line drug-skeleton-name" />
      <span className="drug-skeleton-line drug-skeleton-brand" />
    </div>
  )
}

export default function DrugDatabase() {
  const [drugs, setDrugs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const [focusedIdx, setFocusedIdx] = useState(-1)
  const [mohOnly, setMohOnly] = useState(true)
  const inputRef = useRef(null)
  const listRef = useRef(null)

  useEffect(() => {
    let cancelled = false
    fetchDrugs()
      .then(data => { if (!cancelled) { setDrugs(data); setLoading(false) } })
      .catch(err => { if (!cancelled) { setError(err.message); setLoading(false) } })
    return () => { cancelled = true }
  }, [])

  const isMoh = (drug) => {
    const c = drug.prescriberCategory
    return c && c !== 'NOT APPLICABLE' && !c.startsWith('NOT APPLICABLE') && !c.startsWith('DELISTED')
  }

  const searched = useMemo(() => searchDrugs(query, drugs), [query, drugs])
  const results = useMemo(() => mohOnly ? searched.filter(isMoh) : searched, [mohOnly, searched])

  const handleSelect = (drug) => {
    setSelected(drug)
    setFocusedIdx(-1)
    inputRef.current?.focus()
  }

  const handleKeyDown = (e) => {
    if (results.length === 0) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setFocusedIdx(i => (i + 1) % results.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setFocusedIdx(i => (i <= 0 ? results.length - 1 : i - 1))
    } else if (e.key === 'Enter' && focusedIdx >= 0) {
      e.preventDefault()
      handleSelect(results[focusedIdx])
    }
  }

  useEffect(() => {
    if (focusedIdx < 0 || !listRef.current) return
    const item = listRef.current.querySelector(`[data-index="${focusedIdx}"]`)
    item?.scrollIntoView({ block: 'nearest' })
  }, [focusedIdx])

  if (loading) {
    return (
      <div className="page">
        <div className="drug-page-header">
          <span className="material-symbols-outlined drug-page-header-icon">pill</span>
          <div>
            <h1>Drug Database</h1>
            <p>{drugs.length > 0 ? `${drugs.length.toLocaleString()} drugs` : 'Loading drug database'}&hellip;</p>
          </div>
        </div>
        <div className="drug-search-area">
          <div className="drug-search-wrapper" style={{ padding: '12px 14px', background: 'var(--surface-container)', border: '1px solid var(--outline-variant)', borderRadius: '12px' }}>
            <div className="drug-skeleton-line drug-skeleton-search" />
          </div>
        </div>
        <div className="drug-layout">
          <div className="drug-list-panel">
            <div className="drug-list">
              {Array.from({ length: 10 }, (_, idx) => <SkeletonRow key={idx} />)}
            </div>
          </div>
          <div className="drug-detail-panel">
            <div className="drug-detail-skeleton" aria-hidden="true">
              <div className="drug-skeleton-line drug-skeleton-detail-title" />
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className="drug-detail-section">
                  <div className="drug-skeleton-line drug-skeleton-detail-label" />
                  <div className="drug-skeleton-line drug-skeleton-detail-value" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="page">
        <div className="drug-page-header">
          <span className="material-symbols-outlined drug-page-header-icon">pill</span>
          <div>
            <h1>Drug Database</h1>
            <p>Failed to load drug database</p>
          </div>
        </div>
        <div className="calc-result" style={{ backgroundColor: 'var(--risk-high-mid)' }}>
          Error: {error}. Please ensure <code>drugs.json</code> is available in the public directory.
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="drug-page-header">
        <span className="material-symbols-outlined drug-page-header-icon">pill</span>
        <div>
          <h1>Drug Database</h1>
          <p>{drugs.length.toLocaleString()} medications available in formulary</p>
        </div>
      </div>

      <div className="drug-search-area">
        <div className="drug-search-wrapper">
          <span className="material-symbols-outlined search-icon">search</span>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search by generic name, brand name, or indication..."
            aria-label="Search drugs"
            value={query}
            onChange={e => { setQuery(e.target.value); setSelected(null); setFocusedIdx(-1) }}
            onKeyDown={handleKeyDown}
          />
          {query && (
            <button
              className="drug-search-clear"
              onClick={() => { setQuery(''); setSelected(null); setFocusedIdx(-1); inputRef.current?.focus() }}
              aria-label="Clear search"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>close</span>
            </button>
          )}
        </div>
        <div className="drug-search-tools">
          <div className="drug-filter-group">
            <button className={`drug-filter-btn ${mohOnly ? 'active' : ''}`} onClick={() => setMohOnly(true)}>MOH</button>
            <button className={`drug-filter-btn ${!mohOnly ? 'active' : ''}`} onClick={() => setMohOnly(false)}>All</button>
          </div>
          {query && (
            <span className="drug-result-count">{results.length} result{results.length !== 1 ? 's' : ''}{mohOnly ? ' in MOH' : ''}</span>
          )}
        </div>
      </div>

      <div className="drug-layout">
        <div className="drug-list-panel" ref={listRef}>
          {query && results.length === 0 && (
            <div className="drug-no-results">
              <span className="material-symbols-outlined drug-no-results-icon">search_off</span>
              <strong>{mohOnly ? 'No MOH-available drugs found' : 'No drugs found'}</strong> matching &ldquo;{query}&rdquo;
              <span className="drug-no-results-hint">Try a different spelling or search by generic name, brand name, or synonym</span>
            </div>
          )}
          {results.length > 0 && (
            <ul className="drug-list" role="listbox" aria-label="Drug search results" aria-activedescendant={focusedIdx >= 0 ? `drug-item-${results[focusedIdx]?.id}` : undefined}>
              {results.map((d, i) => (
                <li
                  key={d.id}
                  id={`drug-item-${d.id}`}
                  role="option"
                  aria-selected={selected?.id === d.id}
                  data-index={i}
                  className={`drug-list-item ${selected?.id === d.id ? 'selected' : ''} ${focusedIdx === i ? 'focused' : ''}`}
                  onClick={() => handleSelect(d)}
                  tabIndex={-1}
                >
                  <div className="drug-list-item-top">
                    <span className="drug-list-name">{d.genericName}</span>
                    {d.prescriberCategory && d.prescriberCategory !== 'NOT APPLICABLE' && !d.prescriberCategory.startsWith('DELISTED') && (
                      <span className="drug-list-cat">{d.prescriberCategory}</span>
                    )}
                  </div>
                  {d.brandName && <span className="drug-list-brand">{d.brandName}</span>}
                </li>
              ))}
            </ul>
          )}
          {!query && (
            <div className="drug-no-results">
              <span className="material-symbols-outlined drug-no-results-icon">search</span>
              <strong>Type to search</strong>
              <span className="drug-no-results-hint">Find drugs by generic name, brand name, or synonym. e.g. metformin, Ziagen, ABC</span>
            </div>
          )}
        </div>

        <div className="drug-detail-panel">
          <div key={selected?.id || 'empty'}>
            {selected ? (
              <DrugDetail drug={selected} />
            ) : query ? (
              <div className="drug-detail-empty">
                <span>Select a drug from the list to view details</span>
              </div>
            ) : (
              <div className="drug-detail-empty">
                <span className="material-symbols-outlined drug-detail-empty-icon">pill</span>
                <span>Search for a drug above</span>
                <span className="drug-detail-empty-hint">Results appear in the left panel — select one to see prescribing information</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
