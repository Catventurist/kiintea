---
title: Kaaviot
description: Pieni valikoima kaaviokomponentteja.
navigation:
  title: Kaaviot
  icon: i-lucide-bar-chart-3
layout: dashboard
sidebar: true
collapsed: true
splitter: true
toc: true
surround: true
---

Interaktiiviset kaaviokomponentit dokumentaatioon. Jokainen toimii Markdownissa MDC:nä.

## ChartPoll

Donitsi-tai pylväskaavio kyselyn tuloksille.

::tabs
:::tabs-item{label="Esikatselu" icon="i-lucide-eye"}
::::chart-poll
---
question: Siirrymmekö Nuxt 5:n?
type: donut
data:
  - { label: Kyllä, count: 42 }
  - { label: Ei, count: 18 }
  - { label: Ehkä, count: 7 }
---
::::
:::
:::tabs-item{label="YAML" icon="i-lucide-file-code"}
```mdc
::chart-poll
---
question: Siirrymmekö Nuxt 5:n?
type: donut
data:
  - { label: Kyllä, count: 42 }
  - { label: Ei, count: 18 }
  - { label: Ehkä, count: 7 }
---
::
```
:::
:::tabs-item{label="Inline-props" icon="i-lucide-code"}
```mdc
::chart-poll{type="bar" :data='[{"label":"Kyllä","count":42},{"label":"Ei","count":18}]'}
::
```
:::
::

Props: `question`, `type` (oletus `donut`), `data`.

## ChartAttendance

Viivakaavio arvojen seuraamiseen ajan myötä.

::tabs
:::tabs-item{label="Esikatselu" icon="i-lucide-eye"}
::::chart-attendance
---
title: Kuukausittainen osallistuminen
data:
  - { month: Syy, count: 34 }
  - { month: Lok, count: 51 }
  - { month: Marr, count: 63 }
---
::::
:::
:::tabs-item{label="YAML" icon="i-lucide-file-code"}
```mdc
::chart-attendance
---
title: Kuukausittainen osallistuminen
data:
  - { month: Syy, count: 34 }
  - { month: Lok, count: 51 }
  - { month: Marr, count: 63 }
---
::
```
:::
:::tabs-item{label="Inline-props" icon="i-lucide-code"}
```mdc
::chart-attendance{title="Kuukausittainen osallistuminen" :data='[{"month":"Syy","count":34},{"month":"Lok","count":51}]'}
::
```
:::
::

Props: `title`, `data`.

## ChartRevenue

Pinottu aluekaavio tulojen ja kustannusten seuraamiseen.

::tabs
:::tabs-item{label="Esikatselu" icon="i-lucide-eye"}
::::chart-revenue
---
data:
  - { month: Tam, revenue: 12400, costs: 8200 }
  - { month: Hel, revenue: 18600, costs: 9100 }
  - { month: Maal, revenue: 15300, costs: 7800 }
  - { month: Huo, revenue: 21000, costs: 10400 }
---
::::
:::
:::tabs-item{label="YAML" icon="i-lucide-file-code"}
```mdc
::chart-revenue
---
data:
  - { month: Tam, revenue: 12400, costs: 8200 }
  - { month: Hel, revenue: 18600, costs: 9100 }
  - { month: Maal, revenue: 15300, costs: 7800 }
  - { month: Huo, revenue: 21000, costs: 10400 }
---
::
```
:::
:::tabs-item{label="Inline-props" icon="i-lucide-code"}
```mdc
::chart-revenue{:data='[{"month":"Tam","revenue":12400,"costs":8200},{"month":"Hel","revenue":18600,"costs":9100}]'}
::
```
:::
::

Props: `data`.

## ChartLeaderboard

Vaakasuuntainen pylväskaavio parhaille panostajille.

::tabs
:::tabs-item{label="Esikatselu" icon="i-lucide-eye"}
::::chart-leaderboard
---
data:
  - { member: Anna, points: 1240 }
  - { member: Matti, points: 980 }
  - { member: Sanna, points: 870 }
  - { member: Jussi, points: 620 }
---
::::
:::
:::tabs-item{label="YAML" icon="i-lucide-file-code"}
```mdc
::chart-leaderboard
---
data:
  - { member: Anna, points: 1240 }
  - { member: Matti, points: 980 }
  - { member: Sanna, points: 870 }
  - { member: Jussi, points: 620 }
---
::
```
:::
:::tabs-item{label="Inline-props" icon="i-lucide-code"}
```mdc
::chart-leaderboard{:data='[{"member":"Anna","points":1240},{"member":"Matti","points":980}]'}
::
```
:::
::

Props: `data`.

## ChartTopics

Donitsi-kaavio aiheiden jakaumalle.

::tabs
:::tabs-item{label="Esikatselu" icon="i-lucide-eye"}
::::chart-topics
---
data:
  - { topic: Selain, count: 34 }
  - { topic: Palvelin, count: 22 }
  - { topic: Infra, count: 15 }
  - { topic: Suunnittelu, count: 9 }   
---
::::
:::
:::tabs-item{label="YAML" icon="i-lucide-file-code"}
```mdc
::chart-topics
---
data:
  - { topic: Selain, count: 34 }
  - { topic: Palvelin, count: 22 }
  - { topic: Infra, count: 15 }
  - { topic: Suunnittelu, count: 9 }
---
::
```
:::
:::tabs-item{label="Inline-props" icon="i-lucide-code"}
```mdc
::chart-topics{:data='[{"topic":"Selain","count":34},{"topic":"Palvelin","count":22}]'}
:: 
```
:::
::

Props: `data`.

## ChartGrowth

Aluekaavio aktiivisten jäsenten kehityksestä.

::tabs
:::tabs-item{label="Esikatselu" icon="i-lucide-eye"}
::::chart-growth
---
data:
  - { month: Tam, members: 12 }
  - { month: Hel, members: 19 }
  - { month: Maal, members: 27 }
  - { month: Huo, members: 31 }
---
::::
:::
:::tabs-item{label="YAML" icon="i-lucide-file-code"}
```mdc
::chart-growth
---
data:
  - { month: Tam, members: 12 }
  - { month: Hel, members: 19 }
  - { month: Maal, members: 27 }
  - { month: Huo, members: 31 }
---
::
```
:::
:::tabs-item{label="Inline-props" icon="i-lucide-code"}
```mdc
::chart-growth{:data='[{"month":"Tam","members":12},{"month":"Hel","members":19}]'}
::
```
:::
::

Props: `data`.

## ChartSprint

Pinottu pylväskaavio pyrähdyksistä.

::tabs
:::tabs-item{label="Esikatselu" icon="i-lucide-eye"}
::::chart-sprint
---
data:
  - { sprint: S1, done: 14, progress: 5, blocked: 2 }
  - { sprint: S2, done: 18, progress: 3, blocked: 1 }
  - { sprint: S3, done: 22, progress: 7, blocked: 0 }
---
::::
:::
:::tabs-item{label="YAML" icon="i-lucide-file-code"}
```mdc
::chart-sprint
---
data:
  - { sprint: S1, done: 14, progress: 5, blocked: 2 }
  - { sprint: S2, done: 18, progress: 3, blocked: 1 }
  - { sprint: S3, done: 22, progress: 7, blocked: 0 }
---
::
```
:::
:::tabs-item{label="Inline-props" icon="i-lucide-code"}
```mdc
::chart-sprint{:data='[{"sprint":"S1","done":14,"progress":5,"blocked":2}]'}
::
```
:::
::

Props: `data`.

## ChartFeedback

Donitsi-kaavio tapahtuman arvioista.

::tabs
:::tabs-item{label="Esikatselu" icon="i-lucide-eye"}
::::chart-feedback
---
data:
  - { rating: 5, count: 28 }
  - { rating: 4, count: 12 }
  - { rating: 3, count: 4 }
  - { rating: 2, count: 1 }
  - { rating: 1, count: 0 }
---
::::
:::
:::tabs-item{label="YAML" icon="i-lucide-file-code"}
```mdc
::chart-feedback
---
data:
  - { rating: 5, count: 28 }
  - { rating: 4, count: 12 }
  - { rating: 3, count: 4 }
  - { rating: 2, count: 1 }
  - { rating: 1, count: 0 }
---
::
```
:::
:::tabs-item{label="Inline-props" icon="i-lucide-code"}
```mdc
::chart-feedback{:data='[{"rating":5,"count":28},{"rating":4,"count":12}]'}
::
```
:::
::

Props: `data`.
