import SearchBar from './SearchBar'

export default function TopBar({ onMenuClick }) {
  return (
    <header className="topbar">
      <button className="mobile-menu-btn" onClick={onMenuClick} aria-label="Open menu">
        <span className="material-symbols-outlined">menu</span>
      </button>
      <SearchBar />
      <div className="topbar-actions">
        <button className="topbar-btn" aria-label="Notifications">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button className="topbar-btn" aria-label="Settings">
          <span className="material-symbols-outlined">settings</span>
        </button>
        <button className="topbar-btn" aria-label="Help">
          <span className="material-symbols-outlined">help</span>
        </button>
      </div>
    </header>
  )
}
