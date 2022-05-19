<template>
  <div>
    <v-chart class="chart" :class="[chartstyle]" :option="option" autoresize/>
  </div>
</template>

<script>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
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
  PieChart,
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
  props: { // prop รับค่าจากข้างนอกมาสร้างกราฟ
    title:String,
    chartstyle: String,
    // value: {
    //   type: Array,
    //   required: true
    // },
    dataset: {
      type: Array,
      require: true
    },
  },
  data() {
    return {
      option: {}
    }
  },
  watch:{
    dataset(){
      this.initialEcharts()
    }
  },
  computed:{
  },
  mounted() {
    this.initialEcharts()
    console.log("hello")
  },
  methods: {
    initialEcharts() {
      this.option = {
        title: {
          text: this.title,
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            mark: {show: true},
            saveAsImage: {show: true}
          }
        },
        series: [
          {
            name: this.title,
            type: 'pie',
            radius: '50%',
            data: this.dataset,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
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
.chartdashboard{
  width: 200px;
  height: 200px;
}
</style>