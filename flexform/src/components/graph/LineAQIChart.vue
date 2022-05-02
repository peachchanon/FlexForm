<template>
  <div>
    <v-chart class="chart" :option="option" />
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
  GridComponent,
  DataZoomSliderComponent,
  DataZoomInsideComponent,
  VisualMapComponent
} from "echarts/components";
use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent,
  DataZoomSliderComponent,
  DataZoomInsideComponent,
  VisualMapComponent
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
      option :{}
    }
  },
  mounted() {
    this.initialEcharts()
  },
  methods: {
    initialEcharts() {
      let dataX = [112, 113, 114, 115, 116, 117, 118, 119, 120] // x axis
      this.option = {
        title: {
          text: this.title,
          left: '1%'
        },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '5%',
          right: '15%',
          bottom: '10%'
        },
        xAxis: {
          data: dataX
        },
        yAxis: {},
        toolbox: {
          right: 10,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          }
        },
        dataZoom: [
          {
            startValue: '2014-06-01'
          },
          {
            type: 'inside'
          }
        ],
        visualMap: {
          top: 50,
          right: 10,
          pieces: [
            {
              gt: 0,
              lte: 50,
              color: '#93CE07'
            },
            {
              gt: 50,
              lte: 100,
              color: '#FBDB0F'
            },
            {
              gt: 100,
              lte: 150,
              color: '#FC7D02'
            },
            {
              gt: 150,
              lte: 200,
              color: '#FD0100'
            },
            {
              gt: 200,
              lte: 300,
              color: '#AA069F'
            },
            {
              gt: 300,
              color: '#AC3B2A'
            }
          ],
          outOfRange: {
            color: '#999'
          }
        },
        series: {
          name: 'Beijing AQI',
          type: 'line',
          data: [66, 77, 88, 99, 0, 999, 786, 33], //่ค่าข้อมูล
          markLine: {
            silent: true,
            lineStyle: {
              color: '#333'
            },
            data: [
              {
                yAxis: 50
              },
              {
                yAxis: 100
              },
              {
                yAxis: 150
              },
              {
                yAxis: 200
              },
              {
                yAxis: 300
              }
            ]
          }
        }
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