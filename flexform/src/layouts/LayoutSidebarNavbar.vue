<template>
  <div class="tw-flex tw-flex-row tw-w-full">
    <div v-show="showSidebar">
      <sidebar
          @path="selectMenu"
          :propstateSidebarExpand="stateSidebar"
          @emitStateSidebarExpand="doSidebarExpandForSidebar"
      ></sidebar>
    </div>
    <div class="tw-w-full" :class="{'navbar-open-sidebar':showSidebar,'navbar-close-sidebar':!showSidebar}">
      <navbar
        :propstateSidebarExpand="stateSidebar"
        @emitStateSidebarExpand="doSidebarExpandForNavbar"
      ></navbar>
      <div class="main-content">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'
export default {
  name: 'LayoutSidebarNavbarVue',
  components: {
    Sidebar,
    Navbar
  },
  data () {
    return {
      stateSidebar: false,
      showSidebar: true
    }
  },
  watch: {
    windowResize () {
      this.showSidebar = window.innerWidth >= 768
    }
  },
  computed: {
    ...mapGetters(['windowResize'])
  },
  async mounted () {
    window.onresize = () => {
      this.flapWindowResize()
    }
    this.showSidebar = window.innerWidth >= 768
  },
  methods: {
    ...mapActions(['flapWindowResize']),
    selectMenu (path) {
      this.$router.push(path).catch(()=>{})
    },
    doSidebarExpandForSidebar (state) {
      this.stateSidebar = state
    },
    doSidebarExpandForNavbar (){
      this.showSidebar = !this.showSidebar;
    }
  }
}
</script>

<style scoped>
.navbar-expand-sidebar{
  margin: 0 0 0 256px;
  transition: all .1s ease-in;
}
.navbar-open-sidebar{
  margin: 0 0 0 90px;
  transition: all .1s ease-in;
}
.navbar-close-sidebar{
  margin: 0 0 0 0px;
  transition: all .1s ease-in;
}
.main-content{

}
</style>
