<template>
    <div v-if="enabled" class="notifications-banner" :style="color ? { 'background-color': color} : {}">
        <span v-html="displayedMessage" class="notification-message"></span>
        <span v-if="dismisseable" class="iconify notification-dismiss" data-icon="fa-solid:times"></span>
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

    mounted () {
        if (this.enabled) {
            themeEvents.$emit('notification-change', true)
        }
    },

    computed: {
        enabled () {
            const compareNeg = (prop, check) => (typeof prop === 'number' ? prop : prop.length) > 0 ? check : true

            return compareNeg(this.pages, this.pages.some(slug => this.$page.slug === slug))
                && compareNeg(this.startDate, this.startDate < Date.now())
                && compareNeg(this.endDate, this.endDate > Date.now())
                && (this.once ? !this.isDismissed : true)

        },

        displayedMessage () {
            return renderMd(this.message).replace('<p>', `<p style="margin: 0px; color: ${this.textColor}">`)
        },

        isDismissed () {
            return localStorage.getItem('notification-banner-' + this.storageKey) === 'true'
        }
    },

    methods: {
        dismiss () {
            if (this.isDismissed) return;
            localStorage.setItem('notification-banner-' + this.storageKey, 'true')
            themeEvents.$emit('notification-change', false)
        }
    },
}
</script>

<style scoped>
.notifications-banner {
    width: 100%;
    background-color: var(--c-bg-light);
    top: 0;
    position: fixed;
    margin-bottom: 1rem;
    margin-left: -1.5rem !important;
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