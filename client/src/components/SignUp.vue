<template>
    <div class="container-fluid" style="background-color: #f1f4f4; ">
        <div class="row" style="padding: 30px 20px 20px 70px" >
            <div class="col-md-6">
                <img src="../assets/logo.png" alt="">
            </div>
            <div class="col-md-6">
                <h6 class="text-success">{{loginmessage}}</h6>
                <h1>Create an Account</h1>
                <div class="page-description">It's quick and easy.</div>
                
                 <form action="" style="">
                     <table>
                         <div class="text-danger">
                            <h6>{{error}}</h6>
                         </div>
                         <tr>
                            <td><input type="text" v-model="firstname" placeholder="First name" class="form-control"></td>
                            <td><input type="text" v-model="lastname" placeholder="Surname" class="form-control"></td>
                         </tr>
                         <tr>
                             <td colspan="2"><input type="text" v-model="email" placeholder="Email Address" class="form-control"></td>
                         </tr>
                         <tr>
                             <td colspan="2"><input type="password" v-model="password" placeholder="New password" class="form-control"></td>
                         </tr>
                         <tr>
                            <td>
                                <span>
                                    <label for="birthday">Birthday</label>
                                </span>
                                <input type="date" v-model="birthdate" placeholder="Birthday" class="form-control">
                            </td> 
                         </tr>
                         <tr>
                            <td>
                                <span>
                                    <label for="gender">Gender</label><br>
                                </span>
                                <div class="form-check form-check-inline">
                                    <input v-model="gender" class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="Male">
                                    <label class="form-check-label" for="inlineRadio1">Male</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input v-model="gender" class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="Female">
                                    <label class="form-check-label" for="inlineRadio2">Female</label>
                                </div>
                            </td> 
                         </tr>
                         <tr>
                             <td>
                                 <button class="btn btn-lg btn-success" v-on:click.prevent="signup">Sign Up</button>
                             </td>
                         </tr>
                         
                     </table>
                     
                 </form>
            </div>

        </div>
    </div>
</template>


<script>
    /* eslint-disable no-console */

    import axios from 'axios';

    export default {
        name: 'signUp',
        data() {
            return {
                    firstname: '',
                    lastname: '',
                    email: '',
                    password: '',
                    birthdate: '',
                    gender: [],

                    error: '',
                    loginmessage: ''
            }
        },
        methods: {
            signup() {
                let newUser = {
                    firstname: this.firstname,
                    lastname: this.lastname,
                    email: this.email,
                    password: this.password,
                    birthdate: this.birthdate,
                    gender: this.gender,
                }
                axios.post('users/signup', newUser)
                .then( res => {
                    if (res.status === 200) {
                        //console.log(res)
                        this.error = '';
                        this.onReset();
                        this.loginmessage = 'You may Login Now';
                        //this.$router.replace('/Home');
                    }
                }, err => {
                    //console.log(err.response)
                    this.error = err.response.data 
                })
            },
            onReset() {
                // Reset our form values
                this.email = ''
                this.firstname = ''
                this.lastname = ''
                this.password = ''
                this.birthdate = ''
                this.gender = []
            }
        }
    }
         
</script>