<template>
  <layout-sidebar-navbar page="manageUsers">
    <template #content>
      <div class="bg-grey1 tw-h-full sm:tw-p-2 tw-w-full card">
        <div class="base-margin tw-flex tw-flex-row tw-items-center">
          <Icon class="semibold24 icon blue10" icon="heroicons-outline:user-group"/>
          <span class="semibold24 blue10 tw-pl-1">Manage Users</span>
        </div>
        <div class="box bg-white tw-w-full">
          <div class="tw-flex tw-flex-row tw-justify-between tw-items-center">
            <!-- Filter Box -->
            <div class="tw-pr-4" :class="{'tw-w-full': !StateShowContentForWindowSize, 'tw-w-2/5':StateShowContentForWindowSize}">
              <base-filter-box 
                  :propOptions="dataTable.columnName"
                  propBlankDataText= "Column: Show All"
                  @callbackDataFilter="doFilterColumn"
              ></base-filter-box>
            </div>
            <div class="">
              <div class="button-blue tw-flex tw-flex-row tw-items-center medium16" @click="doShowRenameButton(true)" style="width: fit-content">
                <span v-if="StateShowContentForWindowSize" class="tw-mt-0.5 tw-mr-3 tw-ml-2">Create an Account</span>
                <Icon class="icon semibold24" icon="heroicons-outline:plus"/>
              </div>
            </div>
          </div>
          <!-- Table -->
          <div class="tw-mt-4 tw-mb-4 tw-flex tw-flex-col tw-w-full table">
            <BeeGridTable
                border
                stripe
                :columns="dataTable.columnShow"
                :data="user"
                :pageSize="dataTable.pageSize"
                :pageCount="dataTable.pageCount"
                :showPager="dataTable.showPager"
                class="radius12px hover:tw-overflow-x-scroll"
            >
              
            </BeeGridTable>
          </div>
          
          <!-- Create an Account Modal -->
          <transition name="theme-modal-fade" v-if="stateShowCreateAnAccountModal">
            <div class="theme-modal-backdrop">
              <div class="theme-modal">
                <header class="base-padding tw-flex tw-flex-col tw-items-center tw-relative">
                  <span class="semibold24 grey10">Create An Account</span>
                  <div class="button-close tw-flex tw-flex-col tw-items-center medium16 tw-absolute tw-top-0 tw-right-0" style="width: fit-content" @click="doShowRenameButton(false)">
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
<!--                    <div class="tw-flex tw-flex-col tw-items-start sm:tw-w-2/3 sm:tw-mr-1" style="width: 100%">-->
<!--                      <span class="grey10 medium16 tw-my-3 tw-ml-1">Employee ID</span>-->
<!--                      <div class="tw-w-full">-->
<!--                        <base-text-input-->
<!--                            type="text"-->
<!--                            placeholder="Enter employee id"-->
<!--                            @callBackString="inputEmployeeID"-->
<!--                        ></base-text-input>-->
<!--                      </div>-->
<!--                      <div class="tw-w-full tw-flex tw-flex-col tw-items-start" v-if="!stateProfile.employeeID">-->
<!--                        <span class="red5 medium14 tw-my-2" >* Enter employee id</span>-->
<!--                      </div>-->
<!--                    </div>-->
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
                    <div class="tw-flex tw-flex-col tw-items-start sm:tw-w-1/2 sm:tw-ml-1" style="width: 100%">
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
                            v-bind:optionsList="[{option:'NOC Engineer'},{option:'Network Admin'},{option:'Superuser'}]"
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
                            v-bind:optionsList="[{option:'National Telecom Public Company Limited บางรัก'},{option:'CAT-THIX'}]"
                            @valueSelected="inputDivision"
                        ></base-dropdown>
                      </div>
                      <div class="tw-w-full tw-flex tw-flex-col tw-items-start" v-if="!stateProfile.division_id">
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
import axios from 'axios'

export default {
  name: 'ManageUsers',
  components: {
    Icon,
    LayoutSidebarNavbar,
    BaseButton,
    BaseTextInput,
    BaseDropdown,
    BaseFilterBox,
  },
  data() {
    return {
      user: [],
      dataTable: {
        columnName: ['Title', 'First Name','Last Name','Gender', 
          'Username','Email','Date of Birth','Phone Number','Division ID', 'Role ID', 'Activated', 'Profile Picture'],
        columnShow: [
          // { title: 'Employee ID', key: 'employee_id', align: 'left', resizable: true, width: 350},
          { title: 'Title', key: 'title',align: 'left', resizable: true, width: 70},
          { title: 'First Name', key: 'first_name', align: 'left', resizable: true, width: 150},
          { title: 'Last Name', key: 'last_name', align: 'left', resizable: true, width: 150},
          { title: 'Gender', key: 'gender', align: 'left', resizable: true, width: 70},
          { title: 'Username', key: 'username', align: 'left', resizable: true, width: 150},
          // { title: 'Password', key: 'password', align: 'left', resizable: true, width: 550},
          { title: 'Email', key: 'email',align: 'left', resizable: true, width: 300},
          { title: 'Date of Birth', key: 'birth_date',align: 'left', resizable: true, width: 300, type: "date",
            dateType: "datetime", format: "yyyy-MM-dd"},
          { title: 'Phone Number', key: 'phone_number',align: 'left', resizable: true, width: 150},
          { title: 'Division ID', key: 'division_id',align: 'left', resizable: true, width: 150},
          { title: 'Role ID', key: 'role_id',align: 'left', resizable: true, width: 150},
          {title: 'Activated', key: 'activated',align: 'left', resizable: true, width: 150}, 
          { title: 'Profile Picture', key: 'profile_pic',align: 'left', resizable: true, width: 150},
        ],
        columnInitial: [
          // { title: 'Employee ID', key: 'employee_id', align: 'left', resizable: true, width: 350},
          { title: 'Title', key: 'title',align: 'left', resizable: true, width: 70},
          { title: 'First Name', key: 'first_name', align: 'left', resizable: true, width: 150},
          { title: 'Last Name', key: 'last_name', align: 'left', resizable: true, width: 150},
          { title: 'Gender', key: 'gender', align: 'left', resizable: true, width: 70},
          { title: 'Username', key: 'username', align: 'left', resizable: true, width: 150},
          // { title: 'Password', key: 'password', align: 'left', resizable: true, width: 550},
          { title: 'Email', key: 'email',align: 'left', resizable: true, width: 300},
          { title: 'Date of Birth', key: 'birth_date',align: 'left', resizable: true, width: 300},
          { title: 'Phone Number', key: 'phone_number',align: 'left', resizable: true, width: 150},
          { title: 'Division ID', key: 'division_id',align: 'left', resizable: true, width: 150},
          { title: 'Role ID', key: 'role_id',align: 'left', resizable: true, width: 150},
          {title: 'Activated', key: 'activated',align: 'left', resizable: true, width: 150},
          { title: 'Profile Picture', key: 'profile_pic',align: 'left', resizable: true, width: 150},
        ],
        data: [],
        pageSize: 5,
        pageCount: 5,
        showPager: true,
      },
      StateShowContentForWindowSize: true,
      stateShowCreateAnAccountModal: false,
      stateCreateAnAccount: {
        username: '', password: '', confirmPassword: '', 
        // employeeID: '', 
        gender: '', title: '', first_name: '', last_name: '', email: '', birth_date: '', 
        phone_number: '', role_id: '', division_id: '', profile_pic:'string.jpg'
      },
      stateProfile: {
        username: Boolean,
        password: Boolean, confirmPassword: Boolean, confirmPasswordHaveValue: false,
        // employeeID: Boolean, 
        gender: Boolean,
        title: Boolean, first_name: Boolean, last_name: Boolean,
        email: Boolean, birth_date: Boolean, phone_number: Boolean, role_id: Boolean, division_id: Boolean
      }
    }
  },
  watch:{
    windowResize () {
      this.StateShowContentForWindowSize = window.innerWidth >= 768
    }
  },
  computed: {
    ...mapGetters(['windowResize']),
  },
  async mounted () {
    window.onresize = () => {
      this.flapWindowResize()
    }
    this.StateShowContentForWindowSize = window.innerWidth >= 768
    axios.get('http://localhost:4000/api/User').then(
    (response)=>{
      this.user = response.data
    })
  },
  methods: {
    ...mapActions(['flapWindowResize']),
    doShowRenameButton (state) {
      if(!this.stateShowCreateAnAccountModal){
        this.stateProfile.username = true
        this.stateProfile.password = true
        this.stateProfile.confirmPasswordHaveValue = false
        // this.stateProfile.employeeID = true
        this.stateProfile.gender = true
        this.stateProfile.title = true
        this.stateProfile.first_name = true
        this.stateProfile.last_name = true
        this.stateProfile.email = true
        this.stateProfile.birth_date = true
        this.stateProfile.phone_number = true
        this.stateProfile.role_id = true
        this.stateProfile.division_id = true
        this.stateShowCreateAnAccountModal = state
      }else{
        this.stateProfile.username = false
        this.stateProfile.password = false
        this.stateProfile.confirmPasswordHaveValue = false
        // this.stateProfile.employeeID = false
        this.stateProfile.gender = false
        this.stateProfile.title = false
        this.stateProfile.first_name = false
        this.stateProfile.last_name = false
        this.stateProfile.email = false
        this.stateProfile.birth_date = false
        this.stateProfile.phone_number = false
        this.stateProfile.role_id = false
        this.stateProfile.division_id = false
        this.stateShowCreateAnAccountModal = state
      }
    },
    inputUsername(username){
      this.stateCreateAnAccount.username = username
      this.stateProfile.username = this.stateCreateAnAccount.username !== '';
    },
    inputPassword(password){
      this.stateCreateAnAccount.password = password
      this.stateProfile.password = this.stateCreateAnAccount.password !== '';
      this.stateProfile.confirmPassword = this.stateCreateAnAccount.confirmPassword === this.stateCreateAnAccount.password;
    },
    inputConfirmPassword(confirmPassword){
      this.stateCreateAnAccount.confirmPassword = confirmPassword
      if(this.stateCreateAnAccount.password !== ''){
        this.stateProfile.confirmPasswordHaveValue = true
        this.stateProfile.confirmPassword = this.stateCreateAnAccount.confirmPassword === this.stateCreateAnAccount.password;
      }else{
        this.stateProfile.confirmPasswordHaveValue = false
      }
    },
    // inputEmployeeID(employeeID){
    //   this.stateCreateAnAccount.employeeID = employeeID
    //   this.stateProfile.employeeID = this.stateCreateAnAccount.employeeID !== '';
    // },
    inputGender(gender){
      this.stateCreateAnAccount.gender = gender
      this.stateProfile.gender = this.stateCreateAnAccount.gender !== '';
    },
    inputTitle(title){
      this.stateCreateAnAccount.title = title
      this.stateProfile.title = this.stateCreateAnAccount.title !== '';
    },
    inputFirstName(first_name){
      this.stateCreateAnAccount.first_name = first_name
      this.stateProfile.first_name = this.stateCreateAnAccount.first_name !== '';
    },
    inputLastName(last_name){
      this.stateCreateAnAccount.last_name = last_name
      this.stateProfile.last_name = this.stateCreateAnAccount.last_name !== '';
    },
    inputEmail(email){
      this.stateCreateAnAccount.email = email
      this.stateProfile.email = this.stateCreateAnAccount.email !== '';
    },
    inputDOB(birth_date){
      const date = new Date(birth_date) //แปลง string เป็น Date
      this.stateCreateAnAccount.birth_date = date.toISOString() // แปลง Dateในรูปแบบของ IsoString ทำให้ส่ง api ได้ !!!
      this.stateProfile.birth_date = this.stateCreateAnAccount.birth_date !== '';
    },
    inputPhoneNumber(phone_number){
      this.stateCreateAnAccount.phone_number = phone_number
      console.log(phone_number)
      this.stateProfile.phone_number = this.stateCreateAnAccount.phone_number !== '';
    },
    inputJob(role_id){
      this.stateCreateAnAccount.role_id = role_id
      this.stateProfile.role_id = this.stateCreateAnAccount.role_id !== '';
    },
    inputDivision(division_id){
      this.stateCreateAnAccount.division_id = division_id
      this.stateProfile.division_id = this.stateCreateAnAccount.division_id !== '';
    },
    // doRegister(e){
    //   console.log(e)
    //   this.stateProfile.username = this.stateCreateAnAccount.username !== '';
    //   this.stateProfile.password = this.stateCreateAnAccount.password !== '';
    //   this.stateProfile.employeeID = this.stateCreateAnAccount.employeeID !== '';
    //   this.stateProfile.gender = this.stateCreateAnAccount.gender !== '';
    //   this.stateProfile.title = this.stateCreateAnAccount.title !== '';
    //   this.stateProfile.firstName = this.stateCreateAnAccount.firstName !== '';
    //   this.stateProfile.lastName = this.stateCreateAnAccount.lastName !== '';
    //   this.stateProfile.email = this.stateCreateAnAccount.email !== '';
    //   this.stateProfile.dob = this.stateCreateAnAccount.dob !== '';
    //   this.stateProfile.phoneNumber = this.stateCreateAnAccount.phoneNumber !== '';
    //   this.stateProfile.jobTitle = this.stateCreateAnAccount.jobTitle !== '';
    //   this.stateProfile.division = this.stateCreateAnAccount.division !== '';
    //   console.log(this.stateCreateAnAccount)
    // },
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
    },
    async doRegister(){
      this.stateProfile.username = this.stateCreateAnAccount.username !== '';
      this.stateProfile.password = this.stateCreateAnAccount.password !== '';
      this.stateProfile.gender = this.stateCreateAnAccount.gender !== '';
      this.stateProfile.title = this.stateCreateAnAccount.title !== '';
      this.stateProfile.first_name = this.stateCreateAnAccount.first_name !== '';
      this.stateProfile.last_name = this.stateCreateAnAccount.last_name !== '';
      this.stateProfile.email = this.stateCreateAnAccount.email !== '';
      this.stateProfile.birth_date = this.stateCreateAnAccount.birth_date !== '';
      this.stateProfile.phone_number = this.stateCreateAnAccount.phone_number !== '';
      this.stateProfile.role_id = this.stateCreateAnAccount.role_id !== '';
      this.stateProfile.division_id = this.stateCreateAnAccount.division_id !== '';
      console.log(this.stateCreateAnAccount)
      try{
        const response = await axios.post('http://localhost:4000/api/User/Register', {
          username :this.stateCreateAnAccount.username,
          password:this.stateCreateAnAccount.password,
          gender:this.stateCreateAnAccount.gender,
          title:this.stateCreateAnAccount.title,
          first_name:this.stateCreateAnAccount.first_name,
          last_name:this.stateCreateAnAccount.last_name,
          email:this.stateCreateAnAccount.email,
          birth_date:this.stateCreateAnAccount.birth_date,
          phone_number:this.stateCreateAnAccount.phone_number,
          role_id: this.stateCreateAnAccount.role_id,
          division_id: this.stateCreateAnAccount.division_id,
          profile_pic: this.stateCreateAnAccount.profile_pic
        })
        if(response.status===200 && response.data) {
          console.log(response.status)
          this.$router.push('/')
        }
      }catch (error){
        console.log(error)
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.card{
  max-width: 1400px;
}
.table{
  max-width: 98%;
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