---
layout: Home
title: Rocket League Mapmaking
editLink: false
hero: 
    title: RLMM - theme
    background: https://rocketleague.media.zestyio.com/StarbaseARC2.jpg
    description: A playground for testing the theme
    actions:
        - text: Configuration
          link: /docs/
          primary: true
        - text: View the guide
          link: https://rocketleaguemapmaking.com/
recentSteamMaps:
    enabled: false
items: [
    {
        title: Suggestions,
        description: 'Welcome to the theme sandbox',
        image: https://media.discordapp.net/attachments/713071168331972699/832391256096636938/rlmm.png?width=1277&height=317,
        actions: [
            {
                text: Discussions,
                link: 'https://github.com/RocketLeagueMapMaking/RL-docs/discussions/',
                primary: true
            },
            {
                text: Chat on Discord,
                link: {{ $page.global.DISCORD_INVITE }}
            }
        ]  
    }
]
---

<span style="margin: 0 auto; display: flex;justify-content: center;">
{{ $page.global.RLMM_THEME.name }}@{{ $page.global.RLMM_THEME.version }} | Testing sandbox for the RLMM website
</span>
