<template>
  <div class="bg-blue10 tw-h-full tw-flex tw-items-center tw-justify-center">
    <div v-if="showBanner" class="layout-banner-login bg-blue10">
      <span class="white semibold24">Welcome to FlexForm</span>
    </div>
    <div class="layout-login bg-white">
      <div class="card tw-p-3 tw-flex tw-flex-col">
        <div class="tw-block tw-flex tw-justify-center">
          <img src="../assets/logo/FlexForm-long-color-logo.png" alt="FlexForm logo" class="tw-max-w-xs"/>
        </div>
        <span class="tw-py-3">Username</span>
        <base-text-input
          type="text"
          placeholder="Enter Username"
        >
        </base-text-input>
        <span class="tw-py-3">Password</span>
        <base-text-input
          type="password"
          placeholder="Enter Password"
        >
        </base-text-input>
        <div class="tw-py-3 tw-text-right">
          <a href="#">Forgot password?</a>
        </div>
        <base-button
          buttonID="buttonCreateAnAccount"
          buttonText="Create an Account"
          buttonTextColor="blue5"
          buttonBgColor="bg-white"
          buttonBorderColor="border-blue5"
          :callback="showHello"
        ></base-button>
        <base-button
          class="tw-pt-3"
          buttonID="buttonLogin"
          buttonText="Login"
          buttonTextColor="white"
          buttonBgColor="bg-blue5"
          :callback="showHello"
        ></base-button>
        <span class="tw-pt-3 light16 grey5 tw-text-center">
          Copyright © 2021 Freya
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BaseTextInput from '@/components/BaseTextInput'
import baseButton from '@/components/BaseButton'
export default {
  name: 'login',
  components: {
    BaseTextInput,
    baseButton
  },
  data () {
    return {
      showBanner: true
    }
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
    showHello () {
      console.log('Hello')
    }
  }
}
</script>

<style scoped>

@media only screen and (max-width: 767px){
  .layout-login{
    padding: 1rem;
    min-width: 375px;
    border-radius: 12px;
  }
  .layout-banner-login{
    visibility: hidden;
  }
}
@media only screen and (min-width: 768px) {
  .layout-login{
    padding: 1.5rem;
    min-width: 440px;
    border-radius: 12px;
  }
  .layout-banner-login{
    visibility: hidden;
  }
}
@media only screen and (min-width: 1440px) {
  .layout-login{
    padding: 5rem;
    width: 35%;
    height: 100%;
    border-radius: 0px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .card{
    width: 100%;
  }
  .layout-banner-login{
    width: 65%;
    height: 100%;
    visibility: visible;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
}
a{
  color: #102A43;
  transition: all .1s ease-in;
}
a:hover{
  color: #4098D7;
  text-decoration: underline;
}
</style>
