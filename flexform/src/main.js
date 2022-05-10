import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style/tailwind.css'

import BeeGridTable from "beegridtable"
import BeeLocale from "beegridtable/src/locale"

import 'beegridtable/dist/styles/beegridtable.css';

Vue.use(BeeGridTable, {
  locale: BeeLocale,
  capture: true,
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
