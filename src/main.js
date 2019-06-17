import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import ComputerDashboard from './components/content/ComputerDashboard'

Vue.config.productionTip = false
Vue.use(BootstrapVue);
Vue.use(VueRouter);

const routes = [
  { path: '/computers', component: ComputerDashboard },
  { path: '/', redirect:'/computers' }
]

const router = new VueRouter({ routes: routes, mode: "history" })

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
