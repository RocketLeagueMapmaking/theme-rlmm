import { defineConfig } from '../../../lib/config'
import themeConfig, { rewrites } from './theme'

const domain = 'https://theme-rlmm.pages.dev'

export default defineConfig({
    title: "theme-rlmm",
    description: "Testing playground for the map making guide",
    themeConfig,

    cleanUrls: true,
    appearance: true,
    lastUpdated: true,

    markdown: {
        headers: true,
    },

    rewrites,

    srcDir: './guide',
    srcExclude: ['**/flowchart/questions/*.md'],
    sitemap: {
        hostname: domain,
    },

    vite: {
        publicDir: '../.vitepress/public',
    },

    transformPageData(pageData, ctx) {
        if (pageData.relativePath === 'components.md') {
            pageData.frontmatter.outline = 1
            pageData.frontmatter.aside = 'left'
        }
    },

    head: [
        ['link', { rel: 'manifest', href: domain + '/manifest.json' }],
        ['meta', { name: 'theme-color', content: '#3eaf7c' }],
        [
            'script',
            { id: 'register-sw' },
            `;(() => {
                if ('serviceWorker' in navigator) {
                  navigator.serviceWorker.register('/sw.js')
                }
              })()`
        ],
    ],
})