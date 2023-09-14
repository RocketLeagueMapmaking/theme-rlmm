<template>
    <div class="text-center" v-if="!disableSettings">
        <v-btn
            v-if="overwriteThemeSwitcher"
            @click="toggleTheme()"
            icon
            class="mr-4 d-flex align-center justify-center"
        >
            <Icon :icon="themeIcon || configuration.icon" width="24" style="color: var(--c-text) !important" />
        </v-btn>
        <v-menu v-else :close-on-content-click="false" :nudge-width="200" offset-y style="background-color: var(--c-bg-lighter);">
            <!-- Settings icon -->
            <template v-slot:activator="activator">
                <v-btn v-on="activator.on" v-bind="activator.attrs" color="var(--c-text)" icon rounded
                    class="mr-4 d-flex align-center justify-center">
                    <tooltip-text :tooltip="configuration.tooltip">
                        <Icon :icon="configuration.icon" width="1.5em" />
                    </tooltip-text>
                </v-btn>
            </template>

            <!-- Theme setting -->
            <v-card flat tile style="background-color: var(--c-bg-lighter) !important;">
                <v-card-title>Settings</v-card-title>
                <v-card-subtitle>Theme</v-card-subtitle>
                <v-card-actions>
                    <v-btn-toggle :value="theme"
                        @change="(value) => changeTheme(value)"
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

            <!-- Toggles. Use $themeConfig.navbar.settings.disabledOptions to exclude items -->
            <v-card style="background-color: var(--c-bg-lighter) !important;">
                <v-list flat rounded style="background-color: var(--c-bg-lighter) !important;">
                    <v-list-item v-for="toggle in toggles.filter(t => isOptionEnabled(t.id))" :key="toggle.id">
                        <v-list-item-action>
                            <v-switch 
                                @click="toggleSetting(toggle)"
                                :input-value="toggle.invert ? !toggledSettings[toggle.key] : toggledSettings[toggle.key]"  
                                :disabled="(toggle.minWidth || -1) > 0 && toggle.minWidth > windowWidth" 
                                inset 
                                color="primary"
                            ></v-switch>
                        </v-list-item-action>
                        <v-list-item-title>
                            <tooltip-text :tooltip="toggle.tooltip">
                                {{ toggle.text }}
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
        return {
            configuration: {
                icon: 'fa-solid:sliders-h',
                tooltip: 'Settings',
            },
            // Default theme, not exposed in themeConfig
            theme: 'system',
            themeIcon: null,
            availableThemes: [
                [
                    { text: 'Light', value: 'light', icon: 'fa6-solid:sun' },
                    { text: 'Dark', value: 'dark', icon: 'fa:moon-o' },
                ],
                [
                    { text: 'System', value: 'system', icon: 'fa6-solid:computer' },
                ],
            ],
            toggledSettings: {
                disableSideMenu: true,
                enableTooltips: false,
            },
            toggles: [
                {
                    id: 'sidemenu',
                    storageId: 'settingsAppOverview',
                    key: 'disableSideMenu',
                    text: 'Use new layout',
                    tooltip: 'On large pages, move the sidebar to the right',
                    invert: true,
                    minWidth: minWidthSidemenu,
                },
                {
                    id: 'tooltips',
                    storageId: 'settingsAppTooltips',
                    key: 'enableTooltips',
                    text: 'Enable tooltips',
                    tooltip: 'Show tooltips when hovering options and text',
                },
            ],

            showSettings: false,
            disableSettings: false,
            overwriteThemeSwitcher: false,
            disabledOptions: [],
            minWidthSidemenu,
            windowWidth: 0,
        }
    },

    mounted () {
        this.storage = Object.entries(window.localStorage)

        this.theme = this.getItemWithMetadata('settingsAppDarkTheme', 'boolean').metadata.raw

        if (this.$themeConfig.navbar) {
            const { icon, tooltip, settings: navSettings } = this.$themeConfig.navbar
            const settings = navSettings || {}

            if (icon) this.configuration.icon = icon
            if (tooltip) this.configuration.tooltip = tooltip
            if (typeof settings.enabled === 'boolean') this.disableSettings = !settings.enabled

            if (settings.overwriteThemeSwitcher) {
                this.overwriteThemeSwitcher = true
                this.themeIcon = this.availableThemes.flat().find(theme => theme.value === (this.getDarkThemeValue() ? 'dark' : 'light')).icon
            } else {
                if (Array.isArray(settings.disabledToggles)) this.disabledOptions = settings.disabledToggles
                else if (typeof settings.disabledToggles === 'boolean') {
                    this.toggles = []
                }

                if (settings.toggles != undefined && Array.isArray(toggles)) {
                    this.toggles.push(...settings.toggles)
                }
            }
        }

        for (const toggle of this.toggles) {
            const value = this.getItem(toggle.storageId, 'boolean')
            this.toggledSettings[toggle.key] = value
        }

        themeEvents.$on('mounted', (data) => {
            this.windowWidth = data.windowWidth
        })

        themeEvents.$on('window-resize', (windowWidth) => {
            this.windowWidth = windowWidth
        })
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

        /** @param [input] {string} */
        getDarkThemeValue: function (input) {
            const value = input || this.theme
            const usesDarkSystem = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

            return value === 'system' ? usesDarkSystem : value === 'dark'
        },

        setThemeIcon () {
            if (!this.overwriteThemeSwitcher) return

            const theme = this.availableThemes
                .flat()
                .find(theme => theme.value === (this.getDarkThemeValue() ? 'dark' : 'light'))
            
            this.themeIcon = theme ? theme.icon : null
        },

        /** @param {string} value  */
        changeTheme (value) {
            this.theme = value
            this.setItem('settingsAppDarkTheme', this.getDarkThemeValue(value), { raw: value })
            this.setThemeIcon()
        },

        toggleTheme () {
            const isDark = this.getDarkThemeValue()
            console.log('dark: ', isDark)
            this.changeTheme(isDark ? 'light' : 'dark')
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

        toggleSetting (toggle) {
            this.setItem(toggle.storageId, !this.toggledSettings[toggle.key], undefined)
            this.toggledSettings[toggle.key] = !this.toggledSettings[toggle.key]
        },
    }
}
</script>
