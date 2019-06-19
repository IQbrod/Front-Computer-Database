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
                {{ row.value }}
            </template>
            <template slot="name" slot-scope="row">
                <p v-if="updating!== row.item.id">{{ row.value }}</p>
                <p v-else><input :value="row.value"  type="text" id="name" name="name"></p>
            </template>

            <template slot="introduction" slot-scope="row">
                <p v-if="updating!== row.item.id">{{ row.value }}</p>
                <p v-else><input :value="row.value" type="date" id="introduction" name="introduction"></p>
            </template>

            <template slot="discontinued" slot-scope="row">
                <p v-if="updating!== row.item.id">{{ row.value }}</p>
                <p v-else><input :value="row.value" type="date" id="discontinued" name="discontinued"></p>
            </template>

              <template slot="companyName" slot-scope="row">
                {{ row.value }}
            </template>

              <template slot="companyId" slot-scope="row">
                {{ row.value}}
            </template>


            <template slot="update" slot-scope="row">
                <b-button v-if="updating != row.item.id" :disabled="updating != row.item.id && updating" size="sm" class="mr-2" v-on:click="updating = row.item.id">Update</b-button>
                <span v-else>
                    <b-button @click="" size="sm" class="mr-2">Commit</b-button>
                    <b-button @click="updating=null" size="sm" class="mr-2"> Cancel </b-button>
                </span>
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
        name: "CustomTableOrdi",
        props: ['items'],
        data(){
            return{
                filter: this.search(),
                pageOptions: [10, 50, 100],
                fields:['id', 'name','introduction','discontinued', 'companyId', 'companyName','update'],
                updating: null,
                currentSize: this.size()
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
            ])
        },
        watch: {
            currentSize: function(value) {
                this.setSize(value)
            },
            filter: function (value) {
                this.setSearch(value)
            }
        }
    }

</script>

<style scoped>

</style>