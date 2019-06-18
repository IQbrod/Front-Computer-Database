<template>
  <div>
    <CustomTableOrdi striped hover :items="this.ComputerList"></CustomTableOrdi>
  </div>
</template>

<script>
  import CustomTableOrdi from './CustomTableOrdi'
  export default {
      name : 'computers',
      props : ['ComputerList'],
    components: {CustomTableOrdi},
    data() {
      return {
        
      }
    }
  }
</script>