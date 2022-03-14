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
          <div class="tw-flex tw-flex-col tw-items-start sm:tw-w-2/3 sm:tw-mr-1" style="width: 100%">
            <span class="grey10 medium16 tw-my-3 tw-ml-1">Employee ID</span>
            <div class="tw-w-full">
              <base-text-input
                  type="text"
                  placeholder="Enter employee id"
                  @callBackString="inputEmployeeID"
              ></base-text-input>
            </div>
            <div class="tw-w-full tw-flex tw-flex-col tw-items-start" v-if="!stateProfile.employeeID">
              <span class="red5 medium14 tw-my-2" >* Enter employee id</span>
            </div>
          </div>
          <div class="tw-flex tw-flex-col tw-items-start sm:tw-w-1/3 sm:tw-ml-1" style="width: 275px">
            <span class="grey10 medium16 tw-my-3 tw-ml-1">Gender</span>
            <div class="tw-w-full">
              <base-dropdown
                  placeholder="Select Gender"
                  v-bind:optionsList="[{option:'Male'},{option:'Female'}]"
                  @valueSelected="inputGender"
              ></base-dropdown>
            </div>
            <div class="tw-w-full tw-flex tw-flex-col tw-items-start" v-if="!stateProfile.gender">
              <span class="red5 medium14 tw-my-2" >* Select Gender</span>
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
                      v-bind:optionsList="[{option:'Mr.'},{option:'Mrs.'}]"
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
                <div class="tw-w-full tw-flex tw-flex-col tw-items-start" v-if="!stateProfile.firstName">
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
            <div class="tw-w-full tw-flex tw-flex-col tw-items-start" v-if="!stateProfile.lastName">
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
          <div class="tw-flex tw-flex-col tw-items-start sm:tw-w-1/2 sm:tw-ml-1" style="width: 100%">
            <span class="grey10 medium16 tw-my-3 tw-ml-1">Date of Birth</span>
            <div class="tw-w-full">
              <base-text-input
                  type="date"
                  placeholder="dd/mm/yyyy"
                  @callBackDate="inputDOB"
              ></base-text-input>
            </div>
            <div class="tw-w-full tw-flex tw-flex-col tw-items-start" v-if="!stateProfile.dob">
              <span class="red5 medium14 tw-my-2" >* Enter Date of Birth</span>
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
            <div class="tw-w-full tw-flex tw-flex-col tw-items-start" v-if="!stateProfile.phoneNumber">
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
                  v-bind:optionsList="[{option:'NOC Engineer'},{option:'Network Admin'},{option:'Superuser'}]"
                  @valueSelected="inputJob"
              ></base-dropdown>
            </div>
            <div class="tw-w-full tw-flex tw-flex-col tw-items-start" v-if="!stateProfile.jobTitle">
              <span class="red5 medium14 tw-my-2" >* Enter Job</span>
            </div>
          </div>
          <div class="tw-flex tw-flex-col tw-items-start sm:tw-w-1/2 sm:tw-ml-1" style="width: 100%">
            <span class="grey10 medium16 tw-my-3 tw-ml-1">Division</span>
            <div class="tw-w-full">
              <base-dropdown
                  placeholder="Select division"
                  v-bind:optionsList="[{option:'National Telecom Public Company Limited บางรัก'},{option:'CAT-THIX'}]"
                  @valueSelected="inputDivision"
              ></base-dropdown>
            </div>
            <div class="tw-w-full tw-flex tw-flex-col tw-items-start" v-if="!stateProfile.division">
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
        employeeID: '',
        gender: '',
        title: '',
        firstName: '',
        lastName: '',
        email: '',
        dob: '',
        phoneNumber: '',
        jobTitle: '',
        division: ''
      },
      stateProfile: {
        username: Boolean,
        password: Boolean,
        confirmPassword: Boolean,
        confirmPasswordHaveValue: false,
        employeeID: Boolean,
        gender: Boolean,
        title: Boolean,
        firstName: Boolean,
        lastName: Boolean,
        email: Boolean,
        dob: Boolean,
        phoneNumber: Boolean,
        jobTitle: Boolean,
        division: Boolean
      }
    }
  },
  methods: {
    doShowCreateAnAccountButton (state) {
      if(!this.stateShowCreateAndAccountModal){
        this.stateProfile.username = true
        this.stateProfile.password = true
        this.stateProfile.confirmPasswordHaveValue = false
        this.stateProfile.employeeID = true
        this.stateProfile.gender = true
        this.stateProfile.title = true
        this.stateProfile.firstName = true
        this.stateProfile.lastName = true
        this.stateProfile.email = true
        this.stateProfile.dob = true
        this.stateProfile.phoneNumber = true
        this.stateProfile.jobTitle = true
        this.stateProfile.division = true
        this.stateShowCreateAndAccountModal = state
      }else{
        this.stateProfile.username = false
        this.stateProfile.password = false
        this.stateProfile.confirmPasswordHaveValue = false
        this.stateProfile.employeeID = false
        this.stateProfile.gender = false
        this.stateProfile.title = false
        this.stateProfile.firstName = false
        this.stateProfile.lastName = false
        this.stateProfile.email = false
        this.stateProfile.dob = false
        this.stateProfile.phoneNumber = false
        this.stateProfile.jobTitle = false
        this.stateProfile.division = false
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
    inputEmployeeID(employeeID){
      this.stateRegister.employeeID = employeeID
      this.stateProfile.employeeID = this.stateRegister.employeeID !== '';
    },
    inputGender(gender){
      this.stateRegister.gender = gender
      this.stateProfile.gender = this.stateRegister.gender !== '';
    },
    inputTitle(title){
      this.stateRegister.title = title
      this.stateProfile.title = this.stateRegister.title !== '';
    },
    inputFirstName(firstName){
      this.stateRegister.firstName = firstName
      this.stateProfile.firstName = this.stateRegister.firstName !== '';
    },
    inputLastName(lastName){
      this.stateRegister.lastName = lastName
      this.stateProfile.lastName = this.stateRegister.lastName !== '';
    },
    inputEmail(email){
      this.stateRegister.email = email
      this.stateProfile.email = this.stateRegister.email !== '';
    },
    inputDOB(dob){
      this.stateRegister.dob = dob
      this.stateProfile.dob = this.stateRegister.dob !== '';
    },
    inputPhoneNumber(phoneNumber){
      this.stateRegister.phoneNumber = phoneNumber
      this.stateProfile.phoneNumber = this.stateRegister.phoneNumber !== '';
    },
    inputJob(job){
      this.stateRegister.jobTitle = job
      this.stateProfile.jobTitle = this.stateRegister.jobTitle !== '';
    },
    inputDivision(division){
      this.stateRegister.division = division
      this.stateProfile.division = this.stateRegister.division !== '';
    },
    doRegister(e){
      console.log(e)
      this.stateProfile.username = this.stateRegister.username !== '';
      this.stateProfile.password = this.stateRegister.password !== '';
      this.stateProfile.employeeID = this.stateRegister.employeeID !== '';
      this.stateProfile.gender = this.stateRegister.gender !== '';
      this.stateProfile.title = this.stateRegister.title !== '';
      this.stateProfile.firstName = this.stateRegister.firstName !== '';
      this.stateProfile.lastName = this.stateRegister.lastName !== '';
      this.stateProfile.email = this.stateRegister.email !== '';
      this.stateProfile.dob = this.stateRegister.dob !== '';
      this.stateProfile.phoneNumber = this.stateRegister.phoneNumber !== '';
      this.stateProfile.jobTitle = this.stateRegister.jobTitle !== '';
      this.stateProfile.division = this.stateRegister.division !== '';
      console.log(this.stateRegister)
    },
    doPath(path) {
      this.$router.push(path).catch(()=>{})
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
</style>