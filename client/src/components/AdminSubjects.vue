<template>
  <div>
    <div class="p-3 mr-5 float-right">
      <button class="m-3 rounded-pill" @click.prevent="back">Back</button>
      <button class="m-3 mr-5 rounded-pill" @click.prevent="home">Main</button>
      <button type="button" class="btn btn-dark" style="width: 7rem" v-on:click="logoutAdmin">
        <i class="fas fa-sign-out-alt"></i>
      </button>
    </div>
    <section class="page-section portfolio" id="portfolio">
      <div class="container">
        <div>
          <div>
            <!-- Portfolio Subheading -->
            <p class="page-section-subheading text-center text-uppercase font-weight-bold">
              Form 5
              <button @click="togglef5 = !togglef5">View</button>
            </p>
            <!-- Portfolio Grid Items -->
            <div class="row" v-if="togglef5">
              <!-- Portfolio Item 1 -->
              <div v-for="s5 in subjectsForm5" :key="s5.id" class="col-md-6 col-lg-4">
                <div
                  class="portfolio-item mx-auto"
                  data-toggle="modal"
                  :data-target="'#' + s5.reference_id"
                >
                  <div
                    class="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100"
                  >
                    <div class="portfolio-item-caption-content text-center text-white">
                      <i class="fas fa-plus fa-1x"></i>
                    </div>
                  </div>
                  <button type="button" class="btn btn-success btn-block">{{ s5.subjects }}</button>
                </div>
              </div>
            </div>
            <!-- /.row -->
            <!-- Portfolio Modals -->
            <div v-for="s5 in subjectsForm5" :key="s5.id">
              <div
                class="portfolio-modal modal fade"
                :id="s5.reference_id"
                tabindex="-1"
                role="dialog"
                aria-labelledby="portfolioModal1Label"
                aria-hidden="true"
              >
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
                            <h2
                              class="portfolio-modal-title text-secondary text-uppercase mb-0"
                            >{{ s5.subjects }}</h2>
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
                            <p class="mb-5">{{ s5.description }}</p>
                            <button
                              class="btn btn-success"
                              v-on:click="handleProductEdit(s5)"
                              data-dismiss="modal"
                            >
                              <i class="fas fa-plus fa-fw"></i>
                              Add/Edit
                            </button>
                            <br />
                            <br />
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
            <p class="page-section-subheading text-center text-uppercase font-weight-bold">
              Form 4
              <button @click="togglef4 = !togglef4">View</button>
            </p>

            <!-- Portfolio Grid Items -->
            <div class="row" v-if="togglef4">
              <!-- Portfolio Item 1 -->
              <div v-for="s4 in subjectsForm4" :key="s4.id" class="col-md-6 col-lg-4">
                <div
                  class="portfolio-item mx-auto"
                  data-toggle="modal"
                  :data-target="'#' + s4.reference_id"
                >
                  <div
                    class="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100"
                  >
                    <div class="portfolio-item-caption-content text-center text-white">
                      <i class="fas fa-plus fa-1x"></i>
                    </div>
                  </div>
                  <button type="button" class="btn btn-info btn-block">{{ s4.subjects }}</button>
                </div>
              </div>
            </div>
            <!-- /.row -->
            <!-- Portfolio Modals -->
            <div v-for="s4 in subjectsForm4" :key="s4.id">
              <div
                class="portfolio-modal modal fade"
                :id="s4.reference_id"
                tabindex="-1"
                role="dialog"
                aria-labelledby="portfolioModal1Label"
                aria-hidden="true"
              >
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
                            <h2
                              class="portfolio-modal-title text-secondary text-uppercase mb-0"
                            >{{ s4.subjects }}</h2>
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
                            <p class="mb-5">{{ s4.description }}</p>
                            <button
                              class="btn btn-success"
                              v-on:click="handleProductEdit(s4)"
                              data-dismiss="modal"
                            >
                              <i class="fas fa-plus fa-fw"></i>
                              Add/Edit
                            </button>
                            <br />
                            <br />
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
      </div>
    </section>
    <section>
      <div class="row">
        <div class="col-6 text-center">
          <h5>Editing Subject: {{ editing.subject }}</h5>
        </div>
        <div class="col-5">
          <div class="btn-group">
            <div v-for="(subtopic, index) in editing.currenttotalsubtopic" :key="subtopic.id">
              <button
                type="button"
                class="btn btn-primary"
                v-on:click="handleSubtopicchange(index + 1)"
              >
                <i class="fas fa-play fa-fw"></i>
              </button>
              <button
                type="button"
                class="btn btn-primary"
                v-on:click="handleQuestionchange(index + 1)"
              >
                <i class="fas fa-question fa-fw"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-1">
          <div class="float-right">
            <div v-for="(chap, index) in editing.currenttotalchapter" :key="chap.id">
              <button
                type="button"
                class="btn btn-warning btn-block"
                v-on:click="handleChapterchange(index + 1)"
              >BAB {{ chap.chapter_no }}</button>
              <br />
            </div>
          </div>
        </div>
        <div class="col-10 bg-dark text-white rounded" style="height:2000px">
          <div class="card-img-overlay">
            <h5 class="card-title">BAB {{ editing.chapter }}</h5>
            <h6 v-if="isloading" class="card-text">
              <br />
              <span class="spinner-grow spinner-grow-sm text-success"></span>
              <span class="spinner-grow spinner-grow-sm text-success"></span>
              <span class="spinner-grow spinner-grow-sm text-success"></span>
            </h6>
            <p v-if="!isloading" v-show="editing.question[0].questions == ''" class="card-text"></p>
            <div class="row" v-if="!isloading" v-show="editing.question[0].questions == ''">
              <div class="col-6">
                <div v-if="isediting">
                  <uploadimage />
                  <label>Image Link/URL:</label>
                  <input type="text" class="rounded text-center container-fluid" v-model="imageURL" />
                </div>
                <label>Image Preview</label>
                <img class="img-fluid img-thumbnail" :src="editing.imageURL" alt="gambar rajah" />
              </div>
              <div class="col-6">
                <span>
                  <div class="btn-group btn-group-justified">
                    <button class="btn btn-warning center" @click="isediting = !isediting">Edit</button>
                    <button
                      v-if="isediting"
                      class="btn btn-success center"
                      @click="handleUpdateSyllabus"
                    >Save</button>
                  </div>
                </span>
                <br />
                <br />
                <h6 v-if="isediting" class="card-text">
                  Sub Topik:
                  <input type="text" class="rounded text-center" v-model="subtopictitle" />
                </h6>
                <textarea
                  v-if="isediting"
                  type="text"
                  class="rounded text-center form-control"
                  v-model="content"
                ></textarea>
                <h6 v-if="!isediting" class="card-text">Sub Topik: {{ editing.subtopictitle }}</h6>
                <p v-if="!isediting" class="card-text">{{ editing.content }}</p>
              </div>
            </div>
            <div v-if="!isloading" class="float-left container-fluid">
              <div v-show="editing.question[0].questions != ''">
                <!-- adding new question part -->
                <addquestion />
                <!-- Editing question part -->
                <button class="btn btn-warning float-right" @click="isediting = !isediting">Edit</button>
                <br />
                <br />
                <div v-for="(question, index) in questions" :key="question.id">
                  <h6 v-if="!isediting">{{index + 1}}. {{question.questions}}</h6>
                  <h6 v-if="isediting">
                    {{index + 1}}.
                    <input
                      type="text"
                      style="width: 60rem"
                      v-model="question.questions"
                    />
                  </h6>
                  <div v-if="!isediting" class="card text-dark" style="width: 30rem;">
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item">
                        {{question.option_1}}
                        <i
                          v-if="question.option_1 === question.correct_answer"
                          class="fas fa-check-circle float-right"
                        ></i>
                      </li>
                      <li class="list-group-item">
                        {{question.option_2}}
                        <i
                          v-if="question.option_2 === question.correct_answer"
                          class="fas fa-check-circle float-right"
                        ></i>
                      </li>
                      <li class="list-group-item">
                        {{question.option_3}}
                        <i
                          v-if="question.option_3 === question.correct_answer"
                          class="fas fa-check-circle float-right"
                        ></i>
                      </li>
                      <li class="list-group-item">
                        {{question.option_4}}
                        <i
                          v-if="question.option_4 === question.correct_answer"
                          class="fas fa-check-circle float-right"
                        ></i>
                      </li>
                    </ul>
                  </div>
                  <div v-if="isediting" class="card text-dark" style="width: 30rem;">
                    <ul class="list-group list-group-flush">
                      <div
                        class="alert alert-primary float-right"
                        role="alert"
                      >Answer Options, Please make sure to tick the right answer</div>
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                          <input
                            type="text"
                            class="rounded"
                            style="width: 25rem;"
                            v-model="adminquestion[index].option_1"
                          />
                          <input
                            class="form-check-input"
                            v-model="adminquestion[index].correct_answer"
                            type="radio"
                            :name="question.questions"
                            :id="question.option_1"
                            :value="question.option_1"
                          />
                        </li>
                        <li class="list-group-item">
                          <input
                            type="text"
                            class="rounded"
                            style="width: 25rem;"
                            v-model="adminquestion[index].option_2"
                          />
                          <input
                            class="form-check-input"
                            v-model="adminquestion[index].correct_answer"
                            type="radio"
                            :name="question.questions"
                            :id="question.option_2"
                            :value="question.option_2"
                          />
                        </li>
                        <li class="list-group-item">
                          <input
                            type="text"
                            class="rounded"
                            style="width: 25rem;"
                            v-model="adminquestion[index].option_3"
                          />
                          <input
                            class="form-check-input"
                            v-model="adminquestion[index].correct_answer"
                            type="radio"
                            :name="question.questions"
                            :id="question.option_3"
                            :value="question.option_3"
                          />
                        </li>
                        <li class="list-group-item">
                          <input
                            type="text"
                            class="rounded"
                            style="width: 25rem;"
                            v-model="adminquestion[index].option_4"
                          />
                          <input
                            class="form-check-input"
                            v-model="adminquestion[index].correct_answer"
                            type="radio"
                            :name="question.questions"
                            :id="question.option_4"
                            :value="question.option_4"
                          />
                        </li>
                      </ul>
                    </ul>
                  </div>
                  <div v-if="isediting">
                    <button
                      class="btn btn-danger float-right"
                      @click="handleUpdateQuestion(index)"
                    >Delete</button>
                    <button
                      class="btn btn-success float-right"
                      @click="handleUpdateQuestion(index)"
                    >Save</button>
                  </div>
                  <br />
                  <br />
                </div>
              </div>
              <!-- Paging control on editing -->
              <div v-if="pageCount > 1" class="text-right">
                <div class="btn-group mx-2">
                  <button
                    v-for="i in pageNumbers"
                    v-bind:key="i"
                    class="btn btn-light"
                    :class="{ 'btn-dark': i == currentPage }"
                    @click="setCurrentPage(i), resetAnswer()"
                  >{{ i }}</button>
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
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";

import addquestion from "./AddQuestion";
import uploadimage from "./UploadImage";
/* eslint-disable no-console */

export default {
  name: "AdminDash",
  components: { addquestion, uploadimage },
  data() {
    return {
      togglef5: false,
      togglef4: false,
      isediting: false,
      isloading: false,
      isadding: false,
      userAnswer: []
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    home() {
      this.$router.push("/admin-dashboard");
    },
    logoutAdmin() {
      localStorage.clear();
      this.$router.push("/admin");
    },
    update() {
      this.$router.push("/form");
    },
    portfolio() {
      this.$router.push({ name: "Home" });
    },
    loading() {
      setTimeout(() => {
        this.isloading = false;
      }, 2200);
    },
    //...mapMutations({ addProduct: "cart/addProduct" }),
    handleProductEdit(product) {
      localStorage.setItem("admineditsubject", product.subjects);
      this.togglef5 = false;
      this.togglef4 = false;
      this.getAdminEditing();
    },
    handleUpdateSyllabus() {
      this.isloading = true;
      this.loading();
      this.updateSubjectSyllabus();
    },
    handleUpdateQuestion(questionnum) {
      this.isloading = true;
      this.loading();
      this.updateQuestion(questionnum);
    },
    ...mapActions(["getData"]),
    ...mapActions({ getAdminEditing: "admin/getAdminEditing" }),
    ...mapActions({ updateSubjectSyllabus: "admin/updateSubjectSyllabus" }),
    ...mapActions({ updateQuestion: "admin/updateQuestion" }),
    ...mapMutations({ changeChapter: "admin/changeChapter" }),
    handleChapterchange(subject) {
      this.isediting = false;
      this.changeChapter(subject);
      this.isloading = true;
      this.loading();
      this.getAdminEditing();
    },
    ...mapMutations({ changeSubtopic: "admin/changeSubtopic" }),
    handleSubtopicchange(subtopic) {
      this.isediting = false;
      this.changeSubtopic(subtopic);
      this.isloading = true;
      this.loading();
      this.getAdminEditing();
    },
    ...mapActions({ getUserAdminQuestion: "admin/getAdminCurrentQuestion" }),
    handleQuestionchange(question) {
      this.changeSubtopic(question);
      this.isloading = true;
      this.loading();
      this.getUserAdminQuestion();
    },
    ...mapMutations({ setCurrentPage: "admin/setCurrentPage" }),
    resetAnswer() {
      this.userAnswer = [];
    }
  },
  computed: {
    ...mapState(["role"]),
    ...mapState(["subjectsForm5"]),
    ...mapState(["subjectsForm4"]),
    ...mapState({
      editing: state => state.admin
    }),
    subtopictitle: {
      get() {
        return this.$store.state.admin.subtopictitle;
      },
      set(value) {
        this.$store.commit("admin/updatesubtopictitle", value);
      }
    },
    content: {
      get() {
        return this.$store.state.admin.content;
      },
      set(value) {
        this.$store.commit("admin/updatecontent", value);
      }
    },
    imageURL: {
      get() {
        return this.$store.state.admin.imageURL;
      },
      set(value) {
        this.$store.commit("admin/updateimageURL", value);
      }
    },
    adminquestion: {
      get() {
        return this.$store.state.admin.question;
      },
      set(value) {
        this.$store.commit("admin/updatequestion", value);
      }
    },
    ...mapGetters({
      questions: "admin/processedQuestions"
    }),
    ...mapState({
      currentPage: state => state.admin.currentPage
    }),
    ...mapGetters({
      pageCount: "admin/pageCount"
    }),
    pageNumbers() {
      return [...Array(this.pageCount + 1).keys()].slice(1);
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
