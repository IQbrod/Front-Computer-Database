<template>
  <div class="overflow-auto">
    <div>
      <b-pagination align="center" v-model="currentPage" :total-rows="rows" :per-page="this.$store.size"></b-pagination>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
  export default {
    data() {
      return {
        rows: 100,
        currentPage: this.page()
      }
    },
    methods: {
      ...mapMutations([
        'setPage',
      ]),
      ...mapGetters([
        'page'
      ])
    },
    watch: {
      currentPage: function(value) {
        this.setPage(value)
      }
    }
  }
</script>