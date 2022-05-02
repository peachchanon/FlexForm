<template>
  <div>
    <div class="base-padding">
      <span 
          v-for="(item, index) in field" :key="index" 
          class="tw-mr-5 tw-cursor-pointer"
          :class="{
            'navigation-button-active': index === stateSectionIndex,
            'navigation-button': index === stateSectionIndex
          }"
          @click="doHorizontalNavigation(index, item.field)"
      >
        {{item.field}}
      </span>
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
      //selectField: this.field[0],
      stateSectionIndex: 0
    }
  },
  methods: {
    doHorizontalNavigation(index, field) {
      //this.selectField = field
      this.stateSectionIndex = index
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
}

.navigation-button-active {
  color: #4098D7;
  cursor: pointer;
  padding-bottom: 1px;
  border-bottom: solid #4098D7 2px;
  
}
</style>