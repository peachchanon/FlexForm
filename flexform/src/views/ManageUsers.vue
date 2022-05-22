<template>
  <layout-sidebar-navbar page="manageUsers">
    <template #content>
      <div class="bg-grey1 tw-h-full sm:tw-p-2 tw-w-full card">
        <!-- Header -->
        <div class="base-margin tw-flex tw-flex-row tw-items-center">
          <Icon class="semibold24 icon blue10" icon="heroicons-outline:user-group"/>
          <span class="semibold24 blue10 tw-pl-1">Manage Users</span>
        </div>
        <!-- Manage User -->
        <div class="bg-white base-shadow radius12px base-padding">
          <!-- Header -->
          <div class="tw-flex tw-flex-row tw-justify-end tw-items-center">
            <div class="button-blue tw-flex tw-flex-row tw-items-center medium16" style="width: fit-content" @click="openCreateModal">
              <span class="tw-mt-0.5 tw-mr-3 tw-ml-2">Create an Account</span>
              <Icon class="icon semibold24" icon="heroicons-outline:plus"/>
            </div>
          </div>
          <!-- Table -->
          <div class="tw-mt-3 tw-mb-3 tw-w-full" style="height: 600px;">
            <vue-good-table
                :line-numbers="true"
                :pagination-options="{
                  enabled: true
                }"
                :columns="ManageUsersTable.Columns"
                :rows="ManageUsersTable.Rows"
                :search-options="{
                  enabled: true,
                  placeholder: 'Search data',
                }"
                max-height="500px"
                @on-row-click="openDetailModal"
            ></vue-good-table>
          </div>
        </div>
      </div>
      <!-- Detail Row Modal -->
      <transition name="theme-modal-fade" v-if="StateShowDetailModal">
        <div class="theme-modal-backdrop">
          <div class="theme-modal">
            <header class="base-padding tw-flex tw-flex-row tw-items-center tw-justify-start tw-relative">
              <div class="tw-flex tw-flex-row tw-items-center">
                <Icon class="semibold32 icon blue10 tw-pr-1 tw-mx-1 " icon="heroicons-outline:user-group"/>
                <label class="semibold24 blue10">Detail</label>
              </div>
              <div class="button__close tw-absolute tw-right-0" @click="closeDetailModal">
                <Icon class="semibold24" icon="heroicons-outline:x"/>
              </div>
            </header>
            <section class="tw-pl-3 tw-pr-3 tw-pt-3 tw-pb-3 tw-overflow-x-hidden tw-border-2 radius10px tw-ml-3 tw-mr-3 tw-mb-3 tw-relative" >
              <div @click="openDeleteModal" class="tw-py-3 tw-px-5 radius10px red5 hover:tw-text-red4 tw-transition tw-ease-in tw-cursor-pointer tw-bg-white hover:tw-shadow-base tw-flex tw-flex-row tw-items-center tw-absolute tw-right-3 tw-top-2" style="width: fit-content">
                <Icon class="semibold24" icon="heroicons-outline:trash"/>
                <span class="medium16 tw-ml-2">Delete</span>
              </div>
              <!--<div class="tw-mr-2 tw-py-3 tw-px-5 radius10px blue10 hover:tw-text-blue5 tw-transition tw-ease-in tw-cursor-pointer tw-bg-white hover:tw-shadow-base tw-flex tw-flex-row tw-items-center tw-absolute tw-top-2" style="width: fit-content; right:130px">
                <Icon class="semibold24" icon="heroicons-outline:pencil-alt"/>
                <span class="medium16 tw-ml-2">Edit</span>
              </div>-->
              <div class="tw-flex tw-flex-row tw-mb-3 tw-pl-3 tw-pr-3">
                <div class="tw-w-1/3">
                  <span class="medium16 blue10">Title</span>
                </div>
                <div class="tw-w-2/3">
                  <span class="medium16 grey8" v-if="ManageUsersTable.Rows[SelectUserIndexRow].title">{{ ManageUsersTable.Rows[SelectUserIndexRow].title }}</span>
                  <span class="medium16 grey5" v-if="!ManageUsersTable.Rows[SelectUserIndexRow].title"> - </span>
                </div>
              </div>
              <div class="tw-flex tw-flex-row tw-mb-3 tw-pl-3 tw-pr-3">
                <div class="tw-w-1/3">
                  <span class="medium16 blue10">First Name</span>
                </div>
                <div class="tw-w-2/3">
                  <span class="medium16 grey8" v-if="ManageUsersTable.Rows[SelectUserIndexRow].first_name">{{ ManageUsersTable.Rows[SelectUserIndexRow].first_name }}</span>
                  <span class="medium16 grey5" v-if="!ManageUsersTable.Rows[SelectUserIndexRow].first_name"> - </span>
                </div>
              </div>
              <div class="tw-flex tw-flex-row tw-mb-3 tw-pl-3 tw-pr-3">
                <div class="tw-w-1/3">
                  <span class="medium16 blue10">Last Name</span>
                </div>
                <div class="tw-w-2/3">
                  <span class="medium16 grey8" v-if="ManageUsersTable.Rows[SelectUserIndexRow].last_name">{{ ManageUsersTable.Rows[SelectUserIndexRow].last_name }}</span>
                  <span class="medium16 grey5" v-if="!ManageUsersTable.Rows[SelectUserIndexRow].last_name"> - </span>
                </div>
              </div>
              <div class="tw-flex tw-flex-row tw-mb-3 tw-pl-3 tw-pr-3">
                <div class="tw-w-1/3">
                  <span class="medium16 blue10">Username</span>
                </div>
                <div class="tw-w-2/3">
                  <span class="medium16 grey8" v-if="ManageUsersTable.Rows[SelectUserIndexRow].username">{{ ManageUsersTable.Rows[SelectUserIndexRow].username }}</span>
                  <span class="medium16 grey5" v-if="!ManageUsersTable.Rows[SelectUserIndexRow].username"> - </span>
                </div>
              </div>
              <div class="tw-flex tw-flex-row tw-mb-3 tw-pl-3 tw-pr-3">
                <div class="tw-w-1/3">
                  <span class="medium16 blue10">Email</span>
                </div>
                <div class="tw-w-2/3">
                  <span class="medium16 grey8" v-if="ManageUsersTable.Rows[SelectUserIndexRow].email">{{ ManageUsersTable.Rows[SelectUserIndexRow].email }}</span>
                  <span class="medium16 grey5" v-if="!ManageUsersTable.Rows[SelectUserIndexRow].email"> - </span>
                </div>
              </div>
              <div class="tw-flex tw-flex-row tw-mb-3 tw-pl-3 tw-pr-3">
                <div class="tw-w-1/3">
                  <span class="medium16 blue10">Date of Birth</span>
                </div>
                <div class="tw-w-2/3">
                  <span class="medium16 grey8" v-if="ManageUsersTable.Rows[SelectUserIndexRow].birth_date">{{ ManageUsersTable.Rows[SelectUserIndexRow].birth_date }}</span>
                  <span class="medium16 grey5" v-if="!ManageUsersTable.Rows[SelectUserIndexRow].birth_date"> - </span>
                </div>
              </div>
              <div class="tw-flex tw-flex-row tw-mb-3 tw-pl-3 tw-pr-3">
                <div class="tw-w-1/3">
                  <span class="medium16 blue10">Gender</span>
                </div>
                <div class="tw-w-2/3">
                  <span class="medium16 grey8" v-if="ManageUsersTable.Rows[SelectUserIndexRow].gender">{{ ManageUsersTable.Rows[SelectUserIndexRow].gender }}</span>
                  <span class="medium16 grey5" v-if="!ManageUsersTable.Rows[SelectUserIndexRow].gender"> - </span>
                </div>
              </div>
              <div class="tw-flex tw-flex-row tw-mb-3 tw-pl-3 tw-pr-3">
                <div class="tw-w-1/3">
                  <span class="medium16 blue10">Phone</span>
                </div>
                <div class="tw-w-2/3">
                  <span class="medium16 grey8" v-if="ManageUsersTable.Rows[SelectUserIndexRow].phone_number">{{ ManageUsersTable.Rows[SelectUserIndexRow].phone_number }}</span>
                  <span class="medium16 grey5" v-if="!ManageUsersTable.Rows[SelectUserIndexRow].phone_number"> - </span>
                </div>
              </div>
              <div class="tw-flex tw-flex-row tw-mb-3 tw-pl-3 tw-pr-3">
                <div class="tw-w-1/3">
                  <span class="medium16 blue10">Division Id</span>
                </div>
                <div class="tw-w-2/3">
                  <span class="medium16 grey8" v-if="ManageUsersTable.Rows[SelectUserIndexRow].division_id">{{ ManageUsersTable.Rows[SelectUserIndexRow].division_id }}</span>
                  <span class="medium16 grey5" v-if="!ManageUsersTable.Rows[SelectUserIndexRow].division_id"> - </span>
                </div>
              </div>
              <div class="tw-flex tw-flex-row tw-mb-3 tw-pl-3 tw-pr-3">
                <div class="tw-w-1/3">
                  <span class="medium16 blue10">Role ID</span>
                </div>
                <div class="tw-w-2/3">
                  <span class="medium16 grey8" v-if="ManageUsersTable.Rows[SelectUserIndexRow].role_id">{{ ManageUsersTable.Rows[SelectUserIndexRow].role_id }}</span>
                  <span class="medium16 grey5" v-if="!ManageUsersTable.Rows[SelectUserIndexRow].role_id"> - </span>
                </div>
              </div>
              <div class="tw-flex tw-flex-row tw-mb-3 tw-pl-3 tw-pr-3">
                <div class="tw-w-1/3">
                  <span class="medium16 blue10">Activated</span>
                </div>
                <div class="tw-w-2/3">
                  <span class="medium16 grey8" v-if="ManageUsersTable.Rows[SelectUserIndexRow].activated">{{ ManageUsersTable.Rows[SelectUserIndexRow].activated }}</span>
                  <span class="medium16 grey5" v-if="!ManageUsersTable.Rows[SelectUserIndexRow].activated"> - </span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </transition>
      <!-- Delete Row Modal -->
      <transition name="theme-modal-fade" v-if="StateShowDeleteModal">
        <div class="theme-modal-backdrop">
          <div class="theme-modal-small">
            <header class="base-padding tw-flex tw-flex-row tw-items-center tw-justify-start tw-relative">
              <Icon class="icon__style__large tw-mr-2 red5" icon="heroicons-outline:trash"/>
              <span class="semibold24 red5">Delete Account ?</span>
            </header>
            <section class="tw-pl-3 tw-pr-3 tw-py-4 tw-overflow-x-hidden">
              <span class="medium16 grey10">You're about to delete account.</span>
            </section>
            <footer class="tw-p-2.5 tw-flex tw-flex-row tw-justify-end" style="max-height: 400px">
              <div class="tw-w-1/3 tw-mr-1" style="width: 100%; max-width: 150px">
                <div class="button__style__white red" @click="closeDeleteModal">No</div>
              </div>
              <div class="tw-w-1/3 tw-ml-1" style="width: 100%; max-width: 150px">
                <div class="button__style__red" @click="doDeleteAccount">Yes</div>
              </div>
            </footer>
          </div>
        </div>
      </transition>
      <!-- Create User Modal -->
      <transition name="theme-modal-fade" v-if="StateShowCreateAnAccountModal">
        <div class="theme-modal-backdrop">
          <div class="theme-modal">
            <header class="base-padding tw-flex tw-flex-col tw-items-center tw-relative">
              <span class="semibold24 grey10">Create An Account</span>
              <div class="button-close tw-flex tw-flex-col tw-items-center medium16 tw-absolute tw-top-0 tw-right-0" style="width: fit-content" @click="closeCreateModal">
                <Icon class="icon semibold24" icon="heroicons-outline:x"/>
              </div>
            </header>
            <section class="base-padding tw-overflow-x-hidden" style="max-height:500px">
              <div class="tw-flex tw-flex-col tw-items-start">
                <span class="grey10 medium16 tw-my-3 tw-ml-1">Username</span>
                <div class="tw-w-full">
                  <base-text-input
                      type="text"
                      placeholder="Enter username"
                      @callBackString="inputCreateUsername"
                  ></base-text-input>
                </div>
                <div class="tw-w-full tw-flex tw-flex-col tw-items-start" v-if="UserRegister.username===''">
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
                        @callBackString="inputCreatePassword"
                    ></base-text-input>
                  </div>
                  <div class="tw-w-full tw-flex tw-flex-col tw-items-start" v-if="UserRegister.password===''">
                    <span class="red5 medium14 tw-my-2" >* Enter password</span>
                  </div>
                </div>
                <div class="tw-flex tw-flex-col tw-items-start sm:tw-w-1/2 sm:tw-ml-1" style="width: 100%">
                  <span class="grey10 medium16 tw-my-3 tw-ml-1">Confirm Password</span>
                  <div class="tw-w-full">
                    <base-text-input
                        type="password"
                        placeholder="Confirm password"
                        @callBackString="inputCreateConfirmPassword"
                    ></base-text-input>
                  </div>
                  <div class="tw-w-full tw-flex tw-flex-col tw-items-start" v-if="UserRegisterConfirmPassword!==UserRegister.password && UserRegisterConfirmPassword!=='' ">
                    <span class="red5 medium14 tw-my-2" >* Password did't match</span>
                  </div>
                  <div class="tw-w-full tw-flex tw-flex-col tw-items-start" v-if="UserRegisterConfirmPassword===UserRegister.password && UserRegisterConfirmPassword!=='' ">
                    <div class="tw-flex tw-flex-row tw-items-center">
                      <Icon class="icon green5 medium14 tw-my-2 tw-mr-2" icon="heroicons-outline:check"/>
                      <span class="green5 medium14 tw-my-2" >Password did match</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tw-flex tw-flex-col tw-justify-between tw-w-full">
                <span class="grey10 medium16 tw-my-3 tw-ml-1">Gender</span>
                <div class="tw-w-full">
                  <base-dropdown
                      placeholder="Select Gender"
                      v-bind:optionsList="Gender"
                      @valueSelected="inputCreateGender"
                  ></base-dropdown>
                </div>
                <div class="tw-w-full tw-flex tw-flex-col tw-items-start" v-if="UserRegister.gender===''">
                  <span class="red5 medium14 tw-my-2" >* Select Gender</span>
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
                            v-bind:optionsList="Title"
                            @valueSelected="inputCreateTitle"
                            class="tw-w-full"
                        ></base-dropdown>
                      </div>
                      <div class="tw-w-full tw-flex tw-flex-col tw-items-start">
                        <span class="red5 medium14 tw-my-2" >* Select Title</span>
                      </div>
                    </div>
                    <div class="tw-w-full sm:tw-ml-1" style="width: 100%">
                      <base-text-input
                          type="text"
                          placeholder="Enter first name"
                          @callBackString="inputCreateFirstName"
                          class="tw-w-full"
                      ></base-text-input>
                      <div class="tw-w-full tw-flex tw-flex-col tw-items-start">
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
                        @callBackString="inputCreateLastName"
                    ></base-text-input>
                  </div>
                  <div class="tw-w-full tw-flex tw-flex-col tw-items-start">
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
                        @callBackString="inputCreateEmail"
                    ></base-text-input>
                  </div>
                  <div class="tw-w-full tw-flex tw-flex-col tw-items-start" v-if="UserRegister.email===''">
                    <span class="red5 medium14 tw-my-2" >* Enter Email</span>
                  </div>
                </div>
                <div class="tw-flex tw-flex-col tw-items-start sm:tw-w-1/2 sm:tw-ml-1" style="width: 100%">
                  <span class="grey10 medium16 tw-my-3 tw-ml-1">Date of Birth</span>
                  <div class="tw-w-full">
                    <base-text-input
                        type="date"
                        placeholder="dd/mm/yyyy"
                        @callBackDate="inputCreateDOB"
                    ></base-text-input>
                  </div>
                  <div class="tw-w-full tw-flex tw-flex-col tw-items-start" v-if="UserRegister.birth_date===''">
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
                        @callBackString="inputCreatePhoneNumber"
                    ></base-text-input>
                  </div>
                  <div class="tw-w-full tw-flex tw-flex-col tw-items-start" v-if="UserRegister.phone_number===''">
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
                        v-bind:optionsList="Role"
                        @valueSelected="inputCreateJob"
                    ></base-dropdown>
                  </div>
                  <div class="tw-w-full tw-flex tw-flex-col tw-items-start" v-if="UserRegister.role_id===''">
                    <span class="red5 medium14 tw-my-2" >* Enter Job</span>
                  </div>
                </div>
                <div class="tw-flex tw-flex-col tw-items-start sm:tw-w-1/2 sm:tw-ml-1" style="width: 100%">
                  <span class="grey10 medium16 tw-my-3 tw-ml-1">Division</span>
                  <div class="tw-w-full">
                    <base-dropdown
                        placeholder="Select division"
                        v-bind:optionsList="Division"
                        @valueSelected="inputCreateDivision"
                    ></base-dropdown>
                  </div>
                  <div class="tw-w-full tw-flex tw-flex-col tw-items-start" v-if="UserRegister.division_id===''">
                    <span class="red5 medium14 tw-my-2" >* Enter Division</span>
                  </div>
                </div>
              </div>
              <span class="red5 medium16" v-if="StateCheckUsername">* Couldn't create an account, Because there's your username in database.</span>
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
    </template>
  </layout-sidebar-navbar>
</template>

<script>

import { Icon } from '@iconify/vue2'
import LayoutSidebarNavbar from '@/layouts/LayoutSidebarNavbar'
import { mapActions, mapGetters } from 'vuex'
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table'
import BaseTextInput from '@/components/BaseTextInput'
import BaseDropdown from '@/components/BaseDropdown'
import BaseButton from '@/components/BaseButton'
import axios from 'axios'

export default {
  name: "ManageUsersFix.vue",
  components: {
    LayoutSidebarNavbar,
    Icon,
    VueGoodTable,
    BaseTextInput,
    BaseDropdown,
    BaseButton,
  },
  data() {
    return {
      KeyComponent: 0,
      StateShowContentForWindowSize: true,
      ManageUsersData: [],
      ManageUsersTable: {
        Columns: [
          { label: 'Title', field: 'title', width: '100px', },
          { label: 'First Name', field: 'first_name', width: '150px' },
          { label: 'Last Name', field: 'last_name', width: '150px' },
          { label: 'Username', field: 'username', width: '150px' },
          { label: 'Email', field: 'email', width: '200px' },
          { label: 'Date of Birth', field: 'birth_date', width: '150px', },
          { label: 'Gender', field: 'gender', width: '80px', },
          { label: 'Phone Number', field: 'phone_number', width: '150px' },
          { label: 'Division', field: 'division_id', width: '150px' },
          { label: 'Role', field: 'role_id', width: '100px' },
          { label: 'Activated', field: 'activated', width: '150px' },
        ],
        Rows: [],
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

      // Detail
      StateShowDetailModal: false,
      SelectUserIndexRow: 0,
      SelectUserId: '',
      // Create
      StateShowCreateAnAccountModal: false,
      UserRegisterConfirmPassword: '',
      UserRegister: {
        username: '',
        password: '',
        gender: '',
        title: '',
        first_name: '',
        last_name: '',
        email: '',
        birth_date: '',
        phone_number: '',
        role_id: '',
        division_id: '',
      },
      StateCheckUsername: false,
      // Delete
      StateShowDeleteModal: false,
    }
  },
  watch: {
    windowResize () {
      this.StateShowContentForWindowSize = window.innerWidth >= 768
    }
  },
  computed: {
    ...mapGetters(['windowResize']),
  },
  async mounted() {
    window.onresize=()=> {this.flapWindowResize()}
    this.StateShowContentForWindowSize = window.innerWidth >= 768
    await axios.get('http://localhost:4000/api/User')
        .then((response)=>{
          if(response.status === 200 && response.data){
            console.log('Import User Complete!')
            this.ManageUsersData = response.data
          }
        })
    // Create Row in Table
    this.ManageUsersData.forEach(
        (user)=>{
          // Change Value
          let title = new String
          let birthDay = new Date
          let gender = new String
          let role = new String
          let division = new String
          title = this.Title.find(item=>item.id===user.title).option
          birthDay = user.birth_date.replace('T00:00:00','')
          gender = this.Gender.find(item=>item.id===user.gender).option
          role = this.Role.find(item=>item.id===user.role_id).option
          division = this.Division.find(item=>item.id===user.division_id).option
          // Push
          this.ManageUsersTable.Rows.push({
            employee_id: user.employee_id,
            title: title,
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
            email: user.email,
            birth_date: birthDay,
            gender: gender,
            phone_number: user.phone_number,
            division_id: division,
            role_id: role,
            activated: user.activated,
          })
        }
    )
    console.log(this.ManageUsersData)
  },
  methods: {
    updateComponent(){
      this.KeyComponent = this.KeyComponent + 1
    },
    ...mapActions(['flapWindowResize']),
    openDetailModal(params){
      this.UserRegister = {
        username: '',
        password: '',
        gender: '',
        title: '',
        first_name: '',
        last_name: '',
        email: '',
        birth_date: '',
        phone_number: '',
        role_id: '',
        division_id: '',
      }
      this.SelectUserId = params.row.employee_id
      this.SelectUserIndexRow = params.pageIndex
      this.StateShowDetailModal = true
    },
    // Create
    closeDetailModal(){
      this.StateShowDetailModal = false
    },
    openCreateModal(){
      this.updateComponent()
      this.StateShowCreateAnAccountModal = true
      this.UserRegister = {
        username: '',
        password: '',
        gender: '',
        title: '',
        first_name: '',
        last_name: '',
        email: '',
        birth_date: '',
        phone_number: '',
        role_id: '',
        division_id: '',
      }
    },
    closeCreateModal(){
      this.updateComponent()
      this.StateShowCreateAnAccountModal = false
      this.UserRegister = {
        username: '',
        password: '',
        gender: '',
        title: '',
        first_name: '',
        last_name: '',
        email: '',
        birth_date: '',
        phone_number: '',
        role_id: '',
        division_id: '',
      }
    },
    inputCreateUsername(username){
      this.UserRegister.username = username
    },
    inputCreatePassword(password){
      this.UserRegister.password = password
    },
    inputCreateConfirmPassword(confirmPassword){
      this.UserRegisterConfirmPassword = confirmPassword
    },
    inputCreateGender(gender){
      this.UserRegister.gender = gender
    },
    inputCreateTitle(title){
      this.UserRegister.title = title
    },
    inputCreateFirstName(first_name){
      this.UserRegister.first_name = first_name
    },
    inputCreateLastName(last_name){
      this.UserRegister.last_name = last_name
    },
    inputCreateEmail(email){
      this.UserRegister.email = email
    },
    inputCreateDOB(birth_date){
      const date = new Date(birth_date) //แปลง string เป็น Date
      this.UserRegister.birth_date = date.toISOString() // แปลง Dateในรูปแบบของ IsoString ทำให้ส่ง api ได้ 
    },
    inputCreatePhoneNumber(phone_number){
      this.UserRegister.phone_number = phone_number
    },
    inputCreateJob(role_id){
      this.UserRegister.role_id = role_id
    },
    inputCreateDivision(division_id){
      this.UserRegister.division_id = division_id
    },
    async doRegister() {
      // this.StateCheckUsername
      console.log(this.UserRegister.username)
      await axios.get('http://localhost:4000/api/User/'+this.UserRegister.username)
          .then(response => {
            if(response.status === 200 && response.data) {
              console.log(response.status)
              this.StateCheckUsername=true
            }
          })
          .catch(error => {
            if(error.status === 404 && error.data) {
              console.log(error.status)
              this.StateCheckUsername=false
            }
          })
      console.log(this.StateCheckUsername)
      if(!this.StateCheckUsername) {
        let user = this.UserRegister
        user.title = this.Title.find(item=>item.option===user.title).id
        user.gender = this.Gender.find(item=>item.option===user.gender).id
        user.role_id = this.Role.find(item=>item.option===user.role_id).id
        user.division_id = this.Division.find(item=>item.option===user.division_id).id
        user.activated = true
        user.profile_pic= 'string'
        console.log(user)
        await axios.post('http://localhost:4000/api/User/Register', user)
            .then(response => {
              if(response.status === 200 && response.data) {
                console.log(response.status)
              }
            })
            .catch(error => {
              console.log(error)
            })
        this.StateShowCreateAnAccountModal = false
        this.UserRegister = {
          username: '',
          password: '',
          gender: '',
          title: '',
          first_name: '',
          last_name: '',
          email: '',
          birth_date: '',
          phone_number: '',
          role_id: '',
          division_id: '',
        }
        this.$router.go()
      }
    },
    openDeleteModal() {
      this.StateShowDeleteModal = true
    },
    closeDeleteModal() {
      this.StateShowDeleteModal = false
    },
    async doDeleteAccount() {
      console.log(this.SelectUserId)
      console.log(this.SelectUserIndexRow)
      let username = this.ManageUsersData.find(item=>item.employee_id===this.SelectUserId).username
      console.log(username)
      await axios.delete('http://localhost:4000/api/User/'+username)
          .then(response => {
            if(response.status === 200 && response.data) {
              console.log(response.status)
            }
          })
          .catch(error => {
            console.log(error)
          })
      this.StateShowDeleteModal = false
      this.$router.go()
    },
  },
}
</script>

<style lang="scss" scoped>
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
  align-items: center;
  z-index: 45;
}
.theme-modal {
  margin: 10rem 0;
  min-width: 375px;
  width: 650px;
  background-color: white;
  padding: 0.75rem;
  box-shadow: 0 0 0.5px rgba(10, 10, 10, 0.5);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
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
.theme-modal-small {
  margin: 10rem 0;
  min-width: 375px;
  width: 460px;
  background-color: white;
  padding: 0.75rem;
  box-shadow: 0 0 0.5px rgba(10, 10, 10, 0.5);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
}
.theme-modal-fade-enter, .theme-modal-fade-leave-to { opacity: 0; }
.theme-modal-fade-enter-active, .theme-modal-fade-leave-active { transition: opacity 0.3s ease; }
.button__close{
  width: fit-content;
  color: $blue10;
  border-radius: 12px;
  padding: 0.75rem;
  margin: 0.25rem 0;
  cursor: pointer;
  transition: all .1s ease-in;
  &:hover{
    color: $red5;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
  }
}
.button__style__white {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: $blue5;
  padding: 0.75rem;
  transition: all .1s ease-in;
  border-radius: 12px;
  margin: 0.25rem 0;
  cursor: pointer;
  border-width: 1px;
  border-color: $blue5;
  background-color: white;
  &:hover{
    color: $blue3;
    border-color: $blue3;
  }
}
.button__style__white.red {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: $red5;
  padding: 0.75rem;
  transition: all .1s ease-in;
  border-radius: 12px;
  margin: 0.25rem 0;
  cursor: pointer;
  border-width: 1px;
  border-color: $red5;
  background-color: white;
  &:hover{
    color: $red3;
    border-color: $red3;
  }
}
.button__style__red {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  padding: 0.75rem;
  transition: all .1s ease-in;
  border-radius: 12px;
  margin: 0.25rem 0;
  cursor: pointer;
  background-color: $red5;
  &:hover{
    background-color: $red6;
  }
}
</style>