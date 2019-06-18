<template>
    <div>
        <CustomTableRole striped hover :items="this.roleList"></CustomTableRole>
    </div>
</template>

<script>
    import CustomTableRole from './CustomTableRole'
    import axios from "axios";

    export default {
        name: 'roles',
        components: {CustomTableRole},
        data() {
            return {
                roleList: [],
                errors: []
            }
        },

        created() {
            axios
                .get(
                    `http://10.0.1.97:8080/cdb/api/roles?page=1&size=10&search=&orderBy=id`
                )
                .then(response => (this.roleList = response.data))
                .catch(e => {
                    this.errors.push(e);
                });
        }
    }
</script>