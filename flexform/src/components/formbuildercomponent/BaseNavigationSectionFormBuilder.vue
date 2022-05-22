<template>
  <div>
    <div style="padding: 0.3rem">
      <span
          v-for="(element, index) in field" :key="index"
          class="tw-mr-5"
          :class="{
            'navigation-button-active': index === stateSectionIndex,
            'navigation-button': index !== stateSectionIndex
          }"
          @click="doHorizontalNavigation(index)"
      >
      {{element.SectionName}}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseNavigationSectionFormBuilder",
  emits: ['callbackFieldIndex'],
  props: {
    field: Array,
    stateSectionIndex: Number,
  },
  methods: {
    doHorizontalNavigation(sectionIndex) {
      this.$emit('callbackFieldIndex', sectionIndex)
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