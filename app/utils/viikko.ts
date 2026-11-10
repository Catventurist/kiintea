export type Tulos = 'ok' | 'osittain' | 'ei'
export type Päivä = 'ma' | 'ti' | 'ke' | 'to' | 'pe' | 'la' | 'su'
export type Päättely = 'kaikki' | 'enemmistö' | 'superenemmistö' | 'pluriteetti' | 'konsensus'

const PÄIVÄT: Päivä[] = ['ma', 'ti', 'ke', 'to', 'pe', 'la', 'su']

export function nykyViikko(d = new Date()): number {
  const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
  t.setUTCDate(t.getUTCDate() + 4 - (t.getUTCDay() || 7))
  const alku = new Date(Date.UTC(t.getUTCFullYear(), 0, 1))
  return Math.ceil(((t.getTime() - alku.getTime()) / 86_400_000 + 1) / 7)
}

export function nykyPäivä(d = new Date()): Päivä {
  return PÄIVÄT[(d.getDay() + 6) % 7]!
}

export function päivätAstiTänään(): Päivä[] {
  return PÄIVÄT.slice(0, PÄIVÄT.indexOf(nykyPäivä()) + 1)
}

const enc = new TextEncoder()
const toB64 = (b: Uint8Array) => btoa(String.fromCharCode(...b))
const fromB64 = (s: string) => Uint8Array.from(atob(s), c => c.charCodeAt(0))

export async function deriveKey(passphrase: string, kääre: string): Promise<CryptoKey> {
  const base = await crypto.subtle.importKey('raw', enc.encode(passphrase), 'PBKDF2', false, ['deriveKey'])
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: enc.encode(`viikko:${kääre}`), iterations: 600_000, hash: 'SHA-256' },
    base,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  )
}

export async function encrypt(key: CryptoKey, plaintext: Tulos): Promise<string> {
  const nonce = crypto.getRandomValues(new Uint8Array(12))
  const ct = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv: nonce }, key, enc.encode(plaintext)))
  const out = new Uint8Array(12 + ct.length)
  out.set(nonce)
  out.set(ct, 12)
  return toB64(out)
}

export async function decrypt(key: CryptoKey, bitti: string): Promise<Tulos | null> {
  try {
    const raw = fromB64(bitti)
    const pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: raw.slice(0, 12) }, key, raw.slice(12))
    const tulos = new TextDecoder().decode(pt)
    return tulos === 'ok' || tulos === 'osittain' || tulos === 'ei' ? tulos : null
  } catch {
    return null
  }
}

type Määrät = { ok: number, osittain: number, ei: number }

function arvioi(m: Määrät, päättely: Päättely, kuorum: number | undefined, lukumäärä: number) {
  const yhteensä = m.ok + m.osittain + m.ei
  if (!yhteensä) return false
  if (kuorum && lukumäärä < kuorum) return false

  const rate = (m.ok + m.osittain) / yhteensä

  switch (päättely) {
    case 'kaikki': return m.ei === 0
    case 'enemmistö': return rate > 0.5
    case 'superenemmistö': return rate >= 2 / 3
    case 'pluriteetti': return m.ei < Math.max(m.ok, m.osittain)
    case 'konsensus': return m.ei === 0 && m.osittain === 0
  }
}

export function laanna(tulokset: Tulos[], päättely: Päättely, kuorum?: number) {
  const m: Määrät = { ok: 0, osittain: 0, ei: 0 }
  tulokset.forEach(t => m[t]++)
  return arvioi(m, päättely, kuorum, tulokset.length)
}

export function painotettu(
  tulokset: { juttu: string, paino: number, päivät: (Tulos | null)[] }[],
  päättely: Päättely,
  kuorum?: number
) {
  const m: Määrät = { ok: 0, osittain: 0, ei: 0 }
  let kirjattuja = 0

  for (const j of tulokset) {
    for (const t of j.päivät) {
      if (!t) continue
      m[t] += j.paino
      kirjattuja++
    }
  }

  return arvioi(m, päättely, kuorum, kirjattuja)
}
