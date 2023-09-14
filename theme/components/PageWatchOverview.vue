<template>
    <v-container class="mx-auto">
        <h1>{{ text.title }}</h1>
        <p>Selected {{ selected.length }} / {{ pages.length }} pages</p>
        <v-card elevation="4">
            <v-card-text>
                {{ text.description }}
            </v-card-text>
            <v-card-actions>
                <v-btn color="accent" @click="toggleHidden()">{{ text.actions[!hidden ? 'show' : 'hide'] }}</v-btn>
                <v-btn color="error" @click="resetSelection()">{{ text.actions.reset }}</v-btn>
            </v-card-actions>
        </v-card>
        <v-divider />
        <v-list two-line dense nav>
            <v-list-item-group multiple v-model="selected">
                <v-list-item v-for="(page, i) in pages" :key="page.key">
                    <v-list-item-action>
                        <v-switch color="primary" :input-value="selected.includes(i)">
                        </v-switch>
                    </v-list-item-action>

                    <v-list-item-content>
                        <v-list-item-title>{{ page.title }}</v-list-item-title>
                        <v-list-item-subtitle>{{ page.path }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
        <v-card class="d-flex" style="position: fixed; bottom: 1.5rem; width: calc(var(--content-width) * 0.85);"
            elevation="4" v-if="!arraysEqual(selected, saved)">
            <v-card-text>
                Save your new selection
            </v-card-text>
            <v-card-actions>
                <v-btn color="accent">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
import { themeEvents } from '@theme/layouts/Layout.vue'

export default {
    data() {
        return {
            text: {
                title: 'Manage watched pages',
                description: 'When any of the selected pages are being updated, you will receive a notification.',
                actions: {
                    reset: 'Reset selection',
                    hide: 'Hide notification banners',
                    show: 'Show notification banners',
                },
            },

            hidden: true,

            /** 
             * The current selected pages
             * @type {string[]}
             * */
            selected: [],
            /** 
             * All site pages
             * @type {string[]}
             */
            pages: [],
            /**
             * Currently subscribed items
             * @type {string[]}
             */
            saved: [],
        }
    },

    mounted() {
        this.pages = this.$site.pages.filter(p => p.frontmatter ? p.frontmatter.watch !== false : true)
        this.saved = JSON.parse(localStorage.getItem('rlmm-viewing') || '[]')

        const stored = themeEvents.getLocalStorageItem('settingsAppUpdates').value
        if (stored != null) {
            this.hidden = !stored
        }

        this.resetSelection()
    },

    methods: {
        /**
         * Check if a and b are the same
         * @param {string[]} a 
         * @param {string} b 
         * @returns {boolean}
         */
        arraysEqual(a, b) {
            return a.length === b.length && a.every(i => b.includes(i)) && b.every(i => a.includes(i))
        },

        toggleHidden() {
            localStorage.setItem('settingsAppUpdates', JSON.stringify({ value: !this.hidden }))
            themeEvents.$emit('setting-change', JSON.stringify({ id: 'settingsAppUpdates', value: !this.hidden }))
            this.hidden = !this.hidden
        },

        resetSelection() {
            // set selection to saved paths
            this.selected = this.saved
        }
    }
}
</script>