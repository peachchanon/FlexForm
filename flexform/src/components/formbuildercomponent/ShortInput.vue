<template>
  <div class="base-padding">
    InputText: {{dataShortInput}}
  </div>
</template>

<script>
export default {
  name: "ShortInput",
  props: {
    dataShortInput: {
      LabelText: String,
      SubLabelText: String,
      Alignment: String,
      Required: Boolean,
      Placeholder: String,
      Width: String,
      ReadOnly: Boolean,
      CharacterLimit: Boolean,
      Validation: String,
      FontColor: String,
      InputBgColor: String,
      BorderColor: String,
      LabelFontSize: Number,
    }
  },
  data() {
    return {}
  },
  computed: {},
  methods: {}
}
</script>

<style lang="scss" scoped>

</style>