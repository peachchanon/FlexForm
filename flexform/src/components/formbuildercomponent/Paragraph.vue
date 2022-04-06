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
      Width: String,
      FontColor: String,
      FontSize: Number,
    }
  },
  computed:{
    widthStyle(){
      if(this.dataParagraph.Width !== 'full'){
        return {
          '--dropdown-width': this.dataParagraph.Width+'px',
        }
      } else {
        return {
          '--dropdown-width': '100%',
        }
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
  width: var(--dropdown-width);
  font-size: var(--font-size);
}
</style>