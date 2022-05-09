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
    </div>
    <!-- Form -->
    <div class="tw-w-full tw-flex tw-flex-col tw-items-center tw-h-" style="padding-top: 90px">
      <div class="box tw-w-full tw-max-w-screen-sm md:tw-max-w-screen-md lg:tw-max-w-screen-lg">
        <div class="tw-ml-3 tw-mt-3 tw-mr-3 tw-flex tw-flex-row tw-items-center">
          <Icon class="semibold24 icon blue10" icon="heroicons-outline:chat"/>
          <span class="semibold24 blue10 tw-ml-2">Response</span>
        </div>
        <div class="tw-ml-3 tw-mt-3 tw-mr-3 tw-flex tw-flex-row tw-justify-between tw-items-center">
          <div class="tw-w-full">
            <SearchBar
                placeholder="Search"
                @callBackString="doSearchTable"
            ></SearchBar>
          </div>
          <div class="tw-flex tw-flex-row tw-items-end tw-justify-end tw-w-full">
            <div class="tw-w-full tw-ml-1 tw-mr-1" style="max-width: 120px">
              <base-button
                  buttonID="buttonLogin"
                  buttonText="Export"
                  buttonTextColor="white"
                  buttonBgColor="blue5"
                  buttonIconRight="heroicons-outline:upload"
                  buttonBorderColor="border-blue5"
              ></base-button>
            </div>
            <div class="tw-w-full tw-ml-1" style="max-width: 120px">
              <base-button
                  buttonID="buttonLogin"
                  buttonText="Fill"
                  buttonTextColor="white"
                  buttonBgColor="bg-blue5"
                  :callback="doFill"
              ></base-button>
            </div>
          </div>
        </div>
        <div class="base-padding">
          <div class="radius10px" style="height: 500px;">
            <vue-good-table
                :columns="FormResponseTable.columns"
                :rows="FormResponseTable.rows"
                max-height="600px"
                :line-numbers="true"
                :pagination-options="{
                enabled: true
              }"
                :search-options="{
                enabled: true,
                placeholder: 'Search data',
                externalQuery: ValueSearchTerm
              }"
                @on-row-click="openDetailModal"
            ></vue-good-table>
          </div>
        </div>
      </div>
    </div>
    <!-- Detail Row Modal -->
    <transition name="theme-modal-fade" v-if="stateShowDetailModal">
      <div class="theme-modal-backdrop">
        <div class="theme-modal">
          <header class="base-padding tw-flex tw-flex-row tw-items-center tw-justify-start tw-relative">
            <div class="tw-flex tw-flex-row tw-items-center">
              <Icon class="semibold32 icon blue10 tw-pr-1 tw-mx-1 " icon="heroicons-outline:folder"/>
              <label class="semibold24 blue10">Form</label>
            </div>
            <div class="button__close tw-absolute tw-right-0" @click="closeDetailModal">
              <Icon class="semibold24" icon="heroicons-outline:x"/>
            </div>
          </header>
          <div class="tw-ml-3 tw-mr-3 tw-mb-2 tw-flex tw-flex-row tw-justify-end">
            <div class="tw-mr-2 tw-py-3 tw-px-5 radius10px blue10 hover:tw-text-blue5 tw-transition tw-ease-in tw-cursor-pointer tw-bg-white hover:tw-shadow-base tw-flex tw-flex-row tw-items-center" style="width: fit-content">
              <Icon class="semibold24" icon="heroicons-outline:pencil-alt"/>
              <span class="medium16 tw-ml-2">Edit</span>
            </div>
            <div @click="doShowDeleteModal" class="tw-py-3 tw-px-5 radius10px red5 hover:tw-text-red4 tw-transition tw-ease-in tw-cursor-pointer tw-bg-white hover:tw-shadow-base tw-flex tw-flex-row tw-items-center" style="width: fit-content">
              <Icon class="semibold24" icon="heroicons-outline:trash"/>
              <span class="medium16 tw-ml-2">Delete</span>
            </div>
          </div>
          <section class="tw-pl-3 tw-pr-3 tw-py-4 tw-overflow-x-hidden tw-border-2 radius10px tw-ml-3 tw-mr-3 tw-mb-3">
            
            <div 
                v-for="(element, index) in FormResponseTable.columns" :key="element.field"
                :class="{
                  'tw-mb-4': index !== FormResponseTable.columns.length-1,
                  '': index === FormResponseTable.columns.length-1,
                }"
            >
              <div class="tw-flex tw-flex-row">
                <div class="tw-w-1/3">
                  <span class="medium16 blue10">{{ element.label }}</span>
                </div>
                <div class="tw-w-2/3">
                  <span class="medium16 grey10" v-if="valueSelectRow.find(item=>item.key===element.field)">{{ valueSelectRow.find(item=>item.key===element.field).value }}</span>
                  <span class="medium16 grey5" v-if="!valueSelectRow.find(item=>item.key===element.field)"> - </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </transition>
    <!-- Delete Row Modal -->
    <transition name="theme-modal-fade" v-if="stateShowDeleteModal">
      <div class="theme-modal-backdrop">
        <div class="theme-modal-small">
          <header class="base-padding tw-flex tw-flex-row tw-items-center tw-justify-start tw-relative">
            <Icon class="icon__style__large tw-mr-2 red5" icon="heroicons-outline:trash"/>
            <span class="semibold24 red5">Delete Row ?</span>
          </header>
          <section class="tw-pl-3 tw-pr-3 tw-py-4 tw-overflow-x-hidden">
            <span class="medium16 grey10">You're about to delete this row.</span>
          </section>
          <footer class="tw-p-2.5 tw-flex tw-flex-row tw-justify-end">
            <div class="tw-w-1/3 tw-mr-1">
              <div class="button__style__white red" @click="doShowDeleteModal">No</div>
            </div>
            <div class="tw-w-1/3 tw-ml-1">
              <div class="button__style__red" @click="doDeleteRow">Yes</div>
            </div>
          </footer>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue2'
import SearchBar from "@/components/SearchBar"
import BaseButton from "@/components/BaseButton"
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';
import axios from "axios";

export default {
  name: "FormResponse.vue",
  components:{
    Icon,
    SearchBar,
    BaseButton,
    VueGoodTable,
  },
  props: {
    PropFormId: String
  },
  data() {
    return {
      stateShowDetailModal: false,
      valueSelectRow: [],
      indexSelectRow: Number,
      stateShowDeleteModal: false,
      FormResponseName: String,
      FormStructureData: {},
      FormResponseData: {},
      FormResponseTable: {
        columns: [],
        rows: [],
      },
      ValueSearchTerm: '',
      FormId: String
    }
  },
  async mounted() {
    // Form Structure open for the first time
    if(this.PropFormId !== undefined){
      await axios.get('http://localhost:4000/api/FlexForm/' + this.PropFormId)
          .then(response => {
            if (response.status === 200 && response.data) {
              this.FormStructureData = response.data
              //console.log(this.FormStructureData)
            }
          })
          .catch(error => {
            console.log(error)
          })
      // Form Response
      console.log('Form Response')
      await axios.get('http://localhost:4000/api/FormInput/FormInput/' + this.PropFormId)
          .then(response => {
            if (response.status === 200 && response.data) {
              this.FormResponseData = response.data
              //console.log(this.FormResponseData)
              localStorage.setItem('formid', this.PropFormId)
            }
          })
          .catch(error => {
            console.log(error)
          })
    }
    // get formid from local storage
    this.FormId = window.localStorage.getItem('formid')
    // reload page
    if(this.PropFormId === undefined){
      await axios.get('http://localhost:4000/api/FlexForm/' + this.FormId)
          .then(response => {
            if (response.status === 200 && response.data) {
              this.FormStructureData = response.data
              // console.log(this.FormStructureData)
            }
          })
          .catch(error => {
            console.log(error)
          })
      // Form Response
      //console.log('Form Response')
      await axios.get('http://localhost:4000/api/FormInput/FormInput/' +this.FormId)
          .then(response => {
            if (response.status === 200 && response.data) {
              this.FormResponseData = response.data
              //console.log(this.FormResponseData)
            }
          })
          .catch(error => {
            console.log(error)
          })
    }
    // console.log(this.FormResponseData)
    // Form Response Name
    this.FormResponseName = this.FormStructureData.formName
    // Create Data in Table
    this.FormStructureData.sections.forEach(
        (elementSection)=>{
          //console.log(elementSection, indexSection)
          elementSection.components.forEach(
              (elementComponent)=>{
                //console.log(elementComponent.componentType)
                //console.log(elementComponent.componentProperties)
                if(elementComponent.componentType !== 'heading' && 'paragraph') {
                  this.FormResponseTable.columns.push({
                    label: elementComponent.componentProperties.labelText,
                    field: elementComponent.componentId,
                    type: 'string',
                    formId: this.FormStructureData.formId,
                    sectionId: elementSection.sectionId,
                    componentId: elementComponent.componentId,
                  })
                }
              }
          )
        }
    )
    // Insert Data to Table
    //console.log(this.FormResponseData)
    this.FormResponseData.forEach(
        (elementForm)=>{
          //console.log(elementForm.formId)
          let objectValue = new Object()
          if(this.FormResponseTable.columns.find(item=>item.formId === elementForm.formId)) {
            //console.log(elementForm.sections)
            elementForm.sections.forEach(
                (elementSection)=>{
                  if(this.FormResponseTable.columns.find(item=>item.sectionId === elementSection.sectionId)) {
                    //console.log(elementSection.components)
                    elementSection.components.forEach(
                        (elementComponent)=>{
                          if(this.FormResponseTable.columns.find(item=>item.componentId === elementComponent.componentId)) {
                            //console.log(elementComponent.componentValue)
                            objectValue[elementComponent.componentId] = elementComponent.componentValue[0]
                          } else {
                            this.FormResponseTable.columns.push({
                              label: elementComponent.componentLabel[0],
                              field: elementComponent.componentId,
                              type: 'string',
                              formId: this.FormStructureData.formId,
                              sectionId: elementSection.sectionId,
                              componentId: elementComponent.componentId,
                            })
                            objectValue[elementComponent.componentId] = elementComponent.componentValue[0]
                          }
                        }
                    )
                  }
                }
            )
            this.FormResponseTable.rows.push(objectValue)
          }
        }
    )
  },
  methods:{
    doSearchTable(value) {
      this.ValueSearchTerm = value
    },
    handler() {
      this.FormId = this.PropFormId
      this.ReloadPage = false
      console.log("Reload propformid" + this.PropFormId)
      console.log("Reload formid" + this.FormId)
    },
    doFill() {
      console.log('Fill')
      const formID = this.FormStructureData.formId
      console.log(formID)
      this.$router.push({
        name: 'Fill',
        params: {
          ClickedForm: formID,
          BackToPage: 'Response',
        }
      })
    },
    openDetailModal(params){
      console.log(params.row)
      //console.log(params.row.originalIndex)
      console.log(Object.keys(params.row))
      console.log(Object.values(params.row))
      this.valueSelectRow = []
      this.indexSelectRow = params.row.originalIndex
      console.log(this.indexSelectRow)
      Object.keys(params.row).forEach(
          (element)=>{
            //console.log(element)
            this.valueSelectRow.push({
              key: element
            })
          }
      )
      Object.values(params.row).forEach(
          (element, index)=>{
            //console.log(element)
            this.valueSelectRow[index].value = element
          }
      )
      this.stateShowDetailModal = true
    },
    closeDetailModal(){
      this.stateShowDetailModal = false
    },
    doShowDeleteModal(){
      this.stateShowDeleteModal = !this.stateShowDeleteModal;
    },
    async doDeleteRow(){
      // console.log(this.FormResponseTable.rows[this.indexSelectRow])
      this.FormResponseTable.rows.splice(this.indexSelectRow,1)
      const idMongo = this.FormResponseData[this.indexSelectRow].id
      console.log(idMongo)
      this.FormResponseData.splice(this.indexSelectRow,1)
      console.log(this.FormResponseData)
      // Axios
      axios.delete('http://localhost:4000/api/FormInput/Delete/Mongo/'+idMongo)
          .then(response => {
            if (response.status === 200 && response.data) {
              console.log('Delete Complete!')
              console.log(response.data)
            }
          })
          .catch(error => {
            console.log(error)
          })
      this.stateShowDeleteModal = false
      this.stateShowDetailModal = false
    },
    doExit(){
      this.$router.push('/form')
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
  align-items: flex-start;
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
</style>