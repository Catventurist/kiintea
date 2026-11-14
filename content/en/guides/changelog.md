---
title: Changelog
description: Notable changes to the docs layout and tooling.
navigation:
  icon: i-lucide-list-check
toc: true
surround: true
---

## 1.11

### Added

- Surround links (prev/next) through `UContentSurround`, toggled with the `surround` frontmatter field.
- Page options menu in the header to toggle sidebar, toc, collapsed sidebar, split view and surround. Labels are translated in `en` and `fi`.
- Depth-based layout defaults. The root page shows only the header, and deeper pages gain the sidebar, toc, surround links and split view.
- `UContentSearch` mounted once in `app.vue`, so search works in every layout.
- Mobile table of contents above the content, collapsed by default.
- Bottom header with a drawer menu and a `useNavItems` composable for the links.
- Consent requirements table component.

### Changed

- Page options are now held in memory with `useState` (`usePreferences`). Nothing is stored on the device.
- Frontmatter fields for layout options are optional. Missing values fall back to the depth defaults.
- Header title shows an icon next to the site name.

### Removed

- i18n and color mode cookies and storage.
- The route-based reset of the old `overrides` state.

### Fixed

- `files` and `navigation` missing in `app.vue`, which broke search.
- Gap between the header and the mobile toc.
- Truncated Finnish labels in the options menu (`min-w-46`).


## 2.11

### Added

- Sortable MDC components for Markdown: checkbox-list, radio-list, accordion-list, card-list, tabs-list, stepper-list and table-list.
- Props via a YAML block or inline attributes.
- Per-item icon on cards, tabs, steps and table rows, and avatar on table rows. The icon or avatar acts as the drag handle.
- A handle-icon prop on card-list, which sets the default handle icon.
- A docs page with Preview, YAML and Inline props tabs for each component.
- Draggable `timeline-list`, `tags-list`, `nav-list`, `board-list`, `hero-list` and `swatch-list` components.
- Tool-like components `install-builder`, `compat-matrix` and `progress-check`.
- markdown, sortable, tools md pages

### Changed

- Radio and checkbox lists render the legend outside the group, so the fieldset contains only items.
- Tabs and Table use draggable selectors ([data-slot="trigger"], tr), and onUpdate uses oldDraggableIndex and newDraggableIndex for the array.
- Tabs renders its panel itself `:content="false"` and remounts after a reorder.
- Table renders client-side only, through `<ClientOnly>`.
- Table id values can be numbers, so there's no need to quote them in YAML.

### Removed

- The SortableJS animation option on Tabs, which conflicted with the indicator.
- able sorting, filtering and pagination, which are not supported with manual ordering.

### Fixed

- Cannot read properties of undefined (reading 'disabled' / 'ui') on Tabs, caused by an off-by-one index from the indicator element.
- Tabs not updating visually after a drop.
- Hydration mismatch on table-list.
- TypeScript errors: unknown animation option (install @types/sortablejs) and "Type instantiation is excessively deep" (use a plain interface in place of TabsItem).
- Drag handles that snapped back when the legend shared the fieldset with the items.
- `nav-list`: `querySelector is not a function`. The menu is now wrapped in an element we control.
- `board-list`: drops into empty columns, drops after the first card, and random freezes. It uses SortableJS's own drag instead of the browser's native drag, and cards are padded, not separated by a gap.


## 3.11

### Added

- `hero-list`: a hero whose blocks can be reordered by drag. The order is kept in `useState`. Use `sortable=false` to turn drag off.
- Onboarding card: choose language and dark mode with colored cards and badges. The language switches live, and the color mode applies immediately.
- Onboarding choices are saved in a cookie only after the user presses Continue. A "Continue without saving" option stores nothing.
- Guides index cards for Start, Guides, Markdown, Sortable, Tools and Changelog.
- A notes on cookies, storage and onboarding for developers who deploy in the **EU**. Cookie options are disabled in this project's config, so everyone else can ignore them.
- `term`: an inline glossary term with a hover, focus and tap definition. Definitions come from a `glossary` content collection, per locale with an English fallback.
- `term`: an inline glossary term with a hover, focus and tap definition. Definitions come from per-language glossary entries and fall back to English.
- Glossary page: a searchable, alphabetical list of terms, with a Custom order switch to drag terms into your own order. Each term has an anchor, so links like `/glossary#ssr` work.
- `mdc-playground`: an editable MDC example that renders your real components live. It has an example menu with search, descriptions, copy and reset, and it keeps the last good preview when the syntax is wrong.
- `bilingual-view`: the same page in English and Finnish side by side, with scrolling linked block by block.
- Homepage

### Changed

- `board-list`: each column is now its own `kanban-column` component that uses `useSortable`. Dragging cards between columns works as before.
- `mdc-playground` can now share its current text as a link.


## 4.11

### Added

- **Landing page.** New home page with a hero, a live install builder, a compatibility matrix, a setup checklist, a roadmap board, a timeline and an FAQ.
- **Hearth page.** New interactive page with animated progress, a slider that hands over the goal, a tabbed comparison and a toast. State is saved with `useState`, so it survives a language switch.
- **About page.** New page with an overview, a technology table, topic tags, a checklist, a path picker, quick links and a color picker.
- `troubleshooting` component: a searchable list of problems with cause and fix, tag filters, severity badges, copyable code and deep links.
- `troubleshooting-source` component, which fills the same list from shared problem files. Finnish entries replace English ones with the same `slug`.
- Query page for components that read content collections: `bilingual-view`, `term` and `troubleshooting-source`.

### Changed

- `bilingual-view` and `term` moved from the Tools page to the Query page.
- Common locale strings extended with labels for search, empty state, results, copy, expand all and collapse all.

### Fixed

- Untranslated Finnish pages fall back to the English page at the same slug.

## 5.11

### Added

- `problems_en` and `problems_fi` collections, with one YAML file per problem.
- Notes popover in the desktop header. Write a note per page, download all notes as a `.txt` file and import them again.
- Download as `.md` button for the current page, built from the `rawbody` field.

### Changed

- Notes are kept in memory with `useState` (`useNotes`) and shared across languages, so a note on `/en/tools` is the same note on `/fi/tools`. Nothing is stored on the device.
- Common locale strings extended with labels for search, empty state, results, copy, expand all and collapse all.

## 6.11

### Added

- `stats` component: a grid of number cards built on `UPageCard`, with icons, per-card colors, a spotlight that follows the cursor, a count-up animation and optional progress bars. Animations are switched off for reduced motion.
- `stats-source` component, which counts components, pages, translation coverage, languages, glossary terms and problems from the site itself. Cards can be filtered with `show`.
- `useSiteStats` composable that fetches the counts once per page and language.

## 7.11

### Added

- `tarkiste`: an optional check value on weeks. Unlocking with a wrong passphrase is now rejected, even for weeks with no votes.
- `/dev` page, development only, with tools for:
  - generating a `tarkiste` (with a Reset button)
  - changing a week's passphrase by re-encrypting `bitti` and `tarkiste`
- Unlock and Lock buttons in `CheckinPanel`, a live Treat badge, and a wrong-passphrase message.

### Changed

- The key is derived once on unlock and kept in memory only. It is cleared on Lock, on reload, or when `kääre` changes.
- `lataa()` needs an unlocked key and no longer takes a passphrase.
- `kääre` is the encryption salt. Keep it identical in the `fi` and `en` files, or add a separate `suola` field.
- To start from scratch, delete the `bitti` and `tarkiste` values and generate a new `tarkiste`.

### Removed

- The Check treat button, `näytä` and `laannaTänään`. The `herkku` computed replaces them.

## 8.11

### Added

- `/flow` index with one card per entity, grouped by layer (knowledge, plan, observation, agents)
- Search and layer filter on the index
- Entity pages with the query params table, a community example and the operations available (create, update, delete)
- Params link to the entity they point to, and each page lists the entities that use it ("Used by")
- Previous / next navigation in layer order, and a back button in the header
- Optional link from an entity to its glossary term
- Icon and color for each layer
- English and Finnish content, with all labels, entity names and param descriptions translated
- `scenario` component: a short story told step by step with `UStepper`. Each step can link to a flow entity.
- Flow pages for `agreement-bundle`, `claim`, `process-specification`, `spatial-thing` and `unit`, in English and Finnish.
- Guide sections for the ordering quiz and the scenario walkthrough.

### Changed

- Flow data is now yml in a `flow_en` / `flow_fi` data collection, validated by `flowSchema`
- Param names and values use lowercase kebab-case entity names that match file names, i18n keys and URLs
- `recipeReciprocalClauseOf` is `recipeReciprocal` in the content

### Fixed

- Pages with no params show an empty state instead of an empty table
- Missing translation keys no longer leave blank type cells

## 9.11

### Added

- Bookmarks importer: drop a browser bookmarks HTML export onto `UFileUpload` and browse it as a folder tree with `UTree`
- Nested folders, built from the file's `<DL>` structure, collapsed by default
- Checkbox selection with `propagate-select` and `bubble-select`, so selecting a folder selects its bookmarks and a partial selection shows as indeterminate
- Virtualized tree for large exports
- Search by title or URL, with matching folders opened automatically
- "Select all" (visible items only) and "Clear" buttons
- Download buttons for all bookmarks or only the selected ones, exported as `bookmarks.yml` with the full folder path per bookmark
- Reorder switch: drag and drop bookmarks and folders, including moving them between folders
- Error and warning toasts for files that aren't bookmark exports or contain no bookmarks
- `useBookmarks` composable holding the parsing, filtering, selection, sorting and export logic
- `animate-rise` entrance animation for the tool
- English and Finnish translations in `en.yml` and `fi.yml`
- Tabbed example page with each component in its own `UTabs` panel, loaded lazily with the `Lazy` prefix
- Selected tab stored in the `tab` query parameter, so refreshes and shared links open the same tab
- `animate-rise` on tab panels, disabled for reduced motion
- `CircleProgress` entry in the MDC component docs, in English and Finnish, with Preview, YAML and Inline props tabs

### Changed

- Folder paths in the export are computed from each bookmark's position in the tree, so moved bookmarks get the right folder
- Exports follow the current tree order instead of the selection order
- Tab panels stay mounted after first opening, so state such as an imported file survives tab switches
- Reordering turns off virtualization and uses the flat tree layout, and turns it back on afterwards

### Fixed

- Every bookmark landing in the first folder, and bookmarks being duplicated once per parent folder
- "Type instantiation is excessively deep" error from `TreeItem`, by using an interface and `shallowRef`
- Folders becoming impossible to open after a custom trailing slot replaced the chevron
- Dragging not starting after switching from the virtualized to the flat tree
- Moved rows keeping the wrong indentation, because the tree did not re-render after an in-place move
- A folder disappearing when dragged onto one of its own children
- `e: any` in the sortable update handler

## 10.11

### Added

- Custom `error.vue` built on `UError`, translated in English and Finnish
- 404 page: suggestions for the closest pages, quick links you can drag into your own order (kept with `useState`), and Markdown pages from the same section
- Other errors: a "Try again" button and a generic message, with the technical error shown only in development

### Fixed

- Missing pages now throw a fatal 404, so the error page is shown
- Page title and description were read before the page had loaded

## 11.11

### Added

- [Mycelium resource network](/example?tab=mycelium), interactive canvas visualization of community resource flow.
  - Data-driven: renders nodes (producer / consumer / both) and directed edges with animated particles proportional to flow.
  - Resource filter chips (`food`, `tools`, `skills`, `money`, `time`) toggle sub-networks.
  - Click a node → slideover with in/out flow stats and connection table.
  - i18n: `en`, `fi`.
  - Composable: `useMycelium` (canvas loop, hit-testing, particle physics).
  - Types: `CommunityData`, `CommunityNode`, `CommunityEdge`, `Resource`.
- Sortable `icon-list` MDC component. Each tile is a ghost link button and can be reordered by dragging.
- Custom `social` icon collection (`i-social-*`) loaded from `app/assets/icons`.
- "Built with" and "Find us" sections on the About page.

### Fixed

- Switching locale no longer shows stale, empty or wrong-language content. The content queries now use the locale from the URL, and the cache keys and watchers use `route.path`. This covers `useContentCollection`, `pages/index.vue` and the catch-all page.
- Hash links (`#section`) now scroll to the target, also across pages. A small client plugin handles it, because the content scrolls inside `UScrollArea` and not the window.
- The page scroll position resets when you navigate to a page without a hash.
- The TOC now shows on desktop when the splitter is off.
- Options set from the page-options menu now last for one page only, so frontmatter wins on the next page.

### Changed

- Added `useRouteLocale()`, a single source of truth for the current locale, validated against the configured i18n locales.
- The locale menu is now a popover with the flag icon from the i18n config.
- The header shows an icon-only search button on small screens.
- The sidebar open state is bound to the `collapsed` option, so the toggle, menu and frontmatter agree.
- `ClientOnly` now wraps only the header buttons, not the whole content area.
- The sidebar toggle has a translated `aria-label` and `aria-expanded`.
- About page rebuilt from `u-page-section` blocks, with a Finnish version.
- Home page reworked with a community section and English and Finnish versions.
- Theme updated to the `suomi` (blue) and `lake` (teal) palettes.

### Issues

- Nuxt Content v3.5.0 fails to run its SQLite query endpoint when Bun is detected but the dev server runs on Node (`bun:` ESM error). Start dev with a consistent runtime, or update `@nuxt/content`.
- Hydration mismatch in the stepper. It now starts vertical and switches to horizontal on wider screens after mount.
- `target` not applied on `card-list` links. The template now uses `item.target`.

## 12.11

### Added

- `UChatMessages` with manual `#default` rendering (day-grouped via `USeparator`)
- Encrypted-text display with hover tooltip revealing plaintext
- `UTooltip` + lock/lock-open toggle button (`showPlaintext`)
- `UUser` sidebar with `useSortable` (drag-to-reorder conversations)
- Unread indicator (`useState<Set>`, clears on select)
- `onKeyStroke` ↑/↓ to switch conversations
- Dialectic badges (`thesis` / `antithesis` / `synthesis`) with `followChain` navigation
- `send()` appends user message and auto-advances to next stage in the chain
- `useState` for SSR-safe state (`activeId`, `showPlaintext`, `userMessages`)
- `@nuxtjs/i18n`, `en.yml` / `fi.yml` under `conversations.*`
- `animate-rise` keyframe on message text (replays on toggle via `:key`)
- `chart-list` MDC component: a chart whose rows can be reordered by drag or sorted with buttons.
- props `data`, `type`, `sortable` and `stateKey`. The order is kept in `useState` and resets on a full page reload.
- `charts.*` translations for `en` and `fi`.

### Fixed

- `UBadge` → `as="button"` for accessible click on synthesis badge
- `noUncheckedIndexedAccess` guards (`?.text ?? ''`, `?? ''` on `t()` fallback)
- `DialecticRole` union threaded through `activeId`, `conversations`, `nextInChain`, `Msg.linksTo`
- `dialecticColor` return typed as `Color` with explicit `Record<DialecticRole, Color>`
- URL sync via `?stage=` (preserves parent `?tab=`)
- "extraneous non-props attributes" warning by declaring props and using a single root element.
- `categories` type error by typing the chart data as `ChartData[]`.

### Notes

- `#part` slot and `scrollToBottom()` available in `@nuxt/ui` 4.13+, swap in on upgrade


## 13.11

### Added

- Runo: `/runo` encrypted sharing in the browser (AES-GCM). Paste text to get a link, key and data, or a Markdown file for private pages.
  - Private pages (`encrypted: true` and `blob` in the frontmatter) show only the key field and decrypt the text locally.
  - Public runo pages show the document and the share form in separate tabs.
- `::resource-group` MDC component. It renders a list of resources from a YAML `items` array, with a title, link, type badge and contributors.
  - Drag-and-drop reordering with `useSortable`. The `handle` prop (default `true`) limits dragging to a grip icon.
  - Light and dark contributor avatars through the `avatar` and `avatarDark` props. They default to `/catlight.webp` and `/catdark.webp`.
  - Links to external URLs open in a new tab. Internal routes stay in the same tab.
- `::tier-list` MDC component. Readers drag items between tiers (S, A, B, C or your own) and an "Unranked" row.
  - `tiers` prop with a `label` and a Nuxt UI `color` for each tier.
  - `items` prop that accepts plain strings or `{ label, icon }` objects, so items can show an icon.
  - `stateKey` prop. The ranking is kept in `useState`, so it survives navigation.
  - `sortable` prop (default `true`). Set it to `false` for a read-only board.
  - Per-row `useSortable` with a shared group. Moves inside a row use `useSortable`, and moves between rows are handled by the parent.

## 14.11

### Added

- `::reveal` component: content animates in when it scrolls into view. Four variants (`emerge`, `blur`, `scale`, `split`), with `delay`, `distance` and `threshold`.
- `::scroll-story` component: a pinned image that crossfades while the text scrolls past, with a progress bar.
- `::scroll-chart` component: a pinned chart that emphasizes different lines and reference lines at each step. Props: `data`, `x`, `series`, `steps`, `yLabel` and `stepHeight`.
- Animation page documenting the reveal, the animation tokens, reduced motion and how animation interacts with dragging.
- Population charts now read all their text, axis labels and series names from the locale files.
- Profiles for [Kitty the Cat](/guides/team/cat) and [Bruno the Dog](/guides/team/dog), plus a [team index](/guides/team). Available in English and Finnish.

### Changed

- Tools, Charts, Query and Sortable pages now use `code-preview` with a single code example per component, instead of three tabs.
- Large sections (Playground, Troubleshooting, Scenario, SkillFinder) moved to their own pages, which makes `/guides/tools` much lighter.
- Each page has an overview table, and one shared section explains how to pass props inline.
- Scroll components share one `useScrollyStory` composable. Progress is now measured over the steps column and reaches 100% at the end of the story.
- Scroll components work on small screens: the image or chart stays pinned above the text, and its height follows the screen.

### Fixed

- `progress-check`: the inline `reset-label` example had a stray colon and an unclosed quote.
- ChartGrowth example used Finnish month names on the English page.
- `reveal` hid its content again after scrolling out of view.
- `scroll-story`: the default `dark` image path had no leading slash, and `show-label` was passed to `UProgress`, which has no such prop.
- Scroll progress ignored scrolling inside a container, and could jump on mobile when the browser's address bar moved.
- `scroll-chart` card collapsed or covered the text in the two-column layout.
- Tailwind lint warning about an unknown class.

### Notes

- The Finnish pages follow the same structure, with `-fi` state keys for the previews.
- Content inside `reveal` stays hidden without JavaScript.
- Use at most one scroll story or chart per page.
