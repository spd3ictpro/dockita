import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { framingham, ipss, gad7, phq9, curb65, act, cat, aria, stopbang, epworth, cha2ds2vasc, hasbled, cvRiskHtn } from '../data/scoresData'

const scoreMeta = [
  { id: 'phq9', icon: 'psychiatry', category: 'Mental Health', title: 'PHQ-9', desc: 'Patient Health Questionnaire for Depression screening and severity assessment.' },
  { id: 'gad7', icon: 'neurology', category: 'Mental Health', title: 'GAD-7', desc: 'Generalized Anxiety Disorder assessment tool for clinical anxiety.' },
  { id: 'cha2ds2vasc', icon: 'cardiology', category: 'Cardiology', title: 'CHA\u2082DS\u2082-VASc', desc: 'Stroke risk assessment in patients with non-valvular Atrial Fibrillation.' },
  { id: 'hasbled', icon: 'bloodtype', category: 'Cardiology', title: 'HAS-BLED', desc: 'Bleeding risk assessment for patients on anticoagulation therapy.' },
  { id: 'curb65', icon: 'pulmonology', category: 'Respiratory', title: 'CURB-65', desc: 'Severity score for Community-Acquired Pneumonia mortality risk.' },
  { id: 'ipss', icon: 'water_drop', category: 'Urology', title: 'IPSS', desc: 'International Prostate Symptom Score for evaluating LUTS.' },
  { id: 'framingham', icon: 'favorite', category: 'Preventive', title: 'Framingham', desc: '10-year cardiovascular risk assessment based on lipid profiles.' },
  { id: 'stopbang', icon: 'sleep', category: 'Sleep', title: 'STOP-BANG', desc: 'Obstructive Sleep Apnea screening tool.' },
  { id: 'epworth', icon: 'sleep_score', category: 'Sleep', title: 'Epworth', desc: 'Epworth Sleepiness Scale for daytime sleepiness.' },
  { id: 'aria', icon: 'lungs', category: 'Respiratory', title: 'ARIA', desc: 'Allergic Rhinitis and its Impact on Asthma classification.' },
  { id: 'act', icon: 'stethoscope', category: 'Respiratory', title: 'ACT', desc: 'Asthma Control Test for symptom assessment.' },
  { id: 'cat', icon: 'monitoring', category: 'Respiratory', title: 'CAT', desc: 'COPD Assessment Test for health status evaluation.' },
]

const focusTitle = {
  phq9: 'PHQ-9', gad7: 'GAD-7', cha2ds2vasc: 'CHA\u2082DS\u2082-VASc', hasbled: 'HAS-BLED',
  curb65: 'CURB-65', ipss: 'IPSS', framingham: 'Framingham', stopbang: 'STOP-BANG',
  epworth: 'Epworth', aria: 'ARIA', act: 'ACT', cat: 'CAT',
}

export default function Scores() {
  const [searchParams, setSearchParams] = useSearchParams()
  const focus = searchParams.get('focus')

  const handleBack = () => setSearchParams({})

  if (focus && focusTitle[focus]) {
    return <FocusedScore id={focus} onBack={handleBack} />
  }

  return (
    <div className="page" style={{ paddingTop: 0 }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--on-surface)' }}>Clinical Scores & Scales</h2>
        <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.9rem', marginTop: 4 }}>Validated assessment tools for clinical decision support.</p>
      </div>

      <div className="scores-bento">
        {scoreMeta.map(meta => (
          <ScoreCard key={meta.id} meta={meta} />
        ))}
      </div>
    </div>
  )
}

function ScoreCard({ meta }) {
  const [expanded, setExpanded] = useState(false)
  const [result, setResult] = useState(null)

  const scoreData = getScoreData(meta.id)

  const handleToggle = () => {
    if (!result) setExpanded(o => !o)
  }

  const handleCalculate = (val) => {
    setResult(val)
  }

  const handleClear = () => {
    setResult(null)
    setExpanded(false)
  }

  return (
    <div className="score-card" onClick={handleToggle}>
      <div className="score-card-header">
        <div>
          <div className="score-card-category">{meta.category}</div>
          <div className="score-card-title">{meta.title}</div>
        </div>
        <span className="material-symbols-outlined score-card-icon">{meta.icon}</span>
      </div>
      <p className="score-card-desc">{meta.desc}</p>

      <div className={`score-card-form ${expanded ? 'open' : ''}`} onClick={e => e.stopPropagation()}>
        <div className="score-form-divider" />
        {scoreData && (
          <InlineForm
            scoreId={meta.id}
            scoreData={scoreData}
            onCalculate={handleCalculate}
            onClear={handleClear}
          />
        )}
      </div>

      {result && (
        <div className={`score-card-result open`} onClick={e => e.stopPropagation()}>
          <div className="score-card-result-inner" style={{ '--result-color': result.color }}>
            <div className="result-text">{result.formatted || `${result.total} — ${result.label}`}</div>
            {result.badge && <div className="result-text">{result.badge}</div>}
            {result.recommendation && (
              <div className="result-text result-text-rec">{result.recommendation}</div>
            )}
            {result.qolFormatted && (
              <div className="result-text result-text-qol">{result.qolFormatted}</div>
            )}
            <button className="btn btn-secondary" style={{ marginTop: '8px' }} onClick={handleClear}>Clear</button>
          </div>
        </div>
      )}
    </div>
  )
}

function InlineForm({ scoreId, scoreData, onCalculate, onClear }) {

  if (scoreId === 'curb65' && scoreData.inputs) {
    return <SimpleScoreForm scoreData={scoreData} onCalculate={onCalculate} onClear={onClear} />
  }
  if (scoreId === 'cha2ds2vasc' && scoreData.inputs) {
    return <SimpleScoreForm scoreData={scoreData} onCalculate={onCalculate} onClear={onClear} />
  }
  if (scoreId === 'hasbled' && scoreData.inputs) {
    return <SimpleScoreForm scoreData={scoreData} onCalculate={onCalculate} onClear={onClear} />
  }
  if (scoreId === 'framingham' && scoreData.inputs) {
    return <SimpleScoreForm scoreData={scoreData} onCalculate={onCalculate} onClear={onClear} />
  }
  if (scoreId === 'stopbang' && scoreData.items) {
    return <StopbangForm scoreData={scoreData} onCalculate={onCalculate} onClear={onClear} />
  }
  if (scoreId === 'epworth' && scoreData.questions) {
    return <QuestionnaireForm scoreData={scoreData} onCalculate={onCalculate} onClear={onClear} max={3} />
  }
  if (scoreId === 'ipss') {
    return <IpssForm scoreData={scoreData} onCalculate={onCalculate} onClear={onClear} />
  }
  if (scoreId === 'aria') {
    return <AriaForm scoreData={scoreData} onCalculate={onCalculate} onClear={onClear} />
  }
  if (scoreId === 'act' && scoreData.questions) {
    return <ActForm scoreData={scoreData} onCalculate={onCalculate} onClear={onClear} />
  }
  if (scoreId === 'cat' && scoreData.questions) {
    return <CatForm scoreData={scoreData} onCalculate={onCalculate} onClear={onClear} />
  }
  if (scoreData && scoreData.questions) {
    return <QuestionnaireForm scoreData={scoreData} onCalculate={onCalculate} onClear={onClear} max={scoreData.maxScore > 21 ? 5 : 3} />
  }
  return null
}

function SimpleScoreForm({ scoreData, onCalculate }) {
  const [vals, setVals] = useState({})
  const set = (k) => (e) => setVals(v => ({ ...v, [k]: e.target.value }))

  const calc = () => {
    const total = scoreData.calculate(vals)
    const cat = scoreData.getCategory(total)
    onCalculate({ total, ...cat })
  }

  return (
    <div>
      <div className="score-inputs">
        {scoreData.inputs.map(inp =>
          inp.type === 'number' ? (
            <input key={inp.key} type="number" placeholder={inp.label} value={vals[inp.key] || ''} onChange={set(inp.key)} min={inp.min} max={inp.max} step={inp.step || 1} />
          ) : (
            <select key={inp.key} value={vals[inp.key] || '0'} onChange={set(inp.key)}>
              {inp.options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          )
        )}
      </div>
      <div className="calc-actions">
        <button className="btn btn-primary" onClick={calc}>Calculate</button>
      </div>
    </div>
  )
}

function QuestionnaireForm({ scoreData, onCalculate, max }) {
  const [answers, setAnswers] = useState({})
  const setAns = (key) => (e) => setAnswers(a => ({ ...a, [key]: Number(e.target.value) }))

  const calc = () => {
    const total = scoreData.questions.reduce((sum, q) => sum + (answers[q.key] || 0), 0)
    const cat = scoreData.getCategory(total)
    onCalculate({ total, ...cat })
  }

  return (
    <div>
      <div className="questionnaire">
        {scoreData.questions.map(q => (
          <div key={q.key} className="score-form-question">
            <label>{q.text}</label>
            <div className="score-form-options">
              {[0, 1, 2, 3].concat(max > 3 ? [4, 5] : []).map(v => (
                <button
                  key={v}
                  className={`score-opt ${answers[q.key] === v ? 'selected' : ''}`}
                  onClick={() => setAns(q.key)({ target: { value: v } })}
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
      </div>
    </div>
  )
}

function StopbangForm({ scoreData, onCalculate }) {
  const [vals, setVals] = useState({})
  const set = (k) => (e) => setVals(v => ({ ...v, [k]: e.target.value }))

  const calc = () => {
    const total = scoreData.calculate(vals)
    const cat = scoreData.getCategory(total)
    onCalculate({ total, ...cat })
  }

  return (
    <div>
      <div className="questionnaire">
        {scoreData.items.map(item => (
          <div key={item.key} className="score-form-question">
            <label>{item.question}</label>
            <div className="score-form-options">
              <button className={`score-opt ${vals[item.key] === '0' ? 'selected' : ''}`} onClick={() => set(item.key)({ target: { value: '0' } })}>No</button>
              <button className={`score-opt ${vals[item.key] === '1' ? 'selected' : ''}`} onClick={() => set(item.key)({ target: { value: '1' } })}>Yes</button>
            </div>
          </div>
        ))}
      </div>
      <div className="calc-actions">
        <button className="btn btn-primary" onClick={calc}>Calculate</button>
      </div>
    </div>
  )
}

function IpssForm({ scoreData, onCalculate }) {
  const [answers, setAnswers] = useState({})
  const [qol, setQol] = useState(null)
  const setAns = (key) => (e) => setAnswers(a => ({ ...a, [key]: Number(e.target.value) }))

  const calc = () => {
    const total = scoreData.questions.reduce((sum, q) => sum + (answers[q.key] || 0), 0)
    const cat = scoreData.getCategory(total)
    const qolScore = qol !== null ? qol : null
    const qolCat = qolScore !== null ? scoreData.qol.options.find(o => o.value === qolScore) : null
    const formatted = `IPSS : ${total}/${scoreData.maxScore} ${cat.label}`
    const qolFormatted = qolScore !== null ? `QoL : ${qolScore}/6 ${qolCat?.label}` : null
    onCalculate({ total, formatted, qolFormatted, qol: qolScore, qolLabel: qolCat?.label, ...cat })
  }

  return (
    <div>
      <div className="ipss-legend">
        <div className="ipss-legend-col">
          {scoreData.symptomOptions.slice(0, 3).map(o => (
            <div key={o.value} className="ipss-legend-item">
              <span className="ipss-legend-num">{o.value}</span>
              <span className="ipss-legend-text">{o.label}</span>
            </div>
          ))}
        </div>
        <div className="ipss-legend-col">
          {scoreData.symptomOptions.slice(3).map(o => (
            <div key={o.value} className="ipss-legend-item">
              <span className="ipss-legend-num">{o.value}</span>
              <span className="ipss-legend-text">{o.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="questionnaire">
        {scoreData.questions.map(q => (
          <div key={q.key} className="score-form-question">
            <label>{q.text}</label>
            <div className="score-form-options">
              {[0, 1, 2, 3, 4, 5].map(v => (
                <button
                  key={v}
                  className={`score-opt ${answers[q.key] === v ? 'selected' : ''}`}
                  onClick={() => setAns(q.key)({ target: { value: v } })}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="score-form-question" style={{ marginTop: '12px' }}>
        <label>Quality of Life — {scoreData.qol.text}</label>
        <div className="score-form-options">
          {scoreData.qol.options.map(o => (
            <button
              key={o.value}
              className={`score-opt ${qol === o.value ? 'selected' : ''}`}
              onClick={() => setQol(o.value)}
            >
              {o.value}
            </button>
          ))}
        </div>
      </div>

      <div className="ipss-legend">
        <div className="ipss-legend-col">
          {scoreData.qol.options.slice(0, 4).map(o => (
            <div key={o.value} className="ipss-legend-item">
              <span className="ipss-legend-num">{o.value}</span>
              <span className="ipss-legend-text">{o.label}</span>
            </div>
          ))}
        </div>
        <div className="ipss-legend-col">
          {scoreData.qol.options.slice(4).map(o => (
            <div key={o.value} className="ipss-legend-item">
              <span className="ipss-legend-num">{o.value}</span>
              <span className="ipss-legend-text">{o.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="calc-actions">
        <button className="btn btn-primary" onClick={calc}>Calculate</button>
      </div>
    </div>
  )
}

function ActForm({ scoreData, onCalculate }) {
  const [answers, setAnswers] = useState({})
  const setAns = (key) => (e) => setAnswers(a => ({ ...a, [key]: Number(e.target.value) }))

  const calc = () => {
    const total = scoreData.questions.reduce((sum, q) => sum + (answers[q.key] || 0), 0)
    const cat = scoreData.getCategory(total)
    onCalculate({ total, ...cat })
  }

  return (
    <div>
      <div className="questionnaire">
        {scoreData.questions.map(q => (
          <div key={q.key} className="score-form-question">
            <label>{q.text}</label>
            <div className="score-form-options">
              {[1, 2, 3, 4, 5].map(v => (
                <button
                  key={v}
                  className={`score-opt ${answers[q.key] === v ? 'selected' : ''}`}
                  onClick={() => setAns(q.key)({ target: { value: v } })}
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
      </div>
    </div>
  )
}

function CatForm({ scoreData, onCalculate }) {
  const [answers, setAnswers] = useState({})
  const setAns = (key) => (e) => setAnswers(a => ({ ...a, [key]: Number(e.target.value) }))

  const calc = () => {
    const total = scoreData.questions.reduce((sum, q) => sum + (answers[q.key] || 0), 0)
    const cat = scoreData.getCategory(total)
    onCalculate({ total, ...cat })
  }

  return (
    <div>
      <div className="questionnaire">
        {scoreData.questions.map(q => (
          <div key={q.key} className="score-form-question">
            <label>{q.text}</label>
            <div className="score-form-options">
              {[0, 1, 2, 3, 4, 5].map(v => (
                <button
                  key={v}
                  className={`score-opt ${answers[q.key] === v ? 'selected' : ''}`}
                  onClick={() => setAns(q.key)({ target: { value: v } })}
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
      </div>
    </div>
  )
}

function AriaForm({ scoreData }) {
  const [duration, setDuration] = useState('intermittent')
  const [severity, setSeverity] = useState({})
  const toggle = (key) => () => setSeverity(s => ({ ...s, [key]: !s[key] }))
  const severityCount = Object.values(severity).filter(Boolean).length

  const result = scoreData.getCategory(duration, severityCount)

  return (
    <div>
      <div className="widget-label">Duration</div>
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
      <div className="widget-label">Severity — tick if present</div>
      <div className="checkbox-group">
        {scoreData.severityItems.map(item => (
          <label key={item.key} className="checkbox-row">
            <input type="checkbox" checked={!!severity[item.key]} onChange={toggle(item.key)} />
            {item.label}
          </label>
        ))}
      </div>
      {result && (
        <div className="calc-result" style={{ '--result-color': result.color, marginTop: 0 }}>
          Classification: <strong>{result.label}</strong>
        </div>
      )}
    </div>
  )
}

function FocusedScore({ id, onBack }) {
  return (
    <div className="page">
      <button className="focus-back" onClick={onBack}>
        <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>arrow_back</span>
        All Scores & Scales
      </button>
      <h1 style={{ marginBottom: '16px' }}>{focusTitle[id] || 'Score'}</h1>
      <div className="scores-bento" style={{ gridTemplateColumns: '1fr' }}>
        <ScoreCard meta={scoreMeta.find(m => m.id === id)} />
      </div>
    </div>
  )
}

function getScoreData(id) {
  const map = {
    phq9, gad7, framingham, ipss, curb65, cha2ds2vasc, hasbled,
    stopbang, epworth, aria, act, cat, 'cv-risk-htn': cvRiskHtn,
  }
  return map[id]
}
