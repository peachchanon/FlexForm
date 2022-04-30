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
    CustomizedPieChart
  },
  props: {
    GraphTypes : String
  },
}
</script>

<style scoped>

</style>