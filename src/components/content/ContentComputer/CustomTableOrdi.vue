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
        <b-row>
            <b-col md="6" class="my-1">
                    <b-input-group>
                        <b-input-group-append>
                            <b-button  @click="toggleDeleteMode" class="btn btn-danger " >Delete</b-button>
                            <div v-if="deleteMode && deleteSelected.length > 0">
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
                {{ row.value }}
            </template>

            <template slot="name" slot-scope="row">
                <p v-if="updating!== row.item.id">{{ row.value }}</p>
                <p v-else><input v-model="newName" v-init:newName="row.item.name" type="text" id="name" name="name"></p>
            </template>

            <template slot="introduction" slot-scope="row">
                <p v-if="updating!== row.item.id">{{ row.value }}</p>
                <p v-else><input v-model="newIntro" v-init:newIntro="row.item.introduction" type="date" id="introduction" name="introduction"></p>
            </template>

            <template slot="discontinued" slot-scope="row">
                <p v-if="updating!== row.item.id">{{ row.value }}</p>
                <p v-else><input v-model="newDiscon" v-init:newDiscon="row.item.discontinued" type="date" id="discontinued" name="discontinued"></p>
            </template>

              <template slot="companyName" slot-scope="row">
                {{ row.value }}
            </template>

              <template slot="companyId" slot-scope="row">
                {{ row.value}}
            </template>

            <template slot="update" slot-scope="row">
                <b-button v-if="updating !== row.item.id" :disabled="updating !== row.item.id && updating!==null" size="sm" class="mr-2" v-on:click="updating = row.item.id">Update</b-button>
                <span v-else>
                    <b-button @click="updateManager([row.item.id, newName, newIntro, newDiscon, row.item.companyId], row.item)" size="sm" class="mr-2">Commit</b-button>
                    <b-button @click="updating=null" size="sm" class="mr-2"> Cancel </b-button>
                </span>
            </template>
        </b-table>
    </b-container>
</template>

<script>
    import { mapMutations, mapGetters } from 'vuex';
    export default {
        name: "CustomTableOrdi",
        props: ['items', 'delete', 'update'],

        data(){
            return{
                filter: this.search(),
                pageOptions: [10, 50, 100],
                fields:['id', 'name','introduction','discontinued', 'companyId', 'companyName','update'],
                updating: null,
                currentSize: this.size(),
                deleteMode:false,
                deleteSelected: [],
                newName:'',
                newIntro:'',
                newDiscon:''
            }
        },
        methods: {
            ...mapMutations([
                'setSize',
                'setSearch'
            ]),
            ...mapGetters([
                'size',
                'search'
            ]),
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
                this.delete(this.deleteSelected);
                this.deleteSelected = [];
                this.deleteMode = false
            },
            updateManager: function(fields, row) {

                this.updating=null;
                row.name=fields[1];
                row.introduction = fields[2];
                row.discontinued = fields[3];

                let modelComputer={};
                modelComputer.id=fields[0];
                modelComputer.name=fields[1];
                modelComputer.introduction=fields[2];
                modelComputer.discontinued=fields[3];
                modelComputer.companyId=fields[4];
                this.update(modelComputer);
            },
        },
        watch: {
            currentSize: function(value) {
                this.setSize(value)
            },
            filter: function (value) {
                this.setSearch(value)
            },
            page: function () {
                this.updating=null;
            }
        },
        directives: {
            init: {
                bind : function (el, binding, vnode) {
                    vnode.context[binding.arg] = binding.value;
                }
            }
        },
        computed: {
            ...mapGetters([
                'page'
            ])
        }
    }

</script>

<style scoped>

</style>