<template>
  <layout-sidebar-navbar page="dashboard">
    <template #content>
      <div class="bg-grey1 tw-h-full sm:tw-p-2">
        <div class="base-margin tw-flex tw-flex-row tw-items-center">
          <Icon class="semibold24 icon blue10" icon="heroicons-outline:home"/>
          <span class="semibold24 blue10 tw-pl-1">Dashboard</span>
        </div>
        <div class="md:tw-flex md:tw-flex-row tw-w-full">
          <!-- Form -->
          <div class="box bg-white md:tw-w-1/2">
            <div class="tw-flex tw-flex-row tw-items-center">
              <Icon class="semibold24 icon blue10" icon="heroicons-outline:folder"/>
              <span class="semibold24 blue10 tw-pl-1">Form</span>
            </div>
            <div class="lg:tw-flex lg:tw-flex-row tw-ml-6 tw-mt-6">
              <div class="lg:tw-w-1/4 lg:tw-flex lg:tw-flex-col">
                <span class="blue10" style="font-size: 76px">{{ FormCount + TicketCount}}</span>
              </div>
              <div class="tw-flex tw-flex-col tw-ml-8 tw-mt-6">
                <div class="blue6 semibold32">Forms</div>
                <div class="grey7 medium18">A Number of forms in FlexForm</div>
              </div>
            </div>
            <div class="lg:tw-flex lg:tw-flex-row tw-ml-6 tw-mt-6">
              <div class="lg:tw-w-1/4 lg:tw-flex lg:tw-flex-col">
                <span class="blue10" style="font-size: 76px">{{ TicketCount }}</span>
              </div>
              <div class="tw-flex tw-flex-col tw-ml-8 tw-mt-6">
                <span class="blue6 semibold32">Tickets</span>
                <span class="grey7 medium18">A Number of tickets in FlexForm</span>
              </div>
            </div>
          </div>
          <!-- Form Priority -->
          <div class="box bg-white md:tw-w-1/2">
            <div class="tw-flex tw-flex-row tw-items-center">
              <Icon class="semibold24 icon blue10" icon="heroicons-outline:document-report"/>
              <span class="semibold24 blue10 tw-pl-1">Ticket Priority</span>
            </div>
            <div class="tw-flex tw-flex-col tw-items-center">
              <doughnut-chart chartstyle="chartdashboard" :dataset="PiePriorityDataset"></doughnut-chart>
            </div>
          </div>
        </div>
        <div class="md:tw-flex md:tw-flex-row tw-w-full">
          <!-- Form Status -->
          <div class="box bg-white md:tw-w-1/2">
            <div class="tw-flex tw-flex-row tw-items-center">
              <Icon class="semibold24 icon blue10" icon="heroicons-outline:document-report"/>
              <span class="semibold24 blue10 tw-pl-1">Ticket Status</span>
            </div>
            <div class="tw-flex tw-flex-col tw-items-center">
              <basic-pie-chart chartstyle="chartdashboard" :dataset="PieStatusDataset"></basic-pie-chart>
            </div>
          </div>
          <!-- Form Active -->
          <div class="box bg-white md:tw-w-1/2">
            <div class="tw-flex tw-flex-row tw-items-center">
              <Icon class="semibold24 icon blue10" icon="heroicons-outline:document-report"/>
              <span class="semibold24 blue10 tw-pl-1">Ticket Area</span>
            </div>
            <div class="tw-flex tw-flex-col tw-items-center">
              <basic-pie-chart chartstyle="chartdashboard" :dataset="PieAreaDataset"></basic-pie-chart>
            </div>
          </div>
        </div>
      </div>
    </template>
  </layout-sidebar-navbar>
</template>

<script>
import { Icon } from '@iconify/vue2'
import LayoutSidebarNavbar from '@/layouts/LayoutSidebarNavbar'
import BasicPieChart from "@/components/graph/BasicPieChart";
import DoughnutChart from "@/components/graph/DoughnutChart";
import _ from "lodash";
import axios from "axios";
export default {
  name: 'Dashboard',
  components: {
    Icon,
    LayoutSidebarNavbar,
    BasicPieChart,
    DoughnutChart
  },
  data(){
    return {
      GraphData: [],
      AllFormData: [],
      priority: ['High','Medium','Low'],
      status: ['Open','Close','Finish','Update'],
      areas: ['Hardware Failure','Package Loss', 'Link Failure', 'Other'],
      PiePriorityDataset: [],
      PieStatusDataset: [],
      PieAreaDataset: [],
      TicketCount: 0,
      FormCount: 0
    }
  },
  mounted() {
    axios.get('http://localhost:4000/api/Flexform/TicketInput/AllTicketInput')
        .then(response => {
          if (response.status === 200 && response.data) {
            this.GraphData = response.data
            this.TicketCount = this.GraphData.filter((v,i,a)=>a.findLastIndex(v2=>(v2.ticketId === v.ticketId))===i).length
            
            //graph 1
            let graph1 = _(this.GraphData).groupBy(newfiltered => newfiltered.ticketId).map((key) => ({
              companyName: key[0].sections[0].components[0].componentValue[0]
            })).value();

            let mapGraph1 = _(graph1).groupBy(newfiltered => newfiltered.companyName).map((key) => ({
              value: key.length,
              name: Object.values(key[0]).toString()
            })).value();

            const priorityData = this.priority.map(key => {
              return {
                name: key,
                value: mapGraph1.map((obj) => {
                  if (obj.name === key) {
                    return obj.value;
                  } else {
                    return 0;
                  }
                }).reduce((partialSum, a) => partialSum + a, 0).toString()
              }
            })
            this.PiePriorityDataset = priorityData

            // graph 2
            let graph2 = _(this.GraphData).groupBy(newfiltered => newfiltered.ticketId).map((key) => ({
              status: key.filter((v,i,a)=>a.findLastIndex(v2=>(v2.ticketId === v.ticketId))===i)[0].sections[1].components[2].componentValue[0]
            })).value();
            
            let mapGraph2 = _(graph2).groupBy(newfiltered => newfiltered.status).map((key) => ({
              value: key.length,
              name: Object.values(key[0]).toString()
            })).value();

            const statusData = this.status.map(key => {
              return {
                name: key,
                value: mapGraph2.map((obj) => {
                  if(obj.name === key){
                    return obj.value;
                  }
                  else{
                    return 0;
                  }
                }).reduce((partialSum, a) => partialSum + a, 0).toString()
              }
            })
            this.PieStatusDataset = statusData
            
            // graph 3
            let graph3 = _(this.GraphData).groupBy(newfiltered => newfiltered.sections[0].components[5].componentValue[0]).map((value, key) => ({
              type: key,
              id: value.length
            })).value();

            const areaData = this.areas.map(key => {
              return {
                name: key,
                data: graph3.map((obj) => {
                  if(obj.type === key){
                    return obj.id;
                  }
                  else{
                    return 0;
                  }
                }).reduce((partialSum, a) => partialSum + a, 0).toString()
              }
            })
            
            const XData =  areaData.map((obj) => {
              return obj.name;
            });

            const YData =  areaData.map((obj) => {
              return obj.data;
            });
            
            const count = [0,1,2,3]
            const processedDataPie = count.map(key => {
              return {
                value: YData[key],
                name: XData[key]
              }
            })
            this.PieAreaDataset = processedDataPie
          }
        })
    axios.get('http://localhost:4000/api/Flexform/AllForm')
        .then(response => {
          if (response.status === 200 && response.data) {
            
            const condition = data => {
              return data.useTemplate === false
            }
            
            this.AllFormData = response.data.filter(condition) // filter condition 7 วัน
            this.FormCount = this.AllFormData.length
          }
        })
  },
  computed: {
 
  },
  methods: {
    buttonClick (e) {
      console.log(e)
    }
  }
}
</script>

<style scoped>

</style>
