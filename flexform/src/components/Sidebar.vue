<template>
  <div :class="{'sidebar-open-expand':stateSidebarExpand,'sidebar-close-expand':!stateSidebarExpand}">
    <img class="logo" v-if="stateSidebarExpand" src="../assets/logo/FlexForm-long-dark-logo.png" alt="FlexForm">
    <img class="logo" v-if="!stateSidebarExpand" src="../assets/logo/FlexForm-medium-dark-logo.png" alt="FlexForm">
    <ul class="tw-w-full">
      <li class="tw-w-full">
        <div class="button tw-flex tw-flex-row tw-items-center medium18" @click="doSidebarExpand(stateSidebarExpand)">
          <Icon class="icon tw-ml-2 tw-mr-2 semibold24 tw-my-1" icon="heroicons-outline:menu"/>
          <span class="tw-mt-1" v-if="stateSidebarExpand">Menu</span>
        </div>
      </li>
      <li class="tw-w-full">
        <div class="button tw-flex tw-items-center medium18" @click="selectMenu('/dashboard')">
          <Icon class="icon tw-ml-2 tw-mr-2 semibold24 tw-my-1" icon="heroicons-outline:home"/>
          <span class="tw-mt-1" v-if="stateSidebarExpand">Dashboard</span>
        </div>
      </li>
      <li class="tw-w-full">
        <div class="button tw-flex tw-items-center medium18" @click="selectMenu('/form')">
          <Icon class="icon tw-ml-2 tw-mr-2 semibold24 tw-my-1" icon="heroicons-outline:folder"/>
          <span class="tw-mt-1" v-if="stateSidebarExpand">Form</span>
        </div>
      </li>
      <li class="tw-w-full">
        <div class="button tw-flex tw-items-center medium18" @click="selectMenu('/report')">
          <Icon class="icon tw-ml-2 tw-mr-2 semibold24 tw-my-1" icon="heroicons-outline:document-report"/>
          <span class="tw-mt-1" v-if="stateSidebarExpand">Report</span>
        </div>
      </li>
    </ul>
    <ul class="tw-w-full tw-h-full tw-flex tw-items-end">
      <li class="tw-w-full">
        <div class="button tw-flex tw-items-center medium18">
          <Icon class="icon tw-ml-2 tw-mr-2 semibold24" icon="heroicons-outline:user"/>
          <span class="tw-mt-1" v-if="stateSidebarExpand">Account</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue2'
export default {
  name: 'Sidebar',
  components: {
    Icon
  },
  emits: ['path','emitStateSidebarExpand'],
  props: {
    propstateSidebarExpand: Boolean
  },
  data () {
    return {
      stateSidebarExpand: false,
      showSidebar: true
    }
  },
  methods: {
    selectMenu (path) {
      this.$emit('path', path)
    },
    doSidebarExpand (state) {
      this.stateSidebarExpand = this.stateSidebarExpand !== true
      this.$emit('emitStateSidebarExpand',state)
      console.log(this.propstateSidebarExpand)
      /*if(this.propstateSidebarExpand === true){
        this.stateSidebarExpand = false
        this.$emit('emitStateSidebarExpand',false)
      }else{
        this.stateSidebarExpand = true
        this.$emit('emitStateSidebarExpand',true)
      }*/
    }
  }
}
</script>

<style scoped>
.sidebar-open-expand {
  width: 256px;
  position: fixed;
  left: 0;
  overflow: auto;
  background-color: #003E6B;
  height: 100%;
  border-radius: 0 12px 12px 0;
  padding: 0.75rem ;
  box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all .1s ease-in;
}
.sidebar-close-expand {
  width: 95px;
  position: fixed;
  left: 0;
  overflow: auto;
  background-color: #003E6B;
  height: 100%;
  border-radius: 0 12px 12px 0;
  padding: 0.75rem ;
  box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all .1s ease-in;
}
.logo{
  height: 56px;
}
.button{
  color: white;
  padding: 0.75rem 1rem;
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
</style>
