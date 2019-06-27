<template>
	<b-form id="form" @submit="onSubmit" @reset="onReset" :v-if="show">

		<b-form-group id="input-group-1" label="Username :" label-for="input-1">
			<b-form-input
					id="input-1"
					v-model="form.username"
					required
					placeholder="Enter username"
			></b-form-input>
		</b-form-group>

		<b-form-group id="input-group-2" label="Password :" label-for="input-2">
			<b-form-input
					id="input-2"
					v-model="form.password"
					required
					placeholder="Enter password"
			></b-form-input>
		</b-form-group>

		<b-button type="submit" variant="primary">Submit</b-button>
		<b-button type="reset" variant="danger">Reset</b-button>

	</b-form>
</template>

<script>
	import axios from 'axios'
	import {mapMutations, mapGetters, mapActions} from 'vuex'
	export default {
		name: "Login.vue",
		data() {
			return {
				form: {
					username: '',
					password: ''
				},
				show: true
			}
		},

		methods: {
			...mapMutations(["setToken"]),
			...mapActions([
						"editLangage"
					]
			),
			...mapGetters(["token"]),
			onSubmit(evt) {
				evt.preventDefault();
				this.getToken(this.form);
			},
			onReset(evt) {
				evt.preventDefault();
				this.form.username = '';
				this.form.password = '';
				this.show = false;
				this.$nextTick(() => {
					this.show = true
				})
			},
			getToken(form) {
				let authOptions = {
					method: 'POST',
					url: "http://10.0.1.97:8080/cdb/api/auth/login",
					headers: {
						'Authorization': 'Basic ' + window.btoa(form.username + ":" + form.password)
					},
					json: true
				};
				axios(authOptions).then(response => {
					this.setToken(response.data);
					console.log("token in form : " + this.token());
				    this.$router.go(-1);
				}).catch(function (error) {
					console.log(error);
				});
			}
		}
	}
</script>

<style scoped>
	#form{
		margin: 5% 20% 0 20%;
	}
</style>