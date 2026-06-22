import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { framingham, ipss, phq9, gad7, curb65, act, cat, aria, stopbang, epworth, cha2ds2vasc, hasbled, cvRiskHtn } from '../data/scoresData'

const scoreMeta = [
  { id: 'psychiatric', icon: 'psychiatry', category: 'Mental Health', title: 'Psychiatric Assessment', desc: 'PHQ-9 and GAD-7 screening tools for depression and anxiety.' },
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

export default function Scores() {
  const navigate = useNavigate()

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
  const navigate = useNavigate()

  return (
    <div className="score-card" onClick={() => navigate('/scores/' + meta.id)}>
      <div className="score-card-header">
        <div>
          <div className="score-card-category">{meta.category}</div>
          <div className="score-card-title">{meta.title}</div>
        </div>
        <span className="material-symbols-outlined score-card-icon">{meta.icon}</span>
      </div>
      <p className="score-card-desc">{meta.desc}</p>
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
    return <IpssForm scoreData={scoreData} />
  }
  if (scoreId === 'psychiatric') {
    return <PsyForm />
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

const psySubLabels = ['Not at all', 'Several days', 'More than half the days', 'Nearly every day']

const psyRecs = {
  phq9: [
    { max: 4,  label: 'Minimal Depression',     cls: 'minimal',      rec: 'None. Monitor at next clinical follow-up.' },
    { max: 9,  label: 'Mild Depression',         cls: 'mild',         rec: 'Watchful waiting; repeat PHQ-9 at follow-up.' },
    { max: 14, label: 'Moderate Depression',     cls: 'moderate',     rec: 'Treatment plan, considering counseling, follow-up and/or pharmacotherapy.' },
    { max: 19, label: 'Moderately Severe Depression', cls: 'moderately-severe', rec: 'Active treatment with pharmacotherapy and/or psychotherapy.' },
    { max: 27, label: 'Severe Depression',       cls: 'severe',       rec: 'Immediate initiation of pharmacotherapy and, if severe impairment, referral to specialist.' },
  ],
  gad7: [
    { max: 4,  label: 'Minimal Anxiety',  cls: 'minimal', rec: 'None. Monitor at next follow-up.' },
    { max: 9,  label: 'Mild Anxiety',     cls: 'mild',    rec: 'Watchful waiting; repeat GAD-7 at follow-up.' },
    { max: 14, label: 'Moderate Anxiety', cls: 'moderate', rec: 'Further evaluation and potential therapy required.' },
    { max: 21, label: 'Severe Anxiety',   cls: 'severe',  rec: 'Initiate active treatment and/or referral to mental health specialist.' },
  ],
}

function PsyForm() {
  const [active, setActive] = useState('phq9')
  const [answers, setAnswers] = useState({})
  const navigate = useNavigate()

  const scale = active === 'phq9' ? phq9 : gad7
  const questions = scale.questions
  const total = questions.reduce((sum, q) => sum + (answers[`${active}_${q.key}`] || 0), 0)
  const allDone = questions.every(q => answers[`${active}_${q.key}`] !== undefined)
  const rec = allDone ? psyRecs[active].find(r => total <= r.max) : null

  const setScore = (qKey, val) => setAnswers(a => ({ ...a, [`${active}_${qKey}`]: val }))

  const switchScale = (id) => {
    setActive(id)
    setAnswers({})
  }

  const handleReset = () => setAnswers({})

  return (
    <div className="page">
      <button className="focus-back" onClick={() => navigate('/scores')}>
        <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>arrow_back</span>
        All Scores & Scales
      </button>

      <div className="psych-header">
        <div>
          <h2 className="psych-header-title">Psychiatric Assessment</h2>
          <p className="psych-header-sub">Standardized screening tools for Depression and Anxiety management.</p>
        </div>
        <div className="psych-toggle">
          <button className={`psych-toggle-btn${active === 'phq9' ? ' active' : ''}`} onClick={() => switchScale('phq9')}>PHQ-9</button>
          <button className={`psych-toggle-btn${active === 'gad7' ? ' active' : ''}`} onClick={() => switchScale('gad7')}>GAD-7</button>
        </div>
      </div>

      <div className="psych-layout">
        <div className="psych-inputs">
          <section className="psych-card">
            <div className="psych-card-header psych-card-header-psy">
              <h3>
                <span className="material-symbols-outlined">clinical_notes</span>
                {scale.title.split(' — ')[0]}
              </h3>
              <div className="psych-btn-group psych-btn-group-header">
                {psySubLabels.map((label, i) => (
                  <span key={i} className="psych-btn-header">{label}</span>
                ))}
              </div>
            </div>

            <div className="psych-rows">
              {questions.map((q, i) => {
                const key = `${active}_${q.key}`
                return (
                  <div key={key} className="psych-row">
                    <div className="psych-question">
                      <p><strong>{i + 1}.</strong> {q.text}</p>
                    </div>
                    <div className="psych-btn-group">
                      {[0, 1, 2, 3].map(v => (
                        <button
                          key={v}
                          className={`psych-btn${answers[key] === v ? ' selected' : ''}`}
                          onClick={() => setScore(q.key, v)}
                        >
                          <span className="psych-btn-num">{v}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        </div>

        <div className="psych-results">
          <div className={`psych-card psych-result-card${allDone && rec ? ` psych-result-card-${rec.cls}` : ''}`}>
            <p className="psych-result-label">Total Assessment Score</p>
            <div className="psych-result-main">
              <span className="psych-result-num">{total}</span>
              <span className="psych-result-max">/ {scale.maxScore}</span>
            </div>
            {allDone && rec && (
              <span className={`psych-chip psych-chip-${rec.cls}`}>{rec.label.toUpperCase()}</span>
            )}
            {!allDone && (
              <span className="psych-chip psych-chip-empty">UNSCORED</span>
            )}
          </div>

          <div className="psych-card psych-interp-card">
            <div className="psych-card-header">
              <h4 className="psych-interp-heading">
                <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: '1.25rem' }}>clinical_notes</span>
                Clinical Interpretation
              </h4>
            </div>
            <div className="psych-interp-body">
              <p className="psych-interp-label">Recommendation</p>
              <p className="psych-interp-text">
                {allDone && rec ? rec.rec : 'Score has not been calculated. Please complete the questionnaire to see professional guidance.'}
              </p>
            </div>
          </div>

          <div className="psych-card psych-actions-card">
            <button className="psych-btn-action psych-btn-save" onClick={() => {}}>
              <span className="material-symbols-outlined" style={{ fontSize: '1rem', fontVariationSettings: "'FILL' 1" }}>save</span>
              Save to Patient Record
            </button>
            <button className="psych-btn-action psych-btn-print" onClick={() => window.print()}>
              <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>print</span>
              Print Referral Note
            </button>
            <button className="psych-btn-action psych-btn-clear" onClick={handleReset}>
              <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>restart_alt</span>
              Clear Assessment
            </button>
          </div>
        </div>
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

function IpssForm({ scoreData }) {
  const [answers, setAnswers] = useState({})
  const [qol, setQol] = useState(null)

  const answered = Object.keys(answers).length
  const allAnswered = answered === 7
  const total = allAnswered ? scoreData.questions.reduce((sum, q) => sum + (answers[q.key] || 0), 0) : 0
  const cat = allAnswered ? scoreData.getCategory(total) : null
  const qolCat = qol !== null ? scoreData.qol.options.find(o => o.value === qol) : null
  const qolResult = qol !== null ? scoreData.qol.getCategory(qol) : null

  const handleSelect = (key) => (value) => {
    setAnswers(prev => ({ ...prev, [key]: value }))
  }

  const handleReset = () => {
    setAnswers({})
    setQol(null)
  }

  return (
    <div className="ipss-layout">
      <div className="ipss-inputs">
        <section className="ipss-card">
          <div className="ipss-card-header">
            <h3>
              <span className="material-symbols-outlined">clinical_notes</span>
              Symptom Assessment
            </h3>
            <span className="ipss-badge">Past 1 month</span>
          </div>

          <div className="ipss-table-header">
            <span className="ipss-table-label">Symptom Question</span>
            {["Not at all", "Less than 1 in 5", "Less than half", "About half", "More than half", "Almost always"].map((label, i) => (
              <span key={i} className="ipss-table-col">{label}</span>
            ))}
          </div>

          <div className="ipss-rows">
            {scoreData.questions.map(q => (
              <div key={q.key} className="ipss-row">
                <div className="ipss-question">
                  <p>{q.text.split(' — ')[0] || q.text}</p>
                  {q.text.split(' — ')[1] && (
                    <p className="ipss-question-desc">{q.text.split(' — ')[1]}</p>
                  )}
                </div>
                <div className="ipss-options">
                  {[0, 1, 2, 3, 4, 5].map(v => (
                    <label key={v} className="ipss-option">
                      <input
                        type="radio"
                        name={q.key}
                        value={v}
                        checked={answers[q.key] === v}
                        onChange={() => handleSelect(q.key)(v)}
                      />
                      <span className="ipss-option-btn">{v}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="ipss-card">
          <div className="ipss-card-header">
            <h3>
              <span className="material-symbols-outlined">sentiment_satisfied</span>
              Quality of Life
            </h3>
          </div>
          <p className="ipss-qol-text">{scoreData.qol.text}</p>
          <div className="ipss-qol-options">
            {scoreData.qol.options.map(o => (
              <label key={o.value} className="ipss-qol-option">
                <input
                  type="radio"
                  name="qol"
                  value={o.value}
                  checked={qol === o.value}
                  onChange={() => setQol(o.value)}
                />
                <span className="ipss-option-btn">{o.value}</span>
                <span className="ipss-qol-label">{o.label}</span>
              </label>
            ))}
          </div>
        </section>
      </div>

      <div className="ipss-results">
        <section className="ipss-card ipss-card-sticky">
          <h3>Results</h3>

          <div className={`ipss-result-total${allAnswered && cat ? ` ipss-result-total-${cat.label.toLowerCase()}` : ''}`}>
            <p>Total Score</p>
            <p className="ipss-result-number">
              {allAnswered ? total : '\u2014\u2014'}
            </p>
            {allAnswered && cat && (
              <p className="ipss-result-severity-text">{cat.label}</p>
            )}
            {!allAnswered && (
              <span className="ipss-result-severity-muted">
                Complete all questions
              </span>
            )}
          </div>

          <div className={`ipss-result-total${qolResult ? ` ipss-result-total-${qolResult.label.toLowerCase()}` : ''}`}>
            <p>Quality of Life</p>
            <p className="ipss-result-number">
              {qol !== null ? qol : '\u2014\u2014'}
            </p>
            {qol !== null && qolCat && (
              <p className="ipss-result-severity-text">{qolCat.label}</p>
            )}
            {qol === null && (
              <span className="ipss-result-severity-muted">Select quality of life</span>
            )}
          </div>

          <button className="ipss-btn ipss-btn-primary" onClick={() => window.print()}>
            <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>print</span>
            Print Results
          </button>
          <button className="ipss-btn ipss-btn-secondary" onClick={handleReset}>
            <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>restart_alt</span>
            Reset
          </button>
        </section>

        <section className="ipss-card-interp">
          <h4>Clinical Interpretation</h4>
          <ul className="ipss-interp-list">
            <li>
              <span className="ipss-interp-dot ipss-interp-dot-green" />
              <span><strong>0–7 (Mild):</strong> Generally watchful waiting or minimal intervention required.</span>
            </li>
            <li>
              <span className="ipss-interp-dot ipss-interp-dot-amber" />
              <span><strong>8–19 (Moderate):</strong> Medical management (alpha-blockers, 5-ARIs) often indicated.</span>
            </li>
            <li>
              <span className="ipss-interp-dot ipss-interp-dot-red" />
              <span><strong>20–35 (Severe):</strong> Consider surgical intervention or specialized referral.</span>
            </li>
          </ul>
          <p className="ipss-interp-note">Note: IPSS is a tool for symptom quantification and treatment monitoring. It does not replace clinical diagnosis (e.g., DRE, PSA).</p>
        </section>
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

export function ScoreDetail() {
  const { scoreId } = useParams()
  const navigate = useNavigate()
  const [result, setResult] = useState(null)

  if (scoreId === 'phq9' || scoreId === 'gad7') {
    navigate('/scores/psychiatric', { replace: true })
    return null
  }

  if (scoreId === 'psychiatric') {
    return <PsyForm />
  }

  const meta = scoreMeta.find(m => m.id === scoreId)
  const scoreData = getScoreData(scoreId)

  const handleCalculate = (val) => setResult(val)
  const handleClear = () => setResult(null)

  if (!meta) {
    return (
      <div className="page">
        <button className="focus-back" onClick={() => navigate('/scores')}>
          <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>arrow_back</span>
          All Scores & Scales
        </button>
        <p>Score not found.</p>
      </div>
    )
  }

  return (
    <div className="page">
      <button className="focus-back" onClick={() => navigate('/scores')}>
        <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>arrow_back</span>
        All Scores & Scales
      </button>

      <div className="score-detail-header">
        <div>
          <div className="score-card-category">{meta.category}</div>
          <h1>{meta.title}</h1>
        </div>
        <span className="material-symbols-outlined score-card-icon">{meta.icon}</span>
      </div>
      <p className="score-detail-desc">{meta.desc}</p>

      <div className="score-detail-form">
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
        <div className="score-detail-result">
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

function getScoreData(id) {
  const map = {
    phq9, gad7, psychiatric: { id: 'psychiatric' }, framingham, ipss, curb65, cha2ds2vasc, hasbled,
    stopbang, epworth, aria, act, cat, 'cv-risk-htn': cvRiskHtn,
  }
  return map[id]
}
