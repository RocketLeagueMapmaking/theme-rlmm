<template>
    <Banner 
        :enabled="enabled" 
        :message="message" 
        type="warning" 
        class="layout-rlmm-theme-wrapper not-finished-banner" 
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
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 90vw;
    margin-left: 20px;
}

</style>
