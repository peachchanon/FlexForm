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
      {{FormInput}}
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
      FormStructure:
          {
            "FormId": "form-00212",
            "FormName":"Untitled Form",
            "FormDescription":"",
            "FormCreatedTimestamp":"",
            "FormModifiedTimestamp":"",
            "CreatedByUser":"",
            "ModifiedByUser":"",
            "Template":false,
            "ActionButton":{
              "ActionButtonName":"Submit",
              "ActionButtonProperties":{
                "FontColor":"white",
                "BackgroundColor":"bg-blue5"
              }
            },
            "Sections":[
              {
                "SectionId":"001c",
                "SectionName":"Section 1",
                "SectionProperties":{
                  "FontName":"Prompt",
                  "FontSize":16,
                  "FontColor":"grey10",
                  "BackgroundColor":"bg-white"
                },
                "Components":[
                  {
                    "ComponentId":"08c88255-160f-4a36-9a10-c2faf51ac85f",
                    "ComponentType":"heading",
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
                    "ComponentId":"1319b4e6-035c-4998-8a64-9068ee91e3d0",
                    "ComponentType":"short-input",
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
                      "CharacterLimitValue":5,
                      "Validation":"Alphabetic",
                      "FontColor":"grey10",
                      "InputBgColor":"bg-grey1",
                      "BorderColor":"white",
                      "LabelFontSize":16
                    }
                  },
                  {
                    "ComponentId":"e441f8e9-eb41-4d54-a348-7ca85cd75f36",
                    "ComponentType":"long-input",
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
                    "ComponentId":"a0d1c6a3-3b55-44cb-bc39-f0cacd7bd9fa",
                    "ComponentType":"dropdown",
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
                    "ComponentId":"f0fc0e2f-d42d-4cd1-8411-3d908b5bde48",
                    "ComponentType":"choice",
                    "ComponentProperties":{
                      "MultipleChoice":false,
                      "LabelText":"Type a question",
                      "SubLabelText":"Type a description",
                      "Required":false,
                      "ReadOnly":false,
                      "SpreadToColumns":false,
                      "PredefinedOptions":"None",
                      "Options":[
                        "Choice 1",
                        "Choice 2",
                        "Choice 3",
                        "Choice 4"
                      ],
                      "FontColor":"grey10",
                      "BorderColor":"blue5",
                      "LabelFontSize":16
                    }
                  }
                ]
              },
              {
                "SectionId":"58857e7c-9d51-44fa-8444-6805a28fb952",
                "SectionName":"Section 2",
                "SectionProperties":{
                  "FontName":"Prompt",
                  "FontSize":16,
                  "FontColor":"grey10",
                  "BackgroundColor":"bg-white"
                },
                "Components":[
                  {
                    "ComponentId":"cdd2d566-4c74-4b3d-8604-1aed576980d7",
                    "ComponentType":"long-input",
                    "ComponentProperties":{
                      "LabelText":"Type a question",
                      "SubLabelText":"Type a description",
                      "Alignment":"top",
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
                  }
                ]
              }
            ]
          },
      FormInput: []
      /*
      FormInputStructure: {
        FormId: String,
        SectionId: String,
        Components: {
          ComponentId : String,
          ComponentValue: String
        },
        InputByUser: String,
        Timestamp : Date
      }*/
    }
  },
  methods: {
    doSectionStyleConfig(indexSection) {
      return {
        '--section--style--font--name': this.FormStructure.Sections[indexSection].SectionProperties.FontName,
        '--section--style--font--size': this.FormStructure.Sections[indexSection].SectionProperties.FontSize+'px',
      }
    },
    doShortInput(value) {
      console.log(value.value)
      console.log(value.dataInput)
      console.log(this.FormInput.find(key => key.FormId===value.dataInput.FormId && key.SectionId===value.dataInput.SectionId).Components.ComponentId)
      //console.log(this.FormStructure.Sections.find(key=>key.SectionId===value.dataInput.SectionId).Components.find(key=>key.ComponentId===value.dataInput.ComponentId))
      //console.log(this.FormInput.indexOf(value.dataInput.FormId))
      /*this.FormInput.push(
          {
            FormId: value.dataInput.FormId,
            SectionId: value.dataInput.SectionId,
            Components: {
              ComponentId : value.dataInput.ComponentId,
              ComponentValue: value.value
            },
            InputByUser: '',
            Timestamp : ''
          }
      )*/
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