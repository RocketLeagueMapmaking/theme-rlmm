<template>
    <div class="related-resources" v-if="visible">
        <h3>{{ title }}</h3>
        <v-row>
            <v-col
            v-for="(page, i) in pages"
            :key="i"
            cols="12"
            md="4"
            >
                <router-link v-if="page" :to="page.path">
                    <v-card
                        class="d-flex align-center justify-center rounded"
                        height="80px"
                    >
                        <Icon v-if="page && page.icon" :icon="page.icon" style="width: 2.5em; height: 2em;" color="var(--c-brand)" class="ml-4"></Icon>
                        <v-container class="d-flex flex-column">
                            <v-card-title>{{ page.title }}</v-card-title>
                            <v-card-subtitle>{{ page.description }}</v-card-subtitle>
                        </v-container>
                    </v-card>
                </router-link>
                <v-card v-else class="d-flex align-center"
                        height="80px">
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    data () {
        return {
            title: 'Related resources',
            defaultDescription: 'Guide',
            defaultIcon: 'fa:file-text',
            fillAmount: 3,
            fillEmpty: false,
            hideWhenEmpty: true,
        }
    },

    computed: {
        visible: function () {
            return !(this.hideWhenEmpty && this.raw.length === 0)
        },

        raw: function () {
            return ((this.$frontmatter || {}).related || []).filter((_, i) => i < this.fillAmount)
        },

        resources: function () {
            return this.fillEmpty ? Array.from({ length: this.fillAmount }, (_, i) => this.raw[i] || '') : this.raw
        },

        pages: function () {
            return this.resources.map(path => this.getPageData(path))
        }
    },

    methods: {
        getPageData (path) {
            if (path.length === 0) return undefined
            const page = this.$site.pages.find(page => page.path === path + '.html')
            if (!page) {
                throw new Error('Invalid path to find page: ' + path)
            }

            const theme = this.$themeConfig.related || {}
            const defaultIcon = theme.icon || this.defaultIcon,
                defaultDescription = theme.description || this.defaultDescription;

            const config = (theme.pages || []).find(r => path.startsWith(r.prefix))

            return { 
                title: page.title, 
                description: config ? config.description || defaultDescription : defaultDescription, 
                path: page.path, 
                icon: config ? config.icon || defaultIcon : defaultIcon,
            }
        }
    },

    mounted () {
        const theme = this.$themeConfig.related || {}

        if (theme.title) this.title = theme.title
        if (theme.amount) this.fillAmount = theme.amount
    }
}
</script>

<style scoped>
.related-resources {
    max-width: var(--content-width);
    padding: 0 2.5rem;
    margin: 0 auto;
}
</style>
