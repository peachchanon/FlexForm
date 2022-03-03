<template>
  <div>
    <range-slider class="slider" :min="min" :max="max" step="1" v-model="sliderValue">
      <template slot="knob">
        <div class="knobby">
          <div class="tooltip">
            <span class="tooltiptext">{{ sliderValue }}</span>
          </div>
      <!--    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20" height="20">
            <path
              fill="#3498DB"
              fill-rule="evenodd"
              d="M9.864 20c5.243-5.195 7.864-9.24 7.864-12.136A7.863 7.863 0 009.864 0 7.863 7.863 0 002 7.864C2 10.759 4.621 14.804 9.864 20z"
            ></path>
            <text x="10" y="10" fill="currentColor" text-anchor="middle">{{ sliderValue }}</text>
          </svg> !-->
        </div>
      </template>
    </range-slider>
  </div>
</template>

<script>
import RangeSlider from 'vue-range-slider'
import 'vue-range-slider/dist/vue-range-slider.css'

export default {
  name: 'RangeSliders',
  props: {
    msg: String,
    min: Number,
    max: Number,
    labelText: String,
    labelColor: String,
    labelSize: String
  },
  data () {
    return {
      sliderValue: 50 // default value
    }
  },
  components: {
    RangeSlider
  }
}
</script>

<style lang="scss">
.slider {
  width: 300px;
  margin-top: 90px;
}

.slider .range-slider-rail {
  height: 7px;
  background-color: #CCCCCC;
  border-radius: 5px;
}

.slider .range-slider-fill {
  height: 7px;
  border-radius: 5px;
  background-color: #3498DB;
}

.slider .range-slider-knob {
  height: 17px;
  width: 17px;
  color: #fff;
  background-color: white;
  border: 0;
}
/*
.slider .knobby {
  position: relative
}

.slider .knobby svg {
  width: 50px;
  height: 50px;
  position: absolute;
  top: -65px;
  left: -14px;
}

.slider .knobby svg text {
  font-size: 5px;
  font-weight: bold;
} */

.slider .knobby .tooltip {
  position: relative;
}

.slider .knobby .tooltip .tooltiptext {
  width: 40px;
  height: 35px;
  position: absolute;
  top: -50px;
  left: -12px;
  background-color: #3498DB;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.3s;
}

.slider .knobby .tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #3498DB transparent transparent transparent;
}

.slider .knobby .tooltip .tooltiptext {
  visibility: visible;
  opacity: 1;
}
.white{color: white;}
.grey10{color:$grey10;}
.grey9{color:$grey9;}
.grey8{color:$grey8;}
.grey7{color:$grey7;}
.grey6{color:$grey6;}
.grey5{color:$grey5;}
.grey4{color:$grey4;}
.grey3{color:$grey3;}
.grey2{color:$grey2;}
.grey1{color:$grey1;}
.blue10{color:$blue10;}
.blue9{color:$blue9;}
.blue8{color:$blue8;}
.blue7{color:$blue7;}
.blue6{color:$blue6;}
.blue5{color:$blue5;}
.blue4{color:$blue4;}
.blue3{color:$blue3;}
.blue2{color:$blue2;}
.blue1{color:$blue1;}
.green10{color:$green10;}
.green9{color:$green9;}
.green8{color:$green8;}
.green7{color:$green7;}
.green6{color:$green6;}
.green5{color:$green5;}
.green4{color:$green4;}
.green3{color:$green3;}
.green2{color:$green2;}
.green1{color:$green1;}
.yellow10{color:$yellow10;}
.yellow9{color:$yellow9;}
.yellow8{color:$yellow8;}
.yellow7{color:$yellow7;}
.yellow6{color:$yellow6;}
.yellow5{color:$yellow5;}
.yellow4{color:$yellow4;}
.yellow3{color:$yellow3;}
.yellow2{color:$yellow2;}
.yellow1{color:$yellow1;}
.red10{color:$red10;}
.red9{color:$red10;}
.red9{color:$red9;}
.red8{color:$red8;}
.red7{color:$red7;}
.red6{color:$red6;}
.red5{color:$red5;}
.red4{color:$red4;}
.red3{color:$red3;}
.red2{color:$red2;}
.red1{color:$red1;}
</style>
