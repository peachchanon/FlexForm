<template>
  <div class="tw-w-full tw-flex tw-flex-row">
    <div 
        v-for="(element, index) in itemList" :key="index"
        class="tw-w-full tw-text-center tw-cursor-pointer tw-text-grey5 hover:tw-text-grey2 tw-bg-grey10 hover:tw-bg-grey9 tw-pt-2 tw-transition tw-ease-in"
        @click="buttonClick(element, index)"
    >
      <span class="medium16" :class="{'white': stateIndex === index, 'grey5': stateIndex !== index}">{{element}}</span>
      <div class="bg-white tw-h-1 tw-mt-2 tw-transition tw-ease-in tw-mx-2 radius10px" :class="{'tw-visible': stateIndex === index, 'tw-invisible': stateIndex !== index}"></div>
    </div>
  </div>
</template>

<script>
//import { Icon } from '@iconify/vue2'
export default {
  name: "BaseNavigationPropertiesFormBuilder",
  emits: ['callbackName'],
  components: {
    //Icon
  },
  props: {
    itemList: Array
  },
  data() {
    return {
      stateIndex: 0
    }
  },
  methods: {
    buttonClick(element, index){
      this.stateIndex = index
      this.$emit('callbackName', {index: index,name: element})
    }
  }
}
</script>

<style scoped>

</style>