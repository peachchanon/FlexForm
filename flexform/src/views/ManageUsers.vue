<template>
  <layout-sidebar-navbar>
    <template #content>
      <div class="bg-grey1 tw-h-full sm:tw-p-2">
        <div class="base-margin tw-flex tw-flex-row tw-items-center">
          <Icon class="semibold24 icon blue10" icon="heroicons-outline:user-group"/>
          <span class="semibold24 blue10 tw-pl-1">Manage Users</span>
        </div>
        <div class="box bg-white">
          <div class="tw-flex tw-flex-row tw-justify-between tw-items-center">
            <!-- Filter Box -->
            <div class="tw-pr-4" :class="{'tw-w-full': !showContentForWindowSize, 'tw-w-2/5':showContentForWindowSize}">
              <base-filter-box 
                  :propOptions="dataTable.columnName"
                  propBlankDataText= "Column: Show All"
                  @callbackDataFilter="doFilterColumn"
              ></base-filter-box>
            </div>
            <div class="">
              <div class="button-blue tw-flex tw-flex-row tw-items-center medium16" @click="doShowCreateAnAccountButton(true)" style="width: fit-content">
                <span v-if="showContentForWindowSize" class="tw-mt-0.5 tw-mr-3 tw-ml-2">Create an Account</span>
                <Icon class="icon semibold24" icon="heroicons-outline:plus"/>
              </div>
            </div>
          </div>
          <!-- Table -->
          <div class="tw-mt-4 tw-mb-4 tw-flex tw-flex-col" style="width: 99%">
            <BeeGridTable
                border
                :columns="dataTable.columnShow"
                :data="dataTable.data"
                :pageSize="dataTable.pageSize"
                :pageCount="dataTable.pageCount"
                :showPager="dataTable.showPager"
                class="radius12px hover:tw-overflow-x-scroll"
            >
              
            </BeeGridTable>
          </div>
          
          <!-- Create an Account Modal -->
          <transition name="theme-modal-fade" v-if="showCreateAnAccountModal">
            <div class="theme-modal-backdrop">
              <div class="theme-modal">
                <header class="base-padding tw-flex tw-flex-col tw-items-center tw-relative">
                  <span class="semibold24 grey10">Create An Account</span>
                  <div class="button-close tw-flex tw-flex-col tw-items-center medium16 tw-absolute tw-top-0 tw-right-0" style="width: fit-content" @click="doShowCreateAnAccountButton(false)">
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
                      buttonID="buttonCreateAnAccount"
                      buttonText="Create An Account"
                      buttonTextColor="white"
                      buttonBgColor="bg-blue5"
                      :callback="doRegister"
                  >
                  </base-button>
                </footer>
              </div>
            </div>
          </transition>
                
        </div>
      </div>
    </template>
  </layout-sidebar-navbar>
</template>

<script>
import { Icon } from '@iconify/vue2'
import { mapGetters, mapActions } from 'vuex'
import LayoutSidebarNavbar from '@/layouts/LayoutSidebarNavbar'
import BaseButton from '@/components/BaseButton'
import BaseTextInput from '@/components/BaseTextInput'
import BaseDropdown from '@/components/BaseDropdown'
import BaseFilterBox from '@/components/BaseFilterBox'

export default {
  name: 'ManageUsers',
  components: {
    Icon,
    LayoutSidebarNavbar,
    BaseButton,
    BaseTextInput,
    BaseDropdown,
    BaseFilterBox
  },
  data() {
    return {
      dataTable: {
        columnName: ['Employee ID','Name','Job Title','Job Division','Email','Phone Number'
          ,'Username','Password','Gender','Date of Birth','Properties'],
        columnShow: [
          { title: 'Employee ID', key: 'employeeID', align: 'left', resizable: true},
          { title: 'Name', key: 'name',align: 'left', resizable: true},
          { title: 'Job Title', key: 'jobTitle', align: 'left', resizable: true},
          { title: 'Job Division', key: 'division', align: 'left', resizable: true},
          { title: 'Email', key: 'email',align: 'left', resizable: true},
          { title: 'Phone Number', key: 'phoneNumber',align: 'left', resizable: true},
          { title: 'Username', key: 'username', align: 'left', resizable: true},
          { title: 'Password', key: 'password', align: 'left', resizable: true},
          { title: 'Gender', key: 'gender',align: 'left', resizable: true },
          { title: 'Date of Birth', key: 'dob',align: 'left', resizable: true},
          { title: 'Properties', key: 'properties',align: 'left', resizable: true},
        ],
        columnInitial: [
          { title: 'Employee ID', key: 'employeeID', align: 'left', resizable: true},
          { title: 'Name', key: 'name',align: 'left', resizable: true},
          { title: 'Job Title', key: 'jobTitle', align: 'left', resizable: true},
          { title: 'Job Division', key: 'division', align: 'left', resizable: true},
          { title: 'Email', key: 'email',align: 'left', resizable: true},
          { title: 'Phone Number', key: 'phoneNumber',align: 'left', resizable: true},
          { title: 'Username', key: 'username', align: 'left', resizable: true},
          { title: 'Password', key: 'password', align: 'left', resizable: true},
          { title: 'Gender', key: 'gender',align: 'left', resizable: true },
          { title: 'Date of Birth', key: 'dob',align: 'left', resizable: true},
          { title: 'Properties', key: 'properties',align: 'left', resizable: true},
        ],
        data: [
          { 
            employeeID: '61070501014', 
            name: 'Mr. Chanon Panarong',
            jobTitle: 'NOC',
            division: 'CAT THIX',
            email: 'chanon.peach@mail.com',
            phoneNumber: '(096) 111-2222',
            username: 'peach_chanon',
            password: '012345',
            gender: 'male',
            dob: '12/12/19'
          },
        ],
        pageSize: 10,
        pageCount: 1,
        showPager: true,
      },
      showContentForWindowSize: true,
      showCreateAnAccountModal: false,
      dataEditProfile: {
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
      this.showContentForWindowSize = window.innerWidth >= 768
    }
  },
  computed: {
    ...mapGetters(['windowResize'])
  },
  async mounted () {
    window.onresize = () => {
      this.flapWindowResize()
    }
    this.showContentForWindowSize = window.innerWidth >= 768
  },
  methods: {
    ...mapActions(['flapWindowResize']),
    doShowCreateAnAccountButton (state) {
      if(!this.showCreateAnAccountModal){
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
        this.showCreateAnAccountModal = state
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
        this.showCreateAnAccountModal = state
      }
    },
    inputUsername(username){
      this.dataEditProfile.username = username
      this.stateProfile.username = this.dataEditProfile.username !== '';
    },
    inputPassword(password){
      this.dataEditProfile.password = password
      this.stateProfile.password = this.dataEditProfile.password !== '';
      this.stateProfile.confirmPassword = this.dataEditProfile.confirmPassword === this.dataEditProfile.password;
    },
    inputConfirmPassword(confirmPassword){
      this.dataEditProfile.confirmPassword = confirmPassword
      if(this.dataEditProfile.password !== ''){
        this.stateProfile.confirmPasswordHaveValue = true
        this.stateProfile.confirmPassword = this.dataEditProfile.confirmPassword === this.dataEditProfile.password;
      }else{
        this.stateProfile.confirmPasswordHaveValue = false
      }
    },
    inputEmployeeID(employeeID){
      this.dataEditProfile.employeeID = employeeID
      this.stateProfile.employeeID = this.dataEditProfile.employeeID !== '';
    },
    inputGender(gender){
      this.dataEditProfile.gender = gender
      this.stateProfile.gender = this.dataEditProfile.gender !== '';
    },
    inputTitle(title){
      this.dataEditProfile.title = title
      this.stateProfile.title = this.dataEditProfile.title !== '';
    },
    inputFirstName(firstName){
      this.dataEditProfile.firstName = firstName
      this.stateProfile.firstName = this.dataEditProfile.firstName !== '';
    },
    inputLastName(lastName){
      this.dataEditProfile.lastName = lastName
      this.stateProfile.lastName = this.dataEditProfile.lastName !== '';
    },
    inputEmail(email){
      this.dataEditProfile.email = email
      this.stateProfile.email = this.dataEditProfile.email !== '';
    },
    inputDOB(dob){
      this.dataEditProfile.dob = dob
      this.stateProfile.dob = this.dataEditProfile.dob !== '';
    },
    inputPhoneNumber(phoneNumber){
      this.dataEditProfile.phoneNumber = phoneNumber
      console.log(phoneNumber)
      this.stateProfile.phoneNumber = this.dataEditProfile.phoneNumber !== '';
    },
    inputJob(job){
      this.dataEditProfile.jobTitle = job
      this.stateProfile.jobTitle = this.dataEditProfile.jobTitle !== '';
    },
    inputDivision(division){
      this.dataEditProfile.division = division
      this.stateProfile.division = this.dataEditProfile.division !== '';
    },
    doRegister(e){
      console.log(e)
      this.stateProfile.username = this.dataEditProfile.username !== '';
      this.stateProfile.password = this.dataEditProfile.password !== '';
      this.stateProfile.employeeID = this.dataEditProfile.employeeID !== '';
      this.stateProfile.gender = this.dataEditProfile.gender !== '';
      this.stateProfile.title = this.dataEditProfile.title !== '';
      this.stateProfile.firstName = this.dataEditProfile.firstName !== '';
      this.stateProfile.lastName = this.dataEditProfile.lastName !== '';
      this.stateProfile.email = this.dataEditProfile.email !== '';
      this.stateProfile.dob = this.dataEditProfile.dob !== '';
      this.stateProfile.phoneNumber = this.dataEditProfile.phoneNumber !== '';
      this.stateProfile.jobTitle = this.dataEditProfile.jobTitle !== '';
      this.stateProfile.division = this.dataEditProfile.division !== '';
      console.log(this.dataEditProfile)
    },
    doFilterColumn(value) {
      this.dataTable.columnShow = []
      if(value.length === 0 ) this.dataTable.columnShow = this.dataTable.columnInitial
      else {
        for (let i = 0; i < value.length; i++) {
          if(value[i]==='Employee ID') this.dataTable.columnShow[i] = this.dataTable.columnInitial[0]
          else if(value[i]==='Name') this.dataTable.columnShow[i] = this.dataTable.columnInitial[1]
          else if(value[i]==='Job Title') this.dataTable.columnShow[i] = this.dataTable.columnInitial[2]
          else if(value[i]==='Job Division') this.dataTable.columnShow[i] = this.dataTable.columnInitial[3]
          else if(value[i]==='Email') this.dataTable.columnShow[i] = this.dataTable.columnInitial[4]
          else if(value[i]==='Phone Number') this.dataTable.columnShow[i] = this.dataTable.columnInitial[5]
          else if(value[i]==='Username') this.dataTable.columnShow[i] = this.dataTable.columnInitial[6]
          else if(value[i]==='Password') this.dataTable.columnShow[i] = this.dataTable.columnInitial[7]
          else if(value[i]==='Gender') this.dataTable.columnShow[i] = this.dataTable.columnInitial[8]
          else this.dataTable.columnShow[i] = this.dataTable.columnInitial[9] // Date of Birth
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.content-height{
  //height: 85vh;
}
.button-blue{
  color: #102A43;
  padding: 0.75rem;
  transition: all .1s ease-in;
  border-radius: 12px;
  margin: 0.25rem 0;
  cursor: pointer;
  box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.1);
}
.button-blue:hover{
  color: #4098D7;
  background-color: white;
  box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.1);
  width: 100%;
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