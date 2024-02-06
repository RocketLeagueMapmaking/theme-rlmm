<template>
    <div class="nav-notification-inbox" v-if="hideInbox !== 'true' && options != undefined">
        <div class="nav-notification-inbox-icon" @click="toggle()" ref="inboxIconRef">
            <!-- TODO: add hover color -->
            <Icon :icon="unread ? icons.unread.icon : icons.read.icon"
                :color="unread ? icons.unread.color : icons.read.color" />
        </div>
        <div class="nav-notification-inbox-content" v-if="open" ref="inboxRef">
            <div class="nav-notification-inbox-empty" v-if="inboxNotifications.length === 0" v-html="emptyText">
            </div>
            <div v-else class="nav-notification-inbox-item" v-for="notification in inboxNotifications.map(render)"
                :key="notification.id">
                <p class="nav-notification-inbox-item-title">
                    {{ notification.title }}
                </p>
                <p class="nav-notification-inbox-item-description" v-html="notification.text">
                </p>

            </div>
            <div class="nav-notification-inbox-bottom" v-if="options.bottomText">
                <p v-html="renderText(options.bottomText)"></p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { onClickOutside, useToNumber, useToggle } from '@vueuse/core';

import { useStorage, useNotification } from '../../composables';
import { renderText } from '../../util';
import type { NavInboxIcon, ThemeConfig, ThemeNotification } from '../../types';

const props = defineProps<{
    notifications: ThemeNotification[]
    options: NonNullable<ThemeConfig['notifications']>['inbox']
}>()

const inboxRef = ref(null), inboxIconRef = ref(null)
const hasRead = ref(false)

const storage = useStorage()
const [open, toggle] = useToggle()

const hideInbox = storage.useKey<string>(storage.themeKeys.value.hideNotificationInbox, null)
const lastOpened = storage.useKey<string>(storage.themeKeys.value.notificationInboxLastOpened, null)

const inboxNotifications = props.notifications
    .filter(n => n.inbox === true)
    .slice(0, props.options?.amount ?? 0)
    .sort((a, b) => useNotification(b).startTime - useNotification(a).startTime)

const unread = computed(() => {
    const last = useToNumber(lastOpened.value ?? '-1').value

    return inboxNotifications.length > 0 && !hasRead.value && (last < 0 || inboxNotifications.some(n => {
        const notif = useNotification(n)
        return notif.isActive && notif.startTime > last
    }))
})

const emptyText = computed(() => {
    return props.options?.emptyText
        ? renderText(props.options.emptyText)
        : 'No notifications to read...'
})

const icons = computed(() => {
    const { read, unread } = props.options?.icon ?? {}
    const defaultIcons = {
        unread: 'carbon:notification-new',
        read: 'carbon:notification-filled'
    }
    const colors = { main: '--vp-c-text-1', hover: '--vp-c-text-2' }
    const iconKey = (icon: NavInboxIcon | false | undefined, key: keyof Exclude<NavInboxIcon, string>) => {
        return icon != undefined && typeof icon === 'object' ? icon[key] : undefined
    }

    const readIcon = {
        icon: (typeof read === 'string' ? read : read?.icon) ?? defaultIcons.read,
        color: iconKey(read, 'color') ?? colors.main,
        hoverColor: iconKey(read, 'hoverColor') ?? colors.hover,
    }

    return {
        read: readIcon,
        unread: {
            icon: (typeof unread === 'string' ? unread : (unread === false ? readIcon.icon : unread?.icon)) ?? defaultIcons.unread,
            color: iconKey(unread, 'color') ?? colors.main,
            hoverColor: iconKey(unread, 'hoverColor') ?? colors.hover,
        }
    }
})

onClickOutside(inboxRef, () => {
    open.value = false
}, { ignore: [inboxIconRef] })

watch(open, (isOpen) => {
    if (isOpen && !hasRead.value) {
        storage.set(storage.themeKeys.value.notificationInboxLastOpened, Date.now().toString())
        hasRead.value = true
    }
})

function render(notification: ThemeNotification) {
    return {
        ...notification,
        title: notification.title,
        text: notification.html ?? renderText(notification.inboxText ?? notification.text)
    }
}
</script>

<style scoped>
.nav-notification-inbox {
    display: block;
    margin-left: 10px;
}

.nav-notification-inbox :deep(a) {
    text-decoration-line: underline;
}

.nav-notification-inbox-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    color: var(--vp-c-text-2);
    transition: color 0.5s;
}

.nav-notification-inbox-icon:hover {
    color: var(--vp-c-text-1);
    transition: color 0.25s;
    cursor: pointer;
}

.nav-notification-inbox-icon>svg {
    width: 20px;
    height: 20px;
    fill: currentColor;
}

.nav-notification-inbox-content {
    position: fixed;
    transform: translateX(-310px);
    width: 340px;
    background-color: var(--vp-c-bg-alt);
    padding: 12px 0;
    border-radius: 6px;
    border: 1px solid var(--vp-c-border);
    box-shadow: 10px solid var(--vp-c-bg-alt);
    display: flex;
    flex-direction: column;
}

.nav-notification-inbox-item {
    padding: 10px;
}

.nav-notification-inbox-item-title {
    font-weight: bolder;
    padding-bottom: 6px;
}

.nav-notification-inbox-item:not(:first-of-type),
.nav-notification-inbox-bottom {
    border-top: 1px solid var(--vp-c-border);
}

.nav-notification-inbox-bottom {
    padding: 12px;
    padding-top: 20px;
}

.nav-notification-inbox-bottom p,
.nav-notification-inbox-item-description {
    font-size: 14px;
}

.nav-notification-inbox-bottom p,
.nav-notification-inbox-item p {
    word-wrap: break-word;
    word-break: break-word;
    text-wrap: wrap;
}

.nav-notification-inbox-empty {
    height: 120px;
    font-style: italic;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Try to only target phones */
@media screen and (max-width: 500px) {
    .nav-notification-inbox-content {
        transform: translateX(-250px);
    }
}
</style>