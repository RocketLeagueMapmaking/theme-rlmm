const { resolve } = require('path')

const DISCORD_INVITE = 'https://discord.gg/PWu3ZWa'

module.exports = {
    name: 'rlmm',
    extend: '@vuepress/theme-default',
    enhanceAppFiles: resolve(__dirname, './enhanceApp.js'),
    extendPageData ($page) {
        $page.global = {
            RLMM_THEME: { name: 'theme-rlmm', version: require('./package.json').version },
            DISCORD_INVITE,
        }
    },
}