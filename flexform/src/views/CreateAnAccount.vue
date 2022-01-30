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
          <div class="tw-w-full tw-flex tw-flex-col tw-items-start" v-if="!stateRegister.username">
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
            <div class="tw-w-full tw-flex tw-flex-col tw-items-start" v-if="!stateRegister.password">
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
            <div class="tw-w-full tw-flex tw-flex-col tw-items-start" v-if="!stateRegister.confirmPassword && stateRegister.confirmPasswordHaveValue">
              <span class="red5 medium14 tw-my-2" >* Password did't match</span>
            </div>
            <div class="tw-w-full tw-flex tw-flex-col tw-items-start" v-if="stateRegister.confirmPassword && stateRegister.confirmPasswordHaveValue">
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
            <div class="tw-w-full tw-flex tw-flex-col tw-items-start" v-if="!stateRegister.employeeID">
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
            <div class="tw-w-full tw-flex tw-flex-col tw-items-start" v-if="!stateRegister.gender">
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
                <div class="tw-w-full tw-flex tw-flex-col tw-items-start" v-if="!stateRegister.title">
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
                <div class="tw-w-full tw-flex tw-flex-col tw-items-start" v-if="!stateRegister.firstName">
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
            <div class="tw-w-full tw-flex tw-flex-col tw-items-start" v-if="!stateRegister.lastName">
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
            <div class="tw-w-full tw-flex tw-flex-col tw-items-start" v-if="!stateRegister.email">
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
            <div class="tw-w-full tw-flex tw-flex-col tw-items-start" v-if="!stateRegister.dob">
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
            <div class="tw-w-full tw-flex tw-flex-col tw-items-start" v-if="!stateRegister.phoneNumber">
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
            <div class="tw-w-full tw-flex tw-flex-col tw-items-start" v-if="!stateRegister.jobTitle">
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
            <div class="tw-w-full tw-flex tw-flex-col tw-items-start" v-if="!stateRegister.division">
              <span class="red5 medium14 tw-my-2" >* Enter Division</span>
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
      showContentForWindowSize: true,
      showCreateAnAccountModal: false,
      dataRegister: {
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
      stateRegister: {
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
      if(!this.showCreateAnAccountModal){
        this.stateRegister.username = true
        this.stateRegister.password = true
        this.stateRegister.confirmPasswordHaveValue = false
        this.stateRegister.employeeID = true
        this.stateRegister.gender = true
        this.stateRegister.title = true
        this.stateRegister.firstName = true
        this.stateRegister.lastName = true
        this.stateRegister.email = true
        this.stateRegister.dob = true
        this.stateRegister.phoneNumber = true
        this.stateRegister.jobTitle = true
        this.stateRegister.division = true
        this.showCreateAnAccountModal = state
      }else{
        this.stateRegister.username = false
        this.stateRegister.password = false
        this.stateRegister.confirmPasswordHaveValue = false
        this.stateRegister.employeeID = false
        this.stateRegister.gender = false
        this.stateRegister.title = false
        this.stateRegister.firstName = false
        this.stateRegister.lastName = false
        this.stateRegister.email = false
        this.stateRegister.dob = false
        this.stateRegister.phoneNumber = false
        this.stateRegister.jobTitle = false
        this.stateRegister.division = false
        this.showCreateAnAccountModal = state
      }
    },
    inputUsername(username){
      this.dataRegister.username = username
      this.stateRegister.username = this.dataRegister.username !== '';
    },
    inputPassword(password){
      this.dataRegister.password = password
      this.stateRegister.password = this.dataRegister.password !== '';
      this.stateRegister.confirmPassword = this.dataRegister.confirmPassword === this.dataRegister.password;
    },
    inputConfirmPassword(confirmPassword){
      this.dataRegister.confirmPassword = confirmPassword
      if(this.dataRegister.password !== ''){
        this.stateRegister.confirmPasswordHaveValue = true
        this.stateRegister.confirmPassword = this.dataRegister.confirmPassword === this.dataRegister.password;
      }else{
        this.stateRegister.confirmPasswordHaveValue = false
      }
    },
    inputEmployeeID(employeeID){
      this.dataRegister.employeeID = employeeID
      this.stateRegister.employeeID = this.dataRegister.employeeID !== '';
    },
    inputGender(gender){
      this.dataRegister.gender = gender
      this.stateRegister.gender = this.dataRegister.gender !== '';
    },
    inputTitle(title){
      this.dataRegister.title = title
      this.stateRegister.title = this.dataRegister.title !== '';
    },
    inputFirstName(firstName){
      this.dataRegister.firstName = firstName
      this.stateRegister.firstName = this.dataRegister.firstName !== '';
    },
    inputLastName(lastName){
      this.dataRegister.lastName = lastName
      this.stateRegister.lastName = this.dataRegister.lastName !== '';
    },
    inputEmail(email){
      this.dataRegister.email = email
      this.stateRegister.email = this.dataRegister.email !== '';
    },
    inputDOB(dob){
      this.dataRegister.dob = dob
      this.stateRegister.dob = this.dataRegister.dob !== '';
    },
    inputPhoneNumber(phoneNumber){
      this.dataRegister.phoneNumber = phoneNumber
      this.stateRegister.phoneNumber = this.dataRegister.phoneNumber !== '';
    },
    inputJob(job){
      this.dataRegister.jobTitle = job
      this.stateRegister.jobTitle = this.dataRegister.jobTitle !== '';
    },
    inputDivision(division){
      this.dataRegister.division = division
      this.stateRegister.division = this.dataRegister.division !== '';
    },
    doRegister(e){
      console.log(e)
      this.stateRegister.username = this.dataRegister.username !== '';
      this.stateRegister.password = this.dataRegister.password !== '';
      this.stateRegister.employeeID = this.dataRegister.employeeID !== '';
      this.stateRegister.gender = this.dataRegister.gender !== '';
      this.stateRegister.title = this.dataRegister.title !== '';
      this.stateRegister.firstName = this.dataRegister.firstName !== '';
      this.stateRegister.lastName = this.dataRegister.lastName !== '';
      this.stateRegister.email = this.dataRegister.email !== '';
      this.stateRegister.dob = this.dataRegister.dob !== '';
      this.stateRegister.phoneNumber = this.dataRegister.phoneNumber !== '';
      this.stateRegister.jobTitle = this.dataRegister.jobTitle !== '';
      this.stateRegister.division = this.dataRegister.division !== '';
      console.log(this.dataRegister)
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