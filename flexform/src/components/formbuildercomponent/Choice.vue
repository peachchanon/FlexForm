<template>
  <div class="base-padding">
    <div class="tw-mb-2">
      <span class="medium16 grey10">{{dataChoice.LabelText}}</span>
      <span
          class="red5 tw-mx-1"
          v-if="dataChoice.Required"
      >*</span>
    </div>
    <div class="tw-flex tw-flex-col tw-justify-end">
      <div
          class="tw-w-full tw-flex tw-flex-col tw-items-end widthBox "
          :class="{
        'tw-visible': dataChoice.Required || valueChoice.Text==='',
        'tw-invisible': !dataChoice.Required || valueChoice.Text!==''
          }"
      >
        <span class="light14 red5">Please selected this field.</span>
      </div>
    </div>
    <!-- Radio -->
    <radio-component
        v-if="!dataChoice.MultipleChoice"
        :option="doOptions"
        :radioLabelFontSize="dataChoice.LabelFontSize"
        :radioLabelFontColor="dataChoice.FontColor"
        :radioBdColor="dataChoice.BorderColor"
        :radioFlexDirection="doColumn"
        :radioDisabled="dataChoice.ReadOnly"
        @callbackOption="doClickOption"
    ></radio-component>
    <!-- Choice -->
    <checkbox-component
        v-if="dataChoice.MultipleChoice"
        :list="doOptions"
        :fontColor="dataChoice.FontColor"
        :disabled="dataChoice.ReadOnly"
        @callbackOption="doClickOption"
    ></checkbox-component>
    <div class="tw-mb-2 tw-w-full tw-flex tw-flex-col tw-items-end">
      <span class="light14 grey5">{{dataChoice.SubLabelText}}</span>
    </div>
  </div>
</template>

<script>
import RadioComponent from '@/components/formbuildercomponent/RadioButton'
import CheckboxComponent from '@/components/formbuildercomponent/Checkbox'

export default {
  name: "Choice",
  components: {
    RadioComponent,
    CheckboxComponent,
  },
  props: {
    dataChoice: {
      MultipleChoice: Boolean,
      LabelText: String,
      SubLabelText: String,
      Required: Boolean,
      ReadOnly: Boolean,
      SpreadToColumns: Boolean,
      PredefinedOptions: String,
      Options: Array,
      FontColor: String,
      BorderColor: String,
      LabelFontSize: Number,
    },
    dataInput:{
      FormId: String,
      SectionId: String,
      ComponentId: String,
    }
  },
  emits: ['valueChoice',],
  data() {
    return {
      Gender:['Male','Female'],
      Days:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
      Months:["January","February","March","April","May","June","July","August","September","October","November","December"],
      valueChoice: {
        Text: '',
        Index: Number,
      }
    }
  },
  computed: {
    doOptions() {
      let NewOptions = new Array
      this.dataChoice.Options.forEach( (element) => NewOptions.push({title: element}))
      return NewOptions
    },
    doColumn() {
      if(this.dataChoice.SpreadToColumns){
        return 'row'
      }
      else{
        return 'column'
      }
    },
  },
  methods: {
    doClickOption(element){
      if(!this.dataChoice.MultipleChoice){
        this.$emit('valueChoice',{value:[element.value],index:element.index,dataInput:this.dataInput})
      }else {
        this.$emit('valueChoice',{value:element,dataInput:this.dataInput})
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>