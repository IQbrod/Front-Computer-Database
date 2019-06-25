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
                        <p v-if="!deleteMode">
                            <b-button class="btn btn-danger" v-on:click="deleteMode=(!deleteMode)">Delete</b-button>
                            <b-button v-b-modal.modal-2>New User</b-button>

                            <b-modal ref="my-modal" id="modal-2" title="New User">
                                <AddForm :add="this.add" :hideModal="this.hideModal" :roles="this.roles"></AddForm>
                                <div slot="modal-footer">
                                    <b-button slot="modal-cancel" @click="this.hideModal">Cancel</b-button>
                                </div>
                            </b-modal>

                        </p>
                        <p v-else>
                            <b-button class="btn" v-on:click="deleteMode=(!deleteMode)">Cancel</b-button>
                        </p>
                        <div v-if="deleteMode && selectedDelete.length>0 ">
                            <b-button v-b-modal.modal-1 class="btn btn-danger">Validate</b-button>
                            <b-modal id="modal-1" title="Are you sure you want to delete ?" hide-footer>
                                <template slot="modal-title">Are you sure you want to delete ?</template>
                                <div class="d-block text-center">
                                    <b-button class="mt-3" block @click="validationSupression">Yes</b-button>
                                    <b-button class="mt-3" block @click="$bvModal.hide('modal-1')">No</b-button>
                                </div>
                            </b-modal>
                        </div>
                    </b-input-group-append>
                </b-input-group>
            </b-col>
        </b-row>

        <!-- Main table element -->
        <b-table hover :items="styleDanger" @row-clicked="selectionDelete" :fields="fields">

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

            

        </b-table>

    </b-container>
</template>

<script>
    import { mapMutations, mapGetters } from 'vuex';
    import AddForm from "./FormAddUser";

    export default {
        name: "CustomTableUser",
        props: ['items','add','delete','roles','update'],
        methods:{
            ...mapMutations([
                'setSize'
            ]),
            ...mapGetters([
                'size'
            ]),
            selectionDelete(render) {
                if (this.selectedDelete.includes(render.id) && this.deleteMode) {
                    const index = this.selectedDelete.indexOf(render.id);
                    this.selectedDelete.splice(index, 1);
                } else if (this.deleteMode) {
                    this.selectedDelete.push(render.id);
                }
            },
            validationSupression: function () {
                this.delete(this.selectedDelete);
                this.selectedDelete = [];
                this.deleteMode = false;
            },
            hideModal() {
                this.$refs['my-modal'].hide()
            }
        },
        components:{
            AddForm
        },
        data(){
            return{
                filter: null,
                pageOptions: [10, 50, 100],
                perPage: 10,
                fields:['id', 'username', 'roleId', 'roleName', 'update'],
                updating: null,
                currentSize: this.size(),
                selectedDelete: [],
                deleteMode: false
            }
        },
        watch: {
            currentSize: function (value) {
                this.setSize(value);
            },
            filter: function (value) {
                this.setSearch(value);
            },
            page: function () {
				this.updating = null;
				this.selectedDelete = [];
            }
        },
        computed:{
            styleDanger() {
                return this.items.map(item => {
                    if (this.selectedDelete.includes(item.id) && this.deleteMode) {
                        item._rowVariant = "danger";
                        return item;
                    } else {
                        item._rowVariant = "";
                        return item;
                    }
                });
            }
        }
    }


</script>

<style scoped>

</style>