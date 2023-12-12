# Frontmatter

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

The current sponsors

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

The url that returns a JSON response of `SponsorData`. This option can be used instead of [data](#sponsorsdata).

## Normal page

No additional frontmatter is in the theme for normal pages
