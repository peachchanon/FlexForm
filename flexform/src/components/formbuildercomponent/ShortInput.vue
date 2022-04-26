<template>
  <div
      class="tw-flex tw-flex-row"
      :class="{
    'tw-flex-row': dataShortInput.Alignment === 'left',
    'tw-flex-col': dataShortInput.Alignment === 'top'
      }"
  >
    <div 
        :class="{
      'tw-w-2/5': dataShortInput.Alignment === 'left',
      'tw-w-full': dataShortInput.Alignment === 'top'
        }"
    >
      <div
          :class="{
        'base-padding tw-my-4': dataShortInput.Alignment === 'left',
        'tw-mx-4 tw-mt-2': dataShortInput.Alignment === 'top'
          }"
      >
        <span class="medium16 grey10">{{dataShortInput.LabelText}}</span>
        <span
            class="red5 tw-mx-1"
            v-if="dataShortInput.Required"
        >*</span>
      </div>
    </div>
    <div class="base-padding tw-flex tw-flex-col"
         :class="{
      'tw-w-3/5': dataShortInput.Alignment === 'left',
      'tw-w-full': dataShortInput.Alignment === 'top'
        }"
    >
      <!-- Alphabetic Type -->
      <div
          v-if="dataShortInput.Validation==='Alphabetic'"
          class="tw-w-full tw-flex tw-flex-col tw-items-end widthBox"
          :class="{
            'tw-visible': dataShortInput.Required || valueShortInput.Text.length<=0,
            'tw-invisible': !dataShortInput.Required || valueShortInput.Text.length>0
          }"
          :style="widthStyle"
      >
        <span class="light14 red5">Please fill out this field.</span>
      </div>
      <input 
          v-if="dataShortInput.Validation==='Alphabetic'" 
          type="text"
          :placeholder="dataShortInput.Placeholder"
          :class="[dataShortInput.FontColor,dataShortInput.InputBgColor,borderStyle]"
          class="input__style error base-padding radius10px tw-w-full tw-border-2"
          :style="[fontSizeStyle,widthStyle]"
          :disabled="dataShortInput.ReadOnly"
          v-model="valueShortInput.Text"
          @input="doInput"
          :maxlength="dataShortInput.CharacterLimitValue"
      >
      <!-- Numeric Type -->
      <div
          v-if="dataShortInput.Validation==='Numeric'"
          class="tw-w-full tw-flex tw-flex-col tw-items-end widthBox"
          :class="{
        'tw-visible': dataShortInput.Required || valueShortInput.Number.length<=0,
        'tw-invisible': !dataShortInput.Required || valueShortInput.Number.length>0
          }"
          :style="widthStyle"
      >
        <span class="light14 red5">Please fill out this field.</span>
      </div>
      <input
          v-if="dataShortInput.Validation==='Numeric'"
          type="number"
          :placeholder="dataShortInput.Placeholder"
          :class="[dataShortInput.FontColor,dataShortInput.InputBgColor,borderStyle]"
          class="input__style base-padding radius10px tw-w-full tw-border-2"
          :style="[fontSizeStyle,widthStyle]"
          :disabled="dataShortInput.ReadOnly"
          v-model="valueShortInput.Number"
          @input="doInput"
          :maxlength="dataShortInput.CharacterLimitValue"
      >
      <!-- Email Type -->
      <div
          v-if="dataShortInput.Validation==='Email'"
          class="tw-w-full tw-flex tw-flex-col tw-items-end widthBox"
          :class="{
        'tw-visible': dataShortInput.Required || valueShortInput.Text.length<=0,
        'tw-invisible': !dataShortInput.Required || valueShortInput.Text.length>0
          }"
          :style="widthStyle"
      >
        <span class="light14 red5">Please fill out this field.</span>
      </div>
      <input
          v-if="dataShortInput.Validation==='Email'"
          type="email"
          :placeholder="dataShortInput.Placeholder"
          :class="[dataShortInput.FontColor,dataShortInput.InputBgColor,borderStyle]"
          class="input__style base-padding radius10px tw-w-full tw-border-2"
          :style="[fontSizeStyle,widthStyle]"
          :disabled="dataShortInput.ReadOnly"
          v-model="valueShortInput.Text"
          @input="doInput"
          :maxlength="dataShortInput.CharacterLimitValue"
      >
      <!-- URL Type -->
      <div
          v-if="dataShortInput.Validation==='URL'"
          class="tw-w-full tw-flex tw-flex-col tw-items-end widthBox "
          :class="{
        'tw-visible': dataShortInput.Required || valueShortInput.Text.length<=0,
        'tw-invisible': !dataShortInput.Required || valueShortInput.Text.length>0
          }"
          :style="widthStyle"
      >
        <span class="light14 red5">Please fill out this field.</span>
      </div>
      <input
          v-if="dataShortInput.Validation==='URL'"
          type="url"
          :placeholder="dataShortInput.Placeholder"
          :class="[dataShortInput.FontColor,dataShortInput.InputBgColor,borderStyle]"
          class="input__style base-padding radius10px tw-w-full tw-border-2"
          :style="[fontSizeStyle,widthStyle]"
          :disabled="dataShortInput.ReadOnly"
          v-model="valueShortInput.Text"
          @input="doInput"
          :maxlength="dataShortInput.CharacterLimitValue"
      >
      <div class="tw-flex tw-flex-row tw-justify-between">
        <span class="tw-ml-1 light14 grey5">{{dataShortInput.SubLabelText}}</span>
        <span 
            v-if="dataShortInput.CharacterLimit" 
            class="tw-ml-1 light14 grey5"
            :class="{
              'red5': valueShortInput.Text.length >= dataShortInput.CharacterLimitValue,
              'grey5': valueShortInput.Text.length < dataShortInput.CharacterLimitValue,
            }"
        >{{valueShortInput.Text.length}}/{{dataShortInput.CharacterLimitValue}}
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
      LabelText: String,
      SubLabelText: String,
      Alignment: String,
      Required: Boolean,
      Placeholder: String,
      FixWidth: Boolean,
      Width: Number,
      ReadOnly: Boolean,
      CharacterLimit: Boolean,
      CharacterLimitValue: Number,
      Validation: String,
      FontColor: String,
      InputBgColor: String,
      BorderColor: String,
      LabelFontSize: Number,
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
        '--font-size': this.dataShortInput.LabelFontSize+'px'
      }
    },
    widthStyle() {
      if(!this.dataShortInput.FixWidth){
        return {
          '--input-width': this.dataShortInput.Width+'px',
        }
      } else {
        return {
          '--input-width': '100%',
        }
      }
    },
    borderStyle() {
      if(this.dataShortInput.Required) {
        // String
        if(this.valueShortInput.Text.length<=0)
          return 'tw-border-red5'
        else if(this.valueShortInput.Text.length>0)
          return 'tw-border-'+this.dataShortInput.BorderColor
        // Number
        else if(this.valueShortInput.Number.length<=0)
          return 'tw-border-red5'
        else
          return 'tw-border-'+this.dataShortInput.BorderColor
      }
      else
        return 'tw-border-'+this.dataShortInput.BorderColor
    }
  },
  methods: {
    doInput() {
      if(this.dataShortInput.Validation === 'Alphabetic') {
        this.$emit('valueShortInput',{value:this.valueShortInput.Text,dataInput:this.dataInput})
      } else if(this.dataShortInput.Validation === 'Numeric') {
        this.$emit('valueShortInput',{value:~~this.valueShortInput.Number,dataInput:this.dataInput})
      } else if(this.dataShortInput.Validation === 'Email') {
        this.$emit('valueShortInput',{value:this.valueShortInput.Text,dataInput:this.dataInput})
      } else if(this.dataShortInput.Validation === 'URL') {
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