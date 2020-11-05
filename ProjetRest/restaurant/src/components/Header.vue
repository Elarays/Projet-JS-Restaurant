<template>
  <v-main>
    <v-toolbar flat class="mainHeader">
      <v-toolbar-title>Restaurants</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn text><router-link to="/">Home</router-link></v-btn>
        <v-btn text><router-link to="/Equipe">Team</router-link></v-btn>
        <v-btn text><router-link to="/ListeDesRestaurants">List of restaurants</router-link></v-btn>
      </v-toolbar-items>
      <div class="hidden-sm-and-up">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-app-bar-nav-icon v-on="on"></v-app-bar-nav-icon>
          </template>
          <v-list class="responsiveMenu">
            <v-list-item>
              <v-list-item-title><router-link to="/">Home</router-link></v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title><router-link to="/Equipe">Equipe</router-link></v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title><router-link to="/ListeDesRestaurants">Liste des restaurants</router-link></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-toolbar>
  </v-main>
</template>

<script>
export default {
  name: "Header",
  data: () => ({
  })
};
</script>

<style scoped>
  .v-toolbar__title {
    font-weight: 600;
    text-transform: uppercase;
  }

  .v-toolbar__content {
    @media only screen and (max-width: 599px) {
      padding: 0;
    }
  }

    v-btn {
      @media only screen and (max-width: 599px) {
        padding: 0 0 0 10px;
      }
    }
</style>