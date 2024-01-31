# Introduction

This is a [VitePress](https://vitepress.dev) theme with Rocket League workshop components and other improvements that the default theme is missing.

## Installation

```sh
npm install rocketleaguemapmaking/theme-rlmm
```

Or you can install from [GitHub Packages](https://github.com/RocketLeagueMapmaking/theme-rlmm/pkgs/npm/theme-rlmm).

## Using the theme

First make an empty TypeScript file in `/.vitepress/theme/index.ts` and add:

```ts
import Theme from 'theme-rlmm'

export default Theme
```

Then in your configuration file:

```ts
import { defineConfig } from 'theme-rlmm'

export default defineConfig({
    // ...
})
```
