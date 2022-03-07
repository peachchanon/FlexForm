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
                  Img Profile
                </div>
              </div>
              <div class="tw-flex tw-flex-col md:tw-items-start tw-items-center">
                <span class="semibold24 blue10 tw-mb-2 tw-ml-2">Chanon Panarong</span>
                <div class="medium16 tw-flex tw-flex-row tw-mb-3 tw-ml-2">
                  <span class="blue10 tw-mr-1">Employee ID:</span>
                  <span class="grey7">6107050104</span>
                </div>
              </div>
            </div>
            <!--Button Edit-->
            <div class="md:tw-m-3" style="width: fit-content">
              <base-button-white
                  buttonID="buttonEditProfile"
                  buttonText="Edit"
                  buttonIcon="heroicons-outline:pencil-alt"
                  :callback="doButton"
              ></base-button-white>
            </div>
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
                <span class="medium16 grey7 tw-pt-0.5">{{dataUser.username}}</span>
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
                <span class="medium16 grey7 tw-pt-0.5 tw-w-1/2">{{dataUser.employeeID}}</span>
              </div>
              <div class="tw-flex tw-flex-row tw-py-3">
                <div class="tw-flex tw-flex-row tw-w-1/2">
                  <Icon class="semibold24 icon grey10" icon="heroicons-outline:briefcase"/>
                  <span class="tw-ml-2 medium16 grey10 tw-pt-0.5">Job Title</span>
                </div>
                <span class="medium16 grey7 tw-pt-0.5 tw-w-1/2">{{dataUser.jobTitle}}</span>
              </div>
              <div class="tw-flex tw-flex-row tw-py-3">
                <div class="tw-flex tw-flex-row tw-w-1/2">
                  <Icon class="semibold24 icon grey10" icon="heroicons-outline:office-building"/>
                  <span class="tw-ml-2 medium16 grey10 tw-pt-0.5">Division</span>
                </div>
                <span class="medium16 grey7 tw-pt-0.5 tw-w-1/2">{{dataUser.division}}</span>
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
                <span class="medium16 grey7 tw-pt-0.5 tw-w-1/2">{{dataUser.phoneNumber}}</span>
              </div>
              <div class="tw-flex tw-flex-row tw-py-3">
                <div class="tw-flex tw-flex-row tw-w-1/2">
                  <Icon class="semibold24 icon grey10" icon="heroicons-outline:mail"/>
                  <span class="tw-ml-2 medium16 grey10 tw-pt-0.5">Email</span>
                </div>
                <span class="medium16 grey7 tw-pt-0.5 tw-w-1/2">{{dataUser.email}}</span>
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
              <span class="medium16 grey7 tw-pt-0.5 tw-w-1/2">{{dataUser.title+' '+dataUser.firstName+' '+dataUser.lastName}}</span>
            </div>
            <div class="tw-flex tw-flex-row tw-py-3">
              <div class="tw-flex tw-flex-row tw-w-1/2">
                <Icon class="semibold24 icon grey10" icon="heroicons-outline:calendar"/>
                <span class="tw-ml-2 medium16 grey10 tw-pt-0.5">Data of Birth</span>
              </div>
              <span class="medium16 grey7 tw-pt-0.5 tw-w-1/2">{{dataUser.dob}}</span>
            </div>
            <div class="tw-flex tw-flex-row tw-py-3">
              <div class="tw-flex tw-flex-row tw-w-1/2">
                <Icon class="semibold24 icon grey10" icon="heroicons-outline:user"/>
                <span class="tw-ml-2 medium16 grey10 tw-pt-0.5">Gender</span>
              </div>
              <span class="medium16 grey7 tw-pt-0.5 tw-w-1/2">{{dataUser.gender}}</span>
            </div>
          </div>
        </div>
        
        <!-- Edit Profile Modal -->
        <transition name="theme-modal-fade" v-if="showEditProfileModal">
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
import BaseButtonWhite from '@/components/BaseButtonWhite'
import BaseTextInput from "@/components/BaseTextInput";
import BaseDropdown from "@/components/BaseDropdown";
import BaseButton from "@/components/BaseButton";

export default {
  name: "Profile.vue",
  components: {
    Icon,
    LayoutSidebarNavbar,
    BaseButtonWhite,
    BaseTextInput,
    BaseDropdown,
    BaseButton,
  },
  data() {
    return {
      StateShowContentForWindowSize: true,
      showEditProfileModal: false,
      dataUser: {
        username: 'peach_1014', password: '1441', employeeID: '40010144', gender: 'Male', title: 'Mr.', firstName: 'Chanon',
        lastName: 'Panarong', email: 'peach@mail.com', dob: '25 August 1999', phoneNumber: '(096) 9134 053', jobTitle: 'NOC Engineer', division: 'NOC Engineer', imgUser: ''
      },
      stateEditProfile: {
        username: '', password: '', confirmPassword: '', employeeID: '', gender: '', title: '', firstName: '',
        lastName: '', email: '', dob: '', phoneNumber: '', jobTitle: '', division: ''
      },
      stateProfile: {
        username: Boolean,
        password: Boolean, confirmPassword: Boolean, confirmPasswordHaveValue: false,
        employeeID: Boolean, gender: Boolean,
        title: Boolean, firstName: Boolean, lastName: Boolean,
        email: Boolean, dob: Boolean, phoneNumber: Boolean, jobTitle: Boolean, division: Boolean
      }
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
  },
  methods: {
    ...mapActions(['flapWindowResize']),
    doButton(buttonName){
      if(buttonName === 'buttonEditProfile'){
        this.showEditProfileModal = !this.showEditProfileModal;
      } else if(buttonName === 'buttonSave') {
        this.stateProfile.username = this.stateEditProfile.username !== '';
        this.stateProfile.password = this.stateEditProfile.password !== '';
        this.stateProfile.employeeID = this.stateEditProfile.employeeID !== '';
        this.stateProfile.gender = this.stateEditProfile.gender !== '';
        this.stateProfile.title = this.stateEditProfile.title !== '';
        this.stateProfile.firstName = this.stateEditProfile.firstName !== '';
        this.stateProfile.lastName = this.stateEditProfile.lastName !== '';
        this.stateProfile.email = this.stateEditProfile.email !== '';
        this.stateProfile.dob = this.stateEditProfile.dob !== '';
        this.stateProfile.phoneNumber = this.stateEditProfile.phoneNumber !== '';
        this.stateProfile.jobTitle = this.stateEditProfile.jobTitle !== '';
        this.stateProfile.division = this.stateEditProfile.division !== '';
        console.log(this.stateEditProfile)
      }
    },
    doShowRenameButton (state) {
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
      this.stateEditProfile.username = username
      this.stateProfile.username = this.stateEditProfile.username !== '';
    },
    inputPassword(password){
      this.stateEditProfile.password = password
      this.stateProfile.password = this.stateEditProfile.password !== '';
      this.stateProfile.confirmPassword = this.stateEditProfile.confirmPassword === this.stateEditProfile.password;
    },
    inputConfirmPassword(confirmPassword){
      this.stateEditProfile.confirmPassword = confirmPassword
      if(this.stateEditProfile.password !== ''){
        this.stateProfile.confirmPasswordHaveValue = true
        this.stateProfile.confirmPassword = this.stateEditProfile.confirmPassword === this.stateEditProfile.password;
      }else{
        this.stateProfile.confirmPasswordHaveValue = false
      }
    },
    inputEmployeeID(employeeID){
      this.stateEditProfile.employeeID = employeeID
      this.stateProfile.employeeID = this.stateEditProfile.employeeID !== '';
    },
    inputGender(gender){
      this.stateEditProfile.gender = gender
      this.stateProfile.gender = this.stateEditProfile.gender !== '';
    },
    inputTitle(title){
      this.stateEditProfile.title = title
      this.stateProfile.title = this.stateEditProfile.title !== '';
    },
    inputFirstName(firstName){
      this.stateEditProfile.firstName = firstName
      this.stateProfile.firstName = this.stateEditProfile.firstName !== '';
    },
    inputLastName(lastName){
      this.stateEditProfile.lastName = lastName
      this.stateProfile.lastName = this.stateEditProfile.lastName !== '';
    },
    inputEmail(email){
      this.stateEditProfile.email = email
      this.stateProfile.email = this.stateEditProfile.email !== '';
    },
    inputDOB(dob){
      this.stateEditProfile.dob = dob
      this.stateProfile.dob = this.stateEditProfile.dob !== '';
    },
    inputPhoneNumber(phoneNumber){
      this.stateEditProfile.phoneNumber = phoneNumber
      console.log(phoneNumber)
      this.stateProfile.phoneNumber = this.stateEditProfile.phoneNumber !== '';
    },
    inputJob(job){
      this.stateEditProfile.jobTitle = job
      this.stateProfile.jobTitle = this.stateEditProfile.jobTitle !== '';
    },
    inputDivision(division){
      this.stateEditProfile.division = division
      this.stateProfile.division = this.stateEditProfile.division !== '';
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
  margin-top: 350px;
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