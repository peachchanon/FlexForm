<template>
  <div class="theme__badge">
    <!-- success -->
    <div
        class="tw-bg-green1 tw-border-green3 tw-opacity-95 hover:tw-opacity-100 tw-transition tw-ease-in tw-delay-20 tw-border radius12px tw-flex tw-flex-row tw-items-center" 
        style="padding: 0.5rem; width: 450px"
        v-if="propType === 'success'"
    >
      <div class="bg-green6 radius12px" style="padding: 0.4rem">
        <div class="bg-white" style="border-radius: 1.5rem; padding: 0.1rem">
          <Icon class="icon__style__large green6" icon="heroicons-outline:check"/>
        </div>
      </div>
      <div class="tw-flex tw-flex-col tw-w-full">
        <label class="green7 tw-ml-4">{{propData}}</label>
      </div>
      <div class="tw-cursor-pointer" style="padding: 0.4rem" @click="doButton('close')">
        <Icon class="medium18 tw-text-green6 hover:tw-text-green8 tw-transition tw-ease-in tw-delay-20" icon="heroicons-outline:x"/>
      </div>
    </div>
    <!-- info -->
    <div
        class="tw-bg-blue1 tw-border-blue3 tw-opacity-95 hover:tw-opacity-100 tw-transition tw-ease-in tw-delay-20 tw-border radius12px tw-flex tw-flex-row tw-items-center"
        style="padding: 0.5rem; width: 450px"
        v-if="propType === 'info'"
    >
      <div class="bg-blue6 radius12px" style="padding: 0.4rem">
        <div class="bg-white" style="border-radius: 1.5rem; padding: 0.1rem">
          <Icon class="icon__style__large blue6" icon="ion:information"/>
        </div>
      </div>
      <div class="tw-flex tw-flex-col tw-w-full">
        <label class="blue7 tw-ml-4">{{propData}}</label>
      </div>
      <div class="tw-cursor-pointer" style="padding: 0.4rem" @click="doButton('close')">
        <Icon class="medium18 tw-text-blue6 hover:tw-text-blue8 tw-transition tw-ease-in tw-delay-20" icon="heroicons-outline:x"/>
      </div>
    </div>
    <!-- warning -->
    <div
        class="tw-bg-yellow1 tw-border-yellow3 tw-opacity-95 hover:tw-opacity-100 tw-transition tw-ease-in tw-delay-20 tw-border radius12px tw-flex tw-flex-row tw-items-center"
        style="padding: 0.5rem; width: 450px"
        v-if="propType === 'warning'"
    >
      <div class="bg-yellow6 radius12px" style="padding: 0.4rem">
        <div class="bg-white" style="border-radius: 1.5rem; padding: 0.1rem" @click="doButton('close')">
          <Icon class="icon__style__large yellow6" icon="heroicons-outline:exclamation"/>
        </div>
      </div>
      <div class="tw-flex tw-flex-col tw-w-full">
        <label class="yellow7 tw-ml-4">{{propData}}</label>
      </div>
      <div class="tw-cursor-pointer" style="padding: 0.4rem">
        <Icon class="medium18 tw-text-yellow6 hover:tw-text-yellow8 tw-transition tw-ease-in tw-delay-20" icon="heroicons-outline:x"/>
      </div>
    </div>
    <!-- error -->
    <div
        class="tw-bg-red1 tw-border-red3 tw-opacity-95 hover:tw-opacity-100 tw-transition tw-ease-in tw-delay-20 tw-border radius12px tw-flex tw-flex-row tw-items-center"
        style="padding: 0.5rem; width: 450px"
        v-if="propType === 'error'"
    >
      <div class="bg-red6 radius12px" style="padding: 0.4rem">
        <div class="bg-white" style="border-radius: 1.5rem; padding: 0.1rem">
          <Icon class="icon__style__large red6" icon="heroicons-outline:exclamation-circle"/>
        </div>
      </div>
      <div class="tw-flex tw-flex-col tw-w-full">
        <label class="red7 tw-ml-4">{{propData}}</label>
      </div>
      <div class="tw-cursor-pointer" style="padding: 0.4rem" @click="doButton('close')">
        <Icon class="medium18 tw-text-red6 hover:tw-text-red8 tw-transition tw-ease-in tw-delay-20" icon="heroicons-outline:x"/>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue2'
export default {
  name: "BaseAlertFormBuilder",
  emits: ['callbackClose','callbackTimer'],
  components: {
    Icon
  },
  props: {
    propType: String,
    propData: String
  },
  methods:{
    doButton(nameButton){
      if(nameButton === 'close'){
        this.$emit('callbackClose', false)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.icon__style__large{
  font-size: 24px;
}
.theme__badge{
  position: fixed;
  top: 100px;
  right: 50px;
}
</style>