<template>
<layout-sidebar-navbar-vue>
  <template #content>
    <div class="bg-grey1 tw-h-full">
      <div class="base-margin tw-flex tw-flex-row tw-items-center">
        <base-button-back
            :callback="PreviousPage"></base-button-back>
        <Icon class="semibold24 icon blue10" icon="heroicons-outline:chart-pie"/>
        <span class="semibold24 blue10 tw-pl-1">Data Visualization</span>
      </div>
    </div>
    <div class="box bg-white tw-h-full">
      <span>Search</span>
    </div>
  </template>
</layout-sidebar-navbar-vue>
</template>

<script>
import LayoutSidebarNavbarVue from "@/layouts/LayoutSidebarNavbar";
import BaseButtonBack from "@/components/BaseButtonBack";
import { Icon } from '@iconify/vue2'
import {mapActions, mapGetters} from "vuex";
export default {
  name: "DataVisualization.vue",
  components: {
    LayoutSidebarNavbarVue,
    Icon,
    BaseButtonBack
  },
  watch: {
    windowResize () {
      this.showBanner = window.innerWidth >= 1440
    }
  },
  computed: {
    ...mapGetters(['windowResize'])
  },
  async mounted () {
    window.onresize = () => {
      this.flapWindowResize()
    }
    this.showBanner = window.innerWidth >= 1440
  },
  methods: {
    ...mapActions(['flapWindowResize']),
    PreviousPage(){
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>