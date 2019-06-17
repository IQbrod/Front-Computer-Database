<template>
  <div>
    <CustomTableOrdi striped hover :items="this.ComputerList"></CustomTableOrdi>
  </div>
</template>

<script>
  import CustomTableOrdi from './CustomTableOrdi'
  export default {
      name : 'computers',
      props : ['ComputerList', 'CustomTableOrdi'],
    components: {CustomTableOrdi},
    data() {
      return {
        
      }
    }
  }
</script>