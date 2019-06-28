<template>
  <b-form id="form" @submit="onSubmit" @reset="onReset" :v-if="show">
    <b-form-group id="input-group-1" label="Username :" label-for="input-1">
      <b-form-input id="input-1" v-model="form.username" required placeholder="Enter username"></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-2" label="Password :" label-for="input-2">
      <b-form-input id="input-2" v-model="form.password" required placeholder="Enter password" type="password"></b-form-input>
    </b-form-group>
    <div>
      <b-button id="btn" type="submit" variant="primary">{{ $t('message.submit', ['submit']) }}</b-button>
      <b-button type="reset" variant="danger">{{ $t('message.reset', ['reset']) }}</b-button>
    </div>
    <div id="pop">
      <b-alert
        :show="dismissCountDown"
        dismissible
        variant="danger"
        @dismissed="dismissCountDown=0"
        @dismiss-count-down="countDownChanged"
      >
        <p>Connection error please check your credentials.</p>
      </b-alert>
    </div>
  </b-form>
</template>

<script>
import axios from "axios";
import { mapMutations, mapGetters, mapActions } from "vuex";
export default {
  name: "Login.vue",
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      show: true,
      dismissCountDown: 0
    };
  },
  methods: {
    ...mapMutations(["setToken"]),
    ...mapGetters(["token"]),
    ...mapActions(["editLangage"]),
    onSubmit(evt) {
      evt.preventDefault();
      this.getToken(this.form);
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    onReset(evt) {
      evt.preventDefault();
      this.form.username = "";
      this.form.password = "";
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    getToken(form) {
      let authOptions = {
        method: "POST",
        url: "http://10.0.1.97:8080/cdb/api/auth/login",
        headers: {
          Authorization:
            "Basic " + window.btoa(form.username + ":" + form.password)
        },
        json: true
      };
      axios(authOptions)
        .then(response => {
          this.setToken(response.data);
          if (!response.data && response.status === 200) {
            this.dismissCountDown = 3;
          } else if (response.data && response.status === 200) {
            this.$router.push({ path: "/computers" });
          }
        })
        .catch(function(error) {
          this.errors.push(error);
        });
    }
  }
};
</script>

<style scoped>
#form {
  margin: 5% 20% 0 20%;
}
#pop {
  margin-top: 4%;
}
#btn{
  margin-right: 2%;
}
</style>