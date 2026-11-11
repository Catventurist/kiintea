---
title: Home
description: Interactive MDC components by the Finnish community for Nuxt 4, Nuxt UI v4 and Nuxt Content.
seo:
  title: Home
  description: Interactive MDC components by the Finnish community for Nuxt 4, Nuxt UI v4 and Nuxt Content.
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
headline: Kiintea community
title: Let's build together
description: Draggable MDC components, made in Finnish and shared openly. Copy, tweak and improve.
links:
  - label: Get started
    to: /about
    variant: soft
    icon: i-lucide-square-play
    class: 'hover:animate-dancing'
  - label: Browse guides
    to: /guides
    color: neutral
    variant: subtle
    trailingIcon: i-lucide-arrow-right
  - label: Browse the library
    to: https://github.com/Catventurist/kiintea
    target: _blank
    color: secondary
    variant: outline
    icon: i-social-github
---
::

:::u-page-section
---
title: What you get
description: Ready-made components that work directly in Nuxt Content Markdown.
---

::card-list
---
items:
  - title: Lists
    description: Checkbox, radio and accordion lists.
    to: /guides/tools
    icon: i-lucide-list-checks
    id: lists
    target: _blank
  - title: Layout helpers
    description: Cards, tabs, steppers and timelines.
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
    description: Copy the files into components/content.
    icon: i-lucide-puzzle
  - title: Publish
    description: Build and deploy.
    icon: i-lucide-rocket
---
::

::progress-check
---
title: Setup checklist
id: setup-checklist-en
reset-label: Reset
items:
  - label: Install dependencies
  - label: Configure modules
  - label: Add your first component
  - label: Publish
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
  - date: 11.11.2026
    title: Home page
    description: A new home page with working components and a community section.
    icon: i-lucide-rocket
  - date: 10.11.2026
    title: Resource descriptor
    description: Community activity.
    icon: i-lucide-table
---
::
:::

:::u-page-section{class="mt-20"}
---
title: Community
description: This is built together. Every component, translation and fix is welcome.
---

::card-list
---
items:
  - title: Contribute
    description: Suggest new components or improve existing ones on GitHub.
    to: https://github.com/Catventurist/kiintea/pulls
    target: _blank
    icon: i-lucide-git-pull-request
    id: contribute
  - title: Report an issue
    description: Found a bug or a typo? Let us know.
    to: https://github.com/Catventurist/kiintea/issues
    target: _blank
    icon: i-lucide-bug
    id: issues
  - title: Discuss
    description: Ask questions, share tips and suggest ideas.
    to: https://t.me/harhaa
    target: _blank
    icon: i-social-telegram
    id: discuss
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
    content: Yes, all components are built for Nuxt 4 and Nuxt UI v4.
    value: nuxt4
  - label: Is the documentation available in Finnish?
    content: Yes, the documentation is available in both English and Finnish.
    value: finnish
  - label: Can I contribute if I'm not an experienced developer?
    content: Yes! Translations, typo fixes and examples are just as valuable as code.
    value: contribute
  - label: Can I use the components in my own projects?
    content: Yes, the components are open. Copy them into your project and adapt them as needed.
    value: license
---
::
:::