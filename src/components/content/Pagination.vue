<template>
  <div class="overflow-auto">
    <div>
      <b-pagination align="center" v-model="currentPage" :total-rows="this.count()" :per-page="this.size()"></b-pagination>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
  export default {
    data() {
      return {
        currentPage: this.page()
      }
    },
    methods: {
      ...mapMutations([
        'setPage',
      ]),
      ...mapGetters([
        'page',
        'count',
        'size'
      ])
    },
    watch: {
      currentPage: function(value) {
        this.setPage(value)
      }
    }
  }
</script>