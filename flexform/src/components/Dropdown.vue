<template>
  <div>
  <div class="select" :data-value="value" :data-list="list" :style="cssDropdown">
    <span class="selector" @click="toggle()">
        <input readonly :placeholder="placeholder" :style="cssDropdown" :value="value">
      <span class="arrow" :class="{ expanded : visible }"></span>
    </span>
    <div :class="{ hidden : !visible, visible }">
      <ul :style="cssDropdown">
        <li :class="{ current : item === value }" v-for="(item,i) in list" :key="i" @click="select(item)">{{ item }}</li>
      </ul>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: "dropdown",
  props: {
    placeholder: {
      type: String,
      default: 'Hello'
    },
    dropdownWidth:{
      type: Number,
      default: 400
    }
  },
  data() {
    return {
      list: ['1','2'],
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
    cssDropdown(){
      return{
        '--dropdown-width': this.dropdownWidth + "px",
      }
    }
  },
  mounted () {
    document.addEventListener('click', this.close)
  },
  // beforeDestroy () {
  //   document.removeEventListener('click',this.close)
  // }
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
      outline:1px solid white;
      color: $grey5;
      border-radius: 10px;
    }
    & :focus{
      background: white;
      outline: 1px solid $blue5;
      color: black;
    }
    input:focus::placeholder {
      color: black;
    }
    .arrow {
      position: absolute;
      right: 10px;
      top: 40%;
      width: 0;
      height: 0;
      border-left: 7px solid transparent;
      border-right: 7px solid transparent;
      border-top: 10px solid $grey5;
      transform: rotateZ(0deg) translateY(0px);
      transition-duration: 0.3s;
      transition-timing-function: cubic-bezier(.59,1.39,.37,1.01);
    }
    .expanded {
      transform: rotateZ(180deg) translateY(2px);
    }
  }
  ul {
    width: var(--dropdown-width);
    list-style-type: none;
    padding: 0;
    margin-top: 1px;
    font-size: 16px;
    border: 1px solid white;
    position: absolute;
    z-index: 1;
    background: $grey1;
    border-radius: 0px 0px 10px 10px;
  }
  li {
    padding: 12px;
    color: $grey5;
    &:hover {
      color: white;
      background: $blue5;
      border-radius: 0px 0px 10px 10px;
    }
  }
  .current {
    background: $grey2;
    border-radius: 0px 0px 10px 10px;
  }
  .hidden {
    visibility: hidden;
  }
  .visible {
    visibility: visible;
  }
}

</style>