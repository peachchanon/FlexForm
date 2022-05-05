<template>
  <div>
    <!-- Header -->
    <div class="tw-w-full bg-white base-padding base-shadow tw-fixed tw-z-40">
      <div class="tw-flex tw-flex-row tw-items-center">
        <div class="tw-mr-4">
          <div class="button__circle">
            <Icon class="icon__style__large blue10" icon="heroicons-outline:chevron-left"/>
          </div>
        </div>
        <Icon class="icon__style__large blue10 tw-mr-4" icon="heroicons-outline:folder"/>
        <span class="semibold18 blue10">NT Form</span>
      </div>
    </div>
    <!-- Form -->
    <div class="tw-w-full tw-flex tw-flex-col tw-items-center tw-h-" style="padding-top: 90px">
      <div class="box tw-w-full tw-max-w-screen-sm md:tw-max-w-screen-md lg:tw-max-w-screen-lg" style="height: 640px">
        <div class="tw-ml-3 tw-mt-3 tw-mr-3 tw-flex tw-flex-row tw-items-center">
          <Icon class="semibold24 icon blue10" icon="heroicons-outline:chat"/>
          <span class="semibold24 blue10 tw-ml-2">Response</span>
        </div>
        <div class="tw-ml-3 tw-mt-3 tw-mr-3 tw-flex tw-flex-row tw-justify-between tw-items-center">
          <div>
            <SearchBar></SearchBar>
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
                  @callback="doFill"
              ></base-button>
            </div>
          </div>
          
        </div>
        <div class="base-padding">
          <vue-good-table
              :columns="FormResponseTable.columns"
              :rows="FormResponseTable.rows"
              max-height="300px"
              :line-numbers="true"
              :pagination-options="{
                enabled: true
              }"
              @on-row-click="openDetailModal"
          ></vue-good-table>
        </div>
      </div>
    </div>
    <!-- Detail Modal -->
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
          <section class="tw-pl-3 tw-pr-3 tw-py-4 tw-overflow-x-hidden">
            <div v-for="element in FormResponseTable.columns" :key="element.field">
              <span class="medium16 grey10">{{element.label}}</span>
            </div>
          </section>
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
    FormID: String
  },
  data() {
    return {
      stateShowDetailModal: false,
      columns: [
        {
          label: 'Name',
          field: 'name',
          type: 'string',
        },
        {
          label: 'Age',
          field: 'age',
          type: 'number',
        },
      ],
      rows: [
        { id:1, name:"John", age: 20,},
        { id:2, name:"Jane", age: 24,},
      ],
      FormStructureData: {},
      FormResponseData: {},
      FormResponseTable: {
        columns: [],
        rows: [],
      }
    }
  },
  async mounted() {
    // const idForm = this.FormID
    const idForm = '9b960055-8010-47f7-90db-8870b39f1b72'
    // Form Structure
    //console.log('Form Structure')
    await axios.get('http://localhost:4000/api/FlexForm/'+idForm)
        .then(response => {
          if(response.status===200 && response.data){
            this.FormStructureData = response.data
            //console.log(this.FormStructureData)
          }
        })
        .catch(error => {
          console.log(error)
        })
    // Form Response
    //console.log('Form Response')
    await axios.get('http://localhost:4000/api/FormInput/FormInput/'+idForm)
        .then(response => {
          if(response.status===200 && response.data){
            this.FormResponseData = response.data
            //console.log(this.FormResponseData)
          }
        })
        .catch(error => {
          console.log(error)
        })
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
    doFill() {
      console.log('Fill')
    },
    openDetailModal(params){
      console.log(params.row)
      console.log(params.row.originalIndex)
      //console.log(Object.keys(params.row))
      //console.log(params.row.originalIndex)
      //console.log(Object.keys(params.row)[params.row.originalIndex])
      this.stateShowDetailModal = true
    },
    closeDetailModal(){
      this.stateShowDetailModal = false
    },
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
  z-index: 2;
}
.theme-modal {
  margin: 10rem 0;
  min-width: 375px;
  width: 460px;
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