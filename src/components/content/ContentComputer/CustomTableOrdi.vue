<template>
  <b-container fluid>
    <!-- User Interface controls -->
    <b-row>
      <b-col md="6" class="my-1">
        <b-form-group label-cols-sm="3" :label=" $t('message.filter', ['filter']) " class="mb-0">
          <b-input-group>
            <b-form-input v-model="filter" :placeholder="$t('message.searchType', ['searchType'])" ></b-form-input>
            <b-input-group-append>
              <b-button
                :disabled="!filter"
                @click="filter = ''"
              >{{ $t('message.clear', ['clear']) }}</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col md="6" class="my-1">
        <b-form-group label-cols-sm="3" :label="$t('message.perPage', ['perPage'])" class="mb-0">
          <b-form-select v-model="currentSize" :options="pageOptions"></b-form-select>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="6" class="my-1">
        <b-input-group>
          <b-input-group-append>

            <transition name="slide-fade">
              <p v-if="!deleteMode">
                <b-button
                  id="btn"
                  class="btn btn-danger"
                  v-b-popover.hover="'Double click to select all elements currently in the table'"
                  title="Hint"
                  v-on:click="deleteMode=(!deleteMode)"
                  v-on:dblclick="selectedDelete=selectAll(items),deleteMode=(!deleteMode)"
                >{{ $t('message.delete', ['delete']) }}</b-button>

                <b-button id="btn" v-b-modal.modal-2>{{ $t('message.addComputer', ['addComputer']) }}</b-button>

                <b-modal ref="my-modal" id="modal-2" title="New Computer">
                  <AddForm :add="this.add" :hideModal="this.hideModal" :companies="this.companies"></AddForm>
                  <div slot="modal-footer">
                    <b-button
                      id="btn"
                      slot="modal-cancel"
                      @click="this.hideModal"
                    >{{ $t('message.cancel', ['cancel'])}}</b-button>
                  </div>
                </b-modal>
              </p>

              <p v-else>
                <b-button
                  id="btn"
                  class="btn"
                  v-b-popover.hover="'Double click to deselect all elements currently in the table'"
                  title="Hint"
                  v-on:click="deleteMode=(!deleteMode)"
                  v-on:dblclick="selectedDelete=selectedDelete=[],deleteMode=(!deleteMode)"
                >Cancel</b-button>
              </p>
            </transition>
            <transition name="slide-fade">
              <div v-if="deleteMode && selectedDelete.length>0 ">
                <b-button v-b-modal.modal-1 class="btn btn-danger">Validate</b-button>

                <b-modal id="modal-1" title="Are you sure you want to delete ?" hide-footer>
                  <template slot="modal-title">{{ $t('message.deleteWarning', ['deleteWarning']) }}</template>
                  <div class="d-block text-center">
                    <b-button
                      id="btn"
                      class="mt-3"
                      block
                      @click="validationSupression"
                    >{{ $t('message.yes', ['yes']) }}</b-button>
                    <b-button
                      id="btn"
                      class="mt-3"
                      block
                      @click="$bvModal.hide('modal-1')"
                    >{{ $t('message.no', ['no']) }}</b-button>
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
      hover
      :items="styleDanger"
      @row-clicked="selectionDelete"
      :fields="fields"
      :filter="filter"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :noLocalSorting="true"
      :no-sort-reset="true"
    >
      <template slot="name" slot-scope="row" >
        <p v-if="updating!== row.item.id">{{ row.value }}</p>
        <p v-else>
          <input v-model="newName" v-init:newName="row.item.name" type="text" id="name" name="name">
        </p>
      </template>

      <template slot="introduction" slot-scope="row">
        <p v-if="updating!== row.item.id">{{ row.value }}</p>
        <p v-else>
          <input
            v-model="newIntro"
            v-init:newIntro="row.item.introduction"
            type="date"
            id="introduction"
            name="introduction"
          >
        </p>
      </template>

      <template slot="discontinued" slot-scope="row">
        <p v-if="updating!== row.item.id">{{ row.value }}</p>
        <p v-else>
          <input
            v-model="newDiscon"
            v-init:newDiscon="row.item.discontinued"
            type="date"
            id="discontinued"
            name="discontinued"
          >
        </p>
      </template>

      <template slot="companyName" slot-scope="row">
        <p v-if="updating!== row.item.id">{{ row.value }}</p>
        <p v-else>
          <b-form-select id="input-company" v-model="row.item.companyId">
            <template slot="first">
              <option
                @click="newCompanyName='_'"
                value="0"
              >-- {{ $t('message.plsSelectCompany', ['plsSelectCompany']) }} --</option>
              <option
                @click="newCompanyName=company.name"
                v-for="company in companies"
                :key="company.id"
                :value="company.id"
              >{{company.name}}</option>
            </template>
          </b-form-select>
        </p>
      </template>

      <template slot="companyId" slot-scope="row">{{ row.value === 0 ? "_" : row.value}}</template>

      <template slot="update" slot-scope="row">
        <b-button
          v-if="updating != row.item.id"
          :disabled="updating != row.item.id && updating !== null"
          size="sm"
          class="mr-2"
          @click="updating = row.item.id"
        >{{ $t('message.update', ['update']) }}</b-button>
        <span v-else>
          <b-button
            @click="updateManager([row.item.id, newName, newIntro, newDiscon, row.item.companyId, newCompanyName ], row.item)"
            size="sm"
            class="mr-2"
          >{{ $t('message.commit', ['commit']) }}</b-button>
          <b-button
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
import { mapMutations, mapGetters } from "vuex";
import AddForm from "./FormAddComputer";

export default {
  name: "CustomTableOrdi",
  props: ["items", "delete", "add", "update", "companies"],
  data() {
    return {
      filter: this.search(),
      pageOptions: [10, 50, 100],
      perPage: 10,
      fields: [
        { key: "name", sortable: true, label: this.$t('message.name', ['name']) },
        { key: "introduction", sortable: true, label: this.$t('message.introduction', ['introduction']) },
        { key: "discontinued", sortable: true , label: this.$t('message.discontinued', ['discontinued'])},
        { key: "companyId", sortable: true, label: this.$t('message.companyId', ['companyId']) },
        { key: "companyName", sortable: true, label:this.$t('message.companyName', ['companyName']) },
        { key: "update", label:this.$t('message.update', ['update'])  }
      ],
      updating: null,
      currentSize: this.size(),
      selectedDelete: [],
      deleteMode: false,
      newName: "",
      newIntro: "",
      newDiscon: "",
      newCompanyName: "_",
      sortBy: "id",
      sortDesc: false
    };
  },
  components: {
    AddForm
  },
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
    validationSupression: function() {
      this.delete(this.selectedDelete);
      this.selectedDelete = [];
      this.deleteMode = false;
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
    updateManager: function(fields, row) {
      this.updating = null;
      row.name = fields[1];
      row.introduction = fields[2];
      row.discontinued = fields[3];
      row.companyName = fields[5];

      let modelComputer = {};
      modelComputer.id = fields[0];
      modelComputer.name = fields[1];
      modelComputer.introduction = fields[2];
      modelComputer.discontinued = fields[3];
      modelComputer.companyId = fields[4];

      this.update(modelComputer);
    }
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
      bind: function(el, binding, vnode) {
        vnode.context[binding.arg] = binding.value;
      }
    }
  },
  watch: {
    currentSize: function(value) {
      this.setSize(value);
    },
    filter: function(value) {
      this.setSearch(value);
    },
    page: function() {
      this.updating = null;
      this.selectedDelete = [];
    },
    sortBy: function(value) {
      this.setOrderBy(value);
    },
    sortDesc: function(value) {
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
</style>

