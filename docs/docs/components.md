# Components

## Banner

### props

#### enabled

- Type: `boolean`
- Required: `false`
- Default: `true`

Whether to render the banner or not

#### iconEnabled

- Type: `boolean`
- Required: `false`
- Default: `true`

Whether to render the icon on the banner or not

#### message

- Type: `string`
- Required: `true`

The message on the banner

#### type

- Type: `'info' | 'tip' | 'warning' | 'danger'`
- Required: `false`
- Default: `'tip'`

The banner type, similar to the [VuePress containers](https://vuepress.vuejs.org/guide/markdown.html#custom-containers)

#### icon

- Type: `string`
- Required: `false`
- Default: `''`

The [iconify](https://iconify.design) icon name to use instead of the icon associated with banner type.

#### textPlacement

- Type: `'left' | 'right'`
- Required: `false`
- Default: `'left'`

Change the position of the banner message

### Examples

::: v-pre

```md
<Banner message="This is a info banner" type="info" />
<Banner message="This is a tip banner" type="tip" />
<Banner message="This is a warning banner" type="warning" />
<Banner message="This is a danger banner" type="danger" />

<Banner message="Discord server" type="info" icon="fa-brands:discord" />
<Banner message="This is a tip with content on the right" textPlacement="right" />
<Banner message="This is a tip with no icon" :iconEnabled="false" />
<Banner message="This is a tip banner with a lot of content in the banner. So much that it overflows on the new line. Useful if you want to write a lot of text, but at this point make it a seperate paragraph" />
<Banner message="This is no banner" :enabled="false" />
```

:::

<Banner message="This is a info banner" type="info" />
<Banner message="This is a tip banner" type="tip" />
<Banner message="This is a warning banner" type="warning" />
<Banner message="This is a danger banner" type="danger" />

<Banner message="Discord server" type="info" icon="fa-brands:discord" />
<Banner message="This is a tip with content on the right" textPlacement="right" />
<Banner message="This is a tip with no icon" :iconEnabled="false" />
<Banner message="This is a tip banner with a lot of content in the banner. So much that it overflows on the new line. Useful if you want to write a lot of text, but at this point make it a seperate paragraph" />
<Banner message="This is no banner" :enabled="false" />

<Banner type="warning" backgroundHoverColor="var(--c-warning-bg)"><p>Test</p>
</Banner>

## ExternalLink

Opens a link in a new window

### props

#### name

- Type: `string`
- Required: `true`

The visible text in the hyperlink

#### global

- Type: `string`
- Required: `one of href, global`

The name of [constant](constants.md) to use on this page. Assumes that the variable is a url.

#### anchor

- Type: `boolean`
- Default: `true`

Whether to include the default outbound icon at the end: <OutboundLink />

#### href

- Type: `string`
- Required: `one of href, global`

The link to open.

### Examples

:::v-pre

```md
<ExternalLink global="DISCORD_INVITE" name="Discord" />

<ExternalLink href="https://github.com/RocketLeagueMapMaking/theme-rlmm" name="Repo" />

<!-- Without icon -->
<ExternalLink global="DISCORD_INVITE" name="Discord" :anchor=false />
<!-- Can also be local links -->
<ExternalLink href="constants" name="Same site" :anchor=false />

<!-- Use the default slot to place custom content in the link -->
<ExternalLink global="DISCORD_INVITE" :anchor=false>
<Banner message="Join the Discord server" type="info" icon="fa-brands:discord" />
</ExternalLink>
```

:::

<ExternalLink global="DISCORD_INVITE" name="Discord" /><br>
<ExternalLink href="https://github.com/RocketLeagueMapMaking/theme-rlmm" name="Repo" /><br>
<ExternalLink global="DISCORD_INVITE" name="Discord" :anchor=false /><br>
<ExternalLink href="constants" name="Same site" :anchor=false />

<ExternalLink global="DISCORD_INVITE" :anchor=false>
<Banner message="Join the Discord server" type="info" icon="fa-brands:discord" />
</ExternalLink>

## ItemList

Display items in a grid like style

### props

#### items

- Type: `Array<ItemListItem>`
- Required: `true`

## PatreonBanner

<patreon-banner />

### props

#### message

- Type: `string`
- Required: `false`

## SteamRecentMaps

### props

- Type: `SteamRecentMapsProps`

Show recent maps from the steam workshop in a component. Can also be configured in the YAML of the home screen.

## TooltipText

### props

#### tooltip

- Type: `string`
- Required: `true`

### Examples

<tooltip-text tooltip="Surprise">
<p>Hover over this text</p>
</tooltip-text>

```ts
<tooltip-text tooltip="[redacted]">
<p>Hover over this text</p>
</tooltip-text>
```

## Typescript

<<< @/docs/docs/types/components.d.ts
