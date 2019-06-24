<template>
    <div>
        <CustomTableCompany striped hover :items="this.companyList"></CustomTableCompany>
    </div>
</template>

<script>
    import CustomTableCompany from './CustomTableCompany';
    import axios from "axios";
    import {mapGetters} from 'vuex';

    export default {
        name: 'companies',
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
                'size'
            ])
        },
        methods: {
            get() {
                axios.get(
                    "http://10.0.1.97:8080/cdb/api/companies?page=" + this.page + "&size=" + this.size
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
                });
            },
            update(companie) {
                axios
                    .put("http://10.0.1.97:8080/cdb/api/companies/", companie)
                    .catch(e => {
                        this.errors.push(e);
                    });
            },
            add(companie) {
                axios.post('http://10.0.1.97:8080/cdb/api/companies', companie)
            }
        },
        watch: {
            page: function () {
                this.get()
            },
            size: function () {
                this.get()
            }
        }
    }
</script>