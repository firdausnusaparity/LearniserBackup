<template>
    <div>
        <body id="page-top">

            <!-- Navigation -->
            <nav class="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top" id="mainNav">
                <div class="container">
                    <a class="navbar-brand js-scroll-trigger" href="#page-top">Update Profile</a>
                    <button class="navbar-toggler navbar-toggler-right text-uppercase font-weight-bold bg-primary text-white rounded" type="button" data-toggle="collapse" data-target="#navbarResponse" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i class="fas fa-bars"></i>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarResponse">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item mx-0 mx-lg-1">
                        <a class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" @click="portfolio">Home</a>
                        </li>
                        <li class="nav-item mx-0 mx-lg-1">
                        <a class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" v-on:click="dashboard">Dashboard</a>
                        </li>
                        <li class="nav-item mx-0 mx-lg-1">
                        <a class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" v-on:click="logout">Log Out</a>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav><br><br><br><br><br>
            <div class="mx-auto" style="width: 320px; margin: 0 200px 0 200px">
                <h3 class="text-center">Complete Your Profile</h3><br>
                <form>
                    <div class="form-group">
                        <label for="formGroupCountry">Country</label>
                        <select class="form-control" id="formGroupCountry" v-model="selectedCountry">
                            <option value="" selected disabled hidden>Select Your Country</option>
                            <option v-for="(country_obj, country) in places" :value="country" v-bind:key="country">{{country}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="formGroupState">State</label>
                        <select :disabled="states.length == 0" class="form-control" id="formGroupState" v-model="selectedState">
                            <option value="" selected disabled hidden>Your State?</option>
                            <option v-for="(state_obj, state) in states" v-bind:key="state">{{state}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="formGroupDistrict">District</label>
                        <select :disabled="districts.length == 0" class="form-control" id="formGroupDistrict" v-model="selectedDistrict">
                            <option value="" selected disabled hidden>District?</option>
                            <option v-for="(district_obj, district) in districts" v-bind:key="district">{{district}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="formGroupSchool">School</label>
                        <select :disabled="schools.length == 0" class="form-control" id="formGroupSchool" v-model="selectedSchool">
                            <option value="" selected disabled hidden>Your School?</option>
                            <option v-for="school in schools" v-bind:key="school">{{school}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="formGroupForm">Form</label>
                        <select :disabled="form === false" class="form-control" id="formGroupForm" v-model="selectedForm">
                            <option value="" selected disabled hidden>What Form Are You In?</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                    <div class="text-danger">
                        <h6>{{error}}</h6>
                    </div>
                    <div class="btn-group btn-group-justified">
                        <button class="btn btn-lg btn-success center" v-on:click.prevent="Submit">Submit</button>
                        <button class="btn btn-lg btn-warning center" v-on:click.prevent="Cancel">Cancel</button>
                    </div>
                </form>

            </div>
        </body>
    </div>
</template>


<script>
  /* eslint-disable no-console */
  import axios from 'axios';
  import updateProfileData from '../assets/updateProfileData';

  export default {
    name: 'login',
    data() {
      return {
        places: updateProfileData,
        countries: [],
        states: [],
        districts: [],
        schools: [],
        form: false,
        selectedCountry: '',
        selectedState: '',
        selectedDistrict: '',
        selectedSchool: '',
        selectedForm: '',
        error: ''

         //error: '
      }
    },
    methods: {
        Submit() {
            let updateUser = {
                country: this.selectedCountry,
                state: this.selectedState,
                district: this.selectedDistrict,
                school: this.selectedSchool,
                form: this.selectedForm 
            }
            axios.post('users/update', updateUser, {headers: {'authorization': localStorage.token}})
                .then(res => {
                    if (res) {
                        //console.log(res)
                        this.error = '';
                        this.$router.push('/home');
                    }
                }, err => {
                    //console.log(err.response)
                    this.error = err.response.data 
                })
        },
        Cancel() {
            this.$router.push('/home');
        },
         logout() {
            localStorage.clear();
            this.$router.push('/');
        },
        dashboard() {
            this.$router.push('/dashboard');
        },
        portfolio() {
            this.$router.push({name: 'Home'})
        }
    },
    watch: {
        selectedCountry: function() {
            // Clear previously selected values
            this.states = [];
            this.districts = [];
            this.schools = [];
            this.selectedState = "";
            this.selectedDistrict = "";
            this.selectedSchool = "";
            this.selectedForm = '';
            this.form = false;
            // Populate list of states in the second dropdown
            if (this.selectedCountry.length > 0) {
                this.states = this.places[this.selectedCountry]
            }
        },
        selectedState: function() {
            // Clear previously selected values
            this.districts = [];
            this.schools = [];
            this.selectedDistrict = "";
            this.selectedSchool = "";
            this.selectedForm = '';
            this.form = false;
            // Populate list of Districts in the third dropdown
            if (this.selectedState.length > 0) {
                this.districts = this.places[this.selectedCountry][this.selectedState]
            }

        },
        selectedDistrict: function() {
            // Clear previously selected values
            this.schools = [];
            this.selectedSchool = "";
            this.selectedForm = '';
            this.form = false;
            // Populate list of Schools in the fourth dropdown
            if (this.selectedDistrict.length > 0) {
                this.schools = this.places[this.selectedCountry][this.selectedState][this.selectedDistrict]
            }
        },
        selectedSchool: function() {
            this.form = true
        }
        
    },
}
    

</script>

