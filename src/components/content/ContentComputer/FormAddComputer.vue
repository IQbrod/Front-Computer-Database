<template>
    <div>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group
                    id="input-group-1"
                    label="Computer Name:"
                    label-for="input-name"
                    description="The name of that new computer"
            >
                <b-form-input
                        id="input-name"
                        v-model="computer.name"
                        required
                        placeholder="Computer Name"
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Introduced Date:" label-for="input-introduced">
                <b-form-input
                        id="input-introduced"
                        v-model="computer.introduced"
                        type="date"
                        @change="changeIntroduced"
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3" label="Discontinued Date:" label-for="input-discontinued">
                <b-form-input
                        id="input-discontinued"
                        v-model="computer.discontinued"
                        type="date"
                        @change="changeDiscontinued"
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-4" label="Company:" label-for="input-company">
                <b-form-select
                        id="input-company"
                        v-model="computer.companyId"
                >
                    <template slot="first">
                        <option value=0>-- Please select a company --</option>
                        <option v-for="company in companies" :key=company.id :value=company.id> {{company.name}}
                        </option>
                    </template>
                </b-form-select>
            </b-form-group>
            <div slot="modal-footer">
                <b-button type="submit" variant="primary">Submit</b-button>
                <b-button type="reset" variant="danger">Reset</b-button>
            </div>
        </b-form>

    </div>
</template>


<script>
    import axios from 'axios'

    export default {
        name: "AddForm",
        props: ["add", "hideModal"],
        data() {
            return {
                computer: {
                    name: '',
                    discontinued: null,
                    introduced: null,
                    companyId: 0
                },
                companies: [],
                companiesForOptions: [],
                show: true
            }
        },
        mounted() {
            axios
                .get('http://10.0.1.97:8080/cdb/api/companies')
                .then(response => (this.companies = response.data))
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
                this.computer.introduced = null
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
            changeIntroduced() {
                this.computer.introduced = this.computer.introduced === "" ? null : this.computer.introduced
            }

        }
    }
    //http://10.0.1.97:8080/cdb/api/computers?page=1&size=10&search=tenten&orderBy=id
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>