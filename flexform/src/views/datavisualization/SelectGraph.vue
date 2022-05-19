<template>
  <div class="tw-w-full tw-h-full tw-flex tw-flex-row tw-justify-center md:tw-items-center tw-items-start bg-grey1">
    <div class="box__style radius12px bg-white base-shadow base-padding tw-w-full">
      <div class="tw-flex tw-flex-row">
        <base-button-back :callback="PreviousPage"></base-button-back>
        <div class="tw-ml-2 tw-flex tw-flex-row tw-items-center tw-flex-wrap">
          <Icon class="icon blue10 tw-mr-1.5" icon="heroicons-outline:chart-pie"/>
          <span class="semibold24 blue10">Data Visualization</span>
        </div>
      </div>
      <!-- pc display information part-->
      <div class="tw-w-full tw-mt-6">
        <div v-if="ShowContent === true"
             class="tableTrue tw-flex tw-flex-col md:tw-flex-row tw-border-2 radius10px">
          <div class="left__layout tw-border-0 md:tw-border-r-2 tw-p-2">
            <div class="tw-flex tw-flex-row md:tw-flex-col">
              <!-- Left menu click condition 'All Chart' -->
              <div class="button__left__layout tw-py-1 md:tw-py-2 tw-px-2" @click="chooseGraph('All Chart')">
                <div v-if="GraphName === 'All Chart'" class="tw-flex tw-flex-row tw-justify-between">
                  <span class="medium16 blue5 tw-cursor-pointer">All Chart</span>
                  <span class=" tw-w-1 tw-h-6 tw-bg-blue5"></span>
                </div>
                <div v-if="GraphName !== 'All Chart'">
                  <span class="medium16 blue10 hover:tw-text-blue5 tw-cursor-pointer">All Chart</span>
                </div>
              </div>
              <!-- Left menu click condition 'Bar' -->
              <div class="button__left__layout tw-py-1 md:tw-py-2 tw-px-2" @click="chooseGraph('Bar')">
                <div v-if="GraphName === 'Bar'" class="tw-flex tw-flex-row tw-justify-between">
                  <span class="medium16 blue5 tw-cursor-pointer">Bar</span>
                  <span class=" tw-w-1 tw-h-6 tw-bg-blue5"></span>
                </div>
                <div v-if="GraphName !== 'Bar'">
                  <span class="medium16 blue10 hover:tw-text-blue5 tw-cursor-pointer">Bar</span>
                </div>
              </div>
              <!-- Left menu click condition 'Line' -->
              <div class="button__left__layout tw-py-1 md:tw-py-2 tw-px-2" @click="chooseGraph('Line')">
                <div v-if="GraphName === 'Line'" class="tw-flex tw-flex-row tw-justify-between">
                  <span class="medium16 blue5 tw-cursor-pointer">Line</span>
                  <span class=" tw-w-1 tw-h-6 tw-bg-blue5"></span>
                </div>
                <div v-if="GraphName !== 'Line'">
                  <span class="medium16 blue10 hover:tw-text-blue5 tw-cursor-pointer">Line</span>
                </div>
              </div>
              <!-- Left menu click condition 'Pie' -->
              <div v-if="GraphTitle === 'Graph1' || GraphTitle ==='Graph2' || GraphTitle ==='Graph3'  || GraphTitle ==='Graph4'
               || GraphTitle ==='Graph7' || GraphTitle ==='Graph8' || GraphTitle ==='Graph10'"
                   class="button__left__layout tw-py-1 md:tw-py-2 tw-px-2" @click="chooseGraph('Pie')">
                <div v-if="GraphName === 'Pie'" class="tw-flex tw-flex-row tw-justify-between">
                  <span class="medium16 blue5 tw-cursor-pointer">Pie</span>
                  <span class=" tw-w-1 tw-h-6 tw-bg-blue5"></span>
                </div>
                <div v-if="GraphName !== 'Pie'">
                  <span class="medium16 blue10 hover:tw-text-blue5 tw-cursor-pointer">Pie</span>
                </div>
              </div>
            </div>
          </div>
          <!-- Show list on right side 'All Chart' All 16-->
          <div v-if="GraphName === 'All Chart'" class="right__layout tw-p-2 tw-overflow-auto">
            <div class="tw-flex tw-flex-col">
              <!-- graph list on the right #1-->
              <div class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
                <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                  <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                  <span class="medium16 blue10 tw-m-1">Bar brush</span>
                </div>
                <base-button
                    buttonID="buttonPreview"
                    buttonText="Preview"
                    buttonTextColor="blue10"
                    buttonIconLeft="heroicons-outline:eye"
                    buttonBorderColor="border-white"
                    buttonBgColor="bg-white"
                    :callback="BarBrushClick"
                ></base-button>
              </div>
              <!--graph list on the right #2-->
              <div class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
                <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                  <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                  <span class="medium16 blue10 tw-m-1">Bar label rotation</span>
                </div>
                <base-button
                    buttonID="buttonPreview"
                    buttonText="Preview"
                    buttonTextColor="blue10"
                    buttonIconLeft="heroicons-outline:eye"
                    buttonBorderColor="border-white"
                    buttonBgColor="bg-white"
                    :callback="BarLabelRotationClick"
                ></base-button>
              </div>
              <!--graph list on the right #3-->
              <div class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
                <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                  <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                  <span class="medium16 blue10 tw-m-1">Bar race</span>
                </div>
                <base-button
                    buttonID="buttonPreview"
                    buttonText="Preview"
                    buttonTextColor="blue10"
                    buttonIconLeft="heroicons-outline:eye"
                    buttonBorderColor="border-white"
                    buttonBgColor="bg-white"
                    :callback="BarRaceClick"
                ></base-button>
              </div>
              <!--graph list on the right #4-->
              <div class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
                <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                  <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                  <span class="medium16 blue10 tw-m-1">Bar with background</span>
                </div>
                <base-button
                    buttonID="buttonPreview"
                    buttonText="Preview"
                    buttonTextColor="blue10"
                    buttonIconLeft="heroicons-outline:eye"
                    buttonBorderColor="border-white"
                    buttonBgColor="bg-white"
                    :callback="BarWithBackgroundClick"
                ></base-button>
              </div>
              <!--graph list on the right #5-->
              <div class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
                <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                  <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                  <span class="medium16 blue10 tw-m-1">Bar y-category</span>
                </div>
                <base-button
                    buttonID="buttonPreview"
                    buttonText="Preview"
                    buttonTextColor="blue10"
                    buttonIconLeft="heroicons-outline:eye"
                    buttonBorderColor="border-white"
                    buttonBgColor="bg-white"
                    :callback="BarYCategoryClick"
                ></base-button>
              </div>
              <!--graph list on the right #6-->
              <div class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
                <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                  <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                  <span class="medium16 blue10 tw-m-1">Basic bar chart</span>
                </div>
                <base-button
                    buttonID="buttonPreview"
                    buttonText="Preview"
                    buttonTextColor="blue10"
                    buttonIconLeft="heroicons-outline:eye"
                    buttonBorderColor="border-white"
                    buttonBgColor="bg-white"
                    :callback="BasicBarChartClick"
                ></base-button>
              </div>
              <!--graph list on the right #7-->
              <div class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
                <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                  <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                  <span class="medium16 blue10 tw-m-1">Basic line chart</span>
                </div>
                <base-button
                    buttonID="buttonPreview"
                    buttonText="Preview"
                    buttonTextColor="blue10"
                    buttonIconLeft="heroicons-outline:eye"
                    buttonBorderColor="border-white"
                    buttonBgColor="bg-white"
                    :callback="BasicLineChartClick"
                ></base-button>
              </div>
              <!--graph list on the right #8-->
              <div v-if="GraphTitle === 'Graph1' || GraphTitle ==='Graph2' || GraphTitle ==='Graph3'  || GraphTitle ==='Graph4'
               || GraphTitle ==='Graph7' || GraphTitle ==='Graph8' || GraphTitle ==='Graph10'"
                   class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
                <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                  <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                  <span class="medium16 blue10 tw-m-1">Basic pie chart</span>
                </div>
                <base-button
                    buttonID="buttonPreview"
                    buttonText="Preview"
                    buttonTextColor="blue10"
                    buttonIconLeft="heroicons-outline:eye"
                    buttonBorderColor="border-white"
                    buttonBgColor="bg-white"
                    :callback="BasicPieChartClick"
                ></base-button>
              </div>
              <!--graph list on the right #9-->
              <div v-if="GraphTitle === 'Graph1' || GraphTitle ==='Graph2' || GraphTitle ==='Graph3'  || GraphTitle ==='Graph4'
               || GraphTitle ==='Graph7' || GraphTitle ==='Graph8' || GraphTitle ==='Graph10'"
                   class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
                <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                  <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                  <span class="medium16 blue10 tw-m-1">Customized pie</span>
                </div>
                <base-button
                    buttonID="buttonPreview"
                    buttonText="Preview"
                    buttonTextColor="blue10"
                    buttonIconLeft="heroicons-outline:eye"
                    buttonBorderColor="border-white"
                    buttonBgColor="bg-white"
                    :callback="CustomizedPieChartClick"
                ></base-button>
              </div>
              <!--graph list on the right #10-->
              <div v-if="GraphTitle === 'Graph1' || GraphTitle ==='Graph2' || GraphTitle ==='Graph3'  || GraphTitle ==='Graph4'
               || GraphTitle ==='Graph7' || GraphTitle ==='Graph8' || GraphTitle ==='Graph10'"
                   class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
                <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                  <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                  <span class="medium16 blue10 tw-m-1">Doughnut chart</span>
                </div>
                <base-button
                    buttonID="buttonPreview"
                    buttonText="Preview"
                    buttonTextColor="blue10"
                    buttonIconLeft="heroicons-outline:eye"
                    buttonBorderColor="border-white"
                    buttonBgColor="bg-white"
                    :callback="DoughnutChartClick"
                ></base-button>
              </div>
              <!--graph list on the right #11-->
              <div class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
                <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                  <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                  <span class="medium16 blue10 tw-m-1">Line AQI</span>
                </div>
                <base-button
                    buttonID="buttonPreview"
                    buttonText="Preview"
                    buttonTextColor="blue10"
                    buttonIconLeft="heroicons-outline:eye"
                    buttonBorderColor="border-white"
                    buttonBgColor="bg-white"
                    :callback="LineAQIClick"
                ></base-button>
              </div>
              <!--graph list on the right #12-->
              <div class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
                <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                  <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                  <span class="medium16 blue10 tw-m-1">Multiple line graph</span>
                </div>
                <base-button
                    buttonID="buttonPreview"
                    buttonText="Preview"
                    buttonTextColor="blue10"
                    buttonIconLeft="heroicons-outline:eye"
                    buttonBorderColor="border-white"
                    buttonBgColor="bg-white"
                    :callback="MultipleLineGraphClick"
                ></base-button>
              </div>
              <!--graph list on the right #13-->
              <div v-if="GraphTitle === 'Graph1' || GraphTitle ==='Graph2' || GraphTitle ==='Graph3'  || GraphTitle ==='Graph4'
               || GraphTitle ==='Graph7' || GraphTitle ==='Graph8' || GraphTitle ==='Graph10'"
                   class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
                <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                  <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                  <span class="medium16 blue10 tw-m-1">Nightingale chart</span>
                </div>
                <base-button
                    buttonID="buttonPreview"
                    buttonText="Preview"
                    buttonTextColor="blue10"
                    buttonIconLeft="heroicons-outline:eye"
                    buttonBorderColor="border-white"
                    buttonBgColor="bg-white"
                    :callback="NightingaleChartClick"
                ></base-button>
              </div>
              <!--graph list on the right #14-->
              <div class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
                <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                  <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                  <span class="medium16 blue10 tw-m-1">Series layout bar chart</span>
                </div>
                <base-button
                    buttonID="buttonPreview"
                    buttonText="Preview"
                    buttonTextColor="blue10"
                    buttonIconLeft="heroicons-outline:eye"
                    buttonBorderColor="border-white"
                    buttonBgColor="bg-white"
                    :callback="SeriesLayoutBarChartClick"
                ></base-button>
              </div>
              <!--graph list on the right #15-->
              <div class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
                <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                  <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                  <span class="medium16 blue10 tw-m-1">Share dataset</span>
                </div>
                <base-button
                    buttonID="buttonPreview"
                    buttonText="Preview"
                    buttonTextColor="blue10"
                    buttonIconLeft="heroicons-outline:eye"
                    buttonBorderColor="border-white"
                    buttonBgColor="bg-white"
                    :callback="ShareDatasetChartClick"
                ></base-button>
              </div>
              <!--graph list on the right #16-->
              <div class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
                <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                  <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                  <span class="medium16 blue10 tw-m-1">Stacked area chart</span>
                </div>
                <base-button
                    buttonID="buttonPreview"
                    buttonText="Preview"
                    buttonTextColor="blue10"
                    buttonIconLeft="heroicons-outline:eye"
                    buttonBorderColor="border-white"
                    buttonBgColor="bg-white"
                    :callback="StackedAreaChartClick"
                ></base-button>
              </div>

            </div>
          </div>

          <div v-if="GraphName === 'Bar'" class="right__layout tw-p-2 tw-overflow-auto">
            <div class="tw-flex tw-flex-col">
              <!--graph list on the right #1-->
              <div class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
                <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                  <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                  <span class="medium16 blue10 tw-m-1">Bar brush</span>
                </div>
                <base-button
                    buttonID="buttonPreview"
                    buttonText="Preview"
                    buttonTextColor="blue10"
                    buttonIconLeft="heroicons-outline:eye"
                    buttonBorderColor="border-white"
                    buttonBgColor="bg-white"
                    :callback="BarBrushClick"
                ></base-button>
              </div>

              <!--graph list on the right #2-->
              <div class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
                <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                  <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                  <span class="medium16 blue10 tw-m-1">Bar label rotation</span>
                </div>
                <base-button
                    buttonID="buttonPreview"
                    buttonText="Preview"
                    buttonTextColor="blue10"
                    buttonIconLeft="heroicons-outline:eye"
                    buttonBorderColor="border-white"
                    buttonBgColor="bg-white"
                    :callback="BarLabelRotationClick"
                ></base-button>
              </div>

              <!--graph list on the right #3-->
              <div class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
                <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                  <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                  <span class="medium16 blue10 tw-m-1">Bar race</span>
                </div>
                <base-button
                    buttonID="buttonPreview"
                    buttonText="Preview"
                    buttonTextColor="blue10"
                    buttonIconLeft="heroicons-outline:eye"
                    buttonBorderColor="border-white"
                    buttonBgColor="bg-white"
                    :callback="BarRaceClick"
                ></base-button>
              </div>

              <!--graph list on the right #4-->
              <div class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
                <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                  <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                  <span class="medium16 blue10 tw-m-1">Bar with background</span>
                </div>
                <base-button
                    buttonID="buttonPreview"
                    buttonText="Preview"
                    buttonTextColor="blue10"
                    buttonIconLeft="heroicons-outline:eye"
                    buttonBorderColor="border-white"
                    buttonBgColor="bg-white"
                    :callback="BarWithBackgroundClick"
                ></base-button>
              </div>

              <!--graph list on the right #5-->
              <div class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
                <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                  <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                  <span class="medium16 blue10 tw-m-1">Bar y-category</span>
                </div>
                <base-button
                    buttonID="buttonPreview"
                    buttonText="Preview"
                    buttonTextColor="blue10"
                    buttonIconLeft="heroicons-outline:eye"
                    buttonBorderColor="border-white"
                    buttonBgColor="bg-white"
                    :callback="BarYCategoryClick"
                ></base-button>
              </div>

              <!--graph list on the right #6-->
              <div class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
                <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                  <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                  <span class="medium16 blue10 tw-m-1">Basic bar chart</span>
                </div>
                <base-button
                    buttonID="buttonPreview"
                    buttonText="Preview"
                    buttonTextColor="blue10"
                    buttonIconLeft="heroicons-outline:eye"
                    buttonBorderColor="border-white"
                    buttonBgColor="bg-white"
                    :callback="BasicBarChartClick"
                ></base-button>
              </div>

              <!--graph list on the right #7-->
              <div class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
                <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                  <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                  <span class="medium16 blue10 tw-m-1">Series layout bar chart</span>
                </div>
                <base-button
                    buttonID="buttonPreview"
                    buttonText="Preview"
                    buttonTextColor="blue10"
                    buttonIconLeft="heroicons-outline:eye"
                    buttonBorderColor="border-white"
                    buttonBgColor="bg-white"
                    :callback="SeriesLayoutBarChartClick"
                ></base-button>
              </div>

            </div>
          </div>

          <div v-if="GraphName === 'Line'"  class="right__layout tw-p-2 tw-overflow-auto">
            <div class="tw-flex tw-flex-col">
              <!--graph list on the right #1-->
              <div class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
                <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                  <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                  <span class="medium16 blue10 tw-m-1">Basic line chart</span>
                </div>
                <base-button
                    buttonID="buttonPreview"
                    buttonText="Preview"
                    buttonTextColor="blue10"
                    buttonIconLeft="heroicons-outline:eye"
                    buttonBorderColor="border-white"
                    buttonBgColor="bg-white"
                    :callback="BasicLineChartClick"
                ></base-button>
              </div>

              <!--graph list on the right #2-->
              <div class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
                <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                  <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                  <span class="medium16 blue10 tw-m-1">Line AQI</span>
                </div>
                <base-button
                    buttonID="buttonPreview"
                    buttonText="Preview"
                    buttonTextColor="blue10"
                    buttonIconLeft="heroicons-outline:eye"
                    buttonBorderColor="border-white"
                    buttonBgColor="bg-white"
                    :callback="LineAQIClick"
                ></base-button>
              </div>

              <!--graph list on the right #3-->
              <div class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
                <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                  <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                  <span class="medium16 blue10 tw-m-1">Multiple line graph</span>
                </div>
                <base-button
                    buttonID="buttonPreview"
                    buttonText="Preview"
                    buttonTextColor="blue10"
                    buttonIconLeft="heroicons-outline:eye"
                    buttonBorderColor="border-white"
                    buttonBgColor="bg-white"
                    :callback="MultipleLineGraphClick"
                ></base-button>
              </div>

              <!--graph list on the right #4-->
              <div class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
                <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                  <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                  <span class="medium16 blue10 tw-m-1">Share dataset</span>
                </div>
                <base-button
                    buttonID="buttonPreview"
                    buttonText="Preview"
                    buttonTextColor="blue10"
                    buttonIconLeft="heroicons-outline:eye"
                    buttonBorderColor="border-white"
                    buttonBgColor="bg-white"
                    :callback="ShareDatasetChartClick"
                ></base-button>
              </div>

              <!--graph list on the right #5-->
              <div class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
                <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                  <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                  <span class="medium16 blue10 tw-m-1">Stacked area chart</span>
                </div>
                <base-button
                    buttonID="buttonPreview"
                    buttonText="Preview"
                    buttonTextColor="blue10"
                    buttonIconLeft="heroicons-outline:eye"
                    buttonBorderColor="border-white"
                    buttonBgColor="bg-white"
                    :callback="StackedAreaChartClick"
                ></base-button>
              </div>

            </div>
          </div>

          <div v-if="GraphName === 'Pie'"  class="right__layout tw-p-2 tw-overflow-auto">
            <div class="tw-flex tw-flex-col">
              <!--graph list on the right #1-->
              <div class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
                <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                  <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                  <span class="medium16 blue10 tw-m-1">Basic pie chart</span>
                </div>
                <base-button
                    buttonID="buttonPreview"
                    buttonText="Preview"
                    buttonTextColor="blue10"
                    buttonIconLeft="heroicons-outline:eye"
                    buttonBorderColor="border-white"
                    buttonBgColor="bg-white"
                    :callback="BasicPieChartClick"
                ></base-button>
              </div>

              <!--graph list on the right #2-->
              <div class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
                <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                  <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                  <span class="medium16 blue10 tw-m-1">Customized pie</span>
                </div>
                <base-button
                    buttonID="buttonPreview"
                    buttonText="Preview"
                    buttonTextColor="blue10"
                    buttonIconLeft="heroicons-outline:eye"
                    buttonBorderColor="border-white"
                    buttonBgColor="bg-white"
                    :callback="CustomizedPieChartClick"
                ></base-button>
              </div>

              <!--graph list on the right #3-->
              <div class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
                <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                  <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                  <span class="medium16 blue10 tw-m-1">Doughnut chart</span>
                </div>
                <base-button
                    buttonID="buttonPreview"
                    buttonText="Preview"
                    buttonTextColor="blue10"
                    buttonIconLeft="heroicons-outline:eye"
                    buttonBorderColor="border-white"
                    buttonBgColor="bg-white"
                    :callback="DoughnutChartClick"
                ></base-button>
              </div>

              <!--graph list on the right #4-->
              <div class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
                <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                  <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                  <span class="medium16 blue10 tw-m-1">Nightingale chart</span>
                </div>
                <base-button
                    buttonID="buttonPreview"
                    buttonText="Preview"
                    buttonTextColor="blue10"
                    buttonIconLeft="heroicons-outline:eye"
                    buttonBorderColor="border-white"
                    buttonBgColor="bg-white"
                    :callback="NightingaleChartClick"
                ></base-button>
              </div>

            </div>
          </div>

        </div>
      </div>

      <div v-if="ShowContent === false"
           class="tableFalse tw-flex tw-flex-col md:tw-flex-row tw-border-2 radius10px">
        <div class="left__layout tw-border-0 md:tw-border-r-2 tw-p-2">
          <div class="tw-flex tw-flex-row md:tw-flex-col">
            <div class="button__left__layout tw-py-1 md:tw-py-2 tw-px-2" @click="chooseGraph('All Chart')">
              <div v-if="GraphName === 'All Chart'" class="tw-flex tw-flex-col tw-justify-between">
                <span class="medium16 blue5 tw-cursor-pointer">All Chart</span>
                <span class=" tw-w-15 tw-h-1 tw-bg-blue5"></span>
              </div>
              <div v-if="GraphName !== 'All Chart'">
                <span class="medium16 blue10 hover:tw-text-blue5 tw-cursor-pointer">All Chart</span>
              </div>
            </div>

            <div class="button__left__layout tw-py-1 md:tw-py-2 tw-px-2" @click="chooseGraph('Bar')">
              <div v-if="GraphName === 'Bar'" class="tw-flex tw-flex-col tw-justify-between">
                <span class="medium16 blue5 tw-cursor-pointer">Bar</span>
                <span class=" tw-w-15 tw-h-1 tw-bg-blue5"></span>
              </div>
              <div v-if="GraphName !== 'Bar'">
                <span class="medium16 blue10 hover:tw-text-blue5 tw-cursor-pointer">Bar</span>
              </div>
            </div>

            <div class="button__left__layout tw-py-1 md:tw-py-2 tw-px-2" @click="chooseGraph('Line')">
              <div v-if="GraphName === 'Line'" class="tw-flex tw-flex-col tw-justify-between">
                <span class="medium16 blue5 tw-cursor-pointer">Line</span>
                <span class=" tw-w-15 tw-h-1 tw-bg-blue5"></span>
              </div>
              <div v-if="GraphName !== 'Line'">
                <span class="medium16 blue10 hover:tw-text-blue5 tw-cursor-pointer">Line</span>
              </div>
            </div>

            <div v-if="GraphTitle === 'Graph1' || GraphTitle ==='Graph2' || GraphTitle ==='Graph3'  || GraphTitle ==='Graph4'
               || GraphTitle ==='Graph7' || GraphTitle ==='Graph8' || GraphTitle ==='Graph10'"
                 class="button__left__layout tw-py-1 md:tw-py-2 tw-px-2" @click="chooseGraph('Pie')">
              <div v-if="GraphName === 'Pie'" class="tw-flex tw-flex-col tw-justify-between">
                <span class="medium16 blue5 tw-cursor-pointer">Pie</span>
                <span class=" tw-w-15 tw-h-1 tw-bg-blue5"></span>
              </div>
              <div v-if="GraphName !== 'Pie'">
                <span class="medium16 blue10 hover:tw-text-blue5 tw-cursor-pointer">Pie</span>
              </div>
            </div>

          </div>
        </div>

        <div v-if="GraphName === 'All Chart'" class="right__layout tw-p-2 tw-overflow-auto">
          <div class="tw-flex tw-flex-col">
            <!--graph list on the right #1-->
            <div class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
              <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                <span class="medium16 blue10 tw-m-1">Bar brush</span>
              </div>
              <!--              <div class="tw-border-solid tw-border-2 tw-border-blue10 radius10px">-->
              <!--                <Icon class="semibold24 blue10 tw-mx-3 tw-my-2" icon="heroicons-outline:eye"/>-->
              <!--              </div>-->
              <base-button
                  buttonID="buttonPreview"
                  buttonText="Preview"
                  buttonTextColor="blue5"
                  buttonBgColor="bg-white"
                  buttonBorderColor="border-blue10"
                  :callback="BarBrushClick"
              ></base-button>
            </div>

            <!--graph list on the right #2-->
            <div class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
              <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                <span class="medium16 blue10 tw-m-1">Bar label rotation</span>
              </div>
              <base-button
                  buttonID="buttonPreview"
                  buttonText="Preview"
                  buttonTextColor="blue5"
                  buttonBgColor="bg-white"
                  buttonBorderColor="border-blue10"
                  :callback="BarLabelRotationClick"
              ></base-button>
            </div>
            <!--graph list on the right #3-->
            <div class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
              <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                <span class="medium16 blue10 tw-m-1">Bar race</span>
              </div>
              <base-button
                  buttonID="buttonPreview"
                  buttonText="Preview"
                  buttonTextColor="blue5"
                  buttonBgColor="bg-white"
                  buttonBorderColor="border-blue10"
                  :callback="BarRaceClick"
              ></base-button>
            </div>
            <!--graph list on the right #4-->
            <div class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
              <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                <span class="medium16 blue10 tw-m-1">Bar with background</span>
              </div>
              <base-button
                  buttonID="buttonPreview"
                  buttonText="Preview"
                  buttonTextColor="blue5"
                  buttonBgColor="bg-white"
                  buttonBorderColor="border-blue10"
                  :callback="BarWithBackgroundClick"
              ></base-button>
            </div>
            <!--graph list on the right #5-->
            <div class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
              <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                <span class="medium16 blue10 tw-m-1">Bar y-category</span>
              </div>
              <base-button
                  buttonID="buttonPreview"
                  buttonText="Preview"
                  buttonTextColor="blue5"
                  buttonBgColor="bg-white"
                  buttonBorderColor="border-blue10"
                  :callback="BarYCategoryClick"
              ></base-button>
            </div>
            <!--graph list on the right #6-->
            <div class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
              <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                <span class="medium16 blue10 tw-m-1">Basic bar chart</span>
              </div>
              <base-button
                  buttonID="buttonPreview"
                  buttonText="Preview"
                  buttonTextColor="blue5"
                  buttonBgColor="bg-white"
                  buttonBorderColor="border-blue10"
                  :callback="BasicBarChartClick"
              ></base-button>
            </div>
            <!--graph list on the right #7-->
            <div class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
              <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                <span class="medium16 blue10 tw-m-1">Basic line chart</span>
              </div>
              <base-button
                  buttonID="buttonPreview"
                  buttonText="Preview"
                  buttonTextColor="blue5"
                  buttonBgColor="bg-white"
                  buttonBorderColor="border-blue10"
                  :callback="BasicLineChartClick"
              ></base-button>
            </div>
            <!--graph list on the right #8-->
            <div v-if="GraphTitle === 'Graph1' || GraphTitle ==='Graph2' || GraphTitle ==='Graph3'  || GraphTitle ==='Graph4'
               || GraphTitle ==='Graph7' || GraphTitle ==='Graph8' || GraphTitle ==='Graph10'"
                 class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
              <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                <span class="medium16 blue10 tw-m-1">Basic pie chart</span>
              </div>
              <base-button
                  buttonID="buttonPreview"
                  buttonText="Preview"
                  buttonTextColor="blue5"
                  buttonBgColor="bg-white"
                  buttonBorderColor="border-blue10"
                  :callback="BasicPieChartClick"
              ></base-button>
            </div>
            <!--graph list on the right #9-->
            <div v-if="GraphTitle === 'Graph1' || GraphTitle ==='Graph2' || GraphTitle ==='Graph3'  || GraphTitle ==='Graph4'
               || GraphTitle ==='Graph7' || GraphTitle ==='Graph8' || GraphTitle ==='Graph10'"
                 class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
              <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                <span class="medium16 blue10 tw-m-1">Customized pie</span>
              </div>
              <base-button
                  buttonID="buttonPreview"
                  buttonText="Preview"
                  buttonTextColor="blue5"
                  buttonBgColor="bg-white"
                  buttonBorderColor="border-blue10"
                  :callback="CustomizedPieChartClick"
              ></base-button>
            </div>
            <!--graph list on the right #10-->
            <div v-if="GraphTitle === 'Graph1' || GraphTitle ==='Graph2' || GraphTitle ==='Graph3'  || GraphTitle ==='Graph4'
               || GraphTitle ==='Graph7' || GraphTitle ==='Graph8' || GraphTitle ==='Graph10'"
                 class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
              <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                <span class="medium16 blue10 tw-m-1">Doughnut chart</span>
              </div>
              <base-button
                  buttonID="buttonPreview"
                  buttonText="Preview"
                  buttonTextColor="blue5"
                  buttonBgColor="bg-white"
                  buttonBorderColor="border-blue10"
                  :callback="DoughnutChartClick"
              ></base-button>
            </div>
            <!--graph list on the right #11-->
            <div class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
              <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                <span class="medium16 blue10 tw-m-1">Line AQI</span>
              </div>
              <base-button
                  buttonID="buttonPreview"
                  buttonText="Preview"
                  buttonTextColor="blue5"
                  buttonBgColor="bg-white"
                  buttonBorderColor="border-blue10"
                  :callback="LineAQIClick"
              ></base-button>
            </div>
            <!--graph list on the right #12-->
            <div class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
              <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                <span class="medium16 blue10 tw-m-1">Multiple line graph</span>
              </div>
              <base-button
                  buttonID="buttonPreview"
                  buttonText="Preview"
                  buttonTextColor="blue5"
                  buttonBgColor="bg-white"
                  buttonBorderColor="border-blue10"
                  :callback="MultipleLineGraphClick"
              ></base-button>
            </div>
            <!--graph list on the right #13-->
            <div v-if="GraphTitle === 'Graph1' || GraphTitle ==='Graph2' || GraphTitle ==='Graph3'  || GraphTitle ==='Graph4'
               || GraphTitle ==='Graph7' || GraphTitle ==='Graph8' || GraphTitle ==='Graph10'"
                 class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
              <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                <span class="medium16 blue10 tw-m-1">Nightingale chart</span>
              </div>
              <base-button
                  buttonID="buttonPreview"
                  buttonText="Preview"
                  buttonTextColor="blue5"
                  buttonBgColor="bg-white"
                  buttonBorderColor="border-blue10"
                  :callback="NightingaleChartClick"
              ></base-button>
            </div>
            <!--graph list on the right #14-->
            <div class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
              <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                <span class="medium16 blue10 tw-m-1">Series layout bar chart</span>
              </div>
              <base-button
                  buttonID="buttonPreview"
                  buttonText="Preview"
                  buttonTextColor="blue5"
                  buttonBgColor="bg-white"
                  buttonBorderColor="border-blue10"
                  :callback="SeriesLayoutBarChartClick"
              ></base-button>
            </div>
            <!--graph list on the right #15-->
            <div class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
              <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                <span class="medium16 blue10 tw-m-1">Share dataset</span>
              </div>
              <base-button
                  buttonID="buttonPreview"
                  buttonText="Preview"
                  buttonTextColor="blue5"
                  buttonBgColor="bg-white"
                  buttonBorderColor="border-blue10"
                  :callback="ShareDatasetChartClick"
              ></base-button>
            </div>
            <!--graph list on the right #16-->
            <div class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
              <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                <span class="medium16 blue10 tw-m-1">Stacked area chart</span>
              </div>
              <base-button
                  buttonID="buttonPreview"
                  buttonText="Preview"
                  buttonTextColor="blue5"
                  buttonBgColor="bg-white"
                  buttonBorderColor="border-blue10"
                  :callback="StackedAreaChartClick"
              ></base-button>
            </div>

          </div>
        </div>

        <div v-if="GraphName === 'Bar'" class="right__layout tw-p-2 tw-overflow-auto">
          <div class="tw-flex tw-flex-col">
            <!--graph list on the right #1-->
            <div class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
              <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                <span class="medium16 blue10 tw-m-1">Bar brush</span>
              </div>
              <base-button
                  buttonID="buttonPreview"
                  buttonText="Preview"
                  buttonTextColor="blue5"
                  buttonBgColor="bg-white"
                  buttonBorderColor="border-blue10"
                  :callback="BarBrushClick"
              ></base-button>
            </div>

            <!--graph list on the right #2-->
            <div class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
              <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                <span class="medium16 blue10 tw-m-1">Bar label rotation</span>
              </div>
              <base-button
                  buttonID="buttonPreview"
                  buttonText="Preview"
                  buttonTextColor="blue5"
                  buttonBgColor="bg-white"
                  buttonBorderColor="border-blue10"
                  :callback="BarLabelRotationClick"
              ></base-button>
            </div>
            <!--graph list on the right #3-->
            <div class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
              <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                <span class="medium16 blue10 tw-m-1">Bar race</span>
              </div>
              <base-button
                  buttonID="buttonPreview"
                  buttonText="Preview"
                  buttonTextColor="blue5"
                  buttonBgColor="bg-white"
                  buttonBorderColor="border-blue10"
                  :callback="BarRaceClick"
              ></base-button>
            </div>
            <!--graph list on the right #4-->
            <div class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
              <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                <span class="medium16 blue10 tw-m-1">Bar with background</span>
              </div>
              <base-button
                  buttonID="buttonPreview"
                  buttonText="Preview"
                  buttonTextColor="blue5"
                  buttonBgColor="bg-white"
                  buttonBorderColor="border-blue10"
                  :callback="BarWithBackgroundClick"
              ></base-button>
            </div>
            <!--graph list on the right #5-->
            <div class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
              <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                <span class="medium16 blue10 tw-m-1">Bar y-category</span>
              </div>
              <base-button
                  buttonID="buttonPreview"
                  buttonText="Preview"
                  buttonTextColor="blue5"
                  buttonBgColor="bg-white"
                  buttonBorderColor="border-blue10"
                  :callback="BarYCategoryClick"
              ></base-button>
            </div>
            <!--graph list on the right #6-->
            <div class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
              <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                <span class="medium16 blue10 tw-m-1">Basic bar chart</span>
              </div>
              <base-button
                  buttonID="buttonPreview"
                  buttonText="Preview"
                  buttonTextColor="blue5"
                  buttonBgColor="bg-white"
                  buttonBorderColor="border-blue10"
                  :callback="BasicBarChartClick"
              ></base-button>
            </div>

            <!--graph list on the right #7-->
            <div class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
              <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                <span class="medium16 blue10 tw-m-1">Series layout bar chart</span>
              </div>
              <base-button
                  buttonID="buttonPreview"
                  buttonText="Preview"
                  buttonTextColor="blue5"
                  buttonBgColor="bg-white"
                  buttonBorderColor="border-blue10"
                  :callback="SeriesLayoutBarChartClick"
              ></base-button>
            </div>
          </div>
        </div>

        <div v-if="GraphName === 'Line'" class="right__layout tw-p-2 tw-overflow-auto">
          <div class="tw-flex tw-flex-col">
            <!--graph list on the right #1-->
            <div class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
              <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                <span class="medium16 blue10 tw-m-1">Basic line chart</span>
              </div>
              <base-button
                  buttonID="buttonPreview"
                  buttonText="Preview"
                  buttonTextColor="blue5"
                  buttonBgColor="bg-white"
                  buttonBorderColor="border-blue10"
                  :callback="BasicLineChartClick"
              ></base-button>
            </div>

            <!--graph list on the right #2-->
            <div class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
              <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                <span class="medium16 blue10 tw-m-1">Line AQI</span>
              </div>
              <base-button
                  buttonID="buttonPreview"
                  buttonText="Preview"
                  buttonTextColor="blue5"
                  buttonBgColor="bg-white"
                  buttonBorderColor="border-blue10"
                  :callback="LineAQIClick"
              ></base-button>
            </div>
            <!--graph list on the right #3-->
            <div class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
              <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                <span class="medium16 blue10 tw-m-1">Multiple line graph</span>
              </div>
              <base-button
                  buttonID="buttonPreview"
                  buttonText="Preview"
                  buttonTextColor="blue5"
                  buttonBgColor="bg-white"
                  buttonBorderColor="border-blue10"
                  :callback="MultipleLineGraphClick"
              ></base-button>
            </div>

            <!--graph list on the right #4-->
            <div class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
              <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                <span class="medium16 blue10 tw-m-1">Series layout bar chart</span>
              </div>
              <base-button
                  buttonID="buttonPreview"
                  buttonText="Preview"
                  buttonTextColor="blue5"
                  buttonBgColor="bg-white"
                  buttonBorderColor="border-blue10"
                  :callback="SeriesLayoutBarChartClick"
              ></base-button>
            </div>
            <!--graph list on the right #5-->
            <div class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
              <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                <span class="medium16 blue10 tw-m-1">Share dataset</span>
              </div>
              <base-button
                  buttonID="buttonPreview"
                  buttonText="Preview"
                  buttonTextColor="blue5"
                  buttonBgColor="bg-white"
                  buttonBorderColor="border-blue10"
                  :callback="ShareDatasetChartClick"
              ></base-button>
            </div>
            <!--graph list on the right #6-->
            <div class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
              <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                <span class="medium16 blue10 tw-m-1">Stacked area chart</span>
              </div>
              <base-button
                  buttonID="buttonPreview"
                  buttonText="Preview"
                  buttonTextColor="blue5"
                  buttonBgColor="bg-white"
                  buttonBorderColor="border-blue10"
                  :callback="StackedAreaChartClick"
              ></base-button>
            </div>
          </div>
        </div>

        <div v-if="GraphName === 'Pie'" class="right__layout tw-p-2 tw-overflow-auto">
          <div v-if="GraphTitle === 'Graph1' || GraphTitle ==='Graph2' || GraphTitle ==='Graph3'  || GraphTitle ==='Graph4'
               || GraphTitle ==='Graph7' || GraphTitle ==='Graph8' || GraphTitle ==='Graph10'"
               class="tw-flex tw-flex-col">
            <!--graph list on the right #1-->
            <div v-if="GraphTitle === 'Graph1' || GraphTitle ==='Graph2' || GraphTitle ==='Graph3'  || GraphTitle ==='Graph4'
               || GraphTitle ==='Graph7' || GraphTitle ==='Graph8' || GraphTitle ==='Graph10'"
                 class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
              <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                <span class="medium16 blue10 tw-m-1">Basic pie chart</span>
              </div>
              <base-button
                  buttonID="buttonPreview"
                  buttonText="Preview"
                  buttonTextColor="blue5"
                  buttonBgColor="bg-white"
                  buttonBorderColor="border-blue10"
                  :callback="BasicPieChartClick"
              ></base-button>
            </div>
            <!--graph list on the right #2-->
            <div v-if="GraphTitle === 'Graph1' || GraphTitle ==='Graph2' || GraphTitle ==='Graph3'  || GraphTitle ==='Graph4'
               || GraphTitle ==='Graph7' || GraphTitle ==='Graph8' || GraphTitle ==='Graph10'"
                 class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
              <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                <span class="medium16 blue10 tw-m-1">Customized pie</span>
              </div>
              <base-button
                  buttonID="buttonPreview"
                  buttonText="Preview"
                  buttonTextColor="blue5"
                  buttonBgColor="bg-white"
                  buttonBorderColor="border-blue10"
                  :callback="CustomizedPieChartClick"
              ></base-button>
            </div>
            <!--graph list on the right #3-->
            <div v-if="GraphTitle === 'Graph1' || GraphTitle ==='Graph2' || GraphTitle ==='Graph3'  || GraphTitle ==='Graph4'
               || GraphTitle ==='Graph7' || GraphTitle ==='Graph8' || GraphTitle ==='Graph10'"
                 class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
              <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                <span class="medium16 blue10 tw-m-1">Doughnut chart</span>
              </div>
              <base-button
                  buttonID="buttonPreview"
                  buttonText="Preview"
                  buttonTextColor="blue5"
                  buttonBgColor="bg-white"
                  buttonBorderColor="border-blue10"
                  :callback="DoughnutChartClick"
              ></base-button>
            </div>
            <!--graph list on the right #4-->
            <div v-if="GraphTitle === 'Graph1' || GraphTitle ==='Graph2' || GraphTitle ==='Graph3'  || GraphTitle ==='Graph4'
               || GraphTitle ==='Graph7' || GraphTitle ==='Graph8' || GraphTitle ==='Graph10'"
                 class="radius12px bg-white base-shadow base-padding tw-w-full tw-flex tw-flex-row tw-items-center tw-my-1">
              <div class="tw-flex tw-flex-row tw-items-center tw-w-full">
                <Icon class="icon blue10 tw-m-1" icon="heroicons-outline:chart-square-bar"/>
                <span class="medium16 blue10 tw-m-1">Nightingale chart</span>
              </div>
              <base-button
                  buttonID="buttonPreview"
                  buttonText="Preview"
                  buttonTextColor="blue5"
                  buttonBgColor="bg-white"
                  buttonBorderColor="border-blue10"
                  :callback="NightingaleChartClick"
              ></base-button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue2/dist/iconify"
import {mapActions, mapGetters} from "vuex"
import BaseButtonBack from "@/components/BaseButtonBack"
import BaseButton from "@/components/BaseButton"
// import ProgressBar from "@/components/ProgressBar"

export default {
  name: "SelectGraph.vue",
  components: {
    Icon,
    BaseButtonBack,
    BaseButton,
    // ProgressBar
  },
  props: {
  },
  data() {
    return {
      ShowContent: true,
      GraphName: 'All Chart',
      GraphType: '',
      GraphTitle:''
    }
  },
  watch: {
    windowResize () {
      this.ShowContent = window.innerWidth >= 1440
    }
  },
  computed: {
    ...mapGetters(['windowResize']),

  },
  async mounted () {
    window.onresize = () => {
      this.flapWindowResize()
    }
    this.ShowContent = window.innerWidth >= 1440
    
    this.GraphTitle = localStorage.getItem('graphtitle')
  },
  methods: {
    ...mapActions(['flapWindowResize']),
    PreviousPage() {
      this.$router.push('/DataVisualization')
    },
    chooseGraph(choice){ //เลือกด้านซ้ายชนิดกราฟว่า bar line
      this.GraphName = choice
      console.log(this.GraphName) // เลือกจากหน้าแรกว่าหัวข้ออะไร
    },
    BarBrushClick(){
      this.GraphType = 'Bar brush'
      localStorage.setItem('graphtype', this.GraphType)
      this.$router.push({
        name:'PreviewGraph',
      })
    },
    BarLabelRotationClick(){
      this.GraphType = 'Bar label rotation'
      // this.GraphTitle = this.currentGraphNo
      localStorage.setItem('graphtype', this.GraphType)
      // localStorage.setItem('graphtitle', this.GraphTitle)
      this.$router.push({
        name:'PreviewGraph',
        // params: {
        //   GraphTypes: this.GraphType,
        //   GraphTitle: this.GraphTitle
        // }
      })
    },
    BarRaceClick(){
      this.GraphType = 'Bar race'
      // this.GraphTitle = this.currentGraphNo
      localStorage.setItem('graphtype', this.GraphType)
      // localStorage.setItem('graphtitle', this.GraphTitle)
      this.$router.push({
        name:'PreviewGraph',
        // params: {
        //   GraphTypes: this.GraphType,
        //   GraphTitle: this.GraphTitle
        // }
      })
    },
    BarYCategoryClick(){
      this.GraphType = 'Bar y-category'
      // this.GraphTitle = this.currentGraphNo
      localStorage.setItem('graphtype', this.GraphType)
      // localStorage.setItem('graphtitle', this.GraphTitle)
      this.$router.push({
        name:'PreviewGraph',
        // params: {
        //   GraphTypes: this.GraphType,
        //   GraphTitle: this.GraphTitle
        // }
      })
    },
    BarWithBackgroundClick(){
      this.GraphType = 'Bar with background'
      // this.GraphTitle = this.currentGraphNo
      localStorage.setItem('graphtype', this.GraphType)
      // localStorage.setItem('graphtitle', this.GraphTitle)
      this.$router.push({
        name:'PreviewGraph',
        // params: {
        //   GraphTypes: this.GraphType,
        //   GraphTitle: this.GraphTitle
        // }
      })
    },
    BasicBarChartClick(){
      this.GraphType = 'Basic bar chart'
      // this.GraphTitle = this.currentGraphNo
      localStorage.setItem('graphtype', this.GraphType)
      // localStorage.setItem('graphtitle', this.GraphTitle)
      this.$router.push({
        name:'PreviewGraph',
        // params: {
        //   GraphTypes: this.GraphType,
        //   GraphTitle: this.GraphTitle
        // }
      })
    },
    BasicLineChartClick(){
      this.GraphType = 'Basic line chart'
      // this.GraphTitle = this.currentGraphNo
      localStorage.setItem('graphtype', this.GraphType)
      // localStorage.setItem('graphtitle', this.GraphTitle)
      this.$router.push({
        name:'PreviewGraph',
        // params: {
        //   GraphTypes: this.GraphType,
        //   GraphTitle: this.GraphTitle
        // }
      })
    },
    BasicPieChartClick(){
      this.GraphType = 'Basic pie chart'
      // this.GraphTitle = this.currentGraphNo
      localStorage.setItem('graphtype', this.GraphType)
      // localStorage.setItem('graphtitle', this.GraphTitle)
      this.$router.push({
        name:'PreviewGraph',
        // params: {
        //   GraphTypes: this.GraphType,
        //   GraphTitle: this.GraphTitle
        // }
      })
    },
    CustomizedPieChartClick(){
      this.GraphType = 'Customized pie chart'
      // this.GraphTitle = this.currentGraphNo
      localStorage.setItem('graphtype', this.GraphType)
      // localStorage.setItem('graphtitle', this.GraphTitle)
      this.$router.push({
        name:'PreviewGraph',
        // params: {
        //   GraphTypes: this.GraphType,
        //   GraphTitle: this.GraphTitle
        // }
      })
    },
    DoughnutChartClick(){
      this.GraphType = 'Doughnut chart'
      // this.GraphTitle = this.currentGraphNo
      localStorage.setItem('graphtype', this.GraphType)
      // localStorage.setItem('graphtitle', this.GraphTitle)
      this.$router.push({
        name:'PreviewGraph',
        // params: {
        //   GraphTypes: this.GraphType,
        //   GraphTitle: this.GraphTitle
        // }
      })
    },
    LineAQIClick(){
      this.GraphType = 'Line AQI chart'
      // this.GraphTitle = this.currentGraphNo
      localStorage.setItem('graphtype', this.GraphType)
      // localStorage.setItem('graphtitle', this.GraphTitle)
      this.$router.push({
        name:'PreviewGraph',
        // params: {
        //   GraphTypes: this.GraphType,
        //   GraphTitle: this.GraphTitle
        // }
      })
    },
    MultipleLineGraphClick(){ 
      this.GraphType = 'Multiple line graph'
      // this.GraphTitle = this.currentGraphNo
      localStorage.setItem('graphtype', this.GraphType)
      // localStorage.setItem('graphtitle', this.GraphTitle)
      this.$router.push({
        name:'PreviewGraph',
        // params: {
        //   GraphTypes: this.GraphType,
        //   GraphTitle: this.GraphTitle
        // }
      })
    },
    NightingaleChartClick(){
      this.GraphType = 'Nightingale chart'
      // this.GraphTitle = this.currentGraphNo
      localStorage.setItem('graphtype', this.GraphType)
      // localStorage.setItem('graphtitle', this.GraphTitle)
      this.$router.push({
        name:'PreviewGraph',
        // params: {
        //   GraphTypes: this.GraphType,
        //   GraphTitle: this.GraphTitle
        // }
      })
    },
    SeriesLayoutBarChartClick(){
      this.GraphType = 'Series layout bar chart'
      // this.GraphTitle = this.currentGraphNo
      localStorage.setItem('graphtype', this.GraphType)
      // localStorage.setItem('graphtitle', this.GraphTitle)
      this.$router.push({
        name:'PreviewGraph',
        // params: {
        //   GraphTypes: this.GraphType,
        //   GraphTitle: this.GraphTitle
        // }
      })
    },
    ShareDatasetChartClick(){
      this.GraphType = 'Share dataset chart'
      // this.GraphTitle = this.currentGraphNo
      localStorage.setItem('graphtype', this.GraphType)
      // localStorage.setItem('graphtitle', this.GraphTitle)
      this.$router.push({
        name:'PreviewGraph',
        // params: {
        //   GraphTypes: this.GraphType,
        //   GraphTitle: this.GraphTitle
        // }
      })
    },
    StackedAreaChartClick(){
      this.GraphType = 'Stacked area chart'
      // this.GraphTitle = this.currentGraphNo
      localStorage.setItem('graphtype', this.GraphType)
      // localStorage.setItem('graphtitle', this.GraphTitle)
      this.$router.push({
        name:'PreviewGraph',
        // params: {
        //   GraphTypes: this.GraphType,
        //   GraphTitle: this.GraphTitle
        // }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.tableTrue{
  height: 450px;
}
.tableFalse{
  height: 90%;
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