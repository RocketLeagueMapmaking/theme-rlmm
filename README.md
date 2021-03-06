# vuepress-theme-rlmm

> (future) theme for [the Rocket League map making guide](https://github.com/rocketleaguemapmaking/rl-docs)

## Layouts

### Home

This theme provides a home layout which can be setting the `layout` in the YAML frontmatter:

```md
layout: Home
```

Then the following options can be set:

```md
---
hero: 
    - background: https://rocketleaguemapmaking.com/assets/img/rsz_home-stadium.42c7caa3.png
    - title: rocket league mapmaking
    - description: Guides, Maps, Downloads, and More!
    - actions:
        - primary: ['Get started with UDK', '/essential/']
        - secondary: ['Explore the guide', '/guide/'] 
events: [
    {
        title: Map contest,
        description: 'From November 2020 until just after the new year, we had our second mapmaking contest. $550 in prizes went to nine amazing maps as judged by a panel and by the Rocket League Community. Stay tuned for more in the future!',
        image: https://rocketleaguemapmaking.com/assets/img/rlmmc2.fd407413.png,
        actions: [
            {
                text: Announcement,
                link: 'https://reddit.com',
                primary: true
            },
            {
                text: Read more,
                link: /
            }
        ]  
    }, 
    {
        title: Another event,
        description: 'From November 2020 until just after the new year, we had our second mapmaking contest. $550 in prizes went to nine amazing maps as judged by a panel and by the Rocket League Community. Stay tuned for more in the future!',
        image: https://rocketleaguemapmaking.com/assets/img/rlmmc2.fd407413.png,
        actions: [
            {
                text: Discord server,
                link: https://discord.com,
                primary: true
            }
        ]
    }
]
footer:
    - text: A footer text
    - links: [
        {
            text: 'Footer link',
            link: /
        }
    ]
---

```

## ThemeConfig

Extra options are available for the theme configuration:

```js
// config.js

module.exports = {
    themeConfig: {
        // default quotes
        notFound: [
            'There\'s nothing here.',
            'How did we get here?',
            'That\'s a Four-Oh-Four.',
            'Looks like we\'ve got some broken links.',
        ],

        rlmm: {
            navbar: {
                title: 'Title' // <string>. Replace the navbar title with a custom title
            },

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

            }
        }
    }
}

```

## Plugins

This theme has no pre-installed plugins

## Components

This theme has no global components

## Local development

Place `index.js`, the `layouts` folder and all other folders in `.vuepress/theme/` and run the guide locally

## Roadmap

- cache responses from GitHub API
- add a bell icon when changes are made
- option to hide the GitHub link from the navbar
- more layouts (cheatsheets, lists, etc.)
- individual page watching
- improve dark mode
