<template>
  <div class="section__top__style tw-flex tw-flex-row tw-items-center tw-justify-between tw-my-3">
    <div class="medium16 blue10">
      {{sectionName}}
    </div>
    <div class="tw-flex tw-flex-row">
      <div 
          class="tw-mx-2 blue10 hover:tw-text-blue5 tw-cursor-pointer tw-transition tw-ease-in tw-flex tw-flex-row"
          @click="doButton('rename')"
      >
        <Icon class="icon__style__large tw-mr-2" icon="bi:input-cursor"/>
        <span class="medium16" v-if="StateShowContentForWindowSize">Rename</span>
      </div>
      <div 
          class="tw-mx-2 blue10 hover:tw-text-blue5 tw-cursor-pointer tw-transition tw-ease-in tw-flex tw-flex-row"
          @click="doShowMoveModal"
      >
        <Icon class="icon__style__large tw-mr-2" icon="heroicons-outline:cursor-click"/>
        <span class="medium16" v-if="StateShowContentForWindowSize">Move</span>
      </div>
      <div 
          class="tw-mx-2 blue10 hover:tw-text-blue5 tw-cursor-pointer tw-transition tw-ease-in tw-flex tw-flex-row"
          @click="doButton('duplicate')"
      >
        <Icon class="icon__style__large tw-mr-2" icon="heroicons-outline:document-duplicate"/>
        <span class="medium16" v-if="StateShowContentForWindowSize">Duplicate</span>
      </div>
      <div 
          class="tw-mx-2 red5 hover:tw-text-red4 tw-cursor-pointer tw-transition tw-ease-in tw-flex tw-flex-row"
          @click="doShowDeleteModal"
          v-if="sectionLength>=2"
      >
        <Icon class="icon__style__large tw-mr-2" icon="heroicons-outline:trash"/>
        <span class="medium16" v-if="StateShowContentForWindowSize">Delete</span>
      </div>
      <div 
          class="tw-mx-2 blue10 hover:tw-text-blue5 tw-cursor-pointer tw-transition tw-ease-in tw-flex tw-flex-row"
          @click="doButton('add')"
      >
        <Icon class="icon__style__large tw-mr-2" icon="heroicons-outline:document-add"/>
        <span class="medium16" v-if="StateShowContentForWindowSize">Add Sections</span>
      </div>
    </div>
    <!-- Rename Section Modal -->
    <transition name="theme-modal-fade" v-if="StateRenameModal">
      <div class="theme-modal-backdrop">
        <div class="theme-modal">
          <header class="base-padding tw-flex tw-flex-row tw-items-center tw-justify-start tw-relative">
            <Icon class="icon__style__large tw-mr-2 blue10" icon="bi:input-cursor"/>
            <span class="semibold24 blue10">Rename</span>
          </header>
          <section class="tw-pl-2.5 tw-pr-2.5 tw-overflow-x-hidden">
            <input class="medium16 base-padding radius10px tw-w-full" type="text" placeholder="Rename Section" v-model="ValueRenameString">
          </section>
          <footer class="tw-p-2.5 tw-flex tw-flex-row tw-justify-end">
            <div class="tw-w-1/3 tw-mr-1" @click="doShowRenameModal">
              <div class="button__style__white">Cancel</div>
            </div>
            <div class="tw-w-1/3 tw-ml-1" @click="doRename">
              <div class="button__style__blue">Save</div>
            </div>
          </footer>
        </div>
      </div>
    </transition>
    <!-- Rename Section Alert : Complete -->
    <base-alert-form-builder
        v-if="StateBadgeRenameComplete"
        type="success"
        data="Rename Complete"
        @callbackClose="doRenameSectionAlertBadge"
    ></base-alert-form-builder>
    <!-- Move Section Modal -->
    <transition name="theme-modal-fade" v-if="StateMoveModal">
      <div class="theme-modal-backdrop">
        <div class="theme-modal">
          <header class="base-padding tw-flex tw-flex-row tw-items-center tw-justify-start tw-relative">
            <Icon class="icon__style__large tw-mr-2 blue10" icon="heroicons-outline:cursor-click"/>
            <span class="semibold24 blue10">Move Section</span>
          </header>
          <section class="tw-pl-2.5 tw-pr-2.5 tw-overflow-x-hidden" style="height: 100%; max-height: 250px">
            <div class="tw-p-2">
              <span class="medium16 grey10">You can move section by drag and drop section component.</span>
            </div>
            <draggable v-model="SectionsData" group="people" class="bg-grey1 tw-pl-3 tw-pr-3 tw-pt-1.5 tw-pb-1.5 radius12px" >
              <div 
                  v-for="(item,index) in SectionsData" :key="index"
                  class="tw-flex tw-flex-row tw-items-center radius12px base-padding base-shadow tw-my-1.5 tw-cursor-pointer 
                  tw-bg-white hover:tw-bg-grey1 tw-text-blue10 hover:tw-text-blue8 tw-border-2 hover:tw-border-blue5 tw-transition tw-ease-in"
              >
                <Icon class="icon__style__large tw-mr-2" icon="heroicons-outline:document"/>
                <span class="medium16 tw-w-full">{{item.SectionName}}</span>
                <Icon class="icon__style__large grey4" icon="heroicons-outline:dots-vertical"/>
              </div>
            </draggable>
          </section>
          <footer class="tw-p-2.5 tw-flex tw-flex-row tw-justify-end">
            <div class="tw-w-1/3 tw-mr-1">
              <div class="button__style__white" @click="doShowMoveModal">Cancel</div>
            </div>
            <div class="tw-w-1/3 tw-ml-1">
              <div class="button__style__blue" @click="doMove">Save</div>
            </div>
          </footer>
        </div>
      </div>
    </transition>
    <!-- Delete Section Modal -->
    <transition name="theme-modal-fade" v-if="StateDeleteModal">
      <div class="theme-modal-backdrop">
        <div class="theme-modal">
          <header class="base-padding tw-flex tw-flex-row tw-items-center tw-justify-start tw-relative">
            <Icon class="icon__style__large tw-mr-2 red5" icon="heroicons-outline:trash"/>
            <span class="semibold24 red5">Delete Section ?</span>
          </header>
          <section class="tw-pl-3 tw-pr-3 tw-py-4 tw-overflow-x-hidden">
            <span class="medium16 grey10">You're about to delete {{this.sectionName}}.</span>
          </section>
          <footer class="tw-p-2.5 tw-flex tw-flex-row tw-justify-end">
            <div class="tw-w-1/3 tw-mr-1">
              <div class="button__style__white red" @click="doShowDeleteModal">No</div>
            </div>
            <div class="tw-w-1/3 tw-ml-1">
              <div class="button__style__red" @click="doButton('delete')">Yes</div>
            </div>
          </footer>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue2'
import { mapGetters, mapActions } from 'vuex'
import BaseAlertFormBuilder from '@/components/formbuildercomponent/BaseAlertFormBuilder'

import draggable from 'vuedraggable'

export default {
  name: "BaseNavigationToolsSectionFormBuilder",
  components: {
    Icon,
    BaseAlertFormBuilder,
    draggable
  },
  emits: ['callbackAction','callbackRenameValue','callbackSection'],
  data() {
    return {
      StateShowContentForWindowSize: true,
      // Rename
      StateRenameModal: false,
      ValueRenameString: this.sectionName,
      StateBadgeRenameComplete: false,
      // Move
      StateMoveModal: false,
      SectionsData: this.sectionList,
      // Delete
      StateDeleteModal: false,
    }
  },
  props: {
    sectionName: String,
    sectionIndex: Number,
    sectionList: Array,
    sectionLength: Number,
  },
  watch:{
    windowResize () {
      this.StateShowContentForWindowSize = window.innerWidth >= 1024
    },
  },
  computed: {
    ...mapGetters(['windowResize'])
  },
  async mounted () {
    window.onresize = () => {
      this.flapWindowResize()
    }
    this.StateShowContentForWindowSize = window.innerWidth >= 1024
  },
  methods: {
    ...mapActions(['flapWindowResize']),
    // Rename Section
    doShowRenameModal () {
      this.ValueRenameString = this.sectionName
      this.StateRenameModal = this.StateRenameModal !== true
    },
    doRename(){
      if(this.ValueRenameString === '') {
        this.$emit('callbackRenameValue', this.sectionIndex,this.sectionName)
      } else {
        this.$emit('callbackRenameValue', this.sectionIndex,this.ValueRenameString)
        this.StateBadgeRenameComplete = true
      }
      this.StateRenameModal = this.StateRenameModal !== true
    },
    doRenameSectionAlertBadge(state) {
      this.StateBadgeRenameComplete = this.StateBadgeRenameComplete === state // Close Badge
    },
    // Move Section
    doShowMoveModal () {
      this.SectionsData = this.sectionList
      this.StateMoveModal = this.StateMoveModal !== true
    },
    doMove() {
      this.$emit('callbackSection',this.SectionsData)
      this.StateMoveModal = false
    },
    // Delete Section
    doShowDeleteModal () {
      this.StateDeleteModal = this.StateDeleteModal !== true
    },
    // Other
    doButton(action){
      if(action === 'rename'){
        this.StateRenameModal = true
      } else if(action === 'move') {
        this.StateMoveModal = false
      } else if(action === 'delete') {
        this.StateDeleteModal = false
      }
      this.$emit('callbackAction', [action,this.sectionName,this.sectionIndex])
    },
  },
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
</style>