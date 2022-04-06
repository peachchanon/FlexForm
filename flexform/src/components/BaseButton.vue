<template>
  <div>
    <button
      @click="buttonClicked"
      :class="[buttonTextColor, buttonBgColor, buttonBorderColor]"
      class="medium16 base-padding radius10px tw-w-full button-border tw-flex tw-justify-center tw-items-center"
      :disabled="disable"
    >
      <span v-if="buttonIconLeft !== ''" >
        <Icon class="IconStyle icon" :icon="buttonIconLeft"/>
      </span>
      <span>{{buttonText}}</span>
      <span v-if="buttonIconRight !== ''" >
        <Icon class="IconStyle icon" :icon="buttonIconRight"/>
      </span>
    </button>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue2'
export default {
  components: {
    Icon
  },
  props: {
    buttonID: String,
    buttonText: String,
    buttonTextColor: String,
    buttonBgColor: String,
    buttonBorderColor: String,
    buttonIconLeft: String,
    buttonIconRight: String,
    callback: Function,
    disable: {
      type: Boolean,
      default: false
    }
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
.button-border{
  border-width: 1px;
}
.icon{
  margin: 0 0.4rem 0 0.4rem;
  font-size: 1.5rem;
}
.bg-grey10:hover {
  background-color: $grey9;
}
.bg-grey9:hover{
  background-color: $grey8;
}
.bg-grey8:hover{
  background-color: $grey7;
}
.bg-grey7:hover{
  background-color: $grey6;
}
.grey6:hover{
  background-color: $grey5;
}
.bg-grey5:hover{
  background-color: $grey4;
}
.bg-grey4:hover{
  background-color: $grey3;
}
.bg-grey3:hover{
  background-color: $grey2;
}
.bg-grey2:hover{
    background-color: $grey1;
}
.bg-grey1:hover{
    background-color: white;
}
.bg-blue10:hover{
  background-color: $blue9;
}
.bg-blue9:hover{
  background-color: $blue8;
}
.bg-blue8:hover{
  background-color: $blue7;
}
.bg-blue7:hover{
  background-color: $blue6;
}
.bg-blue6:hover{
  background-color: $blue5;
}
.bg-blue5:hover{
  background-color: $blue4;
}
.bg-blue4:hover{
  background-color: $blue3;
}
.bg-blue3:hover{
  background-color: $blue2;
}
.bg-blue2:hover{
  background-color: $blue1;
}
.bg-blue1:hover{
  background-color: $blue10;
}
.bg-green10:hover{
  background-color: $green9;
}
.bg-green9:hover{
  background-color: $green8;
}
.bg-green8:hover{
  background-color: $green7;
}
.bg-green7:hover{
  background-color: $green6;
}
.bg-green6:hover{
  background-color: $green5;
}
.bg-green5:hover{
  background-color: $green4;
}
.bg-green4:hover{
  background-color: $green3;
}
.green3:hover{
  background-color: $green2;
}
.bg-green2:hover{
  background-color: $green1;
}
.bg-green1:hover{
  background-color: $green10;
}
.bg-yellow10:hover{
  background-color: $yellow9;
}
.bg-yellow9:hover{
  background-color: $yellow8;
}
.bg-yellow8:hover{
  background-color: $yellow7;
}
.bg-yellow7:hover{
  background-color: $yellow6;
}
.bg-yellow6:hover{
  background-color: $yellow5;
}
.bg-yellow5:hover{
  background-color: $yellow4;
}
.bg-yellow4:hover{
  background-color: $yellow3;
}
.bg-yellow3:hover{
  background-color: $yellow2;
}
.bg-yellow2:hover{
  background-color: $yellow1;
}
.bg-yellow1:hover{
  background-color: $yellow10;
}
.bg-red10:hover{
  background-color: $red9;
}
.bg-red9:hover{
  background-color: $red8;
}
.bg-red8:hover{
  background-color: $red7;
}
.bg-red7:hover{
  background-color: $red6;
}
.bg-red6:hover{
  background-color: $red5;
}
.bg-red5:hover{
  background-color: $red4;
}
.bg-red4:hover{
  background-color: $red3;
}
.bg-red3:hover{
  background-color: $red2;
}
.bg-red2:hover{
  background-color: $red1;
}
.bg-red1:hover{
  background-color: $red10;
}
.border-grey10:hover{
  border-color: $grey9;
  color: $grey9;
}
.border-grey9:hover{
  border-color: $grey8;
  color: $grey8;
}
.border-grey8:hover{
  border-color: $grey7;
  color: $grey7;
}
.border-grey7:hover{
  border-color: $grey6;
  color: $grey6;
}
.border-grey6:hover{
  border-color: $grey5;
  color: $grey5;
}
.border-grey5:hover{
  border-color: $grey4;
  color: $grey4;
}
.border-grey4:hover{
  border-color: $grey3;
  color: $grey3;
}
.border-grey3:hover{
  border-color: $grey2;
  color: $grey2;
}
.border-grey2:hover{
  border-color: $grey1;
  color: $grey1;
}
.border-grey1:hover{
  border-color: $grey1;
  color: white;
}
.border-blue10:hover{
  border-color: $blue9;
  color: $blue9;
}
.border-blue9:hover{
  border-color: $blue8;
  color: $blue8;
}
.border-blue8:hover{
  border-color: $blue7;
  color: $blue7;
}
.border-blue7:hover{
  background-color: $blue6;
  color: $blue6;
}
.border-blue6:hover{
  background-color: $blue5;
  color: $blue5;
}
.border-blue5:hover{
  border-color: $blue4;
  color: $blue4;
}
.border-blue4:hover{
  border-color: $blue3;
  color: $blue3;
}
.border-blue3:hover{
  border-color: $blue2;
  color: $blue2;
}
.border-blue2:hover{
  border-color: $blue1;
  color: $blue1;
}
.border-blue1:hover{
  border-color: $blue1;
  color: white;
}
.border-green10:hover{
  border-color: $green9;
  color: $green9;
}
.border-green9:hover{
  border-color: $green8;
  color: $green8;
}
.border-green8:hover{
  border-color: $green7;
  color: $green7;
}
.border-green7:hover{
  border-color: $green6;
  color: $green6;
}
.border-green6:hover{
  border-color: $green5;
  color: $green5;
}
.border-green5:hover{
  border-color: $green4;
  color: $green4;
}
.border-green4:hover{
  border-color: $green3;
  color: $green3;
}
.border-green3:hover{
  border-color: $green2;
  color: $green2;
}
.border-green2:hover{
  border-color: $green1;
  color: $green1;
}
.border-green1:hover{
  border-color: $green1;
  color: white;
}
.border-yellow10:hover{
  border-color: $yellow9;
  color: $yellow9;
}
.border-yellow9:hover{
  border-color: $yellow8;
  color: $yellow8;
}
.border-yellow8:hover{
  border-color: $yellow7;
  color: $yellow7;
}
.border-yellow7:hover{
  border-color: $yellow6;
  color: $yellow6;
}
.border-yellow6:hover{
  border-color: $yellow5;
  color: $yellow5;
}
.border-yellow5:hover{
  border-color: $yellow4;
  color: $yellow4;
}
.border-yellow4:hover{
  border-color: $yellow3;
  color: $yellow3;
}
.border-yellow3:hover{
  border-color: $yellow2;
  color: $yellow2;
}
.border-yellow2:hover{
  border-color: $yellow1;
  color: $yellow1;
}
.border-yellow1:hover{
  border-color: $yellow1;
  color: white;
}
.border-red10:hover{
  border-color: $red9;
  color: $red9;
}
.border-red9:hover{
  border-color: $red8;
  color: $red8;
}
.border-red8:hover{
  border-color: $red7;
  color: $red7;
}
.border-red7:hover{
  border-color: $red6;
  color: $red6;
}
.border-red6:hover{
  border-color: $red5;
  color: $red5;
}
.border-red5:hover{
  border-color: $red7;
  color: $red7;
}
.border-red4:hover{
  border-color: $red6;
  color: $red6;
}
.border-red3:hover{
  border-color: $red2;
  color: $red2;
}
.border-red2:hover{
  border-color: $red1;
  color: $red1;
}
.border-red1:hover{
  border-color: $red1;
  color: white;
}
</style>
