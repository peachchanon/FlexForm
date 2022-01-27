<template>
  <div class="navbar">
    <div class="">
      <div v-if="!showContent" class="button tw-flex tw-flex-row tw-items-center medium18" style="width: fit-content" @click="doSidebarExpand">
        <Icon class="icon semibold24" icon="heroicons-outline:menu"/>
      </div>
    </div>
    <img v-if="!showContent" class="logo" src="../assets/logo/FlexForm-medium-color-logo.png" alt="FlexForm">
    <div class="tw-flex tw-flex-row">
      <div class="tw-relative tw-inline-block">
        <div class="button tw-flex tw-flex-row tw-items-center medium18" style="width: fit-content" @click="doShowNotifications">
          <Icon class="icon semibold24" icon="heroicons-outline:bell"/>
        </div>
        <div class="notification-content" v-if="showNotifications">
          <div class="tw-flex tw-flex-row tw-justify-between">
            <div class="tw-flex tw-flex-row tw-items-center">
              <Icon class="medium16 icon blue10" icon="heroicons-outline:bell"/>
              <span class="medium16 blue10 tw-m-2">Notifications</span>
            </div>
            <div class="tw-flex tw-flex-row tw-items-center">
              <span class="text-blue-button">Clear all</span>
            </div>
          </div>
        </div>
      </div>
      <div class="tw-relative tw-inline-block">
        <div class="button tw-flex tw-flex-row tw-items-center medium16 tw-flex tw-flex-row tw-items-center" style="width: fit-content" @click="doShowProfile">
          <span v-if="showContent" class="tw-mr-2">Chanon Panarong</span>
          <Icon class="icon semibold24" icon="heroicons-outline:user-circle"/>
        </div>
        <div class="profile-content" v-if="showProfile">
          <div class="tw-flex tw-flex-row tw-items-center tw-mb-2">
            <div class="tw-mr-1.5">
              <Icon class="icon blue10" style="font-size: 3rem" icon="heroicons-outline:user-circle"/>
            </div>
            <div class="tw-flex tw-flex-col tw-content-start">
              <div class="medium18 blue10">Chanon Panarong</div>
              <div class="medium16 grey7">ID : 61070501014</div>
            </div>
          </div>
          <div class="button tw-flex tw-flex-row tw-items-center medium16" @click="doShowNotifications">
            <Icon class="icon semibold24" icon="heroicons-outline:eye"/>
            <span class="tw-mt-0.5 tw-ml-3">View More</span>
          </div>
          <div class="button tw-flex tw-flex-row tw-items-center medium16" @click="doShowNotifications">
            <Icon class="icon semibold24" icon="heroicons-outline:cog"/>
            <span class="tw-mt-0.5 tw-ml-3">Setting</span>
          </div>
          <div class="button tw-flex tw-flex-row tw-items-center medium16" @click="doShowNotifications">
            <Icon class="icon semibold24" icon="heroicons-outline:logout"/>
            <span class="tw-mt-0.5 tw-ml-3">Logout</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { Icon } from '@iconify/vue2'
export default {
  name: 'Navbar.vue',
  components: {
    Icon
  },
  emits: ['emitStateSidebarExpand'],
  props: {
    propstateSidebarExpand: Boolean
  },
  data () {
    return {
      showNotifications: false,
      showProfile: false,
      showContent: true
    }
  },
  watch: {
    windowResize () {
      this.showContent = window.innerWidth >= 768
    }
  },
  computed: {
    ...mapGetters(['windowResize'])
  },
  async mounted () {
    window.onresize = () => {
      this.flapWindowResize()
    }
    this.showContent = window.innerWidth >= 768
  },
  methods: {
    ...mapActions(['flapWindowResize']),
    doShowNotifications () {
      this.showNotifications = this.showNotifications !== true
      if(this.showProfile){
        this.showProfile=false
      }
    },
    doShowProfile () {
      this.showProfile = this.showProfile !== true
      if(this.showNotifications){
        this.showNotifications=false
      }
    },
    /*doSidebarExpand() {
      if(this.propstateSidebarExpand){
        this.$emit('emitStateSidebarExpand',false)
      }else{
        this.$emit('emitStateSidebarExpand',true)
      }
    }*/
    doSidebarExpand(){
      console.log('Active')
    }
  }
}
</script>

<style scoped>
.navbar{
  padding: 0.5rem 1.5rem;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.button{
  color: #102A43;
  padding: 0.75rem;
  transition: all .1s ease-in;
  border-radius: 12px;
  margin: 0.25rem 0;
  cursor: pointer;
}
.button:hover{
  color: #4098D7;
  background-color: white;
  box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.1);
  width: 100%;
}
.logo{
  height: 56px;
}
.notification-content{
  position: absolute;
  top: 60px;
  right: -70px;
  background-color: white;
  min-width: 370px;
  overflow: auto;
  box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.1);
  z-index: 1;
  margin: 0 0 0 1rem;
  padding: 1rem;
  border-radius: 12px;
  transition: all .1s ease-in;
}
.text-blue-button{
  color: #2680C2;
  transition: all .1s ease-in;
  cursor: pointer;
}
.text-blue-button:hover{
  color: #4098D7;
  text-decoration: underline;
  cursor: pointer;
}
.profile-content{
  position: absolute;
  top: 60px;
  right: 4px;
  background-color: white;
  min-width: 320px;
  overflow: auto;
  box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.1);
  z-index: 1;
  margin: 0 0 0 1rem;
  padding: 1rem;
  border-radius: 12px;
  transition: all .1s ease-in;
}
</style>
