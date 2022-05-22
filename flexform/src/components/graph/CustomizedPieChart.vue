<template>
  <div>
    <v-chart :class="[chartstyle]" :option="option" autoresize/>
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
    value: {
      type: Number,
      required: true,
      default: 90,
    },
    dataset: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      option: {},
    }
  },
  watch:{
    windowResize (){
      this.StateShowContentForWindowSize = window.innerWidth >= 768
    }
  },
  mounted() {
    this.initialEcharts()
  },
  methods: {
    initialEcharts() {
      this.option = {
        backgroundColor: '#fff',
        title: {
          text: this.title,
          left: 'center',
          top: 20,
          textStyle: {
            color: '#000'
          }
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            mark: { show: true },
            saveAsImage: { show: true }
          }
        },
        tooltip: {
          trigger: 'item'
        },
        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '65%',
            center: ['50%', '50%'],
            data: [
              { value: 335, name: 'Direct' },
              { value: 310, name: 'Email' },
              { value: 274, name: 'Union Ads' },
              { value: 235, name: 'Video Ads' },
              { value: 400, name: 'Search Engine' }
            ].sort(function (a, b) {
              return a.value - b.value;
            }),
            roseType: 'radius',
            label: {
              color: '#000'
            },
            labelLine: {
              lineStyle: {
                color: '#000'
              },
              smooth: 0.2,
              length: 10,
              length2: 20
            },
            itemStyle: {
              color: '#c23531',
              shadowBlur: 15,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            },
            animationType: 'scale',
            animationEasing: 'elasticOut'
          }
        ]
      };
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