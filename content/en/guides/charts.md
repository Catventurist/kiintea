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

Ready-made charts for community data. Each one works from Markdown with MDC. Give it a list in the `data` prop, written as a YAML block, and the chart does the rest.

## Overview

| Component | Chart | Data fields |
| --- | --- | --- |
| `chart-poll` | Donut or bar | `label`, `count` |
| `chart-attendance` | Line | `month`, `count` |
| `chart-revenue` | Stacked area | `month`, `revenue`, `costs` |
| `chart-leaderboard` | Horizontal bar | `member`, `points` |
| `chart-topics` | Donut | `topic`, `count` |
| `chart-growth` | Area | `month`, `members` |
| `chart-sprint` | Stacked bar | `sprint`, `done`, `progress`, `blocked` |
| `chart-feedback` | Donut | `rating`, `count` |

**Good to know**

- `data` is a list of objects. The field names in the table are fixed, and each chart reads only its own fields.
- Numbers (`count`, `points`, `revenue`) must be plain numbers, without quotes or thousand separators.
- Labels (`month`, `label`, `topic`, `member`, `sprint`) are shown as written, so write them in the language of the page.
- For short values, inline props also work. See [Passing props inline](/guides/tools#passing-props-inline).

## ChartPoll

A donut or bar chart for poll results.

:::code-preview
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

#code
```mdc
::chart-poll
---
question: Should we migrate to Nuxt 5?
type: bar
data:
  - { label: Yes, count: 42 }
  - { label: No, count: 18 }
---
::
```
:::

Props: `question` (the heading of the poll), `type` (`donut` or `bar`, default `donut`) and `data` (a list of `label` and `count`).

## ChartAttendance

A line chart for tracking a value over time, such as event attendance.

:::code-preview
::chart-attendance
---
title: Monthly Attendance
data:
  - { month: Sep, count: 34 }
  - { month: Oct, count: 51 }
  - { month: Nov, count: 63 }
---
::

#code
```mdc
::chart-attendance
---
title: Monthly Attendance
data:
  - { month: Sep, count: 34 }
  - { month: Oct, count: 51 }
---
::
```
:::

Props: `title` and `data` (a list of `month` and `count`).

## ChartRevenue

A stacked area chart that compares revenue with costs.

:::code-preview
::chart-revenue
---
data:
  - { month: Jan, revenue: 12400, costs: 8200 }
  - { month: Feb, revenue: 18600, costs: 9100 }
  - { month: Mar, revenue: 15300, costs: 7800 }
  - { month: Apr, revenue: 21000, costs: 10400 }
---
::

#code
```mdc
::chart-revenue
---
data:
  - { month: Jan, revenue: 12400, costs: 8200 }
  - { month: Feb, revenue: 18600, costs: 9100 }
---
::
```
:::

Props: `data` (a list of `month`, `revenue` and `costs`).

## ChartLeaderboard

A horizontal bar chart for the top contributors.

:::code-preview
::chart-leaderboard
---
data:
  - { member: Anna, points: 1240 }
  - { member: Mikko, points: 980 }
  - { member: Sanna, points: 870 }
  - { member: Jussi, points: 620 }
---
::

#code
```mdc
::chart-leaderboard
---
data:
  - { member: Anna, points: 1240 }
  - { member: Mikko, points: 980 }
---
::
```
:::

Props: `data` (a list of `member` and `points`).

## ChartTopics

A donut chart for the distribution of topics.

:::code-preview
::chart-topics
---
data:
  - { topic: Frontend, count: 34 }
  - { topic: Backend, count: 22 }
  - { topic: DevOps, count: 15 }
  - { topic: Design, count: 9 }
---
::

#code
```mdc
::chart-topics
---
data:
  - { topic: Frontend, count: 34 }
  - { topic: Backend, count: 22 }
---
::
```
:::

Props: `data` (a list of `topic` and `count`).

## ChartGrowth

An area chart for the number of active members over time.

:::code-preview
::chart-growth
---
data:
  - { month: Jan, members: 12 }
  - { month: Feb, members: 19 }
  - { month: Mar, members: 27 }
  - { month: Apr, members: 31 }
---
::

#code
```mdc
::chart-growth
---
data:
  - { month: Jan, members: 12 }
  - { month: Feb, members: 19 }
---
::
```
:::

Props: `data` (a list of `month` and `members`).

## ChartSprint

A stacked bar chart for sprint status.

:::code-preview
::chart-sprint
---
data:
  - { sprint: S1, done: 14, progress: 5, blocked: 2 }
  - { sprint: S2, done: 18, progress: 3, blocked: 1 }
  - { sprint: S3, done: 22, progress: 7, blocked: 0 }
---
::

#code
```mdc
::chart-sprint
---
data:
  - { sprint: S1, done: 14, progress: 5, blocked: 2 }
  - { sprint: S2, done: 18, progress: 3, blocked: 1 }
---
::
```
:::

Props: `data` (a list of `sprint`, `done`, `progress` and `blocked`). Each number is a count of items in that state.

## ChartFeedback

A donut chart for event ratings.

:::code-preview
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

#code
```mdc
::chart-feedback
---
data:
  - { rating: 5, count: 28 }
  - { rating: 4, count: 12 }
---
::
```
:::

Props: `data` (a list of `rating`, from 1 to 5, and `count`).

## ScrollChart

A chart that is told step by step while the reader scrolls. The chart stays pinned beside the text, and each step changes which lines are emphasized. A thin progress bar at the top shows how far the reader has come.

```mdc
::scroll-chart
---
x: year
yLabel: Debt / GDP (%)
series:
  - key: debt
    label: Debt / GDP
    color: error
  - key: unemployment
    label: Unemployment (%)
    color: info
data:
  - { year: '1986', debt: 16.4, unemployment: 5.3 }
  - { year: '1996', debt: 55.4, unemployment: 15.6 }
  - { year: '2006', debt: 38.0, unemployment: 7.7 }
  - { year: '2016', debt: 68.0, unemployment: 8.8 }
  - { year: '2026', debt: 90, unemployment: 11 }
steps:
  - text: Debt starts low, and the first crisis pushes it up fast.
    show: [debt]
    range: ['1986', '1996']
  - text: By 2026 it has passed the 60% limit.
    show: [debt]
    rules:
      - { y: 60, color: warning }
  - text: Unemployment follows the same path.
    show: [debt, unemployment]
---
::
```

::scroll-chart
---
x: year
yLabel: Debt / GDP (%)
series:
  - key: debt
    label: Debt / GDP
    color: error
  - key: unemployment
    label: Unemployment (%)
    color: info
data:
  - { year: '1986', debt: 16.4, unemployment: 5.3 }
  - { year: '1996', debt: 55.4, unemployment: 15.6 }
  - { year: '2006', debt: 38.0, unemployment: 7.7 }
  - { year: '2016', debt: 68.0, unemployment: 8.8 }
  - { year: '2026', debt: 90, unemployment: 11 }
steps:
  - text: Debt starts low, and the first crisis pushes it up fast.
    show: [debt]
    range: ['1986', '1996']
  - text: By 2026 it has passed the 60% limit.
    show: [debt]
    rules:
      - { y: 60, color: warning }
  - text: Unemployment follows the same path.
    show: [debt, unemployment]
---
::

**Props**

- `data` (required): the rows to plot, one object per x value.
- `x` (required): the key of each row used for the x axis.
- `series` (required): the lines to draw. Each has a `key` (a field of the rows), a `label` and an optional `color`, which is a Nuxt UI color name such as `error` or `info`. The default is `primary`.
- `steps` (required): the story, in order.
- `yLabel` (optional): the title of the y axis. It is also the accessible name of the chart.
- `stepHeight` (optional): how much scrolling each step takes, in `dvh`. The default is `90`. Raise it for a slower story.

**Step fields**

- `text` (required): the sentence shown for the step. It is plain text.
- `show` (optional): the series to emphasize, by `key`. The others fade into the background. Leave it out to emphasize all of them.
- `range` (optional): `[from, to]`, two x values. Only that part of the lines is emphasized. The rest stays visible but faint.
- `rules` (optional): horizontal reference lines. Each has a `y` value and an optional `color`, which is a Nuxt UI color name. The default is `warning`.

**Good to know**

- **The axes never move.** The whole data set is always plotted, so the chart doesn't jump between steps. Steps only change the emphasis and the reference lines.
- **The chart is pinned from tablet width up.** Below `md` (768 px), it sits above the text and stays pinned while the text scrolls under it. Its height follows the height of the screen.
- **Use numbers in the data.** Write years as quoted strings (`'1996'`), so they stay labels, and write values as plain numbers, without a thousand separator.
- **Every `key` in `series` must exist in every row.** A missing value is drawn as a gap or as `0`.
- **One per page.** The progress bar is pinned to the top of the page, so two of them would overlap.
- **Keep it short.** Three to six steps works well. Each step takes about a screen of scrolling.
- **Accessibility.** The current step's text is given to assistive technology as the chart's description. The lines are not the only way to read the data, so put the key numbers in the step text.
- **Without JavaScript,** the chart doesn't render, but the steps' text is still in the page.
