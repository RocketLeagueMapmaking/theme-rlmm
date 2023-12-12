# Utilities

## useNotifications

:::details Example

```mdx
<script setup>
import { useNotifications } from 'vitepress-theme-rlmm'

const NotificationManager = useNotifications()
</script>

<VPButton
    text="Enable notifications"
    v-if="!NotificationManager.hasPermission"
    @click="NotificationManager.requestPermissions()"
/>
<VPButton
    text="Send test notification"
    theme="alt"
    v-if="NotificationManager.hasPermission"
    @click="NotificationManager.showNotification('Notification', {
        body: 'Your notifications are working'
    })"
/>
```

<script setup>
import { useNotifications } from '../../../lib'
const NotificationManager = useNotifications()
</script>

<VPButton
    text="Enable notifications"
    v-if="!NotificationManager.hasPermission"
    @click="NotificationManager.requestPermissions()"
/>
<VPButton
    text="Send test notification"
    theme="alt"
    v-if="NotificationManager.hasPermission"
    @click="NotificationManager.showNotification('Notification', {
        body: 'Your notifications are working'
    })"
/>

:::

### Subscriptions

```ts
const subscriptionHandler = await NotificationManager.createSubscriptionHandler({
    subscribeUrl: '<your server route>'
    publicKey: '<your service public key>',
})

// Handle unsupported envs
if (!subscriptionHandler) return
```

The server route is expected to have the following methods implemented:

- `POST`
- `GET ?id=<device_id>`
- `PATCH ?id=<device_id>`
- `DELETE ?id=<device_id>`

Either all pages can be watched or select pages

:::details Iterate pages

In the config expose the pages to the frontmatter:

```ts
transformPageData(pageData, ctx) {
    // Only on the page(s) where you need to have all page paths
    if (pageData.relativePath === 'preferences.md') {
        pageData.frontmatter.pages = ctx.siteConfig.pages
    }
},
```

And then on the page itself escape the file extension and format the route:

```mdx
<PreferenceSetting
    :storeKey="`rlmm-page-${page.replace(/\//g, '_').replace('.md', '')}`"
    v-for="page in $frontmatter.pages"
    :key="page"
    type="switch"
>

/{{ page.replace('index.md', '').replace('.md', '') }}
</PreferenceSetting>
```

:::

## useSettings

Utility to interact with the local storage

```ts
import { useSettings } from 'vitepress-theme-rlmm'

const enabled = ref(false)
onMounted(() => {
    const settings = useSettings()
    enabled.value = settings.getBoolean('rlmm-key-enabled', true)
})
```
