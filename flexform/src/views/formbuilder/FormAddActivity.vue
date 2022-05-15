<template>
  <div>
    <!-- Header -->
    <div class="tw-w-full bg-white base-padding base-shadow tw-fixed tw-z-40">
      <div class="tw-flex tw-flex-row tw-items-center">
        <div class="tw-mr-4">
          <div class="button__circle" @click="doExit">
            <Icon class="icon__style__large blue10" icon="heroicons-outline:chevron-left"/>
          </div>
        </div>
        <Icon class="icon__style__large blue10 tw-mr-4" icon="heroicons-outline:ticket"/>
        <span class="semibold18 blue10">{{PropTicketName}}</span>
      </div>
      <div class="tw-flex tw-flex-row tw-justify-center">
        Navigations
      </div>
    </div>
    <!-- Header -->
  </div>
</template>

<script>
import { Icon } from '@iconify/vue2'
export default {
  name: "FormAddActivity",
  components: {
    Icon
  },
  props: {
    PropFormId: String,
    PropTicketId: String,
    PropTicketName: String,
  },
  data() {
    return {
      // Value
      FormResponseName: String,
    }
  },
  async mounted() {
    
  },
  methods: {
    doExit(){
      this.$router.push({
        name: 'TicketResponse',
        params: {
          PropFormId: this.PropFormId,
          PropTicketId: this.PropTicketId,
        }
      })
    }
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