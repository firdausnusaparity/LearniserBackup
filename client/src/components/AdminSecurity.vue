<template>
  <div class="container-fluid justify-content-center">
    <div class="p-3 mr-5 float-right">
      <button class="m-3 rounded-pill" @click.prevent="back">Back</button>
      <button class="m-3 mr-5 rounded-pill" @click.prevent="home">Main</button>
      <button type="button" class="btn btn-dark" style="width: 7rem" v-on:click="logoutAdmin">
        <i class="fas fa-sign-out-alt"></i>
      </button>
    </div>
    <br />
    <div class="pt-lg-5" style="margin-left: 25rem;">
      <form class="card" style="width: 40rem; padding: 5rem; ">
        <div class="row">
          <div class="col">
            <h6 class="text-center" style="margin-bottom: 3rem">Change Password :</h6>
          </div>
          <div class="col">
            <div class="alert alert-danger" role="alert" v-if="error">
              <strong>{{error}}</strong>
            </div>
            <div class="form-group">
              <label for="InputOldPassword">Old Password</label>
              <input
                v-model="OldPassword"
                type="password"
                class="form-control text-center"
                id="InputOldPassword"
              />
            </div>
            <div class="form-group">
              <label for="InputNewPassword">New Password</label>
              <input
                v-model="NewPassword"
                type="password"
                class="form-control text-center"
                id="InputNewPassword"
              />
            </div>
            <div class="form-group">
              <label for="RetypeNewPassword">Retype Password</label>
              <input
                v-model="RetypePassword"
                type="password"
                class="form-control text-center"
                id="RetypeNewPassword"
              />
            </div>
            <div class="alert alert-danger" role="alert" v-if="RetypeError">{{RetypeError}}</div>
            <div
              v-if="loading"
              class="spinner-border text-info"
              style="margin-left: 5rem; margin-top: 1rem"
              role="status"
            >
              <span class="sr-only">Loading...</span>
            </div>
            <div class="alert alert-success" role="alert" v-if="message">
              <strong>{{message}}</strong>
            </div>
            <div v-if="!loading" class="text-center">
              <button @click.prevent="ResetPassword" type="submit" class="btn btn-primary">Confirm</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import axios from "axios";

export default {
  name: "AdminSecurity",
  data() {
    return {
      OldPassword: "",
      NewPassword: "",
      RetypePassword: "",
      RetypeError: "",
      error: "",
      message: "",
      loading: false
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    home() {
      this.$router.push("/admin-dashboard");
    },
    ResetPassword() {
      if (this.OldPassword.length < 6) {
        this.message = "";
        this.error = "Old Password is required and at least 6 character";
      } else if (
        this.NewPassword.length < 6 ||
        this.RetypePassword.length < 6
      ) {
        this.message = "";
        this.error = "";
        this.RetypeError =
          "New and Retype Password cannot be empty and at least 6 character";
      } else if (this.NewPassword !== this.RetypePassword) {
        this.message = "";
        this.error = "";
        this.RetypeError = "Retype Password Did Not Match";
      } else {
        this.error = "";
        this.RetypeError = "";
        const ResetData = {
          Old: this.OldPassword,
          New: this.NewPassword,
          RetypeNew: this.RetypePassword
        };
        this.loading = true;
        axios
          .post("adminusers/updateadmin", ResetData, {
            headers: { authorization: localStorage.token_admin }
          })
          .then(
            res => {
              this.loading = false;
              //if success
              if (res.status === 200) {
                this.error = "";
                this.RetypeError = "";
                this.OldPassword = "";
                this.NewPassword = "";
                this.RetypePassword = "";
                this.message = "Success: Password Changed";
              }
            },
            err => {
              this.error = err.response.data;
              this.loading = false;
              this.message = "";
              this.OldPassword = "";
              this.NewPassword = "";
              this.RetypePassword = "";
              //console.log(err.response);
            }
          );
      }
    },
    logoutAdmin() {
      localStorage.clear();
      this.$router.push("/admin");
    }
  }
};
</script>