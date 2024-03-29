---
title: Frontmatter
---

# Frontmatter

## CMS

A Content Management System will make editing the frontmatter a bit easier. Some Git based or file based CMS recommendations:

- [Frontmatter VSCode extension](https://marketplace.visualstudio.com/items?itemName=eliostruyf.vscode-front-matter-beta): You can use the extension to have a better UI for editing frontmatter inside VSCode. See the exported `frontmatter.json` for an example configuration.

## Home page

### hero.steam

See the [SteamMaps component options](components#steammaps) for all properties.

### resources

Additional blocks to display more items on the home page. Uses the same component options as [the features section](https://vitepress.dev/reference/default-theme-home-page#features-section).

### resourceTitle

The title above [the resources section](#resources).

- default: `'Resources'`

### sponsors

Display the sponsors / supporters / backers of the project

#### sponsors.title

- default: `'Patreons'`

#### sponsors.actionLink

The link to your donation page. Used in the support button at the bottom.

- Required: `true`

#### sponsors.actionText

The text on the support button at the bottom.

- Required: `true`

#### sponsors.data

The current sponsors grouped by tier

```ts
type SponsorData = {
    tier: string
    items: {
        name: string
        img: string
        url: string
    }[]
}[]
```

#### sponsors.dataUrl

The url that returns a JSON response of `SponsorData`. This option can be used instead of [data](#sponsors-data).

### promotion

#### promotion.image

The image path / url for the large promotion banner

#### promotion.title

Type: `string | { image: string }`

#### promotion.description

The HTML description

#### promotion.actions

Type: [`HeroAction[]`](https://vitepress.dev/reference/default-theme-home-page#hero-section)

## Normal page

### banner

Whether to show top banner on the page or not

- Type: `boolean`
- Default: `true`

To disable the banner on the current page:

```md
---
banner: false
---
```

### feedback

Whether to show feedback on the page or not

- Type: `boolean`
- Default: `true`

To disable feedback:

```md
---
feedback: false
---
```

### finished

Mark pages as not finished with a warning at the top of the page

- Type: `boolean`
- Default: `true`

```md
---
finished: false
---
```

### blocks

Add blocks / banners to a page

- Type: `BlockRenderOptions[]` (see options below)
- Default: `[]`

```md
---
blocks:
    - text: |
        The following video tutorials are made about {topic}\
        \- [First YouTube video](https://google.com)\
        \- [Second YouTube video](https://google.com)
      color: var(--vp-c-indigo-soft)
---
```

Block options are:

| Name     | Type                                    | Required | Default   |
| -------- | --------------------------------------- | -------- | --------- |
| text     | string                                  | x        | -         |
| color    | string                                  | -        | undefined |
| type     | 'info' \| 'tip' \| 'warning' \| 'error' | -        | 'info'    |
| position | 'top' \| 'bottom'                       | -        | 'top'     |

### exposePages

:::danger Theme config
To use this option [the theme configuration](./configuration#theme-configuration) must be used
:::

Adds `{ pages: string[] }` to the current page frontmatter data

- Type: `boolean`
- Default: `false`

### inbox

Whether to show the notification inbox or not

- Type: `boolean`
- Default: `true`

To disable the inbox on the current page:

```md
---
inbox: false
---
```

### related

Adds links to pages that could be interesting based on the current page.

- Type: `string[]`
- Default: `[]`
