<template>
  <div>
    <v-chart class="chart" :option="option" />
  </div>
</template>

<script>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { BarChart } from "echarts/charts";
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
  BarChart,
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
  mounted() {
    this.initialEcharts()
  },
  methods: {
    initialEcharts() {
      let data = [1,2,3,4,10];
      let myChart
      this.option = {
        title: {
          text: this.title
        },
        xAxis: {
          max: '10'
        },
        yAxis: {
          type: 'category',
          data: ['A', 'B', 'C', 'D', 'E'],
          inverse: true, // เรียงลำดับ
          animationDuration: 3000,
          animationDurationUpdate: 300,
          max: 4 // only the largest 3 bars will be displayed
        },
        series: [
          {
            realtimeSort: true,
            name: 'data',
            type: 'bar',
            data: data,
            label: {
              show: true,
              position: 'right',
              valueAnimation: true
            }
          }
        ],
        legend: {
          show: true
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
        animationDuration: 1000,
        animationDurationUpdate: 3000,
        animationEasing: 'linear',
        animationEasingUpdate: 'linear'
      };
      function run() {
        for (var i = 0; i < data.length; ++i) {
          data[i]= data[i]*1;
        }
        myChart.setOption({
          series: [
            {
              type: 'bar',
              data
            }
          ]
        });
      }
      setTimeout(function () {
        run();
      }, 0);
      setInterval(function () {
        run();
      }, 3000);
    }
  }
}
</script>

<style lang="scss" scoped>
.chart {
  height: 100vh;
}
</style>