---
title: Animation
description: Scroll reveals and animation tokens for MDC components.
navigation:
  title: Animation
  icon: i-lucide-sparkles
layout: dashboard
sidebar: true
collapsed: true
splitter: true
toc: true
surround: true
---

Small animations shared by the components on this site. They are plain CSS utilities, so they cost nothing at runtime, and they switch off for readers who prefer reduced motion.

## Reveal

Wraps any content and animates it in when it scrolls into view. Pick one of four variants. The animation plays once.

:::code-preview
::reveal{variant="emerge"}
**Emerge**

Slides up and fades in.
::

#code
```mdc
::reveal{variant="emerge"}
**Emerge**

Slides up and fades in.
::
```
:::

**Variants**

:::code-preview
::reveal{variant="emerge"}
**Emerge:** content rises and fades in.
::

::reveal{variant="blur" delay="100"}
**Blur:** content sharpens as it appears.
::

::reveal{variant="scale" delay="200"}
**Scale:** content grows from slightly smaller.
::

::reveal{variant="split" delay="300"}
**Split:** content opens from the middle.
::

#code
```mdc
::reveal{variant="blur" delay="100"}
**Blur:** content sharpens as it appears.
::
```
:::

**Props**

- `variant`: `emerge`, `blur`, `scale` or `split`. The default is `emerge`.
- `as`: the HTML tag to render, such as `section` or `li`. The default is `div`.
- `delay`: how long to wait after the content becomes visible, in milliseconds. The default is `0`.
- `distance`: how far the content travels, in pixels. The default is `30`.
- `threshold`: how much of the block must be visible before it plays, from `0` to `1`. The default is `0.2`.

**Staggering a group**

Give each block a larger `delay`, so they appear one after another:

```mdc
::reveal{delay="0"}
First
::

::reveal{delay="100"}
Second
::

::reveal{delay="200"}
Third
::
```

Keep the step short. A 100 ms step over 30 items makes the last one wait three seconds.

**Good to know**

- Each block animates once, the first time it scrolls into view. Scrolling back doesn't replay it.
- Until it scrolls into view, the content is hidden. Without JavaScript it stays hidden, so don't use `reveal` for content that is essential.
- When the reader prefers reduced motion, content appears at once, with no animation.
- Don't wrap items that can be dragged, such as the cards in `board-list`. See [Animation and dragging](#animation-and-dragging).

## ScrollStory

A story told while the reader scrolls. An image stays pinned on the left and fades from the `light` image to the `dark` one as the text on the right scrolls past. A thin progress bar at the top shows how far the reader has come.

```mdc
::scroll-story{light="/catlight.webp" dark="/catdark.webp"}
It starts with a quiet page.

Then the light begins to change.

By the end, the picture has turned.
::
```

::scroll-story{light="/catlight.webp" dark="/catdark.webp"}
It starts with a quiet page.

Then the light begins to change.

By the end, the picture has turned.
::

**Props**

- `light`: the image shown at the start of the story. The default is `/catlight.webp`.
- `dark`: the image shown at the end. The default is `/catdark.webp`.

Both are paths in `public/` and should start with a slash. The names describe the two images, not the color mode of the site.

**Good to know**

- **Each paragraph is one step.** A paragraph fills about 60% of the screen height and centers its text. Write one idea per paragraph, and leave a blank line between them.
- **Headings and lists** are not steps, and they take their normal height. Keep the story to paragraphs.
- **The image is pinned on large screens only.** On small screens the image sits above the text and scrolls away with the page, and the crossfade still follows the scroll.
- **One story per page.** The progress bar is pinned to the top of the page, so two of them would overlap.
- **Keep it short.** Each step is tall, so three to six paragraphs is plenty.
- **The images are decorative.** They have no alt text, so don't use them to carry information that the text doesn't have.
- **Reduced motion.** The entrance animation of the card is switched off, but the crossfade follows the scroll position and still works.

## Animation tokens

The tokens are defined in the theme as `--animate-*` variables. Each one becomes a utility class, such as `animate-emerge`.

| Utility | Duration | Used for |
| --- | --- | --- |
| `animate-emerge` | 0.7s | Scroll reveal: rises and fades in. Also the entrance of the `skill-finder` cards. |
| `animate-blur` | 0.7s | Scroll reveal: sharpens from a blur. |
| `animate-scale` | 0.7s | Scroll reveal: grows in. |
| `animate-split` | 0.7s | Scroll reveal: opens from the middle. |
| `animate-rise` | 0.5s | A general entrance for new items. |
| `animate-stat-in` | 0.5s | The cards and numbers of `stats`. |
| `animate-flicker` | 1.6s, repeats | A soft pulse, such as the "Open to help" badge. |
| `animate-quiz-pop` | 0.4s | A small bounce, for example after dropping an item. |
| `animate-quiz-shake` | 0.4s | A shake for a wrong answer. |

**Variables**

- `--rv-delay`: waits before the four reveal animations start. `reveal` sets it from its `delay` prop.
- `--rv-distance`: how far the reveal travels. `reveal` sets it from its `distance` prop.
- `--flicker`: the duration of one `flicker` cycle. The default is `1.6s`.

**Using a token in your own component**

Write the full class name in the source, so Tailwind can find it:

```vue
<UBadge class="animate-flicker" label="Open to help" />
```

Set a variable inline when you need a different value:

```vue
<UBadge class="animate-flicker" :style="{ '--flicker': '2.4s' }" label="Online" />
```

Don't build the name from a variable, such as `` `animate-${name}` ``. Tailwind only generates the classes it can see written out, so a built name produces no CSS.

## Reduced motion

One rule in the main stylesheet turns every animation off for readers who prefer reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  [class*='animate-'] {
    animation: none !important;
  }
}
```

With the animation off, an element shows in its normal resting state.

Because of this, never hide an element with an inline style, such as `opacity: 0`, and rely on an animation to reveal it. With the animation off, it would stay hidden. Use a class that is removed when the content should appear, as `reveal` does.

## Animation and dragging

Most tokens use `animation-fill-mode: both`, which keeps the last frame's `transform` and `opacity` on the element after the animation ends. The drag lists move items with transforms, and a held transform makes drags jump.

- Don't put an entrance animation on items that can be dragged.
- Animate the container that holds them instead, or play the animation once and then remove the class.
- For feedback after a drop, add `animate-quiz-pop` briefly, and remove it on `animationend`, as `skill-finder` does.
