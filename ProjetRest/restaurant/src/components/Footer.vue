<template>
  <v-footer  padless>
    <v-col
      class="text-center"
      cols="12"
    >
    
      {{ new Date().getFullYear() }} — <strong>Vue proejct JS</strong>
    </v-col>
    
  </v-footer>
</template>

<script>
export default {
  name: "Header",
  data: () => ({
  })
};
</script>

<style >
v-footer{
    background: white !important;
    
};
@media only screen and (max-width: 600px){
v-card-text{
    padding : 16px;
}
};
@media only screen and (max-width: 599px){
    v-btn{
    margin : 7px !important;
}
};
</style>