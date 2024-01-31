# Frontmatter

> [!TIP] Frontmatter
> You can use the [Frontmatter VSCode extension]() to have a better UI for editing frontmatter

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

#### sponsors.link

The link to your donation page. Used in the support button at the bottom.

- Required: `true`

#### sponsors.action

The text on the support button at the bottom.

- default: `'Become a supporter'`

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

The HTLM description

#### promotion.actions

Type: [`HeroAction[]`](https://vitepress.dev/reference/default-theme-home-page#hero-section)

## Normal page

### finished

Mark pages as not finished with a warning at the top of the page

```md
---
finished: false
---
```

### blocks

Add blocks / banners to a page

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