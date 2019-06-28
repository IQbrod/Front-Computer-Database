<template>
    <div>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group
                    id="input-group-1"
                    label="Company Name:"
                    label-for="input-name"
                    description="The name of that new role"
            >
                <b-form-input
                        id="input-name"
                        v-model="role.name"
                        required
                        placeholder="Role Name"
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
                role: {
                    name: ''
                },
                show: true
            }
        },

        methods: {
            onSubmit(evt) {
                evt.preventDefault()
                this.add(this.role)
                this.hideModal()

            },
            onReset(evt) {
                evt.preventDefault()
                this.role.name = ''
                this.show = false
                this.$nextTick(() => {
                    this.show = true
                })
            }
        }
    }
</script>

<style scoped>
</style>