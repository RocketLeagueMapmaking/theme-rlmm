<template>
  <div>
    <ParentLayout>
      <!-- Layout slots -->
      <template #page-top>
        <slot name="page-header" />
      </template>

      <template #page-bottom>
        <slot name="page-footer" />
      </template>

      <template #sidebar-bottom>
        <slot name="sidebar-bottom" />
      </template>
    </ParentLayout>
  </div>
</template>

<script>
import ParentLayout from "@parent-theme/layouts/Layout.vue";

export default {
  components: {
    ParentLayout,
  },
};
</script>