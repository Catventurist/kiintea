---
title: Advanced Tools
description: How to use Markdown-based advanced tools.
navigation:
  title: Advanced Tools
  icon: i-lucide-hammer
layout: dashboard
sidebar: true
collapsed: true
splitter: true
toc: true
surround: true
---

Some heavier examples

## ChartList

A bar chart whose rows can be reordered by drag or sorted with the buttons. The order is kept in `useState`, so it resets on a full page reload.

:::code-preview
::chart-list
---
state-key: preview
type: bar
data:
  - { month: january, desktop: 186, mobile: 80 }
  - { month: february, desktop: 305, mobile: 200 }
  - { month: march, desktop: 237, mobile: 120 }
---
::

#code
```mdc
::chart-list
---
type: bar
data:
  - { month: january, desktop: 186, mobile: 80 }
  - { month: february, desktop: 305, mobile: 200 }
---
::
```
:::

Props: `data`, `type` (default `bar`), `sortable` (default `true`), `stateKey` (default `default`).

## Playground

An editable MDC example. The reader changes the source and sees your real components render next to it. The preview updates after a short pause. A syntax error shows a message and keeps the last good preview.

::tabs
:::tabs-item{label="Preview" icon="i-lucide-eye"}
::::playground
---
title: Try the components
rows: 6
state-key: docs-preview
examples:
  - label: Term
    description: Inline glossary term with a popover
    source: |
      Nuxt renders pages with :term[SSR]{name="ssr"} by default.
  - label: Term with a tooltip
    description: A one-off term with no glossary entry
    source: |
      Nuxt makes pages interactive through :term[hydration]{text="Making server-rendered HTML interactive in the browser."}.
---
::::
:::
:::tabs-item{label="Code" icon="i-lucide-code"}
```mdc
::::playground
---
title: Try the components
rows: 8
examples:
  - label: Term
    source: |
      Nuxt renders pages with :term[SSR]{name="ssr"} by default.
  - label: Hero list
    source: |
      ::hero-list
      ---
      title: Playground hero
      ---
      ::
---
::::
```
:::
::

**Props**

- `title`: a heading in the toolbar.
- `source`: a single starting text. Use it when there is only one example.
- `examples`: a list of `label`, `source` and an optional `description`. With two or more, a menu appears. With more than six, the menu also gets a search box.
- `rows`: the height of the editor in lines. The default is `12`.
- `stateKey`: the key under which the text is kept in `useState`. The default is `default`. Give each playground on one page its own key, or they will share their text.

**Good to know**

- The playground can render any component in `components/content/`, except itself.
- When the source contains `::` blocks, use four colons on the outer component, as in the Code tab.
- Choosing another example replaces the current text. The Reset button restores the first example.
- The text is kept in `useState`, so it survives navigation but not a full page reload.
- The preview is rendered in the browser only. It is empty in the server-rendered HTML.

## Scenario

A short story told step by step. Each step can point to a flow entity, so the reader sees how the pieces of the system fit together. Readers can go back and forth with the buttons, or jump to any step by clicking it.

:::code-preview
::scenario
---
title: Anna and the chairs
steps:
  - title: A need
    icon: i-lucide-megaphone
    entity: intent
    description: The community hall needs ten chairs for Saturday's shared meal.
  - title: A promise
    icon: i-lucide-handshake
    entity: commitment
    description: Anna promises to bring ten chairs.
  - title: It happens
    icon: i-lucide-truck
    entity: economic-event
    description: The chairs are delivered to the hall on Friday.
---
::

#code
```mdc
::scenario
---
title: Anna and the chairs
steps:
  - title: A need
    entity: intent
    description: The hall needs ten chairs.
  - title: A promise
    entity: commitment
    description: Anna promises to bring them.
---
::
```
:::

Props: `steps` (required, a list of steps) and `title` (optional, shown above the stepper). Each step has a `title`, and optionally a `description` (markdown works), an `icon` and an `entity`.

The `entity` is the name of a flow page in kebab case, like `economic-event`. It shows the translated entity name as a link to `/flow/<entity>`. Use only names that exist in the flow section, or the link goes nowhere.

## SkillFinder

Find out who in the community can help with what. Readers pick a skill and see members ranked by level, with experience, learning goals and projects. Cards expand for details. With `sortable`, the skills and learning goals inside a card can be reordered by drag. The order resets on a full page reload.

::tabs
:::tabs-item{label="Preview" icon="i-lucide-eye"}
::::skill-finder
---
sortable: true
members:
  - name: cat
    to: /guides/team/cat
    role: Maintainer
    since: 2021
    availability: Weekday evenings
    openToHelp: true
    skills:
      - name: Nuxt
        level: 4
        years: 3
        note: Modules and SSR
      - name: Vue
        level: 4
        years: 5
    learning:
      - name: Testing
        progress: 40
        goal: Write e2e tests for my modules
    projects:
      - title: nuxt-extras
        to: https://github.com/example/nuxt-extras
  - name: dog
    role: Contributor
    since: 2023
    availability: Weekends
    openToHelp: false
    skills:
      - name: Testing
        level: 3
        years: 2
    learning:
      - name: Nuxt
        progress: 70
---
::::
:::
:::tabs-item{label="Code" icon="i-lucide-code"}
```mdc
::skill-finder
---
sortable: true
minLevel: 3
members:
  - name: cat
    role: Maintainer
    since: 2021
    openToHelp: true
    skills:
      - name: Nuxt
        level: 4
        years: 3
    learning:
      - name: Testing
        progress: 40
---
::
```
:::
::

Props: `members`, `sortable` (default `false`), `minLevel` (default `3`), `avatar` (default `/catlight.webp`), `avatarDark` (default `/catdark.webp`).

**Member fields:** `name`, `to`, `role`, `since`, `availability`, `openToHelp`, `skills`, `learning`, `projects`.

**Skill fields:** `name`, `level` (1 to 4), `years`, `note`.

**Learning fields:** `name`, `progress` (0 to 100), `goal`.

## Troubleshooting

A searchable list of problems with their cause and fix. Readers can type part of an error message, filter by tag, and open one entry at a time or all of them.

::tabs
:::tabs-item{label="Preview" icon="i-lucide-eye"}
::::troubleshooting
---
group: tools-demo
title: Common problems
items:
  - id: prose-not-styled
    problem: Prose components are not styled
    severity: warning
    tags: [content, config]
    cause: 'The @nuxt/content module is registered before @nuxt/ui, so the prose components are not available.'
    fix: 'Register @nuxt/content after @nuxt/ui in the modules array.'
    code:
      lang: ts
      file: nuxt.config.ts
      content: |
        export default defineNuxtConfig({
          modules: [
            '@nuxt/ui',
            '@nuxt/content'
          ]
        })
  - id: links-not-prefixed
    problem: Links are not prefixed with the locale
    severity: info
    since: '4.7+'
    tags: [i18n]
    cause: 'The @nuxtjs/i18n module is not installed, or the link is external.'
    fix: 'Install @nuxtjs/i18n. Internal links on ULink and UButton are localized automatically.'
---
::::
:::
:::tabs-item{label="Code" icon="i-lucide-code"}
```mdc
::troubleshooting
---
group: setup
title: Common problems
searchable: true
items:
  - id: links-not-prefixed
    problem: Links are not prefixed with the locale
    severity: info
    since: '4.7+'
    tags: [i18n]
    cause: 'The @nuxtjs/i18n module is not installed.'
    fix: 'Install @nuxtjs/i18n.'
    links:
      - label: i18n integration
        to: https://ui.nuxt.com/docs/getting-started/integrations/i18n
---
::
```
:::
::

Props: `items` (required, the list of problems), `title` (optional), `group` (optional, default `default`) and `searchable` (optional, default `true`).

Each item has `id`, `problem`, `cause` and `fix` (all required), and optionally `severity` (`error`, `warning` or `info`, default `info`), `tags` (a list), `since` (a version string, quoted), `code` (`content`, plus optional `lang` and `file`) and `links` (a list of `label` and `to`).

Inline attributes only set the simple props. The list itself must be in the YAML block.

Give every list on the same page its own `group`, so their search boxes stay separate. An `id` can be linked to directly, for example `#prose-not-styled`, and the page opens that entry on load. Keep the same `id` in both languages so these links survive a language switch.

To fill the list from content files instead, see the [Troubleshooting source](/guides/query#troubleshooting-source).
