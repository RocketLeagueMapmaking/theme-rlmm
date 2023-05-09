<template>
    <Banner 
        :enabled="enabled" 
        :message="message" 
        type="warning" 
        class="not-finished-banner" 
    />
</template>

<script>
import Banner from './Banner.vue';

export default {
    props: {
        enabled: {
            required: true,
            type: Boolean
        },
        message: {
            required: false,
            type: String,
            default: 'This page is not finished yet, check back later or contribute to this page!'
        },
    },

    components: {
        Banner,
    },
}
</script>

<style scoped>
.not-finished-banner {
    margin-bottom: -3rem;
    margin-top: calc(var(--navbar-height) + var(--navbar-padding-h));
}
</style>
