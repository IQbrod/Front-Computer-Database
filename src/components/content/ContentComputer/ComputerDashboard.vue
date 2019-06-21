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
    import computers from "./Computers";

    export default {
        name: "ComputerDashboard",
        components: {
            computers,
            pagination
        },
        props: {},
        data() {
            return {
            };
        },
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

    .table {
        background-color: #eff8f8;

    }
</style>
