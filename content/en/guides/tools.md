---
title: Tools
description: How to use Markdown-based tools.
navigation:
  title: Tools
  icon: i-lucide-wrench
layout: dashboard
sidebar: true
collapsed: true
splitter: true
toc: true
surround: true
---

Small interactive components for documentation pages. Each one works from Markdown with MDC.

## Passing props inline

Short values can go in braces, and lists as JSON in single quotes. A colon in front of a name (`:sortable`) means the value is read as JSON, so `:sortable="false"` is a boolean and `sortable="false"` is the text "false".

```mdc
::tier-list{state-key="demo" :sortable="false" :items='["Nuxt UI","i18n"]'}
::
```

Longer data goes in a YAML block, as in the examples below. Inline attributes can't replace the YAML block for components whose content is a long list.


## CompatMatrix

A compatibility matrix with one row per dependency and one cell per version. Each cell shows whether the version is supported, partly supported or not supported. Drag the grip handle to reorder the rows.

**Fields**
- `columns` (string[]): the versions shown as column headers.
- `rows` (array): the dependencies, one row each.
- `rows[].name` (string): dependency name. It must be unique.
- `rows[].support` (string[]): one status per column, in the same order as `columns`. Use `supported`, `partial` or `unsupported`. Any other value, or a missing one, is shown as unknown.
- `rows[].note` (string, optional): extra information, shown as a tooltip on the row.
- `size` (`xs` | `sm` | `md`, optional): size of the cells. Defaults to `md`.

Don't use `yes` or `no` as statuses. Some YAML parsers turn them into booleans.

:::code-preview
::compat-matrix
---
columns:
  - Node 18
  - Node 20
  - Node 22
rows:
  - name: Kiintea
    support: [supported, supported, supported]
  - name: Tailwind CSS
    support: [partial, supported, supported]
    note: Needs the v4 build on Node 18.
  - name: Legacy plugin
    support: [supported, partial, unsupported]
---
::

#code
```mdc
::compat-matrix
---
columns:
  - Node 18
  - Node 20
rows:
  - name: Tailwind CSS
    support: [partial, supported]
    note: Needs the v4 build on Node 18.
---
::
```
:::

## Hero list

A hero whose blocks (headline, title, description, links) can be reordered by drag. The order is kept in `useState`, so it resets on a full page reload.

:::code-preview
::hero-list
---
headline: Kiintea
title: Build faster with Vue
description: Drag the blocks to change their order.
state-key: preview
links:
  - label: Get started
    to: /guides
    icon: i-lucide-rocket
---
::

#code
```mdc
::hero-list
---
headline: Kiintea
title: Build faster with Vue
sections: [headline, title, description, links]
links:
  - label: Get started
    to: /guides
    icon: i-lucide-rocket
---
::
```
:::

Props: `headline`, `title`, `description`, `links`, `sections` (initial order), `sortable` (default `true`), `stateKey` (default `default`).

## InstallBuilder

Builds an install command from a package manager, a list of packages and optional add-ons. The choice of package manager is shared between all builders on the page. A copy button copies the finished command.

**Fields**
- `packages` (string[], optional): packages that are always installed.
- `options` (array, optional): add-ons shown as checkboxes.
- `options[].label` (string): checkbox label.
- `options[].package` (string): package name added when the box is checked.
- `options[].description` (string, optional): text under the label.
- `options[].checked` (boolean, optional): start with the box checked.
- `dev` (boolean, optional): use the dev flag (`-D`, or `-d` for bun). Defaults to `false`.
- `manager` (`npm` | `pnpm` | `yarn` | `bun`, optional): package manager shown first. Defaults to `pnpm`.

Package names that start with `@` must be quoted in YAML, for example `"@nuxt/ui"`.

:::code-preview
::install-builder
---
manager: pnpm
packages:
  - "@nuxt/ui"
  - tailwindcss
options:
  - label: Nuxt Content
    package: "@nuxt/content"
    description: Markdown and MDC support.
    checked: true
  - label: Nuxt Image
    package: "@nuxt/image"
    description: Optimized images.
---
::

#code
```mdc
::install-builder
---
manager: pnpm
packages:
  - "@nuxt/ui"
options:
  - label: Nuxt Content
    package: "@nuxt/content"
    checked: true
---
::
```
:::

**Dev dependencies**

Set `dev` to install the packages as development dependencies.

:::code-preview
::install-builder{dev manager="npm" :packages='["eslint","typescript"]'}
::

#code
```mdc
::install-builder{dev manager="npm" :packages='["eslint","typescript"]'}
::
```
:::

## ProgressCheck

A checklist with a progress bar. The bar fills as items are checked and turns green when all of them are done. The state is kept while you navigate between pages, but it resets on a full reload.

**Fields**
- `items` (array): the checklist items. Each one is either a string or an object.
- `items[].label` (string): item text. It must be unique within the checklist.
- `items[].description` (string, optional): text under the label.
- `items[].checked` (boolean, optional): start with the item checked.
- `title` (string, optional): heading shown above the progress bar.
- `id` (string, optional): unique key for the checklist state. Defaults to the page path, so give each checklist its own `id` if a page has more than one.
- `resetLabel` (string, optional): text of the reset button. In inline form, write it as `reset-label="Reset"`, with no colon.

:::code-preview
::progress-check
---
title: Migration
id: migration-v4
reset-label: Reset
items:
  - label: Update the dependency
    description: Install the latest version.
  - label: Run the migration
  - label: Check the theme overrides
  - label: Deploy
---
::

#code
```mdc
::progress-check
---
title: Migration
id: migration-v4
items:
  - Update the dependency
  - Run the migration
  - Deploy
---
::
```
:::

## Stats

A grid of number cards with an icon, a count-up animation and a spotlight that follows the cursor. Use it for the numbers you write yourself. To count things from the site automatically, see [Stats source](/guides/query#stats-source).

:::code-preview
::stats
---
columns: 3
items:
  - label: Components
    value: 24
    icon: i-lucide-puzzle
  - label: Pages
    value: 48
    icon: i-lucide-files
  - label: Translated
    value: 80
    unit: '%'
    progress: true
    icon: i-lucide-languages
---
::

#code
```mdc
::stats
---
columns: 3
colorful: true
items:
  - label: Translated
    value: 80
    unit: '%'
    progress: true
    icon: i-lucide-languages
    color: success
  - label: Open issues
    value: 3
    icon: i-lucide-circle-alert
    color: warning
    to: https://github.com/nuxt/ui/issues
---
::
```
:::

Props: `items` (required, the list of cards), `columns` (optional, `2`, `3` or `4`, default `3`) and `colorful` (optional, default `true`).

Each item has a `label` (required) and optionally `value`, `unit`, `icon`, `color`, `progress` and `to`. A `value` that is a number counts up and is formatted for the current language. Any other value is shown as text, and a missing value shows a dash.

With `progress: true` and a numeric `value`, the card also shows a bar. The bar's maximum is 100, so use it for percentages. Quote `'%'` in YAML, because a bare `%` is a special character there.

`color` is one of `primary`, `secondary`, `success`, `info`, `warning`, `error` and `neutral`. It sets the spotlight, the icon and the bar. Without it, colors cycle through a set. With `colorful: false`, every card without a `color` uses `primary`. A card with `to` becomes a link, and the spotlight then replaces the normal hover effect.

The numbers count up and the cards fade in one after another. Both are switched off when the reader prefers reduced motion.

Inline attributes only set `columns` and `colorful`. The cards themselves must be in the YAML block.


## QuizList

A drag-and-drop quiz where the reader puts steps in the right order. List the items in the correct order, and the component shuffles them. It works with the keyboard too, through the up and down buttons on every item.

:::code-preview
::quiz-list
---
title: Put the setup steps in the right order
items:
  - Install `@nuxt/ui`
  - Add it to `modules`
  - Import it in `main.css`
success: Correct!
fail: Not quite.
hint: '@nuxt/ui has to be installed before you register it.'
---
::

#code
```mdc
::quiz-list
---
title: Put the setup steps in the right order
items:
  - Install `@nuxt/ui`
  - Add it to `modules`
  - Import it in `main.css`
success: Correct!
fail: Not quite.
---
::
```
:::

Props: `title` (required, the question), `items` (required, the steps in the correct order), `success` and `fail` (required, the messages shown after Check) and `hint` (optional, shown after two wrong attempts).

The Check button stays disabled until the reader has moved something. A wrong answer shows a Try again button, and the list is reshuffled so it never starts in the solved order.

The answer is part of the page, so anyone can find it in the page source. Use the quiz for learning, not for anything that has to stay secret.

## ResourceGroup

A list of resources with their contributors. The rows can be reordered by drag. The order lives in the component, so it resets on a full page reload.

:::code-preview
::resource-group
---
items:
  - title: Following resources
    to: /flow
    type: article
    contributors: [bird]
  - title: Reading guides
    to: /guides
    type: text
    contributors: [cat, dog]
---
::

#code
```mdc
::resource-group
---
items:
  - title: Reading guides
    to: /guides
    type: text
    contributors: [cat, dog]
---
::
```
:::

Props: `items`, `avatar` (default `/catlight.webp`), `avatarDark` (default `/catdark.webp`), `handle` (default `true`).

## Tier list

A ranking board where readers drag items between tiers. Items start in an "Unranked" row. The ranking is kept in `useState`, so it survives navigation but resets on a full page reload.

:::code-preview
::tier-list
---
state-key: preview
tiers:
  - label: S
    color: error
  - label: A
    color: warning
  - label: B
    color: success
  - label: C
    color: info
items:
  - label: Nuxt UI
    icon: i-lucide-layout-dashboard
  - label: Nuxt Content
    icon: i-lucide-file-text
  - label: VueUse
    icon: i-lucide-zap
  - i18n
---
::

#code
```mdc
::tier-list
---
state-key: favorite-tools
tiers:
  - label: S
    color: error
  - label: A
    color: warning
items:
  - label: Nuxt UI
    icon: i-lucide-layout-dashboard
  - i18n
---
::
```
:::

Props: `tiers`, `items`, `stateKey` (default `default`), `sortable` (default `true`).
