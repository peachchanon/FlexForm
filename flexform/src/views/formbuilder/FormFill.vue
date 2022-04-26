<template>
  <div>
    <!-- Header -->
    <div class="tw-w-full bg-white base-padding base-shadow tw-fixed tw-z-50">
      <div class="tw-flex tw-flex-row tw-items-center">
        <div class="tw-mr-4">
          <div class="button__circle">
            <Icon class="icon__style__large blue10" icon="heroicons-outline:chevron-left"/>
          </div>
        </div>
        <Icon class="icon__style__large blue10 tw-mr-4" icon="heroicons-outline:folder"/>
        <span class="semibold18 blue10">NT Form</span>
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
                    FormStructure.Sections[indexSection].SectionProperties.FontColor,
                    FormStructure.Sections[indexSection].SectionProperties.BackgroundColor
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
                  <long-input :dataLongInput="componentElement.ComponentProperties"></long-input>
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
                  <dropdown-component :dataDropdown="componentElement.ComponentProperties"></dropdown-component>
                </div>
                <!-- Choice Component -->
                <div v-if="componentElement.ComponentType === 'choice'" class="tw-w-full">
                  <choice-component :dataChoice="componentElement.ComponentProperties" ></choice-component>
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
          <button-section
              :propDataName="FormStructure.ActionButton.ActionButtonName"
              :propDataFontColor="FormStructure.ActionButton.ActionButtonProperties.FontColor"
              :propDataBgColor="FormStructure.ActionButton.ActionButtonProperties.BackgroundColor"
          ></button-section>
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
import BaseNavigationSectionFormBuilder from '@/components/formbuildercomponent/BaseNavigationSectionFormBuilder'
// Import Component
import ShortInput from '@/components/formbuildercomponent/ShortInput'
import LongInput from "@/components/formbuildercomponent/LongInput"
import ParagraphComponent from "@/components/formbuildercomponent/Paragraph"
import HeaderComponent from "@/components/formbuildercomponent/Header"
import DropdownComponent from '@/components/formbuildercomponent/Dropdown'
import ChoiceComponent from '@/components/formbuildercomponent/Choice'
import ButtonSection from '@/components/formbuildercomponent/ButtonSection'

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
  data() {
    return {
      // State Sections and Components
      StateSelectSectionIndex: 0,
      // Form Structure
      FormStructure: {
        "FormId":"formid-text555656565",
        "FormName":"Form Test",
        "FormDescription":"",
        "FormCreatedTimestamp":"",
        "FormModifiedTimestamp":"",
        "CreatedByUser":"",
        "ModifiedByUser":"",
        "UseTemplate":false,
        "ActionButton":{
          "ActionButtonName":"Submit",
          "ActionButtonProperties":{
            "FontColor":"white",
            "BackgroundColor":"bg-blue5"
          }
        },
        "Sections":[
          {
            "SectionId":"Sqsqs",
            "SectionName":"Untitled Section 1",
            "SectionProperties":{
              "FontName":"Prompt",
              "FontSize":16,
              "FontColor":"grey10",
              "BackgroundColor":"bg-white"
            },
            "Components":[
              {
                "ComponentId":"215151505",
                "ComponentType":"heading",
                "ComponentTemplate":false,
                "ComponentProperties":{
                  "HeadingText":"Untitled Section",
                  "SubheadingText":"Descriptive Section",
                  "Alignment":"left",
                  "HeadingFontColor":"grey10",
                  "HeadingFontSize":48,
                  "SubheadingFontColor":"grey5",
                  "SubheadingFontSize":16
                }
              },
              {
                "ComponentId":"3c22bc18-2c06-476a-a1c4-3d592e2c6aa0",
                "ComponentType":"short-input",
                "ComponentTemplate":false,
                "ComponentProperties":{
                  "LabelText":"Type a question",
                  "SubLabelText":"Type a description",
                  "Alignment":"left",
                  "Required":true,
                  "Placeholder":"Enter",
                  "FixWidth":true,
                  "Width":200,
                  "ReadOnly":false,
                  "CharacterLimit":true,
                  "CharacterLimitValue":1000,
                  "Validation":"Alphabetic",
                  "FontColor":"grey10",
                  "InputBgColor":"bg-grey1",
                  "BorderColor":"white",
                  "LabelFontSize":16
                }
              },
              {
                "ComponentId":"a0902693-bb4c-4249-abfb-96f0d363971d",
                "ComponentType":"long-input",
                "ComponentTemplate":false,
                "ComponentProperties":{
                  "LabelText":"Type a question",
                  "SubLabelText":"Type a description",
                  "Alignment":"left",
                  "Required":true,
                  "Placeholder":"Enter",
                  "FixWidth":true,
                  "Width":200,
                  "ReadOnly":false,
                  "CharacterLimit":true,
                  "CharacterLimitValue":2000,
                  "FontColor":"grey10",
                  "InputBgColor":"bg-grey1",
                  "BorderColor":"white",
                  "LabelFontSize":16
                }
              },
              {
                "ComponentId":"3e4b7e02-b122-4337-b49a-29b72cb914d0",
                "ComponentType":"dropdown",
                "ComponentTemplate":false,
                "ComponentProperties":{
                  "LabelText":"Type a question",
                  "SubLabelText":"Type a description",
                  "Alignment":"left",
                  "Required":true,
                  "Placeholder":"Enter",
                  "FixWidth":true,
                  "Width":200,
                  "ReadOnly":false,
                  "PredefinedOptions":"None",
                  "Options":[

                  ],
                  "FontColor":"grey10",
                  "InputBgColor":"bg-grey1",
                  "BorderColor":"white",
                  "LabelFontSize":16
                }
              },
              {
                "ComponentId":"2b503383-c0c4-4d8f-a1c3-94f6e4062989",
                "ComponentType":"choice",
                "ComponentTemplate":false,
                "ComponentProperties":{
                  "MultipleChoice":false,
                  "LabelText":"Type a question",
                  "SubLabelText":"Type a description",
                  "Required":true,
                  "ReadOnly":false,
                  "SpreadToColumns":false,
                  "PredefinedOptions":"None",
                  "Options":[
                    "Choice 1",
                    "Choice 2",
                    "Choice 3"
                  ],
                  "FontColor":"grey10",
                  "BorderColor":"blue5",
                  "LabelFontSize":16
                }
              }
            ]
          }
        ]
      },
      FormInput: {}
    }
  },
  computed: {
    timestamp() {
      const date = new Date()
      return date.toISOString()
    },
  },
  mounted() {
    this.FormInput.FormId= this.FormStructure.FormId
    this.FormInput.InputByUser= ''
    this.FormInput.Timestamp= this.timestamp
    this.FormInput.Sections= []
    this.FormStructure.Sections.forEach(
        (elementSection, indexSection)=>{
          this.FormInput.Sections.push(
              {
                SectionId: this.FormStructure.Sections[indexSection].SectionId,
                Components: []
              }
          )
          this.FormStructure.Sections[indexSection].Components.forEach(
              (elementComponent, indexComponent)=>{
                this.FormInput.Sections[indexSection].Components.push(
                    {
                      ComponentId: this.FormStructure.Sections[indexSection].Components[indexComponent].ComponentId,
                      ComponentValue: ''
                    }
                )
              }
          )
        }
    )
    console.log(this.FormInput)
  },
  methods: {
    doSectionStyleConfig(indexSection) {
      return {
        '--section--style--font--name': this.FormStructure.Sections[indexSection].SectionProperties.FontName,
        '--section--style--font--size': this.FormStructure.Sections[indexSection].SectionProperties.FontSize+'px',
      }
    },
    doShortInput(value) {
      let timestamp = this.timestamp()
      console.log(value,timestamp)
      /*
      let indexOfComponentId = this.FormInput.indexOf(
          this.FormInput.find(
              key => key.FormId===value.dataInput.FormId 
              && key.SectionId===value.dataInput.SectionId
              && key.ComponentId===value.dataInput.ComponentId
          )
      )
      if(indexOfComponentId === -1){
        this.FormInput.push(
            {
              FormId: value.dataInput.FormId,
              SectionId: value.dataInput.SectionId,
              ComponentId: value.dataInput.ComponentId,
              ComponentValue: value.value,
              InputByUser: '',
              Timestamp : timestamp
            }
        )
      }else {
        this.FormInput[indexOfComponentId].ComponentValue = value.value
      }*/
      
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
</style>