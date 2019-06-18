<template>
    <div id="cont">
        <b-jumbotron id="jumb" lead="Company DataBase">
            <companies/>
        </b-jumbotron>
        <pagination className="page"/>
    </div>
</template>

<script>
    import pagination from '../Pagination'
    import companies from "./Companies";
    
    export default {
        name: "CompanyDashboard",
        components: {
            companies,
            pagination
        },
        props: {},
        data() {
            return {};
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

    .table {
        background-color: #eff8f8;

    }
</style>
