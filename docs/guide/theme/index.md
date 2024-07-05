---
title: Introduction
---

# Introduction

This is a [VitePress](https://vitepress.dev) theme with Rocket League workshop components and other improvements that the default theme is missing.

> [!CAUTION] Missing documentation
> For 0.\*.\* versions not all features can be documented. For updates look for the release notes, these will mention (almost) all changes on a high level. If it is not clear there, look at the code, open an issue or DM on Discord: @`ghostrider_05`.

## Installation

```sh
npm install rocketleaguemapmaking/theme-rlmm
```

It is recommended to pin the theme to the commit you want to avoid breaking changes.

## Using the theme

First make an empty TypeScript file in `/.vitepress/theme/index.ts` and add:

```ts
import Theme from '@rocketleaguemapmaking/theme-rlmm'

export default Theme
```

Then in your configuration file:

```ts
import { defineConfig } from '@rocketleaguemapmaking/theme-rlmm'

export default defineConfig({
    // ...
})
```
