<template>
  <div id="app">
    <date-picker v-model="time1" valueType="format" placeholder="Select date"></date-picker>
    <date-picker v-model="time2" type="datetime" placeholder="Select datetime"></date-picker>
    <date-picker v-model="time3" range placeholder="Select range"></date-picker>
    <date-picker v-model="time4" type="time" placeholder="Select time"></date-picker>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
export default {
  components: { DatePicker },
  data() {
    return {
      time1: null,
      time2: null,
      time3: null,
      time4: null,
    };
  },
};
</script>

<style lang="scss" scoped>

</style>
