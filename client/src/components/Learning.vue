<template>
    <div>
        <body id="page-top">

            <!-- Navigation -->
            <nav class="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top" id="mainNav">
                <div class="container">
                    <a class="navbar-brand js-scroll-trigger" href="#page-top">{{ learning.subject }}</a>
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
                        <a class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" v-on:click="update">Update Profile</a>
                        </li>
                        <li class="nav-item mx-0 mx-lg-1">
                        <a class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" v-on:click="logout">Log Out</a>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>

        </body>
        <br><br><br><br><br><br>
        <section>
            <div class="row">
                <div class="col-6"></div>                
                <div class="col-5">
                    <div class="btn-group">
                        <div v-for="(subtopic, index) in learning.currenttotalsubtopic" :key="subtopic.id"> 
                            <button type="button" class="btn btn-primary" v-on:click="handleSubtopicchange(index + 1)">
                                <i class="fas fa-play fa-fw"></i>
                            </button>
                            <button type="button" class="btn btn-primary" v-on:click="handleQuestionchange(index + 1)">
                                <i class="fas fa-question fa-fw"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <br>
            <div class="row">
                <div class="col-1">
                    <div class="float-right">
                        <div v-for="(chap, index) in learning.currenttotalchapter" :key="chap.id">
                            <button type="button" class="btn btn-warning btn-block" v-on:click="handleChapterchange(index + 1)">
                                BAB {{ chap.chapter_no }}
                            </button>
                            <br>
                        </div>
                    </div>
                </div>
                <div class="col-10 bg-dark text-white rounded" style="height:700px">
                    <div class="card-img-overlay">
                        <h5 class="card-title">BAB {{ learning.chapter }}</h5>
                        <button v-if="!isloading" v-show="learning.question[0].questions != ''" class="float-right" @click="resetAnswer()">Reset Answer</button>
                        <h6 v-if="isloading" class="card-text"><br>
                            <span class="spinner-grow spinner-grow-sm text-success"></span>
                            <span class="spinner-grow spinner-grow-sm text-success"></span>
                            <span class="spinner-grow spinner-grow-sm text-success"></span>
                        </h6>
                        <div class="row" v-if="!isloading" v-show="learning.question[0].questions == ''">
                            <div class="col-6">
                                <img class="img-fluid img-thumbnail"  :src="learning.imageURL" alt="gambar rajah">
                            </div>
                            <div class="col-6" >
                                <h6 class="card-text">
                                    Sub Topik: {{ learning.subtopictitle }}
                                </h6>
                                <p class="card-text ">
                                    {{ learning.content }} 
                                </p>
                            </div>
                        </div>
                        <div v-if="!isloading" class="float-left container-fluid">
                            <div v-show="learning.question[0].questions != ''">
                                <div v-for="(question, index) in questions" :key="question.id">
                                    <h6>{{question.questions}}</h6>
                                    <div class="form-check">
                                        <input class="form-check-input" v-model="userAnswer[index]" type="radio" :name="question.questions" :id="question.option_1" :value="question.option_1">
                                        <label class="form-check-label" :for="question.option_1">
                                            {{question.option_1}}
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" v-model="userAnswer[index]" type="radio" :name="question.questions" :id="question.option_2" :value="question.option_2">
                                        <label class="form-check-label" :for="question.option_2">
                                            {{question.option_2}}
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" v-model="userAnswer[index]" type="radio" :name="question.questions" :id="question.option_3" :value="question.option_3">
                                        <label class="form-check-label" :for="question.option_3">
                                            {{question.option_3}}
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" v-model="userAnswer[index]" type="radio" :name="question.questions" :id="question.option_4" :value="question.option_4">
                                        <label class="form-check-label" :for="question.option_4">
                                            {{question.option_4}}
                                        </label>
                                    </div>
                                    <div v-if="userAnswer[index] == question.correct_answer">
                                        <h6 class="text-success">Yeay Correct!</h6>
                                    </div>
                                    <div v-else-if="userAnswer[index] == null">
                                        <h6 class="text-info">Please Pick An Answer</h6>
                                    </div>
                                    <div v-else-if="userAnswer[index] != question.correct_answer">
                                        <h6 class="text-danger">That's Incorrect</h6>
                                    </div>
                                    <br>
                                </div>
                            </div>
                            <div v-if="pageCount > 1" class="text-right ">
                                <div class="btn-group mx-2">
                                    <button v-for="i in pageNumbers" v-bind:key="i"
                                            class="btn btn-light"
                                            :class="{ 'btn-dark': i == currentPage }"
                                            @click="setCurrentPage(i), resetAnswer()">
                                        {{ i }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>       
            </div>
        </section>
    </div>
</template>

<script>

import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';
/* eslint-disable no-console */

export default {
    name: 'Learning',
    data() {
      return {
          isloading: false,
          userAnswer: [],
      }
    },
    methods: {
        update() {
            this.$router.push('/form');
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
        },
        loading() {
            setTimeout(() => {
                this.isloading = false;
            }, 2200);
        },
        ...mapActions({ getUserCurrentLearning: "learn/getUserCurrentLearning" }),
        ...mapMutations({ changeChapter: "learn/changeChapter" }),
        handleChapterchange(subject) {
            this.changeChapter(subject);
            this.isloading = true;
            this.loading();
            this.getUserCurrentLearning();
        },
        ...mapMutations({ changeSubtopic: "learn/changeSubtopic"}),
        handleSubtopicchange(subtopic) {
            this.changeSubtopic(subtopic);
            this.isloading = true;
            this.loading();
            this.getUserCurrentLearning();
        },
        ...mapActions({ getUserCurrentQuestion: "learn/getUserCurrentQuestion" }),
        handleQuestionchange(question) {
            this.changeSubtopic(question);
            this.isloading = true;
            this.loading();
            this.getUserCurrentQuestion();
        },
        ...mapMutations({ setCurrentPage: "learn/setCurrentPage" }),
        resetAnswer(){
            this.userAnswer= [];
        }
    },
    computed: {
        ...mapState({
            learning: state => state.learn
        }),
        ...mapGetters({
            questions: 'learn/processedQuestions'
        }),
        ...mapState({
            currentPage: state => state.learn.currentPage
        }),
        ...mapGetters({
            pageCount: 'learn/pageCount'
        }),
        pageNumbers() {
            return [...Array(this.pageCount + 1).keys()].slice(1);
        }
    },
    created() {
        this.getUserCurrentLearning();
    }
}
</script>