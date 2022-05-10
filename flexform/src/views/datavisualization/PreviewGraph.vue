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
            :title="ChangeGraphName"
            chartstyle="chart"
        >
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
import {mapActions, mapGetters} from "vuex";
// import dayjs from 'dayjs' npm install dayjs --save
// import _ from 'lodash'; npm install lodash --save
// import axios from "axios";
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
    title: String,
    dataset: Array
  },
  data(){
    return{
      GraphName:'',
      StateShowContentForWindowSize: true,
      GraphData: [],
      GraphData1: []
    }
  },
  watch:{
    windowResize (){
      this.StateShowContentForWindowSize = window.innerWidth >= 768
    }
  },
  computed: {
    ...mapGetters(['windowResize']),
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
  async mounted () {
    window.onresize = () => {
      this.flapWindowResize()
    }
    this.StateShowContentForWindowSize = window.innerWidth >= 768
    // axios.get('http://localhost:4000/api/Flexform/')
    //     .then(response => {
    //       if(response.status===200 && response.data) {
    //            this.GraphData = response.data
    //        if(this.GraphTitle === 'Graph1'){
    //          if(this.GraphData.UseTemplate === true){
    //            const last7 = dayjs().subtract(7, 'day')     // เอาข้อมูลวันที่ย้อนหลัง 7 วันจากวันนี้
    //            const data
    //            const condition = data => {
    //              return dayjs(data.FormCreatedTimestamp.toISOString()) > last7
    //            }     
    //            const filterdata = this.GraphData.filter(condition) // filter condition 7 วัน
    //            console.log(filterdata.length) // นับจำนวนใน array ว่ามีกี่ ticket
    //          }
    //          }
    //        }
    // else if(this.GraphTitle === 'Graph2'){
    //         if(this.GraphData.UseTemplate === true){
    //          const last7 =dayjs().subtract(7, 'day')
    // const filtered = data.filter(newdata => dayjs(newdata.date) > last7)
    //console.log(filtered)
//     let graph2 = _(filtered).groupBy(newfiltered => newfiltered.type).map((value,key) => ({type: key, id: value})).value();
//     console.log(graph2)
        //console.log(graph2[0].id[0].date)
        //console.log(graph2[0].id.length)
        //console.log(graph2[1].id.length)
//     let obj =[]
//     let k =0;
//     for(let i =0; i <graph2.length; i++){
//       for(let j =0; j < graph2[i].id.length; j++){
//         obj[k] = graph2[i].id[j]
//         // console.log(obj[k]) 
//         k++
//       }
//     }
//     console.log(obj)
    //        }
    // }
    //        else if(this.GraphTitle === 'Graph3'){
    //        if(this.GraphData.UseTemplate === true){
    //          
    //        }
    // }
    // else if(this.GraphTitle === 'Graph4'){
    //  if(this.GraphData.UseTemplate === true){
    //          
    //        }
    // }
    // else if(this.GraphTitle === 'Graph5'){
    //  if(this.GraphData.UseTemplate === true){
    //          
    //        }
    // }
    // else if(this.GraphTitle === 'Graph6'){
    //if(this.GraphData.UseTemplate === true){
    //          
    //        }
    // }
    // else if(this.GraphTitle === 'Graph7'){
    //if(this.GraphData.UseTemplate === true){
    //          
    //        }
    // }
    // else if(this.GraphTitle === 'Graph8'){
    //if(this.GraphData.UseTemplate === true){
    //          
    //        }
    // }
    // else if(this.GraphTitle === 'Graph9'){
    //if(this.GraphData.UseTemplate === true){
    //          
    //        }
    // }
    // else{
    //        if(this.GraphData.UseTemplate === true){
    //          
    //        }
    // }
    //   }
    // })
    // .catch(error => {
    //   // this.errors.push(error)
    //   console.log(error)
    // })
  },
  methods: {
    ...mapActions(['flapWindowResize']),
  }
}
</script>

<style lang="scss" scoped>

</style>