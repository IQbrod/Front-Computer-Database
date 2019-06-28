<template>
    <div>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group
                    id="input-group-1"
                    label="Company Name:"
                    label-for="input-name"
                    description="The name of that new company"
            >
                <b-form-input
                        id="input-name"
                        v-model="company.name"
                        required
                        placeholder="Company Name"
                ></b-form-input>
            </b-form-group>


            <div slot="modal-footer">
                <b-button type="submit" variant="primary" >{{$t('message.submit', ['submit'])}}</b-button>
                <b-button type="reset" variant="danger" >{{$t('message.reset', ['reset'])}}</b-button>
            </div >
        </b-form>

    </div>
</template>


<script>
    export default {
        name: "AddForm",
        props: ["add","hideModal"],
        data() {
            return {
                company: {
                    name: ''
                },
                show: true
            }
        },

        methods: {
            onSubmit(evt) {
                evt.preventDefault()
                this.add(this.company)
                this.hideModal()

            },
            onReset(evt) {
                evt.preventDefault()
                // Reset our form values
                this.company.name = ''
                // Trick to reset/clear native browser form validation state
                this.show = false
                this.$nextTick(() => {
                    this.show = true
                })
            }
        }
    }
    //http://10.0.1.97:8080/cdb/api/computers?page=1&size=10&search=tenten&orderBy=id
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>