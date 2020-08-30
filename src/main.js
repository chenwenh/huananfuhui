import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import http from './assets/js/http';
import appConst from './assets/js/appConst'
import { apiUrl } from './assets/js/apiUrl'
import global from './assets/js/global'
import '@/assets/css/_main.scss'
import bus from '@/views/eventBus/eventBus'
import './assets/js/dialogDrag';
import validate from './assets/js/validate';
import store from './store';
// import './assets/js/pc.js';
import './assets/js/rem.js';
Vue.use(ElementUI)

Vue.prototype.$http = http;
Vue.prototype.$appConst = appConst
Vue.prototype.$apiUrl = apiUrl
Vue.prototype.$global = global
Vue.prototype.$validate = validate;
Vue.prototype.$bus = bus

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
