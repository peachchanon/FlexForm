﻿<template>
  <div>
    <v-chart class="chart" :option="option" autoresize/>
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
    VChart,
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
      let xAxisData = [];
      let data1 = [];
      let data2 = [];
      let data3 = [];
      let data4 = [];
      for (let i = 0; i < 10; i++) {
        xAxisData.push('Class' + i);
        data1.push(+(Math.random() * 2).toFixed(2));
        data2.push(+(Math.random() * 5).toFixed(2));
        data3.push(+(Math.random() + 0.3).toFixed(2));
        data4.push(+Math.random().toFixed(2));
      }
      let emphasisStyle = {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0,0,0,0.3)'
        }
      };
      this.option =
          {
            title: {
              text: this.title,
              right: 'center'
            },
            legend: {
              data: ['bar', 'bar2', 'bar3', 'bar4'],
              left: '10%'
            },
            brush: {
              toolbox: ['rect', 'polygon', 'lineX', 'lineY', 'keep', 'clear'],
              xAxisIndex: 0
            },
            toolbox: {
              show: true,
              orient: 'vertical',
              left: 'right',
              top: 'center',
              feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: true },
                saveAsImage: { show: true },
              }
            },
            tooltip: {},
            xAxis: {
              data: xAxisData,
              name: 'X Axis',
              axisLine: { onZero: true },
              splitLine: { show: false },
              splitArea: { show: false }
            },
            yAxis: {},
            grid: {
              bottom: 100
            },
            series: [
              {
                name: 'bar',
                type: 'bar',
                stack: 'one',
                emphasis: emphasisStyle,
                data: data1
              },
              {
                name: 'bar2',
                type: 'bar',
                stack: 'one',
                emphasis: emphasisStyle,
                data: data2
              },
              {
                name: 'bar3',
                type: 'bar',
                stack: 'two',
                emphasis: emphasisStyle,
                data: data3
              },
              {
                name: 'bar4',
                type: 'bar',
                stack: 'two',
                emphasis: emphasisStyle,
                data: data4
              }
            ]
          }
      let myChart 
      myChart.on('brushSelected', function (params) {
        let brushed = [];
        let brushComponent = params.batch[0];
        for (var sIdx = 0; sIdx < brushComponent.selected.length; sIdx++) {
          var rawIndices = brushComponent.selected[sIdx].dataIndex;
          brushed.push('[Series ' + sIdx + '] ' + rawIndices.join(', '));
        }
        myChart.setOption({
          title: {
            backgroundColor: '#333',
            text: 'SELECTED DATA INDICES: \n' + brushed.join('\n'),
            bottom: 0,
            right: '10%',
            width: 100,
            textStyle: {
              fontSize: 12,
              color: '#fff'
            }
          }
        });
      });
     }
  }
}
</script>

<style lang="scss" scoped>
.chart {
  height: 100vh;
}
</style>