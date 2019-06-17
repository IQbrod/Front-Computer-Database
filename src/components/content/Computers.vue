<template>
  <div>
    <b-table striped hover :items="this.ComputerList"></b-table>
    <pagination className="page"/>
  </div>
</template>

<script>
import pagination from './Pagination'

  export default {
      name : 'computers',
      props : ['ComputerList'],
      components: {
        pagination,
       },
    data() {
      return {
        
      }
    }
  }
</script>

<style>

</style>
