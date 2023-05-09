module.exports = {
    title: 'RLMM - theme',
    description: 'Website theme documentation for rocketleaguemapmaking.com',
    theme: '..',
    icon: '',
    evergreen: true,
    port: 8086,
    head: [
        ['script',
            {
                src: 'https://code.iconify.design/2/2.1.0/iconify.min.js'
            }
        ],
    ],
    additionalPages: [
        {
            path: '/changelog.html',
            content: '<style>.page-edit { display: none }</style>',
            frontmatter: { layout: 'Changelog', sidebar: 'auto' },
        }
    ],
    themeConfig: {
        logo: '',
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
                    message: 'This is not the RLMM guide! [Visit the guide here](https://rocketleaguemapmaking.com).',
                    shortMessage: '[Go to the RLMM guide](https://rocketleaguemapmaking.com).',
                    color: 'var(--c-danger)',
                    dismisseable: false,
                    once: false,
                },
            ],
            icons: [
                {
                    name: 'fa-brands:discord',
                    link: 'https://discord.gg/PWu3ZWa',
                },
                {
                    name: 'fa-brands:github',
                    link: 'https://github.com/RocketLeagueMapmaking/theme-rlmm',
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
            }
        ],
        sidebarDepth: 3,
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