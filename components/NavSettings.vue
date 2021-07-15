<template>
  <div>
    <div
      class="nav-settings"
      @click="toggleSettings()"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        focusable="false"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 36 36"
        fill="var(--c-text)"
      >
        <path
          class="clr-i-outline clr-i-outline-path-1"
          d="M18.1 11c-3.9 0-7 3.1-7 7s3.1 7 7 7s7-3.1 7-7s-3.1-7-7-7zm0 12c-2.8 0-5-2.2-5-5s2.2-5 5-5s5 2.2 5 5s-2.2 5-5 5z"
        />
        <path
          class="clr-i-outline clr-i-outline-path-2"
          d="M32.8 14.7l-2.8-.9l-.6-1.5l1.4-2.6c.3-.6.2-1.4-.3-1.9l-2.4-2.4c-.5-.5-1.3-.6-1.9-.3l-2.6 1.4l-1.5-.6l-.9-2.8C21 2.5 20.4 2 19.7 2h-3.4c-.7 0-1.3.5-1.4 1.2L14 6c-.6.1-1.1.3-1.6.6L9.8 5.2c-.6-.3-1.4-.2-1.9.3L5.5 7.9c-.5.5-.6 1.3-.3 1.9l1.3 2.5c-.2.5-.4 1.1-.6 1.6l-2.8.9c-.6.2-1.1.8-1.1 1.5v3.4c0 .7.5 1.3 1.2 1.5l2.8.9l.6 1.5l-1.4 2.6c-.3.6-.2 1.4.3 1.9l2.4 2.4c.5.5 1.3.6 1.9.3l2.6-1.4l1.5.6l.9 2.9c.2.6.8 1.1 1.5 1.1h3.4c.7 0 1.3-.5 1.5-1.1l.9-2.9l1.5-.6l2.6 1.4c.6.3 1.4.2 1.9-.3l2.4-2.4c.5-.5.6-1.3.3-1.9l-1.4-2.6l.6-1.5l2.9-.9c.6-.2 1.1-.8 1.1-1.5v-3.4c0-.7-.5-1.4-1.2-1.6zm-.8 4.7l-3.6 1.1l-.1.5l-.9 2.1l-.3.5l1.8 3.3l-2 2l-3.3-1.8l-.5.3c-.7.4-1.4.7-2.1.9l-.5.1l-1.1 3.6h-2.8l-1.1-3.6l-.5-.1l-2.1-.9l-.5-.3l-3.3 1.8l-2-2l1.8-3.3l-.3-.5c-.4-.7-.7-1.4-.9-2.1l-.1-.5L4 19.4v-2.8l3.4-1l.2-.5c.2-.8.5-1.5.9-2.2l.3-.5l-1.7-3.3l2-2l3.2 1.8l.5-.3c.7-.4 1.4-.7 2.2-.9l.5-.2L16.6 4h2.8l1.1 3.5l.5.2c.7.2 1.4.5 2.1.9l.5.3l3.3-1.8l2 2l-1.8 3.3l.3.5c.4.7.7 1.4.9 2.1l.1.5l3.6 1.1v2.8z"
        />
      </svg>
    </div>

    <div
      v-if="showSettings"
      class="settings-modal"
    >
      <div class="modal-column" v-if="modals.length > 1">
        <p
          v-for="(modal, i) in modals"
          :key="i"
          class="modal-title"
          :class="{ active: activeModal === modal.title.toLowerCase() }"
          @click="showModal(modal.title.toLowerCase())"
        >
          {{ modal.title }}
        </p>
      </div>

      <hr>

      <div
        v-for="(modal, i) in modals"
        :key="i"
      >
        <div v-if="activeModal === modal.title.toLowerCase()">
          <div
            v-for="(option, j) in modal.options"
            :key="j"
            class="modal-row"
          >
            <p>{{ option.text }}</p>
            <input v-if="!option.type || option.type === 'checkbox'"
              id=""
              type="checkbox"
              :checked="getItem(option.id, 'boolean')"
              @click="setItem(option.id, !getItem(option.id, 'boolean'))"
              name=""
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { themeEvents } from '@theme/layouts/Layout.vue'

import { modals } from '@theme/util/settings.js'
import { getBooleanValue } from '@theme/util/index.js'

export default {
  data() {
    return {
      showSettings: false,
      activeModal: null,
      modals,
    }
  },

  mounted () {
    this.activeModal = this.modals[0].title.toLowerCase()
    this.storage = Object.entries(localStorage)
  },

  watch: {
    storage: function () {
      const items = Object.entries(localStorage)

      return items
    }
  },

  methods: {
    toggleSettings() {
      this.showSettings = !this.showSettings
    },

    showModal(id) {
      this.activeModal = id
    },

    getItem (id, type) {
      const items = this.storage

      if (items.some(x => x[0] === id)) {
        const value = items.find(x => x[0] === id)[1]
        if (typeof value === 'boolean') return value
        if (typeof value === 'string') {
          return type === 'boolean' ? getBooleanValue(value) : value
        }
      } else {
        if (type === 'boolean') return false
        return null
      }
    },

    setItem (id, value) {
      if (this.storage.some(x => x[0] === id)) {
        this.storage.find(x => x[0] === id)[1] = value
      }

      localStorage.setItem(id, value)
      
      themeEvents.$emit('setting-change', JSON.stringify({id, value}))
    }
  }
}
</script>

<style scoped>
.nav-settings {
  width: 30px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 6px;
}

svg {
  width: 20px;
}

input {
  margin: 6px;
}

.settings-modal {
  position: fixed;
  transform: translateX(-50%);
  background-color: var(--c-bg);
  border: 1px solid var(--c-border);
  padding: 4px 12px;
  margin-top: 12px;
  border-radius: 4px;
  min-width: 200px;
}

.modal-row {
  max-height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-row p {
  padding-right: 6px;
}

.modal-column {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.modal-title {
  margin: 4px 10px;
}

.modal-title:hover {
  cursor: pointer;
}

.modal-title.active {
  color: var(--c-brand);
}
</style>