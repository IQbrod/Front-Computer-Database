<template>
  <div id="app">
    <cdb/>
  </div>
</template>

<script>


import cdb from './components/Body'

export default {
  name: 'app',
  components: {
    cdb,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
</style>
