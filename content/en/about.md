---
title: About
description: What this site is, what it is built with, and where to go next.
navigation:
  title: About
  icon: i-lucide-info
seo:
  title: About
  description: What this site is, what it is built with, and where to go next.
layout: default
sidebar: true
collapsed: false
splitter: false
toc: false
surround: true
---

:::u-page-section
---
title: About this site
description: A collection of interactive MDC components for Nuxt 4, Nuxt UI v4 and Nuxt Content. Every list can be reordered by dragging, and everything works from plain Markdown.
---

::tabs-list
---
items:
  - label: Purpose
    icon: i-lucide-target
    content: Make docs more interactive without leaving Markdown.
    value: purpose
  - label: Stack
    icon: i-lucide-layers
    content: Nuxt 4, Nuxt UI v4, Nuxt Content and Tailwind CSS.
    value: stack
  - label: Contribute
    icon: i-lucide-git-pull-request
    content: Suggest a component or improve an existing one.
    value: contribute
---
::
:::

:::u-page-section{class="mt-20"}
---
title: Built with
description: The tools behind this site.
---

::icon-list
---
items:
  - icon: i-social-finland
    label: Suomi
    to: /fi
  - icon: i-social-usa
    label: English
    to: /
  - icon: i-social-nuxt
    label: Nuxt
    to: https://nuxt.com
    target: _blank
  - icon: i-social-tailwind
    label: Tailwind CSS
    to: https://tailwindcss.com
    target: _blank
  - icon: i-social-typescript
    label: TypeScript
    to: https://www.typescriptlang.org
    target: _blank
  - icon: i-social-reka
    label: Reka UI
    to: https://reka-ui.com
    target: _blank
  - icon: i-social-motionvue
    label: Motion Vue
    to: https://motion-v.dev
    target: _blank
  - icon: i-social-zod
    label: Zod
    to: https://zod.dev
    target: _blank
  - icon: i-social-vercel
    label: Vercel
    to: https://vercel.com
    target: _blank
---
::
:::

:::u-page-section{class="mt-20"}
---
title: Stack at a glance
description: The technologies this site is built on.
---

::table-list
---
columns:
  - key: name
    label: Technology
  - key: purpose
    label: Purpose
data:
  - id: 1
    name: Nuxt 4
    purpose: Application framework
    icon: i-lucide-box
  - id: 2
    name: Nuxt UI v4
    purpose: Component library
    icon: i-lucide-palette
  - id: 3
    name: Nuxt Content
    purpose: Markdown and MDC
    icon: i-lucide-file-text
  - id: 4
    name: Tailwind CSS
    purpose: Styling
    icon: i-lucide-wind
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
:::

:::u-page-section{class="mt-20"}
---
title: Topics
description: Add the topics you care about.
---

::tags-list
---
placeholder: Add a topic...
items:
  - Theming
  - Forms
  - Layout
  - Content
  - Drag and drop
---
::
:::

:::u-page-section{class="mt-20"}
---
title: Before you start
description: Make sure you have these ready.
---

::checkbox-list
---
legend: Checklist
items:
  - Node.js installed
  - A Nuxt 4 project
  - Nuxt UI and Nuxt Content added
---
::
:::

:::u-page-section{class="mt-20"}
---
title: Which path fits you?
description: Choose what you want to do.
---

::radio-list
---
legend: I want to
items:
  - Try the components
  - Build a docs site
  - Contribute
---
::
:::

:::u-page-section{class="mt-20"}
---
title: Explore
description: Jump to the parts of the site you need.
---

::nav-list
---
orientation: vertical
items:
  - label: Getting started
    icon: i-lucide-rocket
    to: /guides
  - label: Tools
    icon: i-lucide-wrench
    to: /guides/tools
  - label: Home
    icon: i-lucide-house
    to: /
---
::
:::

:::u-page-section{class="mt-20"}
---
title: Pick a color
description: Click a swatch to set the primary color of the site.
---

::swatch-list{compact}
::
:::

:::u-page-section{class="mt-20"}
---
title: Find us
description: Where the community hangs out.
---

::icon-list
---
items:
  - icon: i-social-github
    label: GitHub
    to: https://github.com/Catventurist/kiintea
    target: _blank
  - icon: i-social-telegram
    label: Telegram
    to: https://t.me/harhaa
    target: _blank
  - icon: i-social-signal
    label: Signal
    to: https://signal.org
    target: _blank
  - icon: i-social-jitsi
    label: Jitsi
    to: https://meet.jit.si
    target: _blank
  - icon: i-social-ecency
    label: Ecency
    to: https://ecency.com
    target: _blank
---
::
:::
