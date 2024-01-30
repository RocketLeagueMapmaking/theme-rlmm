# Introduction

This is a [VitePress](https://vitepress.dev) theme with Rocket League workshop components and other improvements that the default theme is missing.

## Installation

```sh
npm install @rocketleaguemapmaking/theme-rlmm --registry=https://npm.pkg.github.com
```

## Using the theme

First make an empty TypeScript file in `/.vitepress/theme/index.ts` and add:

```ts
import Theme from 'theme-rlmm'

export default Theme
```

Then in your configuration file:

```ts
import { defineConfigWithTheme } from 'vitepress'
import { type ThemeConfig } from 'theme-rlmm'

export default defineConfigWithTheme<ThemeConfig>({
    // ...
})
```
