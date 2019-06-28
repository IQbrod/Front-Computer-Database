<template>
    <div id="cont">
        <h1><b-badge pill variant="primary">{{this.count()}}</b-badge>{{ $t('message.computerFound', ['computerFound']) }}</h1>
        <b-jumbotron id="jumb" :lead="$t('message.computerDatabase', ['computerDatabse'])" v-if="!this.permissionDenied">
            <computers :togglePermissionDenied="togglePermissionDenied" />
        </b-jumbotron>
        <pagination className="page" v-if="!this.permissionDenied" />
        <p v-else>Permission Denied !</p>
    </div>
</template>

<script>
    import pagination from '../Pagination'
    import computers from "./Computers"
    import { mapGetters } from 'vuex'
    export default {
        name: "ComputerDashboard",
        data() {
            return {
                permissionDenied: false
            }
        },
        components: {
            computers,
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
