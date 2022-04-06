<template>
<layout-sidebar-navbar-vue>
  <template #content>
    <div class="bg-grey1 tw-h-full">
      <div class="base-margin tw-flex tw-flex-row tw-items-center">
        <base-button-back
            :callback="PreviousPage"></base-button-back>
        <Icon class="semibold24 icon blue10" icon="heroicons-outline:chart-pie"/>
        <span class="semibold24 blue10 tw-pl-1">Data Visualization</span>
      </div>
    </div>
    <div class="box bg-white tw-h-full">
      <div class="tw-ml-2 tw-mt-3">
      <SearchBar @callBackString="SearchInput"></SearchBar>
      </div>
      <div class="tw-my-2">
        <div class="cardlist bg-white base-padding base-shadow radius12px tw-mt-7 tw-flex tw-flex-row tw-items-start tw-justify-between"
        @click="Graph1">
          <div class="tw-flex tw-flex-row">
            <div class="bg-blue1 base-padding radius12px" style="height: fit-content">
              <Icon class="semibold24 icon blue10" icon="heroicons-outline:chart-pie"/>
            </div>
            <div class="tw-flex tw-flex-col tw-items-center tw-mx-4 tw-my-3">
              <label class="medium16 blue10">จำนวน ticket ที่ถูกสร้างขึ้นภายใน 1 สัปดาห์</label>
            </div>
          </div>
        </div>
        <div class="cardlist bg-white base-padding base-shadow radius12px tw-mt-5 tw-flex tw-flex-row tw-items-start tw-justify-between"
             @click="Graph2">
          <div class="tw-flex tw-flex-row">
            <div class="bg-blue1 base-padding radius12px" style="height: fit-content">
              <Icon class="semibold24 icon blue10" icon="heroicons-outline:chart-pie"/>
            </div>
            <div class="tw-flex tw-flex-col tw-items-center tw-mx-4 tw-my-3">
              <label class="medium16 blue10">จำนวน ticket แต่ละประเภทที่ถูกสร้างขึ้นรายสัปดาห์</label>
            </div>
          </div>
        </div>
        <div class="cardlist bg-white base-padding base-shadow radius12px tw-mt-5 tw-flex tw-flex-row tw-items-start tw-justify-between">
          <div class="tw-flex tw-flex-row">
            <div class="bg-blue1 base-padding radius12px" style="height: fit-content">
              <Icon class="semibold24 icon blue10" icon="heroicons-outline:chart-pie"/>
            </div>
            <div class="tw-flex tw-flex-col tw-items-center tw-mx-4 tw-my-3">
              <label class="medium16 blue10">จำนวน ticket แต่ละประเภทที่ถูกสร้างขึ้นรายเดือน</label>
            </div>
          </div>
        </div>
        <div class="cardlist bg-white base-padding base-shadow radius12px tw-mt-5 tw-flex tw-flex-row tw-items-start tw-justify-between"
             @click="Graph3">
          <div class="tw-flex tw-flex-row">
            <div class="bg-blue1 base-padding radius12px" style="height: fit-content">
              <Icon class="semibold24 icon blue10" icon="heroicons-outline:chart-pie"/>
            </div>
            <div class="tw-flex tw-flex-col tw-items-center tw-mx-4 tw-my-3">
              <label class="medium16 blue10">จำนวนครั้งที่เกิด ticket ของแต่ละสถานที่</label>
            </div>
          </div>
        </div>
        <div class="cardlist bg-white base-padding base-shadow radius12px tw-mt-5 tw-flex tw-flex-row tw-items-start tw-justify-between">
          <div class="tw-flex tw-flex-row">
            <div class="bg-blue1 base-padding radius12px" style="height: fit-content">
              <Icon class="semibold24 icon blue10" icon="heroicons-outline:chart-pie"/>
            </div>
            <div class="tw-flex tw-flex-col tw-items-center tw-mx-4 tw-my-3">
              <label class="medium16 blue10">จำนวน ticket ที่เกิดขึ้นของแต่ละบริษัท</label>
            </div>
          </div>
        </div>
        <div class="cardlist bg-white base-padding base-shadow radius12px tw-mt-5 tw-flex tw-flex-row tw-items-start tw-justify-between">
          <div class="tw-flex tw-flex-row">
            <div class="bg-blue1 base-padding radius12px" style="height: fit-content">
              <Icon class="semibold24 icon blue10" icon="heroicons-outline:chart-pie"/>
            </div>
            <div class="tw-flex tw-flex-col tw-items-center tw-mx-4 tw-my-3">
              <label class="medium16 blue10">ระยะเวลาเฉลี่ยในการจัดการกับ ticket แต่ละประเภท</label>
            </div>
          </div>
        </div>
        <div class="cardlist bg-white base-padding base-shadow radius12px tw-mt-5 tw-flex tw-flex-row tw-items-start tw-justify-between">
          <div class="tw-flex tw-flex-row">
            <div class="bg-blue1 base-padding radius12px" style="height: fit-content">
              <Icon class="semibold24 icon blue10" icon="heroicons-outline:chart-pie"/>
            </div>
            <div class="tw-flex tw-flex-col tw-items-center tw-mx-4 tw-my-3">
              <label class="medium16 blue10">จำนวน ticket ที่แต่ละแผนกได้รับ </label>
            </div>
          </div>
        </div>
        <div class="cardlist bg-white base-padding base-shadow radius12px tw-mt-5 tw-flex tw-flex-row tw-items-start tw-justify-between">
          <div class="tw-flex tw-flex-row">
            <div class="bg-blue1 base-padding radius12px" style="height: fit-content">
              <Icon class="semibold24 icon blue10" icon="heroicons-outline:chart-pie"/>
            </div>
            <div class="tw-flex tw-flex-col tw-items-center tw-mx-4 tw-my-3">
              <label class="medium16 blue10">จำนวน urgent ticket ที่แต่ละแผนกได้รับ </label>
            </div>
          </div>
        </div>
        <div class="cardlist bg-white base-padding base-shadow radius12px tw-mt-5 tw-flex tw-flex-row tw-items-start tw-justify-between">
          <div class="tw-flex tw-flex-row">
            <div class="bg-blue1 base-padding radius12px" style="height: fit-content">
              <Icon class="semibold24 icon blue10" icon="heroicons-outline:chart-pie"/>
            </div>
            <div class="tw-flex tw-flex-col tw-items-center tw-mx-4 tw-my-3">
              <label class="medium16 blue10">ช่วงเวลาที่เกิด ticket </label>
            </div>
          </div>
        </div>
        <div class="cardlist bg-white base-padding base-shadow radius12px tw-mt-5 tw-flex tw-flex-row tw-items-start tw-justify-between">
          <div class="tw-flex tw-flex-row">
            <div class="bg-blue1 base-padding radius12px" style="height: fit-content">
              <Icon class="semibold24 icon blue10" icon="heroicons-outline:chart-pie"/>
            </div>
            <div class="tw-flex tw-flex-col tw-items-center tw-mx-4 tw-my-3">
              <label class="medium16 blue10">สถานะของ Ticket รายเดือน</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
</layout-sidebar-navbar-vue>
</template>

<script>
import LayoutSidebarNavbarVue from "@/layouts/LayoutSidebarNavbar";
import BaseButtonBack from "@/components/BaseButtonBack";
import { Icon } from '@iconify/vue2'
import {mapActions, mapGetters} from "vuex";
import SearchBar from "@/components/SearchBar";
export default {
  name: "DataVisualization.vue",
  components: {
    LayoutSidebarNavbarVue,
    Icon,
    BaseButtonBack,
    SearchBar,
  },
  watch: {
    windowResize () {
      this.showBanner = window.innerWidth >= 1440
    }
  },
  computed: {
    ...mapGetters(['windowResize'])
  },
  async mounted () {
    window.onresize = () => {
      this.flapWindowResize()
    }
    this.showBanner = window.innerWidth >= 1440
  },
  data(){
    return{
      Searchquery:''
    }
  },
  methods: {
    ...mapActions(['flapWindowResize']),
    PreviousPage(){
      this.$router.push('/')
    },
    SearchInput(Searchquery){
      this.Searchquery = Searchquery
    },
    Graph1(){
      console.log('Graph1')
      this.$router.push('/DataVisualization/SelectGraph')
    },
    Graph2(){
      console.log('Graph2')
    },
    Graph3(){
      console.log('Graph3')
    }
  }
}
</script>

<style lang="scss" scoped>
.cardlist{
  width: 99%;
  margin-left: 5px;
}
</style>