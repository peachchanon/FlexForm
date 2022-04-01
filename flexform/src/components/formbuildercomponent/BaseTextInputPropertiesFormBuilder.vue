<template>
  <div>
    <input v-if="type === 'text'" type="text" :placeholder="placeholder" class="input medium16 base-padding radius10px tw-w-full" v-model="showString" @input="doString">
    <textarea v-if="type === 'textarea'" :placeholder="placeholder" class="input medium16 base-padding radius10px tw-w-full" v-model="showString" @input="doString"></textarea>
    <div v-if="type === 'color'" class="input medium16 radius10px tw-w-full tw-flex tw-flex-row tw-items-center tw-relative">
      <div class="base-padding tw-w-full tw-h-full radius10px">
        <div :class="'bg-'+propValue" style="height: 24px; border-radius: 6px"></div>
      </div>
      <div class="tw-bg-grey9 hover:tw-bg-grey7 tw-transition tw-ease-in tw-cursor-pointer tw-p-2 tw-mr-2 radius10px tw-w-fit tw-h-fit tw-text-white hover:tw-text-grey1" @click="doStateBoardColor">
        <Icon class="icon__style__large" icon="clarity:color-palette-solid"/>
      </div>
      <!-- Board Color -->
      <div class="tw-w-full tw-absolute tw-bg-grey1 base-shadow base-padding radius10px tw-top-0 tw-right-0" style="z-index: 2" v-if="stateBoardColor">
        <div class="tw-flex tw-flex-row tw-justify-between">
          <div class="tw-flex tw-flex-row">
            <Icon class="icon__style__large tw-mr-2" icon="clarity:color-palette-solid"/>
            <span class="blue10">Choose Color</span>
          </div>
          <div class="tw-cursor-pointer tw-text-grey8 hover:tw-text-red5 tw-transition tw-ease-in" @click="doStateBoardColor">
            <Icon class="icon__style__large" icon="heroicons-outline:x"/>
          </div>
        </div>
        <div class="tw-overflow-x-hidden" style="height: fit-content; max-height: 250px">
          <span class="grey7 medium14">White</span>
          <div class="tw-flex tw-flex-wrap">
            <div v-for="(color,index) in dataColorWhite" :key="index" :class="['bg-'+color,{'tw-border-2 tw-border-blue5': showString === color,'': showString !== color}]" 
                 class="tw-h-12 radius10px tw-relative tw-cursor-pointer tw-border-2 tw-border-grey1 tw-transition tw-ease-in hover:tw-border-2 hover:tw-border-blue5" 
                 style="width: 3.3rem"
                 @click="doColor(color)"
            >
            </div>
          </div>
          <span class="grey7 medium14">Black</span>
          <div class="tw-flex tw-flex-wrap">
            <div v-for="(color,index) in dataColorBlack" :key="index" :class="['bg-'+color,{'tw-border-2 tw-border-blue5': showString === color,'': showString !== color}]"
                 class="tw-h-12 radius10px tw-relative tw-cursor-pointer tw-border-2 tw-border-grey1 tw-transition tw-ease-in hover:tw-border-2 hover:tw-border-blue5" 
                 style="width: 3.3rem"
                 @click="doColor(color)"
            >
            </div>
          </div>
          <span class="grey7 medium14">Blue</span>
          <div class="tw-flex tw-flex-wrap">
            <div v-for="(color,index) in dataColorBlue" :key="index" :class="['bg-'+color,{'tw-border-2 tw-border-blue5': showString === color,'': showString !== color}]"
                 class="tw-h-12 radius10px tw-relative tw-cursor-pointer tw-border-2 tw-border-grey1 tw-transition tw-ease-in hover:tw-border-2 hover:tw-border-blue5"
                 style="width: 3.3rem"
                 @click="doColor(color)"
            >
            </div>
          </div>
          <span class="grey7 medium14">Green</span>
          <div class="tw-flex tw-flex-wrap">
            <div v-for="(color,index) in dataColorGreen" :key="index" :class="['bg-'+color,{'tw-border-2 tw-border-blue5': showString === color,'': showString !== color}]"
                 class="tw-h-12 radius10px tw-relative tw-cursor-pointer tw-border-2 tw-border-grey1 tw-transition tw-ease-in hover:tw-border-2 hover:tw-border-blue5"
                 style="width: 3.3rem"
                 @click="doColor(color)"
            >
            </div>
          </div>
          <span class="grey7 medium14">Yellow</span>
          <div class="tw-flex tw-flex-wrap">
            <div v-for="(color,index) in dataColorYellow" :key="index" :class="['bg-'+color,{'tw-border-2 tw-border-blue5': showString === color,'': showString !== color}]"
                 class="tw-h-12 radius10px tw-relative tw-cursor-pointer tw-border-2 tw-border-grey1 tw-transition tw-ease-in hover:tw-border-2 hover:tw-border-blue5"
                 style="width: 3.3rem"
                 @click="doColor(color)"
            >
            </div>
          </div>
          <span class="grey7 medium14">Red</span>
          <div class="tw-flex tw-flex-wrap">
            <div v-for="(color,index) in dataColorRed" :key="index" :class="['bg-'+color,{'tw-border-2 tw-border-blue5': showString === color,'': showString !== color}]"
                 class="tw-h-12 radius10px tw-relative tw-cursor-pointer tw-border-2 tw-border-grey1 tw-transition tw-ease-in hover:tw-border-2 hover:tw-border-blue5"
                 style="width: 3.3rem"
                 @click="doColor(color)"
            >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="type === 'alignment'" class="tw-flex tw-flex-row">
      <div v-for="(element, index) in alignmentList" :key="index" class="tw-w-full">
        <div 
            class="radius10px tw-p-1 tw-text-center tw-mx-1 tw-transition tw-ease-in tw-cursor-pointer"
            :class="{
          'bg-grey8 hover:tw-bg-grey7':propValue === element.toLowerCase(),
          'bg-grey5 hover:tw-bg-grey4':propValue !== element.toLowerCase(),
            }"
            @click="doAlignment(element.toLowerCase())"
        >
          <span 
              class="medium16 tw-transition tw-ease-in"
              :class="{
          'white':propValue === element.toLowerCase(),
          'grey3 hover:tw-text-white':propValue !== element.toLowerCase(),
            }"
          >{{element}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue2'
export default {
  name: "BaseTextInputPropertiesFormBuilder",
  components: {
    Icon
  },
  emits: ['callBackString'],
  data() {
    return {
      showString: this.propValue,
      stateBoardColor: false,
      dataColorWhite:[
        'white'
      ],
      dataColorBlack: [
          'grey10','grey9','grey8','grey7','grey6','grey5','grey4','grey3','grey2','grey1'
      ],
      dataColorBlue: [
          'blue10','blue9','blue8','blue7','blue6','blue5','blue4','blue3','blue2','blue1'
      ],
      dataColorGreen:[
          'green10','green9','green8','green7','green6','green5','green4','green3','green2','green1',
      ],
      dataColorYellow: [
          'yellow10','yellow9','yellow8','yellow7','yellow6','yellow5','yellow4','yellow3','yellow2','yellow1',
      ],
      dataColorRed: [
        'red10','red9','red8','red7','red6','red5','red4','red3','red2','red1',
      ],
      alignmentList: ['Left','Center','Right'],
    }
  },
  props: {
    type: String,
    placeholder: String,
    propValue: String,
  },
  methods: {
    doString() {
      this.$emit('callBackString', this.showString)
    },
    doStateBoardColor(){
      this.stateBoardColor = !this.stateBoardColor;
    },
    doColor(color){
      this.showString = color
      this.stateBoardColor = false
      this.$emit('callBackString', this.showString)
    },
    doAlignment(value){
      this.$emit('callBackString', value)
    },
  }
}
</script>

<style lang="scss" scoped>
.input{
  border: 1px solid white;
  background-color: $grey1;
  color: $grey5;
  transition: all .1s ease-in;
}
.input:focus{
  border: 1px solid $blue5;
  background-color: white;
  color: $grey10;
  outline: none !important;
}
.icon__style__large{
  font-size: 24px;
}
</style>