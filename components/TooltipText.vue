<template>
    <v-tooltip bottom :disabled="!enabled">
            <template v-slot:activator="activator">
                  <span v-on="activator.on"><slot></slot></span>
            </template>
        <span>{{ tooltip }}</span>
    </v-tooltip>
</template>

<script>
import { themeEvents } from '@theme/layouts/Layout.vue'

export default {
    props: {
        tooltip: {
            type: String,
            required: true,
        },
    },
    data () {
        const enabled = themeEvents.getLocalStorageItem('settingsAppTooltips').value

        return {
            enabled,
        }
    },
    mounted () {
        themeEvents.$on('setting-change', (event) => {
            const { id, value } = JSON.parse(event)
            if (id !== 'settingsAppTooltips') return;
            this.enabled = value
        })
    },
}
</script>
