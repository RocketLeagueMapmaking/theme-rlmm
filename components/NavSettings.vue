<template>
    <div class="text-center" v-if="!disableSettings">
        <v-menu :close-on-content-click="false" :nudge-width="200" offset-y style="background-color: var(--c-bg-lighter);">
            <template v-slot:activator="activator">
                <v-btn v-on="activator.on" v-bind="activator.attrs" color="var(--c-text)" icon rounded
                    class="mr-4 d-flex align-center justify-center">
                    <tooltip-text :tooltip="configuration.tooltip">
                        <Icon :icon="configuration.icon" width="1.5em" />
                    </tooltip-text>
                </v-btn>
            </template>

            <v-card flat tile style="background-color: var(--c-bg-lighter) !important;">
                <v-card-title>Settings</v-card-title>
                <v-card-subtitle>Theme</v-card-subtitle>
                <v-card-actions>
                    <v-btn-toggle :value="theme"
                        @change="(value) => setItem('settingsAppDarkTheme', getDarkThemeValue(value), { raw: value })"
                        mandatory group>
                        <v-container>
                            <v-row :class="{ 'mb-n1 mt-n8': index === 0 }" v-for="(themes, index) in availableThemes"
                                :key="index">
                                <v-btn v-for="(themeData, j) in themes" :key="themeData.value" :value="themeData.value"
                                    :color="theme === themeData.value ? 'primary' : 'var(--c-bg)'"
                                    :block="themes.length === 1"
                                    :class="{ 'py-3 px-4': true, 'mr-1': themes.length > 1 && j === 0, 'ml-1': themes.length > 1 && j === 1 }"
                                    large depressed rounded-lg>
                                    {{ themeData.text }}
                                    <Icon :icon="themeData.icon" width="1.4em" />
                                </v-btn>
                            </v-row>
                        </v-container>
                    </v-btn-toggle>
                </v-card-actions>
            </v-card>

            <v-card style="background-color: var(--c-bg-lighter) !important;">
                <v-list flat rounded style="background-color: var(--c-bg-lighter) !important;">
                    <v-list-item v-if="isOptionEnabled('sidemenu')">
                        <v-list-item-action>
                            <v-switch :value="!disableSideMenu" :disabled="windowWidth < minWidthSidemenu"
                                @click="toggleSidemenu()" inset color="primary"></v-switch>
                        </v-list-item-action>
                        <v-list-item-title>
                            <tooltip-text tooltip="On large pages, move the sidebar to the right">
                                Use new layout
                            </tooltip-text>
                        </v-list-item-title>
                    </v-list-item>
                    <v-list-item v-if="isOptionEnabled('tooltips')">
                        <v-list-item-action>
                            <v-switch :value="enableTooltips" @click="toggleTooltips()" inset color="primary"></v-switch>
                        </v-list-item-action>
                        <v-list-item-title>
                            <tooltip-text tooltip="Show tooltips when hovering options and text">
                                Enable tooltips
                            </tooltip-text>
                        </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-card>
        </v-menu>
    </div>
</template>

<script>
import { themeEvents, minWidthSidemenu } from '@theme/layouts/Layout.vue'

import { getBooleanValue } from '@theme/util/index.js'

export default {
    data() {
        const enableTooltips = this.getItem('settingsAppTooltips', 'boolean')
        const disableSideMenu = this.getItem('settingsAppOverview', 'boolean')

        console.log({
            enableTooltips,
            disableSideMenu,
        })

        return {
            configuration: {
                icon: 'fa-solid:sliders-h',
                tooltip: 'Settings',
            },
            // Default theme, not exposed in themeConfig
            theme: 'system',
            availableThemes: [
                [
                    { text: 'Light', value: 'light', icon: 'fa-solid:sun' },
                    { text: 'Dark', value: 'dark', icon: 'fa:moon-o' },
                ],
                [
                    { text: 'System', value: 'system', icon: 'fa6-solid:computer' },
                ],
            ],
            disableSideMenu,
            enableTooltips,

            showSettings: false,
            disableSettings: false,
            disabledOptions: [],
            minWidthSidemenu,
            windowWidth: 0,
        }
    },

    mounted () {
        this.storage = Object.entries(localStorage)

        if (this.$themeConfig.navbar) {
            const { icon, tooltip, settings } = this.$themeConfig.navbar

            if (icon) this.configuration.icon = icon
            if (tooltip) this.configuration.tooltip = tooltip
            if (typeof (settings || {}).enabled === 'boolean') this.disableSettings = !settings.enabled
            if ((settings || {}).disabledOptions) this.disabledOptions = settings.disabledOptions
        }

        themeEvents.$on('mounted', (data) => {
            this.windowWidth = data.windowWidth
        })

        themeEvents.$on('window-resize', (windowWidth) => {
            this.windowWidth = windowWidth
        })

        this.theme = this.getItemWithMetadata('settingsAppDarkTheme', 'boolean').metadata.raw
    },

    watch: {
        storage: function () {
            const items = Object.entries(localStorage)

            return items
        }
    },

    methods: {
        isOptionEnabled: function (key) {
            return !this.disabledOptions.includes(key)
        },

        getDarkThemeValue: function (value) {
            this.theme = value
            const usesDarkSystem = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

            return value === 'system' ? usesDarkSystem : value === 'dark'
        },
        toggleSettings() {
            this.showSettings = !this.showSettings
        },

        tryParseLocalItem(value) {
            try {
                return JSON.parse(value)
            } catch (e) {
                return { value }
            }
        },

        getItem(id, type) {
            return this.getItemWithMetadata(id, type).value
        },

        getItemWithMetadata(id, type) {
            const items = Object.entries(localStorage)

            if (items.some(x => x[0] === id)) {
                const rawValue = items.find(x => x[0] === id)[1]
                const { value, metadata } = this.tryParseLocalItem(rawValue)
                const combine = (newValue) => ({ value: newValue, metadata })

                if (typeof value === 'boolean') return combine(value)
                if (typeof value === 'string') {
                    return combine(type === 'boolean' ? getBooleanValue(value) : value)
                }
            } else {
                return { value: type === 'boolean' ? false : null, metadata: undefined }
            }
        },

        setItem(id, value, metadata) {
            if (this.storage.some(x => x[0] === id)) {
                this.storage.find(x => x[0] === id)[1] = value
            }

            localStorage.setItem(id, JSON.stringify({ metadata, value }))
            console.log(`Updated setting ${id}`)
            themeEvents.$emit('setting-change', JSON.stringify({ id, value, metadata }))
        },

        toggleTooltips() {
            this.setItem('settingsAppTooltips', !this.enableTooltips, undefined)
            this.enableTooltips = !this.enableTooltips
        },

        toggleSidemenu() {
            this.setItem('settingsAppOverview', !this.disableSideMenu, undefined)
            this.disableSideMenu = !this.disableSideMenu
        },
    }
}
</script>
