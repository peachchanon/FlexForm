﻿<template>
  <div class="navbar">
    <div class="tw-flex tw-flex-row">
      <div v-if="!ShowContent" class="button-blue tw-flex tw-flex-row tw-items-center medium18" @click="doSidebarExpand">
        <Icon class="icon semibold24" icon="heroicons-outline:menu"/>
      </div>
    </div>
    <img v-if="!ShowContent" class="logo" src="../assets/logo/FlexForm-medium-color-logo.png" alt="FlexForm">
    <div class="tw-flex tw-flex-row">
      <!--Notifications-->
<!--      <div class="tw-relative tw-inline-block tw-h-full">-->
<!--        <div class="button-blue tw-flex tw-flex-row tw-items-center medium18" @click="doNotifications">-->
<!--          <Icon class="icon semibold24" icon="heroicons-outline:bell"/>-->
<!--        </div>-->
<!--        <div class="notification-content" v-if="ShowNotifications">-->
<!--          <div class="tw-flex tw-flex-row tw-justify-between">-->
<!--            <div class="tw-flex tw-flex-row tw-items-center">-->
<!--              <Icon class="medium16 icon blue10" icon="heroicons-outline:bell"/>-->
<!--              <span class="medium16 blue10 tw-m-2">Notifications</span>-->
<!--            </div>-->
<!--            <div class="tw-flex tw-flex-row tw-items-center">-->
<!--              <span class="text-blue-button">Clear all</span>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
      <!--Profile-->
      <div class="tw-relative tw-inline-block">
        <div class="button-blue tw-flex tw-flex-row tw-items-center medium16 tw-flex tw-flex-row tw-items-center" style="width: fit-content" @click="doProfile">
          <span v-if="ShowContent" class="tw-mr-1">{{ LocalName }}</span>
          <div class="icon-config-white radiusFull tw-p-0.5">
            <Icon class="icon semibold24" icon="heroicons-outline:user-circle"/>
          </div>
        </div>
        <div class="profile-content" v-if="ShowProfile">
          <div class="tw-flex tw-flex-row tw-items-center tw-mb-2">
            <div class="tw-mr-3">
              <Icon class="icon blue10" style="font-size: 3rem" icon="heroicons-outline:user-circle"/>
            </div>
            <div class="tw-flex tw-flex-col tw-content-start">
              <div class="medium18 blue10">{{ LocalName }}</div>
              <div class="light16 grey7">Username : {{DataUser.username}}</div>
            </div>
          </div>
          <div class="button-blue tw-flex tw-flex-row tw-items-center medium16" @click="doProfile('buttonViewMore')">
            <Icon class="icon semibold24" icon="heroicons-outline:eye"/>
            <span class="tw-mt-0.5 tw-ml-3">View More</span>
          </div>
          <!--
          <div class="button-blue tw-flex tw-flex-row tw-items-center medium16" @click="doProfile('buttonViewMore')">
            <Icon class="icon semibold24" icon="heroicons-outline:pencil-alt"/>
            <span class="tw-mt-0.5 tw-ml-3">Edit Profile</span>
          </div>
          -->
          <div class="button-red tw-flex tw-flex-row tw-items-center medium16" @click="doProfile('buttonLogout')">
            <Icon class="icon semibold24" icon="heroicons-outline:logout"/>
            <span class="tw-mt-0.5 tw-ml-3" @click="logout">Logout</span>
          </div>
          <div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { Icon } from '@iconify/vue2'
import axios from "axios";
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
      ShowNotifications: false,
      ShowProfile: false,
      ShowContent: true,
      SelectUserId: '',
      DataUser: {},
      LocalName: ''
    }
  },
  watch: {
    windowResize () {
      this.ShowContent = window.innerWidth >= 768
    }
  },
  computed: {
    ...mapGetters(['windowResize'])
  },
  async mounted () {
    window.onresize = () => {
      this.flapWindowResize()
    }
    this.ShowContent = window.innerWidth >= 768
    this.LocalUsername = localStorage.getItem('username')
    this.LocalName = localStorage.getItem('name_lastname')
    await axios.get('http://localhost:4000/api/User/'+this.LocalUsername)
        .then(response => {
          if(response.status === 200 && response.data) {
            console.log(response.status)
            console.log(response.data)
            this.DataUser = response.data
          }
        })
        .catch(error => {
          console.log(error)
        })
  },
  methods: {
    ...mapActions(['flapWindowResize']),
    doNotifications () {
      this.ShowNotifications = this.ShowNotifications !== true
      if(this.ShowProfile){
        this.ShowProfile=false
      }
    },
    doProfile (buttonName) {
      if(buttonName==='buttonLogout'){
        this.$router.push('/').catch(()=>{})
      } else if (buttonName==='buttonViewMore') {
        this.$router.push('/profile').catch(()=>{})
        
      }
      this.ShowProfile = this.ShowProfile !== true
      if(this.ShowNotifications){
        this.ShowNotifications=false
      }
    },
    doSidebarExpand(){
      this.$emit('emitStateSidebarExpand',true)
    },
    logout(){
      localStorage.clear();
      this.$router.replace('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar{
  padding: 0.3rem 1.5rem;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.button-blue{
  color: #102A43;
  padding: 0.6rem;
  transition: all .1s ease-in;
  border-radius: 12px;
  margin: 0.25rem 0;
  cursor: pointer;
}
.button-blue:hover{
  color: #4098D7;
  background-color: white;
  box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.1);
  width: 100%;
}
.button-red{
  color: #D64545;
  padding: 0.6rem;
  transition: all .1s ease-in;
  border-radius: 12px;
  margin: 0.25rem 0;
  cursor: pointer;
}
.button-red:hover{
  color: #E66A6A;
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
  padding: 0.75rem;
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
  padding: 0.75rem;
  border-radius: 12px;
  transition: all .1s ease-in;
}
</style>
