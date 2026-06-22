import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import './App.css'

const favicon = document.querySelector('link[rel="icon"]')
if (favicon) favicon.href = import.meta.env.BASE_URL + 'favicon.svg'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
