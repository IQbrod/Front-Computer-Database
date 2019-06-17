<template>
  <div id="cont">
    <b-jumbotron  id="jumb" lead="Computer DataBase">
      <computers :ComputerList="computerList"/>
    </b-jumbotron>
  </div>
</template>

<script>
import computers from "./Computers";
import axios from 'axios';

export default {
  name: "ComputerDashboard",
  components: {
    computers
  },
  props: {},
  data(){
    return{
    computerList: [],
    errors: []
    }
  },
  created() {
        axios.get(`http://10.0.1.97:8080/cdb/api/computers?page=1&size=10&search=&orderBy=id`)
            .then((response) => this.computerList = response.data)
            .catch(e => {this.errors.push(e)})
            
    }
};
</script>

<style>

#cont{
  margin: 3%;
}

#jumb{
  background-color: #e2f0f3a4;
}
</style>
