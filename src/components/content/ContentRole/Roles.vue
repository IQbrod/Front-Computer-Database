<template>

	<div>
		<CustomTableRole striped hover :update="this.update" :delete="this.delete" :add="this.add"
		                 :items="this.roleList"></CustomTableRole>
	</div>
</template>

<script>
	import CustomTableRole from './CustomTableRole'
	import axios from "axios";
	import {mapGetters, mapMutations, mapState} from 'vuex';

	export default {
		name: 'roles',
		props: ["togglePermissionDenied"],
		components: {CustomTableRole},
		data() {
			return {
				roleList: [],
				errors: []
			}
		},
		computed: {
			...mapGetters([
				'page',
				'size', "search", "count", "orderBy"]),
			...mapState(['count'])
		},
		methods: {
			...mapMutations([
				'setCount'
			]),
			...mapGetters(["token"]),
			permissionManager(error) {
				if (this.token() && error.response.status === 403) {
					this.togglePermissionDenied();
				}
			},
			headers() {
				return {
					headers: {
						Authorization: "Bearer " + this.token()
					}
				}
			},
			get() {
				axios
						.get(
								"http://10.0.1.97:8080/cdb/api/roles?" +
								"page=" + this.page
								+ "&size=" + this.size
								+ "&search=" + this.search
								+ "&orderBy=" + this.orderBy, this.headers()
						)
						.then(response => (this.roleList = response.data))
						.catch(error => {
							this.permissionManager(error);
						});
			},
			delete(listId) {
				listId.forEach(elem => {
					axios
							.delete("http://10.0.1.97:8080/cdb/api/roles/" + elem, this.headers())
							.then(() => this.get())
							.catch(error => {
								this.permissionManager(error);
							});
					this.setCount(this.count - 1);
				});
			},
			update(role) {
				axios
						.put("http://10.0.1.97:8080/cdb/api/roles/", role, this.headers())
						.catch(error => {
							this.permissionManager(error);
						});
			},
			add(role) {
				axios.post('http://10.0.1.97:8080/cdb/api/roles', role, this.headers())
						.then(() => this.get())
						.catch(error => {
							this.permissionManager(error);
						});
				this.setCount(this.count + 1);
			},
			countRoles() {
				axios
						.get('http://10.0.1.97:8080/cdb/api/roles/count?search=' + this.search, this.headers())
						.then(response => {
							this.setCount(response.data);
						})
						.catch(error => {
							this.permissionManager(error);
						});
			}
		},
		created() {
			this.countRoles();
			this.get();
		},
		watch: {
			page: function () {
				this.get()
			},
			size: function () {
				this.get()
			},
			search: function () {
				this.countRoles();
				this.get();
			},
			orderBy: function () {
				this.get();
			}
		}
	}
</script>