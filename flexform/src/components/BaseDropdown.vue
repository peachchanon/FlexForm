<template>
  <div>
    <select class="medium16 base-padding radius10px tw-w-full" v-model="valueOptions">
      <option value="" disabled hidden>{{placeholder}}</option>
      <option v-for="item in optionsList" :key="item.option">{{item.option}}</option>
    </select>
  </div>
</template>

<script>
export default {
  data () {
    return {
      valueOptions: ''
    }
  },
  props: {
    placeholder: String,
    optionsList: {
      option: String
    }
  },
  watch: {
    valueOptions () {
      this.$emit('valueSelected', this.valueOptions)
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
select{
  border: 1px solid white;
  background-color: $grey1;
  color: $grey5;
  transition: all .1s ease-in;
}
select:focus{
  border: 1px solid $blue5;
  background-color: white;
  color: $grey10;
  outline: none !important;
}
</style>
