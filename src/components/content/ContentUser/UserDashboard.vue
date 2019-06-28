<template>
	<div id="cont">
		<b-jumbotron id="jumb" lead="User DataBase" v-if="!this.permissionDenied">
			<users :togglePermissionDenied="togglePermissionDenied" />
		</b-jumbotron>
		<pagination className="page" v-if="!this.permissionDenied" />
		<p v-else>Permission Denied !</p>
	</div>
</template>

<script>
	import pagination from '../Pagination'
	import users from "./Users";
	import {mapGetters} from 'vuex'

	export default {
		name: "UserDashboard",
		data() {
			return {
				permissionDenied: false
			}
		},
		components: {
			users,
			pagination
		},
		methods: {
			...mapGetters([
				'token'
			]),
			togglePermissionDenied() {
				this.permissionDenied = true;
			}
		},

		mounted: function () {
			if (!this.token()) {
				this.$router.push({path: "/login"});
			}
		}
	};
</script>

<style>
	#cont {
		margin: 3%;
	}

	#jumb {
		background-color: #fcfcfc;
		opacity: 10%;
	}
</style>
