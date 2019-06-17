import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import contentB from './components/content/contentB'

Vue.config.productionTip = false
Vue.use(BootstrapVue);
Vue.use(VueRouter);

const routes = [
  { path: '/computers', component: contentB },
  { path: '/', redirect:'/computers' }
]

const router = new VueRouter({ routes: routes, mode: "history" })

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
