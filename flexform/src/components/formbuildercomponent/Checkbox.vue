<template>
  <div class="tw-ml-2.5" :style="cssCheckboxDisplay">
    <div class="card" :class="['tw-text-'+fontColor]">
      <checkbox
          v-for="(item,id) in list"
          :key="id"
          :value="item.check"
          :checked="item.checked"
          :disabled="disabled"
          :fontSize="item.fontsize"
          @change="onChangeOption(id)"
      >{{item.title}}
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
    fontColor: String,
    disabled: {
      type: Boolean,
      default: true
    },
    checkboxDisplay: {
      type: String,
      default: ""
    },
  },
  emits: ['callbackOption'],
  data() {
    return {
      optionList: []
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
        return{}
    }
  },
  mounted() {
    this.list.forEach(
        (option,index) => {
          this.optionList.push(
              {
                index: index,
                value: option.title,
                checked: false
              }
          )
        }
    )
  },
  methods: {
    onChangeOption(index) {
      this.optionList[index].checked = true
      let newOptions = new Array()
      this.optionList.filter(item => item.checked).forEach(
          (obj) => {
            newOptions.push(obj.value)
          }
      )
      this.$emit('callbackOption',newOptions)
    }
  }
}
</script>

<style lang="scss" scoped>
.card{
  display: var(--checkbox-display);
}
</style>