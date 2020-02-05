<template>
    <nav class="navbar navbar-expand-sm" style="background-color: rgb(47,69,117); padding-right: 100px">
      <div class="col-md-6">
        <a class="navbar-brand" href="#">HOMEPAGE</a>
      </div>
      <div class="nav navbar-nav navbar-right">
        <form class="form-inline">
          <div class="form-group">
            <input type="text" class="form-control mb-2 mr-sm-2" v-model="email" id="email" name="Email" placeholder="Email">
          </div>
          <div class="form-group">
            <input type="password" class="form-control mb-2 mr-sm-2" v-model="password" id="password" placeholder="Password">
          </div>
          <div class="checkbox">
            <label style="color:white;">        
              <a href="#">Forget Password?</a>
            </label>
          </div>
          <button type="submit" v-on:click.prevent="login" class="btn btn-primary mb-2 ml-sm-1">
            Log In
          </button>
          <span><br></span>
          <div class="text-warning">
            <h6>{{error}}</h6>
          </div>
        </form>
      </div>
    </nav>
</template>


<script>
  /* eslint-disable no-console */
  import axios from 'axios';

  export default {
    name: 'login',
    data() {
      return {
        email: '',
        password: '',
        error: ''
      }
    },
    methods: {
      login() {
        let logUser = {
          email: this.email,
          password: this.password    
        }
        axios.post('users/login', logUser)
        .then(res => {
        //if success
          if (res.status === 200) {
            this.error = '';
            const token = res.data.token;
            localStorage.setItem('token', token);
            //console.log(res.data)
            //axios.defaults.headers.common['Authorization'] = token;
            this.$router.push('/home');
          }
        }, err => {
          this.error = err.response.data;
          //console.log(err.response);
        })
      }
    }
  }
    

</script>

