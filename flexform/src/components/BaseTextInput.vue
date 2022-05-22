<template>
  <div>
    <input v-if="type === 'text'" type="text" :placeholder="placeholder" class="medium16 base-padding radius10px tw-w-full" v-model="showString" @input="doString">
    <input v-if="type === 'password'" type="password" :placeholder="placeholder" class="medium16 base-padding radius10px tw-w-full" v-model="showString" @input="doString">
    <input v-if="type === 'email'" type="email" :placeholder="placeholder" class="medium16 base-padding radius10px tw-w-full" v-model="showString" @input="doString">
    <input v-if="type === 'date'" type="date" :placeholder="placeholder" class="medium16 base-padding radius10px tw-w-full" v-model="showDate" @input="doDate">
    <input v-if="type === 'phone'" type="text" :placeholder="placeholder" class="medium16 base-padding radius10px tw-w-full" v-model="showPhoneNumberPattern" @input="doPhoneNumber">
  </div>
</template>

<script>
export default {
  emits: ['callBackString','callBackDate'],
  data() {
    return {
      showPhoneNumberPattern: '',
      showString: '',
      showDate: '',
      phoneNumber: '',
    }
  },
  props: {
    type: String,
    placeholder: String
  },
  methods: {
    doString() {
      this.$emit('callBackString',this.showString)
    },
    doDate() {
      this.$emit('callBackDate',this.showDate)
    },
    doPhoneNumber() {
      const x = this.showPhoneNumberPattern.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      this.showPhoneNumberPattern = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
      this.phoneNumber = this.showPhoneNumberPattern.replace(/[^\d]/g, '')
      this.$emit('callBackString',this.phoneNumber)
    }
  }
}
</script>

<style lang="scss" scoped>
input{
  border: 1px solid white;
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
</style>
