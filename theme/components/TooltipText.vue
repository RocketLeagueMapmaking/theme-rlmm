<template>
    <v-tooltip bottom :disabled="!enabled">
        <template v-slot:activator="activator">
            <span v-on="activator.on">
                <slot></slot>
            </span>
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
    data() {
        return {
            enabled: false,
        }
    },
    mounted() {
        this.enabled = themeEvents.getLocalStorageItem('settingsAppTooltips').value

        themeEvents.$on('setting-change', (event) => {
            const { id, value } = JSON.parse(event)
            if (id !== 'settingsAppTooltips') return;
            this.enabled = value
        })
    },
}
</script>
