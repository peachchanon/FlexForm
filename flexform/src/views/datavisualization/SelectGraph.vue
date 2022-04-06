<template>
  <div class="tw-w-full tw-h-full tw-flex tw-flex-row tw-justify-center bg-grey1 base-padding">
    <div class="boxstyle bg-yellow4 tw-mt-7 tw-mb-7 tw-h-full" >
      <div class="tw-mt-7 tw-ml-3 tw-flex tw-flex-row tw-items-center">
        <base-button-back
            :callback="PreviousPage"></base-button-back>
        <Icon class="semibold24 icon blue10 tw-mr-1.5" icon="heroicons-outline:chart-pie"/>
        <span class="semibold24 blue10 tw-pl-1">Data Visualization</span>
      </div>
      <div class="step-wizard">
        <ul class="step-wizard-list">
          <li class="step-wizard-item">
            <span class="progress-count">1</span>
            <span class="progress-label">List</span>
          </li>
          <li class="step-wizard-item current-item">
            <span class="progress-count">2</span>
            <span class="progress-label">Build</span>
          </li>
          <li class="step-wizard-item">
            <span class="progress-count">3</span>
            <span class="progress-label">Export</span>
          </li>
        </ul>
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
.step-wizard {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 50px;
}
.step-wizard-list{
  color: $blue10;
  list-style-type: none;
  border-radius: 10px;
  display: flex;
  padding: 20px 10px;
  position: relative;
  z-index: 10;
}

.step-wizard-item{
  padding: 0 20px;
  flex-basis: 0;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  text-align: center;
  min-width: 170px;
  position: relative;
}
.step-wizard-item + .step-wizard-item:after{
  content: "";
  clear: both;
  position: absolute;
  left: 0;
  top: 19px;
  background: $blue5;
  width: 100%;
  height: 3px;
  transform: translateX(-50%);
  z-index: -10;
}
.progress-count{
  height: 40px;
  width:40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-weight: 600;
  margin: 0 auto;
  position: relative;
  z-index:10;
  color: transparent;
}
.progress-count:after{
  content: "";
  height: 40px;
  width: 40px;
  background: $blue5;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  z-index: -10;
}
.progress-count:before{
  content: "";
  height: 10px;
  width: 20px;
  border-left: 3px solid #fff;
  border-bottom: 3px solid #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -60%) rotate(-45deg);
  transform-origin: center center;
}
.progress-label{
  font-size: 14px;
  font-weight: 600;
  margin-top: 10px;
}
.current-item .progress-count:before,
.current-item ~ .step-wizard-item .progress-count:before{
  display: none;
}
.current-item ~ .step-wizard-item .progress-count:after{
  height:10px;
  width:10px;
}
.current-item ~ .step-wizard-item .progress-label{
  opacity: 0.5;
}
.current-item .progress-count:after{
  background: #fff;
  border: 2px solid $blue5;
}
.current-item .progress-count{
  color: $blue5;
}
</style>