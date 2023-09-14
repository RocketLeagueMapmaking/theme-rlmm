<template>
    <div class="layout-rlmm-theme-wrapper update-box" v-if="enabled">
        <div class="page-update">
            <div class="update-content">
                <h1>{{ $data[state].title }}</h1>
                <p>{{ $data[state].description }}</p>
            </div>
            <div class="update-actions">
                <v-btn color="accent">
                    {{ $data[state].button.text }}
                </v-btn>
                <router-link :to="url">
                    <v-btn color="secondary">
                        {{ manageText }}
                    </v-btn>
                </router-link>

            </div>
        </div>
    </div>
</template>

<script>
import { themeEvents } from '@theme/layouts/Layout.vue'

export default {
    data() {
        return {
            manageText: 'Manage pages',
            url: '/watching',
            state: 'notWatching',
            hidden: true,
            watching: {
                title: 'You are currently watching this page',
                description: 'You are receiving notifications when this page updates',
                button: {
                    text: 'Unsubscribe',
                    color: '#fff'
                }
            },
            notWatching: {
                title: 'You are not watching this page',
                description: 'Watch this page to receive notifications when changes are made',
                button: {
                    text: 'Watch',
                    color: '#3eaf7c'
                }
            }
        }
    },

    mounted() {
        const pages = localStorage.getItem(`rlmm-viewing`)

        this.state = pages && JSON.parse(pages).includes(this.$page.path) ? 'watching' : 'notWatching'

        themeEvents.$on('setting-change', (event) => {
            const { id, value } = JSON.parse(event)
            if (id !== 'settingsAppUpdates') return;

            this.hidden = !value
        })

        /** @type {boolean | null} */
        const stored = themeEvents.getLocalStorageItem('settingsAppUpdates').value
        if (stored != null) {
            this.hidden = !stored
        }
    },

    computed: {
        enabled() {
            const watching = (this.$themeConfig.page || {}).watching || {}
            return this.$frontmatter.watch !== false
                && watching.enabled !== false
                && !this.hidden
        }
    }
}
</script>

<style scoped>
.update-box {
    max-width: var(--content-width);
    background-color: var(--c-bg-lighter);
    border-radius: 4px;
    margin: 0 auto !important;
    margin-top: 1rem !important;
}

.page-update {
    padding: 1rem 2.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.update-content h1 {
    font-size: 24px;
}

.update-actions {
    display: inherit;
    flex-direction: column;
    padding: 1rem;
}

.update-actions button {
    /* padding: 6px 12px; */
    margin: 6px 0px;
    /* border: 2px solid var(--c-border); */
    /* border-radius: 2px; */
}
</style>