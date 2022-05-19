<template>
  <div class="bg-grey1 tw-h-full sm:tw-p-2">
    <div class="box bg-white tw-h-full">
      <div v-if="GraphTypes === 'Bar brush'">
        <BarBrush
            :title="ChangeGraphName"
            :dataset="XData"
            :value="AreaData">
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
            :title="ChangeGraphName"
            :dataset="XData"
            :value="YData">
        </basic-bar-chart>
      </div>
      <div v-if="GraphTypes === 'Basic line chart'">
        <basic-line-chart
            :title="ChangeGraphName"
            :dataset="XData"
            :value="YData">
        </basic-line-chart>
      </div>
      <div v-if="GraphTypes === 'Basic pie chart'">
        <basic-pie-chart
            :title="ChangeGraphName"
            :dataset="PieDataset">
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
import dayjs from 'dayjs'; // npm install dayjs --save
import _ from 'lodash'; //npm install lodash --save
import axios from "axios";
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
    title: String
  },
  data(){
    return{
      GraphName:'',
      StateShowContentForWindowSize: true,
      GraphData: [],
      GraphData1: [],
      FinalData: [],
      filterData: [],
      XData: [],
      YData: [],
      AreaData: [],
      areas: ['Hardware Failure','Package Loss', 'Link Failure', 'Other'],
      departments: ['Department 1', 'Department 2', 'Department 3', 'Department 4'],
      priority: ['High','Medium','Low'],
      status: ['Open','Close','Finish','Update'],
      GraphTypes: '',
      GraphTitle: '',
      PieDataset: []
    }
  },
  watch:{
    windowResize (){
      this.StateShowContentForWindowSize = window.innerWidth >= 768
    },
    // FinalData: function (val){
    //   this.FinalData = val
    //   console.log("watch" + JSON.stringify(this.FinalData))
    // }
  },
  computed: {
    ...mapGetters(['windowResize']),
    // ChangeXData() {
    //   return this.XData
    // },
    // ChangeYData() {
    //   return this.YData
    // },
    // ChangePieData() {
    //   return this.PieDataset
    // },
    // ChangeAreaData(){
    //   return this.AreaData
    // },
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

    this.GraphTypes = localStorage.getItem('graphtype')
    this.GraphTitle = localStorage.getItem('graphtitle')

    axios.get('http://localhost:4000/api/Flexform/TicketInput/AllTicketInput')
        .then(response => {
          if (response.status === 200 && response.data) {
            this.GraphData = response.data
            console.log(this.GraphTitle)
            if (this.GraphTitle === 'Graph1') {
              const last7 = dayjs().subtract(7, 'day')     // เอาข้อมูลวันที่ย้อนหลัง 7 วันจากวันนี้
              const condition = data => {
                return dayjs(data.timestamp) > last7
              }
              this.filterData = this.GraphData.filter(condition) // filter condition 7 วัน

              const data = this.filterData.map((form) => {
                form.timestamp = dayjs(form.timestamp).format('DD/MM/YYYY')
                return form
              })
              this.filterData = data

              // y data basic bar
              const result = [...this.filterData.reduce((r, e) => {
                let k = `${e.timestamp}`;
                if (!r.has(k)) r.set(k, {...e, count: 1})
                else r.get(k).count++
                return r;
              }, new Map).values()]

              this.YData = result.map((obj) => {
                return obj.count;
              });

              // bar brush              
              const grouped = _.chain(this.filterData)
                  .groupBy(obj => obj.timestamp).mapValues(arr => {
                    return _.chain(arr)
                        .groupBy(obj => obj.sections[0].components[5].componentValue[0])
                        .mapValues(arr => arr.length)
                        .value()
                  })
                  .value()

              const processedData = Object.keys(grouped).map(key => {
                return {
                  timestamp: key,
                  data: grouped[key]
                }
              })

              this.FinalData = processedData
              console.log("pie "+JSON.stringify( this.FinalData))
              // x data: basic bar, bar brush
              this.XData = this.FinalData.map((obj) => {
                return obj.timestamp;
              });
              console.log("hello " + this.XData)

              // basic pie chart
              const processedDataPie = Object.keys(result).map(key => {
                return {
                  value: this.YData[key],
                  name: this.XData[key]
                }
              })
              this.PieDataset = processedDataPie
              // console.log("pie "+JSON.stringify(processedDataPie))

              const areaData = this.areas.map(key => {
                return {
                  name: key,
                  data: this.FinalData.map((obj) => {
                    return obj.data[key] ?? 0;
                  })
                }
              })

              // bar brush: color
              this.AreaData = areaData.map((obj) => {
                return obj.data;
              });

            } 
            else if (this.GraphTitle === 'Graph2') {
              const last7 = dayjs().subtract(7, 'day')     // เอาข้อมูลวันที่ย้อนหลัง 7 วันจากวันนี้
              const condition = data => {
                return dayjs(data.timestamp) > last7
              }
              this.filterData = this.GraphData.filter(condition) // filter condition 7 วัน

              const data = this.filterData.map((form) => {
                form.timestamp = dayjs(form.timestamp).format('DD/MM/YYYY')
                return form
              })
              this.filterData = data
              console.log(this.filterData)
              
              let graph2 = _(this.filterData).groupBy(newfiltered => newfiltered.sections[0].components[5].componentValue[0]).map((value, key) => ({
                type: key,
                id: value.length
              })).value();
              console.log(graph2)

              const areaData = this.areas.map(key => {
                return {
                  name: key,
                  data: graph2.map((obj) => {
                    if(obj.type === key){
                    return obj.id;
                    }
                    else{
                      return 0;
                    }
                  }).reduce((partialSum, a) => partialSum + a, 0).toString()
                }
              })

              console.log(areaData)

              this.XData =  areaData.map((obj) => {
                return obj.name;
              });
              console.log("hello " + this.XData)

              this.YData =  areaData.map((obj) => {
                return obj.data;
              });
              console.log("hello " + this.YData)
              
              // pie chart
              const count = [0,1,2,3]
              const processedDataPie = count.map(key => {
                return {
                  value: this.YData[key],
                  name: this.XData[key]
                }
              })
              this.PieDataset = processedDataPie
              console.log("pie "+JSON.stringify(processedDataPie))
            }
            else if(this.GraphTitle === 'Graph3') {
              //จำนวน ticket แต่ละประเภทที่ถูกสร้างขึ้นรายเดือน
              const last30 = dayjs().subtract(1, 'month')     // เอาข้อมูลวันที่ย้อนหลัง 1 เดือนจากวันนี้
              const condition = data => {
                return dayjs(data.timestamp) > last30
              }
              this.filterData = this.GraphData.filter(condition) // filter condition 30 วัน

              const data = this.filterData.map((form) => {
                form.timestamp = dayjs(form.timestamp).format('DD/MM/YYYY')
                return form
              })
              this.filterData = data
              console.log(this.filterData)

              let graph3 = _(this.filterData).groupBy(newfiltered => newfiltered.sections[0].components[5].componentValue[0]).map((value, key) => ({
                type: key,
                id: value.length
              })).value();
              console.log(graph3)

              const areaData = this.areas.map(key => {
                return {
                  name: key,
                  data: graph3.map((obj) => {
                    if (obj.type === key) {
                      return obj.id;
                    } else {
                      return 0;
                    }
                  }).reduce((partialSum, a) => partialSum + a, 0).toString()
                }
              })

              console.log(areaData)

              this.XData = areaData.map((obj) => {
                return obj.name;
              });
              console.log("hello " + this.XData)

              this.YData = areaData.map((obj) => {
                return obj.data;
              });
              console.log("hello " + this.YData)

              // pie chart
              const count = [0, 1, 2, 3]
              const processedDataPie = count.map(key => {
                return {
                  value: this.YData[key],
                  name: this.XData[key]
                }
              })
              this.PieDataset = processedDataPie
              console.log("pie " + JSON.stringify(processedDataPie))
            }
            else if(this.GraphTitle === 'Graph5'){
            //จำนวน ticket ที่เกิดขึ้นของแต่ละบริษัท
              let graph5 = _(this.GraphData).groupBy(newfiltered => newfiltered.ticketId).map((key) => ({
                companyName: key[0].sections[0].components[11].componentValue[0]
              })).value();
              console.log(graph5)
              
              let mapGraph5 = _(graph5).groupBy(newfiltered => newfiltered.companyName).map((key) => ({
                value: key.length,
                name: Object.values(key[0]).toString()
              })).value();
              console.log(mapGraph5)
              
              // bar and line chart
              this.XData = mapGraph5.map((obj) => {
                return obj.name;
              });

              this.YData = mapGraph5.map((obj) => {
                return obj.value;
              });
            }
            else if(this.GraphTitle === 'Graph7'){
            //จำนวน ticket ที่แต่ละแผนกได้รับ
              let graph7 = _(this.GraphData).groupBy(newfiltered => newfiltered.ticketId).map((key) => ({
                companyName: key[0].sections[0].components[13].componentValue[0]
              })).value();
              console.log(graph7)

              // pie chart
              let mapGraph7 = _(graph7).groupBy(newfiltered => newfiltered.companyName).map((key) => ({
                value: key.length,
                name: Object.values(key[0]).toString()
              })).value();
              console.log(mapGraph7)

              const departmentData = this.departments.map(key => {
                return {
                  name: key,
                  value: mapGraph7.map((obj) => {
                    if(obj.name === key){
                      return obj.value;
                    }
                    else{
                      return 0;
                    }
                  }).reduce((partialSum, a) => partialSum + a, 0).toString()
                }
              })
              console.log(departmentData)
              this.PieDataset = departmentData

              // bar and line chart
              this.XData = departmentData.map((obj) => {
                return obj.name;
              });

              this.YData = departmentData.map((obj) => {
                return obj.value;
              });
            }
            else if(this.GraphTitle === 'Graph8'){
            //จำนวน urgent ticket ที่แต่ละแผนกได้รับ
              let graph8 = _(this.GraphData).groupBy(newfiltered => newfiltered.ticketId).map((key) => ({
                companyName: key[0].sections[0].components[0].componentValue[0]
              })).value();
              console.log(graph8)

              // pie chart
              let mapGraph8 = _(graph8).groupBy(newfiltered => newfiltered.companyName).map((key) => ({
                value: key.length,
                name: Object.values(key[0]).toString()
              })).value();
              console.log(mapGraph8)

              const priorityData = this.priority.map(key => {
                return {
                  name: key,
                  value: mapGraph8.map((obj) => {
                    if(obj.name === key){
                      return obj.value;
                    }
                    else{
                      return 0;
                    }
                  }).reduce((partialSum, a) => partialSum + a, 0).toString()
                }
              })
              console.log(priorityData)
              this.PieDataset = priorityData

              // bar and line chart
              this.XData = priorityData.map((obj) => {
                return obj.name;
              });

              this.YData = priorityData.map((obj) => {
                return obj.value;
              });
            }
            else if(this.GraphTitle === 'Graph10'){
              // สถานะของ Ticket รายเดือน
              const last30 = dayjs().subtract(1, 'month')     // เอาข้อมูลวันที่ย้อนหลัง 1 เดือนจากวันนี้
              const condition = data => {
                return dayjs(data.timestamp) > last30
              }
              this.filterData = this.GraphData.filter(condition) // filter condition 30 วัน

              const data = this.filterData.map((form) => {
                form.timestamp = dayjs(form.timestamp).format('DD/MM/YYYY')
                return form
              })
              this.filterData = data
              console.log(this.filterData)
              
              let graph10 = _(this.GraphData).groupBy(newfiltered => newfiltered.ticketId).map((key) => ({
                status: key.filter((v,i,a)=>a.findLastIndex(v2=>(v2.ticketId === v.ticketId))===i)[0].sections[1].components[2].componentValue[0]
              })).value();
              console.log(graph10)
              
              // pie chart
              let mapGraph10 = _(graph10).groupBy(newfiltered => newfiltered.status).map((key) => ({
                value: key.length,
                name: Object.values(key[0]).toString()
              })).value();
              console.log(mapGraph10)

              const statusData = this.status.map(key => {
                return {
                  name: key,
                  value: mapGraph10.map((obj) => {
                    if(obj.name === key){
                      return obj.value;
                    }
                    else{
                      return 0;
                    }
                  }).reduce((partialSum, a) => partialSum + a, 0).toString()
                }
              })
              console.log(statusData)
              this.PieDataset = mapGraph10

              // bar and line chart
              this.XData = statusData.map((obj) => {
                return obj.name;
              });

              this.YData = statusData.map((obj) => {
                return obj.value;
              });
            }
          }
        })
    
    // else if(this.GraphTitle === 'Graph4'){
    //  จำนวนครั้งที่เกิด ticket ของแต่ละสถานที่
    // }
    // else if(this.GraphTitle === 'Graph6'){
    // }
    // else if(this.GraphTitle === 'Graph9'){
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