import { NavLink } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

const links = [
  { to: '/', icon: 'dashboard', label: 'Home' },
  { to: '/screening', icon: 'clinical_notes', label: 'Screening' },
  { to: '/diabetes', icon: 'medical_services', label: 'Diabetes' },
  { to: '/hypertension', icon: 'blood_pressure', label: 'Hypertension' },
  { to: '/dyslipidemia', icon: 'science', label: 'Dyslipidemia' },
  { to: '/calculators', icon: 'calculate', label: 'Calculators' },
  { to: '/scores', icon: 'analytics', label: 'Scores & Scales' },
  { to: '/drugs', icon: 'pill', label: 'Drug Database' },
  { to: '/geriatric', icon: 'elderly', label: 'Geriatric' },
  { to: '/patient-info', icon: 'monitoring', label: 'Patient Info' },
]

export default function Sidebar({ open, onClose }) {
  return (
    <>
      <div className={`sidebar-overlay ${open ? 'open' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>medical_services</span>
          </div>
          <span className="sidebar-title">dockita</span>
        </div>

        <div className="sidebar-profile">
          <div className="sidebar-avatar">
            <span className="material-symbols-outlined">person</span>
          </div>
          <div>
            <div className="sidebar-profile-name">Medical Officer</div>
            <div className="sidebar-profile-role">Active Duty</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {links.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <span className="material-symbols-outlined">{link.icon}</span>
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <ThemeToggle />
          <div className="sidebar-disclaimer">For reference only. Use at your own risk.</div>
        </div>
      </aside>
    </>
  )
}

