---
title: Composables
---

# Composables

## useNotifications

You can use this composable to check if the user has granted access for sending push notifications and asking permission otherwise.

:::details Example

```mdx
<script setup>
import { useNotifications } from '../../../lib'
const NotificationManager = useNotifications()
</script>

<div v-if="NotificationManager.enabled.value">
<VPButton
    text="Enable notifications"
    v-if="!NotificationManager.permissions.granted.value"
    @click="NotificationManager.permissions.request()"
/>
<VPButton
    text="Send test notification"
    theme="alt"
    v-else
    @click="NotificationManager.worker.value.showNotification('Notification', {
        body: 'Your notifications are working'
    })"
/>
</div>
```

<script setup>
import { useNotifications } from '../../../lib'
const NotificationManager = useNotifications()
</script>

<div v-if="NotificationManager.enabled.value">
<VPButton
    text="Enable notifications"
    v-if="!NotificationManager.permissions.granted.value"
    @click="NotificationManager.permissions.request()"
/>
<VPButton
    text="Send test notification"
    theme="alt"
    v-else
    @click="NotificationManager.worker.value.showNotification('Notification', {
        body: 'Your notifications are working'
    })"
/>
</div>

:::

This also has methods related to [theme notifications](configuration#notifications).

### Subscriptions

To have permission for sending notifications at any time, use the [Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API) with the `useNotificationSubscription` composable.

```ts
interface UserSettings {
    events: boolean
    pages: 'all' | string[]
}

const subscriptionHandler = await useNotificationSubscription<UserSettings>({
    subscribeUrl: '<your server route>'
    publicKey: '<your service public key>',
})
```

The server route is expected to have the following methods implemented:

- `POST` with body of type `PostSubscriptionBody`
- `GET ?id=<device_id>`
- `PATCH ?id=<device_id>` with body of type `PatchSubscriptionBody`
- `DELETE ?id=<device_id>`

```ts
interface PostSubscriptionBody {
    deviceId: string
    subscription: PushSubscriptionJSON
    data: UserSettings
}

type PatchSubscriptionBody = Partial<UserSettings>
```

:::details Iterate pages

To have a setting that lists pages, use the following steps to create an listing interface.

In the config expose the pages to the frontmatter:

```mdx
---
exposePages: true
---
```

This will work if the [theme configuration](configuration#theme-configuration) is applied. Otherwise use the `transformPageData` hook to expose the pages.

And then on the page itself escape the file extension and format the route:

```mdx
<script setup>
import { useWatchedPages } from '@rocketleaguemapmaking/theme-rlmm'
const watched = useWatchedPages('rlmm-page-')
</script>

<PreferenceSetting
    :storeKey="watched.toKey(page)"
    v-for="page in $frontmatter.pages"
    :key="page"
    type="switch"
>
{{ watched.toDisplay(page) }}
</PreferenceSetting>
```

:::

## useSettings

Utility to interact with the local storage

```ts
import { useSettings } from '@rocketleaguemapmaking/theme-rlmm'

const settings = useSettings()
const enabled = ref(false)

onMounted(() => {
    enabled.value = settings.getBoolean('rlmm-key-enabled', true)
})
```

You can customize the local storage keys, colors and page classes with the theme options

:::details Theme options

<<< ../../../lib/types/theme/storage.ts

:::
