<template>
  <layout-sidebar-navbar>
    <template #content>
      <div class="bg-grey1 tw-h-full base-padding">
        <div class="base-margin tw-flex tw-flex-row tw-items-center">
          <Icon class="semibold24 icon blue10" icon="heroicons-outline:document-report"/>
          <span class="semibold24 blue10 tw-pl-1">Report</span>
        </div>
      </div>
    </template>
  </layout-sidebar-navbar>
</template>

<script>
import { Icon } from '@iconify/vue2'
import LayoutSidebarNavbar from '@/layouts/LayoutSidebarNavbar'
export default {
  name: 'Report.vue',
  components: {
    LayoutSidebarNavbar,
    Icon
  }
}
</script>

<style scoped>

</style>
