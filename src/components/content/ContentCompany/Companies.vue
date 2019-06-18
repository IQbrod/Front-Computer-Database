<template>
  <div>
    <CustomTableCompany striped hover :items="this.companyList"></CustomTableCompany>
  </div>
</template>

<script>
  import CustomTableCompany from './CustomTableCompany';
  import axios from "axios";

  export default {
      name : 'companies',
    components: {CustomTableCompany},
    data() {
        return {
          companyList: [],
          errors: []
        }
    },
  created() {
    axios
            .get(
                    `http://10.0.1.97:8080/cdb/api/companies?page=1&size=10`
            )
            .then(response => (this.companyList = response.data))
            .catch(e => {
              this.errors.push(e);
            });
  }
  }
</script>