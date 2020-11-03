<template>
<v-app>
    <v-app-bar flat max-height="65">
      <Header />
    </v-app-bar>

    <router-view></router-view>
</v-app>
</template>

<script>
import Header from "./components/Header";
export default {
  name: "App",


  components: {
    Header
  },

data: () => ({
    //
  })
};

</script>

<style>
 /* #app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  background: gray;
} */
</style>
