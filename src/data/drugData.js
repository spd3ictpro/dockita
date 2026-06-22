const DRUGS_URL = `${import.meta.env.BASE_URL}drugs.json`

let cachedDrugs = null

export async function fetchDrugs() {
  if (cachedDrugs) return cachedDrugs
  const res = await fetch(DRUGS_URL)
  if (!res.ok) throw new Error('Failed to load drug data')
  const json = await res.json()
  cachedDrugs = json.drugs || []
  return cachedDrugs
}

const searchable = (drug) => ({
  gn: (drug.genericName || '').toLowerCase(),
  gnSearch: (drug.genericNameSearch || '').toLowerCase(),
  bnSearch: (drug.brandNameSearch || '').toLowerCase(),
  snSearch: (drug.synonymsSearch || '').toLowerCase(),
})

function tokenMatch(drug, token) {
  const s = searchable(drug)
  return s.gnSearch.includes(token)
    || s.bnSearch.includes(token)
    || s.snSearch.includes(token)
}

function tokenScore(drug, token) {
  const s = searchable(drug)
  if (s.gn === token) return 5
  if (s.gn.startsWith(token)) return 3
  if (s.gnSearch.includes(token) || s.bnSearch.includes(token)) return 2
  if (s.snSearch.includes(token)) return 1
  return 0
}

export function searchDrugs(query, drugs) {
  if (!query.trim()) return []
  const tokens = query.toLowerCase().trim().split(/\s+/).filter(Boolean)

  if (tokens.length === 1) {
    const q = tokens[0]
    return drugs.filter(d => tokenMatch(d, q))
      .sort((a, b) => {
        const diff = tokenScore(b, q) - tokenScore(a, q)
        return diff !== 0 ? diff : a.genericName.length - b.genericName.length
      })
  }

  const allMatch = drug => tokens.every(t => tokenMatch(drug, t))
  let results = drugs.filter(allMatch)

  if (results.length === 0) {
    const anyMatch = drug => tokens.some(t => tokenMatch(drug, t))
    results = drugs.filter(anyMatch)
  }

  return results.sort((a, b) => {
    const sa = tokens.reduce((sum, t) => sum + tokenScore(a, t), 0)
    const sb = tokens.reduce((sum, t) => sum + tokenScore(b, t), 0)
    const diff = sb - sa
    return diff !== 0 ? diff : a.genericName.length - b.genericName.length
  })
}

function extractPops(text) {
  const rx = /(<strong>(?:Adult|Child(?:ren)?|Neonate|Infant|Pediatric)(?:<br\s*\/?>)?[^<]*<\/strong>)/i
  const parts = text.split(rx)
  if (parts.length < 2) return { general: text }

  const pops = { adult: [], child: [], neonate: [] }
  let firstPop = null

  for (let i = 1; i < parts.length; i += 2) {
    const marker = parts[i] || ''
    let content = (parts[i + 1] || '').trim()
    if (/<strong>Adult/i.test(marker)) {
      pops.adult.push(content); if (!firstPop) firstPop = 'adult'
    } else if (/<strong>Child(?:ren)?/i.test(marker)) {
      pops.child.push(content); if (!firstPop) firstPop = 'child'
    } else if (/<strong>(?:Neonate|Infant)/i.test(marker)) {
      pops.neonate.push(content); if (!firstPop) firstPop = 'neonate'
    }
  }

  const preamble = (parts[0] || '').replace(/^(?:<br\s*\/?>\s*)+/i, '').trim()
  if (preamble && firstPop && pops[firstPop].length > 0) {
    pops[firstPop][0] = preamble + ' ' + pops[firstPop][0]
  }

  const result = {}
  if (pops.adult.length > 0) result.adult = pops.adult.join('<br>')
  if (pops.child.length > 0) result.child = pops.child.join('<br>')
  if (pops.neonate.length > 0) result.neonate = pops.neonate.join('<br>')
  return Object.keys(result).length > 0 ? result : { general: text }
}

export function parseDosages(dosage) {
  if (!dosage) return null
  let text = dosage.replace(/^<p>/i, '').replace(/<\/p>$/i, '').trim()
  const hasPop = /<strong>(?:Adult|Child(?:ren)?|Neonate|Infant|Pediatric)[^<]*<\/strong>/i.test(text)
  if (!hasPop) return { sections: [{ label: null, general: dosage }] }

  const indRx = /(?:<br\s*\/?>\s*)*(?:Indication\s*)?\(([ivxlcdm]+)\)\s*(?:<br\s*\/?>)*/gi
  const parts = text.split(indRx)
  const sections = []

  if (parts.length > 1) {
    for (let i = 1; i < parts.length; i += 2) {
      const num = parts[i]
      const content = (parts[i + 1] || '').trim()
      sections.push({ label: `Indication (${num})`, ...extractPops(content) })
    }
  } else {
    sections.push({ label: null, ...extractPops(text) })
  }

  return { sections }
}

export function getDrugById(id, drugs) {
  return drugs.find(d => d.id === id) || null
}

export function clearCache() {
  cachedDrugs = null
}
