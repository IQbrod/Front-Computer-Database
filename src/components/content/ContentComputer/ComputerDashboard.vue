<template>
    <div id="cont">
        <h1><b-badge pill variant="primary">{{this.count()}}</b-badge>   Computer Found</h1>
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
                'token',
                'count'
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
