<template>
  <layout-sidebar-navbar>
    <template #content>
      <div class="bg-grey1 tw-h-full sm:tw-p-2">
        <div class="base-margin tw-flex tw-flex-row tw-items-center">
          <Icon class="semibold24 icon blue10" icon="heroicons-outline:home"/>
          <span class="semibold24 blue10 tw-pl-1">Dashboard</span>
        </div>
        <div class="md:tw-flex md:tw-flex-row-reverse tw-w-full">
          <!-- Bookmark -->
          <div class="box bg-white md:tw-w-1/2">
            <div class="tw-flex tw-flex-row tw-items-center">
              <Icon class="semibold24 icon blue10" icon="heroicons-outline:bookmark-alt"/>
              <span class="semibold24 blue10 tw-m-2">Bookmark</span>
            </div>
            <!-- Notifications | Card list -->
            <div class="tw-flex tw-flex-col tw-scroll-auto">

              <div class="base-padding base-shadow radius12px bg-white tw-flex tw-flex-row tw-items-center tw-justify-between tw-mb-2 tw-scroll-auto">
                <div class="semibold24 base-padding bg-blue1 radius12px">
                  <Icon class="icon blue10" icon="heroicons-outline:folder"/>
                </div>
                <div class="base-padding tw-w-full tw-whitespace-nowrap tw-truncate tw-overflow-hidden">
                  <span>National Telecom Public Company Limited Ticket (NOC)</span>
                </div>
                <div class="base-padding">
                  <Icon class="icon semibold24  red5" icon="heroicons-outline:minus"/>
                </div>
              </div>

              

            </div>
          </div>
          <!-- Report -->
          <div class="box bg-white md:tw-w-1/2">
            <div class="tw-flex tw-flex-row tw-items-center">
              <Icon class="semibold24 icon blue10" icon="heroicons-outline:document-report"/>
              <span class="semibold24 blue10 tw-pl-1">Report</span>
            </div>
            <div class="lg:tw-flex lg:tw-flex-row">
              <div class="lg:tw-w-1/2 lg:tw-flex lg:tw-flex-col">
                <span class="blue10 semiblod72">100</span>
                <div class="tw-flex tw-flex-col">
                  <span class="blue6 semibold24">Reports</span>
                  <span class="grey7 medium16">จำนวน Report ในระบบ FlexForm</span>
                </div>
              </div>
              <div class="lg:tw-w-1/2 lg:tw-flex lg:tw-flex-col">
                <span class="blue10 semiblod72">100</span>
                <div class="tw-flex tw-flex-col">
                  <span class="blue6 semibold24">Reports</span>
                  <span class="grey7 medium16">จำนวน Report ของฉัน</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Form -->
        <div class="box bg-white">
          <div class="tw-flex tw-flex-row tw-items-center">
            <Icon class="semibold24 icon blue10" icon="heroicons-outline:folder"/>
            <span class="semibold24 blue10 tw-pl-1">Form</span>
          </div>
          <div class="lg:tw-flex lg:tw-flex-row">
            <div class="lg:tw-flex lg:tw-flex-row lg:tw-w-1/3">
              <div class="lg:tw-w-1/2 lg:tw-flex lg:tw-flex-col">
                <span class="blue10 semiblod72">100</span>
                <div class="tw-flex tw-flex-col">
                  <span class="blue6 semibold24">Reports</span>
                  <span class="grey7 medium16">จำนวน Report ในระบบ FlexForm</span>
                </div>
              </div>
              <div class="lg:tw-w-1/2 lg:tw-flex lg:tw-flex-col">
                <span class="blue10 semiblod72">100</span>
                <div class="tw-flex tw-flex-col">
                  <span class="blue6 semibold24">Reports</span>
                  <span class="grey7 medium16">จำนวน Report ของฉัน</span>
                </div>
              </div>
            </div>
            <div class="lg:tw-flex lg:tw-flex-row lg:tw-w-2/3">
              <div class="box bg-white lg:tw-w-1/3 lg:tw-flex lg:tw-flex-col">
                <span class="grey10 semibold24">Form Priority</span>
              </div>
              <div class="box bg-white lg:tw-w-1/3 lg:tw-flex lg:tw-flex-col">
                <span class="grey10 semibold24">Form Status</span>
              </div>
              <div class="box bg-white lg:tw-w-1/3 lg:tw-flex lg:tw-flex-col">
                <span class="grey10 semibold24">Form Active</span>
              </div>
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
export default {
  name: 'Dashboard',
  components: {
    Icon,
    LayoutSidebarNavbar,
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
