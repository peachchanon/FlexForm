<template>
  <div>
    <input v-if="type === 'text'" type="text" :placeholder="placeholder" class="medium16 tw-w-full" v-model="valueString" @input="doString">
  </div>
</template>

<script>
export default {
  name: "BaseTextInputRenameFormBuilder.vue",
  data() {
    return {
      valueString: this.propName
    }
  },
  props: {
    propName: String,
    type: String,
    placeholder: String
  },
  methods: {
    doString() {
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
input{
  padding: 0.5rem 0;
  border-bottom: 2px solid $grey3;
  background-color: white;
  color: $grey5;
  transition: all .1s ease-in;
}
input:focus{
  border-bottom: 2px solid $blue10;
  background-color: white;
  color: $blue10;
  outline: none !important;
}
</style>