<template>
  <div class="bg-grey1 radius12px medium16 filter-full tw-flex tw-flex-row tw-items-center tw-justify-between">
    <!-- Filter Box -->
    <div class="tw-w-full tw-flex tw-flex-row tw-items-start base-padding">
      <base-badge
          v-show="!value.length"
          :BadgeText="propBlankDataText"
          BadgeColor="white"
          BadgeBgColor="bg-green5"
          BadgeBroderColor="border-gray1"
          class="tw-cursor-pointer"
      ></base-badge>
      <base-badge
          v-for="(item,index) in value" :key="index"
          :BadgeText="item"
          BadgeColor="white"
          BadgeBgColor="bg-green5"
          BadgeBroderColor="border-gray1"
          class="tw-cursor-pointer"
      ></base-badge>
    </div>
    <div class="tw-flex tw-flex-row tw-items-center">
      <div class="button-filter base-padding" @click="doFilterModal(true)">
        <Icon class="icon semibold24" icon="heroicons-outline:filter"/>
      </div>
      <div class="button-search base-padding" @click="buttonFilter">
        <Icon class="icon semibold24" icon="heroicons-outline:search"/>
      </div>
    </div>
    <!-- Filter Modal -->
    <transition name="theme-modal-fade" v-if="showFilterModal">
      <div class="theme-modal-backdrop">
        <div class="theme-modal">
          <header class="base-padding tw-flex tw-flex-col tw-items-start tw-relative">
            <div class="tw-flex tw-flex-row tw-items-center tw-mt-2">
              <Icon class="icon semibold24" icon="heroicons-outline:view-boards"/>
              <span class="semibold24 grey10 tw-ml-2">Show Column</span>
            </div>
            <div class="button-close tw-flex tw-flex-col tw-items-center medium16 tw-absolute tw-top-0 tw-right-0" style="width: fit-content" @click="doFilterModal(false)">
              <Icon class="icon semibold24" icon="heroicons-outline:x"/>
            </div>
          </header>
          <section class="base-padding">
            <span class="medium16 grey10 tw-mb-5">Select the column you want to display.</span>
            <div class="tw-my-2">
              <multiselect
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :options="propOptions"
                  v-model="value"
                  placeholder="Select Column"
              >
              </multiselect>
            </div>
          </section>
          <footer class="tw-pl-3 tw-pr-3 tw-flex tw-flex-col tw-items-end tw-mb-3 tw-w-full">
            <div class="tw-w-1/3">
              <base-button
                  buttonID="buttonOk"
                  buttonText="Ok"
                  buttonTextColor="white"
                  buttonBgColor="bg-blue5"
                  :callback="buttonFilter"
              ></base-button>
            </div>
          </footer>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue2'
import BaseButton from '@/components/BaseButton'
import Multiselect from 'vue-multiselect'
import BaseBadge from '@/components/BaseBadge'

import Vue from 'vue'

Vue.component('multiselect', Multiselect)

export default {
  name: "BaseFilterBox",
  components: {
    Icon,
    BaseButton,
    BaseBadge,
    Multiselect
  },
  emits:['callbackDataFilter'],
  data() {
    return {
      showFilterModal: false,
      value: [],
    }
  },
  props: {
    propOptions: Array,
    propBlankDataText : String
  },
  methods:{
    buttonFilter(){
      this.doFilterModal(false)
      this.$emit('callbackDataFilter',this.value)
    },
    doFilterModal(state){
      this.showFilterModal = state
      if(state === false){
        this.$emit('callbackDataFilter',this.value)
      }
    }
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss" scoped>
.filter-box{
  width: 500px;
}
.button-filter{
  border-radius: 12px 0 0 12px;
  cursor: pointer;
  transition: all .1s ease-in;
  color: $grey5;
  &:hover{
    color: $blue5;
    background-color: white;
    box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.1);
  }
  &:active {
    color: white;
    background-color: $grey5;
    box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.1);
  }
}
.button-search {
  border-radius: 0 12px 12px 0;
  cursor: pointer;
  transition: all .1s ease-in;
  color: $grey5;
  &:hover {
    color: $blue5;
    background-color: white;
    box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.1);
  }
  &:active {
    color: white;
    background-color: $grey5;
    box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.1);
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
  margin: 130px 0 1rem 0;
  width: 560px;
  background-color: white;
  padding: 1rem;
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
</style>