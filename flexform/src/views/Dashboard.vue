<template>
  <layout-sidebar-navbar page="dashboard">
    <template #content>
      <div class="bg-grey1 tw-h-full sm:tw-p-2">
        <div class="base-margin tw-flex tw-flex-row tw-items-center">
          <Icon class="semibold24 icon blue10" icon="heroicons-outline:home"/>
          <span class="semibold24 blue10 tw-pl-1">Dashboard</span>
        </div>
        <div class="md:tw-flex md:tw-flex-row tw-w-full">
          <!-- Form -->
          <div class="box bg-white md:tw-w-1/2">
            <div class="tw-flex tw-flex-row tw-items-center">
              <Icon class="semibold24 icon blue10" icon="heroicons-outline:folder"/>
              <span class="semibold24 blue10 tw-pl-1">Form</span>
            </div>
            <div class="lg:tw-flex lg:tw-flex-row tw-justify-center">
              <div class="lg:tw-w-1/2 lg:tw-flex lg:tw-flex-col">
                <span class="blue10" style="font-size: 76px">100</span>
                <div class="tw-flex tw-flex-col">
                  <span class="blue6 semibold24">Reports</span>
                  <span class="grey7 medium16">จำนวน Form ภายในระบบ</span>
                </div>
              </div>
            </div>
          </div>
          <!-- Form Priority -->
          <div class="box bg-white md:tw-w-1/2">
            <div class="tw-flex tw-flex-row tw-items-center">
              <Icon class="semibold24 icon blue10" icon="heroicons-outline:folder"/>
              <span class="semibold24 blue10 tw-pl-1">Form Priority</span>
            </div>
            <div class="tw-flex tw-flex-col tw-items-center">
              <customized-pie-chart chartstyle="chartdashboard"></customized-pie-chart>
            </div>
          </div>
        </div>
        <div class="md:tw-flex md:tw-flex-row tw-w-full">
          <!-- Form Status -->
          <div class="box bg-white md:tw-w-1/2">
            <div class="tw-flex tw-flex-row tw-items-center">
              <Icon class="semibold24 icon blue10" icon="heroicons-outline:folder"/>
              <span class="semibold24 blue10 tw-pl-1">Form Status</span>
            </div>
            <div class="tw-flex tw-flex-col tw-items-center">
              <basic-pie-chart chartstyle="chartdashboard"></basic-pie-chart>
            </div>
          </div>
          <!-- Form Active -->
          <div class="box bg-white md:tw-w-1/2">
            <div class="tw-flex tw-flex-row tw-items-center">
              <Icon class="semibold24 icon blue10" icon="heroicons-outline:folder"/>
              <span class="semibold24 blue10 tw-pl-1">Form Status</span>
            </div>
            <div class="tw-flex tw-flex-col tw-items-center">
              <basic-pie-chart chartstyle="chartdashboard"></basic-pie-chart>
            </div>
          </div>
        </div>
      </div>
    </template>
  </layout-sidebar-navbar>
</template>

<script>
import { Icon } from '@iconify/vue2'
import LayoutSidebarNavbar from '@/layouts/LayoutSidebarNavbar'
import CustomizedPieChart from "@/components/graph/CustomizedPieChart";
import BasicPieChart from "@/components/graph/BasicPieChart";
export default {
  name: 'Dashboard',
  components: {
    Icon,
    LayoutSidebarNavbar,
    CustomizedPieChart,
    BasicPieChart
  },
  methods: {
    buttonClick (e) {
      console.log(e)
    }
  }
}
</script>

<style scoped>

</style>
