import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import ComputerDashboard from './components/content/ContentComputer/ComputerDashboard'
import CompanyDashboard from './components/content/ContentCompany/CompanyDashboard'
import UserDashboard from './components/content/ContentUser/UserDashboard'
import RoleDashboard from './components/content/ContentRole/RoleDashboard'
import Login from './components/content/Login'

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.use(Vuex);

const routes = [
  { path: '/', redirect:'/computers' },
  { path: '/computers', component: ComputerDashboard },
  { path: '/companies', component: CompanyDashboard },
  { path: '/users', component: UserDashboard},
  { path: '/roles', component: RoleDashboard},
  { path: '/login', component: Login}
];

const router = new VueRouter({ routes: routes, mode: "history" });

const store = new Vuex.Store({
  state: {
    page: 1,
    size: 10,
    search: '',
    count: 0,
    orderBy: 'id',
    token: ''
  },
  getters: {
    page: state => state.page,
    size: state => state.size,
    search: state => state.search,
    count: state => state.count,
    orderBy: state => state.orderBy,
    token: state => state.token
  },
  mutations: {
    setPage (state, page) {
      state.page = page
    },
    setSize (state, size) {
      state.size = size
    },
    setSearch(state, search) {
      state.search = search
    },
    setCount(state, count) {
      state.count = count
    },
    setOrderBy(state, orderBy){
      state.orderBy = orderBy
    },
    setToken(state, token) {
      state.token = token
    }
  },
  actions: {
    editPage( context, page ) {
      context.commit('setPage', page )
    },
    editSize( context, size ) {
      context.commit('setSize', size )
    },
    editSearch( context, search ) {
      context.commit('setSearch', search)
    },
    editCount( context, count ) {
      context.commit('setCount', count)
    },
    editOrderBy(context, orderBy){
      context.commit('setOrderBy', orderBy)
    },
    editToken(context, token) {
      context.commit('setToken', token)
    }
  }
});


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
