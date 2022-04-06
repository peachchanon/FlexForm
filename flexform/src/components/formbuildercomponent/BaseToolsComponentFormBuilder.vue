<template>
  <div>
    <!-- Navigation -->
    <div>
      <div 
          class="bg-grey6 hover:tw-bg-grey7 tw-cursor-pointer radiusFull tw-p-2 base-shadow tw-m-1 tw-transition tw-ease-in" 
          style="width: fit-content"
          @click="doButton('properties')"
      >
        <Icon class="medium18 white" icon="ep:setting"/>
      </div>
      <div
          class="bg-blue6 hover:tw-bg-blue7 tw-cursor-pointer radiusFull tw-p-2 base-shadow tw-m-1 tw-transition tw-ease-in"
          style="width: fit-content"
          @click="doShowMoveModal"
      >
        <Icon class="medium18 white" icon="heroicons-outline:cursor-click"/>
      </div>
      <!--
      <div 
          class="bg-yellow6 hover:tw-bg-yellow7 tw-cursor-pointer radiusFull tw-p-2 base-shadow tw-m-1 tw-transition tw-ease-in" 
          style="width: fit-content"
          @click="doButton('duplicate')"
      >
        <Icon class="medium18 white" icon="heroicons-outline:document-duplicate"/>
      </div>
      -->
      <div 
          v-if="componentLength >= 2"
          class="bg-red6 hover:tw-bg-red7 tw-cursor-pointer radiusFull tw-p-2 base-shadow tw-m-1 tw-transition tw-ease-in" style="width: fit-content"
          @click="doShowDeleteComponent()"
      >
        <Icon class="medium18 white" icon="heroicons-outline:trash"/>
      </div>
    </div>
    <!-- Delete Component Modal -->
    <transition name="theme-modal-fade" v-if="StateDeleteModal">
      <div class="theme-modal-backdrop">
        <div class="theme-modal">
          <header class="base-padding tw-flex tw-flex-row tw-items-center tw-justify-start tw-relative">
            <Icon class="icon__style__large tw-mr-2 red5" icon="heroicons-outline:trash"/>
            <span class="semibold24 red5">Delete Section ?</span>
          </header>
          <section class="tw-pl-3 tw-pr-3 tw-py-4 tw-overflow-x-hidden">
            <span class="medium16 grey10">You're about to delete {{this.componentType}}.</span>
          </section>
          <footer class="tw-p-2.5 tw-flex tw-flex-row tw-justify-end">
            <div class="tw-w-1/3 tw-mr-1">
              <div class="button__style__white red" @click="doShowDeleteComponent">No</div>
            </div>
            <div class="tw-w-1/3 tw-ml-1">
              <div class="button__style__red" @click="doButton('delete')">Yes</div>
            </div>
          </footer>
        </div>
      </div>
    </transition>
    <!-- Move Section Modal -->
    <transition name="theme-modal-fade" v-if="StateMoveModal">
      <div class="theme-modal-backdrop">
        <div class="theme-modal">
          <header class="base-padding tw-flex tw-flex-row tw-items-center tw-justify-start tw-relative">
            <Icon class="icon__style__large tw-mr-2 blue10" icon="heroicons-outline:cursor-click"/>
            <span class="semibold24 blue10">Move Component</span>
          </header>
          <section class="tw-pl-2.5 tw-pr-2.5 tw-overflow-x-hidden" style="height: 100%; max-height: 250px">
            <div class="tw-p-2">
              <span class="medium16 grey10">You can move component by drag and drop.</span>
            </div>
            <div class="tw-py-2">
              <span class="medium16 blue10">{{sectionName}}</span>
            </div>
            <draggable v-model="moveData" group="people" class="bg-grey1 tw-pl-3 tw-pr-3 tw-pt-1.5 tw-pb-1.5 radius12px" >
              <div
                  v-for="(item,index) in moveData" :key="index"
                  class="tw-flex tw-flex-row tw-items-center radius12px base-padding base-shadow tw-my-1.5 tw-cursor-pointer 
                  tw-bg-white hover:tw-bg-grey1 tw-text-blue10 hover:tw-text-blue8 tw-border-2 hover:tw-border-blue5 tw-transition tw-ease-in"
              >
                <div class="tw-w-1/6">
                  <div v-if="item.ComponentType==='paragraph'" class="tw-flex tw-flex-row">
                    <Icon class="icon__style__large tw-mr-1" icon="bi:text-paragraph"/><span class="text__style__icon">P</span>
                  </div>
                  <div v-if="item.ComponentType==='heading'" class="tw-flex tw-flex-row tw-justify-center tw-mr-2">
                    <span class="text__style__icon">H</span></div>
                </div>
                <div class="tw-w-4/6">
                  <span class="medium16 tw-w-full">{{item.ComponentType}}</span>
                </div>
                <div class="tw-w-1/6 tw-flex tw-flex-row tw-justify-end">
                  <Icon class="icon__style__large grey4" icon="heroicons-outline:dots-vertical"/>
                </div>
              </div>
            </draggable>
          </section>
          <footer class="tw-p-2.5 tw-flex tw-flex-row tw-justify-end">
            <div class="tw-w-1/3 tw-mr-1">
              <div class="button__style__white" @click="doShowMoveModal">Cancel</div>
            </div>
            <div class="tw-w-1/3 tw-ml-1">
              <div class="button__style__blue" @click="doButton('move')">Save</div>
            </div>
          </footer>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue2'
import draggable from 'vuedraggable'
export default {
  name: "BaseToolsComponentFormBuilder",
  components: {
    Icon,
    draggable
  },
  emits: ['callbackAction'],
  data() {
    return {
      // Delete
      StateDeleteModal: false,
      // Move
      StateMoveModal: false,
      moveData: this.componentData
    }
  },
  props: {
    componentLength: Number,
    componentIndex: Number,
    componentType: String,
    sectionName: String,
    componentData: Array,
  },
  methods: {
    // Delete Component
    doShowDeleteComponent () {
      this.StateDeleteModal = this.StateDeleteModal !== true
    },
    // Move Section
    doShowMoveModal() {
      this.StateMoveModal = this.StateMoveModal !== true
    },
    // Other
    doButton(action){
      if(action === 'delete') {
        this.StateDeleteModal = false
        this.$emit('callbackAction', {componentAction: 'delete',componentIndex: this.componentIndex})
      } else if(action === 'properties'){
        this.$emit('callbackAction', {componentAction: 'properties',componentIndex: this.componentIndex})
      } else if(action === 'duplicate'){
        this.$emit('callbackAction', {componentAction: 'duplicate',componentIndex: this.componentIndex})
      } else if(action === 'move') {
        this.StateMoveModal = false
        this.$emit('callbackAction', {componentAction: 'move',componentValue: this.moveData})
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.icon__style__large{
  font-size: 24px;
}
.theme-modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  z-index: 2;
}
.theme-modal {
  margin: 10rem 0;
  min-width: 375px;
  width: 460px;
  background-color: white;
  padding: 0.75rem;
  box-shadow: 0 0 0.5px rgba(10, 10, 10, 0.5);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  .button-close{
    color: #102A43;
    padding: 0.75rem;
    transition: all .1s ease-in;
    border-radius: 12px;
    margin: 0.25rem 0;
    cursor: pointer;
    &:hover{
      color: #D64545;
      box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
    }
  }
}
.theme-modal-fade-enter, .theme-modal-fade-leave-to {
  opacity: 0;
}
.theme-modal-fade-enter-active, .theme-modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
input{
  border: 1px solid $grey1;
  background-color: $grey1;
  color: $grey5;
  transition: all .1s ease-in;
}
input:focus{
  border: 1px solid $blue5;
  background-color: white;
  color: $grey10;
  outline: none !important;
}
.button__style__white {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: $blue5;
  padding: 0.75rem;
  transition: all .1s ease-in;
  border-radius: 12px;
  margin: 0.25rem 0;
  cursor: pointer;
  border-width: 1px;
  border-color: $blue5;
  background-color: white;
  &:hover{
    color: $blue3;
    border-color: $blue3;
  }
}
.button__style__white.red {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: $red5;
  padding: 0.75rem;
  transition: all .1s ease-in;
  border-radius: 12px;
  margin: 0.25rem 0;
  cursor: pointer;
  border-width: 1px;
  border-color: $red5;
  background-color: white;
  &:hover{
    color: $red3;
    border-color: $red3;
  }
}
.button__style__blue {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  padding: 0.75rem;
  transition: all .1s ease-in;
  border-radius: 12px;
  margin: 0.25rem 0;
  cursor: pointer;
  background-color: $blue5;
  &:hover{
    background-color: $blue6;
  }
}
.button__style__red {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  padding: 0.75rem;
  transition: all .1s ease-in;
  border-radius: 12px;
  margin: 0.25rem 0;
  cursor: pointer;
  background-color: $red5;
  &:hover{
    background-color: $red6;
  }
}
@media only screen and (min-width: 1023px) {
  .section__top__style{
    width: 768px;
  }
}
@media only screen and (max-width: 1024px) {
  .section__top__style{
    width: 640px;
  }
}
.text__style__icon{
  font-family: "Times New Roman", Times, serif;
  font-weight: $fw300;
  font-size: 1rem;
}
</style>