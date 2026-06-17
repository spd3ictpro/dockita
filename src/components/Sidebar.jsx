import { NavLink } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import { HomeIcon, ScreeningIcon, CalculatorIcon, ScoresIcon, GeriatricIcon, PatientInfoIcon, DrugIcon, DropletIcon, HeartIcon, ChartBarIcon, Logo, ChevronLeft, ChevronRight } from './icons'

const links = [
  { to: '/', icon: HomeIcon, label: 'Home' },
  { to: '/screening', icon: ScreeningIcon, label: 'Screening' },
  { to: '/diabetes', icon: DropletIcon, label: 'Diabetes' },
  { to: '/hypertension', icon: HeartIcon, label: 'Hypertension' },
  { to: '/dyslipidemia', icon: ChartBarIcon, label: 'Dyslipidemia' },
  { to: '/calculators', icon: CalculatorIcon, label: 'Calculators' },
  { to: '/scores', icon: ScoresIcon, label: 'Scores' },
  { to: '/drugs', icon: DrugIcon, label: 'Drug Database' },
  { to: '/geriatric', icon: GeriatricIcon, label: 'Geriatric' },
  { to: '/patient-info', icon: PatientInfoIcon, label: 'Infographics' },
]

export default function Sidebar({ collapsed, onToggle }) {
  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <Logo size={20} className="sidebar-logo" />
        {!collapsed && <span className="sidebar-title">dockita</span>}
        <button className="sidebar-collapse-btn" onClick={onToggle} aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>
      <nav className="sidebar-nav">
        {links.map(link => {
          const Icon = link.icon
          return (
            <NavLink key={link.to} to={link.to} end={link.to === '/'} className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <Icon size={20} className="sidebar-link-icon" />
              {!collapsed && <span className="sidebar-link-label">{link.label}</span>}
            </NavLink>
          )
        })}
      </nav>
      <div className="sidebar-footer">
        <ThemeToggle />
        {!collapsed && <span className="sidebar-disclaimer">For reference only. Use at your own risk.</span>}
      </div>
    </aside>
  )
}
