import { writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const BASE = 'https://pharmacy.moh.gov.my/ms/apps/fukkm'
const OUTPUT = resolve(__dirname, '..', 'public', 'fukkm-drugs.json')

function decodeHtmlEntities(text) {
  return text
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(code))
}

function extractRows(html) {
  const rows = []
  const rowRegex = /<tr\s[^>]*class="[^"]*(?:odd|even)[^"]*"[^>]*>([\s\S]*?)<\/tr>/gi
  let match
  while ((match = rowRegex.exec(html)) !== null) {
    rows.push(match[1])
  }
  return rows
}

function extractColumn(html, className) {
  const escaped = className.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const re = new RegExp(`<td[^>]*class="[^"]*${escaped}[^"]*">([\\s\\S]*?)<\\/td>`, 'i')
  const m = html.match(re)
  if (!m) return null
  return decodeHtmlEntities(m[1].trim())
}

const NO_RECORD = 'No record found'

async function scrapePage(pageIndex) {
  const url = pageIndex === 0 ? BASE : `${BASE}?page=${pageIndex}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status} for page ${pageIndex}`)
  const html = await res.text()
  if (html.includes(NO_RECORD)) return null

  const tableRows = extractRows(html)
  const drugs = []

  for (const rowHtml of tableRows) {
    const num = extractColumn(rowHtml, 'views-field-counter')
    if (!num) continue

    const genericName = extractColumn(rowHtml, 'views-field-text')
    const mdcCode = extractColumn(rowHtml, 'views-field-text-1')
    const prescriberCategory = extractColumn(rowHtml, 'views-field-text-2')
    const indications = extractColumn(rowHtml, 'views-field-text-3')
    const prescribingRestrictions = extractColumn(rowHtml, 'views-field-text-5')
    const dosages = extractColumn(rowHtml, 'views-field-text-4')

    if (!genericName) continue

    drugs.push({
      genericName,
      mdcCode: mdcCode || null,
      prescriberCategory: prescriberCategory || null,
      indications: indications || null,
      prescribingRestrictions: prescribingRestrictions || null,
      dosages: dosages || null,
    })
  }

  return drugs
}

async function main() {
  console.log('Scraping FUKKM drug formulary...')
  const allDrugs = []
  const startTime = Date.now()
  let page = 0

  while (true) {
    process.stdout.write(`  Page ${page + 1}... `)
    try {
      const drugs = await scrapePage(page)
      if (drugs === null) {
        console.log('(no more data)')
        break
      }
      allDrugs.push(...drugs)
      console.log(`${drugs.length} drugs (total: ${allDrugs.length})`)
      page++
    } catch (err) {
      console.error(`ERROR: ${err.message}`)
      break
    }
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1)
  console.log(`\nDone! Scraped ${allDrugs.length} drugs from ${page} pages in ${elapsed}s`)

  const output = {
    metadata: {
      source: 'FUKKM - Formulari Ubat Kementerian Kesihatan Malaysia',
      url: BASE,
      scrapedAt: new Date().toISOString(),
      totalDrugs: allDrugs.length,
    },
    drugs: allDrugs,
  }

  writeFileSync(OUTPUT, JSON.stringify(output, null, 2), 'utf-8')
  console.log(`Saved to ${OUTPUT}`)
}

main().catch(err => {
  console.error('Fatal:', err)
  process.exit(1)
})
