<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand to='/'>{{ $t('message.applicationName', ['applicationName']) }}</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>


                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">


                    <b-nav-item-dropdown text="List" right>
                        <b-dropdown-item to='/computers'>{{ $t('message.computer', ['computer']) }}</b-dropdown-item>
                        <b-dropdown-item to='/companies'>{{ $t('message.company', ['company']) }}</b-dropdown-item>
                        <b-dropdown-item to='/users'>{{ $t('message.user', ['user']) }}</b-dropdown-item>
                        <b-dropdown-item to='/roles'>{{ $t('message.role', ['role']) }}</b-dropdown-item>
                    </b-nav-item-dropdown>

                    <b-nav-item-dropdown text="Lang" right>
                        <b-dropdown-item href="#"  @click="editLangage('en')">{{ $t('message.applicationLangEN', ['applicationLangEN']) }}</b-dropdown-item>
                        <b-dropdown-item href="#" @click="editLangage('fr')">{{ $t('message.applicationLangFR', ['applicationLangFR']) }}</b-dropdown-item>
                    </b-nav-item-dropdown>

                    <b-nav-item-dropdown right>
                        <!-- Using 'button-content' slot -->
                        <template slot="button-content">
                            <em>{{ $t('message.user', ['user']) }}</em>
                        </template>
                        <b-dropdown-item href="#">Profile</b-dropdown-item>
                        <b-dropdown-item href="#">{{ $t('message.signOut', ['signOut']) }}</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
    import {mapActions} from "vuex"

    export default {
        name: 'Navbar',
        methods: {
            ...mapActions([
                    "editLangage"
                ]
            )
        }
    }

</script>
<style scoped>
    .bg-info {
        background-color: #003459 !important;
    }
</style>
