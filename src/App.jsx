import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Screening from './pages/Screening'
import Calculators from './pages/Calculators'
import Scores from './pages/Scores'
import Geriatric from './pages/Geriatric'
import PatientInfo from './pages/PatientInfo'
import Diabetes from './pages/Diabetes'
import Hypertension from './pages/Hypertension'
import Dyslipidemia from './pages/Dyslipidemia'

function App() {
  useEffect(() => {
    const saved = localStorage.getItem('dockita-theme') || 'light'
    document.documentElement.setAttribute('data-theme', saved)
  }, [])

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/screening" element={<Screening />} />
        <Route path="/calculators" element={<Calculators />} />
        <Route path="/scores" element={<Scores />} />
        <Route path="/geriatric" element={<Geriatric />} />
        <Route path="/patient-info" element={<PatientInfo />} />
        <Route path="/diabetes" element={<Diabetes />} />
        <Route path="/hypertension" element={<Hypertension />} />
        <Route path="/dyslipidemia" element={<Dyslipidemia />} />
      </Route>
    </Routes>
  )
}

export default App
