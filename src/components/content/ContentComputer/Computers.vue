<template>
  <div>
    <CustomTableOrdi striped hover :delete="this.delete" :items="this.computerList" :add="this.add"></CustomTableOrdi>
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
      errors: []
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
            "?page=+" + this.page +
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
      alert("on update");
      axios
        .put("http://10.0.1.97:8080/cdb/api/computers/", computer)
        .catch(e => {
          this.errors.push(e);
        });
    },
    add(computer){
      axios.post('http://10.0.1.97:8080/cdb/api/computers', computer)
        .then(function (response) {
          console.log(response.data)
        })
        .catch(function (error) {
          console.log(error)
        });
    }
  },
  created() {
    this.get();
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