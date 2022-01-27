<template>
  <div>
    <range-slider class="slider" min="0" max="100" step="1" v-model="sliderValue">
      <template slot="knob">
        <div class="knobby">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20" height="20">
            <path
              fill="#006F8A"
              fill-rule="evenodd"
              d="M9.864 20c5.243-5.195 7.864-9.24 7.864-12.136A7.863 7.863 0 009.864 0 7.863 7.863 0 002 7.864C2 10.759 4.621 14.804 9.864 20z"
            ></path>
            <text x="10" y="10" fill="currentColor" text-anchor="middle">{{ sliderValue + '%' }}</text>
          </svg>
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
    msg: String
  },
  data () {
    return {
      sliderValue: 50
    }
  },
  components: {
    RangeSlider
  }
}
</script>

<style>
.slider {
  width: 300px;
  margin-top: 90px;
}

.slider .range-slider-rail {
  height: 11px;
  background-color: lightskyblue;
  border-radius: 5px;
}

.slider .range-slider-fill {
  height: 3px;
  margin: 0 6px;
  background-color: steelblue;
}

.slider .range-slider-knob {
  height: 22px;
  width: 22px;
  color: #fff;
  background-color: #006f8a;
  border: 0;
  box-shadow: 0 0 0 10px rgb(0 111 138 / 0.2);
}

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
}
</style>
