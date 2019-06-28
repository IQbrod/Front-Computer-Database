<template>
  <!-- Footer -->
  <div class="footer">
   <b-navbar toggleable="lg" type="dark" variant="info">
    <b-container class="text-left">
        <b-nav-text sm="3">
          <p>Team:</p>
        </b-nav-text>
        <b-nav-text sm="3">
          <p>Sazerat Jérémy</p>
        </b-nav-text>
        <b-nav-text sm="3">
         <p>Grau Adrian</p>
        </b-nav-text>
        <b-nav-text sm="3">
         <p>Ingani Jude</p>
        </b-nav-text>
        <b-nav-text sm="3">
         <p>Parisot Paul-andréa</p>
        </b-nav-text>
        <b-nav-text sm="3">
         <p>Sigre-Lorge Tristan</p>
        </b-nav-text>
    </b-container>
   </b-navbar>
   <b-navbar type="light" variant="light" >
      <b-nav-text id="navtext">
        &copy; 2019 Copyright 
      </b-nav-text>
   </b-navbar >
   </div>
  <!-- Footer -->
</template>

<script>
  export default {
    name: 'Footer',
   
  }
</script>
<style scoped>
  #navtext{
    margin-left: 45%
    
  }
  .bg-info{
  background-color: #003459 !important;
  }
  .footer{
  position: relative;
  right: 0;
  bottom: 0;
  left: 0;
  }
</style>