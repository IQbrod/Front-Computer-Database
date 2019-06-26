<template>
    <div>
        <CustomTableUser striped hover :items="this.userList" :update="this.update" :add="this.add" :delete="this.delete" :roles="this.roleList"></CustomTableUser>
    </div>
</template>

<script>
    import CustomTableUser from './CustomTableUser';
    import axios from "axios";
    import { mapGetters , mapState, mapMutations} from 'vuex';

    export default {
        name : 'users',
        components: {CustomTableUser},
        data() {
            return {
                userList: [],
                errors: [],
                roleList: []
            }
        },
        computed: {
            ...mapGetters([
                'page',
                'size', "search", "count"]),
            ...mapState(['count'])
        },
        methods:{
            ...mapMutations([
                'setCount'
            ]),
            get() {
                axios
                    .get(
                            "http://10.0.1.97:8080/cdb/api/users" +
                            "?page=" + this.page +
                            "&size=" + this.size +
                            "&search=" + this.search +
                            "&orderBy=" + this.orderBy
                        )
                        .then(response => (this.userList = response.data))
                        .catch(e => {
                            this.errors.push(e);
                        });
                    },
            delete(listId) {
            listId.forEach(elem => {
                axios
                .delete("http://10.0.1.97:8080/cdb/api/users/" + elem)
                .then(() => this.get());
                this.setCount(this.count - 1);
            });
            },
            update(user) {
                axios
                        .put("http://10.0.1.97:8080/cdb/api/users/", user).then(()=>this.get())
                        .catch(e => {
                            this.errors.push(e);
                        });
            },
            add(user){
            axios.post('http://10.0.1.97:8080/cdb/api/users', user)
                    .then(()=>this.get());
                this.setCount(this.count + 1);
            },
            getRoles(){
            axios
                .get("http://10.0.1.97:8080/cdb/api/roles")
                .then(response => {
                    this.roleList = response.data
                })
            },
            countUsers() {
                axios
                        .get('http://10.0.1.97:8080/cdb/api/users/count?search=' + this.search)
                        .then(response => {
                            this.setCount(response.data);
                        });
            }
        },
        created() {
            this.countUsers();
            this.get()
            this.getRoles();
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
            },
            search: function() {
                this.countComputers();
                this.get();
             }
        }
    }
</script>