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
}
::-webkit-scrollbar {
  width: 10px;
  background: white;
}
::-webkit-scrollbar-track {
  box-shadow: inset 0px 0px 20px 0px rgba(0,0,0,0.1);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  background: $grey4;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  width: 10px;
  background: $grey5;
}
</style>
