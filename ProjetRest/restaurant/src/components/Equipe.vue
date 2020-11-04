<template>
  <v-main>
    <div class="block">
      <v-main>
        <h2 class="text-center">Our Teams</h2>
        <v-row>
          <v-col
            v-for="item in items"
            :key="item.id"
            class="d-flex child-flex"
            cols="12"
            sm="4"
          >
            <v-card flat tile class="mx-auto">
              <v-img
                :src="item.src"
                aspect-ratio="1"
                class="grey lighten-2"
              ></v-img>
              <v-card-text class="text--primary text-center">
                <div class="title">{{ item.name }}</div>
                <p>{{ item.title }}</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-main>
    </div>
  </v-main>
</template>

<script>
export default {
  name: "Eqipe",
  data() {
    return {
      items: [
        {
          id: 1,
          src: require("../assets/img/Mohamed.jpeg"),
          name: 'Mohamed Benabdelkrim',
          title: 'Etudiant'
        },
        {
          id: 2,
          src: require("../assets/img/said.jpeg"),
          name: 'Said Elarays',
          title: 'Etudiant'
        },
      ]
    };
  }
};
</script>