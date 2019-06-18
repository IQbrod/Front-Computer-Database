<template>
    <div id="cont">
        <b-jumbotron id="jumb" lead="User DataBase">
            <users :UserList="userList"/>
        </b-jumbotron>
        <pagination className="page"/>
    </div>
</template>

<script>
    import pagination from '../Pagination'
    import users from "./Users";
    import axios from "axios";

    export default {
        name: "UserDashboard",
        components: {
            users,
            pagination
        },
        props: {},
        data() {
            return {
                userList: [],
                errors: []
            };
        },
        created() {
            axios
                .get(
                    `http://10.0.1.97:8080/cdb/api/computers?page=1&size=10&search=&orderBy=id`
                )
                .then(response => (this.userList = response.data))
                .catch(e => {
                    this.errors.push(e);
                });
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
