<template>
    <div v-if="!sessionDismissed" class="notifications-banner" :style="color ? { 'background-color': color } : {}">
        <span v-html="displayedMessage" class="notification-message" :style="{ color: textColor }"></span>
        <span @click="dismiss" class="notification-dismiss iconify d-flex align-center">
            <Icon icon="fa-solid:times" v-if="dismisseable" class="iconify">
            </Icon>
        </span>
    </div>
</template>

<script>
import { renderMd, themeEvents } from '@theme/layouts/Layout.vue'

export default {
    props: { 
        message: {
            required: true,
            type: String,
        },
        storageKey: {
            required: true,
            type: String,
        },
        shortMessage: {
            required: false,
            type: String,
            default: '',
        },
        dismisseable: {
            required: false,
            type: Boolean,
            default: true,
        },
        pages: { 
            required: false,
            type: Array,
            default: () => [],
        },
        color: {
            required: false,
            type: String,
            default: 'var(--c-brand)',
        },
        textColor: {
            required: false,
            type: String,
            default: 'var(--c-text)',
        },
        startDate: {
            required: false,
            type: Number,
            default: -1,
        },
        endDate: {
            required: false,
            type: Number,
            default: -1,
        },
        once: {
            required: false,
            type: Boolean,
            default: true,
        },
    },

    data () {
        return {
            sessionDismissed: false,
        }
    },

    mounted () {
        // send event to toggle the notification on the first time
        if (!this.sessionDismissed) {
            themeEvents.$emit('notification-change', true)
        }

        themeEvents.$on('notification-after-dismissed', (notification) => {
            console.log(`Got new notification: ${notification}`)
        })
    },

    computed: {
        displayedMessage () {
            const message = !this.shortMessage ? this.message : (window.innerWidth > 900 ? this.message : this.shortMessage)

            return renderMd(message).replace('<p>', `<p style="margin: 0px; color: ${this.textColor}">`)
        },
    },

    methods: {
        dismiss () {
            const dismissed = themeEvents.getLocalStorageItem('notifications-dismissed').value || []
            localStorage.setItem('notifications-dismissed', JSON.stringify({ value: dismissed.concat(this.storageKey) }))
            themeEvents.$emit('notification-dismissed', this.storageKey)

            console.log(`Dismissed notification ${this.storageKey}`)
        }
    },
}
</script>

<style scoped>
.notifications-banner {
    width: 100%;
    background-color: var(--c-bg-light);
    top: 0;
    left: 0;
    position: fixed;
    margin-bottom: 1rem;
    /* margin-left: -1.5rem !important; */
    padding: 0.3rem 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.notification-dismiss {
    right: 20px;
    position: fixed;
}

.notification-dismiss:hover {
    cursor: pointer;
}

.notification-message p {
    margin: 0px !important;
}

</style>