<template>
    <v-app>
        <ParentLayout>
            <!-- Layout slots -->
            <template #page-top>
                <BetaHeader v-if="$frontmatter.finished != undefined" :enabled="!$frontmatter.finished"
                    :message="notFinishedMessage" />
                <PageSidebar header="Contents" />
                <slot name="page-header" />
            </template>

            <template #page-bottom>
                <slot name="page-footer" />

                <related-resources></related-resources>
                <!-- TODO: add individual page watching -->
                <PageUpdate v-if="showPageWatching && false" />
            </template>

            <template #sidebar-bottom>
                <slot name="sidebar-bottom" />
            </template>
        </ParentLayout>
    </v-app>
</template>

<script>
import ParentLayout from '@parent-theme/layouts/Layout.vue'

import { getBooleanValue } from '@theme/util/index.js'

class ThemeEventEmitter extends EventTarget {
    $on(eventName, callback) {
        this.addEventListener(eventName, (data) => callback(data.detail))
    }

    $emit(eventName, data) {
        this.dispatchEvent(new CustomEvent(eventName, { detail: data }))
    }

    getLocalStorageItem(key) {
        const value = localStorage.getItem(key)
        try {
            const parsed = JSON.parse(value)
            return { key, value: parsed.value, metadata: parsed.metadata }
        } catch (e) {
            return { key, value, metadata: undefined }
        }
    }
}

export const themeEvents = new ThemeEventEmitter()
export const minWidthSidemenu = 1400

var MarkdownIt = require('markdown-it'),
    md = new MarkdownIt();

export const renderMd = (content) => md.render(content)

import PageSidebar from '@theme/components/PageSidebar.vue'
import PageSettings from '@theme/components/PageSettings.vue'
import PageUpdate from '@theme/components/PageWatch.vue'

import BetaHeader from '@theme/components/BetaHeader.vue'
import RelatedResources from '@theme/components/RelatedResources.vue'

export default {
    components: {
        BetaHeader,
        ParentLayout,
        PageSidebar,
        PageUpdate,
        PageSettings,
        RelatedResources,
    },

    props: {
        enableWatching: {
            type: Boolean,
            default: true
        },
        disableSidemenu: {
            type: Boolean,
            default: false
        },
    },

    beforeDestroy() {
        window.removeEventListener('resize', this.onResize);
    },

    mounted() {
        this.windowWidth = window.innerWidth
        this.$nextTick(() => {
            window.addEventListener('resize', this.onResize);
        })

        themeEvents.$emit('mounted', {
            windowWidth: window.innerWidth,
        })

        themeEvents.$on('notification-change', newDisplayValue => {
            this.toggleNotification(newDisplayValue)
        })

        themeEvents.$on('setting-change', (event) => {
            const { id, value } = JSON.parse(event)
            console.log(event)

            switch (id) {
                case 'settingsAppDarkTheme':
                    this.setDarkTheme(getBooleanValue(value))
                    break;
                case 'settingsAppUpdates':
                    this.showPageWatching = this.watchingEnabled()
                    break;
                case 'settingsAppOverview':
                    // changing the sidebar depth is done in PageSidebar.vue
                    break;
            }
        })

        const darkThemeEnabled = themeEvents.getLocalStorageItem('settingsAppDarkTheme').value

        this.toggleSidebarDepth(!getBooleanValue(themeEvents.getLocalStorageItem('settingsAppOverview').value))

        if (getBooleanValue(darkThemeEnabled)) this.setDarkTheme(true)
        this.showPageWatching = this.watchingEnabled()

        // TODO: move to style section
        const items = ['sidebar', 'navbar', 'links']
        items.forEach(item => {
            document.getElementsByClassName(item)[0].style.backgroundColor = 'var(--c-bg)'
        })

        for (const dropdown of document.getElementsByClassName('nav-dropdown')) {
            dropdown.style.backgroundColor = 'var(--c-bg)'
        }
    },

    data() {
        return {
            darkTheme: null,
            showPageWatching: false,
            showPageSettingsModal: false,
            windowWidth: 0,
            minWidthSidemenu,
        }
    },

    computed: {
        notFinishedMessage() {
            return (this.$themeConfig.notFinished || {}).message
        },
    },

    methods: {
        watchingEnabled: function () {

            const localValue = getBooleanValue(themeEvents.getLocalStorageItem('settingsAppUpdates').value)

            if (!this.enableWatching) return false
            return localValue
        },

        toggleClass(className, enabled) {
            const { classList } = document.documentElement

            enabled ? classList.add(className) : classList.remove(className)
        },

        toggleSidebarDepth(enabled) {
            this.toggleClass('hidden-sidebardepth', enabled)
        },

        toggleNotification(enabled) {
            this.toggleClass('navbar-notification', enabled)
        },

        setDarkTheme(enabled) {
            this.darkTheme = enabled
            this.toggleClass('dark', enabled)
            this.$vuetify.theme.dark = enabled
        },

        onResize() {
            this.windowWidth = window.innerWidth

            if (this.windowWidth >= this.minWidthSidemenu) {
                this.toggleSidebarDepth(true)
            } else {
                this.toggleSidebarDepth(false)
            }

            themeEvents.$emit('window-resize', this.windowWidth)
        },
    }
}
</script>

<style>
/* 
Css variables for the theme
Append the class 'dark' to the html tag for dark theme colors
Reference: https://vuepress2.netlify.app/reference/default-theme/styles.html#style-file
TODO: dark mode for: blocks and search 
 */
@import '../style/root.css';
@import '../style/theme.css';
@import '../style/vuetify.css';
</style>