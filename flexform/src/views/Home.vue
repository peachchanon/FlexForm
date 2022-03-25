<template>
  <div class="home">
    <div>
      <base-text-input
        type="text"
        placeholder="Enter Username"
      ></base-text-input>
      <base-text-input
        type="password"
        placeholder="Enter Password"
      ></base-text-input>
      <base-text-input
        type="email"
        placeholder="Enter Email"
      ></base-text-input>
      <base-button
        buttonID="buttonCreateAnAccount"
        buttonText="Create an Account"
        buttonTextColor="blue5"
        buttonBgColor="bg-white"
        buttonBorderColor="border-blue5"
        buttonIconLeft="heroicons-outline:chart-bar"
        buttonIconRight="heroicons-outline:chart-bar"
        :callback="buttonClick"
      >
      </base-button>
      <base-button
        buttonID="buttonLogin"
        buttonText="Login"
        buttonTextColor="white"
        buttonBgColor="bg-blue5"
        :callback="buttonClick"
      >
      </base-button>
      <div class="tw-flex tw-p-2">
        <base-badge
          BadgeText="Open"
          BadgeColor="white"
          BadgeBgColor="bg-red5"
          BadgeBroderColor="border-red10"
        >
        </base-badge>
        <base-badge
          BadgeText="Update"
          BadgeColor="grey10"
          BadgeBgColor="bg-yellow5"
          BadgeBroderColor="border-yellow10"
        >
        </base-badge>
        <base-badge
          BadgeText="Operation"
          BadgeColor="grey10"
          BadgeBgColor="bg-grey1"
          BadgeBroderColor="border-grey10"
        >
        </base-badge>
        <base-badge
          BadgeText="Complete"
          BadgeColor="white"
          BadgeBgColor="bg-blue5"
          BadgeBroderColor="border-blue10"
        >
        </base-badge>
        <base-badge
          BadgeText="Finish"
          BadgeColor="green5"
          BadgeBgColor="bg-green2"
          BadgeBroderColor="border-green5"
        >
        </base-badge>
      </div>
      <div class="tw-flex tw-p-2">
        <base-badge
          BadgeText="High"
          BadgeColor="white"
          BadgeBgColor="bg-red5"
          BadgeBroderColor="border-red15"
        >
        </base-badge>
        <base-badge
          BadgeText="Medium"
          BadgeColor="grey10"
          BadgeBgColor="bg-yellow5"
          BadgeBroderColor="border-yellow10"
        >
        </base-badge>
        <base-badge
          BadgeText="Finish"
          BadgeColor="white"
          BadgeBgColor="bg-green7"
          BadgeBroderColor="border-green10"
        >
        </base-badge>
      </div>
      <div>
        <base-dropdown
          placeholder="Select Choice"
          v-bind:optionsList="[{option:'Male'},{option:'Female'}]"
          @valueSelected="dropdownGender"
        ></base-dropdown>
      </div>
      <range-slider></range-slider>
    </div>
  </div>
</template>

<script>
import BaseTextInput from '@/components/BaseTextInput'
import BaseButton from '@/components/BaseButton'
import BaseBadge from '@/components/BaseBadge'
import BaseDropdown from '@/components/BaseDropdown'
import RangeSlider from '@/components/formbuildercomponent/RangeSlider2'

export default {
  name: 'Home',
  components: {
    BaseTextInput,
    BaseButton,
    BaseBadge,
    BaseDropdown,
    RangeSlider,
  },
  methods: {
    buttonClick (e) {
      console.log(e)
    },
    dropdownGender (e) {
      console.log(e)
    }
  }
}
</script>
