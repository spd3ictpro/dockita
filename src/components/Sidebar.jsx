import { NavLink, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ThemeToggle from './ThemeToggle'

const navItems = [
  { type: 'link', to: '/', icon: 'dashboard', label: 'Home' },
  { type: 'link', to: '/screening', icon: 'clinical_notes', label: 'Screening' },
  { type: 'link', to: '/diabetes', icon: 'medical_services', label: 'Diabetes' },
  { type: 'link', to: '/hypertension', icon: 'blood_pressure', label: 'Hypertension' },
  { type: 'link', to: '/dyslipidemia', icon: 'science', label: 'Dyslipidemia' },
  {
    type: 'group',
    key: 'calculators',
    icon: 'calculate',
    label: 'Calculators',
    to: '/calculators',
    children: [
      { to: '/neobili', icon: 'healing', label: 'NeoBili' },
    ],
  },
  { type: 'link', to: '/scores', icon: 'analytics', label: 'Scores & Scales' },
  { type: 'link', to: '/drugs', icon: 'pill', label: 'Drug Database' },
  { type: 'link', to: '/geriatric', icon: 'elderly', label: 'Geriatric' },
  { type: 'link', to: '/patient-info', icon: 'monitoring', label: 'Patient Info' },
]

export default function Sidebar({ open, onClose }) {
  const location = useLocation()
  const [expandedGroups, setExpandedGroups] = useState(new Set())

  useEffect(() => {
    const group = navItems.find(
      item => item.type === 'group' && item.children?.some(c => location.pathname.startsWith(c.to))
    )
    if (group) {
      setExpandedGroups(prev => new Set([...prev, group.key]))
    }
  }, [location.pathname])

  const toggleGroup = (key) => {
    setExpandedGroups(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

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
          {navItems.map(item => {
            if (item.type === 'group') {
              const isExpanded = expandedGroups.has(item.key)
              const isChildActive = item.children?.some(c => location.pathname.startsWith(c.to))
              return (
                <div key={item.key} style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <NavLink
                      to={item.to}
                      end
                      className={({ isActive }) => `sidebar-link ${isActive || isChildActive ? 'active' : ''}`}
                      onClick={() => { toggleGroup(item.key); onClose() }}
                      style={{ flex: 1 }}
                    >
                      <span className="material-symbols-outlined">{item.icon}</span>
                      <span>{item.label}</span>
                    </NavLink>
                    <button
                      type="button"
                      className="sidebar-group-toggle"
                      onClick={() => toggleGroup(item.key)}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>
                        {isExpanded ? 'expand_less' : 'expand_more'}
                      </span>
                    </button>
                  </div>
                  {isExpanded && item.children?.map(child => (
                    <NavLink
                      key={child.to}
                      to={child.to}
                      className={({ isActive }) => `sidebar-child-link ${isActive ? 'active' : ''}`}
                      onClick={onClose}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>{child.icon}</span>
                      <span>{child.label}</span>
                    </NavLink>
                  ))}
                </div>
              )
            }
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                onClick={onClose}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            )
          })}
        </nav>

        <div className="sidebar-footer">
          <ThemeToggle />
          <div className="sidebar-disclaimer">For reference only. Use at your own risk.</div>
        </div>
      </aside>
    </>
  )
}
