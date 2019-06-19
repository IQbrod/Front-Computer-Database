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
        <b-row>
            <b-col md="6" class="my-1">
                    <b-input-group>
                        <b-input-group-append>
                            <b-button  @click="toggleDeleteMode" class="btn btn-danger " >Delete</b-button>
                            <div v-if="deleteMode && deleteSelected.length>0 ">
                                <b-button @click="validationSupression">Valider la supression</b-button>
                            </div>
                        </b-input-group-append>
                    </b-input-group>
            </b-col>
        </b-row>

        <!-- Main table element -->
        <b-table :items="this.items" :fields="fields" @row-clicked="deletedSelection" >


            <template slot="id" slot-scope="row" >
                <p v-if="deleteMode"> <b-form-checkbox value="row.items.id" @change="deletedSelection(row.item.id)">Check me out</b-form-checkbox></p>
                {{ row.value}}
            </template>

            <template slot="name" slot-scope="ligne">
                <p v-if="updating!== ligne.item.id">{{ ligne.value}}</p>
                <p v-else><input :value="ligne.value"  type="text" id="name" name="name"></p>
            </template>

            <template slot="introduction" slot-scope="ligne">
                <p v-if="updating!== ligne.item.id">{{ ligne.value}}</p>
                <p v-else><input :value="ligne.value" type="date" id="introduction" name="introduction"></p>
            </template>

            <template slot="discontinued" slot-scope="ligne">
                <p v-if="updating!== ligne.item.id">{{ ligne.value}}</p>
                <p v-else><input :value="ligne.value" type="date" id="discontinued" name="discontinued"></p>
            </template>

              <template slot="companyName" slot-scope="row">
                {{ row.value }}
            </template>

              <template slot="companyId" slot-scope="row">
                {{ row.value}}
            </template>

            <template slot="update" slot-scope="ligne">
                <b-button size="sm" class="mr-2 " v-on:click="updating = ligne.item.id" > Update</b-button>
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
        props: ['items','delete'],

        data(){
            return{
                filter: null,
                pageOptions: [10, 50, 100],
                perPage: 10,
                fields:['id', {key:'name'},'introduction','discontinued', 'companyId', 'companyName','update',],
                updating: -1,
                deleteMode:false,
                deleteSelected: [],
            }
        },

        methods:{
            deletedSelection(id){
                if (this.deleteSelected.includes(id)){
                    const index = this.deleteSelected.indexOf(id);
                    if (index !== -1) this.deleteSelected.splice(index, 1)}
                else{this.deleteSelected.push(id)}

            },
            toggleDeleteMode: function(){
                this.deleteMode = (!this.deleteMode)
            },
            validationSupression: function () {
                this.delete(this.deleteSelected)
                this.deleteSelected = []
                this.deleteMode = false

            }
        }

    }


</script>

<style scoped>

</style>