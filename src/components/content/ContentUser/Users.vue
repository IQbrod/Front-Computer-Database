<template>
    <div>
        <CustomTableUser striped hover :items="this.userList"></CustomTableUser>
    </div>
</template>

<script>
    import CustomTableUser from './CustomTableUser';
    import axios from "axios";

    export default {
        name : 'users',
        components: {CustomTableUser},
        data() {
            return {
                userList: [],
                errors: []
            }
        },

    created() {
        axios
            .get(
                `http://10.0.1.97:8080/cdb/api/users?page=1&size=10&search=&orderBy=id`
            )
            .then(response => (this.userList = response.data))
            .catch(e => {
                this.errors.push(e);
            });
    }
    }
</script>