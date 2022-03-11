<template>
  <div>
    <vue-hcaptcha sitekey="8a7cae83-803e-412d-906e-8dbcda2dd737"></vue-hcaptcha >
  </div>
</template>

<script>
import VueHcaptcha from "@hcaptcha/vue-hcaptcha";

export default {
  name: "Captcha.vue",
  components:{
    VueHcaptcha
  }
}
</script>

<style lang="scss" scoped>

</style>