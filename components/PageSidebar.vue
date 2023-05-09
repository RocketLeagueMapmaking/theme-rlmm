<template>
    <div class="page-sidebar" v-if="show">
        <p v-if="headers.length > 0" style="margin: 0; margin-bottom: 6px; padding-bottom: 4px; border-bottom: 2px solid var(--c-border); text-transform: uppercase; font-weight: 500;">{{ onThisPageTitle }}</p>
        <div class="page-sidebar-headers" v-if="headers.length > 0">
            <div class="page-sidebar-header" v-for="header in headers" :key="header.slug">
                <a 
                    :href="'#' + header.slug" 
                    @click="activeHeader = header.slug"
                    :class="{ isActive: activeHeader === header.slug }"
                    :style="{ 'margin-left': Math.max(0, (header.level - 2)) * 12 + 'px' }"
                >{{ header.title }}</a>
            </div>
        </div>

        <div 
            class="page-sidebar-item" 
            v-for="item in ($page.frontmatter.items || [])" 
            :key="item.text"
            :style="{ 'background-color': item.color || 'var(--c-bg-light)' }"
        >
            <h3>{{ item.text }}</h3>
            <p v-html="renderMd(item.description)"></p>
        </div>

        <div class="page-sidebar-actions" v-for="item in ($page.frontmatter.actions || [])" :key="item.text">
            <p><a :href="item.link">{{ item.text }}</a> <OutboundLink /></p>
        </div>
    </div>
</template>

<script>
import { themeEvents, renderMd, minWidthSidemenu } from '@theme/layouts/Layout.vue'
import { getBooleanValue } from '@theme/util/index.js'

export default {
    data () {
        return {
            activeHeader: '',
            onThisPageTitle: 'On this page',
            enabled: true,
            minWidthSidemenu,
            windowWidth: window.innerWidth,
            renderMd,
        }
    },

    mounted() {
        const slug = this.$route.hash
        if (slug) this.activeHeader = slug

        this.setEnabled(localStorage.getItem('settingsAppOverview'))

        themeEvents.$on('setting-change', (event) => {
            const { id, value } = JSON.parse(event)

            // changing the sidebar depth is done in Layout.vue
            if (id === 'settingsAppOverview') {
                this.setEnabled(value)
            }
        })

        themeEvents.$on('window-resize', (event) => {
            this.windowWidth = event
        })
    },

    props: {
        header: String
    },

    methods: {
        setEnabled (checked) {
            this.enabled = !getBooleanValue(checked)
        }
    },

    watch: {
        '$route.hash': function () {
            if (this.slug) this.activeHeader = this.slug.replace('#', '')
        },
    },

    computed: {
        slug: function () {
            return this.$route.hash
        },
        show: function () {
            return this.enabled && !this.$frontmatter.hideSidemenu && this.windowWidth >= this.minWidthSidemenu && (this.$page.headers || this.$page.frontmatter.items || this.$page.frontmatter.actions)
        },

        headers: function () {
            const _headers = this.$page.headers || []
            const maxLevel = this.$themeConfig.sidebarDepth || 2

            return _headers.filter(n => n.level <= maxLevel)
        }
    }
}
</script>

<style scoped>
.page-sidebar {
    padding: 1.5rem 0.5rem;
    border-radius: 6px;
    max-width: 12rem;
    width: 100%;
    overflow-y: auto;
    top: calc(var(--navbar-height) + var(--navbar-padding-h));
    right: 2rem;
    position: fixed;
}

.page-sidebar-headers {
    margin-bottom: 0.8rem;
}

.page-sidebar-header {
    padding: 0.1rem 0px;
}

.page-sidebar-header a {
    font-weight: normal;
    color: var(--c-text-lightest);
    border-left: 3px solid var(--c-border);
    padding-left: 1rem;
    margin: auto 0;
}

.page-sidebar-header a:hover, .page-sidebar-header a.isActive {
    color: var(--c-text);
    border-left: 3px solid var(--c-brand);
}

.page-sidebar-item {
    padding: 0rem 0.5rem;
    padding-top: 0.1rem;
    margin: 1rem 0px;
    padding-bottom: 0.1rem;
    border-radius: 6px;
}

.page-sidebar-item > *, .page-sidebar-actions > * {
    margin: 6px 0px !important;
}
</style>