<template>
    <div>
        <CustomTableUser striped hover :items="this.UserList"></CustomTableUser>
    </div>
</template>

<script>
    import CustomTableUser from './CustomTableUser'
    export default {
        name : 'users',
        props : ['UserList'],
        components: {CustomTableUser},
        data() {
            return {

            }
        }
    }
</script>