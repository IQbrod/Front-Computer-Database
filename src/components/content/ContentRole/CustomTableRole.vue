<template>
    <b-container fluid>
        <!-- User Interface controls -->
        <b-row>
            <b-col md="4" class="my-1">
                <b-form-group label-cols-sm="3" label="Filter" class="mb-0">
                    <b-input-group>
                        <b-form-input v-model="filter" :placeholder="$t('message.searchType', ['searchType'])"></b-form-input>
                        <b-input-group-append>
                            <b-button :disabled="!filter" @click="filter = ''">{{ $t('message.clear', ['clear']) }}</b-button>
                        </b-input-group-append>
                    </b-input-group>
                </b-form-group>
            </b-col>

            <b-col md="4" class="my-1">
                <b-form-group label-cols-sm="3" label="Per page" class="mb-0">
                    <b-form-select v-model="currentSize" :options="pageOptions"></b-form-select>
                </b-form-group>
            </b-col>
            <b-col md="4" class="my-1">
                <b-input-group>
                    <b-input-group-append>
                        <p v-if="!deleteMode">
                            <b-button   id="btn"
                                        class="btn btn-danger"
                                        v-b-popover.hover="$t('message.hintDoubleCheck', ['hintDoubleCheck'])"
                                        title="Hint"
                                        v-on:click="deleteMode=(!deleteMode)"
                                        v-on:dblclick="selectedDelete=selectAll(items),deleteMode=(!deleteMode)"
                            >{{ $t('message.delete', ['delete']) }}
                            </b-button>
                            <b-button id="btn" variant="primary" v-b-modal.modal-2>{{ $t('message.addRole', ['addRole']) }}</b-button>

                            <b-modal ref="my-modal" id="modal-2" title="New Role">
                                <AddForm :add="this.add" :hideModal="this.hideModal"></AddForm>
                                <div slot="modal-footer">
                                    <b-button
                                            id="btn"
                                            slot="modal-cancel"
                                            @click="this.hideModal"
                                    >{{ $t('message.cancel', ['cancel'])}}
                                    </b-button>
                                </div>
                            </b-modal>
                        </p>
                        <p v-else>
                            <b-button  id="btn"
                                       variant="primary"
                                       class="btn"
                                       v-b-popover.hover="$t('message.hintDoubleCheck2', ['hintDoubleCheck2'])"
                                       title="Hint"
                                       v-on:click="deleteMode=(!deleteMode)"
                                       v-on:dblclick="selectedDelete=selectedDelete=[],deleteMode=(!deleteMode)">{{ $t('message.cancel', ['cancel']) }}</b-button>
                        </p>
                        <transition name="slide-fade">
                            <div v-if="deleteMode && selectedDelete.length>0 ">
                                <b-button id="btn" v-b-modal.modal-1 class="btn btn-danger">{{ $t('message.validate', ['validate']) }}</b-button>
                                <b-modal id="modal-1" title="Are you sure you want to delete ?" hide-footer>
                                    <template slot="modal-title">{{ $t('message.deleteWarning', ['deleteWarning']) }}</template>
                                    <div class="d-block text-center">
                                        <b-button
                                                id="btn"
                                                variant="danger"
                                                class="mt-3"
                                                block
                                                @click="validationSupression"
                                        >{{ $t('message.yes', ['yes']) }}
                                        </b-button>
                                        <b-button
                                                id="btn"
                                                variant="primary"
                                                class="mt-3"
                                                block
                                                @click="$bvModal.hide('modal-1')"
                                        >{{ $t('message.no', ['no']) }}
                                        </b-button>
                                    </div>
                                </b-modal>
                            </div>
                        </transition>
                    </b-input-group-append>
                </b-input-group>
            </b-col>
        </b-row>
        <!-- Main table element -->
        <b-table
                :items="styleDanger"
                @row-clicked="selectionDelete"
                :fields="fields"
                :filter="filter"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :noLocalSorting="true"
                :no-sort-reset="true"
        >
            <template slot="name" slot-scope="row">
                <p v-if="updating!== row.item.id">{{ row.value}}</p>
                <p v-else>
                    <input v-model="newName" v-init:newName="row.item.name" type="text" id="name" name="name">
                </p>
            </template>
            <template slot="update" slot-scope="row">
                <b-button
                        variant="primary"
                        v-if="updating != row.item.id"
                        :disabled="updating != row.item.id && updating !== null"
                        size="sm"
                        class="mr-2"
                        @click="updating = row.item.id"
                >{{ $t('message.update', ['update']) }}
                </b-button>
                <span v-else>
          <b-button
                  id="com"
                  variant="primary"
                  @click="updateManager([row.item.id, newName], row.item)"
                  size="sm"
                  class="mr-2"
          >Validate</b-button>
          <b-button
                  id="nonCom"
                  variant="danger"
                  @click="updating=null"
                  size="sm"
                  class="mr-2"
          >{{ $t('message.cancel', ['cancel']) }}</b-button>
        </span>
            </template>

        </b-table>
    </b-container>
</template>

<script>
    import {mapMutations, mapGetters} from "vuex";
    import AddForm from "./FormAddRole";

    export default {
        name: "CustomTableRole",
        props: ["items", "delete", "add", "update"],
        methods: {
            ...mapMutations(["setSize", "setSearch", "setOrderBy"]),
            ...mapGetters(["size", "search"]),
            selectionDelete(render) {
                if (this.selectedDelete.includes(render.id) && this.deleteMode) {
                    const index = this.selectedDelete.indexOf(render.id);
                    this.selectedDelete.splice(index, 1);
                } else if (this.deleteMode) {
                    this.selectedDelete.push(render.id);
                }
            },
            selectAll(items) {
                var res = [];
                items.forEach(elem => {
                    res.push(elem.id);
                });
                return res;
            },
            validationSupression: function () {
                this.delete(this.selectedDelete);
                this.selectedDelete = [];
                this.deleteMode = false;
            },
            hideModal() {
                this.$refs["my-modal"].hide();
            },
            updateManager: function (fields, row) {
                this.updating = null;
                row.name = fields[1];
                let modelRole = {};
                modelRole.id = fields[0];
                modelRole.name = fields[1];
                this.update(modelRole);
            }
        },
        data() {
            return {
                filter: null,
                pageOptions: [10, 50, 100],
                fields: [{key: "name", sortable: true,  label: this.$t('message.name', ['name'])}, {key:"update",  label: this.$t('message.update', ['update'])}],
                updating: null,
                currentSize: this.size(),
                selectedDelete: [],
                deleteMode: false,
                newName: "",
                sortBy: "id",
                sortDesc: false
            };
        },
        components: {
            AddForm
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
            ...mapGetters(["page"])
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
                this.updating = null;
                 this.selectedDelete = [];
                this.setSize(value);
            },
            filter: function (value) {
                this.updating = null;
                 this.selectedDelete = [];
                this.setSearch(value);
            },
            page: function () {
                this.updating = null;
                 this.selectedDelete = [];
            },
            sortBy: function (value) {
                this.updating = null;
                 this.selectedDelete = [];
                this.setOrderBy(value);
            },
            sortDesc: function (value) {
                this.updating = null;
                 this.selectedDelete = [];
                if (value) {
                    this.setOrderBy(this.sortBy + "_rev");
                } else this.setOrderBy(this.sortBy);
            }
        }
    };
</script>

<style scoped>
    #btn {
        margin-right: 10px;
    }

    .slide-fade-enter-active {
        transition: all 0.5s ease;
    }

    .slide-fade-leave-active {
        transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
    }

    .slide-fade-enter,
    .slide-fade-leave-to,
    .flip-list-leave-to {
        transform: translateX(100px);
        opacity: 0;
    }

    #com {
        margin: 3px;
    }

    #nonCom {
        margin: 3px;
    }
</style>