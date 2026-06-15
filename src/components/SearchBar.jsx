import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { searchIndex } from '../data/searchIndex'
import { SearchIcon, ClearIcon } from './icons'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [selectedIdx, setSelectedIdx] = useState(-1)
  const navigate = useNavigate()
  const inputRef = useRef(null)
  const listRef = useRef(null)

  useEffect(() => {
    if (!query.trim()) { setResults([]); return }
    const q = query.toLowerCase()
    const matches = searchIndex
      .map(item => ({
        ...item,
        score: item.label.toLowerCase().includes(q) ? 2 : (item.keywords.toLowerCase().includes(q) ? 1 : 0),
      }))
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
    setResults(matches)
    setSelectedIdx(-1)
  }, [query])

  const handleSelect = (item) => {
    setQuery('')
    setResults([])
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
    } else if (e.key === 'Enter' && selectedIdx >= 0 && results[selectedIdx]) {
      handleSelect(results[selectedIdx])
    } else if (e.key === 'Escape') {
      setResults([])
      inputRef.current?.blur()
    }
  }

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <SearchIcon size={20} className="search-icon" />
        <input
          ref={inputRef}
          type="text"
          className="search-input"
          placeholder="Search anything... (Framingham, BMI, cervical cancer, etc.)"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (query.trim() && results.length === 0) {
              const q = query.toLowerCase()
              const matches = searchIndex
                .map(item => ({
                  ...item,
                  score: item.label.toLowerCase().includes(q) ? 2 : (item.keywords.toLowerCase().includes(q) ? 1 : 0),
                }))
                .filter(item => item.score > 0)
                .sort((a, b) => b.score - a.score)
                .slice(0, 10)
              setResults(matches)
            }
          }}
          onBlur={() => setTimeout(() => setResults([]), 200)}
        />
        {query && (
          <button className="search-clear" onClick={() => { setQuery(''); setResults([]); inputRef.current?.focus() }}>
            <ClearIcon size={16} />
          </button>
        )}
      </div>
      {results.length > 0 && (
        <ul className="search-results" ref={listRef}>
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
