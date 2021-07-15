<template>
  <div class="update-box">
    <div class="page-update">
      <div class="update-content">
        <h1>{{ state.title }}</h1>
        <p>{{ state.description }}</p>
      </div>
      <div class="update-actions">
        <button :style="{ 'background-color': state.button.color }">
          {{ state.button.text }}
        </button>
        <button>Manage pages</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      watching: {
        title: 'You are currently watching this page',
        description: 'You are receiving notifications when this page updates',
        button: {
          text: 'Unsubscribe',
          color: '#fff'
        }
      },
      notWatching: {
        title: 'You are not watching this page',
        description: 'Watch this page to receive notifications when changes are made',
        button: {
          text: 'Watch',
          color: '#3eaf7c'
        }
      }
    }
  },

  computed: {
    state: function () {
      const viewingState = localStorage.getItem(`${this.$page.path}|viewing`)

      return viewingState ? this[viewingState] : this.notWatching
    }
  }
}
</script>

<style scoped>
.update-box {
    margin-top: 1rem;
    max-width: 740px;
    background-color: var(--c-bg-lighter);
    border-radius: 2px;
    margin: 0 auto;
}
.page-update {
    padding: 1rem 2.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.update-content h1 {
    font-size: 24px;
}

.update-actions {
    display: inherit;
    flex-direction: column;
    padding: 1rem;
}

.update-actions button {
    padding: 6px 12px;
    margin: 6px 0px;
    border: 2px solid var(--c-border);
    border-radius: 2px;
}
</style>