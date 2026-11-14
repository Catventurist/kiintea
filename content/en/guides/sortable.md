---
title: Sortable lists
description: Drag-and-drop components, usable from Markdown.
navigation:
  title: Sortable
  icon: i-lucide-list-start
layout: dashboard
sidebar: true
collapsed: true
splitter: true
toc: true
surround: true
---

Components based on Nuxt UI whose items you can reorder by dragging. Write the data as a **YAML** block, as in the examples below. For short values you can also use inline props, see [Passing props inline](/guides/tools#passing-props-inline).

## Overview

| Component | Wraps | What you drag |
| --- | --- | --- |
| `accordion-list` | `UAccordion` | Panels, by a grip handle |
| `board-list` | `UCard` | Cards, within and between columns |
| `card-list` | `UCard` | Cards, by the card icon |
| `checkbox-list` | `UCheckboxGroup` | Checkboxes |
| `circle-progress` | Circular progress | The value, when `interactive` |
| `nav-list` | `UNavigationMenu` | Links |
| `radio-list` | `URadioGroup` | Radios |
| `stepper-list` | `UStepper` | Steps |
| `swatch-list` | Color swatches | Swatches |
| `table-list` | `UTable` | Rows, by a drag column |
| `tabs-list` | `UTabs` | Tabs |
| `tags-list` | `UInputTags` | Tags |
| `timeline-list` | `UTimeline` | Entries, by the icon or avatar |

## AccordionList

A `UAccordion` whose panels can be reordered with a grip handle.

**Fields**
- `items[].label` (string): panel title.
- `items[].content` (string): panel body.
- `items[].value` (string, optional): stable id. Set it so the open panel follows its item.

:::code-preview
::accordion-list
---
items:
  - label: Getting started
    content: Install the module and add it to your config.
    value: start
  - label: Theming
    content: Customize colors, radius and fonts.
    value: theming
  - label: Deploying
    content: Build and ship your app.
    value: deploy
---
::

#code
```mdc
::accordion-list
---
items:
  - label: Getting started
    content: Install the module and add it to your config.
    value: start
  - label: Theming
    content: Customize colors, radius and fonts.
    value: theming
---
::
```
:::

## BoardList

A board of columns with `UCard`s. Cards can be reordered within a column and dragged between columns, including into empty ones.

**Fields**
- `columns[].id` (string): unique column id.
- `columns[].title` (string): column title. A badge shows its card count.
- `columns[].cards` (array, optional): the cards in the column. Leave it out or use `[]` for an empty column.
- `columns[].cards[].id` (string): card id. It must be unique across all columns.
- `columns[].cards[].title` (string): card title.
- `columns[].cards[].description` (string, optional): text under the title.
- `columns[].cards[].icon` (string, optional): Iconify name shown next to the title.

:::code-preview
::board-list
---
columns:
  - id: todo
    title: To do
    cards:
      - id: layout
        title: Design the layout
        description: Wireframes and component choices.
        icon: i-lucide-pen-tool
      - id: pages
        title: Build the pages
        icon: i-lucide-hammer
  - id: doing
    title: In progress
    cards:
      - id: theme
        title: Set up the theme
        description: Colors, radius and fonts.
        icon: i-lucide-palette
  - id: done
    title: Done
    cards: []
---
::

#code
```mdc
::board-list
---
columns:
  - id: todo
    title: To do
    cards:
      - id: layout
        title: Design the layout
        icon: i-lucide-pen-tool
  - id: done
    title: Done
    cards: []
---
::
```
:::

## CardList

A stack of `UCard`s. The card icon is the drag handle.

**Fields**
- `items[].title` (string): card title.
- `items[].description` (string, optional): text under the title.
- `items[].icon` (string, optional): Iconify name, used as the handle.
- `items[].id` (string, optional): stable id.
- `handle-icon` (string, optional): icon used when an item has none. Defaults to `i-lucide-grip-vertical`.

:::code-preview
::card-list
---
items:
  - title: Design the layout
    description: Wireframes and component choices.
    icon: i-lucide-pen-tool
    id: design
  - title: Build the pages
    description: Use Nuxt UI components.
    icon: i-lucide-hammer
    id: build
  - title: Ship it
    icon: i-lucide-rocket
    id: ship
---
::

#code
```mdc
::card-list
---
items:
  - title: Design the layout
    icon: i-lucide-pen-tool
    id: design
  - title: Ship it
    id: ship
---
::
```
:::

## CheckboxList

A `UCheckboxGroup` where you can drag items to reorder them.

**Fields**
- `legend` (string, optional): label shown above the group.
- `items` (string[]): one checkbox per entry.

:::code-preview
::checkbox-list
---
legend: Tasks
items:
  - Design
  - Build
  - Ship
---
::

#code
```mdc
::checkbox-list{legend="Tasks" :items='["Design","Build","Ship"]'}
::
```
:::

## CircleProgress

A circular progress indicator. When `interactive` is set, the value can be changed by the user.

**Fields**
- `modelValue` (number, optional): the current value. Defaults to `0`. In inline form, write `:model-value`.
- `variant` (string, optional): the visual style. Use `circular`.
- `interactive` (boolean, optional): lets the user change the value. Defaults to `false`.

:::code-preview
::circle-progress
---
modelValue: 67
variant: circular
interactive: true
---
::

#code
```mdc
::circle-progress{:model-value="67" variant="circular" interactive}
::
```
:::

## NavList

A flat `UNavigationMenu` whose links can be reordered by dragging. Nested `children` aren't supported.

**Fields**
- `items[].label` (string): link text.
- `items[].icon` (string, optional): Iconify name.
- `items[].to` (string, optional): link target. Clicking a link still navigates.
- `items[].badge` (string | number, optional): badge shown at the end of the link.
- `orientation` (`vertical` | `horizontal`, optional): layout of the menu. Defaults to `vertical`.

:::code-preview
::nav-list
---
orientation: vertical
items:
  - label: Components
    icon: i-lucide-box
    to: https://ui.nuxt.com/docs/components
  - label: Typography
    icon: i-lucide-type
    to: https://ui.nuxt.com/docs/typography
  - label: Theming
    icon: i-lucide-palette
    to: https://ui.nuxt.com/docs/getting-started/theme
---
::

#code
```mdc
::nav-list
---
orientation: vertical
items:
  - label: Components
    icon: i-lucide-box
    to: https://ui.nuxt.com/docs/components
    badge: 60
  - label: Theming
    icon: i-lucide-palette
    to: https://ui.nuxt.com/docs/getting-started/theme
---
::
```
:::

## RadioList

A `URadioGroup` with draggable items. The selected value stays with its item.

**Fields**
- `legend` (string, optional): label shown above the group.
- `items` (string[]): one radio per entry. The first one is selected by default.

:::code-preview
::radio-list
---
legend: Priority
items:
  - Low
  - Medium
  - High
---
::

#code
```mdc
::radio-list{legend="Priority" :items='["Low","Medium","High"]'}
::
```
:::

## StepperList

A `UStepper` whose steps can be reordered. Progress follows the position, not the step.

**Fields**
- `items[].title` (string): step title.
- `items[].description` (string, optional): text under the title.
- `items[].icon` (string, optional): Iconify name.

:::code-preview
::stepper-list
---
items:
  - title: Address
    description: Where should we ship it?
    icon: i-lucide-map-pin
  - title: Shipping
    description: Choose a method.
    icon: i-lucide-truck
  - title: Checkout
    description: Review and pay.
    icon: i-lucide-credit-card
---
::

#code
```mdc
::stepper-list
---
items:
  - title: Address
    icon: i-lucide-map-pin
  - title: Checkout
    icon: i-lucide-credit-card
---
::
```
:::

## SwatchList

A palette of color swatches you can reorder by dragging. Clicking a swatch can also set the site's primary color. Colors come from `--swatch-*` CSS variables, with a fallback to the theme's `500` shade.

**Fields**
- `colors` (string[], optional): color names, in display order. Defaults to blue, sky, indigo, violet, green, emerald, amber, orange and rose.
- `select` (boolean, optional): when `true`, clicking a swatch sets `ui.colors.primary`. Defaults to `true`.
- `compact` (boolean, optional): hide the labels and use smaller swatches. Defaults to `false`.

Colors must exist in your theme. Use Tailwind's default colors or define the 50-950 shades of a custom color first.

:::code-preview
::swatch-list
---
select: true
colors: [blue, sky, indigo, violet, green, emerald, amber, orange, rose]
---
::

#code
```mdc
::swatch-list
---
select: true
colors: [blue, indigo, green]
---
::
```
:::

**Compact**

Add `compact` for a small version without labels, which fits in a small space.

:::code-preview
::swatch-list{compact}
::

#code
```mdc
::swatch-list{compact}
::
```
:::

## TableList

A `UTable` with a drag column. Each row can show an avatar, an icon, or the default grip as its handle. Sorting, filtering and pagination aren't supported, because they break the match between displayed rows and data.

**Fields**
- `columns[].key` (string): row field to display.
- `columns[].label` (string): column header.
- `data[].id` (string | number): unique row id.
- `data[].avatar` (string, optional): image URL, used as the handle.
- `data[].icon` (string, optional): Iconify name, used when there's no avatar.
- Any other field on a row is available to a column through its `key`.

:::code-preview
::table-list
---
columns:
  - key: name
    label: Name
  - key: role
    label: Role
data:
  - id: 1
    name: Ada Lovelace
    role: Engineer
    avatar: /catdark.webp
  - id: 2
    name: Grace Hopper
    role: Admiral
    icon: i-lucide-anchor
  - id: 3
    name: Alan Turing
    role: Mathematician
---
::

#code
```mdc
::table-list
---
columns:
  - key: name
    label: Name
data:
  - id: 1
    name: Ada Lovelace
    avatar: /catdark.webp
  - id: 2
    name: Grace Hopper
    icon: i-lucide-anchor
---
::
```
:::

## TabsList

A `UTabs` where you drag the tabs themselves to change their order.

**Fields**
- `items[].label` (string): tab title.
- `items[].content` (string): text shown for the active tab.
- `items[].icon` (string, optional): Iconify name.
- `items[].value` (string, optional): stable id. Set it so the active tab follows its item.

:::code-preview
::tabs-list
---
items:
  - label: Account
    icon: i-lucide-user
    content: Manage your account settings.
    value: account
  - label: Billing
    icon: i-lucide-credit-card
    content: Invoices and payment methods.
    value: billing
  - label: Team
    icon: i-lucide-users
    content: Invite and manage members.
    value: team
---
::

#code
```mdc
::tabs-list
---
items:
  - label: Account
    icon: i-lucide-user
    content: Manage your account settings.
    value: account
  - label: Billing
    content: Invoices and payment methods.
    value: billing
---
::
```
:::

## TagsList

A `UInputTags` whose tags can be reordered by dragging. You can still add and remove tags.

**Fields**
- `items` (string[], optional): the initial tags.
- `placeholder` (string, optional): text shown when the input is empty.

:::code-preview
::tags-list
---
placeholder: Add a tag...
items:
  - Design
  - Build
  - Ship
---
::

#code
```mdc
::tags-list{placeholder="Add a tag..." :items='["Design","Build","Ship"]'}
::
```
:::

## TimelineList

A `UTimeline` whose entries can be reordered. The icon or avatar is the drag handle. Progress follows the position, not the entry.

**Fields**
- `items[].title` (string): entry title.
- `items[].description` (string, optional): text under the title.
- `items[].date` (string, optional): date shown above the title.
- `items[].icon` (string, optional): Iconify name, used as the handle.
- `items[].avatar` (object, optional): `src` and optional `alt`, used as the handle instead of an icon.

:::code-preview
::timeline-list
---
items:
  - date: Mar 15, 2026
    title: Project kickoff
    description: Scope and goals agreed.
    icon: i-lucide-rocket
  - date: Mar 22, 2026
    title: First prototype
    description: Core flow ready for review.
    icon: i-lucide-pen-tool
  - date: Apr 2, 2026
    title: Launch
    description: Shipped to production.
    avatar:
      src: /catdark.webp
---
::

#code
```mdc
::timeline-list
---
items:
  - date: Mar 15, 2026
    title: Project kickoff
    icon: i-lucide-rocket
  - date: Apr 2, 2026
    title: Launch
    avatar:
      src: /catdark.webp
---
::
```
:::