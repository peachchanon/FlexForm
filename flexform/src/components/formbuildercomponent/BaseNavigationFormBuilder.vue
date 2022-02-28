<template>
  <div>
    <div style="padding: 0.3rem">
      <span
          v-for="(item,index) in field" :key="item.field"
          class="tw-mr-5"
          :class="[
              {'navigation-button-active':selectField===item.field || item === 0,'navigation-button':selectField!==item.field},
              {'navigation-button-active':index===0 && initialIndex,'navigation-button': index!==0 && !initialIndex},
              ]"
          @click="doHorizontalNavigation(item.field)"
      >{{item.field}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseNavigationFormBuilder",
  emits: ['callbackField'],
  props: {
    field: Array
  },
  data() {
    return {
      initialIndex: true,
      selectField: this.field[0]
    }
  },
  methods: {
    doHorizontalNavigation(field) {
      this.initialIndex = false
      this.selectField = field
      this.$emit('callbackField', field)
    }
  }
}
</script>

<style lang="scss" scoped>
.navigation-button{
  user-select: none;
  color: $grey5;
  cursor: pointer;
  transition: all .1s ease-in;
  display: inline-block;
  position: relative;
  padding-bottom: 3px;
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: -1px;
    left: 0;
    background-color: $blue10;
  }
  &:hover {
    color: white;
  }
}
.navigation-button-active {
  color: white;
  cursor: pointer;
  padding-bottom: 1px;
  border-bottom: solid white 2px;
}
</style>