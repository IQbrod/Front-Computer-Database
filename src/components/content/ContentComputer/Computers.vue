<template>
    <div>
        <CustomTableOrdi striped hover :delete="this.delete" :items="this.computerList"></CustomTableOrdi>
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
                'page'
            ])
        },
        methods: {
            get() {
            axios
                .get("http://10.0.1.97:8080/cdb/api/computers?page=+"+this.page+"&size=10&search=&orderBy=id")
                .then(response => (this.computerList = response.data))
                .catch(e => {
                    this.errors.push(e);
                }
            );
            },
            delete(listId) {
                alert("on entee")
                listId.forEach(function(elem){
                    axios
                        .delete("http://10.0.1.97:8080/cdb/api/computers/"+elem)
                        .then(response => alert(response))
                })
            },
        },
        created() {
            this.get()
        },
        watch: {
            page: function() {
                this.get()
            }
        }
    }
</script>