<template>
    <div>
        <CustomTableCompany striped hover :update="this.update" :delete="this.delete" :add="this.add" :items="this.companyList "></CustomTableCompany>
    </div>
</template>

<script>
    import CustomTableCompany from './CustomTableCompany';
    import axios from "axios";
    import {mapGetters, mapState, mapMutations} from 'vuex';

    export default {
        name: 'companies',
        props: ["updateVar", "componentUpdate"],
        components: {CustomTableCompany},
        data() {
            return {
                companyList: [],
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

                axios.get(
                    "http://10.0.1.97:8080/cdb/api/companies?page=" + this.page + "&size=" + this.size+
                    "&search=" + this.search +
                    "&orderBy=id"
                )
                    .then(response => (this.companyList = response.data))
                    .catch(e => {
                        this.errors.push(e);
                    });
            },
            delete(listId) {
                listId.forEach(elem => {
                    axios
                        .delete("http://10.0.1.97:8080/cdb/api/companies/" + elem)
                        .then(() => this.get());
                    this.setCount(this.count - 1);
                });
            },
            update(company) {
                axios
                    .put("http://10.0.1.97:8080/cdb/api/companies/", company)
                    .catch(e => {
                        this.errors.push(e);
                    });
            },
            add(company) {
                axios.post('http://10.0.1.97:8080/cdb/api/companies', company)
                    .then(()=>this.get());
                this.setCount(this.count - 1);
            },
            countCompanies() {
                axios
                        .get('http://10.0.1.97:8080/cdb/api/companies/count?search=' + this.search)
                        .then(response => {
                            this.setCount(response.data);
                        });
            }
        },
        created() {
            this.countCompanies();
            this.get();
        },
        watch: {
            page: function () {
                this.get();
            },
            size: function () {
                this.get()
            },
            search: function() {
                this.countCompanies();
                this.get();
            }
        }
    }
</script>