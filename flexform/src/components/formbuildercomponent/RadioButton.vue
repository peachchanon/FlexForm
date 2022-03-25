<template>
  <div class="card" :style="cssRadioButtonFlex">
    <div v-for="(option,index) in option" :key="index">
      <span class="radio-button-label" :style="cssRadioButtonLabel">
        <input type="radio"
               class="styled-radio-button"
               :id="index"
               :style="cssRadioButton"
               name="option-selected"
               :value="option.value"
               @change="onChangeOption(option.id, $event)">{{ option.title }}
      </span>
    </div>
  </div>
</template>

<script>

export default {
  name: "RadioButton",
  components: {},
  props: {
    option: [],
    radioBdColor: {
      type: String,
      default: "#4098D7"
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
  data() {
    return {
    }
  },
  methods: {
    onChangeOption(id, $event) {
      this.option.forEach(option => {
        if (option.id === id) {
          this.$set(option, 'value', $event.target.checked);
        } else {
          this.$set(option, 'value', false)
        }
      })
    }
  },
  computed: {
    cssRadioButton() {
      return {
        '--radio-borderColor': this.radioBdColor
      }
    },
    cssRadioButtonLabel() {
      return {
        '--radio-labelFontSize': this.radioLabelFontSize + "px"
      }
    },
    cssRadioButtonFlex(){
      return {
        '--radio-flexDirection': this.radioFlexDirection
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
}

.radio-button-label {
  cursor: pointer;
  color: #000;
  user-select: none;
  font-size: var(--radio-labelFontSize);
}

.radio-button-label:hover {
  color: #6A6464;
}

.styled-radio-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  border-radius: 50%;
  width: 18px;
  height: 18px;

  border: 3px solid #403D3B;
  transition: 0.2s all linear;
  margin-right: 7px;
  cursor: pointer;

  position: relative;
  top: 2px;
  left: 2px;
}

.styled-radio-button:checked {
  border-top-color: var(--radio-borderColor);
  border-right-color: var(--radio-borderColor);
  border-bottom-color: var(--radio-borderColor);
  border-left-color: var(--radio-borderColor);
}

.styled-radio-button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 8px;
  transition: 0.2s all linear;
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