<template>
    <a :href="url" target="_blank" rel="noopener noreferrer" :style="{ color: !useAccentColor ? 'var(--c-text)' : 'var(--c-brand)' }">
        <Icon :icon="icon" v-if="icon.length > 0" />
        <slot>
            <span v-if="name.length > 0">{{ name }}</span>
        </slot>
        <OutboundLink v-if="anchor" />
    </a>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: false,
            default: '',
        },
        icon: {
            type: String,
            required: false,
            default: '',
        },
        useAccentColor: {
            type: Boolean,
            required: false,
            default: true,
        },
        href: {
            type: String,
            required: false,
            default: '',
        },
        global: {
            type: String,
            required: false,
            default: '',
        },
        anchor: {
            type: Boolean,
            required: false,
            default: true,
        },
    },

    mounted () {
        if (this.url.length === 0) {
            throw new Error('ExternalLink: No href or key provided!')
        }
    },

    computed: {
        url () {
            if (this.global.length > 0) {
                return this.$page.global[this.global] || this.href
            } else return this.href
        }
    }
}
</script>