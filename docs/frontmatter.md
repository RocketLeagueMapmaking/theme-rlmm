# Frontmatter

## Home

This theme provides a home layout which can be setting the `layout` in the YAML frontmatter:

```md
layout: Home
```

Then the following options can be set:

```md
---
hero: 
    - background: https://rocketleaguemapmaking.com/assets/img/rsz_home-stadium.42c7caa3.png
    - title: rocket league mapmaking
    - description: Guides, Maps, Downloads, and More!
    - actions:
        - primary: ['Get started with UDK', '/essential/']
        - secondary: ['Explore the guide', '/guide/'] 
events: [
    {
        title: Map contest,
        description: 'From November 2020 until just after the new year, we had our second mapmaking contest. $550 in prizes went to nine amazing maps as judged by a panel and by the Rocket League Community. Stay tuned for more in the future!',
        image: https://rocketleaguemapmaking.com/assets/img/rlmmc2.fd407413.png,
        actions: [
            {
                text: Announcement,
                link: 'https://reddit.com',
                primary: true
            },
            {
                text: Read more,
                link: /
            }
        ]  
    }, 
    {
        title: Another event,
        description: 'From November 2020 until just after the new year, we had our second mapmaking contest. $550 in prizes went to nine amazing maps as judged by a panel and by the Rocket League Community. Stay tuned for more in the future!',
        image: https://rocketleaguemapmaking.com/assets/img/rlmmc2.fd407413.png,
        actions: [
            {
                text: Discord server,
                link: https://discord.com,
                primary: true
            }
        ]
    }
]
footer:
    - text: A footer text
    - links: [
        {
            text: 'Footer link',
            link: /
        }
    ]
---

```
