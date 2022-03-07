<template>
  <div class="button-white tw-flex tw-flex-row tw-items-center medium16" @click="buttonClicked">
    <Icon class="icon semibold24" :icon="buttonIcon"/>
    <span class="tw-mt-0.5 tw-ml-3 tw-mr-1" v-if="StateShowContentForWindowSize">{{buttonText}}</span>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue2'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "BaseButtonBlue",
  components: {
    Icon
  },
  data() {
    return {
      StateShowContentForWindowSize: true
    }
  },
  props: {
    buttonID: String,
    buttonText: String,
    buttonIcon: String,
    callback: Function
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
    buttonClicked () {
      this.callback(this.buttonID)
    }
  }
}
</script>

<style lang="scss" scoped>
.button-white {
  color: $blue5;
  padding: 0.75rem;
  transition: all .1s ease-in;
  border-radius: 12px;
  margin: 0.25rem 0;
  cursor: pointer;
  border-width: 1px;
  border-color: $blue5;
  background-color: white;
  box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.1);
  &:hover{
    color: $blue3;
    border-color: $blue3;
  }
}
</style>