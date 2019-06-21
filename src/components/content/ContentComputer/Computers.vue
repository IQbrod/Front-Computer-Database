<template>
  <div>
    <CustomTableOrdi striped hover :delete="this.delete" :items="computerList"  ></CustomTableOrdi>
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
      componentKey: 0,
      errors: []
    };
  },
  computed: {
    ...mapGetters(["page"]),
  },
  methods: {
    get() {
      axios
        .get(
          "http://10.0.1.97:8080/cdb/api/computers?page=+" +
            this.page +
            "&size=10&search=&orderBy=id"
        )
        .then(response => (this.computerList = response.data))
        .catch(e => {
          this.errors.push(e);
        });
    },
    delete(listId) {
      listId.forEach((elem) => {
        axios
          .delete("http://10.0.1.97:8080/cdb/api/computers/" + elem)
          .then();
      });
    }
  },
  created() {
    this.get();
  },
  watch: {
    page: function() {
      this.get();
    }
  }
};
</script>