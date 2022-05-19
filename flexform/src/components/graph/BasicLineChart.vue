<template>
  <div>
    <v-chart class="chart" :option="option" autoresize />
  </div>
</template>

<script>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import VChart from "vue-echarts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent
} from "echarts/components";
use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent
]);

export default {
  components: {
    VChart
  },
  // provide: {
  //   [THEME_KEY]: "dark"
  // },
  props: { // prop รับค่าจากข้างนอกมาสร้างกราฟ
    title:String,
    value: {
      type: Array,
      required: true,
    },
    dataset: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
       option :{}
    }
  },
  watch:{
    dataset(){
      this.initialEcharts()
    }
  },
  mounted() {
    this.initialEcharts()
  },
  methods: {
    initialEcharts() {
      this.option = {
        title: {
          text: this.title
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: true },
            saveAsImage: { show: true }
          }
        },
        xAxis: {
          type: 'category',
          data: this.dataset // this.data ที่จะเอามาพล็อต
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: this.value,
            type: 'line'
          }
        ]
      }
    }
 }
}
</script>

<style lang="scss" scoped>
.chart {
  height: 100vh;
}
</style>