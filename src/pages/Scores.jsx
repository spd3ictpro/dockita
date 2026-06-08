import { useState } from 'react'
import { framingham, ipss, gad7, phq9, curb65, cha2ds2vasc, hasbled } from '../data/scoresData'

function FraminghamWidget() {
  const [vals, setVals] = useState({ gender: 'male', age: '', cholesterol: '', hdl: '', sbp: '', treated: '0', smoker: '0', diabetes: '0' })
  const [result, setResult] = useState(null)

  const set = (k) => (e) => setVals(v => ({ ...v, [k]: e.target.value }))
  const calc = () => {
    const r = framingham.calculate(vals)
    if (!r) { setResult({ error: 'Please fill in all fields with valid values.' }); return }
    const interpretation = framingham.interpret(r.risk)
    setResult({ points: r.points, risk: r.risk, ...interpretation })
  }
  const clear = () => { setVals({ gender: 'male', age: '', cholesterol: '', hdl: '', sbp: '', treated: '0', smoker: '0', diabetes: '0' }); setResult(null) }

  return (
    <div className="score-widget">
      <h3>❤️ {framingham.title}</h3>
      <p className="widget-desc">{framingham.description}</p>
      <div className="score-inputs">
        {framingham.inputs.map(inp => (
          inp.type === 'select' ? (
            <select key={inp.key} value={vals[inp.key]} onChange={set(inp.key)}>
              {inp.options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          ) : (
            <input key={inp.key} type="number" placeholder={inp.label} value={vals[inp.key]} onChange={set(inp.key)} min={inp.min} max={inp.max} step={inp.step || 1} />
          )
        ))}
      </div>
      <div className="calc-actions">
        <button className="btn btn-primary" onClick={calc}>Calculate Risk</button>
        <button className="btn btn-secondary" onClick={clear}>Clear</button>
      </div>
      {result && (
        result.error ? <div className="calc-result">{result.error}</div> : (
          <div className="calc-result" style={{ backgroundColor: result.color }}>
            10-Year Risk: <strong>{result.risk}%</strong> ({result.category})
            {result.points !== undefined && <div className="widget-sub">Points: {result.points}</div>}
          </div>
        )
      )}
      <p className="widget-note">{framingham.note}</p>
    </div>
  )
}

function QuestionnaireWidget({ score }) {
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)

  const setAns = (key) => (e) => setAnswers(a => ({ ...a, [key]: Number(e.target.value) }))
  const calc = () => {
    const total = score.questions.reduce((sum, q) => sum + (answers[q.key] || 0), 0)
    const cat = score.getCategory(total)
    setResult({ total, ...cat })
  }
  const clear = () => { setAnswers({}); setResult(null) }

  return (
    <div className="score-widget">
      <h3>{score.id === 'ipss' ? '🚽' : score.id === 'gad7' ? '🧠' : '😔'} {score.title}</h3>
      <p className="widget-desc">{score.description}</p>
      <div className="questionnaire">
        {score.questions.map(q => (
          <div key={q.key} className="question-row">
            <label>{q.text}</label>
            <div className="question-options">
              {[0, 1, 2, 3].concat(score.maxScore > 21 ? [4, 5] : []).map(v => (
                <button
                  key={v}
                  className={`q-opt ${answers[q.key] === v ? 'selected' : ''}`}
                  onClick={() => setAns(q.key)({ target: { value: v } })}
                  title={`${v} — ${v === 0 ? 'Not at all' : v === (score.maxScore > 21 ? 5 : 3) ? 'Nearly every day' : ''}`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="calc-actions">
        <button className="btn btn-primary" onClick={calc}>Calculate</button>
        <button className="btn btn-secondary" onClick={clear}>Clear</button>
      </div>
      {result && (
        <div className="calc-result" style={{ backgroundColor: result.color }}>
          Score: <strong>{result.total}/{score.maxScore || score.questions.length * 3}</strong> — {result.label}
        </div>
      )}
    </div>
  )
}

function ScoreWidget({ score }) {
  const [vals, setVals] = useState({})
  const [result, setResult] = useState(null)

  const set = (k) => (e) => setVals(v => ({ ...v, [k]: e.target.value }))
  const calc = () => {
    const total = score.calculate(vals)
    const cat = score.getCategory(total)
    setResult({ total, ...cat })
  }
  const clear = () => { setVals({}); setResult(null) }

  return (
    <div className="score-widget">
      <h3>{score.id === 'curb65' ? '🫁' : score.id === 'cha2ds2vasc' ? '💓' : '🩸'} {score.title}</h3>
      <p className="widget-desc">{score.description}</p>
      <div className="score-inputs">
        {score.inputs.map(inp => (
          <select key={inp.key} value={vals[inp.key] || '0'} onChange={set(inp.key)}>
            {inp.options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        ))}
      </div>
      <div className="calc-actions">
        <button className="btn btn-primary" onClick={calc}>Calculate</button>
        <button className="btn btn-secondary" onClick={clear}>Clear</button>
      </div>
      {result && (
        <div className="calc-result" style={{ backgroundColor: result.color }}>
          Score: <strong>{result.total}</strong> — {result.label}
          {result.recommendation && <div className="widget-sub">{result.recommendation}</div>}
        </div>
      )}
    </div>
  )
}

const scoreTools = [
  { component: FraminghamWidget, key: 'framingham' },
  { component: () => <QuestionnaireWidget score={ipss} />, key: 'ipss' },
  { component: () => <QuestionnaireWidget score={gad7} />, key: 'gad7' },
  { component: () => <QuestionnaireWidget score={phq9} />, key: 'phq9' },
  { component: () => <ScoreWidget score={curb65} />, key: 'curb65' },
  { component: () => <div className="score-pair"><ScoreWidget score={cha2ds2vasc} /><ScoreWidget score={hasbled} /></div>, key: 'af' },
]

export default function Scores() {
  return (
    <div className="page">
      <h1>📊 Scores & Scales</h1>
      <p className="page-subtitle">Cardiovascular, mental health, and clinical risk scores</p>
      <div className="scores-grid">
        {scoreTools.map(t => <div key={t.key}>{t.component()}</div>)}
      </div>
    </div>
  )
}
