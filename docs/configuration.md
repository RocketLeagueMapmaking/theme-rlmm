# Configuration

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

        betaMessage: "",

        navbar: {
            title: 'Title' // <string>. Replace the navbar title with a custom title,
            hideRepoLink: false // <boolean>. Hide the repo link from the navbar
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

```
