<template>
  <div id="app">
    <VitalSign></VitalSign>
  </div>
</template>

<script>
import VitalSign from './components/VitalSign.vue'

export default {
  name: 'App',
  components: {
    VitalSign
  }
}
</script>

<style>
#app {
  //font-family: Avenir, Helvetica, Arial, sans-serif;
  //-webkit-font-smoothing: antialiased;
  //-moz-osx-font-smoothing: grayscale;
  //text-align: center;
  //color: #2c3e50;
  //margin-top: 60px;
  width: 100vw;
  height: 100vh;
}
body{
  margin: 0;
}
</style>
