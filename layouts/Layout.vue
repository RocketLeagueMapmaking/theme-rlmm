<template>
  <div>
    <ParentLayout>
      <!-- Layout slots -->
      <template #page-top>
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
import PageUpdate from '@theme/components/PageWatch.vue'

import { getBooleanValue } from '@theme/util/index.js'

export const themeEvents = new Vue()

export default {
  components: {
    ParentLayout,
    PageUpdate
  },

  props: {
    enableWatching: {
      type: Boolean,
      default: true
    }
  },

  mounted () {
    themeEvents.$on('setting-change', (event) => {
      const { id, value } = JSON.parse(event)
      console.log(event)

      if (id === 'settingsAppDarkTheme') this.setDarkTheme(getBooleanValue(value))
      if (id === 'settingsAppUpdates') this.showPageWatching = this.watchingEnabled()
      
    })

    const darkThemeEnabled = localStorage.getItem('settingsAppDarkTheme') 

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
      showPageWatching: false
    }
  },

  methods: {
    watchingEnabled: function () {

      const localValue = getBooleanValue(localStorage.getItem('settingsAppUpdates'))

      if (!this.enableWatching) return false
      return localValue
    },

    setDarkTheme (enabled) {
      this.darkTheme = enabled

      const name = 'dark' 
      const { classList } = document.documentElement

      this.darkTheme ? classList.add(name) : classList.remove(name)
    }
  }
}
</script>

<style>
/* 
Css variables for the theme
Append the class 'dark' to the html tag for dark theme colors
Reference: https://vuepress2.netlify.app/reference/default-theme/styles.html#style-file
TODO: dark mode for: blocks, tables, search and code
 */
:root {
  /* // brand colors */
  --c-brand: #3eaf7c;
  --c-brand-light: #4abf8a;

  /* // background colors */
  --c-bg: #ffffff;
  --c-bg-light: #f3f4f5;
  --c-bg-lighter: #eeeeee;
  --c-bg-navbar: var(--c-bg);
  --c-bg-sidebar: var(--c-bg);
  --c-bg-arrow: #cccccc;

  /* // text colors */
  --c-text: #2c3e50;
  --c-text-accent: var(--c-brand);
  --c-text-light: #3a5169;
  --c-text-lighter: #4e6e8e;
  --c-text-lightest: #6a8bad;
  --c-text-quote: #999999;

  /* // border colors */
  --c-border: #eaecef;
  --c-border-dark: #dfe2e5;

  /* // custom container colors */
  --c-tip: #42b983;
  --c-tip-bg: var(--c-bg-light);
  --c-tip-title: var(--c-text);
  --c-tip-text: var(--c-text);
  --c-tip-text-accent: var(--c-text-accent);
  --c-warning: #e7c000;
  --c-warning-bg: #fffae3;
  --c-warning-title: #ad9000;
  --c-warning-text: #746000;
  --c-warning-text-accent: var(--c-text);
  --c-danger: #cc0000;
  --c-danger-bg: #ffe0e0;
  --c-danger-title: #990000;
  --c-danger-text: #660000;
  --c-danger-text-accent: var(--c-text);
  --c-details-bg: #eeeeee;

  /* // badge component colors */
  --c-badge-tip: var(--c-tip);
  --c-badge-warning: var(--c-warning);
  --c-badge-danger: var(--c-danger);

  /* // code blocks vars */
  --code-bg-color: #282c34;
  --code-hl-bg-color: rgba(0, 0, 0, 0.66);
  --code-ln-color: #9e9e9e;
  --code-ln-wrapper-width: 3.5rem;

  /* // font vars */
  --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  --font-family-code: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;

  /* // layout vars */
  --navbar-height: 3.6rem;
  --navbar-padding-v: 0.7rem;
  --navbar-padding-h: 1.5rem;
  --sidebar-width: 20rem;
  --sidebar-width-mobile: calc(var(--sidebar-width) * 0.82);
  --content-width: 740px;
  --homepage-width: 960px;
}

html.dark {
  /* // brand colors */
  --c-brand: #3aa675;
  --c-brand-light: #349469;

  /* // background colors */
  --c-bg: #22272e;
  --c-bg-light: #2b313a;
  --c-bg-lighter: #262c34;

  /* // text colors */
  --c-text: #adbac7;
  --c-text-light: #96a7b7;
  --c-text-lighter: #8b9eb0;
  --c-text-lightest: #8094a8;

  /* // border colors */
  --c-border: #3e4c5a;
  --c-border-dark: #34404c;

  /* // custom container colors */
  --c-tip: #318a62;
  --c-warning: #ceab00;
  --c-warning-bg: #7e755b;
  --c-warning-title: #ceac03;
  --c-warning-text: #362e00;
  --c-danger: #940000;
  --c-danger-bg: #806161;
  --c-danger-title: #610000;
  --c-danger-text: #3a0000;
  --c-details-bg: #323843;

  /* // code blocks vars */
  --code-hl-bg-color: #363b46;
}

html, body {
  background-color: var(--c-bg) !important;
  color: var(--c-text) !important;
}

.dropdown-title, .page-edit .edit-link a, .sidebar-link, .sidebar-heading, .navbar .site-name {
  color: var(--c-text) !important
}

.sidebar-link .active {
  color: var(--c-brand) !important
}

.custom-block .tip {
  border-color: var(--c-tip);
  background-color: var(--c-tip-bg)
}

.page-edit .last-updated .prefix {
  color: var(--c-text-lighter) !important
}

.page-edit .last-updated .time {
  color: var(--c-text-quote) !important;
}

.navbar {
  border-color: var(--c-border);
}
</style>