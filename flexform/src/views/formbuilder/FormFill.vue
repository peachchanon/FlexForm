<template>
  <div>
    <!-- Header -->
    <div class="tw-w-full bg-white base-padding base-shadow tw-fixed tw-z-50">
      <div class="tw-flex tw-flex-row tw-items-center">
        <div class="tw-mr-4" @click="doShowSaveModal">
          <div class="button__circle">
            <Icon class="icon__style__large blue10" icon="heroicons-outline:chevron-left"/>
          </div>
        </div>
        <Icon class="icon__style__large blue10 tw-mr-4" icon="heroicons-outline:folder"/>
        <span class="semibold18 blue10">{{FormStructure.FormName}}</span>
      </div>
      <div class="tw-flex tw-flex-col tw-items-center">
        <base-navigation-section-form-builder
            :field = "FormStructure.Sections"
            :stateSectionIndex = "StateSelectSectionIndex"
        ></base-navigation-section-form-builder>
      </div>
    </div>
    <!-- Form -->
    <div class="tw-w-full tw-flex tw-flex-col tw-items-center" style="padding-top: 120px">
      <div class="tw-w-full tw-flex tw-flex-col tw-items-center">
        <div
            class="tw-w-full tw-flex tw-flex-col tw-items-center"
            v-for="(itemSection, indexSection) in FormStructure.Sections" :key="indexSection"
        >
          <div class="section__top__style tw-w-full tw-flex tw-flex-col tw-items-start">
            <span class="medium16 blue10 tw-my-3">{{itemSection.SectionName}}</span>
          </div>
          <div
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
          <div class="tw-mt-5">
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
    <!-- Continue Fill Form Modal -->
    <transition name="theme-modal-fade" v-if="StateSaveModal">
      <div class="theme-modal-backdrop">
        <div class="theme-modal">
          <header class="base-padding tw-flex tw-flex-row tw-items-center tw-justify-start tw-relative">
            <Icon class="icon__style__large tw-mr-2 red5" icon="heroicons-outline:download"/>
            <span class="semibold24 red5">Continue fill form ?</span>
          </header>
          <section class="tw-pl-3 tw-pr-3 tw-py-4 tw-overflow-x-hidden">
            <span class="medium16 grey10">Do you want to finish filling the form before exit? <br>If you don’t submit, your changes will be lost.</span>
          </section>
          <footer class="tw-p-2.5 tw-flex tw-flex-row tw-justify-end">
<!--            <div class="tw-w-1/3 tw-mr-1">-->
<!--              <div class="button__style__white red" @click="doShowSaveModal">Cancel</div>-->
<!--            </div>-->
            <div class="tw-w-1/3 tw-mr-1">
              <div class="button__style__white red" @click="PrevPage">No</div>
            </div>
            <div class="tw-w-1/3 tw-ml-1">
              <div class="button__style__red" @click="doActionButton">Fill Form</div>
            </div>
          </footer>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>

import { Icon } from '@iconify/vue2'
import BaseNavigationSectionFormBuilder from '@/components/formbuildercomponent/BaseNavigationSectionFormBuilder'
// Import Component
import ShortInput from '@/components/formbuildercomponent/ShortInput'
import LongInput from "@/components/formbuildercomponent/LongInput"
import ParagraphComponent from "@/components/formbuildercomponent/Paragraph"
import HeaderComponent from "@/components/formbuildercomponent/Header"
import DropdownComponent from '@/components/formbuildercomponent/Dropdown'
import ChoiceComponent from '@/components/formbuildercomponent/Choice'
import ButtonSection from '@/components/formbuildercomponent/ButtonSection'
import axios from "axios";

export default {
  name: "FormFill",
  components:{
    Icon,
    BaseNavigationSectionFormBuilder,
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
    ClickedForm: String
  },
  data() {
    return {
      // Save
      StateSaveModal: false,
      // State Sections and Components
      StateSelectSectionIndex: 0,
      // Form Structure
      FormStructure: {
        "FormId":"",
        "FormName":"",
        "FormDescription":"",
        "FormCreatedTimestamp":"",
        "FormModifiedTimestamp":"",
        "CreatedByUser":"",
        "ModifiedByUser":"",
        "UseTemplate":false,
        "ActionButton":{
          "ActionButtonName":"",
          "ActionButtonProperties":{
            "FontColor":"",
            "BackgroundColor":""
          }
        },
        "Sections":[
          {
            "SectionId":"",
            "SectionName":"",
            "SectionProperties":{
              "SectionFontName":"",
              "SectionFontSize":0,
              "SectionFontColor":"",
              "SectionBackgroundColor":""
            },
            "Components":[
              {
                "ComponentId":"",
                "ComponentType":"",
                "ComponentTemplate":false,
                "ComponentProperties":{
                  "HeadingText":"",
                  "SubheadingText":"",
                  "Alignment":"",
                  "HeadingFontColor":"",
                  "HeadingFontSize":0,
                  "SubheadingFontColor":"",
                  "SubheadingFontSize":0,
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
      FormData: []
    }
  },
  computed: {
    timestamp() {
      const date = new Date()
      return date.toISOString()
    },
  },
  mounted() {
    console.log(this.ClickedForm)
    if(this.ClickedForm !== undefined){
      axios.get('http://localhost:4000/api/Flexform/' + this.ClickedForm)
          .then(response => {
            if (response.status === 200 && response.data) {
              this.FormData = response.data
              console.log(this.ClickedForm)
              console.log(this.FormData)

              this.FormStructure = this.CapitalObj(this.FormData)
              console.log(this.FormStructure)

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
                                  ComponentValue: []
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
            // this.errors.push(error)
            console.log(error)
          })
    }  else {
    this.$router.push('/form')
  }

    window.onbeforeunload  = function() {
      return "Data will be lost if you leave the page, are you sure?"
    }
  },
  methods: {
    PrevPage(){
      this.$router.push('/form')
    },
    // Save form
    doShowSaveModal(){
      this.StateSaveModal = this.StateSaveModal !== true
    },
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
      console.log(item)
      let date = new Date()
      this.FormInput.Timestamp = date.toISOString()
      console.log(this.FormInput)
      if(this.FormInput.Sections.find( elementSection => elementSection.SectionId===item.dataInput.SectionId).Components.find( elementComponent => elementComponent.ComponentId===item.dataInput.ComponentId).ComponentValue.length<=0)
        this.FormInput.Sections.find( elementSection => elementSection.SectionId===item.dataInput.SectionId).Components.find( elementComponent => elementComponent.ComponentId===item.dataInput.ComponentId).ComponentValue.push(item.value)
      else
        this.FormInput.Sections.find( elementSection => elementSection.SectionId===item.dataInput.SectionId).Components.find( elementComponent => elementComponent.ComponentId===item.dataInput.ComponentId).ComponentValue[0] = item.value
    },
    doLongInput(item) {
      let date = new Date()
      this.FormInput.Timestamp = date.toISOString()
      if(this.FormInput.Sections.find( elementSection => elementSection.SectionId===item.dataInput.SectionId).Components.find( elementComponent => elementComponent.ComponentId===item.dataInput.ComponentId).ComponentValue.length<=0)
        this.FormInput.Sections.find( elementSection => elementSection.SectionId===item.dataInput.SectionId).Components.find( elementComponent => elementComponent.ComponentId===item.dataInput.ComponentId).ComponentValue.push(item.value)
      else
        this.FormInput.Sections.find( elementSection => elementSection.SectionId===item.dataInput.SectionId).Components.find( elementComponent => elementComponent.ComponentId===item.dataInput.ComponentId).ComponentValue[0] = item.value
    },
    doDropdown(item) {
      let date = new Date()
      this.FormInput.Timestamp = date.toISOString()
      if(this.FormInput.Sections.find( elementSection => elementSection.SectionId===item.dataInput.SectionId).Components.find( elementComponent => elementComponent.ComponentId===item.dataInput.ComponentId).ComponentValue.length<=0)
        this.FormInput.Sections.find( elementSection => elementSection.SectionId===item.dataInput.SectionId).Components.find( elementComponent => elementComponent.ComponentId===item.dataInput.ComponentId).ComponentValue.push(item.value)
      else
        this.FormInput.Sections.find( elementSection => elementSection.SectionId===item.dataInput.SectionId).Components.find( elementComponent => elementComponent.ComponentId===item.dataInput.ComponentId).ComponentValue[0] = item.value
    },
    doChoice(item) {
      let date = new Date()
      this.FormInput.Timestamp = date.toISOString()
      this.FormInput.Sections.find( elementSection => elementSection.SectionId===item.dataInput.SectionId).Components.find( elementComponent => elementComponent.ComponentId===item.dataInput.ComponentId).ComponentValue = item.value
    },
    async doActionButton() {
      console.log(this.FormInput)
      axios.post('http://localhost:4000/api/FormInput/CreateFormInput', this.FormInput)
          .then(response => {
            console.log(response.status)
            if (response.status === 200 && response.data) {
              console.log(response.status)
              console.log(response.data)
              this.$router.push('/form')
            }
          })
    }
  }
}
</script>

<style lang="scss" scoped>
.logo{
  height: 56px;
}
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

</style>