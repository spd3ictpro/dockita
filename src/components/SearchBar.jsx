import { useState, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { searchIndex } from '../data/searchIndex'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [selectedIdx, setSelectedIdx] = useState(-1)
  const [focused, setFocused] = useState(false)
  const navigate = useNavigate()
  const inputRef = useRef(null)

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return searchIndex
      .map(item => ({
        ...item,
        score: item.label.toLowerCase().includes(q) ? 2 : (item.keywords.toLowerCase().includes(q) ? 1 : 0),
      }))
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
  }, [query])

  const handleSelect = (item) => {
    setQuery('')
    setFocused(false)
    const path = item.id ? `${item.path}?focus=${item.id}` : item.path
    navigate(path)
    inputRef.current?.blur()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIdx(i => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIdx(i => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && results.length > 0) {
      handleSelect(selectedIdx >= 0 ? results[selectedIdx] : results[0])
    } else if (e.key === 'Escape') {
      setFocused(false)
      inputRef.current?.blur()
    }
  }

  const show = focused && results.length > 0

  return (
    <div className="topbar-search">
      <span className="material-symbols-outlined topbar-search-icon">search</span>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search CPG, Drugs, or Calculators..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 200)}
      />
      {show && (
        <ul className="search-results-dropdown">
          {results.map((item, idx) => (
            <li
              key={`${item.path}-${item.label}`}
              className={`search-result-item ${idx === selectedIdx ? 'selected' : ''}`}
              onMouseDown={() => handleSelect(item)}
            >
              <span className="search-result-label">{item.label}</span>
              <span className="search-result-path">{item.path}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
