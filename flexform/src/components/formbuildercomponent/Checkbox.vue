<template>
  <div class="tw-ml-2.5" :style="cssCheckboxDisplay">
    <div class="card">
    <checkbox
        v-for="(item,id) in list"
        :key="id"
        :value="item.check"
        :checked="item.checked"
        :disabled="item.disable"
        :color="item.color"
        :fontSize="item.fontsize">{{ item.check }}
    </checkbox>
  </div>
  </div>
</template>

<script>
import Checkbox from 'vue-material-checkbox'
export default {
  name: "Choice",
  components: {
    Checkbox
  },
  props: {
    item: String,
    list: [],
    checkboxDisplay: {
      type: String,
      default: " "
    },
  },
  data() {
    return {
      
    }
  },
  computed: {
    cssCheckboxDisplay(){
      if(this.checkboxDisplay === "flex"){
        return{
          '--checkbox-display': this.checkboxDisplay
        }
    }
      else
        return{
        
        }
    }
  }
}
</script>

<style lang="scss" scoped>
.card{
  display: var(--checkbox-display);
}
</style>