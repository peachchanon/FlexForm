<template>
  <div>
    <div class="bg-grey7 tw-pt-2 tw-pl-2 tw-pr-2 tw-overflow-x-hidden" style="height: fit-content; max-height: 400px; border-radius: 10px 10px 0 0;">
      <div v-for="(element, index) in DataList" :key="index" class="base-padding base-shadow radius10px bg-white tw-mb-2 tw-cursor-pointer tw-flex tw-flex-row">
        <div class="tw-truncate tw-overflow-hidden tw-whitespace-nowrap tw-w-full">
          <span class="medium16 grey10">{{element}}</span>
        </div>
        <div class="tw-px-0.5" @click="editElement(index)"><Icon class="semibold24 tw-transition tw-ease-in-out grey10 hover:tw-text-grey5" icon="heroicons-outline:pencil"/></div>
        <div class="tw-px-0.5" @click="removeElement(index)"><Icon class="semibold24 tw-transition tw-ease-in-out red5 hover:tw-text-red4" icon="heroicons-outline:trash"/></div>
      </div>
    </div>
    <div class="bg-grey7 tw-pb-2 tw-pl-2 tw-pr-2" style="border-radius: 0 0 10px 10px">
      <div
          class="button__add tw-transition tw-ease-in-out base-padding bg-grey5 radius10px tw-flex tw-flex-col tw-items-center tw-border-dashed tw-border-2 tw-border-grey10 tw-cursor-pointer"
          @click="addElement"
      >
        <Icon class="semibold24 grey10" icon="akar-icons:plus"/>
      </div>
    </div>
    <!-- Edit Modal -->
    <transition name="theme-modal-fade" v-if="ShowEditModal">
      <div class="theme-modal-backdrop">
        <div class="theme-modal">
          <header class="base-padding tw-flex tw-flex-row tw-items-center tw-justify-start tw-relative">
            <Icon class="icon__style__large tw-mr-2 blue10" icon="bi:input-cursor"/>
            <span class="semibold24 blue10">Edit Label</span>
          </header>
          <section class="tw-pl-2.5 tw-pr-2.5 tw-overflow-x-hidden">
            <input class="medium16 base-padding radius10px tw-w-full" type="text" placeholder="Rename Section" v-model="ValueRename">
          </section>
          <footer class="tw-p-2.5 tw-flex tw-flex-row tw-justify-end">
            <div class="tw-w-1/3 tw-mr-1" @click="doCloseEditModal">
              <div class="button__style__white">Cancel</div>
            </div>
            <div class="tw-w-1/3 tw-ml-1" @click="doEdit">
              <div class="button__style__blue">Save</div>
            </div>
          </footer>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue2'
export default {
  name: "BaseOptionsFormBuilder",
  components: {
    Icon
  },
  emits: ['callbackAction'],
  props: {
    propList: Array,
  },
  data() {
    return {
      renderComponent: true,
      DataList: this.propList,
      ShowEditModal: false,
      StateEditIndex: 0,
      ValueRename: this.propList[this.StateEditIndex],
    }
  },
  methods: {
    forceRerender() {
      // Removing my-component from the DOM
      this.renderComponent = false;

      this.$nextTick(() => {
        // Adding the component back in
        this.renderComponent = true;
      });
    },
    addElement() {
      this.$emit('callbackAction', {action: 'add', index: this.StateEditIndex, value: 'New Label'})
    },
    removeElement(index) {
      this.$emit('callbackAction', {action: 'remove', index: index, value: ''})
    },
    editElement(index) {
      this.StateEditIndex = index
      this.ShowEditModal = true
      this.ValueRename = this.propList[this.StateEditIndex]
    },
    doCloseEditModal() {
      this.ShowEditModal = false
    },
    doEdit() {
      this.ShowEditModal = false
      this.$emit('callbackAction', {action: 'edit', index: this.StateEditIndex, value: this.ValueRename})
    }
  }
}
</script>

<style lang="scss" scoped>
.icon__style__large{
  font-size: 24px;
}
.button__add{
  &:hover{
    background-color: $grey4;
  }
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
</style>