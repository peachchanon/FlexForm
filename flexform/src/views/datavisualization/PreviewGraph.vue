<template>
  <div>
    <div v-if="GraphTypes === 'Bar brush'">
      <BarBrush></BarBrush>
    </div>
    <div v-if="GraphTypes === 'Bar label rotation'">
      <bar-label-rotation></bar-label-rotation>
    </div>
    <div v-if="GraphTypes === 'Bar race'">
      <bar-race></bar-race>
    </div>
    <div v-if="GraphTypes === 'Bar with background'">
      <bar-with-background></bar-with-background>
    </div>
    <div v-if="GraphTypes === 'Bar y-category'">
      <bar-y-category></bar-y-category>
    </div>
    <div v-if="GraphTypes === 'Basic bar chart'">
      <basic-bar-chart></basic-bar-chart>
    </div>
    <div v-if="GraphTypes === 'Basic line chart'">
      <basic-line-chart></basic-line-chart>
    </div>
    <div v-if="GraphTypes === 'Basic pie chart'">
      <basic-pie-chart></basic-pie-chart>
    </div>
    <div v-if="GraphTypes === 'Customized pie chart'">
      <customized-pie-chart></customized-pie-chart>
    </div>
    <div v-if="GraphTypes === 'Doughnut chart'">
      <doughnut-chart></doughnut-chart>
    </div>
    <div v-if="GraphTypes === 'Line AQI chart'">
      <LineAQIChart></LineAQIChart>
    </div>
    <div v-if="GraphTypes === 'Multiple line graph'">
      <multiple-line-graph
          :title="ChangeGraphName"
      ></multiple-line-graph>
      {{ChangeGraphName}}
    </div>
    <div v-if="GraphTypes === 'Nightingale chart'">
      <nightingale-chart></nightingale-chart>
    </div>
    <div v-if="GraphTypes === 'Series layout bar chart'">
      <series-layout-bar-chart></series-layout-bar-chart>
    </div>
    <div v-if="GraphTypes === 'Share dataset chart'">
      <share-dataset></share-dataset>
    </div>
    <div v-if="GraphTypes === 'Stacked area chart'">
      <stackedareachart></stackedareachart>
    </div>
  </div>
</template>

<script>
import Stackedareachart from '@/components/graph/StackedAreaChart'
import BarBrush from '@/components/graph/BarBrush'
import BarLabelRotation from "@/components/graph/BarLabelRotation";
import BarRace from "@/components/graph/BarRace";
import BasicLineChart from '@/components/graph/BasicLineChart'
import BarWithBackground from "@/components/graph/BarWithBackground";
import BarYCategory from "@/components/graph/BarYCategory";
import BasicBarChart from "@/components/graph/BasicBarChart";
import BasicPieChart from "@/components/graph/BasicPieChart";
import CustomizedPieChart from "@/components/graph/CustomizedPieChart";
import DoughnutChart from "@/components/graph/DoughnutChart";
import LineAQIChart from "@/components/graph/LineAQIChart";
import MultipleLineGraph from "@/components/graph/MultipleLineGraph";
import NightingaleChart from "@/components/graph/NightingaleChart";
import SeriesLayoutBarChart from "@/components/graph/SeriesLayoutBarChart";
import ShareDataset from "@/components/graph/ShareDataset";
export default {
  name: "PreviewGraph.vue",
  components: {
    Stackedareachart,
    BarBrush, // barbrush ยังแก้ไม่เสร็จ
    BasicLineChart,
    BarLabelRotation,
    BarRace,
    BarWithBackground,
    BarYCategory,
    BasicBarChart,
    BasicPieChart,
    CustomizedPieChart,
    DoughnutChart,
    LineAQIChart,
    MultipleLineGraph,
    NightingaleChart,
    SeriesLayoutBarChart,
    ShareDataset
  },
  props: {
    GraphTypes : String,
    GraphTitle : String,
    title: String
  },
  data(){
    return{
      GraphName:''
    }
  },
  computed: {
    ChangeGraphName() {
      if(this.GraphTitle === 'Graph1'){
         return 'จำนวน ticket ที่ถูกสร้างขึ้นภายใน 1 สัปดาห์'
      } 
      else{
        return ''
      }
    },
  },
  async mounted(){
    console.log(this.ChangeGraphName)
  }

}
</script>

<style scoped>

</style>