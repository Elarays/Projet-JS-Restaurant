<template>
<v-main>
<v-card
    :loading="loading"
    class="mx-auto my-12"
    max-width="374"
  >
  <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate 
      ></v-progress-linear>
    </template> 
    <v-img
      height="250"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img>
    <v-card-title> {{this.restaurant.name }} </v-card-title>


     <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        <v-rating
          :value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ml-4">
          4.5 (413)
        </div>
      </v-row>

      <div class="my-4 subtitle-1">
        {{ this.restaurant.cuisine }}
      </div>
      <div class="my-4 subtitle-1">
        <p> Adress :  {{ this.restaurant.address.building }} {{ this.restaurant.address.street }} {{ this.restaurant.address.zipcode }} , {{ this.restaurant.borough }}.
        </p>
      </div>
      
      

      <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>Tonight's availability</v-card-title>

    <v-card-actions>
      <v-btn
        color="deep-purple lighten-2"
        text
        @click="Commander"
      >
        Order
      </v-btn>
    </v-card-actions>
   
  </v-card>
  <div class ="map">
  <GmapMap 
              :center="{
              lat: this.restaurant.address.coord[1],
              lng: this.restaurant.address.coord[0],
            }"
              :zoom="19"
              map-type-id="terrain"
              style="width: 650px; height: 400px"
          >
          <GmapMarker
                v-bind:position="{
                  lat: this.restaurant.address.coord[1],
                  lng: this.restaurant.address.coord[0],
                }"
                v-bind:clickable="true"
              />
          </GmapMap>
  </div>
  </v-main>
  
</template>


<script>
import { gmapApi } from 'gmap-vue';
export default {
  name: "Restaurant",
  computed: {
    id() {
      return this.$route.params.id;
    },
    google: gmapApi,
  },
  data: function () {
    return {
      restaurant: "",
      loading: false,
    };
  },
  mounted() {
    //this.$refs.mapRef.$mapPromise.then((map) => {
        //map.panTo({lat: 1.38, lng: 103.80})
      //})
    console.log("Avant affichage, on pourra faire un fetch... ");
    console.log("ID = " + this.id);
    this.fetchOneRestaurant()
    
  },
  methods: {
    fetchOneRestaurant() {
      let url = "http://localhost:8080/api/restaurants/"+  this.id;
      fetch(url)
        .then((reponse) => {
          return reponse.json();
        })
        .then((data) => {
          console.log(data.restaurant);
          this.restaurant = data.restaurant;
        });
    },
    Commander(){
      this.loading=true
      setTimeout(() => (this.loading = false), 2000)
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.map{
   display: flex;
  align-items: center;
  justify-content: center;
}
</style>
