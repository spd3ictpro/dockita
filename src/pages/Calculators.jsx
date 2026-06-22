import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ScaleIcon, KidneyIcon, LiverIcon, CalendarIcon, CalendarDaysIcon, CalculatorIcon } from '../components/icons'

function BMICalculator() {
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [result, setResult] = useState(null)

  const calc = () => {
    const w = parseFloat(weight), h = parseFloat(height)
    if (!w || !h || h > 2.5) { setResult(null); return }
    const bmi = (w / (h * h))
    let cls = '', color = '', risk = ''
    if (bmi < 18.5) { cls = 'Underweight'; color = 'var(--bmi-under)'; risk = 'Low, but with increased risk of other clinical problems' }
    else if (bmi <= 22.9) { cls = 'Normal'; color = 'var(--bmi-normal)'; risk = 'Optimal' }
    else if (bmi <= 27.4) { cls = 'Pre-obese (Overweight)'; color = 'var(--bmi-over)'; risk = 'Increased' }
    else if (bmi <= 32.4) { cls = 'Obese I'; color = 'var(--bmi-obese1)'; risk = 'High' }
    else if (bmi <= 37.4) { cls = 'Obese II'; color = 'var(--bmi-obese2)'; risk = 'Very high' }
    else { cls = 'Obese III'; color = 'var(--bmi-obese3)'; risk = 'Extremely high' }
    setResult({ bmi: bmi.toFixed(1), cls, color, risk })
  }

  const clear = () => { setWeight(''); setHeight(''); setResult(null) }

  return (
    <div className="calc-card">
      <div className="calc-heading"><ScaleIcon size={20} className="calc-heading-icon" /><h3>BMI Calculator</h3></div>
      <p className="calc-desc">Adapted from CPG Management of Obesity 2nd Edition 2023</p>
      <div className="calc-inputs">
        <input type="number" step="0.1" placeholder="Weight (kg)" value={weight} onChange={e => setWeight(e.target.value)} />
        <input type="number" step="0.01" placeholder="Height (m)" value={height} onChange={e => setHeight(e.target.value)} />
      </div>
      <div className="calc-actions">
        <button className="btn btn-primary" onClick={calc}>Calculate</button>
        <button className="btn btn-secondary" onClick={clear}>Clear</button>
      </div>
      {result && (
        <div className="calc-result" style={{ '--result-color': result.color }}>
          BMI: {result.bmi} — <strong>{result.cls}</strong>
          <div className="calc-risk">Risk: {result.risk}</div>
        </div>
      )}
    </div>
  )
}

function EGFRCalculator() {
  const [creatinine, setCreatinine] = useState('')
  const [age, setAge] = useState('')
  const [sex, setSex] = useState('male')
  const [result, setResult] = useState(null)

  const calc = () => {
    const cr = parseFloat(creatinine), a = parseInt(age)
    if (!cr || !a) { setResult(null); return }
    const crMgDl = cr / 88.4
    const kappa = sex === 'male' ? 0.9 : 0.7
    const alpha = sex === 'male' ? -0.411 : -0.329
    const minScr = Math.min(crMgDl / kappa, 1)
    const maxScr = Math.max(crMgDl / kappa, 1)
    const egfr = 141 * Math.pow(minScr, alpha) * Math.pow(maxScr, -1.209) * Math.pow(0.993, a)
    const val = Math.round(egfr)

    let stage = '', color = ''
    if (val >= 90) { stage = 'Stage 1 — Normal'; color = 'var(--bmi-normal)' }
    else if (val >= 60) { stage = 'Stage 2 — Mildly reduced'; color = 'var(--risk-low-mid)' }
    else if (val >= 45) { stage = 'Stage 3a — Mild-moderate'; color = 'var(--risk-mod)' }
    else if (val >= 30) { stage = 'Stage 3b — Moderate-severe'; color = '#ff922b' }
    else if (val >= 15) { stage = 'Stage 4 — Severe'; color = 'var(--risk-high)' }
    else { stage = 'Stage 5 — Kidney failure'; color = '#c92a2a' }

    setResult({ egfr: val, stage, color, textColor: val < 30 ? '#fff' : undefined })
  }

  const clear = () => { setCreatinine(''); setAge(''); setSex('male'); setResult(null) }

  return (
    <div className="calc-card">
      <div className="calc-heading"><KidneyIcon size={20} className="calc-heading-icon" /><h3>eGFR Calculator</h3></div>
      <p className="calc-desc">CKD-EPI (non-black) — µmol/L</p>
      <div className="calc-inputs">
        <input type="number" step="0.1" placeholder="Creatinine (µmol/L)" value={creatinine} onChange={e => setCreatinine(e.target.value)} />
        <input type="number" placeholder="Age (years)" value={age} onChange={e => setAge(e.target.value)} />
        <select value={sex} onChange={e => setSex(e.target.value)}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div className="calc-actions">
        <button className="btn btn-primary" onClick={calc}>Calculate eGFR</button>
        <button className="btn btn-secondary" onClick={clear}>Clear</button>
      </div>
      {result && (
        <div className="calc-result" style={{ '--result-color': result.color, color: result.textColor }}>
          eGFR: {result.egfr} mL/min/1.73m² — <strong>{result.stage}</strong>
        </div>
      )}
    </div>
  )
}

function Fib4Calculator() {
  const [age, setAge] = useState('')
  const [ast, setAst] = useState('')
  const [alt, setAlt] = useState('')
  const [platelets, setPlatelets] = useState('')
  const [result, setResult] = useState(null)

  const calc = () => {
    const a = parseInt(age), astVal = parseFloat(ast), altVal = parseFloat(alt), plt = parseFloat(platelets)
    if (!a || !astVal || !altVal || !plt || altVal <= 0 || plt <= 0) { setResult(null); return }
    const score = (a * astVal) / (plt * Math.sqrt(altVal))
    const rounded = score.toFixed(2)
    let label, color, action
    if (score < 1.3) {
      label = 'Low risk for advanced fibrosis'
      color = 'var(--risk-low)'
      action = 'Repeat FIB-4 every 2\u20133 years'
    } else {
      label = 'Intermediate to high risk for advanced fibrosis'
      color = 'var(--risk-mod)'
      action = 'Refer for liver stiffness measurement. Consider referral to Gastroenterologist/Hepatologist.'
    }
    setResult({ score: rounded, label, color, action })
  }

  const clear = () => { setAge(''); setAst(''); setAlt(''); setPlatelets(''); setResult(null) }

  return (
    <div className="calc-card">
      <div className="calc-heading"><LiverIcon size={20} className="calc-heading-icon" /><h3>FIB-4 Index</h3></div>
      <p className="calc-desc">Fibrosis-4 score for liver fibrosis</p>
      <div className="calc-inputs">
        <input type="number" placeholder="Age (years)" value={age} onChange={e => setAge(e.target.value)} />
        <input type="number" step="0.1" placeholder="AST (U/L)" value={ast} onChange={e => setAst(e.target.value)} />
        <input type="number" step="0.1" placeholder="ALT (U/L)" value={alt} onChange={e => setAlt(e.target.value)} />
        <input type="number" step="1" placeholder="Platelet count (\u00d710\u2079/L)" value={platelets} onChange={e => setPlatelets(e.target.value)} />
      </div>
      <div className="calc-actions">
        <button className="btn btn-primary" onClick={calc}>Calculate FIB-4</button>
        <button className="btn btn-secondary" onClick={clear}>Clear</button>
      </div>
      {result && (
        <div className="calc-result" style={{ '--result-color': result.color }}>
          FIB-4: <strong>{result.score}</strong> — {result.label}
          <div className="widget-sub">{result.action}</div>
        </div>
      )}
      <p className="calc-source">Adopted from CPG Management of Diabetes Mellitus (6th Edition) 2021</p>
    </div>
  )
}

function AgeCalculator() {
  const [year, setYear] = useState('')
  const [result, setResult] = useState(null)

  const calc = () => {
    const y = parseInt(year)
    if (!y || y < 1900 || y > new Date().getFullYear()) { setResult(null); return }
    setResult({ age: new Date().getFullYear() - y })
  }

  return (
    <div className="calc-card">
      <div className="calc-heading"><CalendarIcon size={20} className="calc-heading-icon" /><h3>Age Calculator</h3></div>
      <div className="calc-inputs">
        <input type="number" placeholder="Year of Birth" value={year} onChange={e => setYear(e.target.value)} />
      </div>
      <div className="calc-actions">
        <button className="btn btn-primary" onClick={calc}>Calculate</button>
        <button className="btn btn-secondary" onClick={() => { setYear(''); setResult(null) }}>Clear</button>
      </div>
      {result && <div className="calc-result">Age: <strong>{result.age} years</strong></div>}
    </div>
  )
}

function EDDCalculator() {
  const [lmp, setLmp] = useState('')
  const [result, setResult] = useState(null)

  const calc = () => {
    if (!lmp) { setResult(null); return }
    const lmpDate = new Date(lmp)
    const today = new Date()
    if (lmpDate > today) {
      setResult({ error: 'LMP cannot be in the future' })
      return
    }
    const date = new Date(lmp)
    date.setDate(date.getDate() + 280)
    const gaWeeks = Math.floor((today - new Date(lmp)) / (7 * 86400000))
    const gaDays = Math.round(((today - new Date(lmp)) % (7 * 86400000)) / 86400000)
    setResult({
      edd: date.toLocaleDateString('en-MY', { year: 'numeric', month: 'long', day: 'numeric' }),
      ga: `${gaWeeks}+${gaDays}`,
    })
  }

  return (
    <div className="calc-card">
      <div className="calc-heading"><CalendarDaysIcon size={20} className="calc-heading-icon" /><h3>EDD Calculator</h3></div>
      <p className="calc-desc">Naegele's Rule — from LMP</p>
      <div className="calc-inputs">
        <input type="date" value={lmp} onChange={e => setLmp(e.target.value)} />
      </div>
      <div className="calc-actions">
        <button className="btn btn-primary" onClick={calc}>Calculate</button>
        <button className="btn btn-secondary" onClick={() => { setLmp(''); setResult(null) }}>Clear</button>
      </div>
      {result && (
        <div className="calc-result">
          {result.error ? (
            <strong style={{ color: 'var(--risk-high)' }}>{result.error}</strong>
          ) : (
            <>
              EDD: <strong>{result.edd}</strong><br />
              Current GA: <strong>{result.ga}</strong> weeks
            </>
          )}
        </div>
      )}
    </div>
  )
}

function BasicCalc() {
  const [display, setDisplay] = useState('0')
  const [prev, setPrev] = useState('')
  const [op, setOp] = useState(null)
  const [reset, setReset] = useState(false)

  const handleNumber = (num) => {
    if (reset || display === '0') { setDisplay(num); setReset(false) }
    else setDisplay(d => d + num)
  }

  const handleOperator = (nextOp) => {
    if (op && !reset) { calculate() }
    setPrev(display)
    setOp(nextOp)
    setReset(true)
  }

  const calculate = () => {
    if (!op) return
    const a = parseFloat(prev), b = parseFloat(display)
    if (isNaN(a) || isNaN(b)) return
    let result = 0
    switch (op) {
      case '+': result = a + b; break
      case '-': result = a - b; break
      case '×': result = a * b; break
      case '÷':
        if (b === 0) {
          setDisplay('Cannot divide by zero')
          setOp(null)
          setPrev('')
          setReset(true)
          return
        }
        result = a / b
        break
      default: return
    }
    setDisplay(String(Number.isInteger(result) ? result : result.toFixed(4)))
    setOp(null)
    setPrev('')
    setReset(true)
  }

  const handleAction = (action) => {
    switch (action) {
      case 'C': setDisplay('0'); setPrev(''); setOp(null); break
      case '±': setDisplay(d => String(-parseFloat(d))); break
      case '%': setDisplay(d => String(parseFloat(d) / 100)); break
      case '.': setDisplay(d => d.includes('.') ? d : d + '.'); break
      case '=': calculate(); break
    }
  }

  const buttons = [
    ['C', '±', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '='],
  ]

  const isOp = (b) => ['+', '-', '×', '÷'].includes(b)
  const isAction = (b) => ['C', '±', '%', '=', '.'].includes(b)

  return (
    <div className="calc-card basic-calc-card">
      <div className="calc-heading"><CalculatorIcon size={20} className="calc-heading-icon" /><h3>Basic Calculator</h3></div>
      <div className="basic-calc-display">{display}</div>
      <div className="basic-calc-buttons">
        {buttons.flat().map((b, i) => (
          <button
            key={i}
            className={`calc-btn ${isOp(b) ? 'op' : ''} ${b === 'C' ? 'clear' : ''} ${b === '=' ? 'eq' : ''} ${b === '0' ? 'zero' : ''}`}
            onClick={() => {
              if (b.match(/\d/)) handleNumber(b)
              else if (isOp(b)) handleOperator(b)
              else handleAction(b)
            }}
          >
            {b}
          </button>
        ))}
      </div>
    </div>
  )
}

const calcFocusMap = {
  bmi: () => <BMICalculator />,
  egfr: () => <EGFRCalculator />,
  fib4: () => <Fib4Calculator />,
  age: () => <AgeCalculator />,
  edd: () => <EDDCalculator />,
  basic: () => <BasicCalc />,
}

const calcFocusTitle = {
  bmi: 'BMI Calculator',
  egfr: 'eGFR Calculator',
  fib4: 'FIB-4 Index',
  age: 'Age Calculator',
  edd: 'EDD Calculator',
  basic: 'Basic Calculator',
}

export default function Calculators() {
  const [searchParams, setSearchParams] = useSearchParams()
  const focus = searchParams.get('focus')

  if (focus && calcFocusMap[focus]) {
    return (
      <div className="page">
        <button className="focus-back" onClick={() => setSearchParams({})}>
          ← All Calculators
        </button>
        <h1><CalculatorIcon size={28} className="page-heading-icon" /> {calcFocusTitle[focus]}</h1>
        <div className="calculators-grid">
          {calcFocusMap[focus]()}
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <h1><CalculatorIcon size={28} className="page-heading-icon" /> Calculators</h1>
      <p className="page-subtitle">Clinical calculators and tools</p>
      <div className="calculators-grid">
        <BMICalculator />
        <EGFRCalculator />
        <Fib4Calculator />
        <AgeCalculator />
        <EDDCalculator />
        <BasicCalc />
      </div>
    </div>
  )
}
