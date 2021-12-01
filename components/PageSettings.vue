<template>
    <div class="base">
        <div class="page-overview"  @click="showPageSettingsModal = !showPageSettingsModal">
            <span class="iconify" data-icon="fa-solid:ellipsis-h" style="width: 19px;"></span>
        </div>
        <div class="page-overview-modal" v-if="showPageSettingsModal">
            <span v-for="action in actions" :key="action.text" :class="{ hidden: ('path' in action) && !action.path }" @click="action.handler">
                <a :href="action.path" v-if="action.path">{{ action.text }}</a>
                {{ !('path' in action) ? action.text : '' }}
            </span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showPageSettingsModal: false,
            frontmatter: '',
            actions: [
                {
                    text: 'Watch page changes',
                    handler: () => {
                        alert('Watching')
                    }
                },
                {
                    text: 'Cheat sheet',
                    path: this.frontmatterPage('cheatsheet')
                },
                {
                    text: 'Tips and tricks',
                    path: this.frontmatterPage('tips')
                }
            ].map(x => 'handler' in x ? x : {...x, handler: () => {}})
        }
    },

    created () {
        this.frontmatter = this.$site.pages.find(x => x.path === window.location.pathname).frontmatter
    },

    methods: {
        frontmatterPage (key) {

            if (!this.frontmatter || !this.frontmatter[key]) return false

            const path = `/cheatsheet/${this.frontmatter[key]}.html`
            const page = this.$site.pages.find(x => x.path === path)

            return page ? page.path : false 
        }
    }
}
</script>

<style scoped>
.base {
    float: right;
}
.page-overview {
  width: 25px;
  float: right;
  padding: 6px 6px;
  background-color: var(--c-bg-light);
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  margin-bottom: 5px;
}

.page-overview:hover {
  background-color: var(--c-bg-lighter);
  cursor: pointer;
}

.page-overview-modal {
    position: fixed;
    transform: translateX(-80%) translateY(50%);
    background-color: var(--c-bg);
    border: 1px solid var(--c-border);
    padding: 4px 0px;
    margin-top: 23px;
    border-radius: 4px;
    min-width: fit-content;
    display: flex;
    flex-direction: column;
}

.page-overview-modal span, .page-overview-modal span a {
    font-size: 1.1rem;
    font-weight: 400;
    min-height: fit-content;
    padding: 2px 16px;
}

.page-overview-modal .hidden {
    display: none;
}

.page-overview-modal span:hover {
    background-color: var(--c-bg-light);
    cursor: pointer;
}
</style>