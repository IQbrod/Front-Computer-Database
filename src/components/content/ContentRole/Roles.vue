<template>

    <div>
        <CustomTableRole striped hover  :update="this.update" :delete="this.delete" :add="this.add" :items="this.roleList"></CustomTableRole>
    </div>
</template>

<script>
    import CustomTableRole from './CustomTableRole'
    import axios from "axios";
    import { mapGetters, mapMutations, mapState } from 'vuex';
    export default {
        name: 'roles',
        props: ["updateVar", "componentUpdate"],
        components: {CustomTableRole},
        data() {
            return {
                roleList: [],
                errors: []
            }
        },
        computed: {
            ...mapGetters([
                'page',
                'size', "search", "count"]),
            ...mapState(['count'])
        },
        methods: {
            ...mapMutations([
                'setCount'
            ]),
            get() {
                axios
                    .get(
                            "http://10.0.1.97:8080/cdb/api/roles?page="+this.page+"&size="+this.size+"&orderBy=id&search="+this.search
                        )
                        .then(response => (this.roleList = response.data))
                        .catch(e => {
                            this.errors.push(e);
                        });
            },
            delete(listId) {
                listId.forEach(elem => {
                    axios
                        .delete("http://10.0.1.97:8080/cdb/api/roles/" + elem)
                        .then(() => this.get());
                    this.setCount(this.count - 1);
                });
            },
            update(role) {
                axios
                    .put("http://10.0.1.97:8080/cdb/api/roles/", role)
                    .catch(e => {
                        this.errors.push(e);
                    });
            },
            add(role) {
                axios.post('http://10.0.1.97:8080/cdb/api/roles', role)
                    .then(()=>this.get());
                this.setCount(this.count + 1);
            },
            countRoles() {
                axios
                        .get('http://10.0.1.97:8080/cdb/api/roles/count?search=' + this.search)
                        .then(response => {
                            this.setCount(response.data);
                        });
            }
        },
        created() {
            this.countRoles();
            this.get();
        },
        watch: {
            page: function() {
                this.get()
            },
            size: function() {
                this.get()
            },
            search: function() {
                this.countRoles();
                this.get();
            }
        }
    }
</script>