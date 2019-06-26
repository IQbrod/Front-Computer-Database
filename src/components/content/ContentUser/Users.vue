<template>
    <div>
        <CustomTableUser striped hover :items="this.userList"></CustomTableUser>
    </div>
</template>

<script>
    import CustomTableUser from './CustomTableUser';
    import axios from "axios";
    import { mapGetters } from 'vuex';

    export default {
        name : 'users',
        components: {CustomTableUser},
        data() {
            return {
                userList: [],
                errors: []
            }
        },
        computed: {
            ...mapGetters([
                'page',
                'size',
                "orderBy"
            ])
        },
        methods:{
            get() {
                axios
                    .get(
                            "http://10.0.1.97:8080/cdb/api/users" +
                            "?page=" + this.page +
                            "&size=" + this.size +
                            "&search=" +
                            "&orderBy=" + this.orderBy
                        )
                        .then(response => (this.userList = response.data))
                        .catch(e => {
                            this.errors.push(e);
                        });
            }
        },
        created() {
            this.get()
        },
        watch: {
            page: function() {
                this.get()
            },
            size: function() {
                this.get()
            },
            orderBy: function () {
                this.get();
            }
        }
    }
</script>