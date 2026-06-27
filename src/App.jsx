import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Screening from './pages/Screening'
import Calculators from './pages/Calculators'
import Scores, { ScoreDetail } from './pages/Scores'
import Geriatric from './pages/Geriatric'
import PatientInfo from './pages/PatientInfo'
import DrugDatabase from './pages/DrugDatabase'
import Diabetes from './pages/Diabetes'
import Hypertension from './pages/Hypertension'
import Dyslipidemia from './pages/Dyslipidemia'
import NeoBili from './pages/NeoBili'

const routeLabels = {
  '/screening': 'Screening',
  '/calculators': 'Calculators',
  '/scores': 'Scores & Scales',
  '/geriatric': 'Geriatric',
  '/patient-info': 'Infographics',
  '/drugs': 'Drug Database',
  '/diabetes': 'Diabetes Mellitus',
  '/hypertension': 'Hypertension',
  '/dyslipidemia': 'Dyslipidaemia',
  '/neobili': 'NeoBili — Neonatal Bilirubin',
}

function App() {
  const location = useLocation()

  useEffect(() => {
    const saved = localStorage.getItem('dockita-theme') || 'light'
    document.documentElement.setAttribute('data-theme', saved)
  }, [])

  useEffect(() => {
    const base = location.pathname
    if (base === '/' || !routeLabels[base]) return
    const recent = JSON.parse(localStorage.getItem('dockita-recent') || '[]')
    const entry = { path: base + (location.search || ''), label: routeLabels[base], timestamp: Date.now() }
    const filtered = recent.filter(r => r.path !== entry.path)
    filtered.unshift(entry)
    localStorage.setItem('dockita-recent', JSON.stringify(filtered.slice(0, 8)))
  }, [location])

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/screening" element={<Screening />} />
        <Route path="/calculators" element={<Calculators />} />
        <Route path="/scores" element={<Scores />} />
        <Route path="/scores/:scoreId" element={<ScoreDetail />} />
        <Route path="/geriatric" element={<Geriatric />} />
        <Route path="/patient-info" element={<PatientInfo />} />
        <Route path="/drugs" element={<DrugDatabase />} />
        <Route path="/diabetes" element={<Diabetes />} />
        <Route path="/hypertension" element={<Hypertension />} />
        <Route path="/dyslipidemia" element={<Dyslipidemia />} />
        <Route path="/neobili" element={<NeoBili />} />
      </Route>
    </Routes>
  )
}

export default App
