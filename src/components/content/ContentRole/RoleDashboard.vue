<template>
    <div id="cont">
        <b-jumbotron id="jumb" lead="Role DataBase">
            <roles/>
        </b-jumbotron>
        <pagination className="page"/>
    </div>
</template>

<script>
    import pagination from '../Pagination'
    import roles from "./Roles";
    import { mapGetters } from 'vuex'

    export default {
        name: "RoleDashboard",
        components: {
            roles,
            pagination
        },
        methods: {
            ...mapGetters([
                'token'
            ])
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
