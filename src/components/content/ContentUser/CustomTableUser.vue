<template>
    <b-container fluid>
        <!-- User Interface controls -->
        <b-row>
            <b-col md="6" class="my-1">
                <b-form-group label-cols-sm="3" label="Filter" class="mb-0">
                    <b-input-group>
                        <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
                        <b-input-group-append>
                            <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                        </b-input-group-append>
                    </b-input-group>
                </b-form-group>
            </b-col>

            <b-col md="6" class="my-1">
                <b-form-group label-cols-sm="3" label="Per page" class="mb-0">
                    <b-form-select v-model="currentSize" :options="pageOptions"></b-form-select>
                </b-form-group>
            </b-col>
        </b-row>

        <!-- Main table element -->
        <b-table :items="this.items" :fields="fields">

            <template slot="id" slot-scope="row">
                {{ row.value}}
            </template>
            <template slot="username" slot-scope="ligne">
                <p v-if="updating!== ligne.item.id">{{ ligne.value}}</p>
                <p v-else><input :value="ligne.value" type="text" id="username" name="username"></p>
            </template>


            <template slot="roleId" slot-scope="row">
                {{ row.value}}
            </template>

            <template slot="roleName" slot-scope="row">
                {{ row.value}}
            </template>

            <template slot="update" slot-scope="ligne">
                <b-button size="sm" class="mr-2" v-on:click="updating = ligne.item.id"> Update</b-button>
            </template>

            <template slot="delete">
                <b-button size="sm" class="mr-2"> Delete</b-button>
            </template>

        </b-table>


        <!-- Info modal -->
        <!-- <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
             <pre>{{ infoModal.content }}</pre>
         </b-modal>-->
    </b-container>
</template>

<script>
    import { mapMutations, mapGetters } from 'vuex';
    export default {
        name: "CustomTableUser",
        props: ['items'],
        methods:{
            ...mapMutations([
                'setSize'
            ]),
            ...mapGetters([
                'size'
            ])
        },
        data(){
            return{
                filter: null,
                pageOptions: [10, 50, 100],
                fields:['id', 'username', 'roleId', 'roleName', 'update', 'delete'],
                updating: -1,
                currentSize: this.size()
            }
        },
        watch: {
            currentSize: function(value) {
                this.setSize(value)
            }
        }
    }


</script>

<style scoped>

</style>