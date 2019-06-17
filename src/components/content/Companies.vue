<template>
  <div>
    <b-table striped hover :items="this.CompanyList"></b-table>
  </div>
</template>

<script>
  export default {
      name : 'companies',
      props : ['CompanyList']
  }
</script>