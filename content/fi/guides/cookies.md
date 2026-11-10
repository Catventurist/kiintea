---
title: Evästeet
description: Evästeet, tallennus ja aloitus
navigation:
  title: Evästeet
  icon: i-lucide-cookie
layout: dashboard
sidebar: true
collapsed: false
splitter: false
toc: true
surround: true
---

Miten aloituskortti liittyy evästeisiin ja selaimen tallennustilaan EU-käyttäjillä. Tämä ei ole tekninen yhteenveto tai oikeudellista neuvontaa.

> Evästeasetukset on poistettu käytöstä tämän projektin asetuksissa. Tämä sivu on tarkoitettu kehittäjille, jotka julkaisevat EU:ssa. Muut voivat ohittaa sen.

## Oikeusperuste

EU:n ePrivacy-direktiivin artikla 5(3) ominoi tallennuksen, joka on ehdottoman välttämätön käyttäjän nimenomaisesti pyytämän tietoyhteiskunnan palvelun tarjoamiseksi. 

[Aloituskortissa](/example) tehty valinta on tällainen. Sama eväste, joka asetetaan ensimmäisellä latauksella ilman pyyntöä ei ole sellainen.

## Evästeluokat

| Luokka | Esimerkit | Tarvitaanko suostumus? |
|---|---|---|
| **Ehdottoman välttämättömät** | Istunnon tunniste, CSRF-tunniste, ostoskori, kieli, teema | Ei |
| **Toiminnalliset** | "Muista minut", asettelun asetukset | Harmaa alue (osa viranomaisista sanoo ei, osa kyllä) |
| **Analytiikka** | Google Analytics, Plausible | Kyllä |
| **Seuranta/mainonta** | Sivustojen väliset tunnisteet, mainospikselit | Kyllä |

## Tämän projektin evästeet

| Eväste | Asettaja | Arvio |
|---|---|---|
| Istunnon tunniste | Nitro sessions / `useSession` | Välttämätön |
| CSRF-tunniste | Nitro / auth middleware | Välttämätön |
| `nuxt-ssr` (hydraatio) | Nuxt runtime | Välttämätön |
| Ostoskori (verkkokauppa) | Oma koodi | Välttämätön |
| `i18n_redirected` / kieli | `@nuxtjs/i18n` | Toiminnallinen |
| `nuxt-color-mode` | `@nuxtjs/color-mode` | Toiminnallinen |

## Aloitustilanteet

| Tilanne | Testi | Arvio |
|---|---|---|
| Aloitus: käyttäjä valitsee "dark" | Nimenomainen pyyntö | Välttämätön |
| Aloitus: käyttäjä valitsee "Spanish" | Nimenomainen pyyntö | Välttämätön |
| Ei aloitusta, eväste asetetaan ensimmäisellä latauksella | Ei pyyntöä | Toiminnallinen → suostumus |
| Ei aloitusta, CSS-mediakysely `prefers-color-scheme` | Ei tallennusta, ei evästettä | Ei sovellettavissa |

## Mitä käyttäjän valinta tallentaa

| Käyttäjä valitsee | Kysytään | Asetettavat evästeet | Suostumus tarvitaan? |
|---|---|---|---|
| Kieli > tumma tila | Vain kieli | `i18n_redirected` | Ei |
| Tumma tila > kieli | Vain tumma tila | `nuxt-color-mode` | Ei |
| Yhtä tärkeitä | Molemmat | Molemmat | Ei |

Vain käyttäjän valitsema asetus tallennetaan:

| Käyttäjä valitsee | `setLocale('en')` → | `colorMode.preference = 'dark'` → |
|---|---|---|
| Vain kieli | asettaa `i18n_redirected=en` | ei kutsuta → ei evästettä, käytetään `prefers-color-scheme` |
| Vain tumma tila | ei kutsuta → ei evästettä | asettaa `nuxt-color-mode=dark` |
| Molemmat | asettaa `i18n_redirected=en` | asettaa `nuxt-color-mode=dark` |

## Suostumuksen kirjaus

Jos keräät suostumuksen (esimerkiksi analytiikkaa varten), säilytä siitä tallenne:

| Kenttä | Miksi |
|---|---|
| Pseudonyymi tunniste (istunto-/suostumustunniste) | Kuka antoi suostumuksen |
| Aikaleima (UTC) | Milloin |
| Käyttötarkoituskohtaiset valinnat (analytiikka: kyllä, markkinointi: ei, …) | Mihin |
| Näytetyn bannerin/käytännön versio | Mitä käyttäjälle kerrottiin |
| Peruutustapahtumat (jos on) | Art. 7(3): peruuttamisen on oltava yhtä helppoa kuin antamisen |

## Kolmannen osapuolen upotukset (YouTube)

Upotettu video kirjoittaa tallennustilaan myös tietosuojaystävällisellä verkkotunnuksella:

| Mitä tapahtuu iframen latautuessa | Tavallinen | Nocookie |
|---|---|---|
| HTTP-evästeitä asetetaan | 5+ (VISITOR_INFO1_LIVE, YSC, GPS…) | Ei yhtään |
| `localStorage`-kirjoitus | Kyllä | Kyllä (`yt-remote-device-id`) |
| `IndexedDB`-kirjoitus | Kyllä | Kyllä |
| IP-osoite lähtee Googlelle | Kyllä | Kyllä |

Lataa iframe vasta, kun käyttäjä napsauttaa, ja käytä osoitetta `youtube-nocookie.com`:

```text
[Pikkukuva ja toistopainike]
       ↓ käyttäjä napsauttaa
[iframe latautuu, video toistuu osoitteesta youtube-nocookie.com]
```

## Testaus Bravessa

| Braven toiminto | Mitä se tekee |
|---|---|
| Shields → "Block all cookies" osoitteelle youtube.com | Estää evästeiden asettamisen (mutta YouTube voi silti kirjoittaa `localStorage`/`IndexedDB`, joita Shields ei kata) |
| "Forget me when I close this site" (Forgetful Browsing) | Poistaa **kaiken** ensimmäisen osapuolen tallennuksen (evästeet + localStorage + IndexedDB + välimuisti) muutaman sekunnin kuluttua, kun viimeinen sivuston välilehti suljetaan |
| Lisää kohtaan "Sites that can never use cookies" | Estää vain HTTP-evästeet |

## Yhteenveto

- Aseta toiminnalliset evästeet (`i18n_redirected`, `nuxt-color-mode`) vasta, kun käyttäjä on tehnyt valinnan tai antanut suostumuksen, älä koskaan ensimmäisellä latauksella.
- Käytä ensimmäisessä renderöinnissä oletusta, joka ei vaadi `<noscript>`-ratkaisua. Tunnista `prefers-color-scheme` CSS-mediakyselyllä ja synkronoi eväste vasta käyttäjän valinnan jälkeen.
- Kielen oletuksena käytä palvelimella `Accept-Language`-otsaketta ja tallenna eväste vasta käyttäjän valinnan jälkeen.
- Aloituskortissa tehty valinta on nimenomaan pyyntö, joten artiklan 5(3) poikkeus soveltuu eikä suostumusbanneria tarvita siihen. Kaikki ilman tällaista pyyntöä tallennettu vaatii suostumuksen.
- Analytiikka ja seuranta vaativat aina suostumuksen. Säilytä suostumuksen tallenne ja tee peruuttamisesta yhtä helppoa kuin antamisesta.
