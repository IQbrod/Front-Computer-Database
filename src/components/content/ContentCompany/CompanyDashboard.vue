<template>
  <div id="cont">
    <b-jumbotron id="jumb" lead="Company DataBase">
      <companies :CompanyList="companyList"/>
    </b-jumbotron>
    <pagination className="page"/>
  </div>
</template>

<script>
import pagination from '../Pagination'
import companies from "./Companies";
import axios from "axios";

export default {
  name: "CompanyDashboard",
  components: {
    companies,
    pagination
  },
  props: {},
  data() {
    return {
      companyList: [],
      errors: []
    };
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
};
</script>

<style>
#cont {
  margin: 3%;
}

#jumb {
  background-color: #fcfcfc;
  opacity: 10%;
}
.table {
  background-color: #eff8f8;
  
}
</style>
