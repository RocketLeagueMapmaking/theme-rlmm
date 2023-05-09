<template>
  <div>
    <ParentLayout>
      <!-- Layout slots -->
      <template #page-top>
        <BetaHeader v-if="$frontmatter.finished != undefined" :enabled="!$frontmatter.finished" :message="notFinishedMessage" />
        <PageSidebar header="Contents" v-if="!disableSidemenu" />
        <slot name="page-header" />
      </template>

      <template #page-bottom>
        <slot name="page-footer" />

        <!-- TODO: add individual page watching -->
        <PageUpdate v-if="showPageWatching && false" />
      </template>

      <template #sidebar-bottom>
        <slot name="sidebar-bottom" />
      </template>
    </ParentLayout>
  </div>
</template>

<script>
import Vue from 'vue'

import ParentLayout from '@parent-theme/layouts/Layout.vue'

import { getBooleanValue } from '@theme/util/index.js'

export const themeEvents = new Vue()
export const minWidthSidemenu = 1400

var MarkdownIt = require('markdown-it'),
    md = new MarkdownIt();

export const renderMd = (content) => md.render(content)

import PageSidebar from '@theme/components/PageSidebar.vue'
import PageSettings from '@theme/components/PageSettings.vue'
import PageUpdate from '@theme/components/PageWatch.vue'

import BetaHeader from '@theme/components/BetaHeader.vue'

export default {
  components: {
    BetaHeader,
    ParentLayout,
    PageSidebar,
    PageUpdate,
    PageSettings
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

  mounted () {
    const headers = document.getElementsByTagName('H1')

    if (headers.length > 0) {
      const titleElem = headers[0]

      if (titleElem && titleElem.id) {
        // Append component to the title of the page
        const TitleComponent = Vue.extend(PageSettings)

        const component = new TitleComponent().$mount()
        document.getElementById(titleElem.id).appendChild(component.$el)
      }
    }

    this.$nextTick(() => {
        window.addEventListener('resize', this.onResize);
    })

    themeEvents.$on('notification-change', newDisplayValue => {
      console.log(newDisplayValue)
      this.toggleNotification(newDisplayValue)
    })

    themeEvents.$on('setting-change', (event) => {
      const { id, value } = JSON.parse(event)
      console.log(event)

      if (id === 'settingsAppDarkTheme') this.setDarkTheme(getBooleanValue(value))
      if (id === 'settingsAppUpdates') this.showPageWatching = this.watchingEnabled()
      if (id === 'settingsAppOverview') this.toggleSidebarDepth(!getBooleanValue(value))

    })

    const darkThemeEnabled = localStorage.getItem('settingsAppDarkTheme') 

    this.toggleSidebarDepth(!getBooleanValue(localStorage.getItem('settingsAppOverview')))

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

  data () {
    return {
      darkTheme: null,
      showPageWatching: false,
      showPageSettingsModal: false,
      windowWidth: window.innerWidth,
      minWidthSidemenu,
    }
  },

  computed: {
    notFinishedMessage () {
      return this.$themeConfig.betaMessage
    },
  },

  methods: {
    watchingEnabled: function () {

      const localValue = getBooleanValue(localStorage.getItem('settingsAppUpdates'))

      if (!this.enableWatching) return false
      return localValue
    },

    toggleClass (className, enabled) {
      const { classList } = document.documentElement

      enabled ? classList.add(className) : classList.remove(className)
    },

    toggleSidebarDepth (enabled) {
      this.toggleClass('hidden-sidebardepth', enabled)
    },

    toggleNotification (enabled) {
      this.toggleClass('navbar-notification', enabled)
    },  

    setDarkTheme (enabled) {
      this.darkTheme = enabled
      this.toggleClass('dark', enabled)
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
</style>