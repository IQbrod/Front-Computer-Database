import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import ComputerDashboard from './components/content/ContentComputer/ComputerDashboard'
import CompanyDashboard from './components/content/ContentCompany/CompanyDashboard'

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.use(Vuex);

const routes = [
  { path: '/', redirect:'/computers' },
  { path: '/computers', component: ComputerDashboard },
  { path: '/companies', component: CompanyDashboard }
]

const router = new VueRouter({ routes: routes, mode: "history" })

const store = new Vuex.Store({
  state: {
    page: 1
  },
  getters: {
    page: state => state.page
  },
  mutations: {
    setPage (state, page) {
      state.page = page
    }
  },
  actions: {
    editPage( context, page ) {
      context.commit('setPage', page )
    }
  }
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
