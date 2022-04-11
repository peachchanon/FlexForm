<template>
  <div :style="[widthStyle,fontSizeStyle]" class="paragraph__style base-padding" :class="[alignmentStyle,dataParagraph.FontColor,]">
    <span>{{dataParagraph.LabelText}}</span>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    dataParagraph: {
      LabelText: String,
      Alignment: String,
      FixWidth: Boolean,
      Width: Number,
      FontColor: String,
      FontSize: Number,
    }
  },
  computed:{
    widthStyle(){
      if(this.dataParagraph.FixWidth === true) {
        return {'--width': '100%'}
      } else {
        return {'--width': this.dataParagraph.Width+'px'}
      }
    },
    alignmentStyle(){
      if(this.dataParagraph.Alignment === 'left')
        return 'tw-text-left'
      else if(this.dataParagraph.Alignment === 'center')
        return 'tw-text-center'
      else{
        return 'tw-text-right'
      }
    },
    fontSizeStyle(){
      return {
        '--font-size': this.dataParagraph.FontSize+'px',
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.paragraph__style{
  width: var(--width);
  font-size: var(--font-size);
}
</style>