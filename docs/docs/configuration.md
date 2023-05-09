# Theme configuration

Extra options are available for the theme configuration:

## Not found

### background

- Type: `string`
- Default: `''`

The path or url of the background image for the 404 page. If empty, the background color will be used

### report

- Type: `boolean`
- Default: `true`

Displays a link to report the broken link by opening a new issue

### suggestedPages

- Type: `Array<LinkData>`
- Default: `[{ text: 'Home', link: '/'}]`

For every link that gets redirect to the 404 page, display these links.

### autoSuggestPages

- Type: `boolean`
- Default: `true`

Suggest additional pages next to [the default suggested pages](#suggestedpages) based on the link.
If the link `/publish-on-ue5.html` does not exist, but `/publishing.html` does the correct link suggestion will be added to the page.

:::details Example configuration

```js
module.exports = {
    themeConfig: {
        // Settings for the 404 page
        notFound: {
            background: '/image.png', // <string>. Url or path
            // Enable reporting the issue
            report: true,
            // Default suggestions for pages. Limit: 2
            suggestedPages: [
                {
                    text: 'Home',
                    link: '/'
                }
            ],
            // Enable page suggestions
            showSuggestedPages: true,
            // Auto suggest (max. 3) pages based on the entered url
            autoSuggestPages: true,

            // default quotes
            quotes: [
                'There\'s nothing here.',
                'How did we get here?',
                'That\'s a Four-Oh-Four.',
                'Looks like we\'ve got some broken links.',
            ],
        }
    }
}
```

:::

## Not finished

Options for displaying [the not finished banner](examples/finished.md).
This can be shown on a page with [the `finished` frontmatter](frontmatter.md#normal-page)

### message

- Type: `string`
- Default: `This page is not finished yet, check back later or contribute to this page!`

The message to display in the banner

### hidePage

- Type: `boolean`
- Default: `false`

Whether to hide pages in the navbar and sidebar that are marked as not finished.

## Navbar

:::tip Hide GitHub repo link

Add the following `styl` to hide the GitHub link in the navbar:

```css
.nav-links .repo-link {
    display: none;
}
```

:::

### title

- Type: `string`
- Default: `$siteConfig.title`

Override the title to use in the navbar

### icons

- Type: `Array<NameLinkData>`
- Default: `[]`

Add icon links in the top right of the navbar. The name property is the [iconify](https://iconify.design) icon name.

### Settings

#### enabled

- Type: `boolean`
- Default: `true`

Whether to show the settings menu on every page.

:::danger Hidden options
By disabling this you will lose the options:

- theme switching

Other options can be added manually (more easily)
:::

#### icon

- Type: `string`
- Default: `fa-solid:sliders-h`

The icon in the navbar for the settings

#### pages

- Type: `Array<IconLinkData>`
- Default: `[]`

Add pages with an icon at the bottom of the settings menu. Can be used for less used pages such as a changelog.

#### options

:::details Example configuration

```js
module.exports = {
    themeConfig: {
        navbar: {
            icons: [],
            title: 'RLMM',
            settings: {
                pages: [
                    {
                        name: 'Changelog',
                        icon: 'bullhorn',
                        link: '/changelog'
                    }
                ]
            }
        }
    }
}

```

:::

## Typescript

<<< @/docs/docs/types/theme.d.ts
