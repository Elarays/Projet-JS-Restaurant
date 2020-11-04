<template>
<!-- Liste des restaurants -->
    <section id="services">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 text-center">
            <h2 class="section-heading text-uppercase">Restaurants</h2>
            <h3 class="section-subheading text-muted">La liste des Restaurants.</h3>
          </div>
        </div>
            <h2>{{ msg }}</h2>
    <!-- <form @submit.prevent="ajouterRestaurant(event)">
      <label>
        Nom : <input name="nom" type="text" required v-model="nom" />
      </label>
      <label>
        Cuisine :
        <input name="cuisine" type="text" required v-model="cuisine" />
      </label>

      <button>Ajouter</button>
    </form>
 -->
    
    
    <!-- <p>
      Chercher par nom :
      <input
        @input="chercherRestaurants()"
        type="text"
        v-model="nomRestauRecherche"
      />
    </p> -->
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
    &nbsp; Page courante : {{ page }}
    <br />
    <md-table v-model="restaurants" md-sort="name" md-sort-order="asc">
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
        </div>
        <md-field md-clearable class="md-toolbar-section-end">

          <md-input placeholder="Search by name..." v-model="nomRestauRecherche" type="text"  @input="chercherRestaurants()" />
        </md-field>
      </md-table-toolbar>

      <md-table-empty-state
        md-label="No restaurant found"
        :md-description="`No restaurant found for this '${search}' query. Try a different search term or create a new user.`">
      </md-table-empty-state>
      <md-table-row>
        <md-table-head>Nom</md-table-head>
        <md-table-head>Cuisine</md-table-head>
        <md-table-head>Ville</md-table-head>
      </md-table-row>
      <md-table-row
    
        slot="md-table-row"
        slot-scope="{ item, index }"
        :style="{ backgroundColor: getColor(index) }"
        :class="{ bordureRouge: index === 2 }"
      >
        <md-table-cell md-label="Name" md-sort-by="name">
          {{item.name}}
        </md-table-cell>
        <md-table-cell md-label="Cuisine" md-sort-by="cuisine">{{
          item.cuisine
        }}</md-table-cell>
        <md-table-cell md-label="Ville" md-sort-by="borough">
          {{item.borough}}
        </md-table-cell>
        <md-table-cell md-label="Action">
         <router-link tag="button" :to="'/Restaurant/' + item._id">
                 [Detail d'un Restaurant] </router-link>


        </md-table-cell>
      </md-table-row>
    </md-table>
    <p id ="total">Nb de pages total : {{ nbPagesTotal }}</p>
    <p>
    <div class = "bouton" >
     <v-btn  color = "accent" :disabled ="page ===0 " elevation="3"
     medium @click="pagePrecedente()"
      >Précédent</v-btn
    >&nbsp;&nbsp;
    <v-btn 
       color = "accent"
      :disabled="page === nbPagesTotal" elevation="3" medium 
      @click="pageSuivante()"
    >
      Suivant
    </v-btn>
    </div>
      </div>
    </section>
</template>

<script>
import _ from "lodash";
export default {
  name: "app",
  components: {

  },
  namee: "ListeDesRestaurants",
  data: function () {
    return {
      restaurants: [],
      nom: "",
      cuisine: "",
      ville: "",
      nbRestaurantsTotal: 0,
      page: 0,
      pagesize: 10,
      nbPagesTotal: 0,
      msg: "",
      nomRestauRecherche: "",
    };
  },
  mounted() {
    console.log("AVANT AFFICHAGE");
    this.getRestaurantsFromServer();
  },
  methods: {
    pagePrecedente() {
      if (this.page === 0) return;

      this.page--;
      this.getRestaurantsFromServer();
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
    supprimerRestaurant(r) {
      let url = "http://localhost:8080/api/restaurants/" + r._id;

      fetch(url, {
        method: "DELETE",
      })
        .then((responseJSON) => {
          responseJSON.json().then((resJS) => {
            // Maintenant res est un vrai objet JavaScript
            console.log(resJS.msg);
            this.msg = resJS.msg;
            // On rafraichit la vue
            this.getRestaurantsFromServer();
          });
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    ajouterRestaurant(event) {
      // Récupération du formulaire. Pas besoin de document.querySelector
      // ou document.getElementById puisque c'est le formulaire qui a généré
      // l'événement
      let form = event.target;

      // Récupération des valeurs des champs du formulaire
      // en prévision d'un envoi multipart en ajax/fetch
      let donneesFormulaire = new FormData(form);
      location.reload();

      let url = "http://localhost:8080/api/restaurants";

      fetch(url, {
        method: "POST",
        body: donneesFormulaire,
      })
        .then((responseJSON) => {
          responseJSON.json().then((resJS) => {
            // Maintenant res est un vrai objet JavaScript
            console.log(resJS.msg);
            this.msg = resJS.msg;
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
    },
    getColor(index) {
      return index % 2 ? "lightBlue" : "pink";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped>
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
  margin-right : 500 px ;
}


</style>
