import type { ViikotEnCollectionItem, ViikotFiCollectionItem } from '@nuxt/content'
import { nykyPäivä, päivätAstiTänään } from '~/utils/viikko'

type Viikko = ViikotEnCollectionItem | ViikotFiCollectionItem
type Päivä = 'ma' | 'ti' | 'ke' | 'to' | 'pe' | 'la' | 'su'
type Tulos = 'ok' | 'osittain' | 'ei'

const päivät: Päivä[] = ['ma', 'ti', 'ke', 'to', 'pe', 'la', 'su']

function arvioTulokseksi(merkintä?: { arvio?: number }): Tulos {
  if (!merkintä) return 'ei'
  if (merkintä.arvio === undefined || merkintä.arvio >= 4) return 'ok'
  return merkintä.arvio >= 2 ? 'osittain' : 'ei'
}

export function useViikkoTulos(viikko: MaybeRefOrGetter<Viikko>) {
  const now = useState('viikko-now', () => Date.now())

  const tänäänIdx = computed(() => {
    const v = toValue(viikko)
    if (v.tila !== 'käynnissä') return 6
    if (!v.lähtö) return Math.min((new Date(now.value).getDay() + 6) % 7, 6)
    const päiviä = Math.floor((now.value - new Date(v.lähtö).getTime()) / 86_400_000)
    return Math.min(Math.max(päiviä, 0), 6)
  })

  const tulokset = computed(() => {
    const v = toValue(viikko)
    return v.jutut.flatMap(j =>
      päivät.slice(0, tänäänIdx.value + 1).map((p) => {
        const merkintä = j.päivät?.find(x => x.päivä === p)
        const tulos = arvioTulokseksi(merkintä)
        const osuma = tulos === 'ok' || (j.kynnys === 'osittain' && tulos === 'osittain')
        return {
          tulos,
          osuma,
          paino: j.paino,
          kirjattu: !!merkintä,
          veto: merkintä?.arvio === 1
        }
      })
    )
  })

  const osumaprosentti = computed(() => {
    const kaikki = tulokset.value.reduce((s, r) => s + r.paino, 0)
    if (!kaikki) return 0
    const osumat = tulokset.value.reduce((s, r) => s + (r.osuma ? r.paino : 0), 0)
    return osumat / kaikki
  })

  const herkku = computed(() => {
    const v = toValue(viikko)
    const rate = osumaprosentti.value
    const kirjattuja = tulokset.value.filter(r => r.kirjattu).length

    if (v.kuorum && kirjattuja < v.kuorum) return false

    switch (v.päättely) {
      case 'kaikki':
        return rate === 1
      case 'enemmistö':
        return rate > 0.5
      case 'superenemmistö':
        return rate >= 2 / 3
      case 'pluriteetti': {
        const määrä = { ok: 0, osittain: 0, ei: 0 }
        tulokset.value.forEach(r => määrä[r.tulos]++)
        return määrä.ei < Math.max(määrä.ok, määrä.osittain)
      }
      case 'konsensus':
        return !tulokset.value.some(r => r.veto)
    }
  })

  return { tulokset, osumaprosentti, herkku, tänäänIdx }
}

type Äänet = Record<string, { tulos: Tulos, muistiinpano?: string }>

const kryptoAvain = shallowRef<CryptoKey | null>(null)
const sisältö = shallowRef<Record<string, Tulos | null>>({})
const väärä = ref(false)

export function useCheckin() {
  const { t } = useI18n()
  const toast = useToast()
  const { kieli, kysely } = useViikkoKysely()

  const viikko = nykyViikko()
  const päivä = nykyPäivä()

  const { data } = useAsyncData(
    () => `viikko-aktiivinen-${kieli.value}`,
    () => kysely().where('tila', '=', 'käynnissä').first(),
    { watch: [kieli] }
  )

  const suola = computed(() => data.value?.suola ?? data.value?.kääre)

  const äänet = useState<Äänet>('checkin-äänet', () => ({}))

  const avain = (i: number, p: Päivä = päivä) => `${viikko}:${i}:${p}`

  const auki = computed(() => !!kryptoAvain.value)

  function tallenna(i: number, option: Tulos, muistiinpano?: string) {
    äänet.value = { ...äänet.value, [avain(i)]: { tulos: option, muistiinpano } }
  }

  function nollaaÄänet() {
    äänet.value = {}
  }

  async function avaa(passphrase: string) {
    if (!data.value || !suola.value) return
    väärä.value = false

    const key = await deriveKey(passphrase, suola.value)

    if (data.value.tarkiste && await decrypt(key, data.value.tarkiste) !== 'ok') {
      väärä.value = true
      return
    }

    const purettu: Record<string, Tulos | null> = {}
    let yrityksiä = 0
    let onnistui = 0

    for (const [i, j] of data.value.jutut.entries()) {
      for (const p of päivätAstiTänään()) {
        const bitti = j.päivät?.find(x => x.päivä === p)?.bitti
        if (!bitti) continue
        yrityksiä++
        const tulos = await decrypt(key, bitti)
        if (tulos) onnistui++
        purettu[`${i}:${p}`] = tulos
      }
    }

    if (yrityksiä && !onnistui) {
      väärä.value = true
      return
    }

    kryptoAvain.value = key
    sisältö.value = purettu
  }

  function lukitse() {
    kryptoAvain.value = null
    sisältö.value = {}
    väärä.value = false
  }

  const herkku = computed<boolean | null>(() => {
    if (!kryptoAvain.value || !data.value) return null

    const tulokset = data.value.jutut
      .flatMap((_, i) => päivätAstiTänään().map(p =>
        äänet.value[avain(i, p)]?.tulos ?? sisältö.value[`${i}:${p}`] ?? null
      ))
      .filter((tulos): tulos is Tulos => tulos !== null)

    return laanna(tulokset, data.value.päättely, data.value.kuorum)
  })

  async function luoYaml() {
    if (!data.value || !kryptoAvain.value) return null
    const rivit = [`viikko: ${viikko}`, 'jutut:']

    for (const [i, j] of data.value.jutut.entries()) {
      const merkinnät = päivätAstiTänään()
        .map(p => ({ p, ääni: äänet.value[avain(i, p)] }))
        .filter(x => x.ääni)

      if (!merkinnät.length) continue

      rivit.push(`  - nimi: ${JSON.stringify(j.nimi)}`, '    päivät:')

      for (const { p, ääni } of merkinnät) {
        rivit.push(
          `      - päivä: ${p}`,
          `        bitti: ${await encrypt(kryptoAvain.value, ääni!.tulos)}`
        )
        if (ääni!.muistiinpano) rivit.push(`        muistiinpano: ${JSON.stringify(ääni!.muistiinpano)}`)
      }
    }

    return rivit.join('\n') + '\n'
  }

  async function lataa() {
    const yaml = await luoYaml()
    if (!yaml) return
    lataaTiedosto(`viikko-${viikko}-äänet.yml`, yaml)
  }

  async function kopioi() {
    const yaml = await luoYaml()
    if (!yaml) return
    await navigator.clipboard.writeText(yaml)
    toast.add({ title: t('viikot.checkin.copied'), icon: 'i-lucide-check' })
  }

  async function tuo(teksti: string) {
    if (!data.value || !kryptoAvain.value) return { virhe: 'jäsennys' as const }

    const { parse } = await import('yaml')

    let doc: { viikko?: number, jutut?: { nimi: string, päivät?: { päivä: string, bitti?: string, muistiinpano?: string }[] }[] }

    try {
      doc = parse(teksti)
    } catch {
      return { virhe: 'jäsennys' as const }
    }

    if (!doc || !Array.isArray(doc.jutut)) return { virhe: 'jäsennys' as const }
    if (doc.viikko !== viikko) return { virhe: 'viikko' as const }

    const sallitut = ['ma', 'ti', 'ke', 'to', 'pe', 'la', 'su']
    const uudet: Äänet = {}
    let tuotu = 0
    let ohitettu = 0

    for (const j of doc.jutut) {
      const i = data.value.jutut.findIndex(x => x.nimi === j.nimi)

      for (const p of j.päivät ?? []) {
        if (i < 0 || !p.bitti || !sallitut.includes(p.päivä)) {
          ohitettu++
          continue
        }

        const tulos = await decrypt(kryptoAvain.value, p.bitti)

        if (!tulos) {
          ohitettu++
          continue
        }

        uudet[avain(i, p.päivä as Päivä)] = { tulos, muistiinpano: p.muistiinpano }
        tuotu++
      }
    }

    äänet.value = { ...äänet.value, ...uudet }

    return { tuotu, ohitettu }
  }

  watch(suola, lukitse)

  return { viikko, päivä, data, äänet, auki, väärä, herkku, tallenna, nollaaÄänet, avaa, lukitse, lataa, kopioi, tuo }
}

export function useViikkoKysely() {
  const { locale } = useI18n()

  const kieli = computed<'en' | 'fi'>(() => locale.value === 'fi' ? 'fi' : 'en')

  const kysely = () => kieli.value === 'fi'
    ? queryCollection('viikot_fi')
    : queryCollection('viikot_en')

  return { kieli, kysely }
}

export function useTarkiste() {
  const tarkiste = ref('')

  async function luo(passphrase: string, kääre: string) {
    tarkiste.value = await encrypt(await deriveKey(passphrase, kääre), 'ok')
  }

  function nollaa() {
    tarkiste.value = ''
  }

  return { tarkiste, luo, nollaa }
}

const q = (s: string) => JSON.stringify(s)

function yaml(w: Viikko, tarkiste: string, jutut: Viikko['jutut']) {
  const rivit = [
    `viikko: ${w.viikko}`,
    `kääre: ${q(w.kääre)}`,
    w.suola ? `suola: ${q(w.suola)}` : null,
    w.lähtö ? `lähtö: ${q(w.lähtö)}` : null,
    w.päätös ? `päätös: ${q(w.päätös)}` : null,
    `tila: ${w.tila}`,
    `päättely: ${w.päättely}`,
    w.kuorum ? `kuorum: ${w.kuorum}` : null,
    `tarkiste: ${q(tarkiste)}`,
    'jutut:'
  ].filter((r): r is string => r !== null)

  for (const j of jutut) {
    rivit.push(`  - nimi: ${q(j.nimi)}`)
    if (j.miksi) rivit.push(`    miksi: ${q(j.miksi)}`)
    rivit.push(`    kynnys: ${j.kynnys}`, `    paino: ${j.paino}`, `    väri: ${j.väri}`)

    if (j.päivät?.length) {
      rivit.push('    päivät:')
      for (const p of j.päivät) {
        rivit.push(`      - päivä: ${p.päivä}`)
        if (p.bitti) rivit.push(`        bitti: ${q(p.bitti)}`)
        if (p.hetki) rivit.push(`        hetki: ${q(p.hetki)}`)
        if (p.muistiinpano) rivit.push(`        muistiinpano: ${q(p.muistiinpano)}`)
        if (p.arvio) rivit.push(`        arvio: ${p.arvio}`)
      }
    }
  }

  return rivit.join('\n') + '\n'
}

export function lataaTiedosto(nimi: string, sisältö: string) {
  const url = URL.createObjectURL(new Blob([sisältö], { type: 'text/yaml;charset=utf-8' }))
  const a = Object.assign(document.createElement('a'), { href: url, download: nimi })
  document.body.append(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export function useVaihdaSalasana() {
  const virhe = ref('')
  const valmis = ref(false)

  async function uudelleenSalaa(w: Viikko, vanhaAvain: CryptoKey, uusiAvain: CryptoKey) {
    const jutut: Viikko['jutut'] = []

    for (const j of w.jutut) {
      const päivät = []
      for (const p of j.päivät ?? []) {
        if (!p.bitti) {
          päivät.push(p)
          continue
        }
        const tulos = await decrypt(vanhaAvain, p.bitti)
        if (!tulos) throw new Error('decrypt')
        päivät.push({ ...p, bitti: await encrypt(uusiAvain, tulos) })
      }
      jutut.push({ ...j, päivät })
    }

    return jutut
  }

  async function vaihda(asetukset: { viikko: number, vanha: string, uusi: string }) {
    virhe.value = ''
    valmis.value = false

    const [fi, en] = await Promise.all([
      queryCollection('viikot_fi').where('viikko', '=', asetukset.viikko).first(),
      queryCollection('viikot_en').where('viikko', '=', asetukset.viikko).first()
    ])

    if (!fi) {
      virhe.value = 'viikkoEiLöydy'
      return
    }

    const suola = fi.suola ?? fi.kääre
    const vanhaAvain = await deriveKey(asetukset.vanha, suola)
    const uusiAvain = await deriveKey(asetukset.uusi, suola)

    if (fi.tarkiste && await decrypt(vanhaAvain, fi.tarkiste) !== 'ok') {
      virhe.value = 'vääräVanha'
      return
    }

    try {
      const tarkiste = await encrypt(uusiAvain, 'ok')

      lataaTiedosto(`${fi.viikko}.fi.yml`, yaml(fi, tarkiste, await uudelleenSalaa(fi, vanhaAvain, uusiAvain)))

      if (en) {
        lataaTiedosto(`${en.viikko}.en.yml`, yaml(en, tarkiste, await uudelleenSalaa(en, vanhaAvain, uusiAvain)))
      }

      valmis.value = true
    } catch {
      virhe.value = 'vääräVanha'
    }
  }

  return { vaihda, virhe, valmis }
}
