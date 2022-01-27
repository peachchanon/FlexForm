<template>
  <div @mousemove="doDrag" class="outercontainer">
    <range-slider
      class="slider" multiple
      min="10"
      max="1000"
      step="10"
      v-model="sliderValue">
    </range-slider>
    <div class="slider-container">
      <p>{{ SliderText }}</p>
      <input type="text" v-model="min" @keyup="setMin" />
      <input type="text" v-model="max" @keyup="setMax" />
      <p>{{ numberLeft }}</p>
      <p>{{ numberRight }}</p>
      <div class="slider-content-container">
        <div
          @mousedown="startDrag"
          class="drag-1"
          :style="{ left: drag1.left + 'px' }"
        ></div>
        <div class="slider-value-background" id="slider-background"></div>
        <div
          class="slider-value"
          :style="{ width: width + 'px', left: drag1.left + 'px' }"
        ></div>
        <div
          @mousedown="startDrag2"
          class="drag-2"
          :style="{ left: drag2.left + 'px' }"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
import 'vue-range-slider/dist/vue-range-slider.css'
import RangeSlider from 'vue-range-slider'
export default {
  name: 'SupplierDetSliderail',
  components: {
    RangeSlider
  },
  props: {
    SliderText: String
  },
  data () {
    return {
      min: '0',
      max: '100',
      minNumber: 0,
      maxNumber: 100,
      numberLeft: 0,
      numberRight: 0,
      sliderValue: 50,
      width: 0,
      drag1: {
        left: 0
      },
      drag2: {
        left: 200
      },

      dragging: false,
      dragging2: false,
      draggable: 0,
      disabledKeys: [8, 13, 16, 17, 18, 27, 37, 38, 39, 40, 91, 93]
    }
  },
  computed: {
    calcWidth () {
      return this.drag2.left - this.drag1.left + 5
    },
    isNumberKey (evt) {
      const charCode = evt.which ? evt.which : event.keyCode
      return !(charCode > 31 && (charCode < 48 || charCode > 57))
    }
  },
  created () {
    this.width = this.calcWidth
  },
  methods: {
    numberWithCommas (x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'")
    },
    setMin () {
      if (
        (/[0-9]|\./.test(String.fromCharCode(event.keyCode)) &&
          !event.shiftKey) ||
        this.disabledKeys.includes(event.keyCode)
      ) {
        const number = this.min.replace(/'/g, '')
        this.minNumber = Number(number)
        this.min = this.numberWithCommas(number)
      } else {
        this.min = this.min
          .replace(String.fromCharCode(event.keyCode).toLowerCase(), '')
          .replace(String.fromCharCode(event.keyCode), '')
      }
    },

    setMax () {
      if (
        (/[0-9]|\./.test(String.fromCharCode(event.keyCode)) &&
          !event.shiftKey) ||
        this.disabledKeys.includes(event.keyCode)
      ) {
        const number = this.max.replace(/ /g, '_').replace(/'/g, '')
        this.maxNumber = Number(number)
        this.max = this.numberWithCommas(number)
      } else {
        this.max = this.max
          .replace(String.fromCharCode(event.keyCode).toLowerCase(), '')
          .replace(String.fromCharCode(event.keyCode), '')
      }
    },

    startDrag () {
      this.dragging = true
      this.draggable = 1
    },

    startDrag2 () {
      this.dragging2 = true
      this.draggable = 2
    },
    stopDrag () {
      this.dragging = false
      this.draggable = 0
    },
    stopDrag2 () {
      this.dragging2 = false
      this.draggable = 0
    },

    doDrag (event) {
      if (this.dragging || this.dragging2) {
        if (this.draggable === 1 && this.drag1.left + 20 < this.drag2.left) {
          const newLeft = event.clientX - 100
          if (
            newLeft > 0 &&
            newLeft + 5 <=
            document.getElementById('slider-background').offsetWidth
          ) {
            this.width = this.calcWidth
            this.drag1.left = newLeft
            this.calcPercentLeft()
          }
        } else if (
          this.draggable === 2 &&
          this.drag2.left - 20 > this.drag1.left
        ) {
          const newLeft = event.clientX - 100
          if (
            newLeft > 0 &&
            newLeft + 5 <=
            document.getElementById('slider-background').offsetWidth
          ) {
            this.width = this.calcWidth
            this.drag2.left = newLeft
            this.calcPercentRight()
          }
        }
      }
    },
    calcPercentLeft () {
      this.numberLeft = 0
      const percent =
        (100 / document.getElementById('slider-background').offsetWidth) *
        this.drag1.left
      this.numberLeft =
        (this.maxNumber + this.minNumber) * (percent / 100).toFixed(4)
    },

    calcPercentRight () {
      this.numberRight = 0
      const percent =
        (100 / document.getElementById('slider-background').offsetWidth) *
        this.drag2.left
      this.numberRight =
        (this.maxNumber + this.minNumber) * (percent / 100).toFixed(4)
    }
  },
  mounted () {
    window.addEventListener('mouseup', this.stopDrag)
    window.addEventListener('mouseup', this.stopDrag2)
  },
  watch: {
  }
}

</script>
<style lang="scss" scoped>
.outercontainer {
  position: absolute;
  top: 70;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 100px;
  .slider-container {
    position: relative;
    .slider-content-container {
      position: relative;
      width: 100%;
      height: 10px;

      .slider-value-background {
        position: absolute;
        left: 0;
        display: block;
        width: 100%;
        border-radius: 5px;
        height: 25%;
        background: #9fb3c8;
      }
      .slider-value {
        position: absolute;
        left: 0;
        display: block;
        width: 25%;
        border-radius: 5px;
        height: 20%;
        background: #4098d7;
      }

      .drag-1,
      .drag-2 {
        position: absolute;
        top: 25%;
        height: 20px;
        width: 20px;
        border-radius: 50%;
        z-index: 2;
        transform: translateY(-50%);
        cursor: pointer;
      }

      .drag-1 {
        left: 100px;
        background-color: white;
        border-color: #d9e2e3;
        border-width: 1px;
      }

      .drag-2 {
        left: 150px;
        background-color: white;
        border-color: #d9e2e3;
        border-width: 1px;
      }
    }
  }
}

</style>
