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
                      :callback="doButton"
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
                    <div v-if="StateShowContentForWindowSize" class="tw-flex tw-flex-col tw-items-start tw-mx-2">
                      <label class="medium16 grey5">Description</label>
                      <label class="light16 grey7">Ticket สำหรับใช้ภายในองค์กรบริษัท เพื่อรับเรื่องปัญหาของ NOC</label>
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
                    <div v-if="StateShowContentForWindowSize" class="tw-flex tw-flex-col tw-items-start tw-mx-2">
                      <label class="medium16 grey5">Description</label>
                      <label class="light16 grey7">Form สำหรับเก็บรวบรวมความคิดเห็น</label>
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
                      <div class="verticalbutton tw-flex tw-flex-row tw-items-center medium16" @click="buttonClicked">
                        <Icon class="icon semibold24" icon="heroicons-outline:dots-vertical"/>
                      </div>
                  </div>
                </div>
              </div>
              </div>
            </div>
          <!--          </div>-->
        </div>

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
  },
  methods: {
    ...mapActions(['flapWindowResize']),
    doHorizontalNavigation(page) {
      this.namePage = page
    },
    doButton(nameButton){
      if(nameButton==='buttonCreateForm'){
        this.$router.push('/form-builder').catch(()=>{})
      }
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

</style>
