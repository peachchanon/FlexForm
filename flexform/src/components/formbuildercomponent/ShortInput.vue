<template>
  <div
      class="tw-flex tw-flex-row"
      :class="{
    'tw-flex-row': dataShortInput.ShortInputAlignment === 'left',
    'tw-flex-col': dataShortInput.ShortInputAlignment === 'top'
      }"
  >
    <div 
        :class="{
      'tw-w-2/5': dataShortInput.ShortInputAlignment === 'left',
      'tw-w-full': dataShortInput.ShortInputAlignment === 'top'
        }"
    >
      <div
          :class="{
        'base-padding tw-my-4': dataShortInput.ShortInputAlignment === 'left',
        'tw-mx-4 tw-mt-2': dataShortInput.ShortInputAlignment === 'top'
          }"
      >
        <span class="medium16 grey10">{{dataShortInput.ShortInputLabelText}}</span>
        <span
            class="red5 tw-mx-1"
            v-if="dataShortInput.ShortInputRequired"
        >*</span>
      </div>
    </div>
    <div class="base-padding tw-flex tw-flex-col"
         :class="{
      'tw-w-3/5': dataShortInput.ShortInputAlignment === 'left',
      'tw-w-full': dataShortInput.ShortInputAlignment === 'top'
        }"
    >
      <!-- Alphabetic Type -->
      <div
          v-if="dataShortInput.ShortInputValidation==='Alphabetic'"
          class="tw-w-full tw-flex tw-flex-col tw-items-end widthBox"
          :class="{
            'tw-visible': dataShortInput.ShortInputRequired || valueShortInput.Text.length<=0,
            'tw-invisible': !dataShortInput.ShortInputRequired || valueShortInput.Text.length>0
          }"
          :style="widthStyle"
      >
        <span class="light14 red5">Please fill out this field.</span>
      </div>
      <input 
          v-if="dataShortInput.ShortInputValidation==='Alphabetic'" 
          type="text"
          :placeholder="dataShortInput.ShortInputPlaceholder"
          :class="[dataShortInput.ShortInputFontColor,dataShortInput.ShortInputInputBgColor,borderStyle]"
          class="input__style error base-padding radius10px tw-w-full tw-border-2"
          :style="[fontSizeStyle,widthStyle]"
          :disabled="dataShortInput.ShortInputReadOnly"
          v-model="valueShortInput.Text"
          @input="doInput"
          :maxlength="dataShortInput.ShortInputCharacterLimitValue"
      >
      <!-- Numeric Type -->
      <div
          v-if="dataShortInput.ShortInputValidation==='Numeric'"
          class="tw-w-full tw-flex tw-flex-col tw-items-end widthBox"
          :class="{
        'tw-visible': dataShortInput.ShortInputRequired || valueShortInput.Number.length<=0,
        'tw-invisible': !dataShortInput.ShortInputRequired || valueShortInput.Number.length>0
          }"
          :style="widthStyle"
      >
        <span class="light14 red5">Please fill out this field.</span>
      </div>
      <input
          v-if="dataShortInput.ShortInputValidation==='Numeric'"
          type="number"
          :placeholder="dataShortInput.ShortInputPlaceholder"
          :class="[dataShortInput.ShortInputFontColor,dataShortInput.ShortInputInputBgColor,borderStyle]"
          class="input__style base-padding radius10px tw-w-full tw-border-2"
          :style="[fontSizeStyle,widthStyle]"
          :disabled="dataShortInput.ShortInputReadOnly"
          v-model="valueShortInput.Number"
          @input="doInput"
          :maxlength="dataShortInput.ShortInputCharacterLimitValue"
      >
      <!-- Email Type -->
      <div
          v-if="dataShortInput.ShortInputValidation==='Email'"
          class="tw-w-full tw-flex tw-flex-col tw-items-end widthBox"
          :class="{
        'tw-visible': dataShortInput.ShortInputRequired || valueShortInput.Text.length<=0,
        'tw-invisible': !dataShortInput.ShortInputRequired || valueShortInput.Text.length>0
          }"
          :style="widthStyle"
      >
        <span class="light14 red5">Please fill out this field.</span>
      </div>
      <input
          v-if="dataShortInput.ShortInputValidation==='Email'"
          type="email"
          :placeholder="dataShortInput.ShortInputPlaceholder"
          :class="[dataShortInput.ShortInputFontColor,dataShortInput.ShortInputInputBgColor,borderStyle]"
          class="input__style base-padding radius10px tw-w-full tw-border-2"
          :style="[fontSizeStyle,widthStyle]"
          :disabled="dataShortInput.ShortInputReadOnly"
          v-model="valueShortInput.Text"
          @input="doInput"
          :maxlength="dataShortInput.ShortInputCharacterLimitValue"
      >
      <!-- URL Type -->
      <div
          v-if="dataShortInput.ShortInputValidation==='URL'"
          class="tw-w-full tw-flex tw-flex-col tw-items-end widthBox "
          :class="{
        'tw-visible': dataShortInput.ShortInputRequired || valueShortInput.Text.length<=0,
        'tw-invisible': !dataShortInput.ShortInputRequired || valueShortInput.Text.length>0
          }"
          :style="widthStyle"
      >
        <span class="light14 red5">Please fill out this field.</span>
      </div>
      <input
          v-if="dataShortInput.ShortInputValidation==='URL'"
          type="url"
          :placeholder="dataShortInput.ShortInputPlaceholder"
          :class="[dataShortInput.ShortInputFontColor,dataShortInput.ShortInputInputBgColor,borderStyle]"
          class="input__style base-padding radius10px tw-w-full tw-border-2"
          :style="[fontSizeStyle,widthStyle]"
          :disabled="dataShortInput.ShortInputReadOnly"
          v-model="valueShortInput.Text"
          @input="doInput"
          :maxlength="dataShortInput.ShortInputCharacterLimitValue"
      >
      <div class="tw-flex tw-flex-row tw-justify-between">
        <span class="tw-ml-1 light14 grey5">{{dataShortInput.ShortInputSubLabelText}}</span>
        <span 
            v-if="dataShortInput.ShortInputCharacterLimit" 
            class="tw-ml-1 light14 grey5"
            :class="{
              'red5': valueShortInput.Text.length >= dataShortInput.ShortInputCharacterLimitValue,
              'grey5': valueShortInput.Text.length < dataShortInput.ShortInputCharacterLimitValue,
            }"
        >{{valueShortInput.Text.length}}/{{dataShortInput.ShortInputCharacterLimitValue}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShortInput",
  props: {
    dataShortInput: {
      ShortInputLabelText: String,
      ShortInputSubLabelText: String,
      ShortInputAlignment: String,
      ShortInputRequired: Boolean,
      ShortInputPlaceholder: String,
      ShortInputFixWidth: Boolean,
      ShortInputWidth: Number,
      ShortInputReadOnly: Boolean,
      ShortInputCharacterLimit: Boolean,
      ShortInputCharacterLimitValue: Number,
      ShortInputValidation: String,
      ShortInputFontColor: String,
      ShortInputInputBgColor: String,
      ShortInputBorderColor: String,
      ShortInputLabelFontSize: Number,
    },
    dataInput:{
      FormId: String,
      SectionId: String,
      ComponentId: String,
    }
  },
  emits: ['valueShortInput'],
  data() {
    return {
      valueShortInput: {
        Text: '',
        Number: 0,
      }
    }
  },
  computed: {
    fontSizeStyle() {
      return {
        '--font-size': this.dataShortInput.ShortInputLabelFontSize+'px'
      }
    },
    widthStyle() {
      if(!this.dataShortInput.ShortInputFixWidth){
        return {
          '--input-width': this.dataShortInput.ShortInputWidth+'px',
        }
      } else {
        return {
          '--input-width': '100%',
        }
      }
    },
    borderStyle() {
      if(this.dataShortInput.ShortInputRequired) {
        // String
        if(this.valueShortInput.Text.length<=0)
          return 'tw-border-red5'
        else if(this.valueShortInput.Text.length>0)
          return 'tw-border-'+this.dataShortInput.ShortInputBorderColor
        // Number
        else if(this.valueShortInput.Number.length<=0)
          return 'tw-border-red5'
        else
          return 'tw-border-'+this.dataShortInput.ShortInputBorderColor
      }
      else
        return 'tw-border-'+this.dataShortInput.ShortInputBorderColor
    }
  },
  methods: {
    doInput() {
      if(this.dataShortInput.ShortInputValidation === 'Alphabetic') {
        this.$emit('valueShortInput',{value:this.valueShortInput.Text,dataInput:this.dataInput})
      } else if(this.dataShortInput.ShortInputValidation === 'Numeric') {
        this.$emit('valueShortInput',{value:~~this.valueShortInput.Number,dataInput:this.dataInput})
      } else if(this.dataShortInput.ShortInputValidation === 'Email') {
        this.$emit('valueShortInput',{value:this.valueShortInput.Text,dataInput:this.dataInput})
      } else if(this.dataShortInput.ShortInputValidation === 'URL') {
        this.$emit('valueShortInput',{value:this.valueShortInput.Text,dataInput:this.dataInput})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.widthBox {
  width: var(--input-width);
}
.input__style {
  font-size: var(--font-size);
  width: var(--input-width);
}
.input__style:focus {
  border: 2px solid $blue5;
  outline: none !important;
}
</style>