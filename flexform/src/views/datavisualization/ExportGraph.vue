<template>
  <div class="tw-w-full tw-h-full tw-flex tw-flex-row tw-justify-center md:tw-items-center tw-items-start bg-grey1">
    <div class="box__style radius12px bg-white base-shadow base-padding">
      <div class="tw-flex tw-flex-row tw-justify-between tw-mb-10">
        <div class="tw-flex tw-flex-row">
          <div class="tw-mt-2.5">
            <base-button-back></base-button-back>
          </div>
          <div class="tw-ml-2 tw-flex tw-flex-row tw-items-center tw-flex-wrap">
            <Icon class="icon blue10 tw-mr-1.5" icon="heroicons-outline:chart-pie"/>
            <span class="semibold24 blue10">Data Visualization</span>
          </div>
        </div>
        <div class="tw-mr-5 tw-mt-2">
          <base-button-download
              buttonID="buttonExport"
              buttonText="Export"
              buttonTextColor="white"
              buttonBgColor="bg-green5"
              dom="#invoice"
              name="myFilename.pdf"
          />
        </div>
      </div>
      <div v-if="printpdf === true" class="chartdiv tw-w-3/5 tw-m-auto">
        <v-chart class="chart" :option="option" />
      </div>
      <div v-if="printpdf === false" class="chartdiv tw-mx-20" id="invoice">
        <div class="semibold24 tw-text-center tw-mb-5">
          Graph Name
        </div>
        <v-chart class="chart" :option="option" />
      </div>
    </div>
  </div>
</template>

<script>
import BaseButtonBack from "@/components/BaseButtonBack"
import BaseButtonDownload from "@/components/BaseButtonDownload";
import {Icon} from "@iconify/vue2/dist/iconify";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
]);
export default {
  name: "ExportGraph",
  components: {
    Icon,
    BaseButtonBack,
    VChart,
    BaseButtonDownload
  },
  provide: {
    [THEME_KEY]: ""
  },
  data() {
    return {
      printpdf: false,
      option: {
        title: {
          text: "Traffic Sources",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: [
            "Direct",
            "Email",
            "Ad Networks",
            "Video Ads",
            "Search Engines"
          ]
        },
        series: [
          {
            name: "Traffic Sources",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "Direct" },
              { value: 310, name: "Email" },
              { value: 234, name: "Ad Networks" },
              { value: 135, name: "Video Ads" },
              { value: 1548, name: "Search Engines" }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      }
    };
  }
}
</script>

<style lang="scss" scoped>
.chart {
  height: 400px;
  //border-color: $blue10;
  //border-width: 2px;
  padding-top: 15px;
  //padding-left: 10px;
  width: 100%;
}
.chartdiv{
  height: auto;
  width: 60%;
}
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

<!--<template>-->
<!--  <v-chart class="chart" :option="option" />-->
<!--</template>-->

<!--<script>-->
<!--import { use } from "echarts/core";-->
<!--import { CanvasRenderer } from "echarts/renderers";-->
<!--import { PieChart } from "echarts/charts";-->
<!--import {-->
<!--  TitleComponent,-->
<!--  TooltipComponent,-->
<!--  LegendComponent-->
<!--} from "echarts/components";-->
<!--import VChart, { THEME_KEY } from "vue-echarts";-->

<!--use([-->
<!--  CanvasRenderer,-->
<!--  PieChart,-->
<!--  TitleComponent,-->
<!--  TooltipComponent,-->
<!--  LegendComponent-->
<!--]);-->

<!--export default {-->
<!--  name: "HelloWorld",-->
<!--  components: {-->
<!--    VChart-->
<!--  },-->
<!--  provide: {-->
<!--    [THEME_KEY]: "dark"-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      option: {-->
<!--        title: {-->
<!--          text: "Traffic Sources",-->
<!--          left: "center"-->
<!--        },-->
<!--        tooltip: {-->
<!--          trigger: "item",-->
<!--          formatter: "{a} <br/>{b} : {c} ({d}%)"-->
<!--        },-->
<!--        legend: {-->
<!--          orient: "vertical",-->
<!--          left: "left",-->
<!--          data: [-->
<!--            "Direct",-->
<!--            "Email",-->
<!--            "Ad Networks",-->
<!--            "Video Ads",-->
<!--            "Search Engines"-->
<!--          ]-->
<!--        },-->
<!--        series: [-->
<!--          {-->
<!--            name: "Traffic Sources",-->
<!--            type: "pie",-->
<!--            radius: "55%",-->
<!--            center: ["50%", "60%"],-->
<!--            data: [-->
<!--              { value: 335, name: "Direct" },-->
<!--              { value: 310, name: "Email" },-->
<!--              { value: 234, name: "Ad Networks" },-->
<!--              { value: 135, name: "Video Ads" },-->
<!--              { value: 1548, name: "Search Engines" }-->
<!--            ],-->
<!--            emphasis: {-->
<!--              itemStyle: {-->
<!--                shadowBlur: 10,-->
<!--                shadowOffsetX: 0,-->
<!--                shadowColor: "rgba(0, 0, 0, 0.5)"-->
<!--              }-->
<!--            }-->
<!--          }-->
<!--        ]-->
<!--      }-->
<!--    };-->
<!--  }-->
<!--};-->
<!--</script>-->

<!--<style scoped>-->
<!--.chart {-->
<!--  height: 400px;-->
<!--}-->
<!--</style>-->