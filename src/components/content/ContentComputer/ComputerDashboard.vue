<template>
    <div id="cont">
        <b-jumbotron id="jumb" lead="Computer DataBase">
            <computers />
        </b-jumbotron>
        <pagination className="page"/>
    </div>
</template>

<script>
    import pagination from '../Pagination'
    import computers from "./Computers"
    import { mapGetters } from 'vuex'
    export default {
        name: "ComputerDashboard",
        components: {
            computers,
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
