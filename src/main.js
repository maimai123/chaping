// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import store from './vuex/store';

// MuseUI
import 'muse-ui/dist/muse-ui.css';
import MuseUI from 'muse-ui'
Vue.use(MuseUI);

// Mint
import 'mint-ui/lib/style.css'
import Mint from 'mint-ui';
Vue.use(Mint);
// import { Button, Cell } from 'mint-ui' 按需载入
// Vue.use(Button)
// Vue.use(Cell)
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false

Vue.use(router);
Vue.prototype.$ajax = axios;



new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
