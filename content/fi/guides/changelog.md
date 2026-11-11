---
title: Muutosloki
description: Merkittävät muutokset dokumentaation asetteluun ja työkaluihin.
navigation:
  icon: i-lucide-list-check
toc: true
surround: true
---

## 1.11.

### Lisätty

- Edellinen/seuraava-linkit (`UContentSurround`), joita ohjataan frontmatterin `surround`-kentällä.
- Yläpalkin asetusvalikko, jolla voi vaihtaa sivupalkin, sisällysluettelon, pienennetyn sivupalkin jaetun näkymän ja edellinen/seuraava-linkkien näkyvyyttä. Tekstit on käännetty kielille `en` ja `fi`.
- Syvyyteen perustuvat asettelun oletukset. Juurisivulla näkyy vain yläpalkki ja syvemmillä sivuilla näkyy lisäksi sivupalkki, sisällysluettelo, edellinen/seuraava-linkit ja jaettu näkymä.
- `UContentSearch` liitetty kerran tiedostoon `app.vue`, joten haku toimii jokaisessa asettelussa.
- Mobiilin sisällysluettelo sisällön yläpuolella, oletuksena suljettuna.
- Alapalkkiin sijoitettu yläpalkki-komponentti vetolaatikkovalikolla sekä `useNavItems`-composable linkkejä varten.
- Suostumusvaatimukset-taulukkokomponentti.

### Muutettu

- Sivun asetukset säilytetään nyt muistissa `useState`-tilalla (`usePreferences`). Laitteelle ei tallenneta mitään.
- Asettelun frontmatter-kentät ovat valinnaisia. Puuttuvat arvot korvataan syvyyteen perustuvilla oletuksilla.
- Yläpalkin otsikon vieressä näkyy kuvake.

### Poistettu

- i18n- ja värimoodievästeet sekä niiden tallennus.
- Vanhan `overrides`-tilan nollaus reitin vaihtuessa.

### Korjattu

- `app.vue`:sta puuttuneet `files` ja `navigation`, jotka rikkoivat haun.
- Mobiilin sisällysluettelon ja yläpalkin välinen rako.
- Suomenkielisten tekstien katkeaminen asetusvalikossa (`min-w-46`).

## 1.11.

### Lisätty

- Lajiteltavat MDC-komponentit Markdownia varten: checkbox-list, radio-list, accordion-list, card-list, tabs-list, stepper-list ja table-list.
- Propsit voi antaa YAML-lohkona tai rivinsisäisinä attribuutteina.
- icon kullekin kortille, välilehdelle, vaiheelle ja taulukon riville, sekä avatar taulukon riveille. Kuvake tai avatar toimii vetokahvana.
- handle-icon-prop komponentille card-list, joka asettaa oletuskahvakuvakkeen.
- Dokumentaatiosivu, jossa jokaisella komponentilla on Esikatselu-, YAML- ja Rivinsisäiset propsit -välilehdet.
- Komponentit raahauksella `timeline-list`, `tags-list`, `nav-list`, `board-list`, `hero-list` ja `swatch-list`.
- Työkalukomponentteja `install-builder`, `compat-matrix` ja `progress-check`.
- markdown, sortable, tools md-sivut

### Muutettu

- Radio- ja checkbox-listat piirtävät selitteen (legend) ryhmän ulkopuolelle, joten fieldset sisältää vain kohteet.
- Tabs ja Table käyttävät draggable-valitsimia ([data-slot="trigger"], tr) ja onUpdate käyttää taulukon päivitykseen oldDraggableIndex- ja newDraggableIndex-arvoja.
- Tabs piirtää sisältöpaneelin itse `:content="false"` ja alustetaan uudelleen järjestyksen muuttuessa.
- Table piirretään vain selaimessa `<ClientOnly>`-komponentin avulla.
- Taulukon id-arvot voivat olla numeroita, joten niitä ei tarvitse lainata YAMLissa.

### Poistettu

- SortableJS:n animation-asetus Tabsista, koska se oli ristiriidassa indikaattorin kanssa.
- Taulukon lajittelu, suodatus ja sivutus, joita ei tueta käsin määritellyn järjestyksen kanssa.

### Korjattu

- Tabsin virhe Cannot read properties of undefined (reading 'disabled' / 'ui'), jonka aiheutti indikaattorielementin tuottama indeksivirhe (off-by-one).
- Tabs ei päivittynyt näkyvästi pudotuksen jälkeen.
- TypeScript-virheet: tuntematon animation-asetus (asenna @types/sortablejs) ja "Type instantiation is excessively deep" (käytä tavallista interfacea TabsItem-tyypin sijaan).
- Vetokahvat, jotka palasivat alkuperäiseen kohtaan, kun legend jakoi fieldsetin kohteiden kanssa.
- `nav-list`: virhe `querySelector is not a function`. Valikko on nyt oman elementin sisällä.
- `board-list`: pudotus tyhjiin sarakkeisiin, pudotus ensimmäisen kortin jälkeen ja satunnainen jumittuminen. Komponentti käyttää SortableJS:n omaa vetoa selaimen natiivin vedon sijaan ja korttien väli tehdään täytteellä eikä rakona.

## 3.11

### Lisätty

- `hero-list`: hero, jonka lohkoja voi järjestää vetämällä. Järjestys säilyy `useState`-tilassa. Vedon saa pois asetuksella `sortable=false`.
- Aloituskortti: kielen ja tumman tilan valinta värillisillä korteilla ja badgeilla. Kieli vaihtuu heti, ja väriteema otetaan käyttöön heti.
- Aloitusvalinnat tallennetaan evästeeseen vasta, kun käyttäjä painaa Jatka. Valinta "Jatka tallentamatta" ei tallenna mitään.
- Oppaiden etusivun kortit: Aloitus, Oppaat, Markdown, Järjestettävät, Työkalut ja Muutosloki.
- Sivu evästeistä, tallennuksesta ja aloituksesta **EU-käyttäjille**. Huomioita evästeistä, tallennuksesta ja aloituksesta kehittäjille, jotka julkaisevat EU:ssa. Evästeasetukset on poistettu käytöstä tämän projektin asetuksissa, joten muut voivat ohittaa ne.
- `term`: tekstin sisäinen sanastotermi, jonka selitys näkyy osoittimella, kohdistuksella tai napautuksella. Selitykset tulevat `glossary`-sisältökokoelmasta kielikohtaisesti, ja puuttuessaan käytetään englantia.
- `term`: tekstin sisäinen sanastotermi, jonka selitys näkyy osoittimella, kohdistuksella tai napautuksella. Selitykset tulevat kielikohtaisista sanastomerkinnöistä, ja puuttuessaan käytetään englantia.
- Sanastosivu: haettava aakkosjärjestyksessä oleva termilista. Oma järjestys -kytkimellä termit voi vetää haluamaansa järjestykseen. Jokaisella termillä on ankkuri, joten linkit kuten `/glossary#ssr` toimivat.
- `playground`: muokattava MDC-esimerkki, joka renderöi oikeat komponentit reaaliajassa. Mukana esimerkkivalikko hakuineen ja kuvauksineen, kopiointi ja palautus, ja virheellisen syntaksin kohdalla säilyy viimeinen toimiva esikatselu.
- `bilingual-view`: sama sivu englanniksi ja suomeksi rinnakkain, vieritys linkitettynä lohko lohkolta.
- Kotisivu

### Muutettu

- `board-list`: jokainen sarake on nyt oma `kanban-column`-komponenttinsa, joka käyttää `useSortable`-funktiota. Korttien vetäminen sarakkeiden välillä toimii kuten ennen.
- `playground` voi nyt jakaa nykyisen tekstinsä linkkinä.


## 4.11

### Lisätty

- **Etusivu.** Uusi etusivu, jossa on hero, toimiva asennusrakentaja, yhteensopivuustaulukko, asennuksen tarkistuslista, tiekarttataulu, aikajana ja UKK.
- **Tuli-sivu.** Uusi interaktiivinen sivu, jossa on animoitu edistymispalkki, sekä liukusäädin, jolla tavoite siirtyy mallille", välilehtivertailu ja ilmoitus. Tila tallennetaan `useState`-funktiolla, joten se säilyy kielen vaihdossa.
- **Tietoa-sivu.** Uusi sivu, jossa on yleiskatsaus, teknologiataulukko, aihetunnisteet, tarkistuslista, polunvalitsin, pikalinkit ja värinvalitsin.
- `troubleshooting`-komponentti: haettava lista ongelmista, joista kullekin on syy ja korjaus, sekä tunnistesuodattimet, vakavuusmerkit, kopioitava koodi ja syvälinkit.
- `troubleshooting-source`-komponentti, joka täyttää saman listan yhteisistä ongelmatiedostoista. Suomenkieliset merkinnät korvaavat englanninkieliset, joilla on sama `slug`.
- Kyselysivu komponenteille, jotka lukevat sisältökokoelmia: `bilingual-view`, `term` ja `troubleshooting-source`.
- Kokoelmat `problems_en` ja `problems_fi`, yksi YAML-tiedosto ongelmaa kohden.
- Muistiinpanot-ponnahdusikkuna työpöydän ylätunnisteessa. Kirjoita muistiinpano jokaiselle sivulle, lataa kaikki muistiinpanot `.txt`-tiedostona ja tuo ne takaisin.
- Lataa `.md`-tiedostona -painike nykyiselle sivulle, joka perustuu `rawbody`-kenttään.
- `stats`-komponentti: `UPageCard`-pohjainen numerokorttien ruudukko, jossa on kuvakkeet, korttikohtaiset värit, kohdistinta seuraava valokeila, laskuanimaatio ja valinnaiset edistymispalkit. Animaatiot poistetaan käytöstä, kun lukija haluaa vähennettyä liikettä.
- `stats-source`-komponentti, joka laskee komponentit, sivut, käännösten kattavuuden, kielet, sanaston termit ja ongelmat itse sivustosta. Kortteja voi suodattaa `show`-arvolla.
- `useSiteStats`-composable, joka hakee luvut kerran sivua ja kieltä kohden.

### Muutettu

- `bilingual-view` ja `term` siirrettiin Työkalut-sivulta Kysely-sivulle.
- Yhteisiä käännösmerkkijonoja laajennettiin hakua, tyhjää tilaa, tuloksia, kopiointia sekä kaikkien laajentamista ja tiivistämistä varten.
- Muistiinpanot pidetään muistissa `useState`-tilalla (`useNotes`) ja jaetaan kielten kesken, joten sivun `/en/tools` muistiinpano on sama kuin sivun `/fi/tools`. Mitään ei tallenneta laitteelle.
- Yhteisiä käännösmerkkijonoja laajennettiin hakua, tyhjää tilaa, tuloksia, kopiointia sekä kaikkien laajentamista ja tiivistämistä varten.

### Korjattu

- Kääntämättömät suomenkieliset sivut näyttävät saman polun englanninkielisen sivun.

## 5.11

### Lisätty

- `problems_en`- ja `problems_fi` -kokoelmat, joissa on yksi YAML-tiedosto per ongelma.
- Muistiinpano-ikkuna työpöytäversion yläpalkissa. Kirjoita muistiinpano sivukohtaisesti, lataa kaikki muistiinpanot `.txt`-tiedostona ja tuo ne takaisin.
- Lataa `.md`-tiedostona -painike nykyiselle sivulle, joka muodostetaan `rawbody`-kentästä.

### Muutettu

- Muistiinpanot säilytetään muistissa `useState`-funktiolla (`useNotes`) ja jaetaan kielten kesken, joten muistiinpano sivulla `/en/tools` on sama muistiinpano sivulla `/fi/tools`. Mitään ei tallenneta laitteelle.
- Yleisiä kielimerkkijonoja laajennettu hakua, tyhjää tilaa, tuloksia, kopiointia sekä laajenna kaikki- ja tiivistä kaikki -toimintoja varten.

## 6.11

### Lisätty

- `stats`-komponentti: ruudukko numerokortteja, jotka perustuvat `UPageCard`-komponenttiin, ja joissa on kuvakkeet, korttikohtaiset värit, kohdevalo, joka seuraa kursoria, laskuanimaatio ja valinnaiset edistymispalkit. Animaatiot poistetaan käytöstä, jos käyttäjä haluaa vähemmän liikettä.
- `stats-source`-komponentti, joka laskee komponentit, sivut, käännösten kattavuuden, kielet, sanaston termit ja ongelmat sivustolta itseltään. Kortteja voi suodattaa `show`-ominaisuudella.
- `useSiteStats`-komposiitti, joka hakee luvut kerran sivua ja kieltä kohti.

## 7.11

### Lisätty

- `tarkiste`: valinnainen tarkistusarvo viikoille. Avaaminen väärällä salasanalla hylätään nyt, myös viikoilla, joilla ei ole ääniä.
- `/dev`-sivu, vain kehityskäyttöön, työkaluilla, joilla voi:
  - luoda `tarkiste` (Nollaa-painikkeella)
  - vaihtaa viikon salasanan salaamalla `bitti` ja `tarkiste` uudelleen
- Avaa- ja Lukitse-painikkeet `CheckinPanel`-komponenttiin, reaaliaikainen Herkku-merkki ja väärän salasanan ilmoitus.

### Muutettu

- Avain johdetaan kerran avattaessa ja säilytetään vain muistissa. Se tyhjennetään lukittaessa, sivua ladattaessa uudelleen tai kun `kääre` muuttuu.
- `lataa()` tarvitsee avatun avaimen eikä enää ota salasanaa.
- `kääre` on salauksen suola. Pidä se samana `fi`- ja `en`-tiedostoissa tai lisää erillinen `suola`-kenttä.
- Aloittaaksesi alusta poista `bitti`- ja `tarkiste`-arvot ja luo uusi `tarkiste`.

### Poistettu

- Tarkista herkku -painike, `näytä` ja `laannaTänään`. `herkku`-laskettu arvo korvaa ne.

## 8.11

### Lisätty

- `/flow`-hakemisto, jossa yksi kortti jokaista kohdetta kohti, ryhmiteltynä tasoittain (tieto, suunnitelma, havainto, toimijat)
- Haku ja tasosuodatin hakemistoon
- Kohdesivut, joilla on kyselyparametrien taulukko, yhteisöesimerkki ja käytettävissä olevat toiminnot (luo, päivitä, poista)
- Parametrit linkittyvät kohteeseen, johon ne viittaavat, ja jokaisella sivulla on lista kohteista, jotka käyttävät sitä ("Käyttäjät")
- Edellinen / seuraava -navigointi tasojärjestyksessä sekä takaisin-painike otsikossa
- Valinnainen linkki kohteesta sanaston termiin
- Kuvake ja väri jokaiselle tasolle
- Englanninkielinen ja suomenkielinen sisältö, kaikki otsikot, kohteiden nimet ja parametrien kuvaukset käännettyinä
- `scenario`-komponentti: lyhyt tarina kerrottuna vaihe vaiheelta `UStepper`-komponentilla. Jokainen vaihe voi linkittää virtakohteeseen.
- Virtasivut kohteille `agreement-bundle`, `claim`, `process-specification`, `spatial-thing` ja `unit`, englanniksi ja suomeksi.
- Opassivut järjestystietovisalle ja tilannekuvaukselle.

### Muutettu

- Virtadata on nyt yml-tiedostoja `flow_en` / `flow_fi` -datakokoelmassa, jota `flowSchema` validoi
- Parametrien nimet ja arvot käyttävät pieniä kirjaimia ja väliviivoja kohteiden nimissä, jotka vastaavat tiedostonimiä, i18n-avaimia ja URL-osoitteita
- `recipeReciprocalClauseOf` on sisällössä `recipeReciprocal`

### Korjattu

- Sivuilla, joilla ei ole parametreja, näkyy tyhjä tila tyhjän taulukon sijaan
- Puuttuvat käännösavaimet eivät enää jätä tyyppisoluja tyhjiksi


## 9.11 

### Lisätty

- Kirjanmerkkien tuonti: pudota selaimen kirjanmerkkitiedosto (HTML) `UFileUpload`-komponenttiin ja selaa sitä kansiopuuna `UTree`-komponentilla
- Sisäkkäiset kansiot, jotka rakennetaan tiedoston `<DL>`-rakenteesta ja jotka ovat oletuksena suljettuina
- Valintaruudut, joissa on `propagate-select` ja `bubble-select`: kansion valinta valitsee sen kirjanmerkit, ja osittainen valinta näkyy välitilana
- Virtualisoitu puu suuria vientejä varten
- Haku otsikon tai URL-osoitteen mukaan, ja hakua vastaavat kansiot aukeavat automaattisesti
- "Valitse kaikki" (vain näkyvät kohteet) ja "Tyhjennä" -painikkeet
- Latauspainikkeet kaikille kirjanmerkeille tai vain valituille, vienti tiedostoon `bookmarks.yml` ja jokaisen kirjanmerkin koko kansiopolku mukana
- Järjestä uudelleen -kytkin: kirjanmerkkejä ja kansioita voi vetää ja pudottaa, myös kansiosta toiseen
- Virhe- ja varoitusilmoitukset tiedostoille, jotka eivät ole kirjanmerkkivientejä tai joissa ei ole kirjanmerkkejä
- `useBookmarks`-composable, jossa ovat jäsennys, suodatus, valinta, järjestäminen ja vienti
- `animate-rise`-sisääntuloanimaatio työkalulle
- Englanninkieliset ja suomenkieliset käännökset tiedostoissa `en.yml` ja `fi.yml`
- Välilehtiin jaettu esimerkkisivu, jossa jokainen komponentti on omassa `UTabs`-paneelissaan ja ladataan vasta tarvittaessa `Lazy`-etuliitteellä
- Valittu välilehti tallentuu `tab`-kyselyparametriin, joten sivun päivitys ja jaettu linkki avaavat saman välilehden
- `animate-rise` välilehtien paneeleille, pois päältä käyttäjille, jotka haluavat vähemmän liikettä
- `CircleProgress`-merkintä MDC-komponenttien dokumentaatiossa englanniksi ja suomeksi, välilehdillä Esikatselu, YAML ja Rivinsisäiset propsit

### Muutettu

- Viennin kansiopolut lasketaan jokaisen kirjanmerkin paikasta puussa, joten siirretty kirjanmerkki saa oikean kansion
- Vienti noudattaa puun nykyistä järjestystä valintajärjestyksen sijaan
- Välilehtien paneelit pysyvät kiinnitettyinä ensimmäisen avaamisen jälkeen, joten esimerkiksi tuotu tiedosto säilyy välilehteä vaihdettaessa
- Uudelleenjärjestäminen poistaa virtualisoinnin käytöstä ja käyttää litteää puunäkymää, ja ottaa virtualisoinnin takaisin käyttöön sen jälkeen

### Korjattu

- Kaikki kirjanmerkit päätyivät ensimmäiseen kansioon, ja kirjanmerkit tuplautuivat kerran jokaista ylempää kansiota kohti
- Virhe "Type instantiation is excessively deep" `TreeItem`-tyypissä, korjattu käyttämällä rajapintaa ja `shallowRef`-viittausta
- Kansioita ei voinut avata, kun oma `trailing`-slotti korvasi nuolikuvakkeen
- Vetäminen ei alkanut, kun virtualisoidusta puusta vaihdettiin litteään puuhun
- Siirretyt rivit säilyttivät väärän sisennyksen, koska puu ei piirtynyt uudelleen paikallisen siirron jälkeen
- Kansio katosi, kun se vedettiin oman alikohteensa päälle
- `e: any` Sortable-päivityskäsittelijässä

## 10.11

### Lisätty

- Oma `error.vue` `UError`-komponentin päälle, käännetty englanniksi ja suomeksi
- 404-sivu: ehdotukset lähimmistä sivuista, vedettävät pikalinkit (järjestys säilyy `useState`-funktiolla) ja saman osion Markdown-sivut
- Muut virheet: "Yritä uudelleen" -painike ja yleinen viesti, tekninen virheviesti näkyy vain kehityksessä

### Korjattu

- Puuttuvat sivut heittävät nyt vakavan 404-virheen, joten virhesivu näkyy
- Sivun otsikko ja kuvaus luettiin ennen kuin sivu oli ladattu

## 11.11

### Lisätty

- [Mycelium-resurssiverkosto](/example?tab=mycelium), interaktiivinen canvas-visuualisaatio yhteisön resurssivirtauksesta.
  - Tietopohjainen: piirtää solmut (tuottaja / kuluttaja / molemmat) ja suuntatut yhteydet virtauksen mukana skaalautuvilla hiukkasilla.
  - Resurssisuodattimet (`ruoka`, `työkalut`, `taidot`, `raha`, `aika`) vaihtavat aliverkostoja.
  - Klikkaa solmua → sivupaneeli sisään-/ulosvirtausstatistiikoineen ja yhteyksien taulukolla.
  - i18n: `en`, `fi`.
  - Composable: `useMycelium` (canvas-silmukka, osumatestaus, hiukkasfysiikka).
  - Tyypit: `CommunityData`, `CommunityNode`, `CommunityEdge`, `Resource`.

### Korjattu

- Kielen vaihtaminen ei enää näytä vanhentunutta, tyhjää tai vääränkielistä sisältöä. Sisältökyselyt käyttävät nyt URL-osoitteen kieltä, ja välimuistiavaimet ja tarkkailijat käyttävät `route.path`-arvoa. Tämä koskee `useContentCollection`-funktiota, `pages/index.vue`-sivua ja yleissivua (catch-all).
- Ankkurilinkit (`#section`) vierittävät nyt kohteeseen myös sivujen välillä. Asian hoitaa pieni asiakaspuolen lisäosa, koska sisältö vierii `UScrollArea`-komponentin sisällä eikä ikkunassa.
- Sivun vierityskohta nollautuu, kun siirrytään sivulle ilman ankkuria.
- Sisällysluettelo näkyy nyt työpöydällä, kun jakaja (splitter) on pois päältä.
- Sivuasetusvalikosta tehdyt valinnat koskevat nyt vain yhtä sivua, joten frontmatter on voimassa seuraavalla sivulla.

### Muutettu

- Lisätty `useRouteLocale()`, joka on yksi ainoa totuuden lähde nykyiselle kielelle ja jonka arvo tarkistetaan määritettyjä i18n-kieliä vasten.
- Kielivalikko on nyt ponnahdusikkuna (popover), jossa näkyy i18n-asetuksista haettu lippukuvake.
- Otsikkorivillä näkyy pienillä näytöillä pelkkä hakukuvake.
- Sivupalkin avoin-tila on sidottu `collapsed`-asetukseen, joten kytkin, valikko ja frontmatter ovat yhtä mieltä.
- `ClientOnly` ympäröi nyt vain otsikkorivin painikkeet, ei koko sisältöaluetta.
- Sivupalkin kytkimellä on käännetty `aria-label` ja `aria-expanded`.

### Ongelmat

- Nuxt Content v3.5.0 ei saa käynnistettyä SQLite-kyselyn päätepistettään, kun Bun tunnistetaan mutta kehityspalvelin ajetaan Node-ympäristössä (`bun:` ESM -virhe). Käynnistä kehityspalvelin yhdenmukaisella ajoympäristöllä tai päivitä `@nuxt/content`.

