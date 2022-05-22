<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Prompt:wght@300;500;600&display=swap');
#app {
  font-family: 'Prompt', sans-serif;
  height: 100%;
  margin: 0;
  background-color: $grey1;
}
html, body {
  height: 100%;
  margin: 0;
  background-color: $grey1;
}
/* width */
::-webkit-scrollbar {
  width: 10px;
}
/* Track */
::-webkit-scrollbar-track {
  background: $grey1;
  border-radius: 12px;
}
/* Handle */
::-webkit-scrollbar-thumb {
  background: $grey5;
  border-radius: 12px;
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: $grey6;
}
</style>
