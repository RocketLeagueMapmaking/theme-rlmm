import { defineConfigWithTheme } from 'vitepress'

import { type RLMMThemeConfig } from '../../lib/'

export default defineConfigWithTheme<RLMMThemeConfig>({
    title: "RLMM",
    description: "Testing playground for the map making guide",

    cleanUrls: true,
    appearance: true,
    markdown: {
        headers: true,
    },

    srcDir: './guide',
    srcExclude: ['**/flowchart/questions/*.md'],
    sitemap: {
        hostname: 'https://test-theme.pages.dev/'
    },

    head: [
        ['link', { rel: 'manifest', href: 'http://127.0.0.1:5173/manifest.json' }],
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

    transformPageData(pageData, ctx) {
        if (pageData.relativePath === 'preferences.md') {
            pageData.frontmatter.pages = ctx.siteConfig.pages
        }
    },

    themeConfig: {
        externalLinkIcon: true,
        search: {
            provider: 'algolia',
            options: {
                appId: 'L775MZSWZZ',
                apiKey: '64da7416b8e1c018d8c92161c85355ac',
                indexName: 'rocketleaguemapmaking',
                placeholder: 'Search...',
                //@ts-expect-error Not documented by SSG
                maxResultsPerGroup: 5,
            }
        },

        footer: {
            message: 'RLMM Guide | 2020 - 2023',
        },

        logo: {
            src: '/icons/logo_rlmm_round_144.png',
        },

        nav: [
            { text: 'Theme', link: '/theme/' },
            {
                text: 'Guide',
                // link: '/udk/',
                items: [
                    {
                        text: 'UDK',
                        link: '/udk/',
                    },
                    {
                        text: 'Blender',
                        link: '/blender/',
                    }
                ]
            },
        ],

        sidebar: {
            '/udk/': [
                {
                    text: 'UDK',
                    items: [
                        {
                            text: 'Getting started',
                            link: '/udk/'
                        },
                        {
                            text: 'References',
                            link: '/udk/reference',
                        }
                    ]
                }
            ],
            '/blender/': [
                {
                    text: 'Blender',
                    items: [
                        {
                            text: 'Getting started',
                            link: '/blender/'
                        }
                    ]
                }
            ],

            '/theme/': [
                {
                    text: 'Getting started',
                    link: '/theme/',
                },
                {
                    text: 'Configuration',
                    link: '/theme/configuration',
                },
                {
                    text: 'Frontmatter',
                    link: '/theme/frontmatter',
                },
                {
                    text: 'Components',
                    link: '/theme/components',
                },
                {
                    text: 'Utilities',
                    link: '/theme/util',
                },
                {
                    text: 'Windows',
                    items: [
                        {
                            text: 'Overview',
                            link: '/theme/windows/',
                        },
                        {
                            text: 'Tree',
                            link: '/theme/windows/tree',
                        },
                        {
                            text: 'List',
                            link: '/theme/windows/list',
                        },
                        {
                            text: 'Rocket League',
                            link: '/theme/windows/guide'
                        }
                    ],
                }
            ]
        },

        socialLinks: [
            { icon: 'github', link: 'https://github.com/rocketleaguemapmaking/rl-docs' }
        ],

        banner: {
            data: {
                id: 'banner-contest-6',
                dismissable: true,
                color: 'linear-gradient(90deg, var(--vp-c-brand-3) 0%, red 50%, blue 100%)',
                html: 'Map making contest 6 is now active! <a href="https://discord.com/channels/711882968200904715/711883463871037510/1169509851832000523">Read the announcement</a>'
            }
        },

        sidebarAction: {
            path: '/preferences',
        },
    }
})
