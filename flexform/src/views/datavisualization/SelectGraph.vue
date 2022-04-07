<template>
  <div class="tw-w-full tw-h-full tw-flex tw-flex-row tw-justify-center md:tw-items-center tw-items-start bg-grey1">
    <div class="box__style radius12px bg-white base-shadow base-padding tw-w-full">
      <div class="tw-flex tw-flex-row">
        <base-button-back></base-button-back>
        <div class="tw-ml-2 tw-flex tw-flex-row tw-items-center tw-flex-wrap">
          <Icon class="semibold24 icon blue10 tw-mr-1.5" icon="heroicons-outline:chart-pie"/>
          <span class="semibold24 blue10">Data Visualization</span>
        </div>
      </div>
      <div class="tw-w-full">
        <div class="tw-flex tw-flex-col tw-items-center">
          Progress bar
        </div>
        <div class="tw-flex tw-flex-col md:tw-flex-row tw-border-2 radius10px">
          <div class="left__layout tw-border-0 md:tw-border-r-2 tw-p-2">
            <div class="tw-flex tw-flex-row md:tw-flex-col">
              <div class="button__left__layout tw-py-1 md:tw-py-2 tw-px-2">
                <span class="medium16 blue10 hover:tw-text-blue5 tw-cursor-pointer">All Chart</span>
              </div>
              <div class="button__left__layout tw-py-1 md:tw-py-2 tw-px-2">
                <span class="medium16 blue10 hover:tw-text-blue5 tw-cursor-pointer">Line</span>
              </div>
              <div class="button__left__layout tw-py-1 md:tw-py-2 tw-px-2">
                <span class="medium16 blue10 hover:tw-text-blue5 tw-cursor-pointer">Bar</span>
              </div>
            </div>
          </div>
          <div class="right__layout tw-p-2">
            <div class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center">
              <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                <Icon class="semibold24 icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                <span class="medium16 blue10 tw-m-1">Stacked Area Chart</span>
              </div>
              <div class="tw-flex tw-flex-row">
                <base-button
                    buttonID="buttonPreview"
                    buttonText="Preview"
                    buttonTextColor="blue10"
                    buttonIconLeft="heroicons-outline:eye"
                    buttonBorderColor="border-white"
                    buttonBgColor="bg-white"
                ></base-button>
                <base-button
                    buttonID="buttonExport"
                    buttonText="Export"
                    buttonTextColor="white"
                    buttonBorderColor="border-green5"
                    buttonBgColor="bg-green5"
                ></base-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue2/dist/iconify"
import { mapActions, mapGetters} from "vuex"
import BaseButtonBack from "@/components/BaseButtonBack"
import BaseButton from "@/components/BaseButton"

export default {
  name: "SelectGraph.vue",
  components: {
    Icon,
    BaseButtonBack,
    BaseButton
  },
  data() {
    return {
      ShowContent: true,
    }
  },
  watch: {
    windowResize () {
      this.ShowContent = window.innerWidth >= 1440
    }
  },
  computed: {
    ...mapGetters(['windowResize'])
  },
  async mounted () {
    window.onresize = () => {
      this.flapWindowResize()
    }
    this.ShowContent = window.innerWidth >= 1440
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
.icon{
  font-size: 2rem;
}
@media only screen and (max-width: 767px){
  .box__style {
    height: 100%;
    max-height: 736px;
  }
}
@media only screen and (min-width: 768px) {
  .box__style {
    width: 100%;
    max-width: 1024px;
    height: 100%;
    max-height: 560px;
    .left__layout {
      width: 100%;
      max-width: 150px;
    }
    .right__layout {
      width: 100%;
    }
  }
}
</style>