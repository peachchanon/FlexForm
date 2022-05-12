<template>
  <div
      class="tw-flex tw-flex-row"
      :class="{
    'tw-flex-row': dataDropdown.Alignment === 'left',
    'tw-flex-col': dataDropdown.Alignment === 'top'
      }"
  >
    <div
        :class="{
      'tw-w-2/5': dataDropdown.Alignment === 'left',
      'tw-w-full': dataDropdown.Alignment === 'top'
        }"
    >
      <div
          :class="{
        'base-padding tw-my-4': dataDropdown.Alignment === 'left',
        'tw-mx-4 tw-mt-2': dataDropdown.Alignment === 'top'
          }"
      >
        <span class="medium16 grey10">{{dataDropdown.LabelText}}</span>
        <span
            class="red5 tw-mx-1"
            v-if="dataDropdown.Required"
        >*</span>
      </div>
    </div>
    <div class="base-padding tw-flex tw-flex-col"
         :class="{
      'tw-w-3/5': dataDropdown.Alignment === 'left',
      'tw-w-full': dataDropdown.Alignment === 'top'
        }"
    >
      <div class="dropdown__style" :style="widthStyle">
        <div
            class="tw-w-full tw-flex tw-flex-col tw-items-end widthBox "
            :class="{
        'tw-visible': dataDropdown.Required || valueDropdown.Text==='',
        'tw-invisible': !dataDropdown.Required || valueDropdown.Text!==''
          }"
            :style="widthStyle"
        >
          <span class="light14 red5">Please selected this field.</span>
        </div>
        <div class="dropdown__input__style tw-relative tw-flex tw-flex-row" @click="toggle()">
          <input
              readonly 
              :placeholder="dataDropdown.Placeholder" 
              class="base-padding radius10px tw-w-full tw-border-2 tw-cursor-pointer"
              :class="[dataDropdown.FontColor,dataDropdown.InputBgColor,borderStyle]"
              :style="[fontSizeStyle,widthStyle]" 
              :value="valueDropdown.Text"
          >
          <Icon class="medium14 tw-absolute tw-right-3 tw-top-1/3 tw-transition tw-ease-in-out" icon="fluent:triangle-16-filled" :class="{expanded : visible}"/>
        </div>
        <div 
            class="bg-white radius10px tw-w-full tw-relative"
            style="z-index: 1"
            :class="{hidden : !visible, visible}"
        >
          <ul v-if="dataDropdown.Options.length != 0" class="bg-white radius10px base-shadow tw-absolute tw-w-full tw-overflow-x-hidden" style="height: fit-content; max-height: 200px">
            <li 
                v-for="(element, index) in dataDropdown.Options" 
                :key="index"
                :class="[
                    dataDropdown.FontColor,
                    {
                      'bg-blue1 blue10': index===valueDropdown.Index,
                      '': index!==valueDropdown.Index
                    }
                    ]"
                class="base-padding tw-cursor-pointer radius10px dropdown__element__style tw-transition tw-ease-in-out"
                @click="clickElement(element, index)"
            >
              {{element}}
            </li>
          </ul>
          <ul v-if="dataDropdown.Options.length === 0" class="bg-white radius10px base-shadow tw-absolute tw-w-full">
            <li class="base-padding tw-cursor-pointer radius10px tw-transition tw-ease-in-out grey6" disabled>
              <i>None</i>
            </li>
          </ul>
        </div>
      </div>
      <span class="tw-ml-1 light14 grey5">{{dataDropdown.SubLabelText}}</span>
    </div>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue2'
export default {
  name: "dropdown",
  components: {
    Icon
  },
  emits: ['valueDropdown',],
  props: {
    dataDropdown: {
      LabelText: String,
      SubLabelText: String,
      Alignment: String,
      Required: Boolean,
      Placeholder: String,
      FixWidth: Boolean,
      Width: Number,
      ReadOnly: Boolean,
      PredefinedOptions: String,
      Options: Array,
      FontColor: String,
      InputBgColor: String,
      BorderColor: String,
      LabelFontSize: Number,
    },
    dataInput:{
      FormId: String,
      SectionId: String,
      ComponentId: String,
    },
  },
  data() {
    return {
      visible: false,
      valueDropdown: {
        Text: '',
        Index: Number,
      }
    }
  },
  computed: {
    fontSizeStyle() {
      return {
        '--font-size': this.dataDropdown.LabelFontSize+'px'
      }
    },
    widthStyle() {
      if(!this.dataDropdown.FixWidth){
        return {
          '--dropdown-width': this.dataDropdown.Width+'px',
        }
      } else {
        return {
          '--dropdown-width': '100%',
        }
      }
    },
    borderStyle() {
      if(this.dataDropdown.Required) {
        // String
        if(this.valueDropdown.Text==='')
            return 'tw-border-red5'
        // Number
        else if(this.valueDropdown.Number==='')
          return 'tw-border-red5'
        else
          return 'tw-border-'+this.dataDropdown.BorderColor
      }
      else
        return 'tw-border-'+this.dataDropdown.BorderColor
    }
  },
  mounted() {
    document.addEventListener('click', this.closeDropdown)
  },
  methods: {
    toggle() {
      if(!this.dataDropdown.ReadOnly)
        this.visible = !this.visible;
    },
    clickElement(element, index) {
      this.valueDropdown.Text = element
      this.valueDropdown.Index = index
      this.$emit('valueDropdown', {value:this.valueDropdown.Text,index:this.valueDropdown.Index,dataInput:this.dataInput,label:this.dataDropdown.LabelText})
      this.toggle();
    },
    closeDropdown(e) {
      if(!this.$el.contains(e.target)) {
        this.visible = false;
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.dropdown__style{
  width: var(--dropdown-width);
  .dropdown__input__style{
    input{
      font-size: var(--font-size);
      &:focus{
        outline: 2px solid $blue5;
      }
    }
    .expanded{
      transform: rotateZ(180deg) translateY(2px);
    }
  }
  .hidden{
    transition: all .1s ease-in-out;
    visibility: hidden;
  }
  .visible {
    transition: all .1s ease-in-out;
    visibility: visible;
  }
  .dropdown__element__style{
    &:hover{
      color: white;
      background-color: $blue5;
    }
  }
}
</style>