<template>
  <div>
    <div
      class="nav-settings"
      @click="toggleSettings()"
    >
      <span class="iconify" data-icon="fa-solid:sliders-h" data-width="19"></span>
    </div>

    <div
      v-if="showSettings"
      class="settings-modal"
    >

      <div
        v-for="(option, j) in settings"
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

        <hr>

      <div class="modal-column" v-if="modals.length > 1">
        <p
          v-for="(modal, i) in modals"
          :key="i"
          class="modal-title"
          style="display: flex; align-items:center;"
        >
        <span class="iconify" :data-icon="'fa-solid:' + modal.icon" v-if="modal.icon"></span>
          {{ modal.name }}
        </p>
      </div>
    </div>

  </div>
</template>

<script>
import { themeEvents } from '@theme/layouts/Layout.vue'

import { options, settings } from '@theme/util/settings.js'
import { getBooleanValue } from '@theme/util/index.js'

export default {
  data() {
    return {
      showSettings: false,
      modals: options,
      settings
    }
  },

  mounted () {
    // this.activeModal = this.modals[0].name.toLowerCase()
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
  width: 19px !important;
  padding-right: 8px;
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
  flex-direction: column;
  justify-content: space-evenly;
}

.modal-title {
  margin: 2px 1px;
  padding: 3px 0px;
}

.modal-title:hover {
  background-color: var(--c-bg-lighter);
}

.modal-title:hover {
  cursor: pointer;
}

.modal-title.active {
  color: var(--c-brand);
}
</style>