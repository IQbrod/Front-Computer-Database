<template>
    <div>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group
                    id="input-group-1"
                    :label="$t('message.computerName', ['computerName'])"
                    label-for="input-name"
                    description="The name of that new computer"
            >
                <b-form-input
                        id="input-name"
                        v-model="computer.name"
                        required
                        :placeholder="$t('message.computerName', ['computerName'])"
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" :label="$t('message.introductionDate', ['introductionDate'])" label-for="input-introduction">
                <b-form-input
                        id="input-introduction"
                        v-model="computer.introduction"
                        type="date"
                        @change="changeintroduction"
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3" :label="$t('message.discontinuedDate', ['discontinuedDate'])" label-for="input-discontinued">
                <b-form-input
                        id="input-discontinued"
                        v-model="computer.discontinued"
                        type="date"
                        @change="changeDiscontinued"
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-4" :label="$t('message.company', ['company'])" label-for="input-company">
                <b-form-select
                        id="input-company"
                        v-model="computer.companyId"
                >
                    <template slot="first">
                        <option value=0>-- Please select a company --</option>
                        <option v-for="company in companiesList" :key=company.id :value=company.id> {{company.name}}
                        </option>
                    </template>
                </b-form-select>
            </b-form-group>
            <div slot="modal-footer">
                <b-button type="submit" variant="primary">{{ $t('message.submit', ['submit']) }}</b-button>
                <b-button type="reset" variant="danger">{{ $t('message.reset', ['reset']) }}</b-button>
            </div>
        </b-form>

    </div>
</template>


<script>

    export default {
        name: "AddForm",
        props: ["add", "hideModal","companies"],
        data() {
            return {
                computer: {
                    name: '',
                    discontinued: null,
                    introduction: null,
                    companyId: 0
                },
                companiesList: [],
                companiesForOptions: [],
                show: true
            }
        },
        mounted() {
            this.companiesList=this.companies
        },
        methods: {
            onSubmit(evt) {
                evt.preventDefault()
                this.add(this.computer)
                this.hideModal()

            },
            onReset(evt) {
                evt.preventDefault()
                // Reset our form values
                this.computer.name = ''
                this.computer.introduction = null
                this.computer.discontinued = null
                this.computer.companyId = 0
                // Trick to reset/clear native browser form validation state
                this.show = false
                this.$nextTick(() => {
                    this.show = true
                })
            },
            changeDiscontinued() {
                this.computer.discontinued = this.computer.discontinued === "" ? null : this.computer.discontinued
            },
            changeintroduction() {
                this.computer.introduction = this.computer.introduction === "" ? null : this.computer.introduction
            }

        }
    }
    //http://10.0.1.97:8080/cdb/api/computers?page=1&size=10&search=tenten&orderBy=id
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>