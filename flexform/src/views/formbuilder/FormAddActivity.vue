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
        <Icon class="icon__style__large blue10 tw-mr-4" icon="heroicons-outline:ticket"/>
        <span class="semibold18 blue10">{{TicketName}}</span>
      </div>
    </div>
    <!-- Form -->
    <div class="tw-w-full tw-flex tw-flex-col tw-items-center" style="padding-top: 80px">
      <div class="tw-w-full tw-flex tw-flex-col tw-items-center">
        <div
            class="tw-w-full tw-flex tw-flex-col tw-items-center"
            v-for="(itemSection, indexSection) in FormStructure.Sections" :key="indexSection"
        >
          <div class="section__top__style tw-w-full tw-flex tw-flex-col tw-items-start" v-if="indexSection!==0">
            <span class="medium16 blue10 tw-my-3">{{itemSection.SectionName}}</span>
          </div>
          <div
              v-if="indexSection!==0"
              class="section__style"
              :class="[
                    FormStructure.Sections[indexSection].SectionProperties.SectionFontColor,
                    FormStructure.Sections[indexSection].SectionProperties.SectionBackgroundColor
                    ]"
              :style="doSectionStyleConfig(indexSection)">
            <!-- Blank data -->
            <div
                v-if="FormStructure.Sections[indexSection].Components.length===0"
                class="semibold24 grey5 tw-flex tw-flex-col tw-items-center"
            >Blank Section
            </div>
            <!-- Data -->
            <div v-for="(componentElement, componentIndex) in FormStructure.Sections[indexSection].Components" :key="componentIndex">
              <div class="tw-flex tw-flex-row tw-relative">
                <!-- Short Input Component -->
                <div v-if="componentElement.ComponentType === 'short-input'" class="tw-w-full">
                  <short-input
                      :dataShortInput="componentElement.ComponentProperties"
                      :dataInput="{
                        FormId: FormStructure.FormId,
                        SectionId: FormStructure.Sections[indexSection].SectionId,
                        ComponentId: FormStructure.Sections[indexSection].Components[componentIndex].ComponentId,
                      }"
                      @valueShortInput="doShortInput"
                  ></short-input>
                </div>
                <!-- Long Input Component -->
                <div v-if="componentElement.ComponentType === 'long-input'" class="tw-w-full">
                  <long-input
                      :dataLongInput="componentElement.ComponentProperties"
                      :dataInput="{
                        FormId: FormStructure.FormId,
                        SectionId: FormStructure.Sections[indexSection].SectionId,
                        ComponentId: FormStructure.Sections[indexSection].Components[componentIndex].ComponentId,
                      }"
                      @valueLongInput="doLongInput"
                  ></long-input>
                </div>
                <!-- Paragraph Component -->
                <div v-if="componentElement.ComponentType === 'paragraph'" class="tw-w-full">
                  <paragraph-component :dataParagraph="componentElement.ComponentProperties"></paragraph-component>
                </div>
                <!-- Heading Component -->
                <div v-if="componentElement.ComponentType === 'heading'" class="tw-w-full">
                  <header-component :dataHeading="componentElement.ComponentProperties"></header-component>
                </div>
                <!-- Dropdown Component -->
                <div v-if="componentElement.ComponentType === 'dropdown'" class="tw-w-full">
                  <dropdown-component
                      :dataDropdown="componentElement.ComponentProperties"
                      :dataInput="{
                        FormId: FormStructure.FormId,
                        SectionId: FormStructure.Sections[indexSection].SectionId,
                        ComponentId: FormStructure.Sections[indexSection].Components[componentIndex].ComponentId,
                      }"
                      @valueDropdown="doDropdown"
                  ></dropdown-component>
                </div>
                <!-- Choice Component -->
                <div v-if="componentElement.ComponentType === 'choice'" class="tw-w-full">
                  <choice-component
                      :dataChoice="componentElement.ComponentProperties"
                      :dataInput="{
                        FormId: FormStructure.FormId,
                        SectionId: FormStructure.Sections[indexSection].SectionId,
                        ComponentId: FormStructure.Sections[indexSection].Components[componentIndex].ComponentId,
                      }"
                      @valueChoice="doChoice"
                  ></choice-component>
                </div>
              </div>
            </div>
          </div>
          <div class="tw-mt-5" v-if="indexSection!==0">
            <div class="with-line">
              <span class="light14 grey5">{{itemSection.SectionName}}</span>
            </div>
          </div>
        </div>
        <div class="section__bottom__style tw-w-full tw-py-3 tw-flex tw-flex-row tw-justify-end tw-mb-10">
          <div @click="doActionButton">
            <button-section
                :propDataName="FormStructure.ActionButton.ActionButtonName"
                :propDataFontColor="FormStructure.ActionButton.ActionButtonProperties.FontColor"
                :propDataBgColor="FormStructure.ActionButton.ActionButtonProperties.BackgroundColor"
            ></button-section>
          </div>
        </div>
      </div>
    </div>
    <!-- Bar Bottom -->
    <div class="bg-grey10 tw-py-2 tw-px-5 tw-w-full tw-fixed tw-z-10 tw-bottom-0 tw-flex tw-flex-row tw-justify-between">
      <span class="medium14 white">FlexForm</span>
      <span class="medium14 white">Create by {{FormStructure.CreatedByUser}}</span>
    </div>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue2'
import axios from "axios";
// Component
import ShortInput from "@/components/formbuildercomponent/ShortInput";
import LongInput from "@/components/formbuildercomponent/LongInput";
import HeaderComponent from "@/components/formbuildercomponent/Header";
import ParagraphComponent from "@/components/formbuildercomponent/Paragraph";
import DropdownComponent from "@/components/formbuildercomponent/Dropdown";
import ChoiceComponent from "@/components/formbuildercomponent/Choice";
import ButtonSection from "@/components/formbuildercomponent/ButtonSection";
//import axios from "axios"
export default {
  name: "FormAddActivity",
  components: {
    Icon,
    // Import Component
    ShortInput,
    LongInput,
    HeaderComponent,
    ParagraphComponent,
    DropdownComponent,
    ChoiceComponent,
    ButtonSection,
  },
  props: {
    PropFormId: String,
    PropTicketId: String,
    PropTicketName: String,
    PropIncident: Array,
  },
  data() {
    return {
      // Data
      FormData: {},
      // Form Structure
      FormStructure: {
        FormId: '',
        FormName: '',
        FormDescription: '',
        FormCreatedTimestamp: '',
        FormModifiedTimestamp: '',
        CreatedByUser: '',
        ModifiedByUser: '',
        UseTemplate:false,
        ActionButton: {
          ActionButtonName: '',
          ActionButtonProperties: {
            FontColor: '',
            BackgroundColor: ''
          }
        },
        Sections:[
          {
            SectionId: '',
            SectionName: '',
            SectionProperties: {
              SectionFontName: '',
              SectionFontSize: 0,
              SectionFontColor: '',
              SectionBackgroundColor: ''
            },
            Components: [
              {
                ComponentId: '',
                ComponentType: '',
                ComponentTemplate: false,
                ComponentProperties: {
                  HeadingText: '',
                  SubheadingText: '',
                  Alignment: '',
                  HeadingFontColor: '',
                  HeadingFontSize: 0,
                  SubheadingFontColor: '',
                  SubheadingFontSize: 0,
                  LabelText: '',
                  SubLabelText: '',
                  Required: false,
                  Placeholder: '',
                  FixWidth: true,
                  Width: 0,
                  ReadOnly: false,
                  CharacterLimit: true,
                  CharacterLimitValue: 0,
                  FontColor: '',
                  InputBgColor: '',
                  BorderColor: '',
                  LabelFontSize: 0,
                  Validation: '',
                  PredefinedOptions: '',
                  Options: [],
                  MultipleChoice: false,
                  SpreadToColumns: false
                }
              }
            ]
          }
        ]
      },
      FormInput: {},
      // Value
      TicketName: String,
      TicketId: String,
      componentNoValueCount: 0,
    }
  },
  async mounted() {
    let FormId = this.PropFormId
    let TicketId = this.PropTicketId
    this.TicketId = this.PropTicketId
    let Incident = this.PropIncident
    this.TicketName = this.PropTicketName
    console.log(FormId)
    console.log(TicketId)
    console.log(this.TicketName)
    console.log(Incident)
    if(this.PropIncident === undefined || !JSON.parse(window.localStorage.getItem('activityincident'))){
      this.$router.push('/form')
    }
    if(this.PropFormId !== undefined && this.PropTicketId !== undefined && this.PropTicketName !== undefined && this.PropIncident !== undefined ) {
      console.log('Found')
      axios.get(process.env.VUE_APP_API_URL + '/api/Flexform/' + FormId)
          .then(response => {
            if (response.status === 200 && response.data) {
              this.FormData = response.data
              this.FormStructure = this.CapitalObj(this.FormData)
              //console.log(this.FormStructure)
              this.FormInput.FormId = this.FormStructure.FormId
              this.FormInput.InputByUser = ''
              this.FormInput.Timestamp = this.timestamp
              this.FormInput.Sections = []
              this.FormStructure.Sections.forEach(
                  (elementSection, indexSection) => {
                    this.FormInput.Sections.push(
                        {
                          SectionId: this.FormStructure.Sections[indexSection].SectionId,
                          Components: []
                        }
                    )
                    this.FormStructure.Sections[indexSection].Components.forEach(
                        (elementComponent, indexComponent) => {
                          if (
                              elementComponent.ComponentType !== 'heading'
                              && elementComponent.ComponentType !== 'paragraph'
                          ) {
                            this.FormInput.Sections[indexSection].Components.push(
                                {
                                  ComponentId: this.FormStructure.Sections[indexSection].Components[indexComponent].ComponentId,
                                  ComponentValue: [],
                                  ComponentLabel: [elementComponent.ComponentProperties.LabelText]
                                }
                            )
                          }
                        }
                    )
                  }
              )
            }
          })
          .catch(error => {
            console.log(error)
          })
    } else {
      console.log('Not Found')
      FormId = window.localStorage.getItem('formid')
      TicketId = window.localStorage.getItem('ticketid')
      this.TicketId = window.localStorage.getItem('ticketid')
      Incident = JSON.parse(window.localStorage.getItem('activityincident'))
      this.TicketName = window.localStorage.getItem('ticketname')
      axios.get(process.env.VUE_APP_API_URL + '/api/Flexform/' + FormId)
          .then(response => {
            if (response.status === 200 && response.data) {
              this.FormData = response.data
              this.FormStructure = this.CapitalObj(this.FormData)
              //console.log(this.FormStructure)
              this.FormInput.FormId = this.FormStructure.FormId
              this.FormInput.InputByUser = ''
              this.FormInput.Timestamp = this.timestamp
              this.FormInput.Sections = []
              this.FormStructure.Sections.forEach(
                  (elementSection, indexSection) => {
                    this.FormInput.Sections.push(
                        {
                          SectionId: this.FormStructure.Sections[indexSection].SectionId,
                          Components: []
                        }
                    )
                    this.FormStructure.Sections[indexSection].Components.forEach(
                        (elementComponent, indexComponent) => {
                          if (
                              elementComponent.ComponentType !== 'heading'
                              && elementComponent.ComponentType !== 'paragraph'
                          ) {
                            this.FormInput.Sections[indexSection].Components.push(
                                {
                                  ComponentId: this.FormStructure.Sections[indexSection].Components[indexComponent].ComponentId,
                                  ComponentValue: [],
                                  ComponentLabel: [elementComponent.ComponentProperties.LabelText]
                                }
                            )
                          }
                        }
                    )
                  }
              )
            }
          })
          .catch(error => {
            console.log(error)
          })
    }
    console.log(this.FormInput)
  },
  methods: {
    CapitalFirstLetter(string){
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
    CapitalObj(obj){
      const newObj = {}
      for (const [key, value] of Object.entries(obj)) {
        if (typeof value !== 'object')
          newObj[this.CapitalFirstLetter(key)] = value
        else {
          if (Array.isArray(value)) {
            if (typeof value?.[0] === 'object')
              newObj[this.CapitalFirstLetter(key)] = value.map(this.CapitalObj)
            else
              newObj[this.CapitalFirstLetter(key)] = value
          }
          else
            newObj[this.CapitalFirstLetter(key)] = this.CapitalObj(value)
        }
      }
      return newObj
    },
    doSectionStyleConfig(indexSection) {
      return {
        '--section--style--font--name': this.FormStructure.Sections[indexSection].SectionProperties.SectionFontName,
        '--section--style--font--size': this.FormStructure.Sections[indexSection].SectionProperties.SectionFontSize+'px',
      }
    },
    doShortInput(item) {
      let date = new Date()
      this.FormInput.Timestamp = date.toISOString()
      if(this.FormInput.Sections.find( elementSection => elementSection.SectionId===item.dataInput.SectionId).Components.find( elementComponent => elementComponent.ComponentId===item.dataInput.ComponentId).ComponentValue.length<=0) {
        this.FormInput.Sections.find( elementSection => elementSection.SectionId===item.dataInput.SectionId).Components.find( elementComponent => elementComponent.ComponentId===item.dataInput.ComponentId).ComponentValue.push(item.value)
      }
      else {
        this.FormInput.Sections.find( elementSection => elementSection.SectionId===item.dataInput.SectionId).Components.find( elementComponent => elementComponent.ComponentId===item.dataInput.ComponentId).ComponentValue[0] = item.value
      }
    },
    doLongInput(item) {
      let date = new Date()
      this.FormInput.Timestamp = date.toISOString()
      if(this.FormInput.Sections
          .find( elementSection => elementSection.SectionId===item.dataInput.SectionId)
          .Components.find( elementComponent => elementComponent.ComponentId===item.dataInput.ComponentId).ComponentValue.length<=0) {
        this.FormInput.Sections
            .find( elementSection => elementSection.SectionId===item.dataInput.SectionId)
            .Components.find( elementComponent => elementComponent.ComponentId===item.dataInput.ComponentId).ComponentValue.push(item.value)
      }
      else {
        this.FormInput.Sections
            .find( elementSection => elementSection.SectionId===item.dataInput.SectionId)
            .Components.find( elementComponent => elementComponent.ComponentId===item.dataInput.ComponentId).ComponentValue[0] = item.value
      }
    },
    doDropdown(item) {
      let date = new Date()
      this.FormInput.Timestamp = date.toISOString()
      if(this.FormInput.Sections.find( elementSection => elementSection.SectionId===item.dataInput.SectionId).Components.find( elementComponent => elementComponent.ComponentId===item.dataInput.ComponentId).ComponentValue.length<=0) {
        this.FormInput.Sections.find( elementSection => elementSection.SectionId===item.dataInput.SectionId).Components.find( elementComponent => elementComponent.ComponentId===item.dataInput.ComponentId).ComponentValue.push(item.value)
      }
      else {
        this.FormInput.Sections.find( elementSection => elementSection.SectionId===item.dataInput.SectionId).Components.find( elementComponent => elementComponent.ComponentId===item.dataInput.ComponentId).ComponentValue[0] = item.value
      }
    },
    doChoice(item) {
      let date = new Date()
      this.FormInput.Timestamp = date.toISOString()
      this.FormInput.Sections.find( elementSection => elementSection.SectionId===item.dataInput.SectionId).Components.find( elementComponent => elementComponent.ComponentId===item.dataInput.ComponentId).ComponentValue = item.value
    },
    uuidv4() {
      return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
          (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      )
    },
    async doActionButton() {
      const current = new Date()
      this.FormInput.Timestamp = current.toISOString()
      this.FormInput.TicketId = this.TicketId
      this.FormInput.InputByUser = localStorage.getItem('username')
      this.componentNoValueCount = 0
      this.FormInput.Sections.forEach(
          (elementSection, indexSection)=>{
            if(indexSection===0) {
              elementSection.Components.forEach(
                  (elementComponent)=>{
                    //console.log(elementComponent.ComponentLabel)
                    //console.log(elementComponent.ComponentValue)
                    // ใส่ค่า Incident ลงใน Form Input ของ Section 0
                    let Incident = JSON.parse(window.localStorage.getItem('activityincident'))
                    //console.log(Incident.find(component=>component.componentId===elementComponent.ComponentId).componentValue)
                    elementComponent.ComponentValue = Incident.find(component=>component.componentId===elementComponent.ComponentId).componentValue
                  }
              )
            }
            
          }
      )
      //console.log(this.FormInput)
      this.FormInput.Sections.forEach(
          (elementSection)=>{
            elementSection.Components.forEach(
                (elementComponent)=> {
                  //console.log(elementComponent.ComponentValue)
                  if (elementComponent.ComponentValue.length === 0
                      && this.FormData.sections.find(FormSection => FormSection.sectionId === elementSection.SectionId).components.find(formComponent => formComponent.componentId === elementComponent.ComponentId).componentProperties.required === true
                  ) {
                    this.componentNoValueCount ++
                  }
                }
            )}
      )
      if(this.componentNoValueCount === 0) {
        console.log(this.FormInput)
        axios.post(process.env.VUE_APP_API_URL + '/api/Flexform/TicketInput/CreateTicketInput/', this.FormInput)
            .then(response => {
              console.log(response.status)
              if (response.status === 200 && response.data) {
                localStorage.removeItem('activityincident')
                this.$router.push({
                  name: 'TicketResponse',
                  params: {
                    PropFormId: this.PropFormId,
                    PropTicketId: this.PropTicketId,
                  }
                })
              }
            }).catch(error=>{console.log(error)})
      }
    },
    doExit(){
      localStorage.removeItem('activityincident')
      this.$router.push({
        name: 'TicketResponse',
        params: {
          PropFormId: this.PropFormId,
          PropTicketId: this.PropTicketId,
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

.section__style{
  box-shadow: $baseshadow;
  border-radius: $radius12px;
  padding: 0.75rem;
  font-family: var(--section--style--font--name);
  font-size: var(--section--style--font--size);
}
.with-line {display: block;}
.with-line:before,.with-line:after {
  content: "";
  display: inline-block;
  border-top: 1px solid $grey3;
  vertical-align: middle;
  margin: 0 1em;
}
@media only screen and (min-width: 768px) {
  .section__top__style{width: 768px;}
  .section__style{width: 768px;}
  .section__bottom__style{
    width: 768px;
    transition: all .1s ease-in;
  }
  .with-line:before,.with-line:after {width: 10rem;}
}
@media only screen and (max-width: 767px) {
  .section__top__style{width: 98%;}
  .section__style{width: 98%;}
  .section__bottom__style{
    width: 98%;
    transition: all .1s ease-in;
  }
  .section__bottom__style.active__action__button__properties{
    transition: all .1s ease-in;
    width: 320px;
  }
  .with-line:before,.with-line:after {width: 4rem;}
}
</style>