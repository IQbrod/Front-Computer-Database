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
                    <b-form-select v-model="perPage" :options="pageOptions"></b-form-select>
                </b-form-group>
            </b-col>
        </b-row>

        <!-- Main table element -->
        <b-table :items="this.items" :fields="fields">

            <template slot="id" slot-scope="row">
                {{ row.value}}
            </template>
            <template slot="userName" slot-scope="row">
                {{ row.value}}
            </template>

            <template slot="droits" slot-scope="row">
                {{ row.value}}
            </template>

            <template slot="delete" >
                <b-button size="sm"  class="mr-2" > Update  </b-button>
            </template>

            <template slot="update">
                <b-button size="sm" class="mr-2" > Delete </b-button>
            </template>




        </b-table>


        <!-- Info modal -->
        <!-- <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
             <pre>{{ infoModal.content }}</pre>
         </b-modal>-->
    </b-container>
</template>

<script>
    export default {
        name: "CustomTableUser",
        props: ['items'],
        data(){
            return{
                filter: null,
                pageOptions: [10, 50, 100],
                perPage: 10,
                fields:['id', 'userName', 'droits','delete', 'update']
            }
        }
    }


</script>

<style scoped>

</style>