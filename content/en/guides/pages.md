---
title: Pages
description: Standalone Vue pages that sit alongside the Markdown content.
navigation:
  title: Pages
  icon: i-lucide-app-window
sidebar: true
collapsed: true
splitter: true
toc: true
surround: true
---

Most of this site is Markdown. These pages are written as Vue pages in `app/pages/` instead, because they need more logic than MDC components can comfortably hold.

::nav-list
---
orientation: vertical
items:
  - label: Home
    icon: i-lucide-house
    to: /
  - label: Glossary
    icon: i-lucide-book-open
    to: /glossary
  - label: Fire
    icon: i-lucide-flame
    to: /fire
  - label: Example
    icon: i-lucide-flask-conical
    to: /example
  - label: Flow
    icon: i-lucide-workflow
    to: /flow
  - label: Weeks
    icon: i-lucide-calendar-days
    to: /viikot
  - label: Runo
    icon: i-lucide-scroll-text
    to: /runo
---
::

## Fire

An interactive page at `/fire`, built from Nuxt UI components: a progress bar for the flame, a progress group for the ash, a slider that hands over the goal, tabs, an alert and a toast.

**How it works**
- The flame level and the goal owner are stored with `useState`, so they survive a language switch.
- Feeding the flame lowers the fuel and moves the slider towards the model. When the slider passes the middle, a toast appears on its own.
- At 0 fuel the flame goes cold and the feed button is disabled. Restart resets both values.

**Files**
- Page: `app/pages/fire.vue`.
- Texts: the `hearth` key in `i-lucide-flame` `i18n/locales/en.yml` and `i18n/locales/fi.yml`.
- Motion: the `animate-rise`, `animate-flicker` and `stagger` classes in the main CSS file. All animation is switched off for visitors who prefer reduced motion.

## Glossary

A searchable, alphabetical list of terms at `/glossary`. Turn on the **Custom order** switch to drag terms into your own order. Every term has an anchor, so links such as `/glossary#ssr` jump straight to it.

**The term component**

Use `term` to mark a word inline in Markdown. On hover, focus or tap it shows the definition, so readers don't have to leave the page.

To use a glossary entry, pass its `name`:

```md
Nuxt renders pages with :term[SSR]{name="ssr"} by default.
```

For a one-off term with no glossary entry, pass the definition as `text`. It shows as a tooltip:

```md
Nuxt makes pages interactive through :term[hydration]{text="Making server-rendered HTML interactive in the browser."}.
```

**Where definitions come from**
- Definitions live in the `glossary` content collection, with one set of entries per language.
- If a term has no entry in the current language, the English entry is used instead.
- The `useGlossary` composable runs one cached glossary query. `term` and the glossary page share it, so the data is fetched once.

**Entry fields**
- `title` (string, optional): the term name.
- `text` (string, optional): the short definition shown on hover, focus or tap.
- `description` (string, optional): a longer explanation.
- `to` (string, optional): a link to read more.
- `icon` (string): Iconify name shown next to the term. Required.
- `tags` (string[], optional): topics used to find the term.

```mdc
---
title: SSR
text: Rendering pages to HTML on the server before sending them to the browser.
icon: i-lucide-server
tags:
  - rendering
---
```

## Example

A page at `/example` that shows the custom Vue components in use outside Markdown. Each component sits in its own tab, and a tab's content loads only when it is first opened.

**Tabs**
- Each component lives in its own `UTabs` panel and is imported with the `Lazy` prefix, so its code is fetched the first time the tab opens.
- Panels stay mounted after the first visit (`unmount-on-hide` is off), so state such as an imported bookmarks file survives tab switches.
- The selected tab is stored in the `tab` query parameter, for example `/example?tab=bookmarks`. An unknown value falls back to `onboarding`.
- Panels animate in with `animate-rise`. The animation is switched off for visitors who prefer reduced motion.

**Components**
- [`EOnBoarding`](/guides/cookies#onboarding-scenarios): the onboarding flow.
- [`StatsSource`](/guides/query#stats-source): the stats panel. See its definition for details.
- [`EBookmarks`](#bookmarks): the bookmarks importer, described below.

### Bookmarks

The `EBookmarks` component, shown in the [Bookmarks tab](/example?tab=bookmarks) on `/example`. Drop a browser bookmarks export (an HTML file) onto it and browse the result as a folder tree.

**How it works**
- The file is parsed in the browser. Nested folders become a nested tree, collapsed by default. Nothing is uploaded.
- Each row has a checkbox. Selecting a folder selects everything in it, and a partly selected folder shows as indeterminate.
- The search box filters by title or URL and opens the matching folders. **Select all** applies to the visible items only.
- **All** downloads every bookmark, and **Selected** downloads the checked ones, both as `bookmarks.yml` with the full folder path for each bookmark.
- Turn on the **Reorder** switch to drag bookmarks and folders into a new order, including between folders. The export follows the new order. Reordering is off while a search is active, and it turns off virtualization until you switch it back.
- A file that is not a bookmarks export, or that has no bookmarks, shows a toast and clears the upload so you can drop another file.

**Files**
- Component: `EBookmarks`.
- Logic: `app/composables/useBookmarks.ts` holds the parsing, filtering, selection, sorting and export.
- Texts: the `bookmarks` key in `i18n/locales/en.yml` and `i18n/locales/fi.yml`.
- Dependencies: `@vueuse/integrations` and `sortablejs` for drag and drop.

## Runo

An encrypted [sharing page](/runo) at `/runo`, built from Nuxt UI components: tabs, form fields, a textarea, inputs, alerts and buttons, with the Web Crypto API doing the encryption in the browser.

**How it works**
- Paste text and press encrypt. The browser makes a random AES-GCM key, encrypts the text, and shows a share link, the key and the encrypted data.
- A link has the form `/en/runo/<words>#k=<key>&d=<data>`. The key and data are in the hash, so they never reach the server.
- A Markdown file with `encrypted: true` and a `blob` in its frontmatter is a private page. It shows only the key field and the open button, and the text is decrypted and rendered as Markdown in the browser.
- Public pages show the document in one tab and the share form in another.

**Files**
- Page: `app/pages/runo/[...slug].vue`.
- Component: `FRunoJako`.
- Texts: the `runo` keys in `i18n/locales/en.yml` and `i18n/locales/fi.yml`.
- Content: `content/<locale>/runo/*.md`. The `encrypted` and `blob` fields are in the `runo_en` and `runo_fi` schemas in `content.config.ts`.

## Adding a page

1. Create `app/pages/your-page.vue`. An explicit page takes priority over the Markdown catch-all route.
2. Put every visible string in both locale files and read it with `t()`.
3. Use `useState` for anything that should survive navigation or a language switch.
4. If the page holds heavy components, put them in `UTabs` panels and import them with the `Lazy` prefix.
5. Add the page to the quick links above and add a changelog entry.
