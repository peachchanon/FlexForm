<template>
  <layout-sidebar-navbar>
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
          <div v-if="namePage==='All Ticket'" class="tw-px-3">
            <div class="tw-flex tw-flex-row tw-justify-between tw-items-center">
              <!-- Filter Box -->
              <div class="tw-pr-4" :class="{'tw-w-full': !StateShowContentForWindowSize, 'tw-w-2/5':StateShowContentForWindowSize}">
                <base-filter-box
                    propBlankDataText= "Form: Show All"
                ></base-filter-box>
              </div>
              <div class="tw-flex tw-flex-row tw-items-center">
                <!-- My Template Button -->
                <div class="tw-mx-1">
                  <base-button-blue
                      buttonID="buttonCreateForm"
                      buttonText="My Template"
                      buttonIcon="heroicons-outline:folder"
                  ></base-button-blue>
                </div>
                <!-- Create Form Button -->
                <div class="tw-mx-1">
                  <base-button-white
                      buttonID="buttonCreateForm"
                      buttonText="Create Form"
                      buttonIcon="heroicons-outline:plus"
                      :callback="CreateForm"
                  ></base-button-white>
                </div>
              </div>
            </div>
            <!-- Form list-->
            <!--  <div v-for="(FormStructure, FormID) in FormStructure" :key="FormID"> เปิดเมื่อต่อดาต้าเบส !-->
            <div v-if="TicketTemplate === true">
              <div class="tw-my-2">
                <div class="bg-white base-padding base-shadow radius12px tw-flex tw-flex-row tw-items-start tw-justify-between">
                  <div class="tw-flex tw-flex-row">
                    <div class="bg-blue1 base-padding radius12px" style="height: fit-content">
                      <Icon class="semibold24 icon blue10" icon="heroicons-outline:ticket"/>
                    </div>
                    <div class="tw-flex tw-flex-col tw-items-start tw-mx-2">
                      <label v-if="StateShowContentForWindowSize" class="medium16 grey5">Form name</label>
                      <label class="medium16 blue10">National Telecom Public Company Limited Ticket (NOC)</label>
                    </div>
                    <div v-if="StateShowContentForWindowSize" class="tw-flex tw-flex-col tw-items-start tw-mx-6">
                      <label class="medium16 grey5">Created By</label>
                      <label class="light16 grey7">{{ CreatedByUser }}</label>
                    </div>
                  </div>
                  <div class="tw-flex tw-flex-row tw-mx-2">
                    <div class="">
                      <BaseButtonDelete
                          buttonID="buttonDelete"
                          buttonText="Delete"
                          buttonIcon="heroicons-outline:trash"
                      ></BaseButtonDelete>
                    </div>
                    <div class="tw-mx-2">
                      <base-button-blue
                          buttonID="buttonViewMore"
                          buttonText="View More"
                          buttonIcon="heroicons-outline:eye"
                      ></base-button-blue>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="TicketTemplate === false">
              <div class="tw-my-2">
                <div class="bg-white base-padding base-shadow radius12px tw-flex tw-flex-row tw-items-start tw-justify-between">
                  <div class="tw-flex tw-flex-row">
                    <div v-if= "TicketTemplate === false" class="bg-green1 base-padding radius12px" style="height: fit-content">
                      <Icon class="semibold24 icon blue10" icon="heroicons-outline:document-text"/>
                    </div>
                    <div class="tw-flex tw-flex-col tw-items-start tw-mx-2">
                      <label v-if="StateShowContentForWindowSize" class="medium16 grey5">Form name</label>
                      <label class="medium16 blue10">Form</label>
                    </div>
                    <div v-if="StateShowContentForWindowSize" class="tw-flex tw-flex-col tw-items-start tw-mx-6">
                      <label class="medium16 grey5">Created By</label>
                      <label class="light16 grey7">{{ CreatedByUser }}</label>
                    </div>
                  </div>
                  <div class="tw-flex tw-flex-row tw-mx-2">
                    <div class="">
                      <BaseButtonDelete
                          buttonID="buttonDelete"
                          buttonText="Delete"
                          buttonIcon="heroicons-outline:trash"
                      ></BaseButtonDelete>
                    </div>
                    <div class="tw-mx-2">
                      <base-button-blue
                          buttonID="buttonViewMore"
                          buttonText="View More"
                          buttonIcon="heroicons-outline:eye"
                      ></base-button-blue>
                    </div>
                    <div class="tw-mx-2">
                      <div class="verticalbutton tw-flex tw-flex-row tw-items-center medium16">
                        <Icon class="icon semibold24" icon="heroicons-outline:dots-vertical"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--          </div>-->
          </div>
          <!-- Create an Account Modal -->
          <transition name="theme-modal-fade" v-if="showFormBuilderLayout">
            <div class="theme-modal-backdrop">
              <div v-if="showFormBuilderLayout === true" class="base-padding tw-h-full tw-w-full tw-flex tw-flex-col tw-items-center md:tw-justify-center tw-justify-start">
                <div class="bg-white radius12px base-shadow base-padding base-margin" style="width: fit-content">
                  <div class="tw-flex tw-flex-row tw-items-center tw-justify-between">
                    <div class="tw-flex tw-flex-row tw-items-center tw-relative">
                      <Icon class="semibold32 icon blue10 tw-pr-1 tw-mx-1 " icon="heroicons-outline:folder"/>
                      <label class="semibold24 blue10">Create a Form</label>
                    </div>
                    <div class="button__close" @click="CreateForm">
                      <Icon class="semibold24" icon="heroicons-outline:x"/>
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
            </div>
          </transition>

          <!-- My Ticket-->
          <div v-if="namePage==='My Ticket'" class="base-padding">
            My Ticket Page
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
import BaseFilterBox from '@/components/BaseFilterBox'
import BaseButtonWhite from '@/components/BaseButtonWhite'
import BaseButtonBlue from '@/components/BaseButtonBlue'
import BaseButtonDelete from '@/components/BaseButtonDelete'
import axios from "axios";

export default {
  name: 'Form.vue',
  components: {
    LayoutSidebarNavbar,
    BaseHorizontalNavigation,
    Icon,
    BaseFilterBox,
    BaseButtonWhite,
    BaseButtonBlue,
    BaseButtonDelete
  },
  data() {
    return {
      horizontalNavigationID: [{field:'All Ticket'},{field:'My Ticket'},{field:'Shared with me'}],
      namePage: 'All Ticket',
      StateShowContentForWindowSize: true,
      TicketTemplate: false,
      CreatedByUser:'Chanon Panarong',
      FormStructure:[],
      showFormBuilderLayout: false
    }
  },
  watch:{
    windowResize () {
      this.StateShowContentForWindowSize = window.innerWidth >= 768
    }
  },
  computed: {
    ...mapGetters(['windowResize'])
  },
  async mounted () {
    window.onresize = () => {
      this.flapWindowResize()
    }
    this.StateShowContentForWindowSize = window.innerWidth >= 768
    try {
      const response = await axios.get("http://localhost:4000/{ticketid}")
      this.FormStructure = response
    }catch(error){
      console.log(error)
    }
  },
  methods: {
    ...mapActions(['flapWindowResize']),
    doHorizontalNavigation(page) {
      this.namePage = page
    },
    CreateForm(){
      this.showFormBuilderLayout = !this.showFormBuilderLayout
    }
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
</style>
