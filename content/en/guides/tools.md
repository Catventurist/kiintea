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

::tabs

:::tabs-item{label="Preview" icon="i-lucide-eye"}
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
:::

:::tabs-item{label="YAML" icon="i-lucide-file-code"}
```mdc
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
```
:::

:::tabs-item{label="Inline props" icon="i-lucide-code"}
```mdc
::compat-matrix{:columns='["Node 18","Node 20","Node 22"]' :rows='[{"name":"Kiintea","support":["supported","supported","supported"]},{"name":"Tailwind CSS","support":["partial","supported","supported"],"note":"Needs the v4 build on Node 18."},{"name":"Legacy plugin","support":["supported","partial","unsupported"]}]'}
::
```
:::

::

## Hero list

A hero whose blocks (headline, title, description, links) can be reordered by drag. The order is kept in `useState`, so it resets on a full page reload.

::tabs
:::tabs-item{label="Preview" icon="i-lucide-eye"}
::::hero-list
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
::::
:::
:::tabs-item{label="YAML" icon="i-lucide-file-code"}
```mdc
::hero-list
---
headline: Kiintea
title: Build faster with Vue
description: Drag the blocks to change their order.
sections: [headline, title, description, links]
links:
  - label: Get started
    to: /about
    icon: i-lucide-rocket
---
::
```
:::
:::tabs-item{label="Inline props" icon="i-lucide-code"}
```mdc
::hero-list{headline="Kiintea" title="Build faster with Vue" state-key="inline" :links='[{"label":"About","to":"/about"}]'}
::
```
:::
::

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

::tabs

:::tabs-item{label="Preview" icon="i-lucide-eye"}
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
:::

:::tabs-item{label="YAML" icon="i-lucide-file-code"}
```mdc
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
```
:::

:::tabs-item{label="Inline props" icon="i-lucide-code"}
```mdc
::install-builder{manager="pnpm" :packages='["@nuxt/ui","tailwindcss"]' :options='[{"label":"Nuxt Content","package":"@nuxt/content","checked":true},{"label":"Nuxt Image","package":"@nuxt/image"}]'}
::
```
:::

::

**Dev dependencies**

Set `dev` to install the packages as development dependencies.

::tabs

:::tabs-item{label="Preview" icon="i-lucide-eye"}
::install-builder{dev manager="npm" :packages='["eslint","typescript"]'}
::
:::

:::tabs-item{label="Code" icon="i-lucide-code"}
```mdc
::install-builder{dev manager="npm" :packages='["eslint","typescript"]'}
::
```
:::

::

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
:::tabs-item{label="YAML" icon="i-lucide-file-code"}
```mdc
::::playground
---
title: Try the components
rows: 8
examples:
  - label: Term
    description: Inline glossary term with a popover
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
:::tabs-item{label="Inline props" icon="i-lucide-code"}
```mdc
::playground{title="Inline" source='Nuxt renders pages with :term[SSR]{name="ssr"} by default.'}
::
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
- When the source contains `::` blocks, use four colons on the outer component, as in the YAML tab.
- Choosing another example replaces the current text. The Reset button restores the first example.
- The text is kept in `useState`, so it survives navigation but not a full page reload.
- The preview is rendered in the browser only. It is empty in the server-rendered HTML.

## ProgressCheck

A checklist with a progress bar. The bar fills as items are checked and turns green when all of them are done. The state is kept while you navigate between pages, but it resets on a full reload.

**Fields**
- `items` (array): the checklist items. Each one is either a string or an object.
- `items[].label` (string): item text. It must be unique within the checklist.
- `items[].description` (string, optional): text under the label.
- `items[].checked` (boolean, optional): start with the item checked.
- `title` (string, optional): heading shown above the progress bar.
- `id` (string, optional): unique key for the checklist state. Defaults to the page path, so give each checklist its own `id` if a page has more than one.

::tabs

:::tabs-item{label="Preview" icon="i-lucide-eye"}
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
:::

:::tabs-item{label="YAML" icon="i-lucide-file-code"}
```mdc
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
```
:::

:::tabs-item{label="Inline props" icon="i-lucide-code"}
```mdc
::progress-check{title="Migration" id="migration-v4" :items='["Update the dependency","Run the migration","Check the theme overrides","Deploy"]' :reset-label="Reset"}
::
```
:::

::

## Stats

A grid of number cards with an icon, a count-up animation and a spotlight that follows the cursor. Use it for the numbers you write yourself. To count things from the site automatically, see [Stats source](/guides/query#stats-source).

::tabs
:::tabs-item{label="Preview" icon="i-lucide-eye"}
::::stats
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
::::
:::
:::tabs-item{label="YAML" icon="i-lucide-file-code"}
```mdc
::stats
---
columns: 3
colorful: true
items:
  - label: Components
    value: 24
    icon: i-lucide-puzzle
    color: primary
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
  - label: Last release
    value: 4.7.0
    icon: i-lucide-tag
    color: neutral
---
::
```
:::
:::tabs-item{label="Inline props" icon="i-lucide-code"}
```mdc
::stats{:columns="2" :colorful="false"}
::
```
:::
::

Props: `items` (required, the list of cards), `columns` (optional, `2`, `3` or `4`, default `3`) and `colorful` (optional, default `true`).

Each item has a `label` (required) and optionally `value`, `unit`, `icon`, `color`, `progress` and `to`. A `value` that is a number counts up and is formatted for the current language. Any other value is shown as text, and a missing value shows a dash.

With `progress: true` and a numeric `value`, the card also shows a bar. The bar's maximum is 100, so use it for percentages. Quote `'%'` in YAML, because a bare `%` is a special character there.

`color` is one of `primary`, `secondary`, `success`, `info`, `warning`, `error` and `neutral`. It sets the spotlight, the icon and the bar. Without it, colors cycle through a set. With `colorful: false`, every card without a `color` uses `primary`. A card with `to` becomes a link, and the spotlight then replaces the normal hover effect.

The numbers count up and the cards fade in one after another. Both are switched off when the reader prefers reduced motion.

Inline attributes only set `columns` and `colorful`. The cards themselves must be in the YAML block, so the inline form alone shows nothing.

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
  - id: tailwind-classes-missing
    problem: Tailwind classes in markdown are missing
    severity: error
    tags: [tailwind, content]
    cause: Tailwind does not scan markdown files by default.
    fix: 'Add a @source directive for the content directory to your main CSS file.'
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
:::tabs-item{label="YAML" icon="i-lucide-file-code"}
```mdc
::troubleshooting
---
group: setup
title: Common problems
searchable: true
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
    links:
      - label: Content integration
        to: https://ui.nuxt.com/docs/getting-started/integrations/content
  - id: links-not-prefixed
    problem: Links are not prefixed with the locale
    severity: info
    since: '4.7+'
    tags: [i18n]
    cause: 'The @nuxtjs/i18n module is not installed, or the link is external.'
    fix: 'Install @nuxtjs/i18n.'
---
::
```
:::
:::tabs-item{label="Inline props" icon="i-lucide-code"}
```mdc
::troubleshooting{title="Common problems" group="setup" :searchable="false"}
::
```
:::
::

Props: `items` (required, the list of problems), `title` (optional), `group` (optional, default `default`) and `searchable` (optional, default `true`).

Each item has `id`, `problem`, `cause` and `fix` (all required), and optionally `severity` (`error`, `warning` or `info`, default `info`), `tags` (a list), `since` (a version string, quoted), `code` (`content`, plus optional `lang` and `file`) and `links` (a list of `label` and `to`).

Inline attributes only set the simple props. The list itself must be in the YAML block, so the inline form alone shows the empty state.

Give every list on the same page its own `group`, so their search boxes stay separate. An `id` can be linked to directly, for example `#prose-not-styled`, and the page opens that entry on load. Keep the same `id` in both languages so these links survive a language switch.

To fill the list from content files instead, see the [Troubleshooting source](/guides/query#troubleshooting-source).

## QuizList

A drag-and-drop quiz where the reader puts steps in the right order. List the items in the correct order, and the component shuffles them. It works with the keyboard too, through the up and down buttons on every item.

::tabs
:::tabs-item{label="Preview" icon="i-lucide-eye"}
::::quiz-list
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
::::
:::
:::tabs-item{label="YAML" icon="i-lucide-file-code"}
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
hint: '@nuxt/ui has to be installed before you register it.'
---
::
```
:::
:::tabs-item{label="Inline props" icon="i-lucide-code"}
```mdc
::quiz-list{title="Put the setup steps in the right order" :items='["Install `@nuxt/ui`", "Add it to `modules`", "Import it in `main.css`"]' success="Correct!" fail="Not quite."}
::
```
:::
::

Props: `title` (required, the question), `items` (required, the steps in the correct order), `success` and `fail` (required, the messages shown after Check) and `hint` (optional, shown after two wrong attempts).

The Check button stays disabled until the reader has moved something. A wrong answer shows a Try again button, and the list is reshuffled so it never starts in the solved order.

The answer is part of the page, so anyone can find it in the page source. Use the quiz for learning, not for anything that has to stay secret.

## Scenario

A short story told step by step. Each step can point to a flow entity, so the reader sees how the pieces of the system fit together. Readers can go back and forth with the buttons, or jump to any step by clicking it.

::tabs
:::tabs-item{label="Preview" icon="i-lucide-eye"}
::::scenario
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
::::
:::
:::tabs-item{label="YAML" icon="i-lucide-file-code"}
```mdc
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
```
:::
:::tabs-item{label="Inline props" icon="i-lucide-code"}
```mdc
::scenario{title="Anna and the chairs" :steps='[{"title":"A need","entity":"intent","description":"The hall needs ten chairs."},{"title":"A promise","entity":"commitment","description":"Anna promises to bring them."}]'}
::
```
:::
::

Props: `steps` (required, a list of steps) and `title` (optional, shown above the stepper). Each step has a `title`, and optionally a `description` (markdown works), an `icon` and an `entity`.

The `entity` is the name of a flow page in kebab case, like `economic-event`. It shows the translated entity name as a link to `/flow/<entity>`. Use only names that exist in the flow section, or the link goes nowhere.

