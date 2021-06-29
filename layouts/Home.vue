<template>
  <Layout>
    <template #page-header>
      <div v-if="fm && (fm.hero || fm.events)">
        <div
          v-if="fm.hero"
          class="home-hero"
          :style="
            heroProp('background')
              ? {
                  'background-image': `linear-gradient(180deg, rgba(0, 134, 29, 0.33) 0%, #000000 100%),
                   url(${heroProp('background')})`,
                  'background-position': 'center',
                  'background-repeat': 'no-repeat',
                  'background-size': 'cover',
                  display: 'flow-root',
                }
              : {}
          "
        >
          <h1>{{ heroProp("title") }}</h1>
          <p>{{ heroProp("description") }}</p>
          <a
            v-for="(action, i) in heroProp('actions')"
            :key="i"
            class="hero-actions"
            :href="Object.values(action)[0][1]"
          >
            <button :class="'primary' in action ? 'primary' : 'secondary'">
              {{ Object.values(action)[0][0] }}
            </button>
          </a>
        </div>

        <div v-if="fm.events" class="home-events">
          <div v-for="(event, index) in fm.events" :key="index" class="event">
            <div class="event-text">
              <h1>{{ event.title }}</h1>
              <div>
                <p>{{ event.description }}</p>
              </div>
              <a
                :href="action.link"
                v-for="(action, i) in event.actions"
                :key="i"
              >
                <button
                  :class="{
                    primary: action.primary,
                    'secondary border': !action.primary,
                    margin: i !== 0,
                  }"
                  class="event-buttons"
                >
                  {{ action.text }}
                </button>
              </a>
            </div>

            <div class="event-image">
              <img :src="event.image" :alt="event.title" />
            </div>
          </div>
        </div>
      </div>
    </template>

    <template #page-footer>
      <div class="home-footer" v-if="fm && fm.footer">
        <div class="home-footer-links">
          <img :src="fm.footer.logo" alt="" />
          <a v-for="(path, i) in fm.footer.links" :key="i" :href="path.link">
            {{ path.text }}
          </a>
        </div>

        <p v-if="fm.footer.text">{{ fm.footer.text }}</p>
      </div>
    </template>
  </Layout>
</template>

<script>
import Layout from "@theme/layouts/Layout.vue";

export default {
  components: {
    Layout,
  },

  data() {
    return {
      fm: "",
    };
  },

  methods: {
    heroProp(prop) {
      return this.fm.hero.some((x) => x[prop])
        ? this.fm.hero.find((x) => x[prop])[prop]
        : "";
    },
    windowWindth: () => window.innerWidth,
  },

  mounted() {
    this.fm = this.$page.frontmatter;
    document.getElementsByClassName("last-updated")[0].style.display = "none";
  },
};
</script>

<style scoped>
body {
  --accent: #3eaf7c;
  --border: #eaecef;
  --bg: #fff;
  --text: #2c3e50;
}

button {
  padding: 10px 18px;
  margin: 0px 12px;
  border: none;
  border-radius: 4px;
}

button:hover {
  cursor: pointer;
}

button.primary {
  background-color: #3eaf7c !important;
  color: white;
}

button.secondary a {
  background-color: var(--bg);
  color: var(--text);
}

button.border {
  border: 2px solid var(--border);
}

.event-buttons:not(:first-of-type) {
  margin-left: 10px !important;
}

.event-buttons.margin {
  margin-left: 10px;
}

.home-hero {
  height: calc(100vh - 3.6rem);
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

.home-events {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.hero-actions {
  display: inline-block;
  margin-bottom: 24px;
}

.hero-actions button {
  margin-left: 0px;
  margin-right: 24px;
}

.event {
  padding-top: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
}

.event-text div {
  margin-left: 10vw;
  max-width: 500px;
  padding-right: 5vw;
}

.event-text button {
  margin-left: 10vw;
}

.event-image {
  display: flex;
  flex-direction: row;
  width: 50%;
  padding-left: 15px;
  padding-right: 5vw;
}

.event-image img {
  max-width: 600px !important;
}

.event-text h1 {
  text-transform: uppercase;
  font-size: 30px;
  margin-left: 10vw;
  margin-bottom: 24px;
}

.event-text h1 span {
  color: var(--accent);
  font-size: 26px;
}

.home-footer-links {
  display: flex;
  justify-content: center;
  align-items: center;
}

.home-footer-links a {
  margin: 15px;
}

.home-footer img {
  max-width: 40px;
  margin: 0px 20px;
}

.home-footer p {
  text-align: center;
}

@media screen and (max-width: 600px) {
  .event-image {
    padding-left: 5vw;
  }
  .event-image img {
    max-width: 90vw !important;
  }
  .home-hero h1 {
    font-size: 48px;
    line-height: 60px;
  }
  .home-footer-links {
    flex-wrap: wrap;
  }
}

@media screen and (max-width: 1000px) {
  .event-image {
    width: 90vw;
    align-items: center;
    justify-content: center;
  }
}

@media screen and (max-width: 1215px) {
  .event {
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>