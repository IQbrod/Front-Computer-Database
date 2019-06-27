import Vue from 'vue'
import VueI18n from 'vue-i18n'

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

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueI18n);

const routes = [
    {path: '/', redirect: '/computers'},
    {path: '/computers', component: ComputerDashboard},
    {path: '/companies', component: CompanyDashboard},
    {path: '/users', component: UserDashboard},
    {path: '/roles', component: RoleDashboard}
];

const router = new VueRouter({routes: routes, mode: "history"});

const store = new Vuex.Store({
    state: {
        page: 1,
        size: 10,
        search: '',
        count: 0,
        orderBy: 'id',
        lang: 'fr',
        locales: ['en', 'fr'],
    },
    getters: {
        page: state => state.page,
        size: state => state.size,
        search: state => state.search,
        count: state => state.count,
        orderBy: state => state.orderBy,
        storedLocale: state => state.storedLocale
    },
    mutations: {
        setPage(state, page) {
            state.page = page
        },
        setSize(state, size) {
            state.size = size
        },
        setSearch(state, search) {
            state.search = search
        },
        setCount(state, count) {
            state.count = count
        },
        setOrderBy(state, orderBy) {
            state.orderBy = orderBy
        },
        setStoredLocale(state, storedLocale) {
            state.storedLocale = storedLocale
        },
        setLangage(state, lang){
            state.lang = lang
            i18n.locale = lang;
        }

    },
    actions: {
        editPage(context, page) {
            context.commit('setPage', page)
        },
        editSize(context, size) {
            context.commit('setSize', size)
        },
        editSearch(context, search) {
            context.commit('setSearch', search)
        },
        editCount(context, count) {
            context.commit('setCount', count)
        },
        editOrderBy(context, orderBy) {
            context.commit('setOrderBy', orderBy)
        },
        editStoredLocale(context, storedLocale) {
            context.commit('setStoreLocale', storedLocale)
        },
        editLangage(context, lang){
            context.commit('setLangage', lang)
        }
    },

});

//i18n



const messages = {
    en: {
        message: {
            hello: 'hello world',
            applicationName: 'Computer Database',
            id: 'id',
            name: 'name',
            introduction: 'Introduced',
            discontinued: 'Discontinued',
            companyId: 'Company Id',
            companyName: 'Company Name',
            applicationLangFR: 'French',
            applicationLangEN: 'English',
            filter: 'Filter',
            clear: 'Clear',
            search: 'Search',
            lang: 'Lang',
            delete: 'Delete',
            cancel: 'Cancel',
            update:'Update',
            validate: 'Validate',
            addComputer: 'Add Computer',
            computer: 'Computers',
            company: 'Companys',
            user: 'Users',
            role: 'Roles',
            signIn: 'Sign in',
            signOut:'Sign out'


        }
    },
    fr: {
        message: {
            hello: 'bonjour',
            applicationName: 'Base de données de PC',
            id: 'id',
            name: 'Nom',
            introduction: 'Introduction',
            discontinued: 'Suspension',
            companyId: 'Companie Id',
            companyName: 'Nom de la companie',
            applicationLangFR: 'Français',
            applicationLangEN: 'Anglais',
            filter: 'Filtrer',
            clear: 'Effacer',
            search: 'Chercher',
            lang: 'Langue',
            delete: 'Supprimer',
            cancel: 'Annuler',
            update:'Modifier',
            validate: 'Valider',
            addComputer: 'Ajouter un ordinateur',
            computer: 'Ordinateurs',
            company: 'Companies',
            user: 'Utilisateurs',
            role: 'Roles',
            signIn: 'Se connecter',
            signOut:'Se deconnecter'
        }
    }
};

let i18n = new VueI18n({
    locale: 'fr',
    messages,
});


new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')
