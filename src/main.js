import Vue from 'vue'
import App from './App.vue'

/** import fonts **/
import './scss/font-icomoon.scss'
import './scss/font-inter.scss'

/** bus for comunication between components **/
export const EventBus = new Vue();

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
