import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyAM_mIWNndt-kJkBlyv4EL4j3H1-vYJcBE",
  authDomain: "practice-authentication-d920a.firebaseapp.com",
  databaseURL: "https://practice-authentication-d920a.firebaseio.com",
  projectId: "practice-authentication-d920a",
  storageBucket: "practice-authentication-d920a.appspot.com",
  messagingSenderId: "70649658590"
}
firebase.initializeApp(firebaseConfig);
Vue.prototype.$firebase = firebase

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
