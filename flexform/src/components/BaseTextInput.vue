<template>
  <div>
    <input v-if="type === 'text'" type="text" :placeholder="placeholder" class="medium16 base-padding radius10px tw-w-full">
    <input v-if="type === 'password'" type="password" :placeholder="placeholder" class="medium16 base-padding radius10px tw-w-full">
    <input v-if="type === 'email'" type="email" :placeholder="placeholder" class="medium16 base-padding radius10px tw-w-full">
  </div>
</template>

<script>
export default {
  props: {
    type: String,
    placeholder: String
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
