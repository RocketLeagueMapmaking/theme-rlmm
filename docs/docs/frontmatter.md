---
actions:
    - text: Cheatsheet
      link: https://rocketleaguemapmaking.com/cheatsheets/
      external: false
      type: tip
    - text: Video tutorial
      link: /videos/
      banner: false
related:
    - /docs/constants
---
# Frontmatter

## Home

This theme provides a home layout which can be setting the `layout` in the YAML frontmatter:

```yaml
layout: Home
```

Then the following frontmatter options can be set:

```yaml
hero: 
    title: rocket league mapmaking
    background: https://rocketleaguemapmaking.com/assets/img/rsz_home-stadium.42c7caa3.png
    description: Guides, Maps, Downloads, and More!
    actions:
        - text: Get started with UDK
          link: /essential/
          primary: true
        - text: Explore the guide
          link: /guide/
recentSteamMaps:
    enabled: true
    amount: 3
    type: expanded
items:
    - title: Map contest
      description: 'From November 2020 until just after the new year, we had our second mapmaking contest.'
      image: https://rocketleaguemapmaking.com/assets/img/rlmmc2.fd407413.png
      actions:
          - text: Announcement
            link: 'https://reddit.com'
            primary: true
          - text: Read more
            link: /
```

## Normal page

### finished

- Type: `boolean`
- Default: `true`

When false, shows a WIP banner at the top of the page that it is not finished.

```yaml
# Shows a not finished banner at the top of the page
finished: false
```

[See this example page](./examples/finished.md) for how it looks on a page

### hideSidemenu

- Type: `boolean`
- Default: `false`

Overwrite all settings for the right side menu to hide on the current page

### watch

- Type: `boolean`
- Default: `true`

Overwrite the setting for showing the watching banner on the bottom of the page

### items

- Type: `Array<{ title: string; description: string; color?: string }>`
- Default: `[]`

Item blocks to render in the right side menu, if enabled.

### actions

- Type: `Array<ActionLinkData>`
- Default: `[]`

Add links to other pages / external websites to the right side menu, if enabled.

### related

- Type: `string[]`
- Default: `[]`

Related path(s), the part between `https://website` and `.html`, of pages that are displayed at the bottom of the page.

The current frontmatter of this page includes:

```yaml
related:
    - /docs/constants
```
