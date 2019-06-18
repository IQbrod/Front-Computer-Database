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
            <template slot="name" slot-scope="ligne">
                <p v-if="updating!== ligne.item.id">{{ ligne.value}}</p>
                <p v-else><input type="text" id="name" name="name"></p>
            </template>

            <template slot="introduction" slot-scope="ligne">
                <p v-if="updating!== ligne.item.id">{{ ligne.value}}</p>
                <p v-else><input type="date" id="introduction" name="introduction"></p>
            </template>

            <template slot="discontinued" slot-scope="ligne">
                <p v-if="updating!== ligne.item.id">{{ ligne.value}}</p>
                <p v-else><input type="date" id="discontinued" name="discontinued"></p>
            </template>

              <template slot="companyName" slot-scope="row">
                {{ row.value }}
            </template>

              <template slot="companyId" slot-scope="row">
                {{ row.value}}
            </template>


            <template slot="update" slot-scope="patate">
                <b-button size="sm" class="mr-2" v-on:click="updating = patate.item.id"> Update</b-button>
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
    export default {
        name: "CustomTableOrdi",
        props: ['items'],
        data(){
            return{
                filter: null,
                pageOptions: [10, 50, 100],
                perPage: 10,
                fields:['id', 'name','introduction','discontinued', 'companyId', 'companyName','update', 'delete'],
                updating: -1
            }
        }
    }


</script>

<style scoped>

</style>