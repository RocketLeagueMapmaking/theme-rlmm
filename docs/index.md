---
layout: Home
title: Home
editLink: false
hideSidemenu: true
hero: 
    title: Theme
    background: https://rocketleague.media.zestyio.com/StarbaseARC2.jpg
    description: A playground for testing the theme
    actions:
        - text: Configuration
          link: /docs/
          icon: fa6-solid:gear
          primary: true
        - text: View the guide
          link: https://rocketleaguemapmaking.com/
          icon: fa6-solid:book-bookmark
recentSteamMaps:
    enabled: true
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
                link: https://discord.gg/PWu3ZWa
            }
        ]  
    }
]
---

<span style="margin: 0 auto; display: flex;justify-content: center;">
{{ $page.global.RLMM_THEME.name }}@{{ $page.global.RLMM_THEME.version }} | Testing sandbox for the RLMM website
</span>

<!-- Only needed on home page, if more content is added -->
<style scoped>
.theme-default-content {
    padding-right: 0 !important;
}
</style>
