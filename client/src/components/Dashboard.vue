<template>
    <div>
        <body id="page-top">
            <!-- Navigation -->
            <nav class="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top" id="mainNav">
                <div class="container">
                    <a class="navbar-brand js-scroll-trigger" href="#page-top">Dashboard</a>
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
                        <a class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" v-on:click="update">Update Profile</a>
                        </li>
                        <li class="nav-item mx-0 mx-lg-1">
                        <a class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" v-on:click="logout">Log Out</a>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>
            <br>
            
            <!-- Subjects Enrolled Section -->
            <section class="page-section portfolio" id="portfolio">
            <div class="container">

                <!-- Portfolio Section Heading -->
                <h2 class="page-section-heading text-center text-uppercase text-secondary mb-0">Subjects Enrolled</h2>

                <!-- Icon Divider -->
                <div class="divider-custom">
                    <div class="divider-custom-line"></div>
                    <div class="divider-custom-icon">
                        <i class="fas fa-star"></i>
                    </div>
                    <div class="divider-custom-line"></div>
                </div>
                <div>
                <!-- Portfolio Grid Items -->
                    <div class="row">
                        
                    <!-- Portfolio Item 1 -->
                        <div v-for="s in currentenrolled" :key="s.id" class="col-md-6 col-lg-4">
                            <div class="portfolio-item mx-auto" data-toggle="modal" :data-target="'#' + s.reference_id">
                                <div class="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                                    <div class="portfolio-item-caption-content text-center text-white">
                                        <i class="fas fa-plus fa-1x"></i>
                                    </div>
                                </div>
                                <button type="button" class="btn btn-warning btn-block">{{s.subjects}}</button>
                            </div>
                        </div> 


                    </div>

                    <!-- /.row -->
                    <!-- Portfolio Modals -->
                    <div v-if="currentenrolled.length == 0">
                        <h4 class="text-danger text-center">You're not Enrolled to any Subjects. Enroll now to start learn</h4>
                    </div>
                    <!-- Portfolio Modal 1 -->
                    <div v-for="s in currentenrolled" :key="s.id">
                        <div class="portfolio-modal modal fade" :id="s.reference_id" tabindex="-1" role="dialog" aria-labelledby="portfolioModal1Label" aria-hidden="true">
                        <div class="modal-dialog modal-xl" role="document">
                            <div class="modal-content">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">
                                <i class="fas fa-times"></i>
                                </span>
                            </button>
                            <div class="modal-body text-center">
                                <div class="container">
                                <div class="row justify-content-center">
                                    <div class="col-lg-8">
                                    <!-- Portfolio Modal - Title -->
                                    <h2 class="portfolio-modal-title text-secondary text-uppercase mb-0">{{s.subjects}}</h2>
                                    <!-- Icon Divider -->
                                    <div class="divider-custom">
                                        <div class="divider-custom-line"></div>
                                        <div class="divider-custom-icon">
                                        <i class="fas fa-star"></i>
                                        </div>
                                        <div class="divider-custom-line"></div>
                                    </div>
                                    <!-- Portfolio Modal - Image -->
                                    <!-- <img class="img-fluid rounded mb-5" :src="s.product.imgURL" alt=""> -->
                                    <!-- Portfolio Modal - Text -->
                                    <p class="mb-5">Your chapter Progress: {{s.chapter_progress}}</p>
                                    <p class="mb-5">Your question Progress: {{s.question_progress}}</p>

                                    <button class="btn btn-success" v-on:click="handleSubjectslearning(s)" data-dismiss="modal">
                                        <i class="fas fa-play fa-fw"></i>
                                        Start/Continue Learn
                                    </button>
                                    <br><br>
                                    <button class="btn btn-primary" v-on:click="handleSubjectremove(s)" data-dismiss="modal">
                                        <i class="fas fa-trash fa-fw"></i>
                                        Remove Course
                                    </button>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>

                </div>
                
                

            </div>
            </section> 

        </body>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
/* eslint-disable no-console */

export default {
    name: 'Dashboard',
    methods: {
        logout() {
            localStorage.clear();
            this.$router.push('/');
        },
        update() {
            this.$router.push('/form');
        },
        portfolio() {
            this.$router.push({name: 'Home'})
        },
        ...mapMutations({ remove: "cart/removeProduct" }),
        handleSubjectremove(product) {
            if(confirm('Are you sure to remove this course? All proggress will be lost'))
            this.remove(product);
        },
        ...mapMutations({ resetLearning: "learn/resetLearning" }),
        handleSubjectslearning(subject){
            this.resetLearning();
            localStorage.setItem('currentsubject', subject.subjects);
            this.$router.push('/learning');
        },
        ...mapActions({getUserEnrolledData: "cart/getUserEnrolledData" }),
    },
    computed: {
        ...mapState({
            currentenrolled: state => state.cart.currentuserenrolled
        }),
    },
    mounted() {
        this.getUserEnrolledData();
    }
}
</script>