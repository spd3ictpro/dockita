import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import SearchBar from './SearchBar'
import { useState } from 'react'

export default function Layout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className={`app-layout ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(c => !c)} />
      <main className="main-content">
        <SearchBar />
        <div className="page-content">
          <Outlet />
        </div>
        <footer className="disclaimer-bar">
          <strong>Disclaimer:</strong> This dashboard is for reference only. Always exercise clinical judgment. Use at your own risk.
        </footer>
      </main>
    </div>
  )
}
