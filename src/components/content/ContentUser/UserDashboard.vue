<template>
    <div id="cont">
        <b-jumbotron id="jumb" lead="User DataBase">
            <users/>
        </b-jumbotron>
        <pagination className="page"/>
    </div>
</template>

<script>
    import pagination from '../Pagination'
    import users from "./Users";

    export default {
        name: "UserDashboard",
        components: {
            users,
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
