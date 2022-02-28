<template>
  <div class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-between tw-my-3" style="max-width: 960px;">
    <div class="medium16 blue10">
      {{PropSectionName}}
    </div>
    <div class="tw-flex tw-flex-row">
      <div class="tw-mx-2 blue10 hover:tw-text-blue5 tw-cursor-pointer tw-transition tw-ease-in tw-flex tw-flex-row">
        <Icon class="icon__style__large tw-mr-2" icon="bi:input-cursor"/>
        <span class="medium16" v-if="StateShowContentForWindowSize">Rename</span>
      </div>
      <div class="tw-mx-2 blue10 hover:tw-text-blue5 tw-cursor-pointer tw-transition tw-ease-in tw-flex tw-flex-row">
        <Icon class="icon__style__large tw-mr-2" icon="heroicons-outline:cursor-click"/>
        <span class="medium16" v-if="StateShowContentForWindowSize">Move</span>
      </div>
      <div class="tw-mx-2 blue10 hover:tw-text-blue5 tw-cursor-pointer tw-transition tw-ease-in tw-flex tw-flex-row">
        <Icon class="icon__style__large tw-mr-2" icon="ion:duplicate-outline"/>
        <span class="medium16" v-if="StateShowContentForWindowSize">Duplicate</span>
      </div>
      <div class="tw-mx-2 red5 hover:tw-text-red4 tw-cursor-pointer tw-transition tw-ease-in tw-flex tw-flex-row">
        <Icon class="icon__style__large tw-mr-2" icon="heroicons-outline:trash"/>
        <span class="medium16" v-if="StateShowContentForWindowSize">Delete</span>
      </div>
      <div class="tw-mx-2 blue10 hover:tw-text-blue5 tw-cursor-pointer tw-transition tw-ease-in tw-flex tw-flex-row">
        <Icon class="icon__style__large tw-mr-2" icon="heroicons-outline:document-add"/>
        <span class="medium16" v-if="StateShowContentForWindowSize">Add Sections</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue2'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "BaseNavigationToolsSectionFormBuilder",
  components: {
    Icon
  },
  data() {
    return {
      StateShowContentForWindowSize: true,
    }
  },
  props: {
    PropSectionName: String
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
    ...mapActions(['flapWindowResize'])
  }
}
</script>

<style lang="scss" scoped>
.icon__style__large{
  font-size: 24px;
}
</style>