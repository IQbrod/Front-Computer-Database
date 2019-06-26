<template>
    <div>
        <CustomTableOrdi striped hover :update="this.update" :delete="this.delete" :items="this.computerList"
                         :add="this.add" :companies="this.companyList"></CustomTableOrdi>
    </div>
</template>

<script>
    import CustomTableOrdi from "./CustomTableOrdi";
    import axios from "axios";
    import {mapGetters, mapMutations, mapState} from "vuex";

    export default {
        name: "computers",
        props: ["updateVar", "componentUpdate"],
        components: {CustomTableOrdi},
        data() {
            return {
                computerList: [],
                errors: [],
                companyList: []
            };
        },
        computed: {
            ...mapGetters(["page", "size", "search", "count", "orderBy"]),
            ...mapState(['count'])
        },
        methods: {
            ...mapMutations([
                'setCount'
            ]),
            get() {
                axios
                    .get(
                        "http://10.0.1.97:8080/cdb/api/computers" +
                        "?page=" + this.page +
                        "&size=" + this.size +
                        "&search=" + this.search +
                        "&orderBy="+ this.orderBy
                    )
                    .then(response => (this.computerList = response.data))
                    .catch(e => {
                        this.errors.push(e);
                    });
            },
            delete(listId) {
                listId.forEach(elem => {
                    axios
                        .delete("http://10.0.1.97:8080/cdb/api/computers/" + elem)
                        .then(() => this.get());
                    this.setCount(this.count - 1);
                });
            },
            update(computer) {
                if (computer.introduction === '') computer.introduction = null;
                if (computer.discontinued === '') computer.discontinued = null;
                axios
                    .put("http://10.0.1.97:8080/cdb/api/computers/", computer).then(() => this.get())
                    .catch(e => {
                        this.errors.push(e);
                    });
            },
            add(computer) {
                axios.post('http://10.0.1.97:8080/cdb/api/computers', computer)
                    .then(() => this.get());
                this.setCount(this.count + 1);
            },
            getCompanies() {
                axios
                    .get('http://10.0.1.97:8080/cdb/api/companies')
                    .then(response => {
                        this.companyList = response.data;
                    })
            },
            countComputers() {
                axios
                    .get('http://10.0.1.97:8080/cdb/api/computers/count?search=' + this.search)
                    .then(response => {
                        this.setCount(response.data);
                    });
            },
        },
        created() {
            this.countComputers();
            this.get();
            this.getCompanies();

        },

        watch: {
            page: function () {
                this.get();
            },
            size: function () {
                this.get();
            },
            search: function () {
                this.countComputers();
                this.get();
            },
            orderBy: function () {
                this.get();
            }
        }
    };

</script>