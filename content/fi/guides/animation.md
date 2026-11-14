---
title: Animaatio
description: Vierityksellä paljastuvat sisällöt ja animaatiotokenit MDC-komponenteille.
navigation:
  title: Animaatio
  icon: i-lucide-sparkles
layout: dashboard
sidebar: true
collapsed: true
splitter: true
toc: true
surround: true
---

Pieniä animaatioita, joita tämän sivuston komponentit käyttävät yhdessä. Ne ovat pelkkiä CSS-työkaluluokkia, joten ne eivät maksa mitään suorituksen aikana ja ne sammuvat lukijoilta, jotka haluavat vähennettyä liikettä.

## Reveal

Kietoo minkä tahansa sisällön ja animoi sen näkyviin, kun se vierittyy näkyviin. Valitse yksi neljästä muunnelmasta. Animaatio toistuu vain kerran.

:::code-preview
::reveal{variant="emerge"}
**Emerge**

Nousee ja häivytetään näkyviin.
::

#code
```mdc
::reveal{variant="emerge"}
**Emerge**

Nousee ja häivytetään näkyviin.
::
```
:::

**Muunnelmat**

:::code-preview
::reveal{variant="emerge"}
**Emerge:** sisältö nousee ja häivytetään näkyviin.
::

::reveal{variant="blur" delay="100"}
**Blur:** sisältö tarkentuu ilmestyessään.
::

::reveal{variant="scale" delay="200"}
**Scale:** sisältö kasvaa hieman pienemmästä.
::

::reveal{variant="split" delay="300"}
**Split:** sisältö avautuu keskeltä.
::

#code
```mdc
::reveal{variant="blur" delay="100"}
**Blur:** sisältö tarkentuu ilmestyessään.
::
```
:::

**Propsit**

- `variant`: `emerge`, `blur`, `scale` tai `split`. Oletus on `emerge`.
- `as`: renderöitävä HTML-tagi, kuten `section` tai `li`. Oletus on `div`.
- `delay`: kuinka kauan odotetaan, kun sisältö on tullut näkyviin, millisekunteina. Oletus on `0`.
- `distance`: kuinka pitkän matkan sisältö kulkee, pikseleinä. Oletus on `30`.
- `threshold`: kuinka suuren osan lohkosta on oltava näkyvissä ennen toistoa, väliltä `0`–`1`. Oletus on `0.2`.

**Ryhmän porrastaminen**

Anna jokaiselle lohkolle suurempi `delay`, jolloin ne ilmestyvät yksi kerrallaan:

```mdc
::reveal{delay="0"}
Ensimmäinen
::

::reveal{delay="100"}
Toinen
::

::reveal{delay="200"}
Kolmas
::
```

Pidä askel lyhyenä. 100 ms:n askel 30 kohteen yli saa viimeisen odottamaan kolme sekuntia.

**Hyvä tietää**

- Jokainen lohko animoituu kerran, ensimmäisellä kerralla kun se vierittyy näkyviin. Takaisin vieritys ei toista sitä.
- Ennen kuin lohko vierittyy näkyviin, sisältö on piilossa. Ilman JavaScriptiä se pysyy piilossa, joten älä käytä `reveal`-komponenttia olennaiseen sisältöön.
- Kun lukija haluaa vähennettyä liikettä, sisältö ilmestyy heti ilman animaatiota.
- Älä kääri vedettäviä kohteita, kuten `board-list`-komponentin kortteja. Katso [Animaatio ja vetäminen](#animaatio-ja-vetäminen).

## ScrollStory

Tarina, joka kerrotaan lukijan vierittäessä. Kuva pysyy kiinnitettynä vasemmalla ja häipyy `light`-kuvasta `dark`-kuvaan, kun oikealla oleva teksti vierittyy ohi. Ohut edistymispalkki ylhäällä näyttää, kuinka pitkälle lukija on edennyt.

```mdc
::scroll-story{light="/catlight.webp" dark="/catdark.webp"}
Kaikki alkaa hiljaiselta sivulta.

Sitten valo alkaa muuttua.

Lopussa kuva on kääntynyt.
::
```

::scroll-story{light="/catlight.webp" dark="/catdark.webp"}
Kaikki alkaa hiljaiselta sivulta.

Sitten valo alkaa muuttua.

Lopussa kuva on kääntynyt.
::

**Propsit**

- `light`: tarinan alussa näytettävä kuva. Oletus on `/catlight.webp`.
- `dark`: lopussa näytettävä kuva. Oletus on `/catdark.webp`.

Molemmat ovat polkuja `public/`-kansioon ja niiden pitää alkaa kauttaviivalla. Nimet kuvaavat kahta kuvaa, eivät sivuston väriteemaa.

**Hyvä tietää**

- **Jokainen kappale on yksi vaihe.** Kappale täyttää noin 60 % näytön korkeudesta ja keskittää tekstinsä. Kirjoita yksi ajatus kappaletta kohden ja jätä niiden väliin tyhjä rivi.
- **Otsikot ja listat** eivät ole vaiheita ja ne vievät normaalin korkeutensa. Pidä tarina pelkissä kappaleissa.
- **Kuva on kiinnitetty vain suurilla näytöillä.** Pienillä näytöillä kuva on tekstin yläpuolella ja vierii pois sivun mukana ja häivytys seuraa silti vieritystä.
- **Yksi tarina sivua kohden.** Edistymispalkki on kiinnitetty sivun yläreunaan, joten kaksi niistä menisi päällekkäin.
- **Pidä se lyhyenä.** Jokainen vaihe on korkea, joten kolmesta kuuteen kappaletta riittää.
- **Kuvat ovat koristeellisia.** Niillä ei ole vaihtoehtoista tekstiä, joten älä käytä niitä kantamaan tietoa, jota teksti ei sisällä.
- **Vähennetty liike.** Kortin sisääntuloanimaatio sammutetaan, mutta häivytys seuraa vierityksen kohtaa ja toimii edelleen.

## Animaatiotokenit

Tokenit on määritelty teemassa `--animate-*`-muuttujina. Jokaisesta tulee työkaluluokka, kuten `animate-emerge`.

| Työkaluluokka | Kesto | Käyttö |
| --- | --- | --- |
| `animate-emerge` | 0,7 s | Vierityspaljastus: nousee ja häivytetään näkyviin. Myös `skill-finder`-korttien sisääntulo. |
| `animate-blur` | 0,7 s | Vierityspaljastus: tarkentuu sumeasta. |
| `animate-scale` | 0,7 s | Vierityspaljastus: kasvaa näkyviin. |
| `animate-split` | 0,7 s | Vierityspaljastus: avautuu keskeltä. |
| `animate-rise` | 0,5 s | Yleinen sisääntulo uusille kohteille. |
| `animate-stat-in` | 0,5 s | `stats`-komponentin kortit ja luvut. |
| `animate-flicker` | 1,6 s, toistuu | Pehmeä sykintä, kuten "Auttaa mielellään" -merkki. |
| `animate-quiz-pop` | 0,4 s | Pieni pomppu, esimerkiksi kohteen pudottamisen jälkeen. |
| `animate-quiz-shake` | 0,4 s | Ravistus väärälle vastaukselle. |

**Muuttujat**

- `--rv-delay`: odottaa ennen neljän paljastusanimaation alkua. `reveal` asettaa sen `delay`-propsistaan.
- `--rv-distance`: kuinka pitkän matkan paljastus kulkee. `reveal` asettaa sen `distance`-propsistaan.
- `--flicker`: yhden `flicker`-kierroksen kesto. Oletus on `1.6s`.

**Tokenin käyttö omassa komponentissa**

Kirjoita koko luokan nimi lähdekoodiin, jotta Tailwind löytää sen:

```vue
<UBadge class="animate-flicker" label="Auttaa mielellään" />
```

Aseta muuttuja inline-tyylillä, kun tarvitset eri arvon:

```vue
<UBadge class="animate-flicker" :style="{ '--flicker': '2.4s' }" label="Paikalla" />
```

Älä rakenna nimeä muuttujasta, kuten `` `animate-${name}` ``. Tailwind tuottaa vain ne luokat, jotka se näkee kirjoitettuina, joten rakennettu nimi ei tuota CSS:ää.

## Vähennetty liike

Yksi pääsivutyylitiedoston sääntö sammuttaa kaikki animaatiot lukijoilta, jotka haluavat vähennettyä liikettä:

```css
@media (prefers-reduced-motion: reduce) {
  [class*='animate-'] {
    animation: none !important;
  }
}
```

Kun animaatio on pois päältä, elementti näytetään tavallisessa lepotilassaan.

Tämän takia älä koskaan piilota elementtiä inline-tyylillä, kuten `opacity: 0` ja luota animaation paljastavan sen. Kun animaatio on pois päältä, se jäisi piiloon. Käytä luokkaa, joka poistetaan, kun sisällön pitää ilmestyä, kuten `reveal` tekee.

## Animaatio ja vetäminen

Useimmat tokenit käyttävät `animation-fill-mode: both` -arvoa, joka säilyttää viimeisen ruudun `transform`- ja `opacity`-arvot elementillä animaation päätyttyä. Vetolistat siirtävät kohteita transformeilla ja jäänyt transform saa vedon hyppimään.

- Älä aseta sisääntuloanimaatiota kohteille, joita voi vetää.
- Animoi sen sijaan niitä sisältävä säiliö, tai toista animaatio kerran ja poista luokka sen jälkeen.
- Pudotuksen jälkeiseen palautteeseen lisää `animate-quiz-pop` lyhyeksi aikaa ja poista se `animationend`-tapahtumassa, kuten `skill-finder` tekee.
