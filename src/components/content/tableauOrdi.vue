<template>
  <div>
    <b-table striped hover :items="this.ComputerList"></b-table>
  </div>
</template>

<script>
  export default {
      name : 'tableauOrdi',
      props : ['ComputerList'],
    data() {
      return {
        
      }
    }
  }
</script>

<style>

</style>
