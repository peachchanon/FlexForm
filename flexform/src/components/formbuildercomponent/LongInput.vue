<template>
  <div
      class="tw-flex tw-flex-row"
      :class="{
    'tw-flex-row': dataLongInput.Alignment === 'left',
    'tw-flex-col': dataLongInput.Alignment === 'top'
      }"
  >
    <div
        :class="{
      'tw-w-2/5': dataLongInput.Alignment === 'left',
      'tw-w-full': dataLongInput.Alignment === 'top'
        }"
    >
      <div
          :class="{
        'base-padding tw-my-4': dataLongInput.Alignment === 'left',
        'tw-mx-4 tw-mt-2': dataLongInput.Alignment === 'top'
          }"
      >
        <span class="medium16 grey10">{{dataLongInput.LabelText}}</span>
        <span
            class="red5 tw-mx-1"
            v-if="dataLongInput.Required"
        >*</span>
      </div>
    </div>
    <div class="base-padding tw-flex tw-flex-col"
         :class="{
      'tw-w-3/5': dataLongInput.Alignment === 'left',
      'tw-w-full': dataLongInput.Alignment === 'top'
        }"
    >
      <div
          v-if="dataLongInput.Validation==='URL'"
          class="tw-w-full tw-flex tw-flex-col tw-items-end widthBox "
          :class="{
        'tw-visible': dataLongInput.Required || valueLongInput.Text.length<=0,
        'tw-invisible': !dataLongInput.Required || valueLongInput.Text.length>0
          }"
          :style="widthStyle"
      >
        <span class="light14 red5">Please fill out this field.</span>
      </div>
      <textarea
          :placeholder="dataLongInput.Placeholder"
          :class="[dataLongInput.FontColor,dataLongInput.InputBgColor,'tw-border-'+dataLongInput.BorderColor]"
          class="input__style base-padding radius10px tw-w-full tw-border-2"
          :style="[fontSizeStyle,widthStyle]"
          style="height: 100px"
          :disabled="dataLongInput.ReadOnly"
          v-model="valueLongInput.Text"
          @input="doInput"
          :maxlength="dataLongInput.CharacterLimitValue"
      ></textarea>
      <div class="tw-flex tw-flex-row tw-justify-between">
        <span class="tw-ml-1 light14 grey5">{{dataLongInput.SubLabelText}}</span>
        <span
            v-if="dataLongInput.CharacterLimit"
            class="tw-ml-1 light14 grey5"
            :class="{
              'red5': valueLongInput.Text.length >= dataLongInput.CharacterLimitValue,
              'grey5': valueLongInput.Text.length < dataLongInput.CharacterLimitValue,
            }"
        >{{valueLongInput.Text.length}}/{{dataLongInput.CharacterLimitValue}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LongInput",
  props: {
    dataLongInput: {
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
      FontColor: String,
      InputBgColor: String,
      BorderColor: String,
      LabelFontSize: Number,
    },
  },
  emits: ['valueLongInput'],
  data() {
    return {
      valueLongInput: {
        Text: '',
      }
    }
  },
  computed: {
    fontSizeStyle() {
      return {
        '--font-size': this.dataLongInput.LabelFontSize+'px'
      }
    },
    widthStyle() {
      if(!this.dataLongInput.FixWidth){
        return {
          '--input-width': this.dataLongInput.Width+'px',
        }
      } else {
        return {
          '--input-width': '100%',
        }
      }
    }
  },
  methods: {
    doInput() {
      this.$emit('valueLongInput',this.valueLongInput.Text)
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
  width: var(--input-width)
}
.input__style:focus {
  border: 2px solid $blue5;
  outline: none !important;
}
</style>