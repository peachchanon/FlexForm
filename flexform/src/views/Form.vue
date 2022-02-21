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
              <div class="tw-pr-4" :class="{'tw-w-full': !showContentForWindowSize, 'tw-w-2/5':showContentForWindowSize}">
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
                      buttonText="Created Form"
                      buttonIcon="heroicons-outline:plus"
                      :callback="doButton"
                  ></base-button-white>
                </div>
              </div>
            </div>
            <!-- Form list-->
            <div class="tw-my-2">
              <div class="bg-white base-padding base-shadow radius12px tw-flex tw-flex-row tw-items-start tw-justify-between">
                <div class="tw-flex tw-flex-row">
                  <div class="bg-blue1 base-padding radius12px" style="height: fit-content">
                    <Icon class="semibold24 icon blue10" icon="heroicons-outline:folder"/>
                  </div>
                  <div class="tw-flex tw-flex-col tw-items-start tw-mx-2">
                    <label v-if="showContentForWindowSize" class="medium16 grey5">Form name</label>
                    <label class="medium16 blue10">National Telecom Public Company Limited Ticket (NOC)</label>
                  </div>
                  <div v-if="showContentForWindowSize" class="tw-flex tw-flex-col tw-items-start tw-mx-2">
                    <label class="medium16 grey5">Description</label>
                    <label class="light16 grey7">Ticket สำหรับใช้ภายในองค์กรบริษัท เพื่อรับเรื่องปัญหาของ NOC</label>
                  </div>
                </div>
                <div class="tw-flex tw-flex-row">
                  <div class="">
                    <BaseButtonDelete
                        buttonID="buttonDelete"
                        buttonText="Delete"
                        buttonIcon="heroicons-outline:trash"
                    ></BaseButtonDelete>
                  </div>
                  <div class="">
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
      showContentForWindowSize: true,
    }
  },
  watch:{
    windowResize () {
      this.showContentForWindowSize = window.innerWidth >= 768
    }
  },
  computed: {
    ...mapGetters(['windowResize'])
  },
  async mounted () {
    window.onresize = () => {
      this.flapWindowResize()
    }
    this.showContentForWindowSize = window.innerWidth >= 768
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

</style>
