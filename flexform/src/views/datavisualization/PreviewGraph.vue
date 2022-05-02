<template>
  <div class="bg-grey1 tw-h-full sm:tw-p-2">
    <div class="box bg-white tw-h-full">
      <div v-if="GraphTypes === 'Bar brush'">
        <BarBrush
            :title="ChangeGraphName">
        </BarBrush>
      </div>
      <div v-if="GraphTypes === 'Bar label rotation'">
        <bar-label-rotation
            :title="ChangeGraphName">
        </bar-label-rotation>
      </div>
      <div v-if="GraphTypes === 'Bar race'">
        <bar-race
            :title="ChangeGraphName">
        </bar-race>
      </div>
      <div v-if="GraphTypes === 'Bar with background'">
        <bar-with-background
            :title="ChangeGraphName">
        </bar-with-background>
      </div>
      <div v-if="GraphTypes === 'Bar y-category'">
        <bar-y-category
            :title="ChangeGraphName">
        </bar-y-category>
      </div>
      <div v-if="GraphTypes === 'Basic bar chart'">
        <basic-bar-chart
            :title="ChangeGraphName">
        </basic-bar-chart>
      </div>
      <div v-if="GraphTypes === 'Basic line chart'">
        <basic-line-chart
            :title="ChangeGraphName">
        </basic-line-chart>
      </div>
      <div v-if="GraphTypes === 'Basic pie chart'">
        <basic-pie-chart
            :title="ChangeGraphName">
        </basic-pie-chart>
      </div>
      <div v-if="GraphTypes === 'Customized pie chart'">
        <customized-pie-chart
            :title="ChangeGraphName">
        </customized-pie-chart>
      </div>
      <div v-if="GraphTypes === 'Doughnut chart'">
        <doughnut-chart
            :title="ChangeGraphName">
        </doughnut-chart>
      </div>
      <div v-if="GraphTypes === 'Line AQI chart'">
        <LineAQIChart
            :title="ChangeGraphName">
        </LineAQIChart>
      </div>
      <div v-if="GraphTypes === 'Multiple line graph'">
        <multiple-line-graph
            :title="ChangeGraphName"
        ></multiple-line-graph>
      </div>
      <div v-if="GraphTypes === 'Nightingale chart'">
        <nightingale-chart
            :title="ChangeGraphName">
        </nightingale-chart>
      </div>
      <div v-if="GraphTypes === 'Series layout bar chart'">
        <series-layout-bar-chart
            :title="ChangeGraphName">
        </series-layout-bar-chart>
      </div>
      <div v-if="GraphTypes === 'Share dataset chart'">
        <share-dataset
            :title="ChangeGraphName">
        </share-dataset>
      </div>
      <div v-if="GraphTypes === 'Stacked area chart'">
        <stackedareachart
            :title="ChangeGraphName">
        </stackedareachart>
      </div>
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
      else if(this.GraphTitle === 'Graph2'){
        return 'จำนวน ticket แต่ละประเภทที่ถูกสร้างขึ้นรายสัปดาห์'
      }
      else if(this.GraphTitle === 'Graph3'){
        return 'จำนวน ticket แต่ละประเภทที่ถูกสร้างขึ้นรายเดือน'
      }
      else if(this.GraphTitle === 'Graph4'){
        return 'จำนวนครั้งที่เกิด ticket ของแต่ละสถานที่'
      }
      else if(this.GraphTitle === 'Graph5'){
        return 'จำนวน ticket ที่เกิดขึ้นของแต่ละบริษัท'
      }
      else if(this.GraphTitle === 'Graph6'){
        return 'ระยะเวลาเฉลี่ยในการจัดการกับ ticket แต่ละประเภท'
      }
      else if(this.GraphTitle === 'Graph7'){
        return 'จำนวน ticket ที่แต่ละแผนกได้รับ'
      }
      else if(this.GraphTitle === 'Graph8'){
        return 'จำนวน urgent ticket ที่แต่ละแผนกได้รับ'
      }
      else if(this.GraphTitle === 'Graph9'){
        return 'ช่วงเวลาที่มีการเปิด ticket'
      }
      else if(this.GraphTitle === 'Graph10'){
        return 'สถานะของ Ticket รายเดือน'
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