<template>
  <div>
    <form class="search-container tw-flex">
      <input type="text" placeholder="Search" class="input medium14 radius10px tw-pl-50" style="width:400px" v-model="InputSearchbar"
             @keyup="doString">
     <div class="search-icon ">
      <Icon class="icon semibold24 blue10" icon="heroicons-outline:search"/>
     </div>
    </form>
  </div>
</template>

<script>
import {Icon} from "@iconify/vue2/dist/iconify";
export default {
  components: {
    Icon
  },
  emits: ['callBackString'],
  data() {
    return {
      InputSearchbar: this.propValue,
    }
  },
  props: {
    propValue: String,
  },
  methods: {
    doString() {
      this.$emit('callBackString', this.InputSearchbar)
    }
  }
}
</script>

<style lang="scss" scoped>
input{
  font-size: 0.5rem;
  border: 1px solid $blue10;
  outline: none;
  background-color: #F0F4F8;
  padding: 10px 10px 10px 40px;
  &:focus{
    border: 1px solid $blue5;
    transition: 0.35s ease;
    color: black;
    background-color: white;
  }
}
.search-icon{
  //display: inline-block;
  margin-top: 8px;
  margin-left: 10px;
  position: absolute;
}

</style>