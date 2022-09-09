<template>
    <div class="page-sidebar" v-if="enabled">
        <div class="page-sidebar-headers" v-if="headers.length > 0">
            <div class="page-sidebar-header" v-for="header in headers" :key="header.slug">
                <a 
                    :href="'#' + header.slug" 
                    @click="activeHeader = header.slug"
                    :class="{ isActive: activeHeader === header.slug }"
                >{{ header.title }}</a>
            </div>
        </div>

        <div 
            class="page-sidebar-item" 
            v-for="item in ($page.frontmatter.items || [])" 
            :key="item.name"
            :style="{ 'background-color': item.color || 'inherit' }"
        >
            <h3>{{ item.name }}</h3>
            <p v-html="md.render(item.description)"></p>
        </div>

        <div class="page-sidebar-actions" v-for="item in ($page.frontmatter.actions || [])" :key="item.name">
            <p><a :href="item.link">{{ item.name }}</a> <OutboundLink /></p>
        </div>
    </div>
</template>

<script>
var MarkdownIt = require('markdown-it'),
    md = new MarkdownIt();

import { themeEvents } from '@theme/layouts/Layout.vue'
import { getBooleanValue } from '@theme/util/index.js'

export default {
    data () {
        return {
            activeHeader: '',
            enabled: true,
            md
        }
    },

    mounted() {
        const slug = new URL(window.location.href).pathname.split('#')[1]
        if (slug) this.activeHeader = slug
        const setEnabled = (checked) => {
            this.enabled = !getBooleanValue(checked) && window.screen.width > 959
        }

        this.enabled = setEnabled(localStorage.getItem('settingsAppOverview'))

        themeEvents.$on('setting-change', (event) => {
            const { id, value } = JSON.parse(event)
            console.log(event)

            if (id === 'settingsAppOverview') setEnabled(value)
        })
    },

    props: {
        header: String
    },

    computed: {
        headers: function () {
            const _headers = this.$page.headers || []
            const level = Math.min(..._headers.map(h => h.level))

            return _headers.filter(n => n.level === level)
        }
    }
}
</script>

<style scoped>
.page-sidebar {
    background-color: var(--c-bg-light);
    padding: 2rem;
    border-radius: 6px;
    max-width: 10rem;
    top: auto;
    /* position: fixed; */
    float:right;
    margin-left: -8rem;
    margin-right: 2rem;
    margin-top: calc(var(--navbar-height) + var(--navbar-padding-h))
}

.page-sidebar-headers {
    border-left: 3px solid var(--c-border-dark);
    padding-left: 1rem;
    margin-left: -0.8rem;
    margin-bottom: 0.8rem;
}

.page-sidebar-header {
    padding: 0.2rem 0px;
}

.page-sidebar-header a {
    font-weight: normal;
    color: var(--c-text);
}

.page-sidebar-header a:hover, .page-sidebar-header a.isActive {
    color: var(--c-brand);
}

.page-sidebar-item {
    padding: 0rem 0.5rem;
    padding-top: 0.1rem;
    margin: 1rem 0px;
    padding-bottom: 0.1rem;
    border-radius: 6px;
}
</style>