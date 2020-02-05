<template>
  <div class="container-fluid">
    <div class="row justify-content-center" style="padding-top: 7rem">
      <form class="card" style="width: 25rem; padding: 3rem">
        <h6 class="text-center" style="margin-bottom: 3rem">
          <u>Admin Access</u>
        </h6>
        <div class="form-group">
          <input
            v-model="email"
            type="email"
            class="form-control text-center"
            id="InputEmail1"
            placeholder="Enter Email"
          />
        </div>
        <div class="form-group">
          <input
            v-model="password"
            type="password"
            class="form-control text-center"
            id="InputPassword"
            placeholder="Password"
          />
        </div>
        <div class="alert alert-danger" role="alert" v-if="error">
          <strong>{{error}}</strong> Make sure you are an Admin and are inserting the right credential
        </div>
        <div>
          <button type="submit" v-on:click.prevent="login" class="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import axios from "axios";

export default {
  name: "admin",
  data() {
    return {
      email: "",
      password: "",
      error: ""
    };
  },
  methods: {
    logoutAdmin() {
      localStorage.clear();
      this.$router.push("/admin");
    },
    login() {
      let logAdmin = {
        email: this.email,
        password: this.password
      };
      axios.post("users/adminlogin", logAdmin).then(
        res => {
          //if success
          if (res.status === 200) {
            this.error = "";
            const token_admin = res.data.token;
            localStorage.setItem("token_admin", token_admin);
            axios
              .get("users/currentusers", {
                headers: { authorization: localStorage.token_admin }
              })
              .then(result => {
                if (result.data.user) {
                  localStorage.setItem("role", result.data.user.role);
                  //this.currentUser = result.data.user.role;
                  this.$store.state.role = result.data.user.role;
                } else {
                  this.logoutAdmin();
                }
              });
            this.$router.push("/admin-dashboard");
          }
        },
        err => {
          this.error = err.response.data;
        }
      );
    }
  }
};
</script>