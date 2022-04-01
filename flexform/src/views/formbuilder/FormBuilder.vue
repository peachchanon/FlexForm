<template>
  <div class="tw-h-full">
    <!--
    <div v-if="!showFormBuilderLayout" class="base-padding tw-h-full tw-w-full tw-flex tw-flex-col tw-items-center md:tw-justify-center tw-justify-start">
      <div class="bg-white radius12px base-shadow base-padding base-margin" style="width: fit-content">
        <div class="tw-flex tw-flex-row tw-items-center tw-justify-between">
          <div class="tw-flex tw-flex-row tw-items-center tw-relative">
            <Icon class="semibold24 icon blue10 tw-pr-1" icon="heroicons-outline:folder"/>
            <label class="semibold24 blue10">Create a Form</label>
          </div>
          <div class="button__close" @click="doButton('exitButton')">
            <Icon class="icon semibold24" icon="heroicons-outline:x"/>
          </div>
        </div>
        <div class="tw-flex md:tw-flex-row md:tw-justify-center tw-flex-col tw-items-start">
          <div class="select__create__form tw-flex tw-flex-row tw-items-start md:tw-flex-col md:tw-mx-5 md:tw-items-center" @click="doButton('blankPageButton')">
            <div class="button__grey tw-my-2">
              <Icon class="icon" icon="heroicons-outline:plus"/>
            </div>
            <div class="tw-flex tw-flex-col tw-items-start tw-m-4 md:tw-items-center">
              <label class="text__blue tw-my-2">Start Form Scratch</label>
              <label class="text__grey tw-my-2">A blank slate is all you need.</label>
            </div>
          </div>
          <div class="select__create__form tw-flex tw-flex-row tw-items-start md:tw-flex-col md:tw-mx-5 md:tw-items-center" @click="doButton('templateFormButton')">
            <div class="button__grey tw-my-2">
              <Icon class="icon" icon="heroicons-outline:folder"/>
            </div>
            <div class="tw-flex tw-flex-col tw-items-start tw-m-4 md:tw-items-center">
              <label class="text__blue tw-my-2">Use Template</label>
              <label class="text__grey tw-my-2">Choose form template</label>
            </div>
          </div>
        </div>
      </div>
    </div>
    -->
    <!-- Form Builder -->
    <!-- Not Support Builder -->
    <div class="tw-h-full" v-if="!StateShowContentForWindowSize">
      <div class="tw-h-full tw-flex tw-flex-col tw-items-center tw-justify-center">
        <div class="tw-relative">
          <Icon class="tw-absolute grey5" icon="bi:window-x" style="font-size: 32px; top:22px; left:33px;"/> 
          <Icon class="grey5" icon="iconoir:computer" style="font-size: 96px"/>
        </div>
        <span class="tw-mt-4 tw-text-xl grey5 tw-font-medium tw-text-center">Unsupported Smaller Screens </span>
      </div>
    </div>
    <!-- Support Builder -->
    <div class="tw-h-full tw-w-full" v-if="StateShowContentForWindowSize" >
      <!-- Header Navbar -->
      <div class="tw-w-full tw-fixed" style="top: 0">
        <!-- Form Name Navbar -->
        <div class="tw-w-full bg-white base-padding">
          <div class="tw-flex tw-flex-row tw-items-center">
            <div class="tw-mr-4">
              <div class="button__circle">
                <Icon class="icon__style__large blue10" icon="heroicons-outline:chevron-left"/>
              </div>
            </div>
            <Icon class="icon__style__large blue10 tw-mr-4" icon="heroicons-outline:folder"/>
            <base-text-input-rename-form-builder
                v-if="StateShowRenameForm"
                :propName="FormStructure.FormName"
                type="text"
                placeholder="Untitled Form"
                @callBackString="doRenameForm"
            ></base-text-input-rename-form-builder>
            <div class="tw-ml-4" v-if="StateShowRenameForm">
              <div class="button__circle green" @click="doShowRenameForm(true)">
                <Icon class="icon__style__small white" icon="heroicons-outline:check"/>
              </div>
            </div>
            <div class="tw-ml-1" v-if="StateShowRenameForm">
              <div class="button__circle red" @click="doShowRenameForm(false)">
                <Icon class="icon__style__small white" icon="heroicons-outline:x"/>
              </div>
            </div>
            <label v-if="!StateShowRenameForm" class="semibold18 blue10">{{FormStructure.FormName}}</label>
            <div class="tw-ml-4" v-if="!StateShowRenameForm">
              <div class="button__circle" @click="doShowRenameForm">
                <Icon class="icon__style__small blue10" icon="heroicons-outline:pencil"/>
              </div>
            </div>
          </div>
        </div>
        <!-- Blue Navbar -->
        <div class="tw-w-full tw-flex tw-flex-row bg-blue10" style="padding: 0.5rem">
          <div class="tw-w-full tw-flex tw-flex-row tw-justify-start">
            <div
                class="button__text white"
                :class="{'button__text white': !StateShowToolsSidebar, 'active': StateShowToolsSidebar}"
                v-if="StatePage==='Build'"
                @click="doButtonOnBlueNavigation('ButtonTools')"
            >
              <Icon class="icon__style__large tw-mr-2" icon="heroicons-outline:pencil"/>
              <span>Tools</span>
            </div>
            <!--
            <div class="button__text green" v-if="StatePage==='Build'">
              <Icon class="icon__style__large tw-mr-2" icon="iconoir:save-floppy-disk"/>
              <span>Save Form</span>
            </div>
            -->
          </div>
          <div class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-center">
            <base-navigation-form-builder
                v-bind:field="PageList"
                @callbackField="doNavigationFormBuilder"
            ></base-navigation-form-builder>
          </div>
          <div class="tw-w-full tw-flex tw-flex-row tw-justify-end">
            <!--
            <div class="button__text white" v-if="StatePage==='Build'">
              <Icon class="icon__style__large tw-mr-2" icon="bi:arrow-90deg-left"/>
              <span>Undo</span>
            </div>
            <div class="button__text white" v-if="StatePage==='Build'">
              <Icon class="icon__style__large tw-mr-2" icon="bi:arrow-90deg-right"/>
              <span>Redo</span>
            </div>
            -->
            <div
                class="button__text white"
                :class="{'button__text white': !StateShowPropertiesSidebar, 'active': StateShowPropertiesSidebar}"
                v-if="StatePage==='Build'"
                @click="doButtonOnBlueNavigation('ButtonProperties')"
            >
              <Icon class="icon__style__large tw-mr-2" icon="heroicons-outline:pencil-alt"/>
              <span>Properties</span>
            </div>
          </div>
        </div>
        <!-- Sections Navbar -->
        <div
            class="tw-w-full tw-flex tw-flex-row tw-justify-center bg-white base-shadow" style="padding: 0.5rem;"
            v-if="StatePage!=='Setting'"
        >
          <base-navigation-section-form-builder
              :field = "FormStructure.Sections"
              :stateSectionIndex = "StateSelectSectionIndex"
              @callbackFieldIndex="doSelectSection"
          ></base-navigation-section-form-builder>
        </div>
      </div>
      <!-- Tools Sidebar -->
      <div
          class="tw-fixed"
          :class="{'sidebar left': !StateShowToolsSidebar, 'sidebar left active': StateShowToolsSidebar}"
      >
        <div class="tw-w-full tw-flex tw-flex-row tw-justify-start bg-grey8 tw-py-4 tw-px-6" style="border-radius: 0 0 8px 8px;">
          <Icon class="icon__style__large white tw-mr-2" icon="heroicons-outline:pencil"/>
          <span class="medium16 white tw-select-none">Tools</span>
        </div>
        <div class="tw-w-full tw-flex tw-flex-col bg-grey6" style="padding:0.3rem 1rem; height: calc(100vh - 180px); overflow-y: auto;">
          <div class="button__component">
            <div class="bar"></div>
            <div class="tw-w-full tw-flex tw-flex-row tw-items-center tw-px-2">
              <div class="tw-w-1/5">
                <div class="tw-relative"><Icon class="icon__style__large" icon="bi:input-cursor"/><span class="text__style__icon tw-absolute" style="left: 27px; top: 6px">N</span></div>
              </div>
              <div class="tw-w-4/5"><span class="medium16">Short Input</span></div>
            </div>
            <div class="bar"></div>
          </div>
          <div class="button__component">
            <div class="bar"></div>
            <div class="tw-w-full tw-flex tw-flex-row tw-items-center tw-px-2">
              <div class="tw-w-1/5">
                <div class="tw-relative"><Icon class="icon__style__large" icon="bi:input-cursor"/><span class="text__style__icon tw-absolute" style="left: 27px; top: 6px">L</span></div>
              </div>
              <div class="tw-w-4/5"><span class="medium16">Long Input</span></div>
            </div>
            <div class="bar"></div>
          </div>
          <div class="button__component">
            <div class="bar"></div>
            <div class="tw-w-full tw-flex tw-flex-row tw-items-center tw-px-2">
              <div class="tw-w-1/5">
                <div class="tw-relative"><Icon class="icon__style__large" icon="bi:input-cursor"/><span class="text__style__icon tw-absolute" style="left: 27px; top: 6px">N</span></div>
              </div>
              <div class="tw-w-4/5"><span class="medium16">Number Input</span></div>
            </div>
            <div class="bar"></div>
          </div>
          <div class="button__component">
            <div class="bar"></div>
            <div class="tw-w-full tw-flex tw-flex-row tw-items-center tw-px-2">
              <div class="tw-w-1/5">
                <div class="tw-flex tw-flex-row"><Icon class="icon__style__large tw-mr-1" icon="bi:text-paragraph"/><span class="text__style__icon">P</span></div>
              </div>
              <div class="tw-w-4/5"><span class="medium16">Paragraph</span></div>
            </div>
            <div class="bar"></div>
          </div>
          <div class="button__component" @click="addHeadingComponent">
            <div class="bar"></div>
            <div class="tw-w-full tw-flex tw-flex-row tw-items-center tw-px-2">
              <div class="tw-w-1/5">
                <div class="tw-flex tw-flex-row tw-justify-center tw-mr-2"><span class="text__style__icon">H</span></div>
              </div>
              <div class="tw-w-4/5"><span class="medium16">Heading</span></div>
            </div>
            <div class="bar"></div>
          </div>
          <div class="button__component">
            <div class="bar"></div>
            <div class="tw-w-full tw-flex tw-flex-row tw-items-center tw-px-2">
              <div class="tw-w-1/5">
                <div class="tw-flex tw-flex-row tw-items-center"><Icon class="icon__style__large" icon="bi:textarea-resize"/><Icon class="text__style__icon tw-mr-1" icon="bi:caret-down"/></div>
              </div>
              <div class="tw-w-4/5"><span class="medium16">Dropdown</span></div>
            </div>
            <div class="bar"></div>
          </div>
          <div class="button__component">
            <div class="bar"></div>
            <div class="tw-w-full tw-flex tw-flex-row tw-items-center tw-px-2">
              <div class="tw-w-1/5">
                <div class="tw-flex tw-flex-row tw-justify-center tw-mr-1"><Icon class="icon__style__large" icon="bi:ui-checks"/></div>
              </div>
              <div class="tw-w-4/5"><span class="medium16">Choice</span></div>
            </div>
            <div class="bar"></div>
          </div>
          <div class="button__component">
            <div class="bar"></div>
            <div class="tw-w-full tw-flex tw-flex-row tw-items-center tw-px-2">
              <div class="tw-w-1/5">
                <div class="tw-relative tw-w-full tw-flex tw-flex-row tw-justify-center">
                  <div class="icon__component radius10px tw-mr-2" style="width: 25px; height: 3px"></div>
                  <div class="icon__component radius10px tw-absolute" style="width: 7px; height: 7px; left: 10px; bottom:-2.4px"></div>
                  <div class="icon__component radius10px tw-absolute" style="width: 7px; height: 7px; right: 18px; bottom:-2.4px"></div>
                </div>
              </div>
              <div class="tw-w-4/5"><span class="medium16">Range Slider</span></div>
            </div>
            <div class="bar"></div>
          </div>
          <div class="button__component">
            <div class="bar"></div>
            <div class="tw-w-full tw-flex tw-flex-row tw-items-center tw-px-2">
              <div class="tw-w-1/5">
                <div class="tw-flex tw-flex-row tw-justify-center tw-mr-1"><Icon class="icon__style__large" icon="bi:image"/></div>
              </div>
              <div class="tw-w-4/5"><span class="medium16">Image</span></div>
            </div>
            <div class="bar"></div>
          </div>
          <div class="button__component">
            <div class="bar"></div>
            <div class="tw-w-full tw-flex tw-flex-row tw-items-center tw-px-2">
              <div class="tw-w-1/5">
                <div class="tw-flex tw-flex-row tw-justify-center tw-mr-1"><Icon class="icon__style__large" icon="bi:person-video"/></div>
              </div>
              <div class="tw-w-4/5"><span class="medium16">Video</span></div>
            </div>
            <div class="bar"></div>
          </div>
          <div class="button__component">
            <div class="bar"></div>
            <div class="tw-w-full tw-flex tw-flex-row tw-items-center tw-px-2">
              <div class="tw-w-1/5">
                <div class="tw-flex tw-flex-row tw-justify-center tw-mr-1"><Icon class="icon__style__large" icon="bi:upload"/></div>
              </div>
              <div class="tw-w-4/5"><span class="medium16">File Upload</span></div>
            </div>
            <div class="bar"></div>
          </div>
          <div class="button__component">
            <div class="bar"></div>
            <div class="tw-w-full tw-flex tw-flex-row tw-items-center tw-px-2">
              <div class="tw-w-1/5">
                <div class="tw-flex tw-flex-row tw-justify-center tw-mr-1"><Icon class="icon__style__large" icon="bi:calendar2-date"/></div>
              </div>
              <div class="tw-w-4/5"><span class="medium16">Date Time Picker</span></div>
            </div>
            <div class="bar"></div>
          </div>
          <div class="button__component">
            <div class="bar"></div>
            <div class="tw-w-full tw-flex tw-flex-row tw-items-center tw-px-2">
              <div class="tw-w-1/5">
                <div class="tw-flex tw-flex-row tw-justify-center tw-mr-1"><Icon class="icon__style__large" icon="bi:table"/></div>
              </div>
              <div class="tw-w-4/5"><span class="medium16">Table</span></div>
            </div>
            <div class="bar"></div>
          </div>
          <div class="button__component">
            <div class="bar"></div>
            <div class="tw-w-full tw-flex tw-flex-row tw-items-center tw-px-2">
              <div class="tw-w-1/5">
                <div class="tw-flex tw-flex-row tw-justify-center tw-mr-1"><Icon class="icon__style__large" icon="bi:map"/></div>
              </div>
              <div class="tw-w-4/5"><span class="medium16">Map</span></div>
            </div>
            <div class="bar"></div>
          </div>
          <div class="button__component">
            <div class="bar"></div>
            <div class="tw-w-full tw-flex tw-flex-row tw-items-center tw-px-2">
              <div class="tw-w-1/5">
                <div class="tw-flex tw-flex-row tw-justify-center tw-mr-1"><Icon class="icon__style__large" icon="bi:star"/></div>
              </div>
              <div class="tw-w-4/5"><span class="medium16">Scale Rating</span></div>
            </div>
            <div class="bar"></div>
          </div>
          <div class="button__component">
            <div class="bar"></div>
            <div class="tw-w-full tw-flex tw-flex-row tw-items-center tw-px-2">
              <div class="tw-w-1/5">
                <div class="tw-flex tw-flex-row tw-justify-center tw-mr-1"><Icon class="icon__style__large" icon="akar-icons:arrow-cycle"/></div>
              </div>
              <div class="tw-w-4/5"><span class="medium16">Captcha</span></div>
            </div>
            <div class="bar"></div>
          </div>
        </div>
      </div>
      <!-- Properties Sidebar -->
      <div
          class="tw-fixed"
          :class="{'sidebar right': !StateShowPropertiesSidebar, 'sidebar right active': StateShowPropertiesSidebar}"
      >
        <div class="tw-w-full tw-flex tw-flex-row tw-justify-start bg-grey8 tw-py-4 tw-px-6" style="border-radius: 0 0 8px 8px;">
          <Icon class="icon__style__large white tw-mr-2" icon="heroicons-outline:pencil-alt"/>
          <span class="medium16 white tw-select-none">Properties</span>
        </div>
        <div class="tw-w-full tw-flex tw-flex-col bg-grey6" style="height: calc(100vh - 180px); overflow-y: auto;">
          <!-- Action Button -->
          <div v-if="StatePropSelectActionButton" class="tw-flex tw-flex-col base-padding">
            <span class="semibold24 white tw-my-1">Submit Button</span>
            <span class="medium16 white tw-mt-2 tw-mb-1">Name</span>
            <base-text-input-properties-form-builder
                type="text"
                :propValue="FormStructure.ActionButton.ActionButtonName"
                class="tw-mb-2"
                @callBackString="doPropActionButtonName"
            ></base-text-input-properties-form-builder>
            <span class="medium16 white tw-mt-2 tw-mb-1">Font Color</span>
            <base-text-input-properties-form-builder
                type="color"
                :propValue="FormStructure.ActionButton.ActionButtonProperties.FontColor"
                class="tw-mb-2"
                @callBackString="doPropActionButtonFontColor"
            ></base-text-input-properties-form-builder>
            <span class="medium16 white tw-mt-2 tw-mb-1">Background Color</span>
            <base-text-input-properties-form-builder
                type="color"
                :propValue="FormStructure.ActionButton.ActionButtonProperties.BackgroundColor.substring(3)"
                class="tw-mb-2"
                @callBackString="doPropActionButtonBgColor"
            ></base-text-input-properties-form-builder>
          </div>
          <!-- Section -->
          <div v-if="StatePropSelectSection" class="tw-flex tw-flex-col base-padding">
            <span class="semibold24 white tw-my-1">{{this.FormStructure.Sections[StateSelectSectionIndex].SectionName}}</span>
            <span class="medium16 white tw-mt-2 tw-mb-1">Font Style</span>
            <base-dropdown-form-builder
                :dropdownValue="FormStructure.Sections[StateSelectSectionIndex].SectionProperties.FontName"
                :propList="FontNameList"
                propType="fontstyle"
                propDropdownWidth="252"
                @callBackValue="doPropSectionFontName"
            ></base-dropdown-form-builder>
            <span class="medium16 white tw-mt-2 tw-mb-1">Font Size</span>
            <div class="tw-flex tw-flex-row tw-items-center">
              <base-dropdown-form-builder
                  :dropdownValue="FormStructure.Sections[StateSelectSectionIndex].SectionProperties.FontSize.toString()"
                  propType="fontsize"
                  propDropdownWidth="70"
                  @callBackValue="doPropSectionFontSize"
              ></base-dropdown-form-builder>
              <span class="medium16 white tw-ml-3">px</span>
            </div>
            <span class="medium16 white tw-mt-2 tw-mb-1">Font Color</span>
            <base-text-input-properties-form-builder
                type="color"
                :propValue="FormStructure.Sections[StateSelectSectionIndex].SectionProperties.FontColor"
                class="tw-mb-2"
                @callBackString="doPropSectionFontColor"
            ></base-text-input-properties-form-builder>
            <span class="medium16 white tw-mt-2 tw-mb-1">Background Color</span>
            <base-text-input-properties-form-builder
                type="color"
                :propValue="FormStructure.Sections[StateSelectSectionIndex].SectionProperties.BackgroundColor.substring(3)"
                class="tw-mb-2"
                @callBackString="doPropSectionBgColor"
            ></base-text-input-properties-form-builder>
          </div>
          <!-- All Component -->
          <!-- Heading -->
          <div v-if="StatePropSelectHeading" class="tw-flex tw-flex-col">
            <base-navigation-properties-form-builder
                :itemList="['Basic','Style']"
                @callbackName="doStatePropHeadingNavigation"
            ></base-navigation-properties-form-builder>
            <div v-if="StatePropSelectHeadingBasic" class="tw-flex tw-flex-col base-padding">
              <span class="semibold24 white tw-my-1">Heading</span>
              <span class="medium16 white tw-mt-2 tw-mb-1">Heading Text</span>
              <span class="light14 grey2 tw-mb-2 tw-mb-1">Type your heading here</span>
              <base-text-input-properties-form-builder
                  type="text"
                  :propValue="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.HeadingText"
                  class="tw-mb-2"
                  @callBackString="doPropHeadingHeadingText"
              ></base-text-input-properties-form-builder>
              <span class="medium16 white tw-mt-2 tw-mb-1">Subheading Text (Optional)</span>
              <span class="light14 grey2 tw-mb-2 tw-mb-1">Add your description here</span>
              <base-text-input-properties-form-builder
                  type="textarea"
                  :propValue="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.SubheadingText"
                  class="tw-mb-2"
                  @callBackString="doPropHeadingSubheadingText"
              ></base-text-input-properties-form-builder>
              <span class="medium16 white tw-mt-2 tw-mb-1">Text Alignment</span>
              <base-text-input-properties-form-builder
                  type="alignment"
                  :propValue="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.Alignment"
                  class="tw-mb-2"
                  @callBackString="doPropHeadingTextAlignment"
              ></base-text-input-properties-form-builder>
            </div>
            <div v-if="StatePropSelectHeadingStyle" class="tw-flex tw-flex-col base-padding">
              <span class="medium16 white tw-mt-2 tw-mb-1">Heading Font Color</span>
              <base-text-input-properties-form-builder
                  type="color"
                  :propValue="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.HeadingFontColor"
                  class="tw-mb-2"
                  @callBackString="doPropHeadingHeadingFontColor"
              ></base-text-input-properties-form-builder>
              <span class="medium16 white tw-mt-2 tw-mb-1">Heading Font Size</span>
              <div class="tw-flex tw-flex-row tw-items-center">
                <base-dropdown-form-builder
                    :dropdownValue="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.HeadingFontSize.toString()"
                    propType="fontsize"
                    propDropdownWidth="70"
                    @callBackValue="doPropHeadingHeadingFontSize"
                ></base-dropdown-form-builder>
                <span class="medium16 white tw-ml-3">px</span>
              </div>
              <span class="medium16 white tw-mt-2 tw-mb-1">Subheading Font Color</span>
              <base-text-input-properties-form-builder
                  type="color"
                  :propValue="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.SubheadingFontColor"
                  class="tw-mb-2"
                  @callBackString="doPropHeadingSubheadingFontColor"
              ></base-text-input-properties-form-builder>
              <span class="medium16 white tw-mt-2 tw-mb-1">Subheading Font Size</span>
              <div class="tw-flex tw-flex-row tw-items-center">
                <base-dropdown-form-builder
                    :dropdownValue="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.SubheadingFontSize.toString()"
                    propType="fontsize"
                    propDropdownWidth="70"
                    @callBackValue="doPropHeadingSubheadingFontSize"
                ></base-dropdown-form-builder>
                <span class="medium16 white tw-ml-3">px</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Layout -->
      <div class="tw-w-full" style="padding-top: 170px">
        <!-- Sections Canvas -->
        <div class="tw-w-full tw-flex tw-flex-col tw-items-center">
          <div 
              class="tw-w-full tw-flex tw-flex-col tw-items-center"
              v-for="(itemSection, indexSection) in FormStructure.Sections" :key="indexSection"
          >
            <base-navigation-tools-section-form-builder 
              :sectionName="itemSection.SectionName"
              :sectionIndex="indexSection"
              :sectionList="FormStructure.Sections"
              :sectionLength="FormStructure.Sections.length"
              @callbackSection="doMoveSections"
              @callbackAction="doNavigationToolsSectionFormBuilder"
              @callbackRenameValue="doRenameSection"
            ></base-navigation-tools-section-form-builder>
              <div
                  class="section__style"
                  :class="[
                      {
                        'select__component__active':indexSection === StateSelectSectionIndex && StatePropSelectSection,
                        'select__component__inactive':indexSection !== StateSelectSectionIndex && !StatePropSelectSection
                      },
                      FormStructure.Sections[indexSection].SectionProperties.FontColor,
                      FormStructure.Sections[indexSection].SectionProperties.BackgroundColor
                      ]"
                  :style="doSectionStyleConfig(indexSection)"
              >
                <div class="tw-w-full tw-flex tw-flex-col">
                  <!-- Blank data -->
                  <div 
                      v-if="FormStructure.Sections[indexSection].Components.length === 0" 
                      class="semibold24 grey5 tw-flex tw-flex-col tw-items-center"
                      @click="doSelectSection(indexSection)"
                  >Blank Section</div>
                  <div v-for="(componentElement, componentIndex) in FormStructure.Sections[indexSection].Components" :key="componentIndex">
                    <div style="position: relative">
                      <!-- Heading Component -->
                      <div v-if="componentElement.ComponentType === 'heading'" class="tw-cursor-pointer"
                           @click="doSelectSection(indexSection,componentIndex)"
                      >
                        <header-component
                            :dataHeading="componentElement.ComponentProperties"
                            :class="{
                          'select__component__active': componentIndex === StateSelectComponentIndex && indexSection === StateSelectSectionIndex && StatePropSelectHeading,
                          'select__component__inactive': componentIndex !== StateSelectComponentIndex && indexSection === StateSelectSectionIndex && !StatePropSelectHeading
                        }"
                        ></header-component>
                      </div>
                      <base-tools-component-form-builder
                          v-if="componentIndex === StateSelectComponentIndex && indexSection === StateSelectSectionIndex && StatePropSelectHeading"
                          style="position: absolute; right: -64px; top: 0; z-index: 0;"
                          :componentLength="FormStructure.Sections[indexSection].Components.length"
                          :componentIndex="componentIndex"
                          :componentType="FormStructure.Sections[indexSection].Components[componentIndex].ComponentType"
                          @callbackAction="doToolsComponent"
                      ></base-tools-component-form-builder>
                    </div>
                  </div>
                  
                </div>
              </div>
          </div>
          <div 
              class="section__bottom__style tw-w-full tw-py-3 tw-flex tw-flex-row tw-justify-end"
              :class="{'active__action__button__properties': StatePropSelectActionButton, '': !StatePropSelectActionButton}"
          >
            <div
                @click="doStateActionButtonProperties"
                :class="[{'select__component__inactive': !StatePropSelectActionButton},{'select__component__active':StatePropSelectActionButton}]"
            >
              <button-section
                  :propDataName="FormStructure.ActionButton.ActionButtonName"
                  :propDataFontColor="FormStructure.ActionButton.ActionButtonProperties.FontColor"
                  :propDataBgColor="FormStructure.ActionButton.ActionButtonProperties.BackgroundColor"
              ></button-section>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue2'
import BaseNavigationFormBuilder from '@/components/formbuildercomponent/BaseNavigationFormBuilder'
import BaseNavigationSectionFormBuilder from '@/components/formbuildercomponent/BaseNavigationSectionFormBuilder'
import BaseTextInputRenameFormBuilder from '@/components/formbuildercomponent/BaseTextInputRenameFormBuilder'
import BaseNavigationToolsSectionFormBuilder from '@/components/formbuildercomponent/BaseNavigationToolsSectionFormBuilder'
import {mapActions, mapGetters} from 'vuex'
import BaseTextInputPropertiesFormBuilder from '@/components/formbuildercomponent/BaseTextInputPropertiesFormBuilder'
import BaseDropdownFormBuilder from "@/components/formbuildercomponent/BaseDropdownFormBuilder"
import BaseNavigationPropertiesFormBuilder from "@/components/formbuildercomponent/BaseNavigationPropertiesFormBuilder"
import BaseToolsComponentFormBuilder from "@/components/formbuildercomponent/BaseToolsComponentFormBuilder"

// Import Component

import HeaderComponent from "@/components/formbuildercomponent/Header"
import ButtonSection from '@/components/formbuildercomponent/ButtonSection'

export default {
  name: "FormBuilder.vue",
  components: {
    BaseNavigationPropertiesFormBuilder,
    Icon,
    BaseTextInputRenameFormBuilder,
    BaseNavigationFormBuilder,
    BaseNavigationSectionFormBuilder,
    BaseNavigationToolsSectionFormBuilder,
    BaseTextInputPropertiesFormBuilder,
    BaseDropdownFormBuilder,
    BaseToolsComponentFormBuilder,
    // Import Component
    HeaderComponent,
    ButtonSection,
  },
  data() {
    return {
      // Page
      PageList: [{field:'Build'},{field:'Preview'},{field:'Setting'}],
      StatePage: 'Build',
      // Rename Form
      StateShowRenameForm: false,
      ValueRenameForm: '',
      StateSaveRenameForm: false,
      // Tools Sidebar
      StateShowToolsSidebar: false,
      // Properties Sidebar
      StateShowPropertiesSidebar: false,
      // Window Size
      StateShowContentForWindowSize: true,
      // Form Structure
      FormStructure : {
        FormName: 'Untitled Form',
        ActionButton: {
          ActionButtonName: 'Submit',
          ActionButtonProperties: {
            FontColor: 'white',
            BackgroundColor: 'bg-blue5'
          }
        },
        Sections: [
          {
            SectionName: 'Untitled Section 1',
            SectionProperties: {
              FontName : 'Prompt',
              FontSize : 16,
              FontColor: 'grey10',
              BackgroundColor: 'bg-white'
            },
            Components: [
              {
                ComponentType: 'heading',
                ComponentProperties: {
                  HeadingText: 'Untitled Section',
                  SubheadingText: 'Descriptive Section',
                  Alignment: 'left',
                  HeadingFontColor: 'grey10',
                  HeadingFontSize: 48,
                  SubheadingFontColor: 'grey5',
                  SubheadingFontSize: 16,
                }
              },
            ]
          },
        ],
        
      },
      // State Sections
      StateSelectSectionIndex: 0,
      // State Components
      StateSelectComponentIndex: 0,
      // Global Select Component
      // Value Config
      FontSizeList: [8,9,10,11,12,14,16,18,20,22,24,28,36,48,72],
      FontNameList: ['Prompt','Arial','Brush Script MT','Courier New','Garamond','Georgia','Tahoma','Times New Roman','Trebuchet MS','Verdana','Helvetica'],
      // Properties Sections
      StatePropSelectSection: true,
      // Properties Heading
      StatePropSelectHeading: false,
      StatePropSelectHeadingBasic: false,
      StatePropSelectHeadingStyle: false,
      // Properties Action Button
      StatePropSelectActionButton: false,
    }
  },
  watch:{
    windowResize () {
      this.StateShowContentForWindowSize = window.innerWidth >= 768
    }
  },
  computed: {
    ...mapGetters(['windowResize']),
  },
  async mounted () {
    window.onresize = () => {
      this.flapWindowResize()
    }
    this.StateShowContentForWindowSize = window.innerWidth >= 768
  },
  methods: {
    ...mapActions(['flapWindowResize']),
    // Page
    doNavigationFormBuilder(namePage) {
      if(namePage === 'Build') {
        this.StatePage = 'Build'
        console.log(this.StatePage)
      } else if(namePage === 'Preview') {
        this.StateShowToolsSidebar = false
        this.StateShowPropertiesSidebar = false
        this.StatePage = 'Preview'
        //console.log(this.StatePage)
      } else {
        this.StateShowToolsSidebar = false
        this.StateShowPropertiesSidebar = false
        this.StatePage = 'Setting'
        //console.log(this.StatePage)
      }
    },
    // Button
    doButtonOnBlueNavigation(nameButton) {
      if(nameButton === 'ButtonTools'){
        this.StateShowToolsSidebar = !this.StateShowToolsSidebar
      } else if(nameButton === 'ButtonProperties') {
        this.StateShowPropertiesSidebar = !this.StateShowPropertiesSidebar;
      }
    },
    // Rename Form
    doShowRenameForm(stateSave) {
      if(this.StateShowRenameForm === false) {
        this.StateShowRenameForm = true
      } else {
        if (stateSave === true) {
          if(this.ValueRenameForm === '')
            this.ValueRenameForm = this.FormStructure.FormName
          this.FormStructure.FormName = this.ValueRenameForm
          this.StateSaveRenameForm = true
        } else {
          this.StateSaveRenameForm = false
        }
        this.StateShowRenameForm = false
      }
    },
    doRenameForm(nameValue) {
      this.ValueRenameForm = nameValue
    },
    // Sections
    doNavigationToolsSectionFormBuilder(event){
      if(event[0] === 'delete') {
        if(this.FormStructure.Sections.length>=1){
          // Check State if state select or event[2] is equal StateSelectSectionIndex variable
          if(this.StateSelectSectionIndex === event[2]) {
            if(this.StateSelectSectionIndex !== 0){
              this.StateSelectSectionIndex = event[2] - 1
            } else {
              this.StateSelectSectionIndex = event[2]
            }
            this.FormStructure.Sections.splice(event[2],1)
          } else {
            this.FormStructure.Sections.splice(event[2],1)
          }
        }
        else{
          console.log('Delete Error, Length')
        }
      } else if(event[0] === 'add') {
        // Check 'Untitled Section'
        let valueArray = []
        for(let [index,element] of Object.values(this.FormStructure.Sections).map((element) => element.SectionName).entries()) {
          if(/^Untitled Section /.test(element)){
            valueArray[index] = element.match(/\d+/g).values().next().value
          }
        }
        let maxValue = 0
        for(let element of valueArray) {
          if(parseInt(element) >= maxValue){
            maxValue = parseInt(element)
          }
        }
        // Create Name: 'Untitled Section' For Max Value
        this.FormStructure.Sections.splice(event[2]+1,0,
            {
              SectionName: 'Untitled Section '+ (maxValue+1),
              SectionProperties: {
                FontName : 'Prompt',
                FontSize : 16,
                FontColor: 'grey10',
                BackgroundColor: 'bg-white'
              },
              Components: [
                {
                  ComponentType: 'heading',
                  ComponentProperties: {
                    HeadingText: 'Untitled Section',
                    SubheadingText: 'Descriptive Section',
                    Alignment: 'left',
                    HeadingFontColor: 'grey10',
                    HeadingFontSize: 48,
                    SubheadingFontColor: 'grey5',
                    SubheadingFontSize: 16,
                  }
                },
              ]
            }
        )
      }
    },
    doRenameSection(index,valueRename){
      this.FormStructure.Sections[index].SectionName = valueRename
    },
    doMoveSections(newSections){
      this.StateSelectSectionIndex = 0
      this.StateSelectComponentIndex = 0
      this.FormStructure.Sections = newSections
    },
    doSelectSection(indexSection,indexComponent){
      this.StatePropSelectActionButton = false
      this.StateSelectSectionIndex = indexSection
      this.StateSelectComponentIndex = indexComponent
      this.StatePropSelectSection = true
      if(typeof indexComponent === 'undefined') {
        this.StatePropSelectSection = true
        this.StatePropSelectHeading = false
      } else {
        if(this.FormStructure.Sections[indexSection].Components[indexComponent].ComponentType === 'heading'){
          if(!this.StatePropSelectHeading){
            this.StatePropSelectHeading = true
            this.StatePropSelectHeadingBasic = true
            this.StatePropSelectHeadingStyle = false
            this.StatePropSelectSection = false
          } else {
            this.StatePropSelectHeading = false
            this.StatePropSelectHeadingBasic = false
            this.StatePropSelectHeadingStyle = false
            this.StatePropSelectSection = true
          }
        }
      }
    },
    // Section Style Config
    doSectionStyleConfig(indexSection) {
      return {
        '--section--style--font--name': this.FormStructure.Sections[indexSection].SectionProperties.FontName,
        '--section--style--font--size': this.FormStructure.Sections[indexSection].SectionProperties.FontSize+'px',
      }
    },
    // Component Properties
    // Section
    doPropSectionFontName(value){
      this.FormStructure.Sections[this.StateSelectSectionIndex].SectionProperties.FontName = value
    },
    doPropSectionFontSize(value){
      this.FormStructure.Sections[this.StateSelectSectionIndex].SectionProperties.FontSize = value
      this.FormStructure.Sections[this.StateSelectSectionIndex].Components.forEach(
          (element) => {
            // Heading
            if(element.ComponentType === 'heading'){
              element.ComponentProperties.HeadingFontSize = value
            }
          }
      )
    },
    doPropSectionFontColor(value){
      this.FormStructure.Sections[this.StateSelectSectionIndex].SectionProperties.FontColor = value
      this.FormStructure.Sections[this.StateSelectSectionIndex].Components.forEach(
          (element) => {
            // Heading
            if(element.ComponentType === 'heading'){
              element.ComponentProperties.HeadingFontColor = value
            }
          }
      )
    },
    doPropSectionBgColor(value){
      this.FormStructure.Sections[this.StateSelectSectionIndex].SectionProperties.BackgroundColor = 'bg-'+value
    },
    doToolsComponent(component){
      if(component.componentAction === 'properties'){
        this.StateShowPropertiesSidebar = !this.StateShowPropertiesSidebar
      }
      else if(component.componentAction === 'duplicate'){
        
        let element = this.FormStructure.Sections[this.StateSelectSectionIndex].Components[component.componentIndex]
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components.splice(
            this.StateSelectComponentIndex,0,
            element
        )
        this.StateSelectComponentIndex = (this.StateSelectComponentIndex + 1)
      }
      else if(component.componentAction === 'delete'){
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components.splice(component.componentIndex,1)
        if(this.StateSelectComponentIndex === 0) {
          this.StateSelectComponentIndex = 0
        } else {
          this.StateSelectComponentIndex = (this.StateSelectComponentIndex - 1)
        }
      }
    },
    // Heading
    doStatePropHeadingNavigation(element){
      if(element.name === 'Basic'){
        this.StatePropSelectHeadingBasic = true
        this.StatePropSelectHeadingStyle = false
      } else if(element.name === 'Style'){
        this.StatePropSelectHeadingBasic = false
        this.StatePropSelectHeadingStyle = true
      }
    },
    doPropHeadingHeadingText(value) {
      console.log(value)
      if(value === ''){
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.HeadingText = 'Untitled Section'
      } else {
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.HeadingText = value
      }
      console.log('Index: '+(this.StateSelectComponentIndex-1)+', Data: '+this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex-1].ComponentProperties.HeadingText)
      console.log('Index: '+this.StateSelectComponentIndex+', Data: '+this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.HeadingText)
    },
    doPropHeadingSubheadingText(value){
      if(value === ''){
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.SubheadingText = 'Descriptive Section'
      } else {
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.SubheadingText = value
      }
    },
    doPropHeadingTextAlignment(value){
      if(value === ''){
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.Alignment = 'left'
      } else {
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.Alignment = value
      }
    },
    doPropHeadingHeadingFontColor(value){
      this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.HeadingFontColor = value
    },
    doPropHeadingHeadingFontSize(value){
      this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.HeadingFontSize = value
    },
    doPropHeadingSubheadingFontColor(value){
      this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.SubheadingFontColor = value
    },
    doPropHeadingSubheadingFontSize(value){
      this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.SubheadingFontSize = value
    },
    // Action Button
    doStateActionButtonProperties() {
      this.StateShowPropertiesSidebar = true
      // Close Component Properties
      this.StatePropSelectHeading = false
      // อย่าลืมกลับมาเขียนแต่ละคอมโพเนนด้วย!!!!!
      // อย่าลืมกลับมาเขียนแต่ละคอมโพเนนด้วย!!!!!
      // อย่าลืมกลับมาเขียนแต่ละคอมโพเนนด้วย!!!!!
      // อย่าลืมกลับมาเขียนแต่ละคอมโพเนนด้วย!!!!!
      if(!this.StatePropSelectActionButton) {
        this.StatePropSelectActionButton = true
        this.StatePropSelectSection = false
      } else {
        this.StatePropSelectActionButton = false
        this.StatePropSelectSection = true
      }
    },
    doPropActionButtonName(value) {
      if(value === ''){
        this.FormStructure.ActionButton.ActionButtonName = 'Action Button'
      } else {
        this.FormStructure.ActionButton.ActionButtonName = value
      }
    },
    doPropActionButtonFontColor(value) {
      if(value === ''){
        this.FormStructure.ActionButton.ActionButtonProperties.FontColor = 'white'
      } else {
        this.FormStructure.ActionButton.ActionButtonProperties.FontColor = value
      }
    },
    doPropActionButtonBgColor(value) {
      if(value === ''){
        this.FormStructure.ActionButton.ActionButtonProperties.BackgroundColor = 'bg-blue5'
      } else {
        this.FormStructure.ActionButton.ActionButtonProperties.BackgroundColor = 'bg-'+value
      }
    },
    // Add Component
    addHeadingComponent(){
      this.FormStructure.Sections[this.StateSelectSectionIndex].Components.splice(
          this.StateSelectComponentIndex+1,0,
          {
            ComponentType: 'heading',
            ComponentProperties: {
              HeadingText: 'Untitled Section',
              SubheadingText: 'Descriptive Section',
              Alignment: 'left',
              HeadingFontColor: 'grey10',
              HeadingFontSize: 48,
              SubheadingFontColor: 'grey5',
              SubheadingFontSize: 16,
            }
          }
      )
      this.StateSelectComponentIndex = this.StateSelectComponentIndex+1
    }
    
    
  }
}
</script>

<style lang="scss" scoped>
/*
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
.select__create__form {
  cursor: pointer;
  .button__grey{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 140px;
    height: 140px;
    background-color: $grey1;
    border-radius: 12px;
    transition: all .1s ease-in;
    .icon {
      font-size: 72px;
      color: $grey5;
    }
  }
  .text__blue {
    font-weight: $fw500;
    font-size: 1rem;
    color: $blue5;
  }
  .text__grey {
    font-weight: $fw500;
    font-size: 1rem;
    color: $grey5;
  }
  &:hover {
    .button__grey {
      border: 2px solid $blue4;
      .icon {color: $grey3;}
    }
    .text__blue {color: $blue4;}
    .text__grey {color: $grey4;}
  }
}*/

::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: $grey6;
  border-radius: 12px;
}
::-webkit-scrollbar-thumb {
  background: $grey3;
  border-radius: 12px;
}
::-webkit-scrollbar-thumb:hover {
  background: $grey4;
}
.sidebar{
  width: 280px;
  background-color: $grey6;
  box-shadow: $baseshadow;
  top: 121.5px;
  z-index: 1;
  height: calc(100%);
  .button__component{
    user-select: none;
    color: white;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding: 0.75rem 0;
    cursor: pointer;
    transition: all .1s ease-in;
    .icon__component{
      background-color: white;
    }
    &:hover{
      color: $green4;
      .bar{ 
        opacity: 100%; 
      }
      .icon__style__svg{
        filter: invert(61%) sepia(46%) saturate(626%) hue-rotate(116deg) brightness(102%) contrast(88%);
      }
      .icon__component{
        background-color: $green4;
      }
    }
    &:active{ color: $green5; }
  }
  .bar{
    opacity: 0;
    background-color: $green4;
    width: 5px;
    border-radius: 12px;
    transition: all .1s ease-in;
  }
}
.sidebar.left{
  transition: all .2s ease-out;
  left: -280px;
}
.sidebar.left.active{
  left: 0;
}
.sidebar.right{
  transition: all .2s ease-out;
  right: -280px;
}
.sidebar.right.active{
  right: 0;
}
.text__style__icon{
  font-family: "Times New Roman", Times, serif;
  font-weight: $fw300;
  font-size: 1rem;
}
.icon__style__large{
  font-size: 24px;
}
.icon__style__small{
  font-size: 16px;
}
.icon__style__svg{
  height: 26px;
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
.button__circle.green{
  background-color: $green4;
  &:hover{
    background-color: $green5;
  }
}
.button__circle.red{
  background-color: $red4;
  &:hover{
    background-color: $red5;
  }
}
.button__text{
  user-select: none;
  margin: 0 0.25rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  padding: 0.3rem 0.75rem;
  width: fit-content;
}
.button__text.white{
  cursor: pointer;
  color: white;
  transition: all .1s ease-in;
  &:hover{
    color: $blue5;
    background-color: white;
  }
}
.button__text.white.active{
  color: $blue10;
  background-color: white;
  transition: all .1s ease-in;
  &:hover{
    color: $blue5;
    background-color: white;
  }
}
.button__text.green{
  cursor: pointer;
  color: white;
  background-color: $green5;
  transition: all .1s ease-in;
  &:hover{
    color: white;
    background-color: $green6;
  }
}
.button__text.green.active{
  color: white;
  background-color: $green5;
}
// Section Style
.section__style{
  box-shadow: $baseshadow;
  //background-color: white;
  border-radius: $radius12px;
  padding: 0.75rem;
  // Section Style Config
  font-family: var(--section--style--font--name);
  font-size: var(--section--style--font--size);
}
@media only screen and (min-width: 1024px) {
  .section__style{
    width: 768px;
  }
  .section__bottom__style{
    width: 768px;
  }
}
@media only screen and (max-width: 1023px) {
  .section__style{
    width: 640px;
  }
  .section__bottom__style{
    width: 640px;
    transition: all .1s ease-in;
  }
  .section__bottom__style.active__action__button__properties{
    transition: all .1s ease-in;
    width: 320px;
  }
}
@media only screen and (max-width: 1024px) {
  .section__style{
    width: 640px;
  }
  .section__bottom__style{
    width: 640px;
    transition: all .1s ease-in;
  }
  .section__bottom__style.active__action__button__properties{
    transition: all .1s ease-in;
    width: 320px;
  }
}
.select__component__active{
  outline: 2px solid $blue6;
  border: none;
  border-radius: 12px;
  transition: all .1s ease-in;
}
.select__component__inactive{
  outline: 0px solid transparent;
  border: none;
  border-radius: 12px;
  transition: all .1s ease-in;
}
</style>