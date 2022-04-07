<template>
  <button
      @click="buttonClicked"
      class="button-back medium16 button-border tw-flex tw-justify-center tw-items-center"
  >
    <Icon class="icon semibold24" icon="heroicons-outline:chevron-left"/>
  </button>
</template>

<script>
import { Icon } from '@iconify/vue2'
export default {
  components: {
    Icon
  },
  props:{
    callback: Function
  },
  data () {
    return {
    }
  },
  methods: {
    buttonClicked () {
      this.callback(this.buttonID)
    }
  }
}
</script>

<style lang="scss" scoped>
button{
  transition: all .1s ease-in;
}
.button-back{
  background-color: white;
  padding: 5.5px;
  color: $blue10;
  border-radius: 100%;
  cursor: pointer ;
  width: fit-content;
  height: fit-content;
  &:hover{
   color: $blue5;
   box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
  }
}
.button-border{
  border-width: 1px;
}
.icon{
  font-size: 1.5rem;
}
</style>