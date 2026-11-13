---
title: Sivut
description: Itsenäisiä Vue-sivuja Markdown-sisällön rinnalla.
navigation:
  title: Sivut
  icon: i-lucide-app-window
sidebar: true
collapsed: true
splitter: true
toc: true
surround: true
---

Suurin osa tästä sivustosta on Markdownia. Nämä sivut on tehty Vue-sivuina kansioon `app/pages/`, koska ne tarvitsevat enemmän logiikkaa kuin MDC-komponentit mukavasti kantavat.

::nav-list
---
orientation: vertical
items:
  - label: Etusivu
    icon: i-lucide-house
    to: /
  - label: Sanasto
    icon: i-lucide-book-open
    to: /glossary
  - label: Tuli
    icon: i-lucide-flame
    to: /fire
  - label: Esimerkki
    icon: i-lucide-flask-conical
    to: /example
  - label: Flow
    icon: i-lucide-workflow
    to: /flow
  - label: Viikot
    icon: i-lucide-calendar-days
    to: /viikot
  - label: Runo
    icon: i-lucide-scroll-text
    to: /runo
---
::

## Tuli

Interaktiivinen sivu osoitteessa `/fire`, joka on tehty Nuxt UI -komponenteista: edistymispalkki liekille, edistymisryhmä tuhkalle, liukusäädin, joka luovuttaa tavoitteen, välilehdet, huomautus ja ilmoitus.

**Miten se toimii**
- Liekin taso ja tavoitteen omistaja tallennetaan `useState`-funktiolla, joten ne säilyvät kielen vaihdossa.
- Liekin ruokkiminen vähentää polttoainetta ja siirtää liukusäädintä kohti mallia. Kun liukusäädin ylittää puolivälin, ilmoitus ilmestyy itsestään.
- Kun polttoaine on 0, liekki kylmenee ja ruokintapainike poistuu käytöstä. Aloita alusta nollaa molemmat arvot.

**Tiedostot**
- Sivu: `app/pages/fire.vue`.
- Tekstit: avain `hearth` tiedostoissa `i18n/locales/en.yml` ja `i18n/locales/fi.yml`.
- Liike: luokat `animate-rise`, `animate-flicker` ja `stagger` pääasiallisessa CSS-tiedostossa. Kaikki animaatio kytketään pois vierailijoilta, jotka haluavat vähemmän liikettä.

## Sanasto

Haettava aakkosjärjestyksessä oleva termilista osoitteessa `/glossary`. Ota **Oma järjestys** -kytkin käyttöön, niin voit vetää termit omaan järjestykseesi. Jokaisella termillä on ankkuri, joten linkit kuten `/glossary#ssr` vievät suoraan termiin.

**Term-komponentti**

Käytä `term`-komponenttia merkitsemään sana Markdownissa. Kun osoitin on sen päällä, se on kohdistettuna tai sitä napautetaan, se näyttää määritelmän, joten lukijan ei tarvitse poistua sivulta.

Jos haluat käyttää sanastomerkintää, anna sen `name`:

```mdc
Nuxt renderöi sivut oletuksena :term[SSR]{name="ssr"}-tavalla.
```

Yksittäiselle termille, jolla ei ole sanastomerkintää, anna määritelmä arvona `text`. Se näkyy työkaluvinkkinä:

```mdc
Nuxt tekee sivuista interaktiivisia :term[hydraation]{text="Palvelimella renderöidyn HTML:n tekeminen interaktiiviseksi selaimessa."} avulla.
```

**Mistä määritelmät tulevat**
- Määritelmät ovat `glossary`-sisältökokoelmassa ja jokaiselle kielelle on omat merkintänsä.
- Jos termillä ei ole merkintää nykyisellä kielellä, käytetään englanninkielistä merkintää.
- `useGlossary`-funktio tekee yhden välimuistissa olevan sanastokyselyn. `term` ja sanastosivu käyttävät sitä yhdessä, joten data haetaan vain kerran.

**Merkinnän kentät**
- `title` (merkkijono, valinnainen): termin nimi.
- `text` (merkkijono, valinnainen): lyhyt määritelmä, joka näkyy osoittimen ollessa päällä, kohdistettuna tai napautettaessa.
- `description` (merkkijono, valinnainen): pidempi selitys.
- `to` (merkkijono, valinnainen): linkki, josta voi lukea lisää.
- `icon` (merkkijono): termin vieressä näkyvä Iconify-nimi. Pakollinen.
- `tags` (merkkijono[], valinnainen): aiheet, joiden avulla termin voi löytää.

```mdc
---
title: SSR
text: Sivujen renderöinti HTML:ksi palvelimella ennen kuin ne lähetetään selaimeen.
icon: i-lucide-server
tags:
  - renderöinti
---
```

## Esimerkki

Sivu osoitteessa `/example`, joka näyttää omat Vue-komponentit käytössä Markdownin ulkopuolella. Jokainen komponentti on omassa välilehdessään ja välilehden sisältö ladataan vasta, kun se avataan ensimmäisen kerran.

**Välilehdet**
- Jokainen komponentti on omassa `UTabs`-paneelissaan ja tuodaan `Lazy`-etuliitteellä, joten sen koodi haetaan vasta, kun välilehti avataan ensimmäisen kerran.
- Paneelit pysyvät ladattuina ensimmäisen käynnin jälkeen (`unmount-on-hide` on pois päältä), joten esimerkiksi tuotu kirjanmerkkitiedosto säilyy välilehteä vaihdettaessa.
- Valittu välilehti tallennetaan `tab`-kyselyparametriin, esimerkiksi `/example?tab=bookmarks`. Tuntematon arvo palaa arvoon `onboarding`.
- Paneelit liukuvat näkyviin `animate-rise`-animaatiolla. Animaatio kytketään pois vierailijoilta, jotka haluavat vähemmän liikettä.

**Komponentit**
- [`EOnBoarding`](/guides/cookies#onboarding-scenarios): perehdytyksen kulku.
- [`StatsSource`](/guides/query#stats-source): tilastopaneeli. Katso tarkempi määritelmä linkistä.
- [`EBookmarks`](#kirjanmerkit): kirjanmerkkien tuonti, kuvattu alla.

### Kirjanmerkit

`EBookmarks`-komponentti, joka näkyy Kirjanmerkit-välilehdessä sivulla `/example`. Pudota siihen selaimen kirjanmerkkitiedosto (HTML), niin voit selata tulosta kansiopuuna.

**Miten se toimii**
- Tiedosto jäsennetään selaimessa. Sisäkkäisistä kansioista tulee sisäkkäinen puu, joka on oletuksena suljettuna. Mitään ei lähetetä palvelimelle.
- Jokaisella rivillä on valintaruutu. Kansion valinta valitsee kaiken sen sisällä ja osittain valittu kansio näkyy välitilassa.
- Hakukenttä suodattaa otsikon tai URL-osoitteen mukaan ja avaa vastaavat kansiot. **Valitse kaikki** koskee vain näkyviä kohteita.
- **Kaikki** lataa jokaisen kirjanmerkin ja **Valitut** merkityt, molemmat tiedostoon `bookmarks.yml` ja jokaisen kirjanmerkin koko kansiopolku mukana.
- Ota **Järjestä uudelleen** -kytkin käyttöön, niin voit vetää kirjanmerkkejä ja kansioita uuteen järjestykseen, myös kansiosta toiseen. Vienti noudattaa uutta järjestystä. Uudelleenjärjestäminen on pois käytöstä haun ollessa aktiivinen ja se kytkee virtualisoinnin pois, kunnes palautat kytkimen.
- Tiedosto, joka ei ole kirjanmerkkivienti tai jossa ei ole kirjanmerkkejä, näyttää ilmoituksen ja tyhjentää latauksen, jotta voit pudottaa uuden tiedoston.

**Tiedostot**
- Komponentti: `EBookmarks`.
- Logiikka: `app/composables/useBookmarks.ts` sisältää jäsennyksen, suodatuksen, valinnan, järjestämisen ja viennin.
- Tekstit: avain `bookmarks` tiedostoissa `i18n/locales/en.yml` ja `i18n/locales/fi.yml`.
- Riippuvuudet: `@vueuse/integrations` ja `sortablejs` vetämistä ja pudottamista varten.

## Runo

Salattu [jakosivu](/runo) osoitteessa `/runo`, rakennettu Nuxt UI -komponenteista: välilehdet, lomakekentät, tekstialue, syöttökentät, ilmoitukset ja painikkeet. Salauksen takaa selaimessa toimiva **Web Crypto API**.

**Näin se toimii**
- Liitä teksti ja paina salaa. Selain luo satunnaisen AES-GCM-avaimen, salaa tekstin ja näyttää jakolinkin, avaimen sekä salatun datan.
- Linkki on muotoa `/fi/runo/<sanat>#k=<avain>&d=<data>`. Avain ja data ovat hajautusosassa (hash), joten ne eivät koskaan päädy palvelimelle.
- Markdown-tiedosto, jonka etutiedoissa (frontmatter) on `encrypted: true` ja `blob` on yksityinen sivu. Se näyttää vain avainkentän ja avauspainikkeen, teksti puretaan ja renderöidään Markdownina selaimessa.
- Julkisilla sivuilla dokumentti on yhdellä välilehdellä ja jakolomake toisella.

**Tiedostot**
- Sivu: `app/pages/runo/[...slug].vue`.
- Komponentti: `FRunoJako`.
- Tekstit: `runo`-avaimet tiedostoissa `i18n/locales/en.yml` ja `i18n/locales/fi.yml`.
- Sisältö: `content/<kieli>/runo/*.md`. Kentät `encrypted` ja `blob` ovat `runo_en`- ja `runo_fi`-skeemoissa tiedostossa `content.config.ts`.

## Sivun lisääminen

1. Luo `app/pages/sivusi.vue`. Erillinen sivu on etusijalla Markdownin yleisreittiin nähden.
2. Laita kaikki näkyvät tekstit molempiin kielitiedostoihin ja lue ne funktiolla `t()`.
3. Käytä `useState`-funktiota kaikkeen, minkä pitää säilyä siirtymisessä tai kielen vaihdossa.
4. Jos sivulla on raskaita komponentteja, laita ne `UTabs`-paneeleihin ja tuo ne `Lazy`-etuliitteellä.
5. Lisää sivu yllä oleviin pikalinkkeihin ja lisää muutoslokiin merkintä.
