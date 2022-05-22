<template>
  <div>
    <label
        :class="[labelColor]"
        :style="{fontSize: labelSize + 'px'}">{{labelText}}</label>
    <vue-range-slider v-model="value" :min="min" :max="max" :formatter="formatter"></vue-range-slider>
  </div>
</template>
<script>
import 'vue-range-component/dist/vue-range-slider.css' //npm install vue-range-component --save
import VueRangeSlider from 'vue-range-component' // https://www.codecheef.org/article/vue-js-range-slider-example-with-code
export default {
  components: { 
    VueRangeSlider
  },
  props: {
    min : Number,
    max : Number,
    labelText: String,
    labelColor: String,
    labelSize: String,
  },
  data() {
    return {
      value: [10, 50] //started default value
    }
  },
  computed: {
  },
  created() {
    //this.min = 0
    //this.max = 100
    this.formatter = value => `${value}`
  },
  methods: {
  },
  watch: {
  }
}

</script>
<style lang="scss" scoped>
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
