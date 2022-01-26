<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Prompt:wght@300;500;600&display=swap');
#app {
  font-family: 'Prompt', sans-serif;
  height: 100%;
  margin: 0;
}
html, body {
  height: 100%;
  margin: 0;
}
</style>
