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

  const visible = fields.filter(f => !f.skip)

  if (visible.length === 0) return null

  return (
    <div className="drug-detail">
      <h2 className="drug-detail-title">{drug.genericName}</h2>
      {visible.map((f, i) => (
        <div key={f.label} className="drug-detail-section" style={{ '--i': i }}>
          <strong className="drug-detail-label">{f.label}</strong>
          <div className={f.html ? 'drug-detail-html' : 'drug-detail-text'}>
            {f.html ? renderHtml(f.value) : f.value}
          </div>
        </div>
      ))}
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
        <h1><DrugIcon size={28} className="page-heading-icon" /> Drug Database</h1>
        <p className="page-subtitle">{drugs.length > 0 ? `${drugs.length.toLocaleString()} drugs` : 'Loading drug database'}&hellip;</p>
        <div className="drug-search-bar drug-search-bar-skeleton" aria-hidden="true">
          <div className="drug-skeleton-line drug-skeleton-search" />
        </div>
        <div className="drug-layout">
          <div className="drug-list-panel">
            <div className="drug-list">
              {Array.from({ length: 10 }, (_, i) => <SkeletonRow key={i} />)}
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
            placeholder="Search drugs&hellip;"
            aria-label="Search drugs by generic name, brand, or synonym"
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
              <ClearIcon size={16} />
            </button>
          )}
        </div>
        {query && (
          <span className="drug-search-count">{results.length} result{results.length !== 1 ? 's' : ''}{mohOnly ? ' in MOH' : ''}</span>
        )}
        <div className="drug-filter-group">
          <button
            className={`drug-filter-pill ${mohOnly ? 'active' : ''}`}
            onClick={() => setMohOnly(true)}
            aria-pressed={mohOnly}
          >MOH</button>
          <button
            className={`drug-filter-pill ${!mohOnly ? 'active' : ''}`}
            onClick={() => setMohOnly(false)}
            aria-pressed={!mohOnly}
          >All</button>
        </div>
      </div>

      <div className="drug-layout">
        <div className="drug-list-panel" ref={listRef}>
          {query && results.length === 0 && (
            <div className="drug-no-results">
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
            <div className="drug-no-results">
              <SearchIcon size={24} className="drug-no-results-icon" />
              <strong>Type to search</strong>
              <span className="drug-no-results-hint">Find drugs by generic name, brand name, or synonym. e.g. metformin, Ziagen, ABC</span>
            </div>
          )}
        </div>

        <div className="drug-detail-panel">
          <div key={selected?.id || 'empty'} className="drug-detail-inner">
            {selected ? (
              <DrugDetail drug={selected} />
            ) : query ? (
              <div className="drug-detail-empty">
                <span>Select a drug from the list to view details</span>
              </div>
            ) : (
              <div className="drug-detail-empty">
                <DrugIcon size={32} className="drug-detail-empty-icon" />
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
