<template>
  <div class="button-blue tw-flex tw-flex-row tw-items-center medium16" @click="buttonClicked">
    <span class="tw-mt-0.5 tw-mr-3 tw-ml-2">{{buttonText}}</span>
    <Icon class="icon semibold24" :icon="buttonIcon"/>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue2'
export default {
  name: 'BaseButtonWhite',
  components: {
    Icon
  },
  
  props: {
    buttonID: String,
    buttonText: String,
    buttonIcon: String,
    callback: Function
  },
  methods: {
    buttonClicked () {
      this.callback(this.buttonID)
    }
  }
}
</script>

<style lang="scss" scoped>
.button-blue{
  color: #102A43;
  padding: 0.75rem;
  transition: all .1s ease-in;
  border-radius: 12px;
  margin: 0.25rem 0;
  cursor: pointer;
  box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.1);
}
.button-blue:hover{
  color: #4098D7;
  background-color: white;
  box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.1);
  width: 100%;
}
</style>