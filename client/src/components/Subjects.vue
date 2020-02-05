<template>
    <div>
        <div>
            <!-- Portfolio Subheading -->
            <p class="page-section-subheading text-center text-uppercase font-weight-bold ">Form 5</p>

            <!-- Portfolio Grid Items -->
            <div class="row">
                
            <!-- Portfolio Item 1 -->
                <div v-for="s5 in subjectsForm5" :key="s5.id" class="col-md-6 col-lg-4">
                    <div class="portfolio-item mx-auto" data-toggle="modal" :data-target="'#' + s5.reference_id">
                        <div class="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                            <div class="portfolio-item-caption-content text-center text-white">
                                <i class="fas fa-plus fa-1x"></i>
                            </div>
                        </div>
                        <button type="button" class="btn btn-success btn-block">{{s5.subjects}}</button>
                    </div>
                </div> 


            </div>

            <!-- /.row -->

            <!-- Portfolio Modals -->

            <!-- Portfolio Modal 1 -->
            <div v-for="s5 in subjectsForm5" :key="s5.id">
                <div class="portfolio-modal modal fade" :id="s5.reference_id" tabindex="-1" role="dialog" aria-labelledby="portfolioModal1Label" aria-hidden="true">
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
                            <h2 class="portfolio-modal-title text-secondary text-uppercase mb-0">{{s5.subjects}}</h2>
                            <!-- Icon Divider -->
                            <div class="divider-custom">
                                <div class="divider-custom-line"></div>
                                <div class="divider-custom-icon">
                                <i class="fas fa-star"></i>
                                </div>
                                <div class="divider-custom-line"></div>
                            </div>
                            <!-- Portfolio Modal - Image -->
                            <!-- <img class="img-fluid rounded mb-5" :src="s.imgURL" alt=""> -->
                            <!-- Portfolio Modal - Text -->
                            <p class="mb-5">{{s5.description}}</p>
                            <button class="btn btn-success" v-on:click="handleProductAdd(s5)" data-dismiss="modal">
                                <i class="fas fa-plus fa-fw"></i>
                                Enroll
                            </button>
                            <br><br>
                            <button class="btn btn-primary" href="#" data-dismiss="modal">
                                <i class="fas fa-times fa-fw"></i>
                                Close Window
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
        <div>
            <!-- Portfolio Subheading -->
            <p class="page-section-subheading text-center text-uppercase font-weight-bold ">Form 4</p>

            <!-- Portfolio Grid Items -->
            <div class="row">
                
            <!-- Portfolio Item 1 -->
                <div v-for="s4 in subjectsForm4" :key="s4.id" class="col-md-6 col-lg-4">
                    <div class="portfolio-item mx-auto" data-toggle="modal" :data-target="'#' + s4.reference_id">
                        <div class="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                            <div class="portfolio-item-caption-content text-center text-white">
                                <i class="fas fa-plus fa-1x"></i>
                            </div>
                        </div>
                        <button type="button" class="btn btn-info btn-block">{{s4.subjects}}</button>
                    </div>
                </div> 


            </div>

            <!-- /.row -->

            <!-- Portfolio Modals -->

            <!-- Portfolio Modal 1 -->
            <div v-for="s4 in subjectsForm4" :key="s4.id">
                <div class="portfolio-modal modal fade" :id="s4.reference_id" tabindex="-1" role="dialog" aria-labelledby="portfolioModal1Label" aria-hidden="true">
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
                            <h2 class="portfolio-modal-title text-secondary text-uppercase mb-0">{{s4.subjects}}</h2>
                            <!-- Icon Divider -->
                            <div class="divider-custom">
                                <div class="divider-custom-line"></div>
                                <div class="divider-custom-icon">
                                <i class="fas fa-star"></i>
                                </div>
                                <div class="divider-custom-line"></div>
                            </div>
                            <!-- Portfolio Modal - Image -->
                            <!-- <img class="img-fluid rounded mb-5" :src="s.imgURL" alt=""> -->
                            <!-- Portfolio Modal - Text -->
                            <p class="mb-5">{{s4.description}}</p>
                            <button class="btn btn-success" v-on:click="handleProductAdd(s4)" data-dismiss="modal">
                                <i class="fas fa-plus fa-fw"></i>
                                Enroll
                            </button>
                            <br><br>
                            <button class="btn btn-primary" href="#" data-dismiss="modal">
                                <i class="fas fa-times fa-fw"></i>
                                Close Window
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
    
</template>

<script>
/* eslint-disable no-console */
import { mapState, mapMutations } from "vuex";

export default {
    computed: {
        ...mapState(["subjectsForm5"]),
        ...mapState(["subjectsForm4"])
    },
    methods: {
        ...mapMutations({ addProduct: "cart/addProduct" }),
        handleProductAdd(product) {
            this.addProduct(product);
            //this.$router.push("/dashboard");
            alert('Course succesfully added, go to dashboard to start learning');
        }
    }
}
</script>