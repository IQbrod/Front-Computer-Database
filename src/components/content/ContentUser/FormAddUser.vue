<template>
    <div>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group
                    id="input-group-1"
                    label="Username:"
                    label-for="input-username"
            >
                <b-form-input
                        id="input-username"
                        v-model="user.username"
                        required
                        placeholder="Username"
                ></b-form-input>
            </b-form-group>

            <b-form-group
                    id="input-group-2"
                    label="Password :"
                    label-for="input-password">
                <b-form-input
                        id="input-password"
                        v-model="user.password"
                        required
                        placeholder="Password"
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3" label="role:" label-for="input-role">
                <b-form-select
                        id="input-role"
                        v-model="user.roleId"
                        required
                >
                    <template slot="first">
                        <option v-for="role in this.roleList" :key=role.id :value=role.id> {{role.name}}
                        </option>
                    </template>
                </b-form-select>
            </b-form-group>

            <div slot="modal-footer">
                <b-button type="submit" variant="primary" > {{$t('message.submit', ['submit'])}}</b-button>
                <b-button type="reset" variant="danger" >{{$t('message.reset', ['reset'])}}</b-button>
            </div >
        </b-form>

    </div>
</template>


<script>
    export default {
        name: "AddForm",
        props: ["add","hideModal",'roles'],
        data() {
            return {
                user: {
                    username: '',
                    roleId:0
                },
                roleList: [],
                show: true
            }
        },
        
        mounted() {
            this.roleList=this.roles
        },

        methods: {
            onSubmit(evt) {
                evt.preventDefault()
                this.add(this.user)
                this.hideModal()

            },
            onReset(evt) {
                evt.preventDefault()
                // Reset our form values
                this.user.username = ''
                this.user.roleId = 0
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