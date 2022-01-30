<template>
  <layout-sidebar-navbar>
    <template #content>
      <div class="bg-grey1 tw-h-full sm:tw-p-5">
        <div class="base-margin tw-flex tw-flex-row tw-items-center">
          <Icon class="semibold24 icon blue10" icon="heroicons-outline:folder"/>
          <span class="semibold24 blue10 tw-pl-1">Form</span>
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
          <div v-if="namePage==='All Ticket'" class="base-padding">
            All Ticket Page
          </div>
          <!-- My Ticket-->
          <div v-if="namePage==='My Ticket'" class="base-padding">
            My Ticket Page
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
  name: 'Form.vue',
  components: {
    LayoutSidebarNavbar,
    baseHorizontalNavigation,
    Icon
  },
  data() {
    return {
      horizontalNavigationID: [{field:'All Ticket'},{field:'My Ticket'},{field:'Shared with me'}],
      namePage: 'All Ticket'
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
