<template>
  <layout-sidebar-navbar-vue>
    <template #content>
      <div class="bg-grey1 tw-h-full">
        <div class="base-margin tw-flex tw-flex-row tw-items-center">
          <base-button-back
              :callback="PreviousPage"></base-button-back>
          <Icon class="semibold32 icon blue10 tw-mx-1" icon="heroicons-outline:folder"/>
          <span class="semibold24 blue10 tw-pl-1">National Telecom Public Company Limited Ticket (NOC) </span>
        </div>
      </div>
      <div class="box bg-white tw-h-full">
        <div>
          <base-horizontal-navigation
              v-bind:field="horizontalNavigationID"
              @callbackField="doHorizontalNavigation"
          >
          </base-horizontal-navigation>
        </div>
        <!-- All Ticket-->
        <div v-if="namePage==='All Ticket'" class="tw-px-3">
          <div class="tw-flex tw-flex-row tw-justify-between tw-items-center">
            <div class=" tw-pr-4" :class="{'tw-w-full': !StateShowContentForWindowSize, 'tw-w-2/5':StateShowContentForWindowSize}">
              <SearchBar @callBackString="SearchInput"></SearchBar>
            </div>
            <div class="tw-flex tw-flex-row tw-items-center">
              <div class="tw-mx-1">
                <base-button-blue
                    buttonID="buttonViewVisualization"
                    buttonText="View Data Visualization"
                    buttonIcon="heroicons-outline:document-report"
                    :callback="ViewDataVisualization"
                ></base-button-blue>
              </div>
              <div class="tw-mx-1">
                <base-button-white
                    buttonID="buttonOpenTicket"
                    buttonText="Open Ticket"
                    buttonIcon="heroicons-outline:plus"
                    :callback="doButton"
                ></base-button-white>
              </div>
            </div>
          </div>

          <!-- Ticket List !-->
          <div class="tw-my-2">
            <!--  <div v-for="(TicketID, FormID) in TicketID" :key="FormID"> เปิดเมื่อต่อดาต้าเบส !-->
            <div class="bg-white base-padding base-shadow radius12px tw-flex tw-flex-row tw-items-start tw-justify-between">
              <div class="tw-flex tw-flex-row">
                <div v-if="Urgent === 'High'" class="bg-red4 tw-p-5 radius12px tw-mr-3" style="height: fit-content">
                  <span class="red7">{{ Urgent }}</span>
                </div>
                <div v-if="Urgent === 'Medium'" class="bg-yellow4 tw-p-5 radius12px tw-mr-3" style="height: fit-content">
                  <span class="yellow9">{{ Urgent }}</span>
                </div>
                <div v-if="Urgent === 'Low'" class="bg-green2 tw-p-5 radius12px tw-mr-3" style="height: fit-content">
                  <span class="green10">{{ Urgent }}</span>
                </div>
                <div class="tw-flex tw-flex-col tw-items-start tw-mx-3">
                  <label v-if="StateShowContentForWindowSize" class="medium16 grey5 tw-mt-0.5 ">Name</label>
                  <label v-if="Urgent === 'High'" class="tw-mt-0.5 medium16 red7">{{ ComponentName }}</label>
                  <label v-if="Urgent === 'Medium'" class="tw-mt-0.5 medium16 yellow9">{{ ComponentName }}</label>
                  <label v-if="Urgent === 'Low'" class="tw-mt-0.5 medium16 green10">{{ ComponentName }}</label>
                </div>
                <div v-if="StateShowContentForWindowSize" class="tw-flex tw-flex-col tw-items-start tw-mx-5 ">
                  <label class="medium16 grey5 tw-mt-0.5">Status</label>
                  <div v-if="Status==='Open'" class="tw-mt-0.5">
                    <BaseBadge
                        BadgeText="Open"
                        BadgeColor="white"
                        BadgeBgColor="bg-red5"
                        BadgeBroderColor="border-red10"></BaseBadge>
                  </div>
                  <div v-if="Status==='Update'" class="tw-mt-0.5">
                    <BaseBadge
                        BadgeText="Update"
                        BadgeColor="white"
                        BadgeBgColor="bg-yellow6"
                        BadgeBroderColor="border-yellow10"></BaseBadge>
                  </div>
                  <div v-if="Status==='Finish'" class="tw-mt-0.5">
                    <BaseBadge
                        BadgeText="Finish"
                        BadgeColor="green7"
                        BadgeBgColor="bg-green2"
                        BadgeBroderColor="border-green7"></BaseBadge>
                  </div>
                </div>
                <div v-if="StateShowContentForWindowSize" class="tw-flex tw-flex-col tw-items-start tw-mx-5">
                  <label class="medium16 grey5 tw-mt-0.5">Latest Updates</label>
                  <label class="medium16 grey7 tw-mt-0.5">{{ Timestamp}}</label>
                </div>
                <div v-if="StateShowContentForWindowSize" class="tw-flex tw-flex-col tw-items-start tw-mx-8">
                  <label class="medium16 grey5 tw-mt-0.5">Description</label>
                  <label class="medium16 grey7 tw-mt-0.5">{{ Description }}</label>
                </div>
                <div v-if="StateShowContentForWindowSize" class="tw-flex tw-flex-col tw-items-start tw-mx-6">
                  <label class="medium16 grey5 tw-mt-0.5">Created By</label>
                  <label class="medium16 grey7 tw-mt-0.5">{{InputByUser}}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      <!-- My Ticket-->
      <div v-if="namePage==='My Ticket'" class="base-padding">
        My Ticket Page
      </div>
      <!-- Shared with me -->
      <div v-if="namePage==='Shared with me'" class="base-padding">
        Shared with me Page
      </div>
      </div>
    </template>
  </layout-sidebar-navbar-vue>
</template>

<script>
import LayoutSidebarNavbarVue from "@/layouts/LayoutSidebarNavbar";
import BaseButtonBack from "@/components/BaseButtonBack";
import { Icon } from '@iconify/vue2'
import BaseHorizontalNavigation from '@/components/BaseHorizontalNavigation'
import BaseButtonWhite from '@/components/BaseButtonWhite'
import BaseButtonBlue from '@/components/BaseButtonBlue'
import {mapActions, mapGetters} from "vuex";
import SearchBar from "@/components/SearchBar";
import BaseBadge from "@/components/BaseBadge";
import axios from 'axios'
export default {
  name: "AllTicket.vue",
  components: {
    SearchBar,
    LayoutSidebarNavbarVue,
    BaseButtonBack,
    Icon,
    BaseButtonWhite,
    BaseButtonBlue,
    BaseHorizontalNavigation,
    BaseBadge,
  },
  data() {
    return {
      horizontalNavigationID: [{field:'All Ticket'},{field:'My Ticket'},{field:'Shared with me'}],
      namePage: 'All Ticket',
      StateShowContentForWindowSize: true,
      Urgent:'Low', // ตัวแปรรับค่ามาจากดาต้าเบส impact ของ ticket // check
      ComponentName:'สายเคเบิลขาด', //check
      Timestamp:'18/11/64',
      Description:'สายเคเบิลแถวเอกมัยขาด', //check
      InputByUser:'Chanon Panarong',
      Status:'Finish', //check
      Ticket:[]
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
    try {
        const response = await axios.get("http://localhost:4000/{ticketid}")
        this.Ticket = response
        /*if(Ticket.validation === 'Priority'){
        this.Urgent = validation.Priority
      }
      if(Ticket.validation === 'Status'){
        this.Status = validation.Status
      }
      }*/
      }catch(error){
        console.log(error)
      }
  },
  methods: {
    ...mapActions(['flapWindowResize']),
    doHorizontalNavigation(page) {
      this.namePage = page
    },
    doButton(){
        this.$router.push('/form-builder')
    },
    PreviousPage(){
      this.$router.push('/Dashboard')
    },
    ViewDataVisualization(){
      this.$router.push('/DataVisualization')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>