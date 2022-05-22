<template>
  <div>
    <div
      class="medium14 badge radius12px"
      :class="[BadgeColor, BadgeBgColor, BadgeBroderColor]"
    >
      {{BadgeText}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    BadgeText: String,
    BadgeColor: String,
    BadgeBgColor: String,
    BadgeBroderColor: String
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.badge {
  padding: 2px 10px;
  border-width: 1px;
  transition: all .1s ease-in;
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
</style>
