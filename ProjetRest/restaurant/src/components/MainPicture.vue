<template>
  <div class="heroBlock">
    <v-carousel id="defiler" cycle hide-delimiters>
      <v-carousel-item
        v-for="(item, i) in items"
        :key="i"
        :src="item.src"
        reverse-transition="fade-transition"
        transition="fade-transition"
      >
        <v-row
          class="title fill-height hidden-xs-only"
          align="center"
          justify="center"
          >{{ item.title }}</v-row
        >
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
export default {
  name: "MainPicture",
  data() {
    return {
      items: [
        {
          src: require("../assets/img/image1.jpg"),
          title: "We are creative",
        },
        {
          src: require("../assets/img/image2.jpg"),
          title: "We are hard worker",
        },
        {
          src: require("../assets/img/image3.jpg"),
          title: "We are professional",
        },
      ],
    };
  },
};
</script>

<style scoped>
#defiler{
  height: 100vh;
  content: '';
  background: rgba(0, 0, 0, 0.3);
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1;
    }

.heroBlock {
  position: relative;
};

.v-image__image {
      content: '';
      background: rgba(0, 0, 0, 0.3);
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1;
    }
</style>