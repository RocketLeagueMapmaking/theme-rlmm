---
layout: home
title: Home
type: home
hero:
    name: Rocket League
    text: Map Making
    tagline: Guides, resources, downloads and more!
    image: /icons/logo_rlmm_round_1440.png
    actions:
        - theme: brand
          text: Get started
          link: /theme/
        - theme: alt
          text: UDK Guide
          link: /udk/
    steam:
        title:
           text: Steam workshop
           title: Click to switch between created or updated maps
           switchSortBy:
              initial: created
              enabled: true
              prefix:
                created: New
                updated: Updated
        enabled: true
        amount: 3
features:
    - title: UDK Guide
      details: Learn how to use UDK and make your map work in Rocket League
      link: /udk/
      linkText: Read more
      icon: 
        src: https://cdn.discordapp.com/emojis/714386127145926676.webp?size=64&quality=lossless
    - title: 3D modeling
      details: Learn how to make your maps unique with your own assets or import meshes from Blender into UDK
      link: /blender/
      linkText: Read more
      icon:
        src: https://cdn.discordapp.com/emojis/714382878561140737.webp?size=64&quality=lossless
    - title: Community support
      details: Connect with other map makers in the community to get help or help others with making custom maps
      link: https://discord.gg/PWu3ZWa
      linkText: Join the Discord server
      icon:
        src: https://assets-global.website-files.com/6257adef93867e50d84d30e2/653714c174fc6c8bbea73caf_636e0a69f118df70ad7828d4_icon_clyde_blurple_RGB.svg
resources:
    - title: Templates
      details: Get quickly started with a base map
    - title: Assets
      details: Download meshes, flash scripts, prefabs and more
    - title: Cheatsheets
      details: Step by step guides to make your workflow easy
    - title: References
      details: Detailed reference lists of Psyonix added classes and kismet nodes
    - title: Tools
      details: Utilities made by map makers to improve the modding experience
    - title: FAQ
      details: Answers for some frequently asked questions
    - title: Guides & tutorials
      details: Explore map making in these guides in video and written form
    - title: Modding network
      details: Explore related Rocket League modding communities
events:
    title: Map contests
    description: Map making events challenging to make custom maps in a certain theme
    action:
        text: See all contests
        link: /events
    dataUrl: https://docs.rocketleaguemapmaking.workers.dev/events?type=contests&scheme=actions
promotion:
    image: https://rocketleague.media.zestyio.com/rl_home_f2p-launch_cross_10656.jpg?width=1920&fit=bounds
    title:
        image: https://skillquest.io/wp-content/uploads/2022/08/Skillquest-Coding-Camps-and-Education-for-Rocket-League-Players.png
    description: Learn map making in a video tutorial course.<br><br>Some more text about the course and why you should choose it over regular videos if you have the money for it
    actions:
        - text: Read more
          href: https://learn.skillquest.io/landing/1699993747535x796931164922708000
sponsors:
    message: Patreon shoutout
    actionLink: https://patreon.com/rocketleaguemapmaking
    actionText: Become a supporter
    dataUrl: https://docs.rocketleaguemapmaking.workers.dev/sponsors
---

<script setup>
import { RLMMSteamStatistics } from '../../lib/'
</script>

<RLMMSteamStatistics />
