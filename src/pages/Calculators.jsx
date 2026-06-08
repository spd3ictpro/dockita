import { useState } from 'react'

function BMICalculator() {
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [result, setResult] = useState(null)

  const calc = () => {
    const w = parseFloat(weight), h = parseFloat(height)
    if (!w || !h || h > 2.5) { setResult(null); return }
    const bmi = (w / (h * h))
    let cls = '', color = ''
    if (bmi < 18.5) { cls = 'Underweight'; color = 'var(--bmi-under)' }
    else if (bmi <= 22.9) { cls = 'Normal'; color = 'var(--bmi-normal)' }
    else if (bmi <= 27.4) { cls = 'Overweight (Pre-obese)'; color = 'var(--bmi-over)' }
    else if (bmi <= 32.4) { cls = 'Obese Class I'; color = 'var(--bmi-obese1)' }
    else if (bmi <= 37.4) { cls = 'Obese Class II'; color = 'var(--bmi-obese2)' }
    else { cls = 'Obese Class III'; color = 'var(--bmi-obese3)' }
    setResult({ bmi: bmi.toFixed(1), cls, color })
  }

  const clear = () => { setWeight(''); setHeight(''); setResult(null) }

  return (
    <div className="calc-card">
      <h3>🧮 BMI Calculator</h3>
      <p className="calc-desc">Body Mass Index — Malaysian CPG Obesity 2023</p>
      <div className="calc-inputs">
        <input type="number" step="0.1" placeholder="Weight (kg)" value={weight} onChange={e => setWeight(e.target.value)} />
        <input type="number" step="0.01" placeholder="Height (m)" value={height} onChange={e => setHeight(e.target.value)} />
      </div>
      <div className="calc-actions">
        <button className="btn btn-primary" onClick={calc}>Calculate</button>
        <button className="btn btn-secondary" onClick={clear}>Clear</button>
      </div>
      {result && (
        <div className="calc-result" style={{ backgroundColor: result.color }}>
          BMI: {result.bmi} — <strong>{result.cls}</strong>
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
      <h3>🩺 eGFR Calculator</h3>
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
        <div className="calc-result" style={{ backgroundColor: result.color, color: result.textColor }}>
          eGFR: {result.egfr} mL/min/1.73m² — <strong>{result.stage}</strong>
        </div>
      )}
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
      <h3>🎂 Age Calculator</h3>
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
    const date = new Date(lmp)
    date.setDate(date.getDate() + 280)
    const today = new Date()
    const gaWeeks = Math.floor((today - new Date(lmp)) / (7 * 86400000))
    const gaDays = Math.round(((today - new Date(lmp)) % (7 * 86400000)) / 86400000)
    setResult({
      edd: date.toLocaleDateString('en-MY', { year: 'numeric', month: 'long', day: 'numeric' }),
      ga: `${gaWeeks}+${gaDays}`,
    })
  }

  return (
    <div className="calc-card">
      <h3>🤰 EDD Calculator</h3>
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
          EDD: <strong>{result.edd}</strong><br />
          Current GA: <strong>{result.ga}</strong> weeks
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
      case '÷': result = a / b; break
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
      <h3>🔢 Basic Calculator</h3>
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

export default function Calculators() {
  return (
    <div className="page">
      <h1>🧮 Calculators</h1>
      <p className="page-subtitle">Clinical calculators and tools</p>
      <div className="calculators-grid">
        <BMICalculator />
        <EGFRCalculator />
        <AgeCalculator />
        <EDDCalculator />
        <BasicCalc />
      </div>
    </div>
  )
}
