# Theme configuration

Extra options are available for the theme configuration. See the [configuration reference](/reference/interfaces/theme.ThemeOptions.html) for the definitions of the configuration.

## Not found

Configure the [not found](/404) page to make it more useful when you land there

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
This can be shown on a page with [the `finished` frontmatter](frontmatter.md#finished)

- Type: `notFinishedSettings`

:::details Example configuration

```js
module.exports = {
    themeConfig: {
        notFinished: {
            message: 'This page is not finished'
        }
    }
}
```

:::

## Navbar

:::tip Hide GitHub repo link

Add the following to hide the GitHub link in the navbar to `/.vuepress/styles/index.styl`:

```css
.nav-links .repo-link {
    display: none;
}
```

:::

To display notification banners, use the [`notifications`](/reference/interfaces/theme.NavbarOptions.html#notifications) or [`notificationsUrl`](/reference/interfaces/theme.NavbarOptions.html#notificationsurl) property.

If the url is present and no notifications are left to be displayed, the url will be used to send a `GET` request to. The request should return [`SiteNotification[]`](/reference/interfaces/theme.SiteNotification) as a JSON body.

:::details Example configuration

```js
module.exports = {
    themeConfig: {
        navbar: {
            title: 'RLMM',
            icons: [
                {
                    name: 'fa-brands:discord',
                    link: 'https://discord.gg/PWu3ZWa',
                    tooltip: 'Discord',
                },
                {
                    name: 'fa-brands:github',
                    link: 'https://github.com/RocketLeagueMapmaking/theme-rlmm',
                    tooltip: 'GitHub',
                }
            ]
        }
    }
}
```

:::

### Navbar settings

:::danger Hidden options
By disabling the default settings this you will lose the default options:

- theme switching
- tooltips toggle
- new layout option

You also have the option to disable the default toggles and keep the theme switching.
See the example configurations for all options.
:::

To switch from the default settings menu to only a dark/light mode switch, use the `overwriteThemeSwitcher` property:

```js
module.exports = {
    themeConfig: {
        navbar: {
            settings: {
                overwriteThemeSwitcher: false,
            }
        }
    }
}
```

:::details Example configuration

```js
// Disabled
module.exports = {
    themeConfig: {
        navbar: {
            settings: {
                enabled: false,
            }
        }
    }
}

// Configuration that changes only the appearance
module.exports = {
    themeConfig: {
        navbar: {
            settings: {
                tooltip: 'Guide settings',
                icon: 'fa-brands:github',
            }
        }
    }
}

// Disabled default toggles
module.exports = {
    themeConfig: {
        navbar: {
            settings: {
                disabledToggles: true,
            }
        }
    }
}

module.exports = {
    themeConfig: {
        navbar: {
            settings: {
                // Only disable new layout option
                disabledToggles: ['sidemenu'],
            }
        }
    }
}

// Add a custom toggle next to the default toggles
//Combine with `disabledToggles: true` to only have the custom toggles
module.exports = {
    themeConfig: {
        navbar: {
            settings: {
                toggles: [
                    {
                        id: 'resources',
                        storageId: 'settingsAppResources',
                        key: 'enableResources',
                        text: 'Hide resources',
                        tooltip: 'Don\'t show page resources at the top',
                        invert: true,
                    }
                ],

            }
        }
    }
}
:::
