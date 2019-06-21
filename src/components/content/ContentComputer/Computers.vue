<template>
    <div>
        <CustomTableOrdi striped hover :update="this.update" :delete="this.delete" :items="this.computerList"></CustomTableOrdi>
    </div>
</template>

<script>
    import CustomTableOrdi from './CustomTableOrdi'
    import axios from "axios";
    import { mapGetters } from 'vuex'

    export default {
        name: 'computers',
        components: {CustomTableOrdi},
        data() {
            return {
                computerList: [],
                errors: []
            }
        },
        computed: {
            ...mapGetters([
                'page',
                'size',
                'search'
            ])
        },
        methods: {
            get() {
            axios
                .get("http://10.0.1.97:8080/cdb/api/computers?page=+"+this.page+"&size="+this.size+"&search="+this.search+"&orderBy=id")
                .then(response => (this.computerList = response.data))
                .catch(e => {
                    this.errors.push(e);
                });
            },
            delete(listId) {
                alert("on entre");
                listId.forEach(function(elem){
                    axios
                        .delete("http://10.0.1.97:8080/cdb/api/computers/"+elem)
                        .then(response => alert(response))
                })
            },
            update(computer) {
                if(computer.introduction==='') computer.introduction=null;
                if(computer.discontinued==='') computer.discontinued=null;
                axios
                        .put("http://10.0.1.97:8080/cdb/api/computers/", computer)
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
            search: function() {
                this.get()
            }
        }
    }
</script>