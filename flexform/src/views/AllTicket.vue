<template>
  <layout-sidebar-navbar-vue>
    <template #content>
      <div class="box__style bg-grey1 tw-h-full md:tw-flex-col">
        <div class="base-margin tw-flex tw-flex-row tw-items-center ">
          <base-button-back
              :callback="PreviousPage"></base-button-back>
          <Icon class="semibold32 icon blue10 tw-mx-1 md:tw-flex-col" icon="heroicons-outline:folder"/>
          <span class="semibold24 blue10 tw-pl-1 md:tw-flex-col">National Telecom Public Company Limited Ticket (NOC) </span>
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
                <base-button-id
                    buttonID="buttonUseTemplate"
                    buttonText="Open Ticket"
                    buttonTextColor="blue10"
                    buttonBgColor="bg-white"
                    buttonIconRight="heroicons-outline:plus"
                    @callbackObject="SelectTicketTemplate"
                    :id="ClickedForm"
                ></base-button-id>
              </div>
            </div>
          </div>
          {{test(1)}}
          <div v-if="test(1) === 2">
            Helloo
          </div>
          <!-- Ticket List !-->
          <div v-for="FormData in TicketData" :key="FormData.ticketId">
            <div class="tw-my-2">
              <div class="bg-white base-padding base-shadow radius12px tw-flex tw-flex-row tw-items-start tw-justify-between">
                <div class="tw-flex tw-flex-row">
                  <div v-for="section in FormData" :key="section.sectionId">
<!--                    <div v-for="component in section" :key="component.componentId">-->
<!--                      <div v-if="componentLabel[0] ==='Priority' && componentValue[0]==='High'" class="bg-red4 tw-p-5 radius12px tw-mr-3" style="height: fit-content">-->
<!--                        &lt;!&ndash;                <div v-if="Urgent === 'High'" class="bg-red4 tw-p-5 radius12px tw-mr-3" style="height: fit-content">&ndash;&gt;-->
<!--                        <span class="red7">{{ componentValue}}</span>-->
<!--                      </div>-->
                      <div v-if="Urgent === 'Medium'" class="bg-yellow4 tw-p-5 radius12px tw-mr-3" style="height: fit-content">
                        <span class="yellow9">{{ componentValue[0] }}</span>
                      </div>
                      <div v-if="Urgent === 'Low'" class="bg-green2 tw-p-5 radius12px tw-mr-3" style="height: fit-content">
                        <span class="green10">{{ Urgent }}</span>
                      </div>
<!--                  </div>-->
                </div>
                <div class="tw-flex tw-flex-col tw-items-start tw-mx-3">
                  <label v-if="StateShowContentForWindowSize" class="medium16 grey5 tw-mt-0.5 ">Name</label>
                  <label v-if="Urgent === 'High'" class="tw-mt-0.5 medium16 red7">{{ ComponentTemplate }}</label>
                  <label v-if="Urgent === 'Medium'" class="tw-mt-0.5 medium16 yellow9">{{ ComponentTemplate }}</label>
                  <label v-if="Urgent === 'Low'" class="tw-mt-0.5 medium16 green10">{{ ComponentTemplate }}</label>
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
                  <label class="medium16 grey5 tw-mt-0.5">Last Update</label>
                  <label class="medium16 grey7 tw-mt-0.5">{{ FormData.timestamp }}</label>
                </div>
                <div v-if="StateShowContentForWindowSize" class="tw-flex tw-flex-col tw-items-start tw-mx-8">
                  <label class="medium16 grey5 tw-mt-0.5">Description</label>
                  <label class="medium16 grey7 tw-mt-0.5">{{ Description }}</label>
                </div>
                <div v-if="StateShowContentForWindowSize" class="tw-flex tw-flex-col tw-items-start tw-mx-6">
                  <label class="medium16 grey5 tw-mt-0.5">Created By</label>
                  <label class="medium16 grey7 tw-mt-0.5">{{FormData.inputByUser}}</label>
                </div>
              </div>

              <div class="tw-flex tw-flex-row tw-mx-2">
                <div class="tw-mt-1">
                  <base-button-id
                      buttonID="buttonResponse"
                      buttonText="Response"
                      buttonTextColor="blue5"
                      buttonBgColor="bg-white"
                      buttonBorderColor="border-blue5"
                      buttonIconLeft="heroicons-outline:chat"
                      @callbackObject="GoResponseTicket"
                      :id="FormData.ticketId"
                  ></base-button-id>
                </div>
                <div  class="tw-mt-1 tw-mr-2 tw-ml-3">
                  <base-button-id
                      buttonID="buttonAddActivity"
                      buttonText="Add Activity"
                      buttonTextColor="white"
                      buttonBgColor="bg-blue10"
                      @callbackObject="GoAddActivityTicket"
                      :id="FormData.ticketId"
                  ></base-button-id>
                </div>
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
// import BaseButtonWhite from '@/components/BaseButtonWhite'
import BaseButtonBlue from '@/components/BaseButtonBlue'
import {mapActions, mapGetters} from "vuex";
import SearchBar from "@/components/SearchBar";
import BaseBadge from "@/components/BaseBadge";
import BaseButtonId from "@/components/BaseButtonId";
import axios from 'axios'
import dayjs from "dayjs";
export default {
  name: "AllTicket.vue",
  components: {
    SearchBar,
    LayoutSidebarNavbarVue,
    BaseButtonBack,
    Icon,
    //BaseButtonWhite,
    BaseButtonBlue,
    BaseHorizontalNavigation,
    BaseBadge,
    BaseButtonId
  },
  props: {
    ClickedForm: String,
    BackToPage: String,
  },
  data() {
    return {
      horizontalNavigationID: [{field:'All Ticket'},{field:'My Ticket'},{field:'Shared with me'}],
      namePage: 'All Ticket',
      StateShowContentForWindowSize: true,
      Urgent:'Low', // ตัวแปรรับค่ามาจากดาต้าเบส impact ของ ticket // check
      ComponentTemplate:'สายเคเบิลขาด', //check
      Timestamp:'18/11/64',
      Description:'สายเคเบิลแถวเอกมัยขาด', //check
      CreatedByUser:'Chanon Panarong',
      Status:'Finish', //check
      FormData:[],
      TicketData: [],
      TicketId:''
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
    //console.log(this.ClickedForm)
    if(this.ClickedForm !== undefined){
      axios.get('http://localhost:4000/api/Flexform/TicketInput/' + this.ClickedForm)
          .then(response => {
            if (response.status === 200 && response.data) {
              this.FormData = response.data
              const data = this.FormData.map((form) => {
                form.timestamp = dayjs(form.timestamp).format('DD/MM/YYYY')
                return form
              })
              this.TicketData = data
              console.log(this.TicketData)


              // this.LatestUpdate = dayjs(this.FormData.timestamp).format('DD/MM/YYYY') // แปลงเป็นวันที่ธรรมดา
              //console.log(this.ClickedForm)
              // console.log(this.FormData)
              // this.FormData.forEach(element => {
              //   //console.log(element);
              //   element.sections.forEach(elementsection =>{
              //         //console.log(elementsection)
              //         elementsection.components.forEach(elementcomponent =>{
              //           console.log(elementcomponent)
              //         })
              //       }
              //   )
              // });
            }
          })
          .catch(error => {
            // this.errors.push(error)
            console.log(error)
          })
    }  else {
      this.$router.push('/form')
    }
  },
  methods: {
    ...mapActions(['flapWindowResize']),
    test(input){
      input= input+1
      return input
    },
    doHorizontalNavigation(page) {
      this.namePage = page
    },
    doButton(){
      this.$router.push('/form-builder')
    },
    PreviousPage(){
      this.$router.push('/form')
    },
    async GoResponseTicket(string){
      this.ClickedFormId = string
      //console.log("clicked for id: " + this.ClickedFormId)
      console.log(this.TicketId)
      this.$router.push({
        name: 'TicketResponse',
        params: {
          PropFormId: this.ClickedFormId,
          PropTicketId: this.TicketId,
        }
      })
    },
    async GoAddActivityTicket(string){
      this.ClickedFormId = string
      //console.log("clicked for id: " + this.ClickedFormId)
      console.log(this.TicketId)
      this.$router.push({
        name: 'TicketResponse',
        params: {
          PropFormId: this.ClickedFormId,
          PropTicketId: this.TicketId,
        }
      })
    },
    ViewDataVisualization(){
      this.$router.push('/DataVisualization')
    },
    SearchInput(Searchquery){
      this.Searchquery = Searchquery
    },
    async SelectTicketTemplate(string){
      this.ClickedFormId = string
      //console.log("clicked for id: " + this.ClickedFormId)
      this.$router.push({
        name: 'OpenTicket', // ไปหน้าที่ทำ ticket
        params: { ClickedForm: this.ClickedFormId}})
    },
  }
}
</script>

<style lang="scss" scoped>
@media only screen and (max-width: 767px){
  .box__style {
    height: 100%;
    max-height: 736px;
  }
}
@media only screen and (min-width: 768px) {
  .box__style {
    width: 100%;
    max-width: 1024px;
    height: 100%;
    max-height: 560px;
    .left__layout {
      width: 100%;
      max-width: 150px;
    }
    .right__layout {
      width: 100%;
    }
  }
}
</style>