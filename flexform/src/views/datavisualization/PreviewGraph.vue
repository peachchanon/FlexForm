<template>
  <div>
    <div v-if="GraphTypes === 'Bar brush'">
      <BarBrush></BarBrush> 
    </div>
    <div v-if="GraphTypes === 'Stacked area chart'">
    <stackedareachart></stackedareachart>
    </div>
    <div v-if="GraphTypes === 'Basic line chart'">
      <basic-line-chart></basic-line-chart>
    </div>
  </div>
</template>

<script>
import Stackedareachart from '@/components/graph/StackedAreaChart'
import BarBrush from '@/components/graph/BarBrush'
import BasicLineChart from '@/components/graph/BasicLineChart'
export default {
  name: "PreviewGraph.vue",
  components: {
    Stackedareachart,
    BarBrush, // barbrush ยังแก้ไม่เสร็จ
    BasicLineChart
  },
  props: {
    GraphTypes : String
  },
}
</script>

<style scoped>

</style>