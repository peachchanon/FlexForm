<template>
  <div>
    <!-- Header -->
    <div class="tw-w-full bg-white base-padding base-shadow tw-fixed tw-z-50">
      <div class="tw-flex tw-flex-row tw-items-center">
        <div class="tw-mr-4">
          <div class="button__circle">
            <Icon class="icon__style__large blue10" icon="heroicons-outline:chevron-left"/>
          </div>
        </div>
        <Icon class="icon__style__large blue10 tw-mr-4" icon="heroicons-outline:folder"/>
        <span class="semibold18 blue10">NT Form</span>
      </div>
    </div>
    <!-- Form -->
    <div class="tw-w-full tw-flex tw-flex-col tw-items-center" style="padding-top: 90px">
      <div class="box tw-w-full tw-max-w-screen-sm md:tw-max-w-screen-md lg:tw-max-w-screen-xl">
        <div class="tw-ml-3 tw-mt-3 tw-mr-3 tw-flex tw-flex-row tw-items-center">
          <Icon class="semibold24 icon blue10" icon="heroicons-outline:chat"/>
          <span class="semibold24 blue10 tw-ml-2">Response</span>
        </div>
        <div class="tw-ml-3 tw-mt-3 tw-mr-3 tw-flex tw-flex-row tw-justify-between">
          <div>
            <SearchBar></SearchBar>
          </div>
          <div>Hi</div>
        </div>
        <div>
          Hi
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue2'
import SearchBar from "@/components/SearchBar";
export default {
  name: "FormResponse.vue",
  components:{
    Icon,
    SearchBar
  },
  methods:{
    
  }
}
</script>

<style lang="scss" scoped>
.icon__style__large{
  font-size: 24px;
}
.button__circle{
  cursor: pointer;
  background-color: $grey1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.75rem;
  width: fit-content;
  border-radius: 24px;
  transition: all .1s ease-in;
  &:hover{
    background-color: $grey2;
  }
}
</style>