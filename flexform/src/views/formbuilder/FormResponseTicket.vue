<template>
  <div>
    <!-- Header -->
    <div class="tw-w-full bg-white base-padding base-shadow tw-fixed tw-z-40">
      <div class="tw-flex tw-flex-row tw-items-center">
        <div class="tw-mr-4">
          <div class="button__circle" @click="doExit">
            <Icon class="icon__style__large blue10" icon="heroicons-outline:chevron-left"/>
          </div>
        </div>
        <Icon class="icon__style__large blue10 tw-mr-4" icon="heroicons-outline:folder"/>
        <span class="semibold18 blue10">{{FormResponseName}}</span>
      </div>
      <div class="tw-flex tw-flex-row tw-justify-center">
        <base-navigation-section-ticket
            :field = "FormStructureData.sections"
            :stateSectionIndex = "StateSelectSectionIndex"
            @callbackFieldIndex = "changeStateSelectSectionIndex"
        ></base-navigation-section-ticket>
      </div>
      
    </div>
    <!-- Initial Ticket -->
    <div class="tw-w-full tw-flex tw-flex-col tw-items-center tw-h-" style="padding-top: 120px" v-if="StateSelectSectionIndex===0">
      <div class="box tw-w-full tw-max-w-screen-sm md:tw-max-w-screen-md lg:tw-max-w-screen-lg">
        <div class="tw-m-3 tw-flex tw-flex-row tw-items-center">
          <Icon class="semibold24 icon blue10" icon="heroicons-outline:chat"/>
          <span class="semibold24 blue10 tw-ml-2">{{FormResponseName}}</span>
        </div>
        <div class="tw-ml-3 tw-mr-3 tw-mb-3 tw-border tw-border-grey2 radius10px base-padding tw-flex tw-flex-wrap">
          <div
              v-for="(itemSection, indexSection) in FormStructureData.sections" :key="itemSection.sectionId"
              class="tw-w-full"
          >
            <div 
                v-for="(itemComponent, indexComponent) in FormStructureData.sections[indexSection].components" :key="itemComponent.componentId"
                class="tw-w-full"
            >
              <div
                  v-if="itemComponent.componentType!=='heading'&&itemComponent.componentType!=='paragraph'&&indexSection===0"
                  class="tw-w-full tw-flex tw-flex-row tw-mb-5"
              >
                <div class="tw-w-1/6"><span class="medium16 blue5"># {{indexComponent}}</span></div>
                <div class="tw-w-1/3"><span class="medium16 blue10">{{itemComponent.componentProperties.labelText}}</span></div>
                <div class="tw-w-1/2"><span class="medium16 grey8">Hi</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Activity All Ticket -->
    <div class="tw-w-full tw-flex tw-flex-col tw-items-center tw-h-" style="padding-top: 120px" v-if="StateSelectSectionIndex===1">
      <div class="box tw-w-full tw-max-w-screen-sm md:tw-max-w-screen-md lg:tw-max-w-screen-lg">
        <div class="tw-ml-3 tw-mt-3 tw-mr-3 tw-flex tw-flex-row tw-items-center">
          <Icon class="semibold24 icon blue10" icon="heroicons-outline:chat"/>
          <span class="semibold24 blue10 tw-ml-2">Activity</span>
        </div>
        <div class="tw-ml-3 tw-mt-3 tw-mr-3 tw-flex tw-flex-row tw-justify-between tw-items-center">
          <div class="tw-w-full">
            <SearchBar
                placeholder="Search"
            ></SearchBar>
          </div>
          <div class="tw-flex tw-flex-row tw-items-end tw-justify-end tw-w-full">
            <div class="tw-w-full tw-ml-1 tw-mr-1" style="max-width: 120px">
              <base-button
                  buttonID="buttonExport"
                  buttonText="Export"
                  buttonTextColor="blue5"
                  buttonBorderColor="border-blue5"
                  buttonBgColor="bg-white"
                  buttonIconLeft="heroicons-outline:upload"
              ></base-button>
            </div>
            <div class="tw-w-full tw-ml-1" style="max-width: 160px">
              <base-button
                  buttonID="addActivity"
                  buttonText="Add Activity"
                  buttonTextColor="white"
                  buttonBgColor="bg-blue5"
              ></base-button>
            </div>
          </div>
        </div>
        <div class="base-padding">
          <div class="radius10px" style="height: 500px;">
            <vue-good-table
                :columns="TicketResponseTable.columns"
                :rows="TicketResponseTable.rows"
                max-height="600px"
                :line-numbers="true"
                :pagination-options="{
                  enabled: true
                }"
                :search-options="{
                  enabled: true,
                  placeholder: 'Search data',
                }"
            ></vue-good-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { Icon } from '@iconify/vue2'
import BaseNavigationSectionTicket from "@/components/ticketcomponent/BaseNavigationSectionTicket"
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table'
import SearchBar from "@/components/SearchBar"
import BaseButton from "@/components/BaseButton"
import axios from 'axios'

export default {
  name: "FormResponseTicket",
  components: {
    Icon,
    BaseNavigationSectionTicket,
    VueGoodTable,
    SearchBar,
    BaseButton,
  },
  props: {
    PropFormId: String,
    PropTicketId: String
  },
  data(){
    return {
      // Initial
      FormResponseData: [],
      // Use
      FormStructureData: {},
      TicketResponseData: [],
      TicketResponseTable: {
        columns: [],
        rows: []
      },
      // Value
      FormResponseName: String,
      StateSelectSectionIndex: 0,
    }
  },
  async mounted() {
    //let FormId = = this.PropFormId
    //let TicketId = this.PropTicketId
    let FormId = '7d1caea0-fb04-49b5-a0ee-4acc3a7c4323'
    let TicketId = 'c4923602-707b-4b91-bb92-baee9604fbc1'
    // Not Reload page
    if(FormId !== undefined && TicketId !== undefined){
      // Form Structure
      await axios.get('http://localhost:4000/api/FlexForm/' + FormId)
          .then(response => {
            if (response.status === 200 && response.data) {
              this.FormStructureData = response.data
            }
          })
          .catch(error => {
            console.log(error)
          })
      console.log(this.FormStructureData)
      // Ticket Response
      await axios.get('http://localhost:4000/api/FlexForm/TicketInput/' + FormId)
          .then(response => {
            if (response.status === 200 && response.data) {
              this.FormResponseData = response.data
            }
          })
          .catch(error => {
            console.log(error)
          })
      //console.log(this.FormResponseData)
    }
    // Get FormId from local storage
    FormId = window.localStorage.getItem('formid')
    // Reload page
    if(FormId === undefined && TicketId === undefined){
      // Form Structure
      await axios.get('http://localhost:4000/api/FlexForm/' + FormId)
          .then(response => {
            if (response.status === 200 && response.data) {
              this.FormStructureData = response.data
            }
          })
          .catch(error => {
            console.log(error)
          })
      //console.log(this.FormStructureData)
      // Ticket Response
      await axios.get('http://localhost:4000/api/FlexForm/TicketInput/' + FormId)
          .then(response => {
            if (response.status === 200 && response.data) {
              this.FormResponseData = response.data
            }
          })
          .catch(error => {
            console.log(error)
          })
      //console.log(this.FormResponseData)
    }
    this.FormResponseData.forEach(
        (ticket)=>{
          if(ticket.ticketId === TicketId){
            this.TicketResponseData.push(ticket)
          }
        }
    )
    //console.log(this.TicketResponseData)
    this.FormResponseName = this.FormStructureData.formName
    // Create column
    this.FormStructureData.sections.forEach(
        (elementSection, indexSection)=>{
          //console.log(elementSection, indexSection)
          elementSection.components.forEach(
              (elementComponent)=>{
                //console.log(elementComponent.componentType)
                //console.log(elementComponent.componentProperties)
                if(indexSection===1){
                  if(elementComponent.componentType !== 'heading' && elementComponent.componentType !== 'paragraph') {
                    this.TicketResponseTable.columns.push({
                      label: elementComponent.componentProperties.labelText,
                      field: elementComponent.componentId,
                      type: 'string',
                      formId: this.FormStructureData.formId,
                      sectionId: elementSection.sectionId,
                      componentId: elementComponent.componentId,
                    })
                  }
                }
              }
          )
        }
    )
  },
  methods: {
    changeStateSelectSectionIndex(index) {
      this.StateSelectSectionIndex = index
    },
    doExit(){
      this.$router.push({
        name: 'AllTicket',
        params: { 
          ClickedForm: '7d1caea0-fb04-49b5-a0ee-4acc3a7c4323'
          //ClickedForm: this.PropFormId
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.icon__style__large{
  font-size: 24px;
}
.button__circle{
  cursor: pointer;
  background-color: $grey1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.75rem;
  width: fit-content;
  border-radius: 24px;
  transition: all .1s ease-in;
  &:hover{
    background-color: $grey2;
  }
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
.theme-modal-fade-enter, .theme-modal-fade-leave-to {
  opacity: 0;
}
.theme-modal-fade-enter-active, .theme-modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
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