<template>
  <div class="button-white tw-flex tw-flex-row tw-items-center medium16" @click="buttonClicked">
    <Icon class="icon semibold24" :icon="buttonIcon"/>
    <span class="tw-mt-0.5 tw-ml-3 tw-mr-1" v-if="showContentForWindowSize">{{buttonText}}</span>
  </div>
</template>

<script>
import {Icon} from "@iconify/vue2/dist/iconify";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "BaseButtonDelete",
  components: {
    Icon
  },
  data() {
    return {
      showContentForWindowSize: true
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
    buttonClicked () {
      this.callback(this.buttonID)
    }
  }
}
</script>

<style lang="scss" scoped>
.button-white {
  color: $red5;
  padding: 0.75rem;
  transition: all .1s ease-in;
  border-radius: 12px;
  margin: 0.25rem 0;
  cursor: pointer;
  &:hover{
    color: $red4;
    background-color: white;
  }
}
</style>