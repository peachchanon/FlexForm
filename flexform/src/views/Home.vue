<template>
  <div class="home">
    <div>
<!--      <base-text-input-->
<!--        type="text"-->
<!--        placeholder="Enter Username"-->
<!--      ></base-text-input>-->
<!--      <base-text-input-->
<!--        type="password"-->
<!--        placeholder="Enter Password"-->
<!--      ></base-text-input>-->
<!--      <base-text-input-->
<!--        type="email"-->
<!--        placeholder="Enter Email"-->
<!--      ></base-text-input>-->
<!--      <base-button-->
<!--        buttonID="buttonCreateAnAccount"-->
<!--        buttonText="Create an Account"-->
<!--        buttonTextColor="blue5"-->
<!--        buttonBgColor="bg-white"-->
<!--        buttonBorderColor="border-blue5"-->
<!--        buttonIconLeft="heroicons-outline:chart-bar"-->
<!--        buttonIconRight="heroicons-outline:chart-bar"-->
<!--        :callback="buttonClick"-->
<!--      >-->
<!--      </base-button>-->
<!--      <base-button-->
<!--        buttonID="buttonLogin"-->
<!--        buttonText="Login"-->
<!--        buttonTextColor="white"-->
<!--        buttonBgColor="bg-blue5"-->
<!--        :callback="buttonClick"-->
<!--      >-->
<!--      </base-button>-->
<!--      <div class="tw-flex tw-p-2">-->
<!--        <base-badge-->
<!--          BadgeText="Open"-->
<!--          BadgeColor="white"-->
<!--          BadgeBgColor="bg-red5"-->
<!--          BadgeBroderColor="border-red10"-->
<!--        >-->
<!--        </base-badge>-->
<!--        <base-badge-->
<!--          BadgeText="Update"-->
<!--          BadgeColor="grey10"-->
<!--          BadgeBgColor="bg-yellow5"-->
<!--          BadgeBroderColor="border-yellow10"-->
<!--        >-->
<!--        </base-badge>-->
<!--        <base-badge-->
<!--          BadgeText="Operation"-->
<!--          BadgeColor="grey10"-->
<!--          BadgeBgColor="bg-grey1"-->
<!--          BadgeBroderColor="border-grey10"-->
<!--        >-->
<!--        </base-badge>-->
<!--        <base-badge-->
<!--          BadgeText="Complete"-->
<!--          BadgeColor="white"-->
<!--          BadgeBgColor="bg-blue5"-->
<!--          BadgeBroderColor="border-blue10"-->
<!--        >-->
<!--        </base-badge>-->
<!--        <base-badge-->
<!--          BadgeText="Finish"-->
<!--          BadgeColor="green5"-->
<!--          BadgeBgColor="bg-green2"-->
<!--          BadgeBroderColor="border-green5"-->
<!--        >-->
<!--        </base-badge>-->
<!--      </div>-->
<!--      <div class="tw-flex tw-p-2">-->
<!--        <base-badge-->
<!--          BadgeText="High"-->
<!--          BadgeColor="white"-->
<!--          BadgeBgColor="bg-red5"-->
<!--          BadgeBroderColor="border-red15"-->
<!--        >-->
<!--        </base-badge>-->
<!--        <base-badge-->
<!--          BadgeText="Medium"-->
<!--          BadgeColor="grey10"-->
<!--          BadgeBgColor="bg-yellow5"-->
<!--          BadgeBroderColor="border-yellow10"-->
<!--        >-->
<!--        </base-badge>-->
<!--        <base-badge-->
<!--          BadgeText="Finish"-->
<!--          BadgeColor="white"-->
<!--          BadgeBgColor="bg-green7"-->
<!--          BadgeBroderColor="border-green10"-->
<!--        >-->
<!--        </base-badge>-->
<!--      </div>-->
<!--      <div>-->
<!--        <checkbox :list="[{id: '1', checked: false, check:'cat',disable:false,color:'#4098D7', fontsize:18}, -->
<!--        {id: '2',checked: true, check:'dog',disable:false,color:'#4098D7', fontsize:18}, -->
<!--        {id: '3',checked: false, check:'fish',disable:true,color:'#4098D7', fontsize:18}-->
<!--        ]"-->
<!--        :checkboxDisplay="'flex'"></checkbox>-->
<!--      </div>-->
<!--      <div>-->
<!--        <radio-button :option="[ {id: '1', title: 'cat', value: false},-->
<!--        {id: '2', title: 'cat2', value: false},-->
<!--        {id: '3', title: 'cat3', value: false},-->
<!--        {id: '4', title: 'cat4', value: false}]" -->
<!--        :radioBdColor="'#4098D7'" -->
<!--        :radioLabelFontSize="20" -->
<!--        :radioFlexDirection="'row'"></radio-button>-->
<!--      </div>-->
<!--      <div>-->
<!--        <checkbox1></checkbox1>-->
<!--      </div>-->
<!--      <div>-->
<!--        <toggle-switch></toggle-switch>-->
<!--      </div>-->
<!--      <div>-->
<!--        <dropdown></dropdown>-->
<!--      </div>-->
      <div>
        <image-upload></image-upload>
      </div>
      <div>
        <video-upload></video-upload>
      </div>
<!--      <file-upload></file-upload>-->
<!--      <div>-->
<!--        <base-dropdown-->
<!--          placeholder="Select Choice"-->
<!--          v-bind:optionsList="[{option:'Male'},{option:'Female'}]"-->
<!--          @valueSelected="dropdownGender"-->
<!--        ></base-dropdown>-->
<!--      </div>-->
<!--      <div><range-slider></range-slider></div>-->
<!--      <div>-->
<!--        <captcha></captcha>-->
<!--      </div>-->
<!--      <div>-->
<!--        <longdo-map :longitude="100" :latitude="8"></longdo-map>-->
<!--      </div>-->
<!--      <div>-->
<!--        <date-picker placeholder="helloo"></date-picker>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script>
// import BaseTextInput from '@/components/BaseTextInput'
// import BaseButton from '@/components/BaseButton'
// import BaseBadge from '@/components/BaseBadge'
// import BaseDropdown from '@/components/BaseDropdown'
// import DatePicker from '@/components/formbuildercomponent/DatePicker'
// import Dropdown from '@/components/formbuildercomponent/Dropdown'
//import RangeSlider from '@/components/formbuildercomponent/RangeSlider2'
// import Captcha from '@/components/formbuildercomponent/Captcha'
// import LongdoMap from '@/components/formbuildercomponent/Map'
// import Checkbox from '@/components/formbuildercomponent/Checkbox'
// import RadioButton from '@/components/formbuildercomponent/RadioButton'
// import FileUpload from '@/components/formbuildercomponent/FileUpload3'
import ImageUpload from '@/components/formbuildercomponent/ImageUpload'
import VideoUpload from '@/components/formbuildercomponent/VideoUpload'
// import Checkbox1 from '@/components/Checkbox1'
// import ToggleSwitch from "@/components/formbuildercomponent/ToggleSwitch";
export default {
  name: 'Home',
  components: {
    // RadioButton,
    // BaseTextInput,
    // BaseButton,
    // BaseBadge,
    // BaseDropdown,
    // RangeSlider,
    // DatePicker,
    // Captcha,
    // LongdoMap,
    // FileUpload,
    // Dropdown,
    // Checkbox,
    ImageUpload,
    VideoUpload
    // ToggleSwitch
  },
  props: {
  },
  data() {
    return {
    }
  },
  methods: {
    buttonClick (e) {
      console.log(e)
    },
    dropdownGender (e) {
      console.log(e)
    }
  },
  computed:{
  }
}
</script>

<style lang="scss" scoped>

</style>
