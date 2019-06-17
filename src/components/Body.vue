<template>
  <div class="hello">
    <navbar/>
    <div>
      <contentB/>
    </div>
  </div>
</template>

<script>
import navbar from "./header/navbar";
import contentB from './content/contentB';

export default {
  name: "cdb",
  components: {
    navbar,
    contentB,
  },
  props: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
