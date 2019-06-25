<template>
	<div>
		<CustomTableRole striped hover :items="this.roleList"></CustomTableRole>
	</div>
</template>

<script>
	import CustomTableRole from './CustomTableRole'
	import axios from "axios";
	import {mapGetters} from 'vuex';

	export default {
		name: 'roles',
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
				'size'
			])
		},
		methods: {
			get() {
				axios
						.get(
								"http://10.0.1.97:8080/cdb/api/roles" +
								"?page=" + this.page +
								"&size=" + this.size +
								"&search=" +
								"&orderBy=id"
						)
						.then(response => (this.roleList = response.data))
						.catch(e => {
							this.errors.push(e);
						});
			}
		},
		created() {
			this.get()
		},
		watch: {
			page: function () {
				this.get()
			},
			size: function () {
				this.get()
			}
		}
	}
</script>