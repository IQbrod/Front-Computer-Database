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

    export default {
        name: "RoleDashboard",
        components: {
            roles,
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
