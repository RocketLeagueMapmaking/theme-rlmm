import { defineConfigWithTheme } from 'vitepress'

import { defineConfig } from '../../lib/config'

const domain = 'https://theme-rlmm.pages.dev/'

export default defineConfig({
    title: "theme-rlmm",
    description: "Testing playground for the map making guide",

    cleanUrls: true,
    appearance: true,
    lastUpdated: true,
    
    markdown: {
        headers: true,
    },

    srcDir: './guide',
    srcExclude: ['**/flowchart/questions/*.md'],
    sitemap: {
        hostname: domain,
    },

    head: [
        ['link', { rel: 'manifest', href: domain + 'manifest.json' }],
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

    themeConfig: {
        externalLinkIcon: true,
        editLink: {
            pattern: 'https://github.com/rocketleaguemapmaking/theme-rlmm/tree/main/docs/guide/:path',
            text: 'View this page on GitHub',
        },

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
            message: `RLMM Guide | Made by <a href="https://twitter.com/RH_MrSwaggles">Mr. Swaggles</a> | 2020 - ${new Date().getFullYear()}`,
        },

        logo: {
            src: '/icons/logo_rlmm_round_144.png',
        },

        nav: [
            { text: 'Theme', link: '/theme/' },
            {
                text: 'Resources',
                items: [
                    {
                        text: 'Discord',
                        link: '/'
                    },
                    {
                        text: 'GitHub',
                        items: [
                            {
                                text: 'Discussions',
                                link: '/'
                            }
                        ]
                    }
                ]
            },
            {
                text: 'Guide',
                // link: '/udk/',
                items: [
                    {
                        text: 'UDK',
                        expanded: true,
                        link: '/udk/',
                        description: 'Learn more about UDK',
                        icon: 'carbon:edit'
                    },
                    {
                        text: 'Blender',
                        expanded: true,
                        link: '/blender/',
                        description: 'Learn more about Blender',
                        icon: 'carbon:cube',
                    },
                    {
                        text: 'Kismet',
                        expanded: true,
                        link: '/udk/reference',
                        description: 'Learn more about kismet',
                        icon: 'carbon:branch'
                    },
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
                    text: 'Composables',
                    link: '/theme/composables',
                },
                {
                    text: 'Windows',
                    collapsed: false,
                    items: [
                        {
                            text: 'Overview',
                            link: '/theme/windows/',
                        },
                        {
                            text: 'Search',
                            link: '/theme/windows/search'
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
                created_at: 1705000000000,
                dismissable: true,
                color: 'linear-gradient(90deg, var(--vp-c-brand-3) 0%, var(--vp-c-brand-1) 50%, var(--vp-c-indigo-3) 100%)',
                text: 'Map making contest 6 is now active! [Read the announcement](https://discord.com/channels/711882968200904715/711883463871037510/1169509851832000523)'
            }
        },

        blocks: {
            feedback: true,
        },

        notifications: {
            inbox: {
                amount: 3,
                bottomText: 'You can [watch guide pages](/preferences) or follow the [Discord channel](/discord) to follow all framework updates.'
            },

            data: [
                {
                    id: 'inbox-1',
                    created_at: 1705000000000,
                    title: 'Not so dummy assets',
                    text: '[Not so dummy assets](https://github.com/RocketLeagueMapmaking/RL_NotSoDummyAssets) are now live! Make your live easier with **visible** dummy assets! [Download](https://rocketleaguemapmaking.com/resources/downloads.html) the assets to get started',
                    inbox: true,
                },
                {
                    id: 'inbox-2',
                    created_at: 1703000000000,
                    title: 'Map making commissions',
                    text: '[Commission channels](https://discord.com/channels/711882968200904715/1145180057590038539) are now in [the Discord server](./discord) to help with finding map makers for your paid project',
                    inbox: true,
                },
                {
                    id: 'inbox-3',
                    created_at: 1704000000000,
                    title: 'Improved setup script',
                    text: '[The UDK installer](https://github.com/RocketLeagueMapmaking/UDK_RL_Setup) has been improved to remove some manual configuration and steps. Try it out and [let us know](https://discord.com/channels/711882968200904715/712403230516052038) if you run into issues ',
                    inbox: true,               
                }
            ]
        },

        sidebarAction: {
            path: '/preferences',
            title: 'Edit preferences',
        },

        storage: {
            colorKeys: {
                '--vp-c-brand-1': 'rlmm-accent-color',
                '--vp-button-brand-bg': 'rlmm-accent-color',
            },

            pageClasses: {
                'green-bg': 'rlmm-bg-green'
            },
        }
    }
})
