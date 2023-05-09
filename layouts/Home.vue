<template>
  <Layout :enable-watching="false" :disable-sidemenu="true">
    <template #page-header>
      <div v-if="fm && (fm.hero || fm.events)">
        <div
          v-if="fm.hero"
          class="home-hero"
          :style="
            fm.hero.background
              ? {
                'background-image': `linear-gradient(180deg, rgba(0, 134, 29, 0.33) 0%, var(--c-bg) 200%),
                   url(${fm.hero.background})`,
                'background-position': 'center',
                'background-repeat': 'no-repeat',
                'background-size': 'cover',
                display: 'flow-root',
              }
              : {}
          "
        >
          <h1>{{ fm.hero.title }}</h1>
          <p>{{ fm.hero.description }}</p>
          <a
            v-for="(action, i) in fm.hero.actions"
            :key="i"
            class="hero-actions"
            :href="action.link"
          >
            <button :class="'primary' in action ? 'primary' : 'secondary'">
              {{ action.text }}
            </button>
          </a>
        </div>

        <ItemList :items="fm.items" />
        <SteamRecentMaps 
          v-if="fm.recentSteamMaps && fm.recentSteamMaps.enabled"
          :title="fm.recentSteamMaps.title"
          :amount="fm.recentSteamMaps.amount"
          :type="fm.recentSteamMaps.type"
        />
      </div>
    </template>
  </Layout>
</template>

<script>
import Layout from '@theme/layouts/Layout.vue'

import ItemList from '../components/ItemList.vue'
import SteamRecentMaps from '@theme/components/SteamRecentMaps.vue'

export default {
  components: {
    Layout,
    ItemList,
    SteamRecentMaps
},

  data() {
    return {
      fm: {},
    }
  },

  mounted() {
    this.fm = this.$page.frontmatter
    console.log(this.fm, this.$page)
  },
}
</script>

<style>
.page-edit {
  display: none !important;
}
</style>

<style scoped>
@import '../style/shared/button.css';

.home-hero {
  height: calc(100vh - var(--navbar-height));
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 10vw;
  max-width: 100vw !important;
  margin-top: 3.6rem;
}

.home-hero h1 {
  text-transform: uppercase;
  color: white;
  font-size: 84px;
  font-weight: bold;
  line-height: 5rem;
  transform: translateY(30px);
  margin-right: 20px;
  max-width: 850px;
}
.home-hero p {
  color: white;
  max-width: 600px;
  padding-bottom: 12px;
  padding-right: 5vw;
  font-size: 30px;
}

.hero-actions {
  display: inline-block;
  margin-bottom: 24px;
}

.hero-actions button {
  margin-left: 0px;
  margin-right: 24px;
}

@media screen and (max-width: 600px) {
  .home-hero h1 {
    font-size: 48px;
    line-height: 60px;
  }
}
</style>