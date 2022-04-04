<template>
  <div>
    Paragraph
    {{dataParagraph}}
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    dataParagraph: {
      LabelText: String,
      Alignment: String,
      Width: String,
      FontColor: String,
      FontSize: Number,
    }
  },
}
</script>

<style scoped>

</style>