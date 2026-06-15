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

export function searchDrugs(query, drugs) {
  if (!query.trim()) return []
  const q = query.toLowerCase()
  return drugs.filter(d =>
    d.genericName?.toLowerCase().includes(q) ||
    d.brandName?.toLowerCase().includes(q) ||
    d.synonyms?.toLowerCase().includes(q) ||
    d.genericNameSearch?.toLowerCase().includes(q)
  )
}

export function getDrugById(id, drugs) {
  return drugs.find(d => d.id === id) || null
}

export function clearCache() {
  cachedDrugs = null
}
