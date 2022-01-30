<template>
  <div>
    <div class="base-padding">
      <span 
          v-for="item in field" :key="item.field" 
          class="tw-mr-5"
          :class="{'navigation-button-active':selectField===item.field,'navigation-button':selectField!==item.field}"
          @click="doHorizontalNavigation(item.field)"
      >{{item.field}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseHorizontalNavigation.vue",
  emits: ['callbackField'],
  props: {
    field: Array
  },
  data() {
    return {
      selectField: this.field[0]
    }
  },
  methods: {
    doHorizontalNavigation(field) {
      this.selectField = field
      this.$emit('callbackField', field)
    }
  }
}
</script>

<style lang="scss" scoped>
.navigation-button{
  color: #829AB1;
  cursor: pointer;
  transition: all .1s ease-in;
  display: inline-block;
  position: relative;
  padding-bottom: 3px;
  &:after{
    content: '';
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #62B0E8;
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
  }
  &:hover{
    color: #4098D7;
  }
  &:hover:after{
    color: #62B0E8;
    transform: scaleX(1);
    transform-origin: bottom left;
  }
}

.navigation-button-active {
  color: #4098D7;
  cursor: pointer;
  padding-bottom: 1px;
  border-bottom: solid #4098D7 2px;
}
</style>