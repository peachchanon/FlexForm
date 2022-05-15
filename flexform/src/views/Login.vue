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
          @callBackString="inputUsername"
        >
        </base-text-input>
        <span class="tw-py-3">Password</span>
        <base-text-input
          type="password"
          placeholder="Enter Password"
          @callBackString="inputPassword"
        >
        </base-text-input>
        <div class="tw-my-5" v-if="!stateCheckAccount">
          <span class="red5 medium16">* The username or password is incorrect.</span>
        </div>
        <!--
        <div class="tw-py-3 tw-text-right">
          <a @click="selectPath('buttonForgotPassword')">Forgot password?</a>
        </div>
        -->
        <base-button
            class="tw-mt-3"
            buttonID="buttonLogin"
            buttonText="Login"
            buttonTextColor="white"
            buttonBgColor="bg-blue5"
            :callback="login"
        ></base-button>
        
<!--        <base-button -->
<!--            class="tw-pt-3"-->
<!--          buttonID="buttonCreateAnAccount"-->
<!--          buttonText="Create an Account"-->
<!--          buttonTextColor="blue5"-->
<!--          buttonBgColor="bg-white"-->
<!--          buttonBorderColor="border-blue5"-->
<!--          :callback="selectPath"-->
<!--        ></base-button>-->
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
import axios from 'axios' 
export default {
  name: 'login',
  components: {
    BaseTextInput,
    baseButton
  },
  data () {
    return {
      showBanner: true,
      dataLogin :{
        username:'',
        password:''
      },
      stateCheckAccount: true,
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
    selectPath (nameButton) {
      if(nameButton === 'buttonCreateAnAccount') {
        this.$router.push('/create-an-account')
      }else if(nameButton === 'buttonForgotPassword'){
        this.$router.push('/forgot-password')
      }//else if(nameButton === 'buttonLogin'){
       // this.$router.push('/dashboard')
      //}
    },
    inputUsername(username){
      this.dataLogin.username = username
    },
    inputPassword(password){
      this.dataLogin.password = password
    },
    async login(){
      //console.log(dataLogin)
      try {
        const response = await axios.post('http://localhost:4000/api/User/Authenticate', {
          username :this.dataLogin.username,
          password: this.dataLogin.password
        })
        console.log(response.data.username)
        if(response.status===200 && response.data) {
          this.stateCheckAccount = true
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('role_id', response.data.role_id)
          localStorage.setItem('username', response.data.username)
          localStorage.setItem('name_lastname', response.data.first_name + " " + response.data.last_name)
          this.$router.push('/dashboard')
          this.stateCheckAccount = true
        }
      } catch(error){
        //console.log(error)
        this.stateCheckAccount = false
      }
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
  cursor: pointer;
}
</style>
