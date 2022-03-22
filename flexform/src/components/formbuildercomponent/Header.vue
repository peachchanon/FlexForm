<template>
  <div class="tw-flex tw-flex-col" :class="componentStyle">
    <span 
        :style="headingStyle"
        :class="['heading__theme',data.HeadingFontColor]"
    >
      {{data.HeadingText}}
    </span>
    <span
        :style="subheadingStyle"
        :class="['subheading__theme',data.SubheadingFontColor]"
    >
      {{data.SubheadingText}}
    </span>
    <!--
    <input type="text" class="base-padding tw-items-center"
           :placeholder="placeholder"
    :class="[fontColor]"
    :style="{fontSize: fontSize + 'px'}" v-model="valueString"
    @input="doString"> -->
  </div> 
</template>

<script>
export default {
  props: {
    HText: String,
    fontColor: String,
    fontSize: String,
    placeholder: String,
    propName: String,
    
    data: {
      HeadingText: String,
      SubheadingText: String,
      Alignment: String,
      HeadingFontColor: String,
      HeadingFontSize: Number,
      SubheadingFontColor: String,
      SubheadingFontSize: Number,
    }
    
  },
  data() {
    return {
      
    }
  },

  computed: {
    componentStyle() {
      if(this.data.Alignment === 'left')
        return 'tw-items-start'
      else if(this.data.Alignment === 'center')
        return 'tw-items-center'
      else{
        return 'tw-items-end'
      }
    },
    headingStyle() {
      return {
        '--heading--font--size': this.data.HeadingFontSize+'px',
      }
    },
    subheadingStyle() {
      return {
        '--subheading--font--size': this.data.SubheadingFontSize+'px',
      }
    }
  },
  methods: {
    doString() {
      console.log(this.valueString)
      if(this.valueString === '') {
        this.$emit('callBackString', this.placeholder)
      } else {
        this.$emit('callBackString', this.valueString)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.component__theme {
  
}
.heading__theme {
  font-size: var(--heading--font--size);
  font-weight: 700;
}
.subheading__theme {
  font-size: var(--subheading--font--size);
  font-weight: 500;
}


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