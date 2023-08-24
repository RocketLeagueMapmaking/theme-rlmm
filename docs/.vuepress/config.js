module.exports = {
    title: 'RLMM - theme',
    description: 'Website theme documentation for rocketleaguemapmaking.com',
    theme: '..',
    icon: 'https://github.com/RocketLeagueMapmaking/RL-docs/blob/master/docs/.vuepress/public/icons/logo_rlmm_round_512.png?raw=true',
    evergreen: true,
    port: 8086,
    additionalPages: [
        {
            path: '/changelog.html',
            content: '<style>.page-edit { display: none }</style>',
            frontmatter: { layout: 'Changelog', sidebar: 'auto' },
        }
    ],
    themeConfig: {
        logo: 'https://github.com/RocketLeagueMapmaking/RL-docs/blob/master/docs/.vuepress/public/icons/logo_rlmm_round_512.png?raw=true',
        lastUpdated: 'Last updated',
        searchPlaceholder: 'Search...',
        repo: 'RocketLeagueMapmaking/theme-rlmm',
        repoLabel: 'GitHub',

        docsDir: 'docs',
        docsBranch: 'master',

        // Edit links
        editLinks: true,
        editLinkText: 'Edit this page on GitHub',

        smoothScroll: true,
        changelog: {
            items: [],
        },
        navbar: {
            title: 'RLMM',
            notifications: [
                {
                    storageKey: 'guide0',
                    message: 'You are visiting the theme documentation. [Visit the guide here](https://rocketleaguemapmaking.com).',
                    shortMessage: '[Go to the RLMM guide](https://rocketleaguemapmaking.com).',
                    color: '#002E0C',
                    dismisseable: true,
                    once: true,
                },
                {
                    storageKey: 'event0',
                    message: 'Participate in the new mapmaking contest: Assymetry!',
                    color: '#002E0C',
                    dismisseable: true,
                    once: true,
                    priority: 1,
                },
            ],
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
                },
            ],
        },
        nav: [
            {
                text: 'Documentation',
                link: '/docs/'
            },
            {
                text: 'Guide',
                link: 'https://rocketleaguemapmaking.com'
            },
            {
                text: 'Resources',
                items: [
                    {
                        text: 'Roadmap',
                        link: '/docs/'
                    },
                    {
                        text: 'Contribute',
                        items: [
                            {
                                text: 'Contributing guide',
                                link: 'https://github.com/rocketleaguemapmaking/RL-Docs/'
                            },
                            {
                                text: 'Discussions',
                                link: 'https://github.com/rocketleaguemapmaking/RL-Docs/discussions'
                            },
                            {
                                text: 'Patreon',
                                link: 'https://www.patreon.com/rocketleaguemapmaking'
                            }
                        ]
                    }
                ],
            },
        ],
        sidebarDepth: 2,
        sidebar: {
            '/docs/': [
                {
                    title: 'Theme guide',
                    collapsable: false,
                    children: [
                        '',
                        'configuration',
                        'frontmatter',
                        'components',
                        'constants',
                        {
                            title: 'Examples',
                            collapsable: true,
                            children: [
                                'examples/finished',
                            ]
                        },
                    ]
                }
            ],
        }
    }
}