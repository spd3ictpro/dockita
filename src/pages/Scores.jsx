import { useState } from 'react'
import { framingham, ipss, gad7, phq9, curb65, cvRiskHtn, act, cat, aria, stopbang, epworth } from '../data/scoresData'
import { HeartIcon, ClipboardIcon, SmileIcon, FrownIcon, ChartBarIcon, DropletIcon, ScoresIcon, LungsIcon, AsthmaIcon, MoonIcon } from '../components/icons'

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
      <h3><HeartIcon size={20} className="widget-heading-icon" /> {framingham.title}</h3>
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
      <h3>{score.id === 'ipss' ? <ClipboardIcon size={20} className="widget-heading-icon" /> : score.id === 'gad7' ? <SmileIcon size={20} className="widget-heading-icon" /> : <FrownIcon size={20} className="widget-heading-icon" />} {score.title}</h3>
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
      <h3>{score.id === 'curb65' ? <ChartBarIcon size={20} className="widget-heading-icon" /> : score.id === 'cha2ds2vasc' ? <HeartIcon size={20} className="widget-heading-icon" /> : <DropletIcon size={20} className="widget-heading-icon" />} {score.title}</h3>
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

function IpssWidget() {
  const [answers, setAnswers] = useState({})
  const [qol, setQol] = useState(null)
  const [result, setResult] = useState(null)

  const setAns = (key) => (e) => setAnswers(a => ({ ...a, [key]: Number(e.target.value) }))
  const calc = () => {
    const total = ipss.questions.reduce((sum, q) => sum + (answers[q.key] || 0), 0)
    const cat = ipss.getCategory(total)
    const qolCat = qol !== null ? ipss.qol.getCategory(qol) : null
    setResult({ total, qol, ...cat, qolCat })
  }
  const clear = () => { setAnswers({}); setQol(null); setResult(null) }

  return (
    <div className="score-widget">
      <h3><ClipboardIcon size={20} className="widget-heading-icon" /> {ipss.title}</h3>
      <p className="widget-desc">{ipss.description}</p>
      <div className="questionnaire">
        {ipss.questions.map(q => (
          <div key={q.key} className="question-row">
            <label>{q.text}</label>
            <div className="question-options">
              {[0, 1, 2, 3, 4, 5].map(v => (
                <button
                  key={v}
                  className={`q-opt ${answers[q.key] === v ? 'selected' : ''}`}
                  onClick={() => setAns(q.key)({ target: { value: v } })}
                  title={`${v} — ${v === 0 ? 'Not at all' : v === 5 ? 'Almost always' : ''}`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        ))}
        <div className="question-row">
          <label>{ipss.qol.text}</label>
          <div className="question-options">
            {ipss.qol.options.map(o => (
              <button
                key={o.value}
                className={`q-opt ${qol === o.value ? 'selected' : ''}`}
                onClick={() => setQol(o.value)}
                title={`${o.value} — ${o.label}`}
              >
                {o.value}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="calc-actions">
        <button className="btn btn-primary" onClick={calc}>Calculate</button>
        <button className="btn btn-secondary" onClick={clear}>Clear</button>
      </div>
      {result && (
        <div className="calc-result" style={{ backgroundColor: result.color }}>
          Score: <strong>{result.total}/{ipss.maxScore}</strong> — {result.label}
          {result.qol !== null && (
            <div className="widget-sub" style={{ backgroundColor: result.qolCat.color }}>
              QoL: <strong>{result.qol}/6</strong> — {result.qolCat.label}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function CvRiskHtnWidget() {
  return (
    <div className="score-widget">
      <h3>{cvRiskHtn.title}</h3>
      <p className="widget-desc">{cvRiskHtn.description}</p>
      <div className="widget-placeholder">Coming soon</div>
    </div>
  )
}

function ActWidget() {
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)

  const setAns = (key) => (e) => setAnswers(a => ({ ...a, [key]: Number(e.target.value) }))
  const calc = () => {
    const total = act.questions.reduce((sum, q) => sum + (answers[q.key] || 0), 0)
    const cat = act.getCategory(total)
    setResult({ total, ...cat })
  }
  const clear = () => { setAnswers({}); setResult(null) }

  return (
    <div className="score-widget">
      <h3><AsthmaIcon size={20} className="widget-heading-icon" /> {act.title}</h3>
      <p className="widget-desc">{act.description}</p>
      <div className="questionnaire">
        {act.questions.map(q => (
          <div key={q.key} className="question-row">
            <label>{q.text}</label>
            <div className="question-options">
              {[1, 2, 3, 4, 5].map(v => (
                <button
                  key={v}
                  className={`q-opt ${answers[q.key] === v ? 'selected' : ''}`}
                  onClick={() => setAns(q.key)({ target: { value: v } })}
                  title={q.labels[v - 1]}
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
          Score: <strong>{result.total}/{act.maxScore}</strong> — {result.label}
        </div>
      )}
    </div>
  )
}

function CatWidget() {
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)

  const setAns = (key) => (e) => setAnswers(a => ({ ...a, [key]: Number(e.target.value) }))
  const calc = () => {
    const total = cat.questions.reduce((sum, q) => sum + (answers[q.key] || 0), 0)
    const catResult = cat.getCategory(total)
    setResult({ total, ...catResult })
  }
  const clear = () => { setAnswers({}); setResult(null) }

  return (
    <div className="score-widget">
      <h3><LungsIcon size={20} className="widget-heading-icon" /> {cat.title}</h3>
      <p className="widget-desc">{cat.description}</p>
      <div className="questionnaire">
        {cat.questions.map(q => (
          <div key={q.key} className="question-row">
            <label>{q.text}</label>
            <div className="question-options">
              {[0, 1, 2, 3, 4, 5].map(v => (
                <button
                  key={v}
                  className={`q-opt ${answers[q.key] === v ? 'selected' : ''}`}
                  onClick={() => setAns(q.key)({ target: { value: v } })}
                  title={`${v} — ${v === 0 ? 'Never' : v === 5 ? 'Always' : ''}`}
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
          Score: <strong>{result.total}/{cat.maxScore}</strong> — {result.label}
        </div>
      )}
    </div>
  )
}

function AriaWidget() {
  const [duration, setDuration] = useState('intermittent')
  const [severity, setSeverity] = useState({})

  const toggle = (key) => () => setSeverity(s => ({ ...s, [key]: !s[key] }))
  const severityCount = Object.values(severity).filter(Boolean).length
  const result = aria.getCategory(duration, severityCount)

  return (
    <div className="score-widget">
      <h3><AsthmaIcon size={20} className="widget-heading-icon" /> {aria.title}</h3>
      <p className="widget-desc">{aria.description}</p>
      <div className="score-inputs">
        <label className="widget-label">Duration</label>
        <div className="toggle-group">
          <button className={`toggle-btn ${duration === 'intermittent' ? 'active' : ''}`} onClick={() => setDuration('intermittent')}>
            <span>Intermittent</span>
            <span className="toggle-sub">&lt;4 days/week or &lt;4 weeks</span>
          </button>
          <button className={`toggle-btn ${duration === 'persistent' ? 'active' : ''}`} onClick={() => setDuration('persistent')}>
            <span>Persistent</span>
            <span className="toggle-sub">≥4 days/week and ≥4 weeks</span>
          </button>
        </div>
        <label className="widget-label">Severity — tick if present</label>
        <div className="checkbox-group">
          {aria.severityItems.map(item => (
            <label key={item.key} className="checkbox-row">
              <input type="checkbox" checked={!!severity[item.key]} onChange={toggle(item.key)} />
              {item.label}
            </label>
          ))}
        </div>
      </div>
      <div className="calc-result" style={{ backgroundColor: result.color }}>
        Classification: <strong>{result.label}</strong>
      </div>
    </div>
  )
}

function StopbangWidget() {
  const [vals, setVals] = useState({})
  const [result, setResult] = useState(null)

  const set = (k) => (e) => setVals(v => ({ ...v, [k]: e.target.value }))
  const calc = () => {
    const total = stopbang.calculate(vals)
    const cat = stopbang.getCategory(total)
    setResult({ total, ...cat })
  }
  const clear = () => { setVals({}); setResult(null) }

  return (
    <div className="score-widget">
      <h3><MoonIcon size={20} className="widget-heading-icon" /> {stopbang.title}</h3>
      <p className="widget-desc">{stopbang.description}</p>
      <div className="questionnaire">
        {stopbang.items.map(item => (
          <div key={item.key} className="question-row">
            <label>{item.question}</label>
            <div className="question-options">
              <button className={`q-opt ${vals[item.key] === '0' ? 'selected' : ''}`} onClick={() => set(item.key)({ target: { value: '0' } })}>No</button>
              <button className={`q-opt ${vals[item.key] === '1' ? 'selected' : ''}`} onClick={() => set(item.key)({ target: { value: '1' } })}>Yes</button>
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
          Score: <strong>{result.total}/8</strong> — {result.label}
          {result.recommendation && <div className="widget-sub">{result.recommendation}</div>}
        </div>
      )}
    </div>
  )
}

function EpworthWidget() {
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)

  const setAns = (key) => (e) => setAnswers(a => ({ ...a, [key]: Number(e.target.value) }))
  const calc = () => {
    const total = epworth.questions.reduce((sum, q) => sum + (answers[q.key] || 0), 0)
    const cat = epworth.getCategory(total)
    setResult({ total, ...cat })
  }
  const clear = () => { setAnswers({}); setResult(null) }

  return (
    <div className="score-widget">
      <h3><MoonIcon size={20} className="widget-heading-icon" /> {epworth.title}</h3>
      <p className="widget-desc">{epworth.description}</p>
      <div className="questionnaire">
        {epworth.questions.map(q => (
          <div key={q.key} className="question-row">
            <label>{q.text}</label>
            <div className="question-options">
              {[0, 1, 2, 3].map(v => (
                <button
                  key={v}
                  className={`q-opt ${answers[q.key] === v ? 'selected' : ''}`}
                  onClick={() => setAns(q.key)({ target: { value: v } })}
                  title={epworth.des[v]}
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
          Score: <strong>{result.total}/{epworth.maxScore}</strong> — {result.label}
        </div>
      )}
    </div>
  )
}

const scoreTools = [
  { component: FraminghamWidget, key: 'framingham' },
  { component: CvRiskHtnWidget, key: 'cv-risk-htn' },
  { component: () => <ScoreWidget score={curb65} />, key: 'curb65' },
  { component: IpssWidget, key: 'ipss' },
  { component: () => <div className="section-label">Respiratory</div>, key: 'resp-label', fullRow: true },
  { component: AriaWidget, key: 'aria' },
  { component: ActWidget, key: 'act' },
  { component: CatWidget, key: 'cat' },
  {
    component: () => (
      <>
        <div className="section-label">Sleep</div>
        <div className="score-pair"><StopbangWidget /><EpworthWidget /></div>
      </>
    ),
    key: 'sleep',
    fullRow: true,
  },
  { 
    component: () => (
      <>
        <div className="section-label">Mental Health</div>
        <div className="score-pair"><QuestionnaireWidget score={gad7} /><QuestionnaireWidget score={phq9} /></div>
      </>
    ),
    key: 'mh',
    fullRow: true,
  },
]

export default function Scores() {
  return (
    <div className="page">
      <h1><ScoresIcon size={28} className="page-heading-icon" /> Scores & Scales</h1>
      <p className="page-subtitle">Cardiovascular, clinical, and mental health risk scores</p>
      <div className="scores-grid">
        {scoreTools.map(t => <div key={t.key} className={t.fullRow ? 'full-row' : ''}>{t.component()}</div>)}
      </div>
    </div>
  )
}
