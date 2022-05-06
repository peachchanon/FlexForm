<template>
  <div class="tw-h-full">
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
      <div class="tw-w-full tw-fixed" style="top: 0; z-index: 2">
        <!-- Form Name Navbar -->
        <div class="tw-w-full bg-white base-padding">
          <div class="tw-flex tw-flex-row tw-items-center">
            <div class="tw-mr-4" @click="doShowSaveModal">
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
        <!-- Save Modal -->
        <transition name="theme-modal-fade" v-if="StateSaveModal">
          <div class="theme-modal-backdrop">
            <div class="theme-modal">
              <header class="base-padding tw-flex tw-flex-row tw-items-center tw-justify-start tw-relative">
                <Icon class="icon__style__large tw-mr-2 red5" icon="heroicons-outline:download"/>
                <span class="semibold24 red5">Save Changes ?</span>
              </header>
              <section class="tw-pl-3 tw-pr-3 tw-py-4 tw-overflow-x-hidden">
                <span class="medium16 grey10">Do you want to save your changes before exit? <br>If you don’t save, your changes will be lost.</span>
              </section>
              <footer class="tw-p-2.5 tw-flex tw-flex-row tw-justify-end">
                <div class="tw-w-1/3 tw-mr-1">
                  <div class="button__style__white red" @click="doShowSaveModal">Cancel</div>
                </div>
                <div class="tw-w-1/3 tw-mr-1">
                  <div class="button__style__white red" @click="PrevPage">Don't Save</div>
                </div>
                <div class="tw-w-1/3 tw-ml-1">
                  <div class="button__style__red" @click="SaveFormStructure">Save</div>
                </div>
              </footer>
            </div>
          </div>
        </transition>
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
            <div class="button__text green" v-if="StatePage==='Build'" @click="SaveFormStructure">
              <Icon class="icon__style__large tw-mr-2" icon="iconoir:save-floppy-disk"/>
              <span>Save Form</span>
            </div>
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
          style="z-index: 2"
      >
        <div class="tw-w-full tw-flex tw-flex-row tw-justify-start bg-grey8 tw-py-4 tw-px-6" style="border-radius: 0 0 8px 8px;">
          <Icon class="icon__style__large white tw-mr-2" icon="heroicons-outline:pencil"/>
          <span class="medium16 white tw-select-none">Tools</span>
        </div>
        <div class="tw-w-full tw-flex tw-flex-col bg-grey6" style="padding:0.3rem 1rem; height: calc(100vh - 180px); overflow-y: auto;">
          <div class="button__component" @click="addShortInputComponent">
            <div class="bar"></div>
            <div class="tw-w-full tw-flex tw-flex-row tw-items-center tw-px-2">
              <div class="tw-w-1/5">
                <div class="tw-relative"><Icon class="icon__style__large" icon="bi:input-cursor"/><span class="text__style__icon tw-absolute" style="left: 27px; top: 6px">S</span></div>
              </div>
              <div class="tw-w-4/5"><span class="medium16">Short Input</span></div>
            </div>
            <div class="bar"></div>
          </div>
          <div class="button__component" @click="addLongInputComponent">
            <div class="bar"></div>
            <div class="tw-w-full tw-flex tw-flex-row tw-items-center tw-px-2">
              <div class="tw-w-1/5">
                <div class="tw-relative"><Icon class="icon__style__large" icon="bi:input-cursor"/><span class="text__style__icon tw-absolute" style="left: 27px; top: 6px">L</span></div>
              </div>
              <div class="tw-w-4/5"><span class="medium16">Long Input</span></div>
            </div>
            <div class="bar"></div>
          </div>
          <div class="button__component" @click="addParagraphComponent">
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
          <div class="button__component" @click="addDropdownComponent">
            <div class="bar"></div>
            <div class="tw-w-full tw-flex tw-flex-row tw-items-center tw-px-2">
              <div class="tw-w-1/5">
                <div class="tw-flex tw-flex-row tw-items-center"><Icon class="icon__style__large" icon="bi:textarea-resize"/><Icon class="text__style__icon tw-mr-1" icon="bi:caret-down"/></div>
              </div>
              <div class="tw-w-4/5"><span class="medium16">Dropdown</span></div>
            </div>
            <div class="bar"></div>
          </div>
          <div class="button__component" @click="addChoiceComponent">
            <div class="bar"></div>
            <div class="tw-w-full tw-flex tw-flex-row tw-items-center tw-px-2">
              <div class="tw-w-1/5">
                <div class="tw-flex tw-flex-row tw-justify-center tw-mr-1"><Icon class="icon__style__large" icon="bi:ui-checks"/></div>
              </div>
              <div class="tw-w-4/5"><span class="medium16">Choice</span></div>
            </div>
            <div class="bar"></div>
          </div>
          <!--
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
          -->
        </div>
      </div>
      <!-- Properties Sidebar -->
      <div
          class="tw-fixed"
          :class="{'sidebar right': !StateShowPropertiesSidebar, 'sidebar right active': StateShowPropertiesSidebar}"
          style="z-index: 2"
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
                :dropdownValue="FormStructure.Sections[StateSelectSectionIndex].SectionProperties.SectionFontName"
                :propList="FontNameList"
                propType="fontstyle"
                propDropdownWidth="252"
                @callBackValue="doPropSectionFontName"
            ></base-dropdown-form-builder>
            <span class="medium16 white tw-mt-2 tw-mb-1">Font Size</span>
            <div class="tw-flex tw-flex-row tw-items-center">
              <base-dropdown-form-builder
                  :dropdownValue="FormStructure.Sections[StateSelectSectionIndex].SectionProperties.SectionFontSize.toString()"
                  propType="fontsize"
                  propDropdownWidth="70"
                  @callBackValue="doPropSectionFontSize"
              ></base-dropdown-form-builder>
              <span class="medium16 white tw-ml-3">px</span>
            </div>
            <span class="medium16 white tw-mt-2 tw-mb-1">Font Color</span>
            <base-text-input-properties-form-builder
                type="color"
                :propValue="FormStructure.Sections[StateSelectSectionIndex].SectionProperties.SectionFontColor"
                class="tw-mb-2"
                @callBackString="doPropSectionFontColor"
            ></base-text-input-properties-form-builder>
            <span class="medium16 white tw-mt-2 tw-mb-1">Background Color</span>
            <base-text-input-properties-form-builder
                type="color"
                :propValue="FormStructure.Sections[StateSelectSectionIndex].SectionProperties.SectionBackgroundColor.substring(3)"
                class="tw-mb-2"
                @callBackString="doPropSectionBgColor"
            ></base-text-input-properties-form-builder>
          </div>
          <!-- All Component -->
          <!-- Short Input -->
          <div v-if="StatePropSelectShortInput" class="tw-flex tw-flex-col">
            <base-navigation-properties-form-builder
                :itemList="['Basic','Advance','Style']"
                @callbackName="doStatePropShortInputNavigation"
            ></base-navigation-properties-form-builder>
            <div v-if="StatePropSelectShortInputBasic" class="tw-flex tw-flex-col base-padding">
              <span class="semibold24 white tw-my-1">Short Input</span>
              <span class="medium16 white tw-mt-2 tw-mb-1">Label Text</span>
              <span class="light14 grey2 tw-mb-2 tw-mb-1">Type your question here</span>
              <base-text-input-properties-form-builder
                  type="text"
                  :propValue="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.LabelText"
                  class="tw-mb-2"
                  @callBackString="doPropShortInputLabelText"
              ></base-text-input-properties-form-builder>
              <span class="medium16 white tw-mt-2 tw-mb-1">Sub Label Text (Optional)</span>
              <span class="light14 grey2 tw-mb-2 tw-mb-1">Add your description here</span>
              <base-text-input-properties-form-builder
                  type="text"
                  :propValue="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.SubLabelText"
                  class="tw-mb-2"
                  @callBackString="doPropShortInputSubLabelText"
              ></base-text-input-properties-form-builder>
              <span class="medium16 white tw-mt-2 tw-mb-1">Label Alignment</span>
              <base-text-input-properties-form-builder
                  type="alignment2"
                  :propValue="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.Alignment"
                  class="tw-mb-2"
                  @callBackString="doPropShortInputAlignment"
              ></base-text-input-properties-form-builder>
              <span class="medium16 white tw-mt-2 tw-mb-1">Required</span>
              <base-text-input-properties-form-builder
                  type="toggle"
                  class="tw-mb-2"
                  :propValueToggle="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.Required"
                  @callBackBoolean="doPropShortInputRequired"
              ></base-text-input-properties-form-builder>
              <span class="medium16 white tw-mt-2 tw-mb-1">Placeholder</span>
              <span class="light14 grey2 tw-mb-2 tw-mb-1">Type your placeholder here</span>
              <base-text-input-properties-form-builder
                  type="text"
                  :propValue="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.Placeholder"
                  class="tw-mb-2"
                  @callBackString="doPropShortInputPlaceholder"
              ></base-text-input-properties-form-builder>
              <span class="medium16 white tw-mt-2 tw-mb-1">Width</span>
              <span class="light14 grey2 tw-mb-2 tw-mb-1">You can change your field’s width</span>
              <div class="tw-flex tw-flex-row tw-items-center tw-mb-2">
                <span class="medium16 tw-mr-3 tw-ease-in tw-transition tw-my-2" :class="{
                  'green3': FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.FixWidth,
                  'grey3': !FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.FixWidth,
                }">Fixed</span>
                <base-text-input-properties-form-builder
                    type="toggle"
                    :propValueToggle="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.FixWidth"
                    @callBackBoolean="doPropShortInputWidth"
                ></base-text-input-properties-form-builder>
              </div>
              <div
                  v-if="!FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.FixWidth"
                  class="tw-flex tw-flex-row tw-items-center tw-mb-2"
              >
                <base-text-input-properties-form-builder
                    style="width: 100px"
                    type="number"
                    :propValueNumber="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.Width"
                    @callBackNumber="doPropShortInputWidth"
                ></base-text-input-properties-form-builder>
                <span class="medium16 white tw-ml-3">px</span>
              </div>
            </div>
            <div v-if="StatePropSelectShortInputAdvance" class="tw-flex tw-flex-col base-padding">
              <span class="medium16 white tw-mt-2 tw-mb-1">Read Only</span>
              <span class="light14 grey2 tw-mb-2 tw-mb-1">Prevent to input this field</span>
              <base-text-input-properties-form-builder
                  type="toggle"
                  :propValueToggle="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.ReadOnly"
                  class="tw-my-2"
                  @callBackBoolean="doPropShortInputLabelReadOnly"
              ></base-text-input-properties-form-builder>
              <span class="medium16 white tw-mt-2 tw-mb-1">Character Limit</span>
              <span class="light14 grey2 tw-mb-2 tw-mb-1">Limit the number of characters</span>
              <div class="tw-flex tw-flex-row tw-items-center">
                <span class="medium16 tw-mr-3 tw-ease-in tw-transition tw-my-2" :class="{
                    'green3': FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.CharacterLimit,
                    'grey3': !FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.CharacterLimit,
                  }">Limited</span>
                <base-text-input-properties-form-builder
                    type="toggle"
                    :propValueToggle="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.CharacterLimit"
                    class="tw-my-2"
                    @callBackBoolean="doPropShortInputCharacterLimit"
                ></base-text-input-properties-form-builder>
              </div>
              <div
                  v-if="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.CharacterLimit"
                  class="tw-flex tw-flex-row tw-items-center tw-mb-2"
              >
                <base-text-input-properties-form-builder
                    style="width: 100px"
                    type="number"
                    :propValueNumber="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.CharacterLimitValue"
                    @callBackNumber="doPropShortInputCharacterLimitValue"
                ></base-text-input-properties-form-builder>
                <span class="medium16 white tw-ml-3">characters</span>
              </div>
              <span class="medium16 white tw-mt-2 tw-mb-1">Validation</span>
              <base-dropdown-form-builder
                  :dropdownValue="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.Validation"
                  propType="basic"
                  propDropdownWidth="252"
                  :propList="ShortInputValidationList"
                  @callBackValue="doPropShortInputValidation"
              ></base-dropdown-form-builder>
            </div>
            <div v-if="StatePropSelectShortInputStyle" class="tw-flex tw-flex-col base-padding">
              <span class="medium16 white tw-mt-2 tw-mb-1">Font Color</span>
              <base-text-input-properties-form-builder
                  type="color"
                  :propValue="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.FontColor"
                  class="tw-mb-2"
                  @callBackString="doPropShortInputFontColor"
              ></base-text-input-properties-form-builder>
              <span class="medium16 white tw-mt-2 tw-mb-1">Input Background Color</span>
              <base-text-input-properties-form-builder
                  type="color"
                  :propValue="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.InputBgColor.substring(3)"
                  class="tw-mb-2"
                  @callBackString="doPropShortInputFontInputBgColor"
              ></base-text-input-properties-form-builder>
              <span class="medium16 white tw-mt-2 tw-mb-1">Font Size</span>
              <div class="tw-flex tw-flex-row tw-items-center">
                <base-dropdown-form-builder
                    :dropdownValue="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.LabelFontSize.toString()"
                    propType="fontsize"
                    propDropdownWidth="70"
                    @callBackValue="doPropShortInputLabelFontSize"
                ></base-dropdown-form-builder>
                <span class="medium16 white tw-ml-3">px</span>
              </div>
            </div>
          </div>
          <!-- Long Input -->
          <div v-if="StatePropSelectLongInput" class="tw-flex tw-flex-col">
            <base-navigation-properties-form-builder
                :itemList="['Basic','Advance','Style']"
                @callbackName="doStatePropLongInputNavigation"
            ></base-navigation-properties-form-builder>
            <div v-if="StatePropSelectLongInputBasic" class="tw-flex tw-flex-col base-padding">
              <span class="semibold24 white tw-my-1">Long Input</span>
              <span class="medium16 white tw-mt-2 tw-mb-1">Label Text</span>
              <span class="light14 grey2 tw-mb-2 tw-mb-1">Type your question here</span>
              <base-text-input-properties-form-builder
                  type="text"
                  :propValue="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.LabelText"
                  class="tw-mb-2"
                  @callBackString="doPropLongInputLabelText"
              ></base-text-input-properties-form-builder>
              <span class="medium16 white tw-mt-2 tw-mb-1">Sub Label Text (Optional)</span>
              <span class="light14 grey2 tw-mb-2 tw-mb-1">Add your description here</span>
              <base-text-input-properties-form-builder
                  type="text"
                  :propValue="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.SubLabelText"
                  class="tw-mb-2"
                  @callBackString="doPropLongInputSubLabelText"
              ></base-text-input-properties-form-builder>
              <span class="medium16 white tw-mt-2 tw-mb-1">Label Alignment</span>
              <base-text-input-properties-form-builder
                  type="alignment2"
                  :propValue="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.Alignment"
                  class="tw-mb-2"
                  @callBackString="doPropShortInputAlignment"
              ></base-text-input-properties-form-builder>
              <span class="medium16 white tw-mt-2 tw-mb-1">Required</span>
              <base-text-input-properties-form-builder
                  type="toggle"
                  class="tw-mb-2"
                  :propValueToggle="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.Required"
                  @callBackBoolean="doPropShortInputRequired"
              ></base-text-input-properties-form-builder>
              <span class="medium16 white tw-mt-2 tw-mb-1">Placeholder</span>
              <span class="light14 grey2 tw-mb-2 tw-mb-1">Type your placeholder here</span>
              <base-text-input-properties-form-builder
                  type="text"
                  :propValue="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.Placeholder"
                  class="tw-mb-2"
                  @callBackString="doPropShortInputPlaceholder"
              ></base-text-input-properties-form-builder>
              <span class="medium16 white tw-mt-2 tw-mb-1">Width</span>
              <span class="light14 grey2 tw-mb-2 tw-mb-1">You can change your field’s width</span>
              <div class="tw-flex tw-flex-row tw-items-center tw-mb-2">
                <span class="medium16 tw-mr-3 tw-ease-in tw-transition tw-my-2" :class="{
                  'green3': FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.FixWidth,
                  'grey3': !FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.FixWidth,
                }">Fixed</span>
                <base-text-input-properties-form-builder
                    type="toggle"
                    :propValueToggle="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.FixWidth"
                    @callBackBoolean="doPropShortInputWidth"
                ></base-text-input-properties-form-builder>
              </div>
              <div
                  v-if="!FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.FixWidth"
                  class="tw-flex tw-flex-row tw-items-center tw-mb-2"
              >
                <base-text-input-properties-form-builder
                    style="width: 100px"
                    type="number"
                    :propValueNumber="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.Width"
                    @callBackNumber="doPropShortInputWidth"
                ></base-text-input-properties-form-builder>
                <span class="medium16 white tw-ml-3">px</span>
              </div>
            </div>
            <div v-if="StatePropSelectLongInputAdvance" class="tw-flex tw-flex-col base-padding">
              <span class="medium16 white tw-mt-2 tw-mb-1">Read Only</span>
              <span class="light14 grey2 tw-mb-2 tw-mb-1">Prevent to input this field</span>
              <base-text-input-properties-form-builder
                  type="toggle"
                  :propValueToggle="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.ReadOnly"
                  class="tw-my-2"
                  @callBackBoolean="doPropShortInputLabelReadOnly"
              ></base-text-input-properties-form-builder>
              <span class="medium16 white tw-mt-2 tw-mb-1">Character Limit</span>
              <span class="light14 grey2 tw-mb-2 tw-mb-1">Limit the number of characters</span>
              <div class="tw-flex tw-flex-row tw-items-center">
                <span class="medium16 tw-mr-3 tw-ease-in tw-transition tw-my-2" :class="{
                    'green3': FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.CharacterLimit,
                    'grey3': !FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.CharacterLimit,
                  }">Limited</span>
                <base-text-input-properties-form-builder
                    type="toggle"
                    :propValueToggle="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.CharacterLimit"
                    class="tw-my-2"
                    @callBackBoolean="doPropShortInputCharacterLimit"
                ></base-text-input-properties-form-builder>
              </div>
              <div
                  v-if="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.CharacterLimit"
                  class="tw-flex tw-flex-row tw-items-center tw-mb-2"
              >
                <base-text-input-properties-form-builder
                    style="width: 100px"
                    type="number"
                    :propValueNumber="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.CharacterLimitValue"
                    @callBackNumber="doPropShortInputCharacterLimitValue"
                ></base-text-input-properties-form-builder>
                <span class="medium16 white tw-ml-3">characters</span>
              </div>
            </div>
            <div v-if="StatePropSelectLongInputStyle" class="tw-flex tw-flex-col base-padding">
              <span class="medium16 white tw-mt-2 tw-mb-1">Font Color</span>
              <base-text-input-properties-form-builder
                  type="color"
                  :propValue="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.FontColor"
                  class="tw-mb-2"
                  @callBackString="doPropShortInputFontColor"
              ></base-text-input-properties-form-builder>
              <span class="medium16 white tw-mt-2 tw-mb-1">Input Background Color</span>
              <base-text-input-properties-form-builder
                  type="color"
                  :propValue="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.InputBgColor.substring(3)"
                  class="tw-mb-2"
                  @callBackString="doPropShortInputFontInputBgColor"
              ></base-text-input-properties-form-builder>
              <span class="medium16 white tw-mt-2 tw-mb-1">Border Color</span>
              <base-text-input-properties-form-builder
                  type="color"
                  :propValue="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.BorderColor"
                  class="tw-mb-2"
                  @callBackString="doPropShortInputBorderColor"
              ></base-text-input-properties-form-builder>
              <span class="medium16 white tw-mt-2 tw-mb-1">Font Size</span>
              <div class="tw-flex tw-flex-row tw-items-center">
                <base-dropdown-form-builder
                    :dropdownValue="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.LabelFontSize.toString()"
                    propType="fontsize"
                    propDropdownWidth="70"
                    @callBackValue="doPropShortInputLabelFontSize"
                ></base-dropdown-form-builder>
                <span class="medium16 white tw-ml-3">px</span>
              </div>
            </div>
          </div>
          <!-- Paragraph -->
          <div v-if="StatePropSelectParagraph" class="tw-flex tw-flex-col">
            <base-navigation-properties-form-builder
                :itemList="['Basic','Style']"
                @callbackName="doStatePropParagraphNavigation"
            ></base-navigation-properties-form-builder>
            <div v-if="StatePropSelectParagraphBasic" class="tw-flex tw-flex-col base-padding">
              <span class="semibold24 white tw-my-1">Paragraph</span>
              <span class="medium16 white tw-mt-2 tw-mb-1">Label Text</span>
              <span class="light14 grey2 tw-mb-2 tw-mb-1">Type your question here</span>
              <base-text-input-properties-form-builder
                  type="textarea"
                  :propValue="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.LabelText"
                  class="tw-mb-2"
                  @callBackString="doPropParagraphLabelText"
              ></base-text-input-properties-form-builder>
              <span class="medium16 white tw-mt-2 tw-mb-1">Text Alignment</span>
              <span class="light14 grey2 tw-mb-2 tw-mb-1">Type your heading here</span>
              <base-text-input-properties-form-builder
                  type="alignment"
                  :propValue="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.Alignment"
                  class="tw-mb-2"
                  @callBackString="doPropParagraphAlignment"
              ></base-text-input-properties-form-builder>
              <span class="medium16 white tw-mt-2 tw-mb-1">Width</span>
              <span class="light14 grey2 tw-mb-2 tw-mb-1">You can change your field’s width</span>
              <div class="tw-flex tw-flex-row tw-items-center tw-mb-2">
                <span class="medium16 tw-mr-3 tw-ease-in tw-transition tw-my-2" :class="{
                  'green3': FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.FixWidth,
                  'grey3': !FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.FixWidth,
                }">Fixed</span>
                <base-text-input-properties-form-builder
                    type="toggle"
                    :propValueToggle="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.FixWidth"
                    @callBackBoolean="doPropParagraphWidth"
                ></base-text-input-properties-form-builder>
              </div>
              <div
                  v-if="!FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.FixWidth"
                  class="tw-flex tw-flex-row tw-items-center tw-mb-2"
              >
                <base-text-input-properties-form-builder
                    style="width: 100px"
                    type="number"
                    :propValueNumber="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.Width"
                    @callBackNumber="doPropParagraphWidth"
                ></base-text-input-properties-form-builder>
                <span class="medium16 white tw-ml-3">px</span>
              </div>
            </div>
            <div v-if="StatePropSelectParagraphStyle" class="tw-flex tw-flex-col base-padding">
              <span class="medium16 white tw-mt-2 tw-mb-1">Font Color</span>
              <base-text-input-properties-form-builder
                  type="color"
                  :propValue="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.FontColor"
                  class="tw-mb-2"
                  @callBackString="doPropParagraphFontColor"
              ></base-text-input-properties-form-builder>
              <span class="medium16 white tw-mt-2 tw-mb-1">Font Size</span>
              <div class="tw-flex tw-flex-row tw-items-center">
                <base-dropdown-form-builder
                    :dropdownValue="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.FontSize.toString()"
                    propType="fontsize"
                    propDropdownWidth="70"
                    @callBackValue="doPropParagraphFontSize"
                ></base-dropdown-form-builder>
                <span class="medium16 white tw-ml-3">px</span>
              </div>
            </div>
          </div>
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
          <!-- Dropdown -->
          <div v-if="StatePropSelectDropdown" class="tw-flex tw-flex-col">
            <base-navigation-properties-form-builder
                :itemList="['Basic','Advance','Style']"
                @callbackName="doStatePropDropdownNavigation"
            ></base-navigation-properties-form-builder>
            <div v-if="StatePropSelectDropdownBasic" class="tw-flex tw-flex-col base-padding">
              <span class="semibold24 white tw-my-1">Dropdown</span>
              <span class="medium16 white tw-mt-2 tw-mb-1">Label Text</span>
              <span class="light14 grey2 tw-mb-2 tw-mb-1">Type your question here</span>
              <base-text-input-properties-form-builder
                  type="text"
                  :propValue="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.LabelText"
                  class="tw-mb-2"
                  @callBackString="doPropDropdownLabelText"
              ></base-text-input-properties-form-builder>
              <div v-if="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.PredefinedOptions === 'None'" class="tw-flex tw-flex-col">
                <span class="medium16 white tw-mt-2 tw-mb-1">Options</span>
                <span class="light14 grey2 tw-mb-2 tw-mb-1">Type your options here and separate each on a new line</span>
                <base-options-form-builder
                    :propList="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.Options" 
                    @callbackAction="doPropDropdownOptions"
                ></base-options-form-builder>
              </div>
              <span class="medium16 white tw-mt-2 tw-mb-1">Sub Label Text (Optional)</span>
              <span class="light14 grey2 tw-mb-2 tw-mb-1">Add your description here</span>
              <base-text-input-properties-form-builder
                  type="text"
                  :propValue="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.SubLabelText"
                  class="tw-mb-2"
                  @callBackString="doPropDropdownSubLabelText"
              ></base-text-input-properties-form-builder>
              <span class="medium16 white tw-mt-2 tw-mb-1">Label Alignment</span>
              <base-text-input-properties-form-builder
                  type="alignment2"
                  :propValue="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.Alignment"
                  class="tw-mb-2"
                  @callBackString="doPropDropdownAlignment"
              ></base-text-input-properties-form-builder>
              <span class="medium16 white tw-mt-2 tw-mb-1">Required</span>
              <base-text-input-properties-form-builder
                  type="toggle"
                  class="tw-mb-2"
                  :propValueToggle="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.Required"
                  @callBackBoolean="doPropDropdownRequired"
              ></base-text-input-properties-form-builder>
              <span class="medium16 white tw-mt-2 tw-mb-1">Placeholder</span>
              <span class="light14 grey2 tw-mb-2 tw-mb-1">Type your placeholder here</span>
              <base-text-input-properties-form-builder
                  type="text"
                  :propValue="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.Placeholder"
                  class="tw-mb-2"
                  @callBackString="doPropDropdownPlaceholder"
              ></base-text-input-properties-form-builder>
              <span class="medium16 white tw-mt-2 tw-mb-1">Width</span>
              <span class="light14 grey2 tw-mb-2 tw-mb-1">You can change your field’s width</span>
              <div class="tw-flex tw-flex-row tw-items-center tw-mb-2">
                <span class="medium16 tw-mr-3 tw-ease-in tw-transition tw-my-2" :class="{
                  'green3': FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.FixWidth,
                  'grey3': !FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.FixWidth,
                }">Fixed</span>
                <base-text-input-properties-form-builder
                    type="toggle"
                    :propValueToggle="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.FixWidth"
                    @callBackBoolean="doPropDropdownWidth"
                ></base-text-input-properties-form-builder>
              </div>
              <div
                  v-if="!FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.FixWidth"
                  class="tw-flex tw-flex-row tw-items-center tw-mb-2"
              >
                <base-text-input-properties-form-builder
                    style="width: 100px"
                    type="number"
                    :propValueNumber="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.Width"
                    @callBackNumber="doPropDropdownWidth"
                ></base-text-input-properties-form-builder>
                <span class="medium16 white tw-ml-3">px</span>
              </div>
            </div>
            <div v-if="StatePropSelectDropdownAdvance" class="tw-flex tw-flex-col base-padding">
              <span class="medium16 white tw-mt-2 tw-mb-1">Read Only</span>
              <span class="light14 grey2 tw-mb-2 tw-mb-1">Prevent to input this field</span>
              <base-text-input-properties-form-builder
                  type="toggle"
                  :propValueToggle="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.ReadOnly"
                  class="tw-my-2"
                  @callBackBoolean="doPropDropdownLabelReadOnly"
              ></base-text-input-properties-form-builder>
              <span class="medium16 white tw-mt-2 tw-mb-1">Validation</span>
              <base-dropdown-form-builder
                  class="tw-mb-3"
                  :dropdownValue="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.PredefinedOptions"
                  propType="basic"
                  propDropdownWidth="252"
                  :propList="PredefinedOptions"
                  @callBackValue="doPropDropdownPredefinedOptions"
              ></base-dropdown-form-builder>
            </div>
            <div v-if="StatePropSelectDropdownStyle" class="tw-flex tw-flex-col base-padding">
              <span class="medium16 white tw-mt-2 tw-mb-1">Font Color</span>
              <base-text-input-properties-form-builder
                  type="color"
                  :propValue="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.FontColor"
                  class="tw-mb-2"
                  @callBackString="doPropDropdownFontColor"
              ></base-text-input-properties-form-builder>
              <span class="medium16 white tw-mt-2 tw-mb-1">Input Background Color</span>
              <base-text-input-properties-form-builder
                  type="color"
                  :propValue="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.InputBgColor.substring(3)"
                  class="tw-mb-2"
                  @callBackString="doPropDropdownFontInputBgColor"
              ></base-text-input-properties-form-builder>
              <span class="medium16 white tw-mt-2 tw-mb-1">Border Color</span>
              <base-text-input-properties-form-builder
                  type="color"
                  :propValue="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.BorderColor"
                  class="tw-mb-2"
                  @callBackString="doPropDropdownBorderColor"
              ></base-text-input-properties-form-builder>
              <span class="medium16 white tw-mt-2 tw-mb-1">Font Size</span>
              <div class="tw-flex tw-flex-row tw-items-center">
                <base-dropdown-form-builder
                    :dropdownValue="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.LabelFontSize.toString()"
                    propType="fontsize"
                    propDropdownWidth="70"
                    @callBackValue="doPropDropdownLabelFontSize"
                ></base-dropdown-form-builder>
                <span class="medium16 white tw-ml-3">px</span>
              </div>
            </div>
          </div>
          <!-- Choice -->
          <div v-if="StatePropSelectChoice" class="tw-flex tw-flex-col">
            <base-navigation-properties-form-builder
                :itemList="['Basic','Advance','Style']"
                @callbackName="doStatePropChoiceNavigation"
            ></base-navigation-properties-form-builder>
            <div v-if="StatePropSelectChoiceBasic" class="tw-flex tw-flex-col base-padding">
              <span class="semibold24 white tw-my-1">Choice</span>
              <span class="medium16 white tw-mt-2 tw-mb-1">Label Text</span>
              <span class="light14 grey2 tw-mb-2 tw-mb-1">Type your question here</span>
              <base-text-input-properties-form-builder
                  type="text"
                  :propValue="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.LabelText"
                  class="tw-mb-2"
                  @callBackString="doPropChoiceLabelText"
              ></base-text-input-properties-form-builder>
              <span class="medium16 white tw-mt-2 tw-mb-1">Choice</span>
              <span class="light14 grey2 tw-mb-2 tw-mb-1">Select Single or Multiple choice</span>
              <div class="tw-flex tw-flex-row tw-items-center tw-mb-2">
                <span class="medium16 tw-mr-3 tw-ease-in tw-transition tw-my-2" :class="{
                  'green3': FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.MultipleChoice,
                  'grey3': !FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.MultipleChoice,
                }">Multiple Choice</span>
                <base-text-input-properties-form-builder
                    type="toggle"
                    :propValueToggle="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.MultipleChoice"
                    @callBackBoolean="doPropChoiceMultipleChoice"
                ></base-text-input-properties-form-builder>
              </div>
              <span class="medium16 white tw-mt-2 tw-mb-1">Sub Label Text (Optional)</span>
              <span class="light14 grey2 tw-mb-2 tw-mb-1">Add your description here</span>
              <base-text-input-properties-form-builder
                  type="text"
                  :propValue="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.SubLabelText"
                  class="tw-mb-2"
                  @callBackString="doPropChoiceSubLabelText"
              ></base-text-input-properties-form-builder>
              <div v-if="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.PredefinedOptions === 'None'" class="tw-flex tw-flex-col">
                <span class="medium16 white tw-mt-2 tw-mb-1">Options</span>
                <span class="light14 grey2 tw-mb-2 tw-mb-1">Type your options here and separate each on a new line</span>
                <base-options-form-builder
                    :propList="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.Options"
                    @callbackAction="doPropChoiceOptions"
                ></base-options-form-builder>
              </div>
              <span class="medium16 white tw-mt-2 tw-mb-1">Required</span>
              <div class="tw-flex tw-flex-row tw-items-center tw-mb-2">
                <span class="medium16 tw-mr-3 tw-ease-in tw-transition tw-my-2" :class="{
                  'green3': FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.Required,
                  'grey3': !FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.Required,
                }">On</span>
                <base-text-input-properties-form-builder
                    type="toggle"
                    :propValueToggle="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.Required"
                    @callBackBoolean="doPropChoiceRequired"
                ></base-text-input-properties-form-builder>
              </div>
            </div>
            <div v-if="StatePropSelectChoiceAdvance" class="tw-flex tw-flex-col base-padding">
              <span class="medium16 white tw-mt-2 tw-mb-1">Read-only</span>
              <span class="light14 grey2 tw-mb-2 tw-mb-1">Prevent to input this field</span>
              <div class="tw-flex tw-flex-row tw-items-center tw-mb-2">
                <span class="medium16 tw-mr-3 tw-ease-in tw-transition tw-my-2" :class="{
                  'green3': FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.ReadOnly,
                  'grey3': !FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.ReadOnly,
                }">On</span>
                <base-text-input-properties-form-builder
                    type="toggle"
                    :propValueToggle="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.ReadOnly"
                    @callBackBoolean="doPropChoiceReadOnly"
                ></base-text-input-properties-form-builder>
              </div>
              <div v-if="!FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.MultipleChoice">
                <span class="medium16 white tw-mt-2 tw-mb-1">Spread to Columns</span>
                <div class="light14 grey2 tw-mb-2 tw-mb-1">Spread choices into 2 columns</div>
                <div class="tw-flex tw-flex-row tw-items-center tw-mb-2">
                <span class="medium16 tw-mr-3 tw-ease-in tw-transition tw-my-2" :class="{
                  'green3': FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.SpreadToColumns,
                  'grey3': !FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.SpreadToColumns,
                }">On</span>
                  <base-text-input-properties-form-builder
                      type="toggle"
                      :propValueToggle="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.SpreadToColumns"
                      @callBackBoolean="doPropChoiceSpreadToColumns"
                  ></base-text-input-properties-form-builder>
                </div>
              </div>
              <span class="medium16 white tw-mt-2 tw-mb-1">Predefined Options</span>
              <span class="light14 grey2 tw-mb-2 tw-mb-1">Quickly add frequently used options</span>
              <base-dropdown-form-builder
                  class="tw-mb-3"
                  :dropdownValue="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.PredefinedOptions"
                  propType="basic"
                  propDropdownWidth="252"
                  :propList="PredefinedOptions"
                  @callBackValue="doPropChoicePredefinedOptions"
              ></base-dropdown-form-builder>
            </div>
            <div v-if="StatePropSelectChoiceStyle" class="tw-flex tw-flex-col base-padding">
              <span class="medium16 white tw-mt-2 tw-mb-1">Font Color</span>
              <base-text-input-properties-form-builder
                  type="color"
                  :propValue="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.FontColor"
                  class="tw-mb-2"
                  @callBackString="doPropChoiceFontColor"
              ></base-text-input-properties-form-builder>
              <span class="medium16 white tw-mt-2 tw-mb-1">Font Size</span>
              <div class="tw-flex tw-flex-row tw-items-center">
                <base-dropdown-form-builder
                    :dropdownValue="FormStructure.Sections[StateSelectSectionIndex].Components[StateSelectComponentIndex].ComponentProperties.LabelFontSize.toString()"
                    propType="fontsize"
                    propDropdownWidth="70"
                    @callBackValue="doPropChoiceLabelFontSize"
                ></base-dropdown-form-builder>
                <span class="medium16 white tw-ml-3">px</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Builder Page -->
      <div class="tw-w-full" style="padding-top: 170px" v-if="StatePage==='Build'">
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
                      FormStructure.Sections[indexSection].SectionProperties.SectionFontColor,
                      FormStructure.Sections[indexSection].SectionProperties.SectionBackgroundColor
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
                    <div class="tw-flex tw-flex-row tw-relative">
                      <!-- Short Input Component -->
                      <div v-if="componentElement.ComponentType === 'short-input'" class="tw-cursor-pointer tw-w-full"
                           @click="doSelectSection(indexSection,componentIndex)"
                      >
                        <short-input
                          :dataShortInput="componentElement.ComponentProperties"
                          :class="{
                          'select__component__active': componentIndex === StateSelectComponentIndex && indexSection === StateSelectSectionIndex && StatePropSelectShortInput,
                          'select__component__inactive': componentIndex !== StateSelectComponentIndex && indexSection === StateSelectSectionIndex && !StatePropSelectShortInput
                        }"
                        ></short-input>
                      </div>
                      <!-- Long Input Component -->
                      <div v-if="componentElement.ComponentType === 'long-input'" class="tw-cursor-pointer tw-w-full"
                           @click="doSelectSection(indexSection,componentIndex)"
                      >
                        <long-input
                            :dataLongInput="componentElement.ComponentProperties"
                            :class="{
                          'select__component__active': componentIndex === StateSelectComponentIndex && indexSection === StateSelectSectionIndex && StatePropSelectLongInput,
                          'select__component__inactive': componentIndex !== StateSelectComponentIndex && indexSection === StateSelectSectionIndex && !StatePropSelectLongInput
                        }"
                        ></long-input>
                      </div>
                      <!-- Paragraph Component -->
                      <div v-if="componentElement.ComponentType === 'paragraph'" class="tw-cursor-pointer tw-w-full"
                           @click="doSelectSection(indexSection,componentIndex)"
                      >
                        <paragraph-component
                            :dataParagraph="componentElement.ComponentProperties"
                            :class="{
                          'select__component__active': componentIndex === StateSelectComponentIndex && indexSection === StateSelectSectionIndex && StatePropSelectParagraph,
                          'select__component__inactive': componentIndex !== StateSelectComponentIndex && indexSection === StateSelectSectionIndex && !StatePropSelectParagraph
                        }"
                        ></paragraph-component>
                      </div>
                      <!-- Heading Component -->
                      <div v-if="componentElement.ComponentType === 'heading'" class="tw-cursor-pointer tw-w-full"
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
                      <!-- Dropdown Component -->
                      <div v-if="componentElement.ComponentType === 'dropdown'" class="tw-cursor-pointer tw-w-full"
                           @click="doSelectSection(indexSection,componentIndex)"
                      >
                        <dropdown-component
                            :dataDropdown="componentElement.ComponentProperties"
                            :class="{
                          'select__component__active': componentIndex === StateSelectComponentIndex && indexSection === StateSelectSectionIndex && StatePropSelectDropdown,
                          'select__component__inactive': componentIndex !== StateSelectComponentIndex && indexSection === StateSelectSectionIndex && !StatePropSelectDropdown
                        }"
                        ></dropdown-component>
                      </div>
                      <!-- Choice Component -->
                      <div v-if="componentElement.ComponentType === 'choice'" class="tw-cursor-pointer tw-w-full"
                           @click="doSelectSection(indexSection,componentIndex)"
                      >
                        <choice-component
                            :dataChoice="componentElement.ComponentProperties"
                            :class="{
                          'select__component__active': componentIndex === StateSelectComponentIndex && indexSection === StateSelectSectionIndex && StatePropSelectChoice,
                          'select__component__inactive': componentIndex !== StateSelectComponentIndex && indexSection === StateSelectSectionIndex && !StatePropSelectChoice
                        }"
                        ></choice-component>
                      </div>
                      <base-tools-component-form-builder
                          class="tw-absolute tw-z-1"
                          style="right: -60px"
                          v-if="componentIndex === StateSelectComponentIndex && indexSection === StateSelectSectionIndex && StateShowToolsComponent" 
                          :componentLength="FormStructure.Sections[indexSection].Components.length" 
                          :componentIndex="componentIndex" 
                          :componentType="FormStructure.Sections[indexSection].Components[componentIndex].ComponentType"
                          :sectionName="FormStructure.Sections[indexSection].SectionName"
                          :componentData="FormStructure.Sections[indexSection].Components"
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
                :class="[{'select__component__inactive': !StatePropSelectActionButton},{'select__component__active':StatePropSelectActionButton}]"
                @click="doStateActionButtonProperties"
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
      <!-- Preview -->
      <div class="tw-w-full tw-flex tw-flex-col tw-items-center" style="padding-top: 170px" v-if="StatePage==='Preview'">
        <div class="base-padding">
          {{FormStructure}}
        </div>
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
                    <short-input :dataShortInput="componentElement.ComponentProperties"></short-input>
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
            <div class="tw-mt-5 with-line">
              <span class="light14 grey5">{{itemSection.SectionName}}</span>
            </div>
          </div>
          <div class="section__bottom__style tw-w-full tw-py-3 tw-flex tw-flex-row tw-justify-end">
            <button-section
                :propDataName="FormStructure.ActionButton.ActionButtonName"
                :propDataFontColor="FormStructure.ActionButton.ActionButtonProperties.FontColor"
                :propDataBgColor="FormStructure.ActionButton.ActionButtonProperties.BackgroundColor"
            ></button-section>
          </div>
        </div>
      </div>
      <!-- Setting -->
      <div class="tw-w-full tw-flex tw-flex-col tw-items-center" style="padding-top: 150px" v-if="StatePage==='Setting'">
        <div class="box" style="width: 560px">
          <div class="base-margin tw-flex tw-flex-row tw-items-center">
            <Icon class="semibold24 icon blue10" icon="clarity:cog-line"/>
            <span class="semibold24 blue10 tw-ml-2">Setting</span>
          </div>
          <div class="base-margin tw-flex tw-flex-col tw-border-2 tw-border-gray2 radius12px base-padding">
            <div class="tw-flex tw-flex-row tw-mb-5">
              <div style="width: 170px">
                <span class="medium16 grey10">Form Name</span>
              </div>
              <div class="tw-w-full">
                <span class="light16 grey7">{{FormStructure.FormName}}</span>
              </div>
            </div>
            <div class="tw-flex tw-flex-row tw-mb-5">
              <div style="width: 170px">
                <span class="medium16 grey10">Description</span>
              </div>
              <div class="tw-w-full">
                <span class="light16 grey7">{{FormStructure.FormDescription}}</span>
              </div>
            </div>
            <div class="tw-flex tw-flex-row tw-mb-5">
              <div style="width: 150px">
                <span class="medium16 grey10">Create by</span>
              </div>
              <div class="tw-w-full">
                <span class="light16 grey7">{{FormStructure.CreatedByUser}}</span>
              </div>
            </div>
            <div class="tw-flex tw-flex-row tw-mb-5">
              <div style="width: 150px">
                <span class="medium16 grey10">Modified by</span>
              </div>
              <div class="tw-w-full">
                <span class="light16 grey7">{{FormStructure.ModifiedByUser}}</span>
              </div>
            </div>
            <div class="tw-flex tw-flex-row tw-mb-5">
              <div style="width: 150px">
                <span class="medium16 grey10">Create Date</span>
              </div>
              <div>
                <span class="light16 grey7">{{FormStructure.FormCreatedTimestamp}}</span> 
              </div>
            </div>
            <div class="tw-flex tw-flex-row">
              <div style="width: 150px">
                <span class="medium16 grey10">Modified Date</span>
              </div>
              <div>
                <span class="light16 grey7">{{FormStructure.FormModifiedTimestamp}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue2'
import {mapActions, mapGetters} from 'vuex'
import BaseNavigationFormBuilder from '@/components/formbuildercomponent/BaseNavigationFormBuilder'
import BaseNavigationSectionFormBuilder from '@/components/formbuildercomponent/BaseNavigationSectionFormBuilder'
import BaseTextInputRenameFormBuilder from '@/components/formbuildercomponent/BaseTextInputRenameFormBuilder'
import BaseNavigationToolsSectionFormBuilder from '@/components/formbuildercomponent/BaseNavigationToolsSectionFormBuilder'
import BaseTextInputPropertiesFormBuilder from '@/components/formbuildercomponent/BaseTextInputPropertiesFormBuilder'
import BaseDropdownFormBuilder from "@/components/formbuildercomponent/BaseDropdownFormBuilder"
import BaseNavigationPropertiesFormBuilder from "@/components/formbuildercomponent/BaseNavigationPropertiesFormBuilder"
import BaseToolsComponentFormBuilder from "@/components/formbuildercomponent/BaseToolsComponentFormBuilder"
import BaseOptionsFormBuilder from "@/components/formbuildercomponent/BaseOptionsFormBuilder"
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
    BaseOptionsFormBuilder,
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
    CreateForm: Boolean,
    ClickedForm: String
  },
  data() {
    return {
      // Window Size
      StateShowContentForWindowSize: true,
      // Save
      StateSaveModal: false,
      // Page
      PageList: [{field:'Build'},{field:'Preview'},{field:'Setting'}],
      StatePage: 'Build',
      // Rename Form
      StateShowRenameForm: false,
      StateSaveRenameForm: false,
      ValueRenameForm: '',
      // Tools Sidebar
      StateShowToolsSidebar: false,
      // Sidebar Properties
      StateShowPropertiesSidebar: false,
      // Value
      ShortInputValidationList:['Alphabetic','Numeric','Email','URL'],
      FontNameList: ['Prompt','Arial','Brush Script MT','Courier New','Garamond','Georgia','Tahoma','Times New Roman','Trebuchet MS','Verdana','Helvetica'],
      PredefinedOptions:['None','Gender','Days','Months','Priority'],
      Gender:['Male','Female'],
      Days:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
      Months:["January","February","March","April","May","June","July","August","September","October","November","December"],
      Priority:["High","Medium","Low"],
      FormData: [],
      // Form Structure
      FormStructure:{
        FormId: '',
        TicketId: '',
        FormName: 'Untitled Form',
        FormDescriptions: '',
        FormCreatedTimestamp: '',
        FormModifiedTimestamp: '',
        CreatedByUser: '',
        ModifiedByUser: '',
        UseTemplate: false,
        ActionButton: {
          ActionButtonName: 'Submit',
          ActionButtonProperties: {
            FontColor: 'white',
            BackgroundColor: 'bg-blue5'
          }
        },
        Sections: [
          {
            SectionId: '',
            SectionName: 'Untitled Section 1',
            SectionProperties: {
              SectionFontName: 'Prompt',
              SectionFontSize: 16,
              SectionFontColor: 'grey10',
              SectionBackgroundColor: 'bg-white'
            },
            Components: [
              {
                ComponentId: '',
                ComponentType: 'heading',
                ComponentTemplate: false,
                ComponentProperties: {
                  HeadingText: 'Untitled Section',
                  SubheadingText: 'Descriptive Section',
                  Alignment: 'left',
                  HeadingFontColor: 'grey10',
                  HeadingFontSize: 48,
                  SubheadingFontColor: 'grey5',
                  SubheadingFontSize: 16,
                  LabelText: 'Type a question',
                  SubLabelText: 'Type a description',
                  Required: false,
                  Placeholder: 'Enter',
                  FixWidth: true,
                  Width: 200,
                  ReadOnly: false,
                  CharacterLimit: true,
                  CharacterLimitValue: 1000,
                  FontColor: 'grey10',
                  InputBgColor: 'bg-grey1',
                  BorderColor: 'white',
                  LabelFontSize: 16,
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
      // State Sections and Components
      StateSelectSectionIndex: 0,
      StateSelectComponentIndex: 0,
      StateShowToolsComponent: false,
      // Properties Sections
      StatePropSelectSection: true,
      // Properties Short Input
      StatePropSelectShortInput: false,
      StatePropSelectShortInputBasic: false,
      StatePropSelectShortInputAdvance: false,
      StatePropSelectShortInputStyle: false,
      // Properties Long Input
      StatePropSelectLongInput: false,
      StatePropSelectLongInputBasic: false,
      StatePropSelectLongInputAdvance: false,
      StatePropSelectLongInputStyle: false,
      // Properties Paragraph
      StatePropSelectParagraph: false,
      StatePropSelectParagraphBasic: false,
      StatePropSelectParagraphStyle: false,
      // Properties Heading
      StatePropSelectHeading: false,
      StatePropSelectHeadingBasic: false,
      StatePropSelectHeadingStyle: false,
      // Properties Dropdown
      StatePropSelectDropdown: false,
      StatePropSelectDropdownBasic: false,
      StatePropSelectDropdownAdvance: false,
      StatePropSelectDropdownStyle: false,
      // Choice Dropdown
      StatePropSelectChoice: false,
      StatePropSelectChoiceBasic: false,
      StatePropSelectChoiceAdvance: false,
      StatePropSelectChoiceStyle: false,
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

    window.onbeforeunload = function () {
      return "Data will be lost if you leave the page, are you sure?"
    }
    
    this.StateShowContentForWindowSize = window.innerWidth >= 768
    if(this.CreateForm === false && this.ClickedForm !== undefined){
    axios.get('http://localhost:4000/api/Flexform/' + this.ClickedForm)
        .then(response => {
          if(response.status===200 && response.data) {
            this.FormData = response.data
            // this.FormStructure = response.data
            console.log(this.ClickedForm)
            console.log(response.status)
            console.log(this.FormData)
            
            this.FormStructure = this.CapitalObj(this.FormData)
            console.log(this.FormStructure)
          }
        })
        .catch(error => {
          // this.errors.push(error)
          console.log(error)
        })
    }else if (this.CreateForm === false && this.ClickedForm === undefined){
      this.$router.push('/form')
    }
  },
  methods: {
    ...mapActions(['flapWindowResize']),
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
    PrevPage(){
      this.$router.push('/form')
    },
    // Save form
    doShowSaveModal(){
        this.StateSaveModal = this.StateSaveModal !== true
    },
    // Page
    doNavigationFormBuilder(namePage) {
      if(namePage === 'Build') {
        this.StatePage = 'Build'
      } else if(namePage === 'Preview') {
        this.StateShowToolsSidebar = false
        this.StateShowPropertiesSidebar = false
        this.StatePage = 'Preview'
      } else {
        this.StateShowToolsSidebar = false
        this.StateShowPropertiesSidebar = false
        this.StatePage = 'Setting'
      }
    },
    // Save formstructure to database
    async SaveFormStructure(){
      console.log(this.CreateForm)
      if(this.CreateForm === true) {
        this.FormStructure.FormId = this.uuidv4()
        this.FormStructure.Sections[0].SectionId = this.uuidv4()
        this.FormStructure.Sections[0].Components[0].ComponentId = this.uuidv4()
        const current = new Date() //แปลง string เป็น Date
        this.FormStructure.FormCreatedTimestamp = current.toISOString() // แปลงเป็นระบบ IsoString
        this.FormStructure.FormModifiedTimestamp = current.toISOString()
        // this.FormStructure.UseTemplate = false
        this.FormStructure.CreatedByUser = localStorage.getItem('username')
        this.FormStructure.ModifiedByUser = localStorage.getItem('username')
        console.log(this.FormStructure)
        axios.post('http://localhost:4000/api/Flexform/CreateForm', this.FormStructure)
            .then(response => {
              console.log(response.status)
              if (response.status === 200 && response.data) {
                console.log(response.status)
                console.log(response.data)
                this.$router.push('/form')
              }
            })
      }
      else{
        axios.put('http://localhost:4000/api/Flexform/' + this.ClickedForm, this.FormStructure)
            .then(response => {
              console.log(response.status)
              if ([200,204].includes(response.status)) {
                console.log(response.status)
                console.log(response.data)
                this.$router.push('/form')
              }
            })
      }
    },
    // Click Button
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
    // UUID
    uuidv4() {
      return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
          (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      )
    },
    // Sections
    doNavigationToolsSectionFormBuilder(event){
      if(event[0] === 'delete') {
        if(this.FormStructure.Sections.length>=1){
          // Check State if state select (event[2]) is equal StateSelectSectionIndex variable
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
              SectionId: this.uuidv4(),
              SectionName: 'Untitled Section '+ (maxValue+1),
              SectionProperties: {
                SectionFontName : 'Prompt',
                SectionFontSize : 16,
                SectionFontColor: 'grey10',
                SectionBackgroundColor: 'bg-white'
              },
              Components: [
                {
                  ComponentId: this.uuidv4(),
                  ComponentType: 'heading',
                  ComponentTemplate: false,
                  ComponentProperties: {
                    HeadingText: 'Untitled Section',
                    SubheadingText: 'Descriptive Section',
                    Alignment: 'left',
                    HeadingFontColor: 'grey10',
                    HeadingFontSize: 48,
                    SubheadingFontColor: 'grey5',
                    SubheadingFontSize: 16,
                    LabelText: '',
                    SubLabelText: '',
                    Required: false,
                    Placeholder: '',
                    FixWidth: false,
                    Width: 0,
                    ReadOnly: false,
                    CharacterLimit: false,
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
                },
              ]
      }
        )
        console.log(this.FormStructure)
      }
    },
    
    // Sections Detail
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
        // อย่าลืมใส่
        this.StatePropSelectShortInput = false
        this.StatePropSelectLongInput = false
        this.StatePropSelectParagraph = false
        this.StatePropSelectHeading = false
        this.StatePropSelectDropdown = false
        this.StatePropSelectChoice = false
      } else {
        if(this.FormStructure.Sections[indexSection].Components[indexComponent].ComponentType === 'short-input'){
          if(!this.StatePropSelectShortInput){
            this.StatePropSelectShortInput = true
            this.StatePropSelectShortInputBasic = true
            this.StatePropSelectShortInputAdvance = false
            this.StatePropSelectShortInputStyle = false
            this.StatePropSelectSection = false
            this.StateShowToolsComponent = true
          } else {
            this.StatePropSelectShortInput = false
            this.StatePropSelectShortInputBasic = false
            this.StatePropSelectShortInputAdvance = false
            this.StatePropSelectShortInputStyle = false
            this.StatePropSelectSection = true
            this.StateShowToolsComponent = false
          }
          // อย่าลืมใส่
          this.StatePropSelectLongInput = false
          this.StatePropSelectParagraph = false
          this.StatePropSelectHeading = false
          this.StatePropSelectDropdown = false
          this.StatePropSelectChoice = false
        }
        else if(this.FormStructure.Sections[indexSection].Components[indexComponent].ComponentType === 'long-input'){
          if(!this.StatePropSelectLongInput){
            this.StatePropSelectLongInput = true
            this.StatePropSelectLongInputBasic = true
            this.StatePropSelectLongInputAdvance = false
            this.StatePropSelectLongInputStyle = false
            this.StatePropSelectSection = false
            this.StateShowToolsComponent = true
          } else {
            this.StatePropSelectLongInput = false
            this.StatePropSelectLongInputBasic = false
            this.StatePropSelectLongInputAdvance = false
            this.StatePropSelectLongInputStyle = false
            this.StatePropSelectSection = true
            this.StateShowToolsComponent = false
          }
          // อย่าลืมใส่
          this.StatePropSelectShortInput = false
          this.StatePropSelectParagraph = false
          this.StatePropSelectHeading = false
          this.StatePropSelectDropdown = false
          this.StatePropSelectChoice = false
        }
        else if(this.FormStructure.Sections[indexSection].Components[indexComponent].ComponentType === 'paragraph'){
          if(!this.StatePropSelectParagraph){
            this.StatePropSelectParagraph = true
            this.StatePropSelectParagraphBasic = true
            this.StatePropSelectParagraphStyle = false
            this.StatePropSelectSection = false
            this.StateShowToolsComponent = true
          } else {
            this.StatePropSelectParagraph = false
            this.StatePropSelectParagraphBasic = false
            this.StatePropSelectParagraphStyle = false
            this.StatePropSelectSection = true
            this.StateShowToolsComponent = false
          }
          // อย่าลืมใส่
          this.StatePropSelectShortInput = false
          this.StatePropSelectLongInput = false
          this.StatePropSelectHeading = false
          this.StatePropSelectDropdown = false
          this.StatePropSelectChoice = false
        } 
        else if(this.FormStructure.Sections[indexSection].Components[indexComponent].ComponentType === 'heading'){
          if(!this.StatePropSelectHeading){
            this.StatePropSelectHeading = true
            this.StatePropSelectHeadingBasic = true
            this.StatePropSelectHeadingStyle = false
            this.StatePropSelectSection = false
            this.StateShowToolsComponent = true
          } else {
            this.StatePropSelectHeading = false
            this.StatePropSelectHeadingBasic = false
            this.StatePropSelectHeadingStyle = false
            this.StatePropSelectSection = true
            this.StateShowToolsComponent = false
          }
          // อย่าลืมใส่
          this.StatePropSelectShortInput = false
          this.StatePropSelectLongInput = false
          this.StatePropSelectParagraph = false
          this.StatePropSelectDropdown = false
          this.StatePropSelectChoice = false
        }
        else if(this.FormStructure.Sections[indexSection].Components[indexComponent].ComponentType === 'dropdown'){
          if(!this.StatePropSelectDropdown){
            this.StatePropSelectDropdown = true
            this.StatePropSelectDropdownBasic = true
            this.StatePropSelectDropdownAdvance = false
            this.StatePropSelectDropdownStyle = false
            this.StatePropSelectSection = false
            this.StateShowToolsComponent = true
          } else {
            this.StatePropSelectDropdown = false
            this.StatePropSelectDropdownBasic = false
            this.StatePropSelectDropdownAdvance = false
            this.StatePropSelectDropdownStyle = false
            this.StatePropSelectSection = true
            this.StateShowToolsComponent = false
          }
          // อย่าลืมใส่
          this.StatePropSelectShortInput = false
          this.StatePropSelectLongInput = false
          this.StatePropSelectParagraph = false
          this.StatePropSelectHeading = false
          this.StatePropSelectChoice = false
        }
        else if(this.FormStructure.Sections[indexSection].Components[indexComponent].ComponentType === 'choice'){
          if(!this.StatePropSelectChoice){
            this.StatePropSelectChoice = true
            this.StatePropSelectChoiceBasic = true
            this.StatePropSelectChoiceAdvance = false
            this.StatePropSelectChoiceStyle = false
            this.StatePropSelectSection = false
            this.StateShowToolsComponent = true
          } else {
            this.StatePropSelectChoice = false
            this.StatePropSelectChoiceBasic = false
            this.StatePropSelectChoiceAdvance = false
            this.StatePropSelectChoiceStyle = false
            this.StatePropSelectSection = true
            this.StateShowToolsComponent = false
          }
          // อย่าลืมใส่
          this.StatePropSelectShortInput = false
          this.StatePropSelectLongInput = false
          this.StatePropSelectParagraph = false
          this.StatePropSelectHeading = false
          this.StatePropSelectDropdown = false
        }
        
      }
    },
    doSectionStyleConfig(indexSection) {
      return {
        '--section--style--font--name': this.FormStructure.Sections[indexSection].SectionProperties.SectionFontName,
        '--section--style--font--size': this.FormStructure.Sections[indexSection].SectionProperties.SectionFontSize+'px',
      }
    },
    // Section Properties
    doPropSectionFontName(value){
      this.FormStructure.Sections[this.StateSelectSectionIndex].SectionProperties.SectionFontName = value
    },
    doPropSectionFontSize(value){
      this.FormStructure.Sections[this.StateSelectSectionIndex].SectionProperties.SectionFontSize = value
      this.FormStructure.Sections[this.StateSelectSectionIndex].Components.forEach(
          (element) => {
            // Short Input
            if(element.ComponentType === 'short-input'){
              element.ComponentProperties.LabelFontSize = value
            }
            // Short Input
            else if(element.ComponentType === 'long-input'){
              element.ComponentProperties.LabelFontSize = value
            }
            // Heading
            else if(element.ComponentType === 'heading'){
              element.ComponentProperties.HeadingFontSize = value
            }
            // Paragraph
            else if(element.ComponentType === 'paragraph'){
              element.ComponentProperties.FontSize = value
            }
            // Dropdown
            else if(element.ComponentType === 'dropdown'){
              element.ComponentProperties.LabelFontSize = value
            }
            // Choice
            else if(element.ComponentType === 'choice'){
              element.ComponentProperties.LabelFontSize = value
            }
          }
      )
    },
    doPropSectionFontColor(value){
      this.FormStructure.Sections[this.StateSelectSectionIndex].SectionProperties.SectionFontColor = value
      this.FormStructure.Sections[this.StateSelectSectionIndex].Components.forEach(
          (element) => {
            // Short Input
            if(element.ComponentType === 'short-input'){
              element.ComponentProperties.FontColor = value
            }
            // Short Input
            else if(element.ComponentType === 'long-input'){
              element.ComponentProperties.FontColor = value
            }
            // Heading
            if(element.ComponentType === 'heading'){
              element.ComponentProperties.HeadingFontColor = value
            }
            // Paragraph
            else if(element.ComponentType === 'paragraph'){
              element.ComponentProperties.FontColor = value
            }
            // Dropdown
            else if(element.ComponentType === 'dropdown'){
              element.ComponentProperties.FontColor = value
            }
            // Choice
            else if(element.ComponentType === 'choice'){
              element.ComponentProperties.FontColor = value
            }
          }
      )
    },
    doPropSectionBgColor(value){
      this.FormStructure.Sections[this.StateSelectSectionIndex].SectionProperties.SectionBackgroundColor = 'bg-'+value
    },
    
    // Tools Component
    doToolsComponent(component){
      if(component.componentAction === 'properties'){
        this.StateShowPropertiesSidebar = !this.StateShowPropertiesSidebar
      }
      else if(component.componentAction === 'duplicate'){
        let element = this.FormStructure.Sections[this.StateSelectSectionIndex].Components[component.componentIndex]
        console.log(element)
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
      else if(component.componentAction === 'move'){
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components = component.componentValue
      }
    },

    // Short Input Detail
    doStatePropShortInputNavigation(element){
      if(element.name === 'Basic'){
        this.StatePropSelectShortInputBasic = true
        this.StatePropSelectShortInputAdvance = false
        this.StatePropSelectShortInputStyle = false
      } else if(element.name === 'Advance'){
        this.StatePropSelectShortInputBasic = false
        this.StatePropSelectShortInputAdvance = true
        this.StatePropSelectShortInputStyle = false
      } else if(element.name === 'Style'){
        this.StatePropSelectShortInputBasic = false
        this.StatePropSelectShortInputAdvance = false
        this.StatePropSelectShortInputStyle = true
      }
    },
    // Short Input Properties
    doPropShortInputLabelText(value) {
      if(value === ''){
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.LabelText = 'Type a question'
      } else {
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.LabelText = value
      }
    },
    doPropShortInputSubLabelText(value) {
      if(value === ''){
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.SubLabelText = ''
      } else {
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.SubLabelText = value
      }
    },
    doPropShortInputAlignment(value) {
      if(value === ''){
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.Alignment = 'left'
      } else {
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.Alignment = value
      }
    },
    doPropShortInputRequired(value) {
      this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.Required = value
    },
    doPropShortInputPlaceholder(value) {
      if(value === ''){
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.Placeholder = ''
      } else {
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.Placeholder = value
      }
    },
    doPropShortInputWidth(value) {
      if(typeof value === 'boolean') {
        if(value){
          this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.FixWidth = true
        } else {
          this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.FixWidth = false
        }
      } else if (typeof value === 'number') {
        if (value === '')
          this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.Width = 200
        else {
          this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.Width = value
        }
      }
    },
    doPropShortInputLabelReadOnly(value) {
      this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.ReadOnly = value
    },
    doPropShortInputCharacterLimit(value) {
      this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.CharacterLimit = value
      if(!this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.CharacterLimit) {
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.CharacterLimitValue = 100000
      }else {
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.CharacterLimitValue = 1000
      }
    },
    doPropShortInputCharacterLimitValue(value) {
      this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.CharacterLimitValue = value
    },
    doPropShortInputValidation(value) {
      this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.Validation = value
    },
    doPropShortInputFontColor(value) {
      this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.FontColor = value
    },
    doPropShortInputFontInputBgColor(value) {
      this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.InputBgColor = 'bg-'+value
    },
    doPropShortInputBorderColor(value) {
      this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.BorderColor = value
    },
    doPropShortInputLabelFontSize(value) {
      this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.LabelFontSize = value
    },

    // Long Input Detail
    doStatePropLongInputNavigation(element){
      if(element.name === 'Basic'){
        this.StatePropSelectLongInputBasic = true
        this.StatePropSelectLongInputAdvance = false
        this.StatePropSelectLongInputStyle = false
      } else if(element.name === 'Advance'){
        this.StatePropSelectLongInputBasic = false
        this.StatePropSelectLongInputAdvance = true
        this.StatePropSelectLongInputStyle = false
      } else if(element.name === 'Style'){
        this.StatePropSelectLongInputBasic = false
        this.StatePropSelectLongInputAdvance = false
        this.StatePropSelectLongInputStyle = true
      }
    },
    // Long Input Properties
    doPropLongInputLabelText(value) {
      if(value === ''){
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.LabelText = 'Type a question'
      } else {
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.LabelText = value
      }
    },
    doPropLongInputSubLabelText(value) {
      if(value === ''){
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.SubLabelText = ''
      } else {
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.SubLabelText = value
      }
    },
    doPropLongInputAlignment(value) {
      if(value === ''){
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.Alignment = 'left'
      } else {
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.Alignment = value
      }
    },
    doPropLongInputRequired(value) {
      this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.Required = value
    },
    doPropLongInputPlaceholder(value) {
      if(value === ''){
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.Placeholder = ''
      } else {
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.Placeholder = value
      }
    },
    doPropLongInputWidth(value) {
      if(typeof value === 'boolean') {
        if(value){
          this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.FixWidth = true
        } else {
          this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.FixWidth = false
        }
      } else if (typeof value === 'number') {
        if (value === '')
          this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.Width = 200
        else {
          this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.Width = value
        }
      }
    },
    doPropLongInputLabelReadOnly(value) {
      this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.ReadOnly = value
    },
    doPropLongInputCharacterLimit(value) {
      this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.CharacterLimit = value
      if(!this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.CharacterLimit) {
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.CharacterLimitValue = 100000
      }else {
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.CharacterLimitValue = 2000
      }
    },
    doPropLongInputCharacterLimitValue(value) {
      this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.CharacterLimitValue = value
    },
    doPropLongInputFontColor(value) {
      this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.FontColor = value
    },
    doPropLongInputFontInputBgColor(value) {
      this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.InputBgColor = 'bg-'+value
    },
    doPropLongInputBorderColor(value) {
      this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.BorderColor = value
    },
    doPropLongInputLabelFontSize(value) {
      this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.LabelFontSize = value
    },
    
    // Paragraph Detail
    doStatePropParagraphNavigation(element){
      if(element.name === 'Basic'){
        this.StatePropSelectParagraphBasic = true
        this.StatePropSelectParagraphStyle = false
      } else if(element.name === 'Style'){
        this.StatePropSelectParagraphBasic = false
        this.StatePropSelectParagraphStyle = true
      }
    },
    // Paragraph Properties
    doPropParagraphLabelText (value) {
      if(value === ''){
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.LabelText = 'Paragraph...'
      } else {
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.LabelText = value
      }
    },
    doPropParagraphAlignment (value) {
      if(value === ''){
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.Alignment = 'left'
      } else {
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.Alignment = value
      }
    },
    doPropParagraphWidth (value) {
      if(typeof value === 'boolean'){
        if(value){
          this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.FixWidth = true
        } else { 
          this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.FixWidth = false
        }
      } else if (typeof value === 'number') {
        if (value === '')
          this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.Width = 500
        else {
          this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.Width = value
        }
      }
    },
    doPropParagraphFontColor (value) {
      this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.FontColor = value
    },
    doPropParagraphFontSize (value) {
      this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.FontSize = value
    },
    
    // Heading Detail
    doStatePropHeadingNavigation(element){
      if(element.name === 'Basic'){
        this.StatePropSelectHeadingBasic = true
        this.StatePropSelectHeadingStyle = false
      } else if(element.name === 'Style'){
        this.StatePropSelectHeadingBasic = false
        this.StatePropSelectHeadingStyle = true
      }
    },
    // Heading Properties
    doPropHeadingHeadingText(value) {
      if(value === ''){
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.HeadingText = 'Untitled Section'
      } else {
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.HeadingText = value
      }
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
    // Dropdown Detail
    doStatePropDropdownNavigation(element){
      if(element.name === 'Basic'){
        this.StatePropSelectDropdownBasic = true
        this.StatePropSelectDropdownAdvance = false
        this.StatePropSelectDropdownStyle = false
      } else if(element.name === 'Advance'){
        this.StatePropSelectDropdownBasic = false
        this.StatePropSelectDropdownAdvance = true
        this.StatePropSelectDropdownStyle = false
      } else if(element.name === 'Style'){
        this.StatePropSelectDropdownBasic = false
        this.StatePropSelectDropdownAdvance = false
        this.StatePropSelectDropdownStyle = true
      }
    },
    // Dropdown Properties
    doPropDropdownLabelText(value) {
      if(value === ''){
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.LabelText = 'Type a question'
      } else {
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.LabelText = value
      }
    },
    doPropDropdownOptions(element) {
      if(element.action === 'add'){
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.Options.push(element.value)
      } else if(element.action === 'remove'){
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.Options.splice(element.index,1)
      } else if(element.action === 'edit'){
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.Options[element.index] = element.value
      }
    },
    doPropDropdownSubLabelText(value) {
      if(value === ''){
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.SubLabelText = 'Descriptive Section'
      } else {
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.SubLabelText = value
      }
    },
    doPropDropdownAlignment(value) {
      if(value === ''){
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.Alignment = 'left'
      } else {
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.Alignment = value
      }
    },
    doPropDropdownRequired(value) {
      this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.Required = value
    },
    doPropDropdownPlaceholder(value) {
      if(value === ''){
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.Placeholder = ''
      } else {
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.Placeholder = value
      }
    },
    doPropDropdownWidth(value) {
      if(typeof value === 'boolean') {
        if(value){
          this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.FixWidth = true
        } else {
          this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.FixWidth = false
        }
      } else if (typeof value === 'number') {
        if (value === '')
          this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.Width = 200
        else {
          this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.Width = value
        }
      }
    },
    doPropDropdownLabelReadOnly(value) {
      this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.ReadOnly = value
    },
    doPropDropdownPredefinedOptions(value) {
      this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.PredefinedOptions = value
      if(value==='None'){
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.Options = []
      }else if(value==='Gender'){
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.Options = this.Gender
      }else if(value==='Days'){
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.Options = this.Days
      }else if(value==='Months'){
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.Options = this.Months
      }else if(value==='Priority'){
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.Options = this.Priority
      }
    },
    doPropDropdownFontColor(value) {
      this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.FontColor = value
    },
    doPropDropdownFontInputBgColor(value) {
      this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.InputBgColor = 'bg-'+value
    },
    doPropDropdownBorderColor(value) {
      this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.BorderColor = value
    },
    doPropDropdownLabelFontSize(value) {
      this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.LabelFontSize = value
    },
    
    // Choice Detail
    doStatePropChoiceNavigation(element){
      if(element.name === 'Basic'){
        this.StatePropSelectChoiceBasic = true
        this.StatePropSelectChoiceAdvance = false
        this.StatePropSelectChoiceStyle = false
      } else if(element.name === 'Advance'){
        this.StatePropSelectChoiceBasic = false
        this.StatePropSelectChoiceAdvance = true
        this.StatePropSelectChoiceStyle = false
      } else if(element.name === 'Style'){
        this.StatePropSelectChoiceBasic = false
        this.StatePropSelectChoiceAdvance = false
        this.StatePropSelectChoiceStyle = true
      }
    },
    // Choice Properties
    doPropChoiceLabelText(value) {
      if(value === ''){
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.LabelText = 'Type a question'
      } else {
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.LabelText = value
      }
    },
    doPropChoiceMultipleChoice(value) {
      this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.MultipleChoice = value
    },
    doPropChoiceSubLabelText(value) {
      if(value === ''){
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.SubLabelText = 'Descriptive Section'
      } else {
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.SubLabelText = value
      }
    },
    doPropChoiceRequired(value) {
      this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.Required = value
    },
    doPropChoiceOptions(element) {
      if(element.action === 'add'){
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.Options.push(element.value)
      } else if(element.action === 'remove'){
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.Options.splice(element.index,1)
      } else if(element.action === 'edit'){
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.Options[element.index] = element.value
      }
    },
    doPropChoiceReadOnly(value) {
      this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.ReadOnly = value
    },
    doPropChoiceSpreadToColumns(value) {
      this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.SpreadToColumns = value
    },
    doPropChoicePredefinedOptions(value) {
      this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.PredefinedOptions = value
      if(value==='None'){
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.Options = ['Choice1','Choice2','Choice3',]
      }else if(value==='Gender'){
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.Options = this.Gender
      }else if(value==='Days'){
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.Options = this.Days
      }else if(value==='Months'){
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.Options = this.Months
      }else if(value==='Priority'){
        this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.Options = this.Priority
      }
    },
    doPropChoiceFontColor(value){
      this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.FontColor = value
    },
    doPropChoiceLabelFontSize(value){
      this.FormStructure.Sections[this.StateSelectSectionIndex].Components[this.StateSelectComponentIndex].ComponentProperties.LabelFontSize = value
    },
    
    // Action Button Detail
    doStateActionButtonProperties() {
      this.StateShowPropertiesSidebar = true
      // Close Component Properties
      this.StatePropSelectHeading = false
      // อย่าลืมกลับมาเขียนแต่ละคอมโพเนนด้วย!
      if(!this.StatePropSelectActionButton) {
        this.StatePropSelectActionButton = true
        this.StatePropSelectSection = false
      } else {
        this.StatePropSelectActionButton = false
        this.StatePropSelectSection = true
      }
    },
    // Action Button Properties
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
    addShortInputComponent(){
      this.FormStructure.Sections[this.StateSelectSectionIndex].Components.splice(
          this.StateSelectComponentIndex+1,0,
          {
            ComponentId: this.uuidv4(),
            ComponentType: 'short-input',
            ComponentTemplate: false,
            ComponentProperties: {
              LabelText: 'Type a question',
              SubLabelText: 'Type a description',
              Alignment: 'left',
              Required: false,
              Placeholder: 'Enter',
              FixWidth: true,
              Width: 200,
              ReadOnly: false,
              CharacterLimit: true,
              CharacterLimitValue: 1000,
              Validation: 'Alphabetic',
              FontColor: 'grey10',
              InputBgColor: 'bg-grey1',
              BorderColor: 'white',
              LabelFontSize: 16,
              HeadingText: '',
              SubheadingText: '',
              HeadingFontColor: '',
              HeadingFontSize: 0,
              SubheadingFontColor: '',
              SubheadingFontSize: 0,
              PredefinedOptions: '',
              Options: [],
              MultipleChoice: false,
              SpreadToColumns: false
            }
          }
      )
      this.StateSelectComponentIndex = this.StateSelectComponentIndex+1
    },
    
    addLongInputComponent(){
      this.FormStructure.Sections[this.StateSelectSectionIndex].Components.splice(
          this.StateSelectComponentIndex+1,0,
          {
            ComponentId: this.uuidv4(),
            ComponentType: 'long-input',
            ComponentTemplate: false,
            ComponentProperties: {
              LabelText: 'Type a question',
              SubLabelText: 'Type a description',
              Alignment: 'left',
              Required: false,
              Placeholder: 'Enter',
              FixWidth: true,
              Width: 200,
              ReadOnly: false,
              CharacterLimit: true,
              CharacterLimitValue: 2000,
              FontColor: 'grey10',
              InputBgColor: 'bg-grey1',
              BorderColor: 'white',
              LabelFontSize: 16,
              Validation: '',
              HeadingText: '',
              SubheadingText: '',
              HeadingFontColor: '',
              HeadingFontSize: 0,
              SubheadingFontColor: '',
              SubheadingFontSize: 0,
              PredefinedOptions: '',
              Options: [],
              MultipleChoice: false,
              SpreadToColumns: false
            }
          }
      )
      this.StateSelectComponentIndex = this.StateSelectComponentIndex+1
    },
    addParagraphComponent(){
      this.FormStructure.Sections[this.StateSelectSectionIndex].Components.splice(
          this.StateSelectComponentIndex+1,0,
          {
            ComponentId: this.uuidv4(),
            ComponentType: 'paragraph',
            ComponentTemplate: false,
            ComponentProperties: {
              LabelText: 'Paragraph...',
              Alignment: 'left',
              FixWidth: true,
              Width: 500,
              FontColor: 'grey10',
              FontSize: 16,
              SubLabelText: '',
              Required: false,
              Placeholder: '',
              ReadOnly: false,
              CharacterLimit: true,
              CharacterLimitValue: 0,
              InputBgColor: '',
              BorderColor: '',
              LabelFontSize: 0,
              Validation: '',
              HeadingText: '',
              SubheadingText: '',
              HeadingFontColor: '',
              HeadingFontSize: 0,
              SubheadingFontColor: '',
              SubheadingFontSize: 0,
              PredefinedOptions: '',
              Options: [],
              MultipleChoice: false,
              SpreadToColumns: false
            }
          }
      )
      this.StateSelectComponentIndex = this.StateSelectComponentIndex+1
    },
    addHeadingComponent(){
      this.FormStructure.Sections[this.StateSelectSectionIndex].Components.splice(
          this.StateSelectComponentIndex+1,0,
          {
            ComponentId: this.uuidv4(),
            ComponentType: 'heading',
            ComponentTemplate: false,
            ComponentProperties: {
              HeadingText: 'Untitled Section',
              SubheadingText: 'Descriptive Section',
              Alignment: 'left',
              HeadingFontColor: 'grey10',
              HeadingFontSize: 48,
              SubheadingFontColor: 'grey5',
              SubheadingFontSize: 16,
              SubLabelText: '',
              Required: false,
              Placeholder: '',
              ReadOnly: false,
              FontColor: '',
              CharacterLimit: true,
              LabelText: '',
              CharacterLimitValue: 0,
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
      )
      this.StateSelectComponentIndex = this.StateSelectComponentIndex+1
    },
    addDropdownComponent(){
      this.FormStructure.Sections[this.StateSelectSectionIndex].Components.splice(
          this.StateSelectComponentIndex+1,0,
          {
            ComponentId: this.uuidv4(),
            ComponentType: 'dropdown',
            ComponentTemplate: false,
            ComponentProperties: {
              LabelText: 'Type a question',
              SubLabelText: 'Type a description',
              Alignment: 'left',
              Required: false,
              Placeholder: 'Enter',
              FixWidth: true,
              Width: 200,
              ReadOnly: false,
              PredefinedOptions: 'None',
              Options: [],
              FontColor: 'grey10',
              InputBgColor: 'bg-grey1',
              BorderColor: 'white',
              LabelFontSize: 16,
              HeadingText: '',
              SubheadingText: '',
              HeadingFontColor: '',
              HeadingFontSize: 0,
              SubheadingFontColor: '',
              SubheadingFontSize: 0,
              CharacterLimit: true,
              CharacterLimitValue: 0,
              Validation: '',
              MultipleChoice: false,
              SpreadToColumns: false
            }
          }
      )
      this.StateSelectComponentIndex = this.StateSelectComponentIndex+1
    },
    addChoiceComponent(){
      this.FormStructure.Sections[this.StateSelectSectionIndex].Components.splice(
          this.StateSelectComponentIndex+1,0,
          {
            ComponentId: this.uuidv4(),
            ComponentType: 'choice',
            ComponentTemplate: false,
            ComponentProperties: {
              MultipleChoice: false,
              LabelText: 'Type a question',
              SubLabelText: 'Type a description',
              Required: false,
              ReadOnly: false,
              SpreadToColumns: false,
              PredefinedOptions: 'None',
              Options: ['Choice 1','Choice 2','Choice 3'],
              FontColor: 'grey10',
              BorderColor: 'blue5',
              LabelFontSize: 16,
              Alignment: '',
              Placeholder: '',
              FixWidth: true,
              Width: 200,
              InputBgColor: '',
              HeadingText: '',
              SubheadingText: '',
              HeadingFontColor: '',
              HeadingFontSize: 0,
              SubheadingFontColor: '',
              SubheadingFontSize: 0,
              CharacterLimit: true,
              CharacterLimitValue: 0,
              Validation: ''
            }
          }
      )
    },
  }
}
</script>

<style lang="scss" scoped>
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
  border-radius: $radius12px;
  padding: 0.75rem;
  // Section Style Config
  font-family: var(--section--style--font--name);
  font-size: var(--section--style--font--size);
}
.with-line {
  display: block;
}
.with-line:before, .with-line:after {
  content: "";
  display: inline-block;
  border-top: 1px solid $grey3;
  width: 10rem;
  vertical-align: middle;
  margin: 0 1em;
}
@media only screen and (min-width: 1024px) {
  .section__top__style{
    width: 768px;
  }
  .section__style{
    width: 768px;
  }
  .section__bottom__style{
    width: 768px;
  }
}
@media only screen and (max-width: 1023px) {
  .section__top__style{
    width: 640px;
  }
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

.icon__style__large{
  font-size: 24px;
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