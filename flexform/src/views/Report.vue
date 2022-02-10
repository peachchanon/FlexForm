<template>
  <layout-sidebar-navbar>
    <template #content>
      <div class="bg-grey1 tw-h-full sm:tw-p-2">
        <div class="base-margin tw-flex tw-flex-row tw-items-center">
          <Icon class="semibold24 icon blue10" icon="heroicons-outline:document-report"/>
          <span class="semibold24 blue10 tw-pl-1">Report</span>
        </div>
        <div class="box bg-white tw-h-full">
          <div>
            <base-horizontal-navigation
                v-bind:field="horizontalNavigationID"
                @callbackField="doHorizontalNavigation"
            >
            </base-horizontal-navigation>
          </div>
          <!-- All Ticket-->
          <div v-if="namePage==='All Report'" class="base-padding">
            All Report Page
          </div>
          <!-- My Ticket-->
          <div v-if="namePage==='My Report'" class="base-padding">
            My Report Page
          </div>
          <!-- Shared with me -->
          <div v-if="namePage==='Shared with me'" class="base-padding">
            Shared with me Page
          </div>
        </div>
      </div>
    </template>
  </layout-sidebar-navbar>
</template>

<script>
import { Icon } from '@iconify/vue2'
import LayoutSidebarNavbar from '@/layouts/LayoutSidebarNavbar'
import baseHorizontalNavigation from '@/components/BaseHorizontalNavigation';
export default {
  name: 'Report.vue',
  components: {
    LayoutSidebarNavbar,
    baseHorizontalNavigation,
    Icon
  },
  data() {
    return {
      horizontalNavigationID: [{field:'All Report'},{field:'My Report'},{field:'Shared with me'}],
      namePage: 'All Report'
    }
  },
  methods: {
    doHorizontalNavigation(page) {
      this.namePage = page
    }
  }
}
</script>

<style scoped>

</style>
