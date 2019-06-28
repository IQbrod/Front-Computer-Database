<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand to='/'>{{ $t('message.applicationName', ['applicationName']) }}</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item-dropdown :text="$t('message.list', ['list'])"  right>
                        <b-dropdown-item to='/computers'>{{ $t('message.computer', ['computer']) }}</b-dropdown-item>
                        <b-dropdown-item to='/companies'>{{ $t('message.company', ['company']) }}</b-dropdown-item>
                        <b-dropdown-item to='/users'>{{ $t('message.user', ['user']) }}</b-dropdown-item>
                        <b-dropdown-item to='/roles'>{{ $t('message.role', ['role']) }}</b-dropdown-item>
                    </b-nav-item-dropdown>

                    <b-nav-item-dropdown :text="$t('message.lang', ['lang'])" right>
                        <b-dropdown-item href="#"  @click="editLangage('en')">{{ $t('message.applicationLangEN', ['applicationLangEN']) }}</b-dropdown-item>
                        <b-dropdown-item href="#" @click="editLangage('fr')">{{ $t('message.applicationLangFR', ['applicationLangFR']) }}</b-dropdown-item>
                    </b-nav-item-dropdown>

                    <b-navbar-nav right>
                        <b-nav-item v-if="this.token()" @click="resetToken()" to="/login">{{ $t('message.signOut', ['signOut']) }}</b-nav-item>
                    </b-navbar-nav>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex"

    export default {
        name: 'Navbar',
        methods: {
            ...mapActions([
                "editLangage",
                "resetToken"
                ]),
            ...mapGetters([
                "token"
            ])
        }
    }

</script>
<style scoped>
    .bg-info {
        background-color: #003459 !important;
    }
</style>
