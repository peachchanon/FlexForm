<template>
  <layout-sidebar-navbar page="form">
    <template #content>
      <div class="bg-grey1 tw-h-full sm:tw-p-2">
        <div class="base-margin tw-flex tw-flex-row tw-items-center">
          <Icon class="semibold24 icon blue10" icon="heroicons-outline:folder"/>
          <span class="semibold24 blue10 tw-pl-1">Form</span>
        </div>
        <div class="box bg-white tw-h-full">
          <div>
            <base-horizontal-navigation
                v-bind:field="horizontalNavigationID"
                @callbackField="doHorizontalNavigation"
            >
            </base-horizontal-navigation>
          </div>
          <!-- All Ticket-->
          <div v-if="namePage==='All Form'" class="tw-px-3">
            <div class="tw-flex tw-flex-row tw-justify-between tw-items-center">
              <!-- Search Box -->
              <div class="tw-pr-4" :class="{'tw-w-full': !StateShowContentForWindowSize, 'tw-w-2/5':StateShowContentForWindowSize}">
                <SearchBar placeholder="Search By Form Name" @callBackString="formNameInput"></SearchBar>
              </div>
              <div class="tw-flex tw-flex-row tw-items-center">
                <!-- My Template Button -->
                <div class="tw-mx-1">
                  <base-button-blue
                      buttonID="buttonCreateForm"
                      buttonText="Ticket Template"
                      buttonIcon="heroicons-outline:ticket"
                      :callback="MyTemplatePage"
                  ></base-button-blue>
                </div>
                <!-- Create Form Button -->
                <div class="tw-mx-1">
                  <base-button-white
                      buttonID="buttonCreateForm"
                      buttonText="Create Form"
                      buttonIcon="heroicons-outline:plus"
                      :callback="CreateFormModal"
                  ></base-button-white>
                </div>
              </div>
            </div>
            <!-- Form list-->
            <div v-for="FormData in filteredList" :key="FormData.formId">
              <div v-if="FormData.useTemplate === true">
                <div class="tw-my-2">
                  <div class="bg-white base-padding base-shadow radius12px tw-flex tw-flex-row tw-items-start tw-justify-between">
                    <div class="tw-flex tw-flex-row" style="width: 100%; max-width: 700px">
                      <div v-if= "TicketTemplate === false" class="bg-blue1 base-padding radius12px tw-transition tw-ease-out" style="height: fit-content">
                        <Icon class="semibold24 icon blue10" icon="heroicons-outline:ticket"/>
                      </div>
                      <div class="tw-flex tw-flex-col tw-items-start tw-ml-2" style="width: 100%; max-width: 200px">
                        <label v-if="StateShowContentForWindowSize" class="medium16 grey5">Form name</label>
                        <div class=" tw-truncate" style="width: 100%; max-width: 190px;">
                          <label class="medium16 blue10">{{ FormData.formName }}</label>
                        </div>
                      </div>
                      <div v-if="StateShowContentForWindowSize" class="tw-flex tw-flex-col tw-items-start tw-mr-6" style="width: 100%; max-width: 100px">
                        <label class="medium16 grey5 tw-mb-1">Type</label>
                        <base-badge
                            BadgeText="Template"
                            BadgeColor="white"
                            BadgeBgColor="bg-blue5"></base-badge>
                      </div>
                      <div v-if="StateShowContentForWindowSize" class="tw-flex tw-flex-col tw-items-start tw-mx-6">
                        <label class="medium16 grey5">Created By</label>
                        <div class=" tw-truncate" style="width: 100%; max-width: 260px;">
                          <label class="light16 grey7">{{ FormData.createdByUser }}</label>
                        </div>
                      </div>
                    </div>
                    <div class="">
                      <div class="tw-mt-1 tw-mx-1">
                        <base-button-fill
                            buttonID="buttonViewmore"
                            buttonText="View More"
                            buttonTextColor="blue5"
                            buttonBgColor="bg-white"
                            buttonBorderColor="border-blue5"
                            buttonIconLeft="heroicons-outline:eye"
                            @callbackObject="GoAllTicket"
                            :id="FormData.formId"
                        ></base-button-fill>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="FormData.useTemplate === false">
                <div class="tw-my-2">
                  <div class="bg-white base-padding base-shadow radius12px tw-flex tw-flex-row tw-items-start tw-justify-between">
                    <div class="tw-flex tw-flex-row" style="width: 100%; max-width: 700px">
                      <div v-if= "TicketTemplate === false" class="bg-green2 base-padding radius12px tw-transition tw-ease-out" style="height: fit-content">
                        <Icon class="semibold24 icon blue10" icon="heroicons-outline:document-text"/>
                      </div>
                      <div class="tw-flex tw-flex-col tw-items-start tw-ml-2" style="width: 100%; max-width: 200px">
                        <label v-if="StateShowContentForWindowSize" class="medium16 grey5">Form name</label>
                        <div class=" tw-truncate" style="width: 100%; max-width: 195px;">
                          <label class="medium16 blue10">{{ FormData.formName }}</label>
                        </div>
                      </div>
                      <div v-if="StateShowContentForWindowSize" class="tw-flex tw-flex-col tw-items-start tw-mr-6" style="width: 100%; max-width: 100px">
                        <label class="medium16 grey5 tw-mb-1">Type</label>
                        <base-badge
                            BadgeText="Form"
                            BadgeColor="white"
                            BadgeBgColor="bg-green4"></base-badge>
                      </div>
                      <div v-if="StateShowContentForWindowSize" class="tw-flex tw-flex-col tw-items-start tw-mx-6">
                        <label class="medium16 grey5">Form Description</label>
                        <div class=" tw-truncate" style="width: 100%; max-width: 260px;">
                          <label class="light16 grey7">{{ FormData.formDescriptions }}</label>
                        </div>
                      </div>
                    </div>
                    <div class="tw-flex tw-flex-row tw-mx-2">
                      <div class="tw-mt-1">
                        <base-button-fill
                            buttonID="buttonResponse"
                            buttonText="Response"
                            buttonTextColor="blue5"
                            buttonBgColor="bg-white"
                            buttonBorderColor="border-blue5"
                            buttonIconLeft="heroicons-outline:chat"
                            @callbackObject="GoResponse"
                            :id="FormData.formId"
                        ></base-button-fill>
                      </div>
                      <div  class="tw-mt-1 tw-mr-2 tw-w-24 tw-ml-3">
                        <base-button-fill
                            buttonID="buttonFill"
                            buttonText="Fill"
                            buttonTextColor="white"
                            buttonBgColor="bg-blue5"
                            @callbackObject="GoFillForm"
                            :id="FormData.formId"
                        ></base-button-fill>
                      </div>
                      <div class="tw-mx-2">
                        <div class="verticalbutton tw-flex tw-flex-row tw-items-center medium16" @click="showFormDetail(FormData.formId,FormData.formName,FormData.formDescriptions,FormData.createdByUser,FormData.formCreatedTimestamp)">
                          <Icon class="icon semibold24" icon="heroicons-outline:dots-vertical"/>
                        </div>
                      </div>
                      <!-- Vertical dot button !-->
                      <transition name="theme-modal-fade" v-if="showFormDetailLayout">
                        <div class="theme-modal-backdrop">
                          <div v-if="showFormDetailLayout === true" class="base-padding tw-h-full tw-w-full tw-flex tw-flex-col tw-items-center md:tw-justify-center tw-justify-start">
                            <div class="detailcard bg-white radius12px base-shadow base-padding base-margin">
                              <div class="tw-flex tw-flex-row tw-items-center tw-justify-between">
                                <div class="tw-flex tw-flex-row tw-items-center tw-relative">
                                  <Icon class="semibold32 icon blue10 tw-pr-1 tw-mx-1 " icon="heroicons-outline:document-text"/>
                                  <label class="semibold24 blue10">{{ModalFormName}}</label>
                                </div>
                                <div class="button__close" @click="showFormDetail()">
                                  <Icon class="semibold24" icon="heroicons-outline:x"/>
                                </div>
                              </div>
                              <div>
                                <div class="">
                                  <div>
                                    <base-horizontal-navigation
                                        v-bind:field="horizontalNavigationModal"
                                        @callbackField="HorizontalModalNavigation"
                                    >
                                    </base-horizontal-navigation>
                                  </div>
                                  <div v-if="ModalPage==='Setting'">
                                    <div>
                                      <div class="tw-flex tw-flex-row border-grey3 tw-border-2 radius10px tw-mx-3 base-padding">
                                        <div class="tw-flex tw-flex-col tw-ml-4">
                                          <div class="tw-ml-2 tw-my-1.5">
                                            <label class="blue10 medium18">Data</label>
                                          </div>
                                          <div class="choose tw-flex tw-flex-row tw-items-center tw-mx-1 tw-my-1">
                                            <Icon class="semibold24 icon" icon="heroicons-outline:inbox-in"/>
                                            <label class="tw-mx-3 tw-cursor-pointer semibold16">Import Data</label>
                                          </div>
                                          <div class="choose tw-flex tw-flex-row tw-items-center tw-mx-1 tw-my-1">
                                            <Icon class="semibold24 icon " icon="heroicons-outline:upload"/>
                                            <label class="tw-mx-3 tw-cursor-pointer semibold16 ">Export Response</label>
                                          </div>
                                        </div>
                                        <div class="border-grey3 bg-grey3 tw-mt-6 tw-mx-10" style="height: 180px; border-width: 0.5px">
                                        </div>
                                        <div class="tw-flex tw-flex-col">
                                          <div class="tw-my-1.5 tw-ml-2">
                                            <label class="blue10 medium18">Form</label>
                                          </div>
                                          <div class="choose tw-flex tw-flex-row tw-ml-2 tw-items-center tw-my-1" @click="SelectForm(ModalFormId)">
                                            <Icon class="semibold24 icon " icon="heroicons-outline:pencil-alt"/>
                                            <label class="tw-mx-3 tw-cursor-pointer semibold16 ">Edit Form</label>
                                          </div>
                                          <div class="choose tw-flex tw-flex-row tw-ml-2 tw-items-center tw-my-1">
                                            <Icon class="semibold24 icon " icon="heroicons-outline:folder-download"/>
                                            <label class="tw-mx-3 tw-cursor-pointer semibold16 ">Save As Template</label>
                                          </div>
                                          <div class="choose-delete tw-flex tw-flex-row tw-ml-2 tw-items-center tw-my-1">
                                            <Icon class="semibold24 icon " icon="heroicons-outline:trash"/>
                                            <label class="tw-mx-3 tw-cursor-pointer semibold16 ">Delete Form</label>
                                          </div>
                                        </div>
                                      </div>
                                      <div class="tw-flex tw-flex-row-reverse tw-mx-2 tw-mt-4 tw-mb-2">
                                        <div  class="tw-mt-1 tw-mr-2 tw-w-24 tw-ml-3">
                                          <base-button-fill
                                              buttonID="buttonFill"
                                              buttonText="Fill"
                                              buttonTextColor="white"
                                              buttonBgColor="bg-blue5"
                                              @callbackObject="GoFillForm"
                                              :id="ModalFormId"
                                          ></base-button-fill>
                                        </div>
                                        <div class="tw-mt-1">
                                          <base-button-fill
                                              buttonID="buttonResponse"
                                              buttonText="Response"
                                              buttonTextColor="blue5"
                                              buttonBgColor="bg-white"
                                              buttonBorderColor="border-blue5"
                                              buttonIconLeft="heroicons-outline:chat"
                                              @callbackObject="GoResponse"
                                              :id="ModalFormId"
                                          ></base-button-fill>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div v-if="ModalPage==='Detail'">
                                    <div class="border-grey3 tw-border-2 radius10px tw-mx-3 base-padding">
                                      <div class="tw-flex tw-flex-row tw-justify-between tw-mr-16">
                                        <div class="tw-flex tw-flex-row tw-mx-2.5 tw-my-2">
                                          <label class="semibold16 blue10">Created By</label>
                                          <label class="tw-ml-4 light14 grey7">{{ ModalFormCreatedByUser }}</label>
                                        </div>
                                        <div class="tw-flex tw-flex-row tw-mx-2.5 tw-my-2">
                                          <label class="semibold16 blue10">Date Created</label>
                                          <label class="tw-ml-2 light14 grey7">{{ ModalFormCreated }}</label>
                                        </div>
                                      </div>
                                      <div class="tw-flex tw-flex-col tw-mx-2.5 tw-mt-3">
                                        <label class="semibold16 blue10">Description</label>
                                        <div class="modaldescriptiondetail tw-my-3 medium14 grey10">{{ModalFormDescription}}</div>
                                      </div>
                                    </div>
                                    <div class="tw-flex tw-flex-row-reverse tw-mx-2 tw-mt-4 tw-mb-2">
                                      <div  class="tw-mt-1 tw-mr-2 tw-w-24 tw-ml-3">
                                        <base-button-fill
                                            buttonID="buttonFill"
                                            buttonText="Fill"
                                            buttonTextColor="white"
                                            buttonBgColor="bg-blue5"
                                            @callbackObject="GoFillForm"
                                            :id="ModalFormId"
                                        ></base-button-fill>
                                      </div>
                                      <div class="tw-mt-1">
                                        <base-button-fill
                                            buttonID="buttonResponse"
                                            buttonText="Response"
                                            buttonTextColor="blue5"
                                            buttonBgColor="bg-white"
                                            buttonBorderColor="border-blue5"
                                            buttonIconLeft="heroicons-outline:chat"
                                            @callbackObject="GoResponse"
                                            :id="ModalFormId"
                                        ></base-button-fill>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </transition>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <!-- Create Form Modal -->
          <transition name="theme-modal-fade" v-if="showFormBuilderLayout">
            <div class="theme-modal-backdrop">
              <div v-if="showFormBuilderLayout === true" class="base-padding tw-h-full tw-w-full tw-flex tw-flex-col tw-items-center md:tw-justify-center tw-justify-start">
                <div class="bg-white radius12px base-shadow base-padding base-margin" style="width: fit-content">
                  <div class="tw-flex tw-flex-row tw-items-center tw-justify-between">
                    <div class="tw-flex tw-flex-row tw-items-center tw-relative">
                      <Icon class="semibold32 icon blue10 tw-pr-1 tw-mx-1 " icon="heroicons-outline:folder"/>
                      <label class="semibold24 blue10">Create a Form</label>
                    </div>
                    <div class="button__close" @click="CreateFormModal">
                      <Icon class="semibold24" icon="heroicons-outline:x"/>
                    </div>
                  </div>
                  <div class="tw-flex md:tw-flex-row md:tw-justify-center tw-flex-col tw-items-start">
                    <div class="select__create__form tw-flex tw-flex-row tw-items-start md:tw-flex-col md:tw-mx-5 md:tw-items-center" @click="CreateBlankForm">
                      <div class="button__grey tw-my-2">
                        <Icon class="icon" icon="heroicons-outline:plus"/>
                      </div>
                      <div class="tw-flex tw-flex-col tw-items-start tw-m-4 md:tw-items-center">
                        <label class="text__blue tw-my-2">Start Form Scratch</label>
                        <label class="text__grey tw-my-2">A blank slate is all you need.</label>
                      </div>
                    </div>
                    <div class="select__create__form tw-flex tw-flex-row tw-items-start md:tw-flex-col md:tw-mx-5 md:tw-items-center" @click="SelectTemplate">
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
            </div>
          </transition>
          <!--          Select template modal-->
          <transition name="theme-modal-fade" v-if="UseTemplateModal">
            <div class="theme-modal-backdrop">
              <div v-if="UseTemplateModal === true" class="base-padding tw-h-full tw-w-full tw-flex tw-flex-col tw-items-center md:tw-justify-center tw-justify-start">
                <div class="bg-white radius12px base-shadow base-padding base-margin" style="width: fit-content">
                  <div class="tw-flex tw-flex-row tw-items-center tw-justify-between">
                    <div class="tw-flex tw-flex-row tw-items-center tw-relative tw-my-2">
                      <base-button-back
                          :callback="SelectTemplate"></base-button-back>
                      <Icon class="semibold32 icon blue10 tw-pr-1 tw-mx-1 " icon="heroicons-outline:ticket"/>
                      <label class="semibold24 blue10">Choose a Template</label>
                    </div>
                  </div>
                  <div class="tw-mx-4 tw-my-2">
                    Select a template from the largest selection of free form templates available online.
                  </div>
                  <div>
                    <div class="">
                      <div>
                        <base-horizontal-navigation
                            v-bind:field="UseTemplateNavagationModal"
                            @callbackField="useTemplateNavagation"
                        >
                        </base-horizontal-navigation>
                      </div>
                      <div v-if="UseTemplatepage==='Ticket Template'">
                        <div class="tw-ml-3">
                          <SearchBar  placeholder="Search By Form Name" @callBackString="formNameInput"></SearchBar>
                        </div>
                        <!--                        <div v-for="FormData in filteredList" :key="FormData.formId">-->
                        <!--                          <div v-if="FormData.UseTemplate === true && Form.Data.ComponentTemplate === true">-->
                        <div class="scroller">
                          <div class="tw-ml-3 tw-my-3">
                            <div class="bg-white base-padding base-shadow radius12px tw-flex tw-flex-row tw-items-start tw-justify-between tw-w-full">
                              <div class="tw-flex tw-flex-row">
                                <div class="base-padding radius12px" style="height: fit-content">
                                  <Icon class="semibold32 icon blue10" icon="heroicons-outline:ticket"/>
                                </div>
                                <div class="tw-flex tw-flex-col tw-items-start base-padding radius12px" style="height: fit-content">
                                  <!--                                      <label class="medium16 blue10">{{ FormData.formName }}</label>-->
                                  <label class="medium16 blue10">HP Form</label>
                                </div>
                              </div>
                              <div class="tw-flex tw-flex-row tw-mx-2">
                                <!--                                <div class="tw-mr-2">-->
                                <!--                                  <base-button-blue-->
                                <!--                                      buttonID="buttonPreview"-->
                                <!--                                      buttonText="Preview"-->
                                <!--                                      buttonIcon="heroicons-outline:eye"-->
                                <!--                                  ></base-button-blue>-->
                                <!--                                </div>-->
                                <base-button-fill
                                    buttonID="buttonUseTemplate"
                                    buttonText="Use Template"
                                    buttonTextColor="white"
                                    buttonBgColor="bg-green5"
                                    @callbackObject="SelectTicketTemplate"
                                    :id="ModalFormId"
                                ></base-button-fill>
                              </div>
                            </div>
                            <div class=" tw-my-2">
                              <div class="bg-white base-padding base-shadow radius12px tw-flex tw-flex-row tw-items-start tw-justify-between tw-w-full">
                                <div class="tw-flex tw-flex-row">
                                  <div class="base-padding radius12px" style="height: fit-content">
                                    <Icon class="semibold32 icon blue10" icon="heroicons-outline:ticket"/>
                                  </div>
                                  <div class="tw-flex tw-flex-col tw-items-start base-padding radius12px" style="height: fit-content">
                                    <label class="medium16 blue10">Helpdesk Ticket{{ FormData.FormName }}</label>
                                  </div>
                                </div>
                                <div class="tw-flex tw-flex-row tw-mx-2">
                                  <!--                                  <div class="tw-mr-2">-->
                                  <!--                                    <base-button-blue-->
                                  <!--                                        buttonID="buttonPreview"-->
                                  <!--                                        buttonText="Preview"-->
                                  <!--                                        buttonIcon="heroicons-outline:eye"-->
                                  <!--                                    ></base-button-blue>-->
                                  <!--                                  </div>-->
                                  <base-button-fill
                                      buttonID="buttonUseTemplate"
                                      buttonText="Use Template"
                                      buttonTextColor="white"
                                      buttonBgColor="bg-green5"
                                      @callbackObject="SelectTicketTemplate"
                                      :id="ModalFormId"
                                  ></base-button-fill>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-if="UseTemplatepage==='My Template'">
                      <div class="tw-ml-3">
                        <SearchBar  placeholder="Search By Form Name" @callBackString="formNameInput"></SearchBar>
                      </div>
                      <!--                        <div v-for="FormData in filteredList" :key="FormData.formId">-->
                      <!--                          <div v-if="FormData.UseTemplate === true && Form.Data.ComponentTemplate === true" && Form.Data.CreatedByUser ==={{Username}}>-->
                      <div class="scroller">
                        <div class="tw-ml-3 tw-my-3">
                          <div class="bg-white base-padding base-shadow radius12px tw-flex tw-flex-row tw-items-start tw-justify-between tw-w-full">
                            <div class="tw-flex tw-flex-row">
                              <div class="base-padding radius12px" style="height: fit-content">
                                <Icon class="semibold32 icon blue10" icon="heroicons-outline:ticket"/>
                              </div>
                              <div class="tw-flex tw-flex-col tw-items-start base-padding radius12px" style="height: fit-content">
                                <!--                                      <label class="medium16 blue10">{{ FormData.formName }}</label>-->
                                <label class="medium16 blue10">My Ticket System Template1</label>
                              </div>
                            </div>
                            <div class="tw-flex tw-flex-row tw-mx-2">
                              <div class="tw-mr-2">
                                <div class="choose-delete tw-flex tw-flex-row tw-items-center tw-ml-2 medium16">
                                  <Icon class="semibold24 icon " icon="heroicons-outline:trash"/>
                                  <label class="tw-mt-0.5 tw-mx-3 tw-cursor-pointer semibold16 ">Delete</label>
                                </div>
                              </div>
                              <!--                              <div class="tw-mr-2">-->
                              <!--                                <base-button-blue-->
                              <!--                                    buttonID="buttonPreview"-->
                              <!--                                    buttonText="Preview"-->
                              <!--                                    buttonIcon="heroicons-outline:eye"-->
                              <!--                                ></base-button-blue>-->
                              <!--                              </div>-->
                              <base-button-fill
                                  buttonID="buttonUseTemplate"
                                  buttonText="Use Template"
                                  buttonTextColor="white"
                                  buttonBgColor="bg-green5"
                                  @callbackObject="SelectTicketTemplate"
                                  :id="ModalFormId"
                              ></base-button-fill>
                            </div>
                          </div>
                          <div class=" tw-my-2">
                            <div class="bg-white base-padding base-shadow radius12px tw-flex tw-flex-row tw-items-start tw-justify-between tw-w-full">
                              <div class="tw-flex tw-flex-row">
                                <div class="base-padding radius12px" style="height: fit-content">
                                  <Icon class="semibold32 icon blue10" icon="heroicons-outline:ticket"/>
                                </div>
                                <div class="tw-flex tw-flex-col tw-items-start base-padding radius12px" style="height: fit-content">
                                  <label class="medium16 blue10">My Ticket System Template2{{ FormData.FormName }}</label>
                                </div>
                              </div>
                              <div class="tw-flex tw-flex-row tw-mx-2">
                                <div class="tw-mr-2">
                                  <div class="choose-delete tw-flex tw-flex-row tw-items-center tw-ml-2 medium16">
                                    <Icon class="semibold24 icon " icon="heroicons-outline:trash"/>
                                    <label class="tw-mt-0.5 tw-mx-3 tw-cursor-pointer semibold16 ">Delete</label>
                                  </div>
                                </div>
                                <!--                                <div class="tw-mr-2">-->
                                <!--                                  <base-button-blue-->
                                <!--                                      buttonID="buttonPreview"-->
                                <!--                                      buttonText="Preview"-->
                                <!--                                      buttonIcon="heroicons-outline:eye"-->
                                <!--                                  ></base-button-blue>-->
                                <!--                                </div>-->
                                <base-button-fill
                                    buttonID="buttonUseTemplate"
                                    buttonText="Use Template"
                                    buttonTextColor="white"
                                    buttonBgColor="bg-green5"
                                    @callbackObject="SelectTicketTemplate"
                                    :id="ModalFormId"
                                ></base-button-fill>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!--                </div>-->
              <!--              </div>-->
            </div>
          </transition>
          <!-- My Ticket-->
          <div v-if="namePage==='My Form'" class="base-padding">
            My Form Page
          </div>
          <!-- Shared with me -->
          <div v-if="namePage==='Shared with me'" class="base-padding">
            Shared with me Page
          </div>
        </div>
      </div>
    </template>
  </layout-sidebar-navbar>
</template>

<script>
import { Icon } from '@iconify/vue2'
import { mapGetters, mapActions } from 'vuex'
import LayoutSidebarNavbar from '@/layouts/LayoutSidebarNavbar'
import BaseHorizontalNavigation from '@/components/BaseHorizontalNavigation'
import BaseButtonWhite from '@/components/BaseButtonWhite'
import BaseButtonBlue from '@/components/BaseButtonBlue'
import BaseButtonFill from '@/components/BaseButtonId'
import BaseBadge from "@/components/BaseBadge";
import SearchBar from "@/components/SearchBar";
import BaseButtonBack from "@/components/BaseButtonBack";
import dayjs from "dayjs"
import axios from "axios";

export default {
  name: 'Form.vue',
  components: {
    LayoutSidebarNavbar,
    BaseHorizontalNavigation,
    Icon,
    BaseButtonFill,
    BaseButtonWhite,
    BaseButtonBlue,
    BaseBadge,
    SearchBar,
    BaseButtonBack,
  },
  data() {
    return {
      horizontalNavigationID: [{field: 'All Form'}, {field: 'My Form'}, {field: 'Shared with me'}],
      horizontalNavigationModal: [{field: 'Detail'}, {field: 'Setting'}],
      UseTemplateNavagationModal: [{field: 'Ticket Template'}],
      namePage: 'All Form',
      ModalPage: 'Detail',
      StateShowContentForWindowSize: true,
      FormData: [],
      TicketTemplate: false,
      UseTemplatepage: 'Ticket Template',
      showFormBuilderLayout: false,
      showFormDetailLayout: false,
      CreateFormBtnClick: true,
      ClickedFormId: '',
      ModalFormId: '',
      ModalFormName: '',
      ModalFormCreatedByUser:'',
      ModalFormCreated: '',
      ModalFormDescription: '',
      formNameSearch: '',
      UseTemplateModal: false,
      Username:''
    }
  },
  watch:{
    windowResize (){
      this.StateShowContentForWindowSize = window.innerWidth >= 768
    }
  },
  computed: {
    ...mapGetters(['windowResize']),
    filteredList: function () {
      return this.FormData.filter(FormData =>
          FormData.formName.toLowerCase().match(this.formNameSearch.toLowerCase())
      );
    },
  },
  async mounted () {
    window.onresize = () => {
      this.flapWindowResize()
    }
    this.StateShowContentForWindowSize = window.innerWidth >= 768
    this.Username = localStorage.getItem('username') // check user ว่ามี my template อะไรบ้าง
    await axios.get('http://localhost:4000/api/Flexform/AllForm')
        .then(response => {
          if(response.status===200 && response.data) {
            // this.FormData = response.data[1]["createdByUser"]
            this.FormData = response.data
            console.log(response.status)
            console.log(this.FormData)
          }
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    // try {
    //   const response = await axios.get("http://localhost:4000/{ticketid}")
    //   this.FormStructure = response
    // }catch(error){
    //   console.log(error)
    // }
  },
  methods: {
    ...mapActions(['flapWindowResize']),
    doHorizontalNavigation(page) {
      this.namePage = page
    },
    HorizontalModalNavigation(page){
      this.ModalPage = page
    },
    useTemplateNavagation(page){
      this.UseTemplatepage = page
    },
    formNameInput(input){
      this.formNameSearch = input
    },
    CreateFormModal(){
      this.showFormBuilderLayout = !this.showFormBuilderLayout
    },
    // GenerateFormId() {
    //   return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    //       (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    //   )
    // },
    async CreateBlankForm(){
      this.$router.push({
        name: 'Builder',
        params: { CreateForm: this.CreateFormBtnClick}})
    },
    async GoFillForm(string){
      this.ClickedFormId = string
      console.log("clicked for id: " + this.ClickedFormId)
      this.$router.push({
        name: 'Fill',
        params: { ClickedForm: this.ClickedFormId}})
    },
    async GoAllTicket(string){
      this.ClickedFormId = string
      //console.log("clicked for id: " + this.ClickedFormId)
      this.$router.push({
        name: 'AllTicket',
        params: { ClickedForm: this.ClickedFormId}})
    },
    async SelectTicketTemplate(string){
      this.ClickedFormId = string
      //console.log("clicked for id: " + this.ClickedFormId)
      this.$router.push({
        name: 'Builder', // ไปหน้าที่ทำ ticket
        params: { ClickedForm: this.ClickedFormId}})
    },
    async SelectForm(formId){
      this.CreateFormBtnClick = false
      this.ClickedFormId = formId
      this.$router.push({
        name: 'Builder',
        params: {
          CreateForm: this.CreateFormBtnClick,
          ClickedForm: this.ClickedFormId
        }
      })
    },
    async GoResponse(string){
      this.ClickedFormId = string
      console.log("clicked for id: " + this.ClickedFormId)
      this.$router.push({
        name: 'Response',
        params: { PropFormId: this.ClickedFormId}})
    },
    showFormDetail(formId,formName,formDescription,createdByUser,formCreatedTimestamp){
      this.showFormDetailLayout = !this.showFormDetailLayout
      this.ModalPage = 'Detail'
      this.ModalFormId = formId
      this.ModalFormName = formName
      this.ModalFormCreatedByUser = createdByUser
      this.ModalFormCreated = dayjs(formCreatedTimestamp).format('DD/MM/YYYY') // แปลงเป็นวันที่ธรรมดา
      console.log(this.ModalFormCreated)
      this.ModalFormDescription = formDescription

    },
    SelectTemplate(){
      this.UseTemplateModal = !this.UseTemplateModal
      this.showFormBuilderLayout = !this.showFormBuilderLayout
    },
    MyTemplatePage(){
      this.$router.push('/MyTemplate')
    },
  }
}
</script>
<style lang="scss" scoped>

.verticalbutton {
  color: $blue5;
  padding: 0.75rem;
  transition: all .1s ease-in;
  border-radius: 12px;
  margin: 0.25rem 0;
  cursor: pointer;
  border-width: 1px;
  border-color: $blue5;
  box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.1);
  &:hover{
    color: $blue3;
    border-color: $blue3;
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
  margin: 2rem;
  min-width: 375px;
  width: 768px;
  background-color: white;
  padding: 1rem;
  box-shadow: 0 0 0.5px rgba(10, 10, 10, 0.5);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  height: 50%;
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
.button__close{
  width: fit-content;
  color: $blue10;
  border-radius: 12px;
  padding: 0.75rem;
  margin: 2px 0;
  cursor: pointer;
  transition: all .1s ease-in;
  &:hover{
    color: $red5;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
  }
}
.choose{
  color: $blue10;
  border-radius: 10px;
  padding: 0.75rem;
  cursor: pointer;
  transition: all .1s ease-in;
  &:hover{
    color: $blue5;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
  }
}
.choose-delete{
  color: $red5;
  padding: 0.75rem;
  transition: all .1s ease-in;
  border-radius: 10px;
  margin: 0.25rem 0;
  cursor: pointer;
  &:hover{
    color: white;
    background-color: $red5;
  }
}
.select__create__form {
  cursor: pointer;

  .button__grey {
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

      .icon {
        color: $grey3;
      }
    }

    .text__blue {
      color: $blue4;
    }

    .text__grey {
      color: $grey4;
    }
  }
}

.detailcard{
  width:100%;
  max-width: 650px;
  //height:270px;
}
.modaldescriptiondetail{
  border-radius: 7px;
  border-width: 1px;
  border-color: $grey3;
  padding: 0.5rem;
  //background-color: $grey6;
}
.button-usetemplate {
  color: white;
  background-color: $green5;
  padding: 0.75rem;
  transition: all .1s ease-in;
  border-radius: 12px;
  margin: 0.25rem 0;
  cursor: pointer;
  box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.1);
  &:hover{
    color: white;
    background-color: $green3;
  }
}
.scroller{
  width: 800px;
  height: 200px;
  overflow-y: scroll;
  scrollbar-color: rebeccapurple green;
  scrollbar-width: thin;
}
</style>