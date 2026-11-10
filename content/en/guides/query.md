---
title: Query
description: MDC with Content queries.
navigation:
  title: Query
  icon: i-lucide-file-question-mark
sidebar: true
collapsed: true
splitter: true
toc: true
surround: true
---

Some components look for files for additional data. Standalone components can be tricky with Content queries.

Most components in this site are pure: they render the props or YAML block you give them. The components on this page also read content collections, so their data follows the current language and stays in sync with the content.

## Bilingual view

The same page in English and Finnish side by side, with linked scrolling. It's meant for checking translations: blocks line up even when one language is longer.

::tabs
:::tabs-item{label="Preview" icon="i-lucide-eye"}
::::bilingual-view
---
path: /guides/changelog
height: 40
---
::::
:::
:::tabs-item{label="YAML" icon="i-lucide-file-code"}
```mdc
::bilingual-view
---
path: /guides/changelog
height: 60
linked: true
---
::
```
:::
:::tabs-item{label="Inline props" icon="i-lucide-code"}
```mdc
::bilingual-view{path="/guides/changelog" :height="60"}
::
```
:::
::

Props: `path` (required, the page path without a language prefix), `height` (in `vh`, default `70`) and `linked` (the starting state of linked scrolling, default `true`).

Don't point `path` at the page that contains the component. A bilingual view inside another one renders a warning instead.

## Stats source

The same cards as [Stats](/guides/tools#stats), with the numbers counted from the site itself. The values follow the current language and stay up to date when content is added.

::tabs
:::tabs-item{label="Preview" icon="i-lucide-eye"}
::::stats-source
---
show: [components, pages, coverage, languages, glossary, problems]
columns: 3
---
::::
:::
:::tabs-item{label="YAML" icon="i-lucide-file-code"}
```mdc
::stats-source
---
show: [components, pages, coverage, languages, glossary, problems]
columns: 3
---
::
```
:::
:::tabs-item{label="Inline props" icon="i-lucide-code"}
```mdc
::stats-source{show="components, pages, coverage, languages, glossary, problems" :columns="3"}
::
```
:::
::

Props: `show` (optional, which cards to show, as a YAML list or a comma separated attribute, default all of them) and `columns` (optional, `2`, `3` or `4`, default `3`).

The cards are:

- `components`: how many component files there are in `components/content/`.
- `pages`: how many pages there are in the current language.
- `coverage`: Finnish pages as a percentage of English pages, with a bar.
- `languages`: how many languages the site has.
- `glossary`: how many glossary terms there are in English, which is the full list.
- `problems`: how many problems there are in English, which is the full list.

Names that are not in this list are ignored. The cards keep their own colors, so filtering with `show` never changes them.

If a collection is missing or a count fails, that card shows a dash and the others still render.

The counts are fetched once per page and per language, and every stats source on the same page shares them.

## Term

An inline glossary term. Hover, focus or tap it to see a short definition. Definitions come from the glossary entries for the current language and fall back to English when a term has no translation.

::tabs
:::tabs-item{label="Preview" icon="i-lucide-eye"}
Nuxt renders pages with :term[SSR]{name="ssr"} by default, and then makes them interactive through :term[hydration]{text="Making server-rendered HTML interactive in the browser."}.
:::
:::tabs-item{label="YAML" icon="i-lucide-file-code"}
```mdc
::term
---
name: ssr
side: top
---
server-side rendering
::
```
:::
:::tabs-item{label="Inline props" icon="i-lucide-code"}
```mdc
Nuxt renders pages with :term[SSR]{name="ssr"} by default.

A one-off term with no glossary entry: :term[hydration]{text="Making server-rendered HTML interactive in the browser."}
```
:::
::

**Props**

- `name`: the glossary entry to use, which is the file name without the extension.
- `text`: a one-line definition, shown in a tooltip.
- `title`, `description`, `to`, `icon`: the richer popover. A term with a `description` or `to` opens a popover, and a term with only `text` opens a tooltip.
- `side`: where the popup opens, one of `top`, `right`, `bottom` and `left`. The default is `bottom`.

Inline props override the glossary entry. A `name` that doesn't exist renders as plain text.

**Adding a glossary entry**

Add one YAML file per language, with the same file name in both:

```text
content/
  en/
    glossary/
      ssr.yml
  fi/
    glossary/
      ssr.yml
```

```yaml
title: Server-side rendering
text: Pages are rendered to HTML on the server.
description: The server sends ready-made HTML, so the page shows content before the JavaScript has loaded.
icon: i-lucide-server
```

All fields are optional. Entries are also listed on the glossary page.


## Troubleshooting source

A shared pool of problems, filtered by tag. It wraps the pure `troubleshooting` component, so the list looks and behaves the same. Finnish entries replace English ones with the same `slug`, and anything not yet translated stays in English.

::tabs
:::tabs-item{label="Preview" icon="i-lucide-eye"}
::::troubleshooting-source
---
tag: content
title: Content problems
group: query-demo
---
::::
:::
:::tabs-item{label="YAML" icon="i-lucide-file-code"}
```mdc
::troubleshooting-source
---
tag: content
title: Content problems
group: query-demo
---
::
```
:::
:::tabs-item{label="Inline props" icon="i-lucide-code"}
```mdc
::troubleshooting-source{tag="content" title="Content problems" group="query-demo"}
::
```
:::
::

Props: `tag` (optional, only show problems with this tag), `title` (optional) and `group` (optional, default `source`; use a different value for each list on the same page so their search boxes stay separate).

The problems live in `content/en/problems/*.yml` and `content/fi/problems/*.yml`. Use the same `slug` in both languages so deep links keep working after a language switch.

## How these components read content

- The cache key includes the language, so a language switch never shows old data.
- Translations are merged per entry, not per page. Troubleshooting entries are keyed by `slug`, glossary entries by file name.
- Only the fields a component needs are read.
- The data is fetched once per page and shared by every instance of the same component.