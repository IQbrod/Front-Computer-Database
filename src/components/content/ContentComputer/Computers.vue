<template>
    <div>
        <CustomTableOrdi striped hover :items="this.computerList"></CustomTableOrdi>
    </div>
</template>

<script>
    import CustomTableOrdi from './CustomTableOrdi'
    import axios from "axios";

    export default {
        name: 'computers',
        components: {CustomTableOrdi},
        data() {
            return {
                computerList: [],
                errors: []
            }
        },

        created() {
            axios
                .get(
                    `http://10.0.1.97:8080/cdb/api/computers?page=1&size=10&search=&orderBy=id`
                )
                .then(response => (this.computerList = response.data))
                .catch(e => {
                    this.errors.push(e);
                });
        }
    }
</script>