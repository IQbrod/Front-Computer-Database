<template>
    <div id="cont">
        <h1 v-if="!this.permissionDenied"><b-badge pill variant="primary">{{this.count()}}</b-badge> {{ $t('message.roleFound', ['roleFound']) }}</h1>
        <b-jumbotron id="jumb" :lead="$t('message.roleDatabase', ['roleDatabse'])" v-if="!this.permissionDenied">
            <roles :togglePermissionDenied="togglePermissionDenied"/>
        </b-jumbotron>
        <pagination className="page" v-if="!this.permissionDenied"/>
        <p v-else>Permission Denied !</p>
    </div>
</template>

<script>
    import pagination from '../Pagination'
    import roles from "./Roles";
    import { mapGetters } from 'vuex'

    export default {
        name: "RoleDashboard",
        data() {
            return {
                permissionDenied: false
            }
        },
        components: {
            roles,
            pagination
        },
        methods: {
            ...mapGetters([
                'token', 'count'
            ]),
            togglePermissionDenied: function() {
                this.permissionDenied = true;
            }
        },
        mounted: function() {
            if(!this.token()) {
                this.$router.push({path: "/login"});
            }
        }
    };
</script>

<style>
    #cont {
        margin: 3%;
    }

    #jumb {
        background-color: #fcfcfc;
        opacity: 10%;
    }
</style>
