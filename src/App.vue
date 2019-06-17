<template>
  <div id="app">
    <navbar/>
    <div>
      <contentBody/>
    </div>
  </div>
</template>

<script>
import navbar from "./components/header/Navbar";
import contentBody from "./components/content/ComputerDashBoard";

export default {
  name: "app",
   components: {
    navbar,
    contentBody,
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
