<template>
  <div>
    <!-- Basic Type -->
    <div 
        v-if="propType === 'basic'"
        class="select" :data-value="value" :data-list="list" :style="cssDropdown"
    >
      <span class="selector" @click="toggle()">
        <input readonly :placeholder="placeholder" :style="cssDropdown" :value="value">
        <span class="arrow" :class="{ expanded : visible }"></span>
      </span>
      <div :class="{ hidden : !visible, visible }">
        <ul :style="cssDropdown" class="tw-overflow-x-hidden" style="height: fit-content; max-height: 250px">
          <li :class="{ current : item === value }" v-for="(item,i) in list" :key="i" @click="select(item)">{{item}}</li>
        </ul>
      </div>
    </div>
    <!-- Font Name Type -->
    <div
        v-if="propType === 'font'"
        class="select" :data-value="value" :data-list="list" :style="cssDropdown"
    >
      <span class="selector" @click="toggle()">
        <input readonly :placeholder="placeholder" :style="cssDropdown" :value="value">
        <span class="arrow" :class="{ expanded : visible }"></span>
      </span>
      <div :class="{ hidden : !visible, visible }">
        <ul :style="cssDropdown" class="tw-overflow-x-hidden" style="height: fit-content; max-height: 250px">
          <li :class="{ current : item === value }" v-for="(item,i) in list" :key="i" @click="select(item)">{{item}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "dropdown",
  emits: ['callBackValue',],
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    propDropdownWidth: String,
    propList: [],
    propType: String
  },
  data() {
    return {
      list: this.propList,
      value: this.placeholder.toString(),
      visible: false
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
    }
  },
  computed: {
    cssDropdown() {
      if(this.propDropdownWidth !== 'full'){
        return{
          '--dropdown-width': this.propDropdownWidth+"px",
        }
      }
      else{
        return {
          '--dropdown-width': 100+'%'
        }
      }
    }
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
    width: var(--dropdown-width);
    list-style-type: none;
    padding: 0;
    margin-top: 1px;
    font-size: 16px;
    border: 1px solid white;
    position: absolute;
    z-index: 2;
    background: $grey1;
    border-radius: $radius10px;
    box-shadow: $baseshadow;
  }
  li{
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