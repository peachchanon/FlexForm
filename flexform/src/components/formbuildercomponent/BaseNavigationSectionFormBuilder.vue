<template>
  <div>
    <div style="padding: 0.3rem">
      <span
          v-for="(item,index) in field" :key="item.SectionName"
          class="tw-mr-5"
          :class="[
              {'navigation-button-active':selectField===item.SectionName,'navigation-button':selectField!==item.SectionName},
              {'navigation-button-active':index===0 && initialIndex,'navigation-button': index!==0 && !initialIndex},
              ]"
          @click="doHorizontalNavigation(item.SectionName)"
      >{{item.SectionName}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseNavigationSectionFormBuilder",
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
    doHorizontalNavigation(sectionName) {
      this.initialIndex = false
      this.selectField = sectionName
      this.$emit('callbackField', sectionName)
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
    color: $blue7;
  }
}
.navigation-button-active {
  color: $blue10;
  cursor: pointer;
  padding-bottom: 1px;
  border-bottom: solid $blue10 2px;
}
</style>