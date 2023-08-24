<template>
    <external-link :href="href" :anchor="false" :useAccentColor="false">
        <Banner icon="fa-brands:patreon" backgroundColor="#FF424D" :message="message" textColor="#fff" />
    </external-link>
</template>

<script>
export default {
    props: {
        message: {
            type: String,
            required: false,
            default: 'Support us on Patreon!',
        }
    },

    data () {
        return {
            href: 'https://patreon.com/rocketleaguemapmaking',
        }
    },
}
</script>
