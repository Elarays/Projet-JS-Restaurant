import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify';
import "vuetify/dist/vuetify.min.css";
import CxltToastr from 'cxlt-vue2-toastr'
import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css'
import * as GmapVue from 'gmap-vue'





import ListeDesRestaurants from './components/ListeDesRestaurants'
import Restaurant from './components/Restaurant'
import HelloWorld from './components/HelloWorld'
import Equipe from './components/Equipe'
import Home from './components/Home'


Vue.config.productionTip = false
Vue.use(VueMaterial)
Vue.use(VueRouter);
Vue.use(Vuetify)


var toastrConfigs = {
  position: 'top right',
  showDuration: 1000,
}
Vue.use(CxltToastr, toastrConfigs)


// On definit des routes
const router= new VueRouter({
  routes : [
    {
      path: '/ListeDesRestaurants/',
      component: ListeDesRestaurants,
    },
    {
      path: '/hello',
      component: HelloWorld,
      props: {
        msg: "coucou"
      }
    },
    {
      path: '/restaurant/:id',
      component: Restaurant
    },

    {
      path: '/Equipe',
      component: Equipe
    },

    {
      path: '/',
      component: Home
    },
  ],
  mode: 'history'
});
new Vue({
  router,
  vuetify: new Vuetify(),
  render: h => h(App),
}
).$mount('#app')


Vue.use(GmapVue, {
  load: {
    key: "AIzaSyAi5Vi3-s_9g2b_0V8RgE41aGsuzAyL9k8",
    libraries: 'places', 
  },
  installComponents: true
})
