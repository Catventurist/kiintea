---
title: Markdown
description: How to create neat content with Markdown.
navigation:
  title: Markdown
  icon: i-lucide-file-text
layout: dashboard
sidebar: true
collapsed: true
splitter: true
toc: true
surround: true
---

Widely used format for various content. 

::tip{to="/guides/sortable"}
Custom draggable and sortable elements
::

### Headings

::code-preview
## Kiintea

#code
```mdc
## Kiintea
```
::

### Strong
::code-preview
**Kiintea**

#code
```mdc
**Kiintea**
```
::

### Emphasis

::code-preview{label="Preview" class="[&>div]:*:my-0"}
*Kiintea*

#code

```mdc
*Kiintea*
```
::

## Links

To create a link, wrap the link text in brackets followed by the URL in parentheses. Works for both external and internal links.


::code-preview{label="Preview" class="[&>div]:*:my-0"}
[Nuxt documentation](https://nuxt.com)

#code

```mdc
[Nuxt documentation](https://nuxt.com)
```
::

## Blockquotes

Use blockquotes to highlight important information or quotes.

::code-preview{label="Preview"}
> Kiintea automatically adapts to your theme settings, ensuring consistent typography across your entire application.

#code

```mdc
> Kiintea automatically adapts to your theme settings, ensuring consistent typography across your entire application.
```
::

## Lists

Markdown supports unordered, ordered, and nested lists for various content needs.

### Unordered lists

Use unordered lists for items without a specific sequence. Start each item with a `-` symbol.

::code-preview{label="Preview" class="[&>div]:*:my-0 [&>div]:*:w-full"}

- I'm a list item.
- I'm another list item.
- I'm the last list item.

#code

```mdc
- I'm a list item.
- I'm another list item.
- I'm the last list item.
```
::

### Ordered lists

Use ordered lists when item order matters, like steps in a process. Start each item with a number.

::code-preview{label="Preview" class="[&>div]:*:my-0 [&>div]:*:w-full"}

1. I'm a list item.
2. I'm another list item.
3. I'm the last list item.

#code

```mdc
1. I'm a list item.
2. I'm another list item.
3. I'm the last list item.
```
::

### Nested lists

Create hierarchical lists with sub-items for complex structures. Indent sub-items by four spaces for nesting.

::code-preview{class="[&>div]:*:my-0 [&>div]:*:w-full"}

- I'm a list item.
  - I'm a nested list item.
  - I'm another nested list item.
- I'm another list item.
  - Another nested item
    - Deep nested item
    - Another deep nested item
  - Back to second level

#code

```mdc
- I'm a list item.
  - I'm a nested list item.
  - I'm another nested list item.
- I'm another list item.
  - Another nested item
    - Deep nested item
    - Another deep nested item
  - Back to second level
```

::

### Mixed lists

You can combine ordered and unordered lists for complex hierarchies.

::code-preview{class="[&>div]:*:my-0 [&>div]:*:w-full"}

1. First major step
   - Sub-requirement A
   - Sub-requirement B
2. Second major step
   - Another sub-item
   - Final sub-item
3. Final step

#code

```mdc
1. First major step
   - Sub-requirement A
   - Sub-requirement B
2. Second major step
   - Another sub-item
   - Final sub-item
3. Final step
```
::

## Tables

Present structured data in rows and columns clearly. Tables are ideal for comparing data or listing properties.

::code-preview{label="Preview" class="[&>div]:*:my-0 [&>div]:*:w-full"}

| Prop    | Default   | Type                     |
|---------|-----------|--------------------------|
| `name`  |           | `string`{lang="ts-type"} |
| `size`  | `md`      | `string`{lang="ts-type"} |
| `color` | `neutral` | `string`{lang="ts-type"} |

#code

```mdc
| Prop    | Default   | Type                     |
|---------|-----------|--------------------------|
| `name`  |           | `string`{lang="ts-type"} |
| `size`  | `md`      | `string`{lang="ts-type"} |
| `color` | `neutral` | `string`{lang="ts-type"} |
```
::

### Images

Images automatically adapt to their container while maintaining aspect ratio. You can control sizing through markdown or HTML attributes when needed.

::code-preview
![Small Image](/catdark.webp){width="300"}

#code

```mdc
![Small Image](/catdark.webp){width="300"}
```
::

::tip
You can remove zooming with a click by adding `:zoom="false"`
::


## Code

- `ts [nuxt.config.ts]` adds filename
- `ts [nuxt.config.ts] {2}` highlights lines

::code-preview{label="Preview" class="[&>div]:*:my-0 [&>div]:*:w-full"}

```ts
export default defineNuxtConfig({
  modules: ['@nuxt/ui']
})
```

#code

````mdc
```ts
export default defineNuxtConfig({
  modules: ['@nuxt/ui']
})
```
````

::

### Diff

Use the `diff` language to show changes between code versions.

::code-preview{class="[&>div]:*:my-0 [&>div]:*:w-full"}

```diff [nuxt.config.ts]
export default defineNuxtConfig({
  modules: [
-   '@nuxt/ui-pro'
+   '@nuxt/ui'
  ]
})
```

#code

````mdc
```diff [nuxt.config.ts]
export default defineNuxtConfig({
  modules: [
-   '@nuxt/ui-pro'
+   '@nuxt/ui'
  ]
})
```
````

::

### Inline

- `{color="error"}` to change color
- `lang="ts-type"` for language

:::code-preview{label="Preview" class="[&>div]:*:my-0"}
`inline code`

#code

```mdc
`inline code`
```

:::

More [Component documentation](https://ui.nuxt.com/docs/typography) in English.

## Avoid

::warning
Really strict EU directives, so these might bring trouble.
::

### Iframes

They usually install 3rd party cookies, so very risky due **Consent**.

```html
<iframe src="https://www.youtube-nocookie.com/embed/AvG1wqLh-Lg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style="aspect-ratio: 16/9; width: 100%;"></iframe>
```