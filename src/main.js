import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import ComputerDashboard from './components/content/ContentComputer/ComputerDashboard'
import CompanyDashboard from './components/content/ContentCompany/CompanyDashboard'
import UserDashboard from './components/content/ContentUser/UserDashboard'
import RoleDashboard from './components/content/ContentRole/RoleDashboard'

Vue.config.productionTip = false
Vue.use(BootstrapVue);
Vue.use(VueRouter);

const routes = [
  { path: '/', redirect:'/computers' },
  { path: '/computers', component: ComputerDashboard },
  { path: '/companies', component: CompanyDashboard },
  { path: '/users', component: UserDashboard},
  { path: '/roles', component: RoleDashboard}
]

const router = new VueRouter({ routes: routes, mode: "history" })

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
