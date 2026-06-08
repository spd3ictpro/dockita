import { NavLink } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

const links = [
  { to: '/', icon: '🏠', label: 'Home' },
  { to: '/screening', icon: '📋', label: 'Screening' },
  { to: '/calculators', icon: '🧮', label: 'Calculators' },
  { to: '/scores', icon: '📊', label: 'Scores' },
  { to: '/geriatric', icon: '👴', label: 'Geriatric' },
  { to: '/patient-info', icon: '🖼️', label: 'Patient Info' },
]

export default function Sidebar({ collapsed, onToggle }) {
  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <span className="sidebar-logo">☤</span>
        {!collapsed && <span className="sidebar-title">dockita</span>}
        <button className="sidebar-collapse-btn" onClick={onToggle} aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
          {collapsed ? '▶' : '◀'}
        </button>
      </div>
      <ThemeToggle />
      <nav className="sidebar-nav">
        {links.map(link => (
          <NavLink key={link.to} to={link.to} end={link.to === '/'} className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <span className="sidebar-link-icon">{link.icon}</span>
            {!collapsed && <span className="sidebar-link-label">{link.label}</span>}
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-footer">
        {!collapsed && <span className="sidebar-disclaimer">⚠️ For reference only. Use at your own risk.</span>}
      </div>
    </aside>
  )
}
