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
              <Icon class="semibold32 icon blue10 tw-pr-1 tw-mx-1 " icon="heroicons-outline:chat"/>
              <label class="semibold24 blue10">Detail</label>
            </div>
            <div class="button__close tw-absolute tw-right-0" @click="closeDetailModal">
              <Icon class="semibold24" icon="heroicons-outline:x"/>
            </div>
          </header>
          <div class="tw-ml-3 tw-mr-3 tw-mb-2 tw-flex tw-flex-row tw-justify-end">
            <div @click="doShowEditModal(indexSelectRow)" class="tw-mr-2 tw-py-3 tw-px-5 radius10px blue10 hover:tw-text-blue5 tw-transition tw-ease-in tw-cursor-pointer tw-bg-white hover:tw-shadow-base tw-flex tw-flex-row tw-items-center" style="width: fit-content">
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
          <footer class="tw-p-2.5 tw-flex tw-flex-row tw-justify-end" style="max-height: 400px">
            <div class="tw-w-1/3 tw-mr-1" style="width: 100%; max-width: 150px">
              <div class="button__style__white red" @click="doShowDeleteModal">No</div>
            </div>
            <div class="tw-w-1/3 tw-ml-1" style="width: 100%; max-width: 150px">
              <div class="button__style__red" @click="doDeleteRow">Yes</div>
            </div>
          </footer>
        </div>
      </div>
    </transition>
    <!-- Edit Row Modal -->
    <transition name="theme-modal-fade" v-if="stateShowEditModal">
      <div class="theme-modal-backdrop">
        <div class="theme-modal">
          <header class="base-padding tw-flex tw-flex-row tw-items-center tw-justify-start tw-relative">
            <div class="tw-flex tw-flex-row tw-items-center">
              <Icon class="semibold32 icon blue10 tw-pr-1 tw-mx-1 " icon="heroicons-outline:pencil-alt"/>
              <label class="semibold24 blue10">Edit Detail</label>
            </div>
          </header>
          <section 
              class="tw-pl-2 tw-ml-3 tw-mr-3 tw-mb-3 tw-overflow-x-hidden" style="max-height: 400px"
          >
            <div
                class="tw-border-2 radius10px tw-pt-3"
                v-for="(elementSection, indexSection) in FormStructureData.sections" :key="elementSection.sectionId"
                :class="{
                  'tw-mb-4': indexSection !== FormStructureData.sections.length-1,
                  '': indexSection === FormStructureData.sections.length-1,
                }"
            >
              <div
                  v-for="(componentElement, indexComponent) in FormStructureData.sections[indexSection].components"
                  :key="componentElement.componentId"
              >
                <div v-if="componentElement.componentType === 'short-input'" class="tw-w-full">
                  <short-input-component
                      :dataShortInput="FormEditStructure[indexSection].ComponentProperties"
                      :dataInput="{
                        FormId: FormResponseData[indexSelectRow].formId,
                        SectionId: FormResponseData[indexSelectRow].sections[indexSection].sectionId,
                        ComponentId: FormResponseData[indexSelectRow].sections[indexSection].components[indexComponent].componentId,
                      }"
                      :propValueShortInput="{
                        Text: FormEditStructure[indexComponent].ComponentValue,
                        Number: 0,
                      }"
                      @valueShortInput="doShortInputEdit"
                  ></short-input-component>
                </div>
                <div v-if="componentElement.componentType === 'long-input'" class="tw-w-full">
                  <long-input-component
                      :dataLongInput="FormEditStructure[indexSection].ComponentProperties"
                      :dataInput="{
                        FormId: FormResponseData[indexSelectRow].formId,
                        SectionId: FormResponseData[indexSelectRow].sections[indexSection].sectionId,
                        ComponentId: FormResponseData[indexSelectRow].sections[indexSection].components[indexComponent].componentId,
                      }"
                      :propValueLongInput="{
                        Text: FormEditStructure[indexComponent].ComponentValue,
                      }"
                      @valueLongInput="doLongInputEdit"
                  ></long-input-component>
                </div>
                <!--
                <div v-if="componentElement.componentType === 'dropdown'" class="tw-w-full">
                  <dropdown-component
                      :dataDropdown="FormEditStructure[indexSection].ComponentProperties"
                  ></dropdown-component>
                </div>
                <div v-if="componentElement.componentType === 'choice'" class="tw-w-full">
                  <choice-component
                      :dataChoice="FormEditStructure[indexSection].ComponentProperties"
                  ></choice-component>
                </div>
                -->
              </div>
            </div>
          </section>
          <footer class="tw-pl-3 tw-pr-3 tw-pb-3 tw-flex tw-flex-row tw-justify-end">
            <div class="tw-w-1/3 tw-mr-1" style="width: 100%; max-width: 150px">
              <div class="button__style__white green" @click="doCancelShowEditModal">Cancel</div>
            </div>
            <div class="tw-w-1/3 tw-ml-1" style="width: 100%; max-width: 150px">
              <div class="button__style__green" @click="doSaveEdit">Save</div>
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
import { VueGoodTable } from 'vue-good-table'
import axios from "axios"
// Import Component
import ShortInputComponent from '@/components/formbuildercomponent/ShortInput'
import LongInputComponent from '@/components/formbuildercomponent/LongInput'
//import DropdownComponent from '@/components/formbuildercomponent/Dropdown'
//import ChoiceComponent from '@/components/formbuildercomponent/Choice'

export default {
  name: "FormResponse.vue",
  components:{
    Icon,
    SearchBar,
    BaseButton,
    VueGoodTable,
    ShortInputComponent,
    LongInputComponent,
    //DropdownComponent,
    //ChoiceComponent,
  },
  props: {
    PropFormId: String
  },
  data() {
    return {
      keyComponent: 0,
      stateShowDetailModal: false,
      valueSelectRow: [],
      indexSelectRow: Number,
      stateShowDeleteModal: false,
      stateShowEditModal: false,
      FormResponseName: String,
      FormStructureData: {},
      FormResponseData: {},
      FormResponseTable: {
        columns: [],
        rows: [],
      },
      ValueSearchTerm: '',
      FormId: String,
      FormEditStructure: [],
      ComponentStyle: [
        {
          ComponentType: 'short-input',
          ComponentProperties: {
            LabelText: '',
            SubLabelText: '',
            Alignment: 'top',
            Required: false,
            Placeholder: '',
            FixWidth: true,
            Width: 200,
            ReadOnly: false,
            CharacterLimit: false,
            CharacterLimitValue: 100000,
            Validation: 'Alphabetic',
            FontColor: 'grey10',
            InputBgColor: 'bg-grey1',
            BorderColor: 'white',
            LabelFontSize: 16,
          },
        },
        {
          ComponentType: 'long-input',
          ComponentProperties: {
            LabelText: '',
            SubLabelText: '',
            Alignment: 'top',
            Required: false,
            Placeholder: '',
            FixWidth: true,
            Width: 200,
            ReadOnly: false,
            CharacterLimit: false,
            CharacterLimitValue: 100000,
            Validation: 'Alphabetic',
            FontColor: 'grey10',
            InputBgColor: 'bg-grey1',
            BorderColor: 'white',
            LabelFontSize: 16,
          },
        },
        {
          ComponentType: 'dropdown',
          ComponentProperties: {
            LabelText: '',
            SubLabelText: '',
            Alignment: 'top',
            Required: false,
            Placeholder: '',
            FixWidth: true,
            Width: 200,
            ReadOnly: false,
            PredefinedOptions: 'None',
            Options: [],
            FontColor: 'grey10',
            InputBgColor: 'bg-grey1',
            BorderColor: 'white',
            LabelFontSize: 16,
          },
        },
        {
          ComponentType: 'choice',
          ComponentProperties: {
            LabelText: '',
            SubLabelText: '',
            Alignment: 'top',
            Required: false,
            Placeholder: '',
            FixWidth: true,
            Width: 200,
            ReadOnly: false,
            PredefinedOptions: 'None',
            Options: [],
            FontColor: 'grey10',
            InputBgColor: 'bg-grey1',
            BorderColor: 'white',
            LabelFontSize: 16,
            MultipleChoice: false,
          }
        },
      ],
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
      await axios.get('http://localhost:4000/api/Flexform/FormInput/FormInput/' + this.PropFormId)
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
      await axios.get('http://localhost:4000/api/Flexform/FormInput/FormInput/' +this.FormId)
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
                if(elementComponent.componentType !== 'heading' && elementComponent.componentType !== 'paragraph') {
                  this.FormResponseTable.columns.push({
                    label: elementComponent.componentProperties.labelText,
                    field: elementComponent.componentId,
                    type: 'string',
                    formId: this.FormStructureData.formId,
                    sectionId: elementSection.sectionId,
                    componentId: elementComponent.componentId,
                  })
                  // Create Form Edit Structure
                  if(elementComponent.componentType === 'short-input') {
                    const valueProperties = this.ComponentStyle.find(item=>item.ComponentType==='short-input').ComponentProperties
                    valueProperties.LabelText = elementComponent.componentProperties.labelText
                    valueProperties.SubLabelText = elementComponent.componentProperties.subLabelText
                    valueProperties.Placeholder = elementComponent.componentProperties.placeholder
                    this.FormEditStructure.push({
                      ComponentType: 'short-input',
                      ComponentProperties: valueProperties,
                      ComponentValue: [],
                      FormId: this.FormStructureData.formId,
                      SectionId: elementSection.sectionId,
                      ComponentId: elementComponent.componentId,
                    })
                  } else if(elementComponent.componentType === 'long-input') {
                    const valueProperties = this.ComponentStyle.find(item=>item.ComponentType==='long-input').ComponentProperties
                    valueProperties.LabelText = elementComponent.componentProperties.labelText
                    valueProperties.SubLabelText = elementComponent.componentProperties.subLabelText
                    valueProperties.Placeholder = elementComponent.componentProperties.placeholder
                    this.FormEditStructure.push({
                      ComponentType: 'long-input',
                      ComponentProperties: valueProperties,
                      ComponentValue: [],
                      FormId: this.FormStructureData.formId,
                      SectionId: elementSection.sectionId,
                      ComponentId: elementComponent.componentId,
                    })
                  } else if (elementComponent.componentType === 'dropdown'){
                    const valueProperties = this.ComponentStyle.find(item=>item.ComponentType==='dropdown').ComponentProperties
                    valueProperties.LabelText = elementComponent.componentProperties.labelText
                    valueProperties.SubLabelText = elementComponent.componentProperties.subLabelText
                    valueProperties.Placeholder = elementComponent.componentProperties.placeholder
                    valueProperties.Options = elementComponent.componentProperties.options
                    this.FormEditStructure.push({
                      ComponentType: 'dropdown',
                      ComponentProperties: valueProperties,
                      ComponentValue: [],
                      FormId: this.FormStructureData.formId,
                      SectionId: elementSection.sectionId,
                      ComponentId: elementComponent.componentId,
                    })
                  } else if (elementComponent.componentType === 'choice'){
                    const valueProperties = this.ComponentStyle.find(item=>item.ComponentType==='choice').ComponentProperties
                    valueProperties.LabelText = elementComponent.componentProperties.labelText
                    valueProperties.SubLabelText = elementComponent.componentProperties.subLabelText
                    valueProperties.Placeholder = elementComponent.componentProperties.placeholder
                    valueProperties.Options = elementComponent.componentProperties.options
                    valueProperties.MultipleChoice = elementComponent.componentProperties.multipleChoice
                    this.FormEditStructure.push({
                      ComponentType: 'choice',
                      ComponentProperties: valueProperties,
                      ComponentValue: [],
                      FormId: this.FormStructureData.formId,
                      SectionId: elementSection.sectionId,
                      ComponentId: elementComponent.componentId,
                    })
                  }
                } 
              }
          )
        }
    )
    console.log(this.FormEditStructure)
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

    // Detail Input
    openDetailModal(params){
      this.valueSelectRow = []
      this.indexSelectRow = params.row.originalIndex
      Object.keys(params.row).forEach(
          (element)=>{
            this.valueSelectRow.push({
              key: element
            })
          }
      )
      Object.values(params.row).forEach(
          (element, index)=>{
            this.valueSelectRow[index].value = element
          }
      )
      this.stateShowDetailModal = true
    },
    closeDetailModal(){
      this.stateShowDetailModal = false
    },
    doShowDeleteModal(){
      this.stateShowDeleteModal = !this.stateShowDeleteModal
    },
    // Edit Input
    doShowEditModal(){
      this.stateShowEditModal = true
      this.FormEditStructure.forEach(
          (inputElement)=>{
            const sectionId = inputElement.SectionId
            const componentId = inputElement.ComponentId
            const value = this.FormResponseData[this.indexSelectRow].sections.find(item=>item.sectionId===sectionId).components.find(item=>item.componentId===componentId).componentValue
            inputElement.ComponentValue = value
          }
      )
    },
    doCancelShowEditModal(){
      this.stateShowEditModal = false
      this.$router.go()
    },
    doShortInputEdit(value) {
      const sectionId=value.dataInput.SectionId
      const componentId=value.dataInput.ComponentId
      if(this.FormEditStructure.find(item=>item.SectionId===sectionId&&item.ComponentId===componentId).ComponentValue.length<=0){
        this.FormEditStructure.find(item=>item.SectionId===sectionId&&item.ComponentId===componentId).ComponentValue.push = value.value
      } else{
        this.FormEditStructure.find(item=>item.SectionId===sectionId&&item.ComponentId===componentId).ComponentValue[0] = value.value
      }
    },
    doLongInputEdit(value) {
      const sectionId=value.dataInput.SectionId
      const componentId=value.dataInput.ComponentId
      if(this.FormEditStructure.find(item=>item.SectionId===sectionId&&item.ComponentId===componentId).ComponentValue.length<=0){
        this.FormEditStructure.find(item=>item.SectionId===sectionId&&item.ComponentId===componentId).ComponentValue.push = value.value
      } else{
        this.FormEditStructure.find(item=>item.SectionId===sectionId&&item.ComponentId===componentId).ComponentValue[0] = value.value
      }
    },
    resetRowTable() {
      this.FormResponseTable.rows = []
      this.FormResponseData.forEach(
          (elementForm)=>{
            let objectValue = new Object()
            if(this.FormResponseTable.columns.find(item=>item.formId === elementForm.formId)) {
              elementForm.sections.forEach(
                  (elementSection)=>{
                    if(this.FormResponseTable.columns.find(item=>item.sectionId === elementSection.sectionId)) {
                      elementSection.components.forEach(
                          (elementComponent)=>{
                            if(this.FormResponseTable.columns.find(item=>item.componentId === elementComponent.componentId)) {
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
    async doSaveEdit(){
      console.log(this.FormEditStructure)
      this.FormEditStructure.forEach(
          (component)=>{
            const sectionId = component.SectionId
            const componentId = component.ComponentId
            console.log(componentId)
            console.log(component.ComponentValue)
            this.FormResponseData[this.indexSelectRow].sections.find(item=>item.sectionId===sectionId).components.find(item=>item.componentId===componentId).componentValue = component.ComponentValue
          }
      )
      console.log(this.FormResponseData[this.indexSelectRow])
      // Axios
      axios.put('http://localhost:4000/api/Flexform/FormInput/'+this.FormResponseData[this.indexSelectRow].id, this.FormResponseData[this.indexSelectRow])
          .then(response => {
            if (response.status === 200 && response.data) {
              console.log('Update Complete!')
              console.log(response.data)
            }
          })
          .catch(error => {
            console.log(error)
          })
      this.stateShowEditModal = false
      this.stateShowDetailModal = false
      this.resetRowTable()
    },
    async doDeleteRow(){
      // console.log(this.FormResponseTable.rows[this.indexSelectRow])
      this.FormResponseTable.rows.splice(this.indexSelectRow,1)
      const idMongo = this.FormResponseData[this.indexSelectRow].id
      console.log(idMongo)
      this.FormResponseData.splice(this.indexSelectRow,1)
      console.log(this.FormResponseData)
      // Axios
      axios.delete('http://localhost:4000/api/Flexform/FormInput/Delete/Mongo/'+idMongo)
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
.button__style__white.green {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: $green5;
  padding: 0.75rem;
  transition: all .1s ease-in;
  border-radius: 12px;
  margin: 0.25rem 0;
  cursor: pointer;
  border-width: 1px;
  border-color: $green5;
  background-color: white;
  &:hover{
    color: $green3;
    border-color: $green3;
  }
}
.button__style__green {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  padding: 0.75rem;
  transition: all .1s ease-in;
  border-radius: 12px;
  margin: 0.25rem 0;
  cursor: pointer;
  background-color: $green5;
  &:hover{
    background-color: $green6;
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