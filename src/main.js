import Vue from 'vue'
import VueMeta from 'vue-meta'
import App from './App.vue'
import Vuelidate from "vuelidate"
import axios from "axios"
import Paginate from 'vuejs-paginate'
import './registerServiceWorker'
import router from './router'
import store from './store'
import dateFilter from "../filters/date.filter"
import localizeFilter from "../filters/localize.filter"
import currencyFilter from "../filters/currency.filter"
import tooltipDerective from "./directives/tooltip.derective"
import messagePlugin from './utils/message.plugin'
import titlePlugin from './utils/title.plugin'
import loader from './components/app/Loader'
import 'materialize-css/dist/js/materialize.min'

import firebase from "firebase/app"
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.prototype.$http = axios
Vue.use(messagePlugin)
Vue.use(titlePlugin)
Vue.use(Vuelidate)
Vue.use(VueMeta)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.filter('localize', localizeFilter)
Vue.directive('tooltip', tooltipDerective)
Vue.component('Loader', loader)
Vue.component('Paginate', Paginate)



// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyCD6YXx1j3AUHV2WUuTgg1tVEF8nF47658",
  authDomain: "vue-crm-b66b2.firebaseapp.com",
  databaseURL: "https://vue-crm-b66b2.firebaseio.com",
  projectId: "vue-crm-b66b2",
  storageBucket: "vue-crm-b66b2.appspot.com",
  messagingSenderId: "823708009867",
  appId: "1:823708009867:web:60c5696071410e0e2fdb8e",
  measurementId: "G-JCVC014QNH"
});

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})


