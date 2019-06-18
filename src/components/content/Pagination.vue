<template>
  <div class="overflow-auto">
    <div>
      <b-pagination align="center" v-model="currentPage" :total-rows="rows" :per-page="size"></b-pagination>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
  export default {
    data() {
      return {
        rows: 100,
        currentPage: 1,
        size: 10
      }
    },
    methods: {
      ...mapMutations([
        'setPage',
      ])
    },
    watch: {
      currentPage: function(value) {
        this.setPage(value)
      }
    }
  }
</script>