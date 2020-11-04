<template>
  <!-- Liste des restaurants -->
  <section id="services" v-bind:style="{ background: color }">
    >
    <div class="container">
      <div class="row">
        <div class="col-lg-12 text-center">
          <h2 class="section-heading text-uppercase">Restaurants</h2>
          <h3 class="section-subheading text-muted">
            La liste des Restaurants.
          </h3>
        </div>
      </div>
      <h2>{{ msg }}</h2>

      <v-dialog max-width="600px" v-model="dialog">
        <template v-slot:activator="{ on }">
          <div class="btnajout">
            <v-btn slot="activator" v-on="on">Add New Restaurant</v-btn>
          </div>
        </template>
        <v-card>
          <v-card-title>
            <h2>Add Restaurant</h2>
          </v-card-title>
          <v-card-text>
            <v-form
              class="px-3"
              ref="form"
              @submit.prevent="ajouterRestaurant($event)"
            >
              <v-text-field
                required
                v-model="nom"
                label="Nom-restaurant"
                name="nom"
                prepend-icon="folder"
                :rules="inputRules"
              ></v-text-field>
              <v-text-field
                required
                v-model="cuisine"
                label="cuisine"
                name="cuisine"
                prepend-icon="edit"
                :rules="inputRules"
              ></v-text-field>
              <v-text-field
                v-model="ville"
                label="ville"
                prepend-icon="edit"
                :rules="inputRules"
              >
              </v-text-field>
              <v-spacer></v-spacer>
              <v-btn
                text
                type="submit"
                class="success mx-0 mt-3"
                :loading="loading"
              >
                Ajouter
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>

      <p>Nb de pages total : {{ nbPagesTotal }}</p>
      <p>
        Nb restaurants par page :
        <input
          @input="getRestaurantsFromServer()"
          type="range"
          min="2"
          max="1000"
          v-model="pagesize"
        />{{ pagesize }}
      </p>
      <md-button md-raised :disabled="page === 0" @click="pagePrecedente()"
        >Précédent</md-button
      >&nbsp;&nbsp;
      <md-button
        md-raised
        :disabled="page === nbPagesTotal"
        @click="pageSuivante()"
      >
        Suivant
      </md-button>
      &nbsp; Page courante : {{ page }}
      <br />

      <!--tableau-->
      <md-table
        class="Maintab"
        md-card
        @md-selected="onSelect"
        v-model="restaurants"
        md-sort="name"
        md-sort-order="asc"
      >
        <md-table-toolbar>
          <div class="md-toolbar-section-start"></div>

          <md-field md-clearable class="md-toolbar-section-end">
            <md-input
              placeholder="Search by name..."
              v-model="nomRestauRecherche"
              type="text"
              @input="chercherRestaurants()"
            />
          </md-field>
        </md-table-toolbar>
        <md-table-toolbar
          slot="md-table-alternate-header"
          slot-scope="{ count }"
        >
          <div class="md-toolbar-section-start">
            {{ getAlternateLabel(count) }}
          </div>
          <div class="md-toolbar-section-end"></div>
          <div class="md-toolbar-section-end">
            <v-btn class="succes" @click="Delete()" :loading="loading">
              <v-icon dark>delete</v-icon>
            </v-btn>
          </div>
        </md-table-toolbar>
        <md-table-empty-state
          md-label="No restaurant found"
          :md-description="`No restaurant found for this '${search}' query. Try a different search term or create a new restaurant.`"
        >
          <md-button class="md-primary md-raised" @click="ssubmit"
            >Create New User</md-button
          >
        </md-table-empty-state>
        <md-table-row class="headtab">
          <md-table-head>Nom</md-table-head>
          <md-table-head>Cuisine</md-table-head>
          <md-table-head>Ville</md-table-head>
        </md-table-row>

        <md-table-row
          slot="md-table-row"
          slot-scope="{ item, index }"
          :md-disabled="item.name.includes('Stave')"
          md-selectable="multiple"
          md-auto-select
          :style="{ backgroundColor: getColor(index) }"
          :class="{ bordureRouge: index === 2 }"
        >
          <md-table-cell md-label="Name" md-sort-by="name">
            {{ item.name }}
          </md-table-cell>
          <md-table-cell md-label="Cuisine" md-sort-by="cuisine">{{
            item.cuisine
          }}</md-table-cell>
          <md-table-cell md-label="Ville" md-sort-by="borough">
            {{ item.borough }}
          </md-table-cell>
          <md-table-cell md-label="Action">
            <router-link tag="button" :to="'/Restaurant/' + item._id">
              [Detail d'un Restaurant]
            </router-link>
          </md-table-cell>
        </md-table-row>
      </md-table>
    </div>
  </section>
</template>

<script>
import _ from "lodash";
export default {
  name: "app",
  components: {},
  namee: "ListeDesRestaurants",
  data: function () {
    return {
      restaurants: [],
      nom: "",
      cuisine: "",
      ville: "",
      adress :"",
      street :"",
      nbRestaurantsTotal: 0,
      page: 0,
      search: "",
      pagesize: 10,
      nbPagesTotal: 0,
      //msg: "",
      nomRestauRecherche: "",
      selected: [],
      loading: false,
      color: "linear-gradient(45deg, #49a09d, #5f2c82)",
      inputRules: [
        (v) => !!v || "This field is required",
        (v) => v.length >= 3 || "Minimum length is 3 characters",
      ],
      dialog: false,
      menu: false,
    };
  },
  mounted() {
    console.log("AVANT AFFICHAGE");
    this.getRestaurantsFromServer();
  },
  methods: {
    ssubmit: function () {
      this.$refs.form.submit();
    },
    pagePrecedente() {
      if (this.page === 0) return;

      this.page--;
      this.getRestaurantsFromServer();
    },

    onSelect(items) {
      this.selected = items;
    },

    getAlternateLabel(count) {
      var plural = "";

      if (count > 1) {
        plural = "s";
      }

      return `${count} restaurant${plural} selected`;
    },

    pageSuivante() {
      if (this.page === this.dernierePage) return;
      this.page++;
      this.getRestaurantsFromServer();
    },
    getRestaurantsFromServer() {
      let url = "http://localhost:8080/api/restaurants?";
      url += "page=" + this.page;
      url += "&pagesize=" + this.pagesize;
      url += "&name=" + this.nomRestauRecherche;

      fetch(url)
        .then((responseJSON) => {
          // arrow functions, conserve le bon "this"
          // la réponse est en JSON, on la convertit avec la ligne suivante
          responseJSON.json().then((resJS) => {
            // Maintenant resJS est un vrai objet JavaScript
            this.restaurants = resJS.data;
            this.nbRestaurantsTotal = resJS.count;
            this.nbPagesTotal = Math.round(
              this.nbRestaurantsTotal / this.pagesize
            );
          });
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    chercherRestaurants: _.debounce(function () {
      // appelée que si on n'a pas tapé de touches pendant un certain délai
      this.getRestaurantsFromServer();
    }, 300),

    Delete() {
      this.selected.forEach((restaurant_list) => {
        this.supprimerRestaurant(restaurant_list);
      });
    },

    supprimerRestaurant(r) {

      let url = "http://localhost:8080/api/restaurants/" + r._id;
       this.$toast.success({
                title: "Catatrophe !!!",
                showMethod: "fadeInRight",
                hideMethod: "lightSpeedOut",
                message: "un restaurant viens de nous quitter !",
                color: "#0B58B2",
              });

      fetch(url, {
        method: "DELETE",
      })
        .then((responseJSON) => {
          responseJSON.json().then((resJS) => {
            // Maintenant res est un vrai objet JavaScript
            console.log(resJS.msg);
            

            //this.msg = resJS.msg;
            // On rafraichit la vue
            this.getRestaurantsFromServer();
          });
        })
        .catch(function (err) {
          console.log(err);
        });
    },

    ajouterRestaurant(event) {
      if (this.$refs.form.validate()) {
        // Récupération du formulaire. Pas besoin de document.querySelector
        // ou document.getElementById puisque c'est le formulaire qui a généré
        // l'événement
        let form = event.target;
        this.$refs.form.reset();

        // Récupération des valeurs des champs du formulaire
        // en prévision d'un envoi multipart en ajax/fetch
        let donneesFormulaire = new FormData(form);

        let url = "http://localhost:8080/api/restaurants";

        fetch(url, {
          method: "POST",
          body: donneesFormulaire,
        })
          .then((responseJSON) => {
            responseJSON.json().then((resJS) => {
              // Maintenant res est un vrai objet JavaScript
              console.log(resJS.msg);
              this.$toast.success({
                title: "YOUPI !!!",
                showMethod: "fadeInRight",
                hideMethod: "lightSpeedOut",
                message: "un restaurant viens d'etre ajouté !",
                color: "#0B58B2",
              });
              //this.msg = resJS.msg;

              this.dialog = false;
              // On rafraichit la vue
              this.getRestaurantsFromServer();
            });
          })
          .catch(function (err) {
            console.log(err);
          });
      this.nom = "";
      this.cuisine = "";
      this.ville = "";
      this.adress = "";
      this.street = "";
      }

    },
    getColor(index) {
      return index % 2 ? "steelblue" : "lightblue";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped>

.btnajout {
  margin-left: 120ch;
  margin-top: 50px;
}
h1 {
  background-color: yellow;

}
.bouton{
  margin-left:  330px;
  
}
#total{
   margin-left:  365px;

}
#nbrest{
    text-align: center;
}

.md-table + .md-table {
    margin-top: 16px
  }
#pagecourant{
    text-align: center;
};

</style>
