<template>
    <div>
        <ul v-if="computerList && computerList.length">
            <li v-bind:key="computer.id" v-for="computer of computerList">
                <p><strong>{{computer.name}}</strong></p>
            </li>
        </ul>
        <ul v-if="errors && errors.length">
            <li v-bind:key="error" v-for="error of errors">
                {{error.message}}
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Computers',
    data() {
        return {
            computerList: [],
            errors: []
        }
    },
    created() {
        axios.get(`http://localhost:8080/cdb/api/computers?page=1&size=10&search=&orderBy=id`)
            .then((response) => this.computerList = response.data)
            .catch(e => {this.errors.push(e)})
    }
}
</script>

<style>

</style>
