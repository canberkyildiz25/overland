/* ═══════════════════════════════════════════════════════════
   Local fleet "API" — no external calls.
   Reads from our own hand-written data and simulates the async
   shape the app already expects (filters, latency).
   ═══════════════════════════════════════════════════════════ */
import { campers, findCamper } from '../data/campers.js'

const EQUIPMENT = ['AC', 'bathroom', 'kitchen', 'TV', 'radio']

const wait = ms => new Promise(r => setTimeout(r, ms))

export async function fetchCampers(params = {}) {
  await wait(280) // small delay so the loading state is real

  return campers.filter(rig => {
    if (params.location) {
      const q = params.location.trim().toLowerCase()
      if (q && !rig.location.toLowerCase().includes(q)) return false
    }
    if (params.form && rig.form !== params.form) return false
    for (const key of EQUIPMENT) {
      if (params[key] && !rig[key]) return false
    }
    return true
  })
}

export async function fetchCamperById(id) {
  await wait(220)
  const rig = findCamper(id)
  if (!rig) {
    const err = new Error('Rig not found')
    err.response = { data: { message: 'Rig not found' } }
    throw err
  }
  return rig
}
