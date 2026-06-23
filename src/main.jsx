import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import './App.css'

// Preload screening page icons so they render instantly on navigation
import intestineImg from './assets/icons/intestine.png'
import liverImg from './assets/icons/liver.png'
import lungsImg from './assets/icons/lungs.png'
import breastImg from './assets/icons/pink-ribbon.png'
import cholesterolImg from './assets/icons/cholesterol.png'
import cardiologyImg from './assets/icons/cardiology.png'
import hypertensionImg from './assets/icons/hypertension.png'
import cervicalImg from './assets/icons/cervical-cancer.png'
import diabetesImg from './assets/icons/diabetes.png'
import boneImg from './assets/icons/bone.png'
const icons = [intestineImg, liverImg, lungsImg, breastImg, cholesterolImg, cardiologyImg, hypertensionImg, cervicalImg, diabetesImg, boneImg]
icons.forEach(src => { const i = new Image(); i.src = src })

const favicon = document.querySelector('link[rel="icon"]')
if (favicon) favicon.href = import.meta.env.BASE_URL + 'favicon.svg'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
