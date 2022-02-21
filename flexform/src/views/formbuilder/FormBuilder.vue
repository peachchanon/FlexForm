<template>
  <div class="tw-h-full">
    
    <!-- Start Form -->
    <div v-if="!showFormBuilderLayout" class="base-padding tw-h-full tw-w-full tw-flex tw-flex-col tw-items-center md:tw-justify-center tw-justify-start">
      <!-- Create a Form -->
      <div class="bg-white radius12px base-shadow base-padding base-margin" style="width: fit-content">
        <!-- Head -->
        <div class="tw-flex tw-flex-row tw-items-center tw-justify-between">
          <div class="tw-flex tw-flex-row tw-items-center tw-relative">
            <Icon class="semibold24 icon blue10 tw-pr-1" icon="heroicons-outline:folder"/>
            <label class="semibold24 blue10">Create a Form</label>
          </div>
          <div class="button__close" @click="doButton('exitButton')">
            <Icon class="icon semibold24" icon="heroicons-outline:x"/>
          </div>
        </div>
        <!-- Body -->
        <div class="tw-flex md:tw-flex-row md:tw-justify-center tw-flex-col tw-items-start">
          <div class="select__create__form tw-flex tw-flex-row tw-items-start md:tw-flex-col md:tw-mx-5 md:tw-items-center" @click="doButton('blankPageButton')">
            <div class="button__grey tw-my-2">
              <Icon class="icon" icon="heroicons-outline:plus"/>
            </div>
            <div class="tw-flex tw-flex-col tw-items-start tw-m-4 md:tw-items-center">
              <label class="text__blue tw-my-2">Start Form Scratch</label>
              <label class="text__grey tw-my-2">A blank slate is all you need.</label>
            </div>
          </div>
          <div class="select__create__form tw-flex tw-flex-row tw-items-start md:tw-flex-col md:tw-mx-5 md:tw-items-center" @click="doButton('templateFormButton')">
            <div class="button__grey tw-my-2">
              <Icon class="icon" icon="heroicons-outline:folder"/>
            </div>
            <div class="tw-flex tw-flex-col tw-items-start tw-m-4 md:tw-items-center">
              <label class="text__blue tw-my-2">Use Template</label>
              <label class="text__grey tw-my-2">Choose form template</label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Form Builder -->
    <div v-if="showFormBuilderLayout" class="tw-h-full">
      <div class="tw-w-full bg-white base-padding">
        <div></div>
        <label class="semibold24 blue10">National Telecom Public Company Limited Ticket (NOC)</label>
      </div>
      <div></div>
    </div>
    
  </div>
</template>

<script>
import { Icon } from '@iconify/vue2'
export default {
  name: "FormBuilder.vue",
  components: {
    Icon
  },
  data() {
    return {
      showFormBuilderLayout: false,
      
    }
  },
  methods: {
    doButton(nameButton) {
      if(nameButton==='blankPageButton'){
        this.showFormBuilderLayout = true
      } else if(nameButton==='exitButton') {
        this.$router.push('/form').catch(()=>{})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.button__close{
  width: fit-content;
  color: $blue10;
  border-radius: 12px;
  padding: 0.75rem;
  margin: 0.25rem 0;
  cursor: pointer;
  transition: all .1s ease-in;
  &:hover{
   color: $red5;
   box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
 }
}
.select__create__form {
  cursor: pointer;
  .button__grey{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 140px;
    height: 140px;
    background-color: $grey1;
    border-radius: 12px;
    transition: all .1s ease-in;
    .icon {
      font-size: 72px;
      color: $grey5;
    }
  }
  .text__blue {
    font-weight: $fw500;
    font-size: 1rem;
    color: $blue5;
  }
  .text__grey {
    font-weight: $fw500;
    font-size: 1rem;
    color: $grey5;
  }
  &:hover {
    .button__grey {
      border: 2px solid $blue4;
      .icon {color: $grey3;}
    }
    .text__blue {color: $blue4;}
    .text__grey {color: $grey4;}
  }
}
</style>