<template>
  <div>
    <CustomTableCompany striped hover :items="this.CompanyList"></CustomTableCompany>
  </div>
</template>

<script>
  import CustomTableCompany from './CustomTableCompany'
  export default {
      name : 'companies',
      props : ['CompanyList'],
    components: {CustomTableCompany}
  }
</script>