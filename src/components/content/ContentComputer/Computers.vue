<template>
  <div>
    <CustomTableOrdi striped hover :update="this.update" :delete="this.delete" :items="this.computerList" :add="this.add" :companies="this.companyList"></CustomTableOrdi>
  </div>
</template>

<script>
import CustomTableOrdi from "./CustomTableOrdi";
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "computers",
  props: ["updateVar", "componentUpdate"],
  components: { CustomTableOrdi },
  data() {
    return {
      computerList: [],
	  errors: [],
	  companyList: []
    };
  },
  computed: {
    ...mapGetters(["page", "size", "search"])
  },
  methods: {
    get() {
      axios
        .get(
          "http://10.0.1.97:8080/cdb/api/computers"+
            "?page=" + this.page +
            "&size=" + this.size +
            "&search=" + this.search + 
            "&orderBy=id"
        )
        .then(response => (this.computerList = response.data))
        .catch(e => {
          this.errors.push(e);
        });
    },
    delete(listId) {
      listId.forEach(elem => {
        axios
          .delete("http://10.0.1.97:8080/cdb/api/computers/" + elem)
          .then(() => this.get());
      });
    },
      update(computer) {
          if(computer.introduction==='') computer.introduction=null;
          if(computer.discontinued==='') computer.discontinued=null;
          axios
                  .put("http://10.0.1.97:8080/cdb/api/computers/", computer).then(()=>this.get())
                  .catch(e => {
                      this.errors.push(e);
                  });
      },
    add(computer){
      axios.post('http://10.0.1.97:8080/cdb/api/computers', computer)
              .then(()=>this.get())
    },
    getCompanies(){
       axios
        .get('http://10.0.1.97:8080/cdb/api/companies')
        .then(response => {
			this.companyList = response.data
  		})
    }
  },
  created() {
	this.get();
	this.getCompanies();
  },

  watch: {
    page: function() {
      this.get();
    },
    size: function() {
      this.get();
    },
    search: function() {
      this.get();
    }
  }
};
</script>