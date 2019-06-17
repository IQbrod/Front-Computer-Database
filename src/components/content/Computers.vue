<template>
  <div>
    <b-table striped hover :items="this.ComputerList"></b-table>
  </div>
</template>

<script>
  export default {
      name : 'computers',
      props : ['ComputerList'],
  }
</script>