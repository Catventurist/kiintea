---
title: Cookies
description: Cookies, storage and onboarding
navigation:
  title: Cookies
  icon: i-lucide-cookie
layout: dashboard
sidebar: false
collapsed: false
splitter: false
toc: true
surround: true
---

How the onboarding card relates to cookies and browser storage for EU users. This is a technical summary, not legal advice. Check it with whoever is responsible for your privacy policy.

> The cookie options are disabled in this project's config. This page is for developers who deploy in the EU. Everyone else can skip it.

## Legal basis

EU ePrivacy Art. 5(3) exempts storage that is strictly necessary to provide an information society service the user has explicitly requested. A preference the user picks in the onboarding card is such a request. The same cookie set on first load, without any request, is not.

## Cookie categories

| Category | Examples | Consent needed? |
|---|---|---|
| **Strictly necessary** | Session ID, CSRF token, cart, language, theme | No |
| **Functional** | "Remember me", layout preferences | Grey area (some regulators say no, some say yes) |
| **Analytics** | Google Analytics, Plausible | Yes |
| **Tracking/ads** | Cross-site identifiers, ad pixels | Yes |

## Cookies in this project

| Cookie | Set by | Verdict |
|---|---|---|
| Session ID | Nitro sessions / `useSession` | Necessary |
| CSRF token | Nitro / auth middleware | Necessary |
| `nuxt-ssr` (hydration) | Nuxt runtime | Necessary |
| Cart (e-commerce) | Your code | Necessary |
| `i18n_redirected` / locale | `@nuxtjs/i18n` | Functional |
| `nuxt-color-mode` | `@nuxtjs/color-mode` | Functional |

## Onboarding scenarios

| Scenario | Test | Verdict |
|---|---|---|
| Onboarding: user picks "dark" | Explicit request | Necessary |
| Onboarding: user picks "Spanish" | Explicit request | Necessary |
| No onboarding, cookie set on first load | No request | Functional → consent |
| No onboarding, `prefers-color-scheme` CSS media query | No storage, no cookie | Not applicable |

## What the user's choice stores

| User picks | Ask | Cookies set | Consent needed? |
|---|---|---|---|
| Language > dark mode | Language only | `i18n_redirected` | No |
| Dark mode > language | Dark mode only | `nuxt-color-mode` | No |
| Equal | Both | Both | No |

Only the setting the user chose is written:

| User picks | `setLocale('en')` → | `colorMode.preference = 'dark'` → |
|---|---|---|
| Language only | sets `i18n_redirected=en` | not called → no cookie, falls back to `prefers-color-scheme` |
| Dark mode only | not called → no cookie | sets `nuxt-color-mode=dark` |
| Both | sets `i18n_redirected=en` | sets `nuxt-color-mode=dark` |

## Consent records

If you do collect consent (for analytics, for example), keep a record of it:

| Field | Why |
|---|---|
| Pseudonymous identifier (session/consent ID) | Who consented |
| Timestamp (UTC) | When |
| Per-purpose choices (analytics: yes, marketing: no, …) | What |
| Banner/policy version shown | What they were told |
| Withdrawal events (if any) | Art. 7(3), as easy to withdraw as to give |

## Third-party embeds (YouTube)

An embedded video writes storage even with the privacy-enhanced domain:

| What happens on iframe load | Standard | Nocookie |
|---|---|---|
| HTTP cookies set | 5+ (VISITOR_INFO1_LIVE, YSC, GPS…) | None |
| `localStorage` written | Yes | Yes (`yt-remote-device-id`) |
| `IndexedDB` written | Yes | Yes |
| IP sent to Google | Yes | Yes |

Load the iframe only after the user clicks, and use `youtube-nocookie.com`:

```text
[Thumbnail with play button]
       ↓ user clicks
[iframe loads, video plays from youtube-nocookie.com]
```

## Testing in Brave

| Brave method | What it does |
|---|---|
| Shields → "Block all cookies" for youtube.com | Prevents them from being set (but YouTube may still write `localStorage`/`IndexedDB`, which Shields don't cover) |
| "Forget me when I close this site" (Forgetful Browsing) | Auto-deletes **all** first-party storage (cookies + localStorage + IndexedDB + cache) a few seconds after you close the last tab for that site |
| Add to "Sites that can never use cookies" | Hard block on HTTP cookies only |

## Conclusion

- Only set the functional cookies (`i18n_redirected`, `nuxt-color-mode`) after the user has acted or consented, never on first load.
- For the initial render, use a `<noscript>`-free default. Detect `prefers-color-scheme` with a CSS media query, then sync to the cookie after the user's choice.
- For the locale, default to the `Accept-Language` header on the server, and only persist the cookie after the user's choice.
- A choice made in the onboarding card is an explicit request, so the Art. 5(3) exemption applies and no consent banner is needed for it. Anything stored without that request needs consent.
- Analytics and tracking always need consent. Keep a consent record, and make withdrawal as easy as giving it.
