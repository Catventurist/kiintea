---
title: Home
description: Interactive MDC components with Nuxt 4, Nuxt UI v4 and Nuxt Content.
seo:
  title: Home
  description: Interactive MDC components with Nuxt 4, Nuxt UI v4 and Nuxt Content.
navigation:
  title: Home
  icon: i-lucide-home
layout: default
sidebar: false
collapsed: false
splitter: false
toc: false
surround: false
---

::u-page-hero
---
headline: Nuxt 4
title: Kiintea
description: Drag some components.
links:
  - label: Get started
    to: /about
    variant: soft
    icon: i-lucide-square-play
  - label: Browse guides
    to: /guides
    color: neutral
    variant: subtle
    trailingIcon: i-lucide-arrow-right
---
::

::compat-matrix
---
columns:
  - Node 18
  - Node 20
  - Node 22
rows:
  - name: Nuxt UI
    support: [partial, supported, supported]
    note: Needs the v4 build on Node 18.
  - name: Nuxt Content
    support: [supported, supported, supported]
---
::

:::u-page-section{class="mt-20"}
---
title: Try it now
description: Pick your options and get the install command.
---

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

:::u-page-section{class="mt-20"}
---
title: What you get
---

::card-list
---
items:
  - title: Lists
    description: Checkbox, radio and accordion lists.
    to: /guides/tools
    icon: i-lucide-list-checks
    id: lists
  - title: Layout helpers
    description: Cards, tabs, stepper and timeline.
    to: /guides/tools
    icon: i-lucide-layout-grid
    id: layout
  - title: Interactive boards
    description: Drag and drop kanban boards.
    to: /guides/tools
    icon: i-lucide-kanban
    id: boards
---
::
:::

:::u-page-section{class="mt-20"}
---
title: Setup in four steps
---

::stepper-list
---
items:
  - title: Install
    description: Add the modules.
    icon: i-lucide-download
  - title: Configure
    description: Update nuxt.config.ts.
    icon: i-lucide-settings
  - title: Add components
    description: Copy files to components/content.
    icon: i-lucide-puzzle
  - title: Deploy
    description: Build and publish.
    icon: i-lucide-rocket
---
::

::progress-check
---
title: Setup checklist
id: setup-checklist
reset-label: Reset
items:
  - label: Install dependencies
  - label: Configure modules
  - label: Add first component
  - label: Deploy
---
::
:::

:::u-page-section{class="mt-20"}
---
title: What's new
---

::timeline-list
---
items:
  - date: Apr 2, 2026
    title: Landing page
    description: New home page with live components.
    icon: i-lucide-rocket
  - date: Mar 22, 2026
    title: Compat matrix
    description: Version support at a glance.
    icon: i-lucide-table
---
::
:::

:::u-page-section{class="mt-20"}
---
title: FAQ
---

::accordion-list
---
items:
  - label: Does it support Nuxt 4?
    content: Yes, all components target Nuxt 4 and Nuxt UI v4.
    value: nuxt4
  - label: Is there a Finnish translation?
    content: Yes, the docs are available in English and Finnish.
    value: finnish
---
::
:::