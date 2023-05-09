<template>
    <a :href="url" target="_blank" rel="noopener noreferrer">
        <slot></slot>
        {{ name }} 
        <OutboundLink v-if="icon" />
    </a>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: true,
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
        icon: {
            type: Boolean,
            required: false,
            default: true,
        }
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