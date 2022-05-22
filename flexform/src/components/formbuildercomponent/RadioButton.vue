<template>
  <div class="card" :style="cssRadioButtonFlex">
    <div v-for="(option,index) in option" :key="index" :class="{'tw-w-full': radioFlexDirection==='column','tw-w-80': radioFlexDirection==='row'}">
      <div class="radio-button-label tw-flex tw-flex-row tw-items-center tw-py-2">
        <div>
          <input
              type="radio"
              class="styled-radio-button"
              :id="index"
              :style="cssRadioButton"
              name="option-selected"
              :value="option.value"
              @change="onChangeOption(option.id, $event, index)"
              :disabled="radioDisabled"
          >
        </div>
        <span class="tw-ml-3 tw-mr-1 radio-font-size" :style="cssRadioButtonLabel" :class="[radioLabelFontColor]">{{option.title}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RadioButton",
  components: {},
  props: {
    option: [],
    radioDisabled:{
      type: Boolean,
      default: false
    },
    radioBdColor: {
      type: String,
      default: "grey5"
    },
    radioLabelFontColor: {
      type: String,
      default: "grey10"
    },
    radioLabelFontSize: {
      type: Number,
      default: 16
    },
    radioFlexDirection: {
      type: String,
      default: "column"
    },
  },
  emits: ['callbackOption'],
  data() {
    return {
    }
  },
  methods: {
    onChangeOption(id, $event, index) {
      this.option.forEach(option => {
        if (option.id === id) {
          this.$set(option, 'value', $event.target.checked);
        } else {
          this.$set(option, 'value', false)
        }
      })
      this.$emit('callbackOption',{value:this.option[index].title,index:index})
    }
  },
  computed: {
    cssRadioButton() {
      return {
        '--radio-borderColor': '$'+this.radioBdColor
      }
    },
    cssRadioButtonLabel() {
      return {
        '--radio-labelFontSize': this.radioLabelFontSize + "px"
      }
    },
    cssRadioButtonFlex(){
      if(this.radioFlexDirection === 'column'){
        return {
          '--radio-flexDirection': this.radioFlexDirection,
          '--radio-flexWrap': 'nowrap'
        }
      }else {
        return {
          '--radio-flexDirection': this.radioFlexDirection,
          '--radio-flexWrap': 'wrap'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  width: 100%;
  flex-direction: var(--radio-flexDirection);
  flex-wrap: var(--radio-flexWrap);
}
.radio-button-label {
  cursor: pointer;
  color: $blue5;
  user-select: none;
}
.radio-font-size{
  font-size: var(--radio-labelFontSize);
}
.styled-radio-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  border: 3px solid $blue8;
  transition: 0.2s all ease-in-out;
  cursor: pointer;
  position: relative;
  top: 2px;
  left: 2px;
}
.styled-radio-button:checked {
  border-color: var(--radio-borderColor);
}
.styled-radio-button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 12px;
  height: 12px;
  transition: 0.2s all ease-in-out;
  background-color: transparent;
  border-radius: 50%;
}
.styled-radio-button:hover::before {
  background-color: $blue8;
}
.styled-radio-button:checked::before {
  background-color: $blue5;
}
</style>