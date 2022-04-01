<template>
  <div>
    <!-- Font Style Type -->
    <div
        v-if="propType === 'fontstyle'"
        class="select" :data-value="dropdownValue" :data-list="propList" :style="css__font__style"
    >
      <span class="selector" @click="toggle()">
        <input readonly :style="css__font__style" :value="dropdownValue">
        <span class="arrow" :class="{ expanded : visible }"></span>
      </span>
      <div :class="{ hidden : !visible, visible}" class="tw-relative">
        <ul :style="css__font__style" class="tw-overflow-x-hidden" style="height: fit-content; max-height: 250px">
          <li :class="{ current : item === dropdownValue }" v-for="(item,i) in propList" :key="i" @click="select(item)" :style="fontStyle(item)">{{item}}</li>
        </ul>
      </div>
    </div>
    <!-- Font Size Type -->
    <div
        v-if="propType === 'fontsize'"
        class="select" :data-value="dropdownValue" :data-list="FontSizeList" :style="css__font__style"
    >
      <span class="selector" @click="toggle()">
        <input readonly :style="css__font__style" :value="dropdownValue">
        <span class="arrow" :class="{ expanded : visible }"></span>
      </span>
      <div :class="{ hidden : !visible, visible}" class="tw-relative">
        <ul :style="css__font__style" class="tw-overflow-x-hidden" style="height: fit-content; max-height: 250px;">
          <li v-for="(item,i) in FontSizeList" :key="i" @click="select(item)" :class="{ current : item === dropdownValue }">{{item}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseDropdownFormBuilder",
  emits: ['callBackValue',],
  props: {
    dropdownValue: {
      type: String,
      default: ''
    },
    propDropdownWidth: String,
    propList: [],
    propType: String
  },
  data() {
    return {
      visible: false,
      FontSizeList: [8,9,10,11,12,14,16,18,20,22,24,28,36,48,72],
    }
  },
  watch: {},
  methods: {
    toggle() {
      this.visible = !this.visible;
    },
    select(option) {
      this.$emit('callBackValue', option)
      this.value = option;
      this.toggle();
    },
    close (e) {
      if (!this.$el.contains(e.target)) {
        this.visible = false;
      }
    },
    fontStyle(item){
      return {
        '--font--style--item': item,
      }
    }
  },
  computed: {
    css__font__style() {
      if(this.propDropdownWidth !== 'full'){
        return{
          '--dropdown-width': this.propDropdownWidth+"px",
          '--font--style--value': this.value,
        }
      }
      else{
        return {
          '--dropdown-width': 100+'%',
          '--font--style--value': this.value,
        }
      }
    },
  },
  mounted () {
    document.addEventListener('click', this.close)
  },
}
</script>

<style lang="scss" scoped>
.select {
  width: var(--dropdown-width);
  .selector {
    position: relative;
    z-index: 1;
    display: block;
    input{
      font-family: var(--font--style--value);
      width: var(--dropdown-width);
      cursor: pointer;
      background: $grey1;
      padding: 12px;
      z-index: 1;
      font-size: 16px;
      outline: 2px solid white;
      color: $grey10;
      border-radius: 10px;
    }
    &:focus{
      background: white;
      color: $grey10;
      outline: 2px solid red;
    }
    input:focus::placeholder {
      color: $grey10;
    }
    .arrow{
      position: absolute;
      right: 10px;
      top: 40%;
      width: 0;
      height: 0;
      border-left: 7px solid transparent;
      border-right: 7px solid transparent;
      border-top: 10px solid $grey10;
      transform: rotateZ(0deg) translateY(0px);
      transition-duration: 0.3s;
      transition-timing-function: cubic-bezier(.59,1.39,.37,1.01);
    }
    .expanded{
      transform: rotateZ(180deg) translateY(2px);
    }
  }
  ul{
    position: absolute;
    top: 0;
    z-index: 2;
    width: var(--dropdown-width);
    list-style-type: none;
    padding: 0;
    margin-top: 1px;
    font-size: 16px;
    border: 1px solid white;
    background: $grey1;
    border-radius: $radius10px;
    box-shadow: $baseshadow;
  }
  li{
    font-family: var(--font--style--item);
    font-weight: 500;
    padding: 12px;
    color: $grey10;
    &:hover {
      transition: all .1s ease-in;
      cursor: pointer;
      color: white;
      background: $blue5;
      border-radius: $radius10px;
    }
  }
  .current{
    color: $blue7;
    background: $grey2;
    border-radius: $radius10px;
  }
  .hidden{
    transition: all .1s ease-in;
    visibility: hidden;
  }
  .visible {
    transition: all .1s ease-in;
    visibility: visible;
  }
}
</style>