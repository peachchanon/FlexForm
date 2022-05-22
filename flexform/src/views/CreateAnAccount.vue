<template>
  <div class="bg-blue10 tw-h-full tw-flex tw-items-top tw-justify-center" style="height: fit-content">
    <div class="bg-white base-padding base-shadow radius12px md:tw-mt-10 md:tw-mb-10" style="height: fit-content">
      <!-- Create An Account Header -->
      <div class="tw-flex tw-flex-col tw-items-center base-padding tw-relative">
        <div class="button-back tw-flex tw-flex-col tw-items-center medium16 tw-absolute tw-top-1 tw-left-1.5" style="width: fit-content" @click="doPath('/')">
          <Icon class="icon semibold24" icon="heroicons-outline:chevron-left"/>
        </div>
        <span class="semibold24 grey10">Create An Account</span>
      </div>
      <!-- Create An Account Form-->
      <div class="base-padding">
        <div class="tw-flex tw-flex-col tw-items-start">
          <span class="grey10 medium16 tw-my-3 tw-ml-1">Username</span>
          <div class="tw-w-full">
            <base-text-input
                type="text"
                placeholder="Enter username"
                @callBackString="inputUsername"
            ></base-text-input>
          </div>
          <div class="tw-w-full tw-flex tw-flex-col tw-items-start" v-if="!stateProfile.username">
            <span class="red5 medium14 tw-my-2" >* Enter username</span>
          </div>
        </div>
        <div class="tw-flex tw-justify-between tw-w-full">
          <div class="tw-flex tw-flex-col tw-items-start sm:tw-w-1/2 sm:tw-mr-1" style="width: 100%">
            <span class="grey10 medium16 tw-my-3 tw-ml-1">Password</span>
            <div class="tw-w-full">
              <base-text-input
                  type="password"
                  placeholder="Enter password"
                  @callBackString="inputPassword"
              ></base-text-input>
            </div>
            <div class="tw-w-full tw-flex tw-flex-col tw-items-start" v-if="!stateProfile.password">
              <span class="red5 medium14 tw-my-2" >* Enter password</span>
            </div>
          </div>
          <div class="tw-flex tw-flex-col tw-items-start sm:tw-w-1/2 sm:tw-ml-1" style="width: 100%">
            <span class="grey10 medium16 tw-my-3 tw-ml-1">Confirm Password</span>
            <div class="tw-w-full">
              <base-text-input
                  type="password"
                  placeholder="Confirm password"
                  @callBackString="inputConfirmPassword"
              ></base-text-input>
            </div>
            <div class="tw-w-full tw-flex tw-flex-col tw-items-start" v-if="!stateProfile.confirmPassword && stateProfile.confirmPasswordHaveValue">
              <span class="red5 medium14 tw-my-2" >* Password did't match</span>
            </div>
            <div class="tw-w-full tw-flex tw-flex-col tw-items-start" v-if="stateProfile.confirmPassword && stateProfile.confirmPasswordHaveValue">
              <div class="tw-flex tw-flex-row tw-items-center">
                <Icon class="icon green5 medium14 tw-my-2 tw-mr-2" icon="heroicons-outline:check"/>
                <span class="green5 medium14 tw-my-2" >Password did match</span>
              </div>
            </div>
          </div>
        </div>
        <div class="tw-flex tw-justify-between tw-w-full">
          <div class="tw-flex tw-flex-col tw-items-start sm:tw-w-1/2 sm:tw-mr-1">
            <span class="grey10 medium16 tw-my-3 tw-ml-1">First Name</span>
            <div class="tw-w-full tw-flex tw-flex-row">
              <div class="tw-w-full tw-flex tw-flex-col">
                <div class="tw-w-full sm:tw-mr-1">
                  <base-dropdown
                      placeholder="Title"
                      v-bind:optionsList="[{option:'Mr.'},{option:'Ms.'}]"
                      @valueSelected="inputTitle"
                      class="tw-w-full"
                  ></base-dropdown>
                </div>
                <div class="tw-w-full tw-flex tw-flex-col tw-items-start" v-if="!stateProfile.title">
                  <span class="red5 medium14 tw-my-2" >* Select Title</span>
                </div>
              </div>
              <div class="tw-w-full sm:tw-ml-1" style="width: 100%">
                <base-text-input
                    type="text"
                    placeholder="Enter first name"
                    @callBackString="inputFirstName"
                    class="tw-w-full"
                ></base-text-input>
                <div class="tw-w-full tw-flex tw-flex-col tw-items-start" v-if="!stateProfile.first_name">
                  <span class="red5 medium14 tw-my-2" >* Enter First Name</span>
                </div>
              </div>
            </div>
          </div>
          <div class="tw-flex tw-flex-col tw-items-start sm:tw-w-1/2 sm:tw-ml-1">
            <span class="grey10 medium16 tw-my-3 tw-ml-1">Last Name</span>
            <div class="tw-w-full">
              <base-text-input
                  type="text"
                  placeholder="Enter last name"
                  @callBackString="inputLastName"
              ></base-text-input>
            </div>
            <div class="tw-w-full tw-flex tw-flex-col tw-items-start" v-if="!stateProfile.last_name">
              <span class="red5 medium14 tw-my-2" >* Enter Last Name</span>
            </div>
          </div>
        </div>
        <div class="tw-flex tw-justify-between tw-w-full">
          <div class="tw-flex tw-flex-col tw-items-start sm:tw-w-1/2 sm:tw-mr-1" style="width: 100%">
            <span class="grey10 medium16 tw-my-3 tw-ml-1">Email</span>
            <div class="tw-w-full">
              <base-text-input
                  type="email"
                  placeholder="Enter email"
                  @callBackString="inputEmail"
              ></base-text-input>
            </div>
            <div class="tw-w-full tw-flex tw-flex-col tw-items-start" v-if="!stateProfile.email">
              <span class="red5 medium14 tw-my-2" >* Enter Email</span>
            </div>
          </div>
        </div>
        <div class="tw-flex tw-justify-between tw-w-full">
          <div class="tw-flex tw-flex-col tw-items-start sm:tw-w-2/3 sm:tw-mr-1" style="width: 100%">
            <span class="grey10 medium16 tw-my-3 tw-ml-1">Date of Birth</span>
          <div class="tw-w-full">
            <base-text-input
                type="date"
                placeholder="dd/mm/yyyy"
                @callBackDate="inputDOB"
            ></base-text-input>
          </div>
            <div class="tw-w-full tw-flex tw-flex-col tw-items-start" v-if="!stateProfile.birth_date">
              <span class="red5 medium14 tw-my-2" >* Enter Date of Birth</span>
            </div>
          </div>
          <div class="tw-flex tw-flex-col tw-items-start sm:tw-w-1/3 sm:tw-ml-1" style="width: 275px">
            <span class="grey10 medium16 tw-my-3 tw-ml-1">Gender</span>
            <div class="tw-w-full">
              <base-dropdown
                  placeholder="Select Gender"
                  v-bind:optionsList="[{option:'M'},{option:'F'}]"
                  @valueSelected="inputGender"
              ></base-dropdown>
            </div>
            <div class="tw-w-full tw-flex tw-flex-col tw-items-start" v-if="!stateProfile.gender">
              <span class="red5 medium14 tw-my-2" >* Select Gender</span>
            </div>
          </div>
        </div>
        <div class="tw-flex tw-flex-col tw-justify-between tw-w-full">
          <div class="tw-flex tw-flex-col tw-items-start sm:tw-w-1/2" style="width: 100%">
            <span class="grey10 medium16 tw-my-3 tw-ml-1">Phone Number</span>
            <div class="tw-w-full">
              <base-text-input
                  type="phone"
                  placeholder="Enter phone number"
                  @callBackString="inputPhoneNumber"
              ></base-text-input>
            </div>
            <div class="tw-w-full tw-flex tw-flex-col tw-items-start" v-if="!stateProfile.phone_number">
              <span class="red5 medium14 tw-my-2" >* Enter Phone Number</span>
            </div>
          </div>
        </div>
        <div class="tw-flex tw-justify-between tw-w-full">
          <div class="tw-flex tw-flex-col tw-items-start sm:tw-w-1/2" style="width: 100%">
            <span class="grey10 medium16 tw-my-3 tw-ml-1">Job Title</span>
            <div class="tw-w-full">
              <base-dropdown
                  placeholder="Select job"
                  v-bind:optionsList="[{option:'001'},{option:'002'},{option:'003'}]"
                  @valueSelected="inputJob"
              ></base-dropdown>
            </div>
            <div class="tw-w-full tw-flex tw-flex-col tw-items-start" v-if="!stateProfile.role_id">
              <span class="red5 medium14 tw-my-2" >* Enter Job</span>
            </div>
          </div>
          <div class="tw-flex tw-flex-col tw-items-start sm:tw-w-1/2 sm:tw-ml-1" style="width: 100%">
            <span class="grey10 medium16 tw-my-3 tw-ml-1">Division</span>
            <div class="tw-w-full">
              <base-dropdown
                  placeholder="Select division"
                  v-bind:optionsList="[{option:'001'},{option:'002'}]"
                  @valueSelected="inputDivision"
              ></base-dropdown>
            </div>
            <div class="tw-w-full tw-flex tw-flex-col tw-items-start" v-if="!stateProfile.division_id">
              <span class="red5 medium14 tw-my-2">* Enter Division</span>
            </div>
          </div>
        </div>
        <!-- Create An Account Button-->
        <div class="tw-mt-5">
          <base-button
              buttonID="buttonCreateAnAccount"
              buttonText="Create An Account"
              buttonTextColor="white"
              buttonBgColor="bg-blue5"
              :callback="doRegister"
          >
          </base-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue2'
import BaseButton from '@/components/BaseButton'
import BaseTextInput from '@/components/BaseTextInput'
import BaseDropdown from '@/components/BaseDropdown'
import axios from 'axios'
export default {
  name: "CreateAnAccount",
  components: {
    Icon,
    BaseButton,
    BaseTextInput,
    BaseDropdown
  },
  data() {
    return {
      StateShowContentForWindowSize: true,
      stateShowCreateAndAccountModal: false,
      stateRegister: {
        username: '',
        password: '',
        confirmPassword: '',
        gender: '',
        title: '',
        first_name: '',
        last_name: '',
        email: '',
        birth_date: '',
        phone_number: '',
        role_id: '',
        division_id: '',
        profile_pic:'string1'
      },
      stateProfile: {
        username: Boolean,
        password: Boolean,
        confirmPassword: Boolean,
        confirmPasswordHaveValue: false,
        gender: Boolean,
        title: Boolean,
        first_name: Boolean,
        last_name: Boolean,
        email: Boolean,
        birth_date: Boolean,
        phone_number: Boolean,
        role_id: Boolean,
        division_id: Boolean
      }
    }
  },
  methods: {
    doShowCreateAnAccountButton (state) {
      if(!this.stateShowCreateAndAccountModal){
        this.stateProfile.username = true
        this.stateProfile.password = true
        this.stateProfile.confirmPasswordHaveValue = false
        this.stateProfile.gender = true
        this.stateProfile.title = true
        this.stateProfile.first_name = true
        this.stateProfile.last_name = true
        this.stateProfile.email = true
        this.stateProfile.birth_date = true
        this.stateProfile.phone_number = true
        this.stateProfile.role_id = true
        this.stateProfile.division_id = true
        this.stateShowCreateAndAccountModal = state
      }else{
        this.stateProfile.username = false
        this.stateProfile.password = false
        this.stateProfile.confirmPasswordHaveValue = false
        this.stateProfile.gender = false
        this.stateProfile.title = false
        this.stateProfile.first_name = false
        this.stateProfile.last_name = false
        this.stateProfile.email = false
        this.stateProfile.birth_date = false
        this.stateProfile.phone_number = false
        this.stateProfile.role_id = false
        this.stateProfile.division_id = false
        this.stateShowCreateAndAccountModal = state
      }
    },
    inputUsername(username){
      this.stateRegister.username = username
      this.stateProfile.username = this.stateRegister.username !== '';
    },
    inputPassword(password){
      this.stateRegister.password = password
      this.stateProfile.password = this.stateRegister.password !== '';
      this.stateProfile.confirmPassword = this.stateRegister.confirmPassword === this.stateRegister.password;
    },
    inputConfirmPassword(confirmPassword){
      this.stateRegister.confirmPassword = confirmPassword
      if(this.stateRegister.password !== ''){
        this.stateProfile.confirmPasswordHaveValue = true
        this.stateProfile.confirmPassword = this.stateRegister.confirmPassword === this.stateRegister.password;
      }else{
        this.stateProfile.confirmPasswordHaveValue = false
      }
    },
    inputGender(gender){
      this.stateRegister.gender = gender
      this.stateProfile.gender = this.stateRegister.gender !== '';
    },
    inputTitle(title){
      this.stateRegister.title = title
      this.stateProfile.title = this.stateRegister.title !== '';
    },
    inputFirstName(first_name){
      this.stateRegister.first_name = first_name
      this.stateProfile.first_name = this.stateRegister.first_name !== '';
    },
    inputLastName(last_name){
      this.stateRegister.last_name = last_name
      this.stateProfile.last_name = this.stateRegister.last_name !== '';
    },
    inputEmail(email){
      this.stateRegister.email = email
      this.stateProfile.email = this.stateRegister.email !== '';
    },
    inputDOB(birth_date){
      const date = new Date(birth_date) //แปลง string เป็น Date
      this.stateRegister.birth_date = date.toISOString() // แปลง Dateในรูปแบบของ IsoString ทำให้ส่ง api ได้ !!!
      this.stateProfile.birth_date = this.stateRegister.birth_date !== '';
    },
    inputPhoneNumber(phone_number){
      this.stateRegister.phone_number = phone_number
      this.stateProfile.phone_number = this.stateRegister.phone_number !== '';
    },
    inputJob(role_id){
      this.stateRegister.role_id = role_id
      this.stateProfile.role_id = this.stateRegister.role_id !== '';
    },
    inputDivision(division_id){
      this.stateRegister.division_id = division_id
      this.stateProfile.division_id = this.stateRegister.division_id !== '';
    },
    async doRegister(){
      this.stateProfile.username = this.stateRegister.username !== '';
      this.stateProfile.password = this.stateRegister.password !== '';
      this.stateProfile.gender = this.stateRegister.gender !== '';
      this.stateProfile.title = this.stateRegister.title !== '';
      this.stateProfile.first_name = this.stateRegister.first_name !== '';
      this.stateProfile.last_name = this.stateRegister.last_name !== '';
      this.stateProfile.email = this.stateRegister.email !== '';
      this.stateProfile.birth_date = this.stateRegister.birth_date !== '';
      this.stateProfile.phone_number = this.stateRegister.phone_number !== '';
      this.stateProfile.role_id = this.stateRegister.role_id !== '';
      this.stateProfile.division_id = this.stateRegister.division_id !== '';
      console.log('state register' + this.stateRegister)
      try{
        const response = await axios.post('http://localhost:4000/api/User/Register', {
          username :this.stateRegister.username,
          password:this.stateRegister.password,
          gender:this.stateRegister.gender,
          title:this.stateRegister.title,
          first_name:this.stateRegister.first_name,
          last_name:this.stateRegister.last_name,
          email:this.stateRegister.email,
          birth_date:this.stateRegister.birth_date ,
          phone_number:this.stateRegister.phone_number,
          role_id: this.stateRegister.role_id,
          division_id: this.stateRegister.division_id,
          profile_pic: this.stateRegister.profile_pic
        })
        if(response.status===200 && response.data) {
          console.log(response.status)
          this.$router.push('/')
        }
      }catch (error){
        console.log(error)
      }
    },
    doPath(path) {
      this.$router.push(path).catch(()=>{})
    },
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
</style>