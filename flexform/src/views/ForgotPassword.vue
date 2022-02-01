<template>
  <div class="bg-blue10 tw-h-full tw-flex tw-items-center tw-justify-center">
    <!-- Modal Forgot your password -->
    <div class="bg-white base-padding base-shadow radius12px md:tw-mt-10 md:tw-mb-10 theme-modal">
      <!-- Header -->
      <div class="tw-flex tw-flex-col tw-items-start base-padding tw-relative">
        <div class="button-back tw-flex tw-flex-col tw-items-center medium16 tw-absolute tw-top-1 tw-left-0" @click="doPath('/')">
          <Icon class="icon semibold24" icon="heroicons-outline:chevron-left"/>
        </div>
        <span class="tw-ml-12 semibold24 grey10">Forgot your password</span>
      </div>
      <!-- Detail -->
      <div class="base-padding">
        <div>
          <span class="medium16 grey10">Forget your password? Please enter your username or email address. You will receive a link to create a new password via email.</span>
        </div>
        <div class="tw-mt-5 tw-mb-5">
          <span class="medium16 grey10">Email</span>
          <div class="tw-w-full">
            <base-text-input
                type="email"
                placeholder="Enter email"
                @callBackString="inputEmail"
            ></base-text-input>
          </div>
        </div>
        <div>
          <base-button
              buttonID="buttonSendEmail"
              buttonText="Send email"
              buttonTextColor="white"
              buttonBgColor="bg-blue5"
              :callback="doButton"
          >
          </base-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue2'
import BaseTextInput from '@/components/BaseTextInput'
import BaseButton from "@/components/BaseButton";
export default {
  name: "ForgotPassword",
  components: {
    Icon,
    BaseButton,
    BaseTextInput,
  },
  data() {
    return {
      emailValue: 'Hi'
    }
  },
  methods: {
    doPath(path) {
      this.$router.push(path).catch(()=>{})
    },
    inputEmail(email){
      console.log(email)
      this.emailValue = email
    },
    doButton(buttonName){
      if(buttonName === 'buttonSendEmail') {
        console.log(this.emailValue)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.button-back{
  color: #102A43;
  padding: 0.75rem;
  transition: all .1s ease-in;
  border-radius: 12px;
  margin: 0.25rem 0;
  cursor: pointer;
  &:hover{
    color: #4098D7;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
  }
}
.theme-modal{
  max-width: 560px;
}
</style>