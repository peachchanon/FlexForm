<template>
  <div class="tw-w-full tw-h-full tw-flex tw-flex-row tw-justify-center bg-grey1 base-padding">
    <div class="boxstyle bg-yellow4 tw-mt-7 tw-mb-7 tw-h-full" >
      <div class="tw-mt-7 tw-ml-3 tw-flex tw-flex-row tw-items-center">
        <base-button-back
            :callback="PreviousPage"></base-button-back>
        <Icon class="semibold24 icon blue10 tw-mr-1.5" icon="heroicons-outline:chart-pie"/>
        <span class="semibold24 blue10 tw-pl-1">Data Visualization</span>
      </div>
      <div class="box2 tw-flex tw-flex-row tw-justify-center" style="min-height: 100%; ">
        <div class="cardleft bg-red5 base-shadow tw-mt-5 tw-w-1/5 ">
          <div>Hello ja</div>
        </div>
        <div class="cardright bg-blue5 base-shadow tw-mt-5 tw-w-8/12 ">
          <div>Hello ja2</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButtonBack from "@/components/BaseButtonBack";
import {Icon} from "@iconify/vue2/dist/iconify";
import {mapActions, mapGetters} from "vuex";
export default {
  name: "SelectGraph.vue",
  components: {
    Icon,
    BaseButtonBack,
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
    }
  },
  methods: {
    ...mapActions(['flapWindowResize']),
    PreviousPage() {
      this.$router.push('/DataVisualization')
    },
  }
}
</script>

<style lang="scss" scoped>
.boxstyle{
  border-radius: $radius10px;
  width: 90%; // my vertical -> top bottom
}
.cardleft{
  border-top-left-radius:$radius10px;
}
.cardright{
  border-top-right-radius:$radius10px;
}
</style>