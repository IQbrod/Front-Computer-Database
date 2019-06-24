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
                            <b-button v-b-modal.modal-2>Add Computer</b-button>

                            <b-modal ref="my-modal" id="modal-2" title="New Computer">
                                <AddForm :add="this.add" :hideModal="this.hideModal"></AddForm>
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
            <template slot="id" slot-scope="row">{{ row.value}}</template>

            <template slot="name" slot-scope="row">
                <p v-if="updating!== row.item.id">{{ row.value }}</p>
                <p v-else><input v-model="newName" v-init:newName="row.item.name" type="text" id="name" name="name"></p>
            </template>

            <template slot="introduction" slot-scope="row">
                <p v-if="updating!== row.item.id">{{ row.value }}</p>
                <p v-else><input v-model="newIntro" v-init:newIntro="row.item.introduction" type="date"
                                 id="introduction" name="introduction"></p>
            </template>

            <template slot="discontinued" slot-scope="row">
                <p v-if="updating!== row.item.id">{{ row.value }}</p>
                <p v-else><input v-model="newDiscon" v-init:newDiscon="row.item.discontinued" type="date"
                                 id="discontinued" name="discontinued"></p>
            </template>

            <template slot="companyName" slot-scope="row">{{ row.value }}</template>

            <template slot="companyId" slot-scope="row">{{ row.value}}</template>

            <template slot="update" slot-scope="row">
                <b-button
                        v-if="updating != row.item.id"
                        :disabled="updating != row.item.id && updating !== null"
                        size="sm"
                        class="mr-2"
                        v-on:click="updating = row.item.id"
                >Update
                </b-button>
                <span v-else>
          <b-button @click="updateManager([row.item.id, newName, newIntro, newDiscon, row.item.companyId], row.item)"
                    size="sm" class="mr-2">Commit</b-button>
          <b-button @click="updating=null" size="sm" class="mr-2">Cancel</b-button>
        </span>
            </template>
        </b-table>

    </b-container>
</template>

<script>
    import {mapMutations, mapGetters} from "vuex"
    import AddForm from "./FormAddComputer"

    export default {
        name: "CustomTableOrdi",
        props: ["items", "delete", "add", "update"],
        data() {
            return {
                filter: this.search(),
                pageOptions: [10, 50, 100],
                perPage: 10,
                fields: [
                    "id",
                    "name",
                    "introduction",
                    "discontinued",
                    "companyId",
                    "companyName",
                    "update"
                ],
                updating: null,
                currentSize: this.size(),
                selectedDelete: [],
                deleteMode: false,
                newName: '',
                newIntro: '',
                newDiscon: ''
            };
        },
        components: {
            AddForm
        },
        methods: {
            ...mapMutations(["setSize", "setSearch"]),
            ...mapGetters(["size", "search"]),
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
            },
            updateManager: function (fields, row) {
                this.updating = null;
                row.name = fields[1];
                row.introduction = fields[2];
                row.discontinued = fields[3];

                let modelComputer = {};
                modelComputer.id = fields[0];
                modelComputer.name = fields[1];
                modelComputer.introduction = fields[2];
                modelComputer.discontinued = fields[3];
                modelComputer.companyId = fields[4];
                this.update(modelComputer);
            },
        },
        computed: {
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
            },
            ...mapGetters([
                'page'
            ])
        },
        directives: {
            init: {
                bind: function (el, binding, vnode) {
                    vnode.context[binding.arg] = binding.value;
                }
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
            }
        }
    }
</script>
