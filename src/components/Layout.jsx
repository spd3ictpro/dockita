import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import AppFooter from './AppFooter'

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="app-layout">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="main-content">
        <TopBar onMenuClick={() => setSidebarOpen(o => !o)} />
        <div className="page-content">
          <Outlet />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}
