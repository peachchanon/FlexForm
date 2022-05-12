<template>
  <layout-sidebar-navbar>
    <template #content>
      <div class="bg-grey1 tw-h-full sm:tw-p-2" style="height: 90%">
        <div class="box bg-white tw-h-full tw-relative">
          <!-- Banner -->
          <div class="bg-blue10 tw-w-full tw-absolute" style="height: 130px; border-radius: 12px 12px 0 0; left: 0; top: 0;"></div>
          <!-- All Profile -->
          <div class="tw-w-full tw-flex md:tw-flex-row md:tw-items-end md:tw-justify-between tw-flex-col tw-items-center tw-absolute" style="right: 5px; top: 45px;">
            <!-- Profile -->
            <div class="tw-flex md:tw-flex-row md:tw-items-end tw-flex-col md:tw-ml-8">
              <div class="tw-flex tw-flex-col md:tw-items-start tw-items-center">
                <div class="img-profile">
                  <Icon class="icon blue10" icon="heroicons-outline:user" style="font-size: 80px"/>
                </div>
              </div>
              <div class="tw-flex tw-flex-col md:tw-items-start tw-items-center">
                <span class="semibold24 blue10 md:tw-mb-5 tw-ml-2">Chanon Panarong</span>
                <!--
                <div class="medium16 tw-flex tw-flex-row tw-mb-3 tw-ml-2">
                  <span class="blue10 tw-mr-1">Employee ID:</span>
                  <span class="grey7">6107050104</span>
                </div>
                -->
              </div>
            </div>
            <!--Button Edit-->
            <!--
            <div class="md:tw-m-3" style="width: fit-content">
              <base-button-white
                  buttonID="buttonEditProfile"
                  buttonText="Edit"
                  buttonIcon="heroicons-outline:pencil-alt"
                  :callback="doButton"
              ></base-button-white>
            </div>
            -->
            <!-- Data -->
          </div>
          <!-- Data -->
          <div 
            class="tw-flex xl:tw-flex-row tw-flex-col tw-w-full"
            :class="{'box-data-768': !StateShowContentForWindowSize,'box-data': StateShowContentForWindowSize}"
          >
            <!-- Account -->
            <div class="base-padding tw-w-full">
              <span class="semibold24 blue10">Accout</span>
              <div class="tw-flex tw-flex-row tw-py-3">
                <div class="tw-flex tw-flex-row tw-w-1/2">
                  <Icon class="semibold24 icon grey10" icon="heroicons-outline:user"/>
                  <span class="tw-ml-2 medium16 grey10 tw-pt-0.5">Username</span>
                </div>
                <span class="medium16 grey7 tw-pt-0.5">{{DataUser.username}}</span>
              </div>
            </div>
            <!-- Job -->
            <div class="base-padding tw-w-full">
              <span class="semibold24 blue10">Job</span>
              <div class="tw-flex tw-flex-row tw-py-3">
                <div class="tw-flex tw-flex-row tw-w-1/2">
                  <Icon class="semibold24 icon grey10" icon="heroicons-outline:credit-card"/>
                  <span class="tw-ml-2 medium16 grey10 tw-pt-0.5">Employee ID</span>
                </div>
                <span class="medium16 grey7 tw-pt-0.5 tw-w-1/2">{{DataUser.employeeID}}</span>
              </div>
              <div class="tw-flex tw-flex-row tw-py-3">
                <div class="tw-flex tw-flex-row tw-w-1/2">
                  <Icon class="semibold24 icon grey10" icon="heroicons-outline:briefcase"/>
                  <span class="tw-ml-2 medium16 grey10 tw-pt-0.5">Job Title</span>
                </div>
                <span class="medium16 grey7 tw-pt-0.5 tw-w-1/2">{{DataUser.jobTitle}}</span>
              </div>
              <div class="tw-flex tw-flex-row tw-py-3">
                <div class="tw-flex tw-flex-row tw-w-1/2">
                  <Icon class="semibold24 icon grey10" icon="heroicons-outline:office-building"/>
                  <span class="tw-ml-2 medium16 grey10 tw-pt-0.5">Division</span>
                </div>
                <span class="medium16 grey7 tw-pt-0.5 tw-w-1/2">{{DataUser.division}}</span>
              </div>
            </div>
            <!-- Contact -->
            <div class="base-padding tw-w-full">
              <span class="semibold24 blue10">Contact</span>
              <div class="tw-flex tw-flex-row tw-py-3">
                <div class="tw-flex tw-flex-row tw-w-1/2">
                  <Icon class="semibold24 icon grey10" icon="heroicons-outline:phone"/>
                  <span class="tw-ml-2 medium16 grey10 tw-pt-0.5">Phone Number</span>
                </div>
                <span class="medium16 grey7 tw-pt-0.5 tw-w-1/2">{{DataUser.phoneNumber}}</span>
              </div>
              <div class="tw-flex tw-flex-row tw-py-3">
                <div class="tw-flex tw-flex-row tw-w-1/2">
                  <Icon class="semibold24 icon grey10" icon="heroicons-outline:mail"/>
                  <span class="tw-ml-2 medium16 grey10 tw-pt-0.5">Email</span>
                </div>
                <span class="medium16 grey7 tw-pt-0.5 tw-w-1/2">{{DataUser.email}}</span>
              </div>
            </div>
          </div>
          <!-- Contact -->
          <div class="base-padding tw-w-full md:tw-w-1/3">
            <span class="semibold24 blue10">Bio</span>
            <div class="tw-flex tw-flex-row tw-py-3">
              <div class="tw-flex tw-flex-row tw-w-1/2">
                <Icon class="semibold24 icon grey10" icon="heroicons-outline:credit-card"/>
                <span class="tw-ml-2 medium16 grey10 tw-pt-0.5">Name</span>
              </div>
              <span class="medium16 grey7 tw-pt-0.5 tw-w-1/2">{{DataUser.title+' '+DataUser.firstName+' '+DataUser.lastName}}</span>
            </div>
            <div class="tw-flex tw-flex-row tw-py-3">
              <div class="tw-flex tw-flex-row tw-w-1/2">
                <Icon class="semibold24 icon grey10" icon="heroicons-outline:calendar"/>
                <span class="tw-ml-2 medium16 grey10 tw-pt-0.5">Data of Birth</span>
              </div>
              <span class="medium16 grey7 tw-pt-0.5 tw-w-1/2">{{DataUser.dob}}</span>
            </div>
            <div class="tw-flex tw-flex-row tw-py-3">
              <div class="tw-flex tw-flex-row tw-w-1/2">
                <Icon class="semibold24 icon grey10" icon="heroicons-outline:user"/>
                <span class="tw-ml-2 medium16 grey10 tw-pt-0.5">Gender</span>
              </div>
              <span class="medium16 grey7 tw-pt-0.5 tw-w-1/2">{{DataUser.gender}}</span>
            </div>
          </div>
        </div>
        <!-- Edit Profile Modal -->
        <transition name="theme-modal-fade" v-if="ShowEditProfileModal">
          <div class="theme-modal-backdrop">
            <div class="theme-modal">
              <header class="base-padding tw-flex tw-flex-col tw-items-center tw-relative">
                <span class="semibold24 grey10">Edit Profile</span>
                <div class="button-close tw-flex tw-flex-col tw-items-center medium16 tw-absolute tw-top-0 tw-right-0" style="width: fit-content" @click="doButton('buttonEditProfile')">
                  <Icon class="icon semibold24" icon="heroicons-outline:x"/>
                </div>
              </header>
              <section class="base-padding tw-overflow-x-hidden">
                <div class="tw-flex tw-flex-col tw-items-start">
                  <span class="grey10 medium16 tw-my-3 tw-ml-1">Username</span>
                  <div class="tw-w-full">
                    <base-text-input
                        type="text"
                        placeholder="Enter username"
                        @callBackString="inputUsername"
                    ></base-text-input>
                  </div>
                  <div class="tw-w-full tw-flex tw-flex-col tw-items-start" v-if="!StateProfile.username">
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
                    <div class="tw-w-full tw-flex tw-flex-col tw-items-start" v-if="!StateProfile.password">
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
                    <div class="tw-w-full tw-flex tw-flex-col tw-items-start" v-if="!StateProfile.confirmPassword && StateProfile.confirmPasswordHaveValue">
                      <span class="red5 medium14 tw-my-2" >* Password did't match</span>
                    </div>
                    <div class="tw-w-full tw-flex tw-flex-col tw-items-start" v-if="StateProfile.confirmPassword && StateProfile.confirmPasswordHaveValue">
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
                    <div class="tw-w-full tw-flex tw-flex-col tw-items-start" v-if="!StateProfile.employeeID">
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
                    <div class="tw-w-full tw-flex tw-flex-col tw-items-start" v-if="!StateProfile.gender">
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
                        <div class="tw-w-full tw-flex tw-flex-col tw-items-start" v-if="!StateProfile.title">
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
                        <div class="tw-w-full tw-flex tw-flex-col tw-items-start" v-if="!StateProfile.firstName">
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
                    <div class="tw-w-full tw-flex tw-flex-col tw-items-start" v-if="!StateProfile.lastName">
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
                    <div class="tw-w-full tw-flex tw-flex-col tw-items-start" v-if="!StateProfile.email">
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
                    <div class="tw-w-full tw-flex tw-flex-col tw-items-start" v-if="!StateProfile.dob">
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
                    <div class="tw-w-full tw-flex tw-flex-col tw-items-start" v-if="!StateProfile.phoneNumber">
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
                    <div class="tw-w-full tw-flex tw-flex-col tw-items-start" v-if="!StateProfile.jobTitle">
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
                    <div class="tw-w-full tw-flex tw-flex-col tw-items-start" v-if="!StateProfile.division">
                      <span class="red5 medium14 tw-my-2" >* Enter Division</span>
                    </div>
                  </div>
                </div>
              </section>
              <footer class="base-padding">
                <base-button
                    buttonID="buttonSave"
                    buttonText="Save"
                    buttonTextColor="white"
                    buttonBgColor="bg-green5"
                    :callback="doButton"
                >
                </base-button>
              </footer>
            </div>
          </div>
        </transition>
      </div>
    </template>
  </layout-sidebar-navbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import LayoutSidebarNavbar from '@/layouts/LayoutSidebarNavbar'
import { Icon } from '@iconify/vue2'
//import BaseButtonWhite from '@/components/BaseButtonWhite'
import BaseTextInput from "@/components/BaseTextInput";
import BaseDropdown from "@/components/BaseDropdown";
import BaseButton from "@/components/BaseButton";
import axios from "axios";

export default {
  name: "Profile.vue",
  components: {
    Icon,
    LayoutSidebarNavbar,
    //BaseButtonWhite,
    BaseTextInput,
    BaseDropdown,
    BaseButton,
  },
  data() {
    return {
      StateShowContentForWindowSize: true,
      ShowEditProfileModal: false,
      LocalUsername: '',
      DataUser: {
        username: 'peach_1014', password: '1441', employeeID: '40010144', gender: 'Male', title: 'Mr.', firstName: 'Chanon',
        lastName: 'Panarong', email: 'peach@mail.com', dob: '25 August 1999', phoneNumber: '(096) 9134 053', jobTitle: 'NOC Engineer', division: 'NOC Engineer', imgUser: ''
      },
      StateEditProfile: {
        username: '', password: '', confirmPassword: '', employeeID: '', gender: '', title: '', firstName: '',
        lastName: '', email: '', dob: '', phoneNumber: '', jobTitle: '', division: ''
      },
      StateProfile: {
        username: Boolean,
        password: Boolean, confirmPassword: Boolean, confirmPasswordHaveValue: false,
        employeeID: Boolean, gender: Boolean,
        title: Boolean, firstName: Boolean, lastName: Boolean,
        email: Boolean, dob: Boolean, phoneNumber: Boolean, jobTitle: Boolean, division: Boolean
      },
      // Value
      Title: [
        { id: 'mr', option:'Mr.'},
        { id: 'ms', option:'Ms.'},
        { id: 'mrs', option:'Mrs.'},
      ],
      Gender: [
        { id: 'M', option:'Male' },
        { id: 'F', option:'Female' },
      ],
      Role: [
        { id: '001', option:'NOC Engineer' },
        { id: '002', option:'Network Admin' },
        { id: '003', option:'Superuser' },
      ],
      Division: [
        { id: '001', option:'National Telecom Public Company Limited บางรัก' },
        { id: '002', option:'CAT-THIX' },
      ],
    }
  },
  watch:{
    windowResize () {
      this.StateShowContentForWindowSize = window.innerWidth >= 768
    }
  },
  computed: {
    ...mapGetters(['windowResize'])
  },
  async mounted () {
    window.onresize = () => {
      this.flapWindowResize()
    }
    this.StateShowContentForWindowSize = window.innerWidth >= 768
    this.LocalUsername = localStorage.getItem('username')
    await axios.get('http://localhost:4000/api/User/'+this.LocalUsername)
        .then(response => {
          if(response.status === 200 && response.data) {
            console.log(response.status)
            console.log(response.data)
            let title = new String
            let birthDay = new Date
            let gender = new String
            let role = new String
            let division = new String
            title = this.Title.find(item=>item.id===response.data.title).option
            birthDay = response.data.birth_date.replace('T00:00:00','')
            gender = this.Gender.find(item=>item.id===response.data.gender).option
            role = this.Role.find(item=>item.id===response.data.role_id).option
            division = this.Division.find(item=>item.id===response.data.division_id).option
            this.DataUser={
              username: response.data.username, 
              password: response.data.password, 
              employeeID: response.data.employee_id, 
              gender: gender, 
              title: title, 
              firstName:  response.data.first_name,
              lastName:  response.data.last_name, 
              email:  response.data.email, 
              dob: birthDay, 
              phoneNumber:  response.data.phone_number, 
              jobTitle: role, 
              division: division, 
              imgUser:  response.data.profile_pic
            }
          }
        })
        .catch(error => {
          console.log(error)
        })
  },
  methods: {
    ...mapActions(['flapWindowResize']),
    doButton(buttonName){
      if(buttonName === 'buttonEditProfile'){
        this.ShowEditProfileModal = !this.ShowEditProfileModal;
      } else if(buttonName === 'buttonSave') {
        this.StateProfile.username = this.StateEditProfile.username !== '';
        this.StateProfile.password = this.StateEditProfile.password !== '';
        this.StateProfile.employeeID = this.StateEditProfile.employeeID !== '';
        this.StateProfile.gender = this.StateEditProfile.gender !== '';
        this.StateProfile.title = this.StateEditProfile.title !== '';
        this.StateProfile.firstName = this.StateEditProfile.firstName !== '';
        this.StateProfile.lastName = this.StateEditProfile.lastName !== '';
        this.StateProfile.email = this.StateEditProfile.email !== '';
        this.StateProfile.dob = this.StateEditProfile.dob !== '';
        this.StateProfile.phoneNumber = this.StateEditProfile.phoneNumber !== '';
        this.StateProfile.jobTitle = this.StateEditProfile.jobTitle !== '';
        this.StateProfile.division = this.StateEditProfile.division !== '';
        console.log(this.StateEditProfile)
      }
    },
    doShowRenameButton (state) {
      if(!this.stateShowCreateAndAccountModal){
        this.StateProfile.username = true
        this.StateProfile.password = true
        this.StateProfile.confirmPasswordHaveValue = false
        this.StateProfile.employeeID = true
        this.StateProfile.gender = true
        this.StateProfile.title = true
        this.StateProfile.firstName = true
        this.StateProfile.lastName = true
        this.StateProfile.email = true
        this.StateProfile.dob = true
        this.StateProfile.phoneNumber = true
        this.StateProfile.jobTitle = true
        this.StateProfile.division = true
        this.stateShowCreateAndAccountModal = state
      }else{
        this.StateProfile.username = false
        this.StateProfile.password = false
        this.StateProfile.confirmPasswordHaveValue = false
        this.StateProfile.employeeID = false
        this.StateProfile.gender = false
        this.StateProfile.title = false
        this.StateProfile.firstName = false
        this.StateProfile.lastName = false
        this.StateProfile.email = false
        this.StateProfile.dob = false
        this.StateProfile.phoneNumber = false
        this.StateProfile.jobTitle = false
        this.StateProfile.division = false
        this.stateShowCreateAndAccountModal = state
      }
    },
    inputUsername(username){
      this.StateEditProfile.username = username
      this.StateProfile.username = this.StateEditProfile.username !== '';
    },
    inputPassword(password){
      this.StateEditProfile.password = password
      this.StateProfile.password = this.StateEditProfile.password !== '';
      this.StateProfile.confirmPassword = this.StateEditProfile.confirmPassword === this.StateEditProfile.password;
    },
    inputConfirmPassword(confirmPassword){
      this.StateEditProfile.confirmPassword = confirmPassword
      if(this.StateEditProfile.password !== ''){
        this.StateProfile.confirmPasswordHaveValue = true
        this.StateProfile.confirmPassword = this.StateEditProfile.confirmPassword === this.StateEditProfile.password;
      }else{
        this.StateProfile.confirmPasswordHaveValue = false
      }
    },
    inputEmployeeID(employeeID){
      this.StateEditProfile.employeeID = employeeID
      this.StateProfile.employeeID = this.StateEditProfile.employeeID !== '';
    },
    inputGender(gender){
      this.StateEditProfile.gender = gender
      this.StateProfile.gender = this.StateEditProfile.gender !== '';
    },
    inputTitle(title){
      this.StateEditProfile.title = title
      this.StateProfile.title = this.StateEditProfile.title !== '';
    },
    inputFirstName(firstName){
      this.StateEditProfile.firstName = firstName
      this.StateProfile.firstName = this.StateEditProfile.firstName !== '';
    },
    inputLastName(lastName){
      this.StateEditProfile.lastName = lastName
      this.StateProfile.lastName = this.StateEditProfile.lastName !== '';
    },
    inputEmail(email){
      this.StateEditProfile.email = email
      this.StateProfile.email = this.StateEditProfile.email !== '';
    },
    inputDOB(dob){
      this.StateEditProfile.dob = dob
      this.StateProfile.dob = this.StateEditProfile.dob !== '';
    },
    inputPhoneNumber(phoneNumber){
      this.StateEditProfile.phoneNumber = phoneNumber
      console.log(phoneNumber)
      this.StateProfile.phoneNumber = this.StateEditProfile.phoneNumber !== '';
    },
    inputJob(job){
      this.StateEditProfile.jobTitle = job
      this.StateProfile.jobTitle = this.StateEditProfile.jobTitle !== '';
    },
    inputDivision(division){
      this.StateEditProfile.division = division
      this.StateProfile.division = this.StateEditProfile.division !== '';
    },
  }
}
</script>

<style lang="scss" scoped>
.img-profile{
  border-radius: 12px;
  width: 150px;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: $grey1;
  margin: 0.75rem;
  border: 5px solid white;
  box-shadow: $baseshadow;
}
.box-data{
  margin-top: 220px;
}
.box-data-768{
  margin-top: 260px;
}
.theme-modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  z-index: 2;
}
.theme-modal {
  margin: 2rem;
  min-width: 375px;
  width: 768px;
  background-color: white;
  padding: 1rem;
  box-shadow: 0 0 0.5px rgba(10, 10, 10, 0.5);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  height: 87%;
  .button-close{
    color: #102A43;
    padding: 0.75rem;
    transition: all .1s ease-in;
    border-radius: 12px;
    margin: 0.25rem 0;
    cursor: pointer;
    &:hover{
      color: #D64545;
      box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
    }
  }
}
.theme-modal-fade-enter, .theme-modal-fade-leave-to {
  opacity: 0;
}
.theme-modal-fade-enter-active, .theme-modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
</style>