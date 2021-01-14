import Vue from 'vue'
import App from './App.vue'
import VueCompositionAPI from '@vue/composition-api'
import router from './router'
Vue.use(VueCompositionAPI)
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
