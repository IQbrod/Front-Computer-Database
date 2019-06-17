<template>
  <div>
    <b-table striped hover :items="this.ComputerList"></b-table>
  </div>
</template>

<script>
import pagination from './Pagination'

  export default {
      name : 'computers',
      props : ['ComputerList'],
  }
</script>