<template>
<v-app>
    <v-app-bar flat max-height="65">
      <Header />
    </v-app-bar>

    <router-view></router-view>
    <v-footer>
      <Footer />
    </v-footer>
</v-app>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "App",


  components: {
    Header,
    Footer
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
