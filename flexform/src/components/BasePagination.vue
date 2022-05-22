<template>
  <div>
    <div class="">
      <ul class="pagination-style tw-flex tw-flex-row">
        <li class="base-padding page-item tw-mr-2"><span>Previous</span></li>
        <li class="base-padding page-item tw-mx-1" v-for="index in totalRows" :key="index"><span>{{index}}</span></li>
        <li class="base-padding page-item tw-ml-2"><span>Next</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BasePagination',
  data() {
    return {
      
    }
  },
  props: {
    totalRows: Number,
    perPage: Number,
  }
}
</script>

<style lang="scss" scoped>
.pagination-style{
  width: fit-content;
  .page-item{
    color: $blue5;
    border: 1px solid $blue5;
    border-radius: 10px;
    background-color: white;
    cursor: pointer;
    &:hover{
      color: white;
      border: 1px solid $blue5;
      background-color: $blue5;
      border-radius: 10px;
      transition: all .1s ease-in;
    }
    &:active{
      color: white;
      border: 1px solid $blue8;
      background-color: $blue8;
      border-radius: 10px;
      transition: all .1s ease-in;
    }
  }
}
</style>