---
title: Charts
description: Cute charts for the community.
navigation:
  title: Charts
  icon: i-lucide-bar-chart-3
layout: dashboard
sidebar: true
toc: true
collapsed: true
surround: true
---

## ChartPoll

A donut or bar chart for poll results.

::tabs
:::tabs-item{label="Preview" icon="i-lucide-eye"}
::::chart-poll
---
question: Should we migrate to Nuxt 5?
type: donut
data:
  - { label: Yes, count: 42 }
  - { label: No, count: 18 }
  - { label: Maybe, count: 7 }
---
::::
:::
:::tabs-item{label="YAML" icon="i-lucide-file-code"}
```mdc
::chart-poll
---
question: Should we migrate to Nuxt 5?
type: donut
data:
  - { label: Yes, count: 42 }
  - { label: No, count: 18 }
  - { label: Maybe, count: 7 }
---
::
```
:::
:::tabs-item{label="Inline props" icon="i-lucide-code"}
```mdc
::chart-poll{type="bar" :data='[{"label":"Yes","count":42},{"label":"No","count":18}]'}
::
```
:::
::

Props: `question`, `type` (default `donut`), `data`.

## ChartAttendance

A line chart for tracking values over time.

::tabs
:::tabs-item{label="Preview" icon="i-lucide-eye"}
::::chart-attendance
---
title: Monthly Attendance
data:
  - { month: Sep, count: 34 }
  - { month: Oct, count: 51 }
  - { month: Nov, count: 63 }
---
::::
:::
:::tabs-item{label="YAML" icon="i-lucide-file-code"}
```mdc
::chart-attendance
---
title: Monthly Attendance
data:
  - { month: Sep, count: 34 }
  - { month: Oct, count: 51 }
  - { month: Nov, count: 63 }
---
::
```
:::
:::tabs-item{label="Inline props" icon="i-lucide-code"}
```mdc
::chart-attendance{title="Monthly Attendance" :data='[{"month":"Sep","count":34},{"month":"Oct","count":51}]'}
::
```
:::
::

Props: `title`, `data`.

## ChartRevenue

A stacked area chart for tracking revenue vs costs.

::tabs
:::tabs-item{label="Preview" icon="i-lucide-eye"}
::::chart-revenue
---
data:
  - { month: Jan, revenue: 12400, costs: 8200 }
  - { month: Feb, revenue: 18600, costs: 9100 }
  - { month: Mar, revenue: 15300, costs: 7800 }
  - { month: Apr, revenue: 21000, costs: 10400 }
---
::::
:::
:::tabs-item{label="YAML" icon="i-lucide-file-code"}
```mdc
::chart-revenue
---
data:
  - { month: Jan, revenue: 12400, costs: 8200 }
  - { month: Feb, revenue: 18600, costs: 9100 }
  - { month: Mar, revenue: 15300, costs: 7800 }
  - { month: Apr, revenue: 21000, costs: 10400 }
---
::
```
:::
:::tabs-item{label="Inline props" icon="i-lucide-code"}
```mdc
::chart-revenue{:data='[{"month":"Jan","revenue":12400,"costs":8200},{"month":"Feb","revenue":18600,"costs":9100}]'}
::
```
:::
::

Props: `data`.

## ChartLeaderboard

A horizontal bar chart for top contributors.

::tabs
:::tabs-item{label="Preview" icon="i-lucide-eye"}
::::chart-leaderboard
---
data:
  - { member: Anna, points: 1240 }
  - { member: Mikko, points: 980 }
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
  - { member: Mikko, points: 980 }
  - { member: Sanna, points: 870 }
  - { member: Jussi, points: 620 }
---
::
```
:::
:::tabs-item{label="Inline props" icon="i-lucide-code"}
```mdc
::chart-leaderboard{:data='[{"member":"Anna","points":1240},{"member":"Mikko","points":980}]'}
::
```
:::
::

Props: `data`.

## ChartTopics

A donut chart for topic distribution.

::tabs
:::tabs-item{label="Preview" icon="i-lucide-eye"}
::::chart-topics
---
data:
  - { topic: Frontend, count: 34 }
  - { topic: Backend, count: 22 }
  - { topic: DevOps, count: 15 }
  - { topic: Design, count: 9 }
---
::::
:::
:::tabs-item{label="YAML" icon="i-lucide-file-code"}
```mdc
::chart-topics
---
data:
  - { topic: Frontend, count: 34 }
  - { topic: Backend, count: 22 }
  - { topic: DevOps, count: 15 }
  - { topic: Design, count: 9 }
---
::
```
:::
:::tabs-item{label="Inline props" icon="i-lucide-code"}
```mdc
::chart-topics{:data='[{"topic":"Frontend","count":34},{"topic":"Backend","count":22}]'}
::
```
:::
::

Props: `data`.

## ChartGrowth

Area chart for active members over time.

::tabs
:::tabs-item{label="Preview" icon="i-lucide-eye"}
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
:::tabs-item{label="Inline props" icon="i-lucide-code"}
```mdc
::chart-growth{:data='[{"month":"Tam","members":12},{"month":"Hel","members":19}]'}
::
```
:::
::

Props: `data`.

## ChartSprint

Stacked bar for sprint status.

::tabs
:::tabs-item{label="Preview" icon="i-lucide-eye"}
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
:::tabs-item{label="Inline props" icon="i-lucide-code"}
```mdc
::chart-sprint{:data='[{"sprint":"S1","done":14,"progress":5,"blocked":2}]'}
::
```
:::
::

Props: `data`.

## ChartFeedback

Donut for event ratings.

::tabs
:::tabs-item{label="Preview" icon="i-lucide-eye"}
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
:::tabs-item{label="Inline props" icon="i-lucide-code"}
```mdc
::chart-feedback{:data='[{"rating":5,"count":28},{"rating":4,"count":12}]'}
::
```
:::
::

Props: `data`.
