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
      .sort((a, b) => tokenScore(b, q) - tokenScore(a, q))
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
    return sb - sa
  })
}

export function getDrugById(id, drugs) {
  return drugs.find(d => d.id === id) || null
}

export function clearCache() {
  cachedDrugs = null
}
