require('../../theme/util/vuetify.js')('./style/root.css', './util/colors.js', {
    light: ':root',
    dark: 'html.dark',
    colors: {
        primary: '--c-brand',
        secondary: '--c-bg-lighter',
        accent: '--c-brand-light',
        error: '--c-danger',
        info: '--c-info',
        success: '--c-tip',
        warning: '--c-warning',
    },
})
