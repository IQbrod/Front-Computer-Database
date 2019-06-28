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
import Login from './components/content/Login'

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
    {path: '/roles', component: RoleDashboard},
    {path: '/login', component: Login}
];

const router = new VueRouter({routes: routes, mode: "history"});

const store = new Vuex.Store({
    state: {
        page: 1,
        size: 10,
        search: '',
        count: 0,
        orderBy: 'id',
        token: '',
        lang: 'fr',
        locales: ['en', 'fr'],
    },
    getters: {
        page: state => state.page,
        size: state => state.size,
        search: state => state.search,
        count: state => state.count,
        orderBy: state => state.orderBy,
        token: state => state.token,
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
        setToken(state, token) {
            state.token = token
        },
        setStoredLocale(state, storedLocale) {
            state.storedLocale = storedLocale
        },
        setLangage(state, lang) {
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
        editToken(context, token) {
            context.commit('setToken', token)
        },

        editStoredLocale(context, storedLocale) {
            context.commit('setStoreLocale', storedLocale)
        },
        editLangage(context, lang) {
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
            introductionDate: 'Introduced date',
            discontinued: 'Discontinued',
            discontinuedDate: 'Discontinued date',
            companyId: 'Company Id',
            companyName: 'Company Name',
            applicationLangFR: 'French',
            applicationLangEN: 'English',
            filter: 'Filter',
            searchType: 'Type to search',
            clear: 'Clear',
            search: 'Search',
            lang: 'Langage',
            delete: 'Delete',
            cancel: 'Cancel',
            update: 'Update',
            validate: 'Validate',
            addComputer: 'Add Computer',
            computer: 'Computers',
            computerName: 'Computer name',
            company: 'Company',
            companySelect: 'Please select a company',
            user: 'Users',
            userName: 'User name',
            role: 'Roles',
            roleId: 'Role id',
            roleName: 'Role name',
            signIn: 'Sign in',
            signOut: 'Sign out',
            deleteWarning:'Are you sure you want to delete ?',
            yes: 'Yes',
            no: 'No',
            hintDoubleCheck: 'Double click to deselect all elements currently in the table',
            plsSelectCompany: 'Select a company',
            commit: 'commit',
            reset: 'reset',
            submit: 'submit',
            password: 'password',
            passwordEnter: 'Enter password',
            userEnter: 'Enter username',
            list: 'List',
            connexionError: 'Connection error please check your credentials.',
            perPage: 'Per page',
        }
    },

    fr: {
        message: {
            hello: 'bonjour',
            applicationName: 'Base de données de PC',
            id: 'id',
            name: 'Nom',
            introduction: 'Introduction',
            introductionDate: 'Date d\'introduction',
            discontinued: 'Suspension',
            discontinuedDate: 'Date de suspension',
            companyId: 'Companie Id',
            companyName: 'Nom de la companie',
            applicationLangFR: 'Français',
            applicationLangEN: 'Anglais',
            filter: 'Filtrer',
            searchType: 'Recherche',
            clear: 'Effacer',
            search: 'Chercher',
            lang: 'Langue',
            delete: 'Supprimer',
            cancel: 'Annuler',
            update: 'Modifier',
            validate: 'Valider',
            addComputer: 'Ajouter un ordinateur',
            computer: 'Ordinateurs',
            computerName: 'Nom de l\'ordinateur ',
            company: 'Companies',
            companySelect: 'Selectionner une company',
            user: 'Utilisateurs',
            userName: 'Nom d\'utilisateur',
            role: 'Roles',
            roleId: 'Role identifiant',
            roleName: 'Nom du role',
            signIn: 'Se connecter',
            signOut: 'Se deconnecter',
            deleteWarning:'Etes vous sûr de vouloir effacer ?',
            yes: 'Oui',
            no: 'Non',
            hintDoubleCheck: 'Double cliquer pour selectionner tout les elements de la table',
            plsSelectCompany: 'Choisir la companie',
            commit: 'commit',
            reset: 'Annuler',
            submit: 'Valider',
            password: 'Mot de passe',
            passwordEnter: 'Entrez votre mot de passe',
            userEnter: 'Entrez votre nom d\'utilisateur',
            list: 'Liste',
            connexionError: 'Erreur de connexion, mot de passe ou identifiant incorrecte ',
            perPage: 'Par page',
        }
    },
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
