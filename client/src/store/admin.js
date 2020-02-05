import axios from "axios";

const baseUrl = "subjects";
const AdminEditing = `${baseUrl}/currentediting`;
const noofchaptercurrentedit = `${baseUrl}/nochaptersincurrentediting`;
const noofsubtopiccurrentedit = `${baseUrl}/nosubtopicincurrentediting`;
const AdminUpdating = `${baseUrl}/updatesubjectsyllabus`;
const AdminQuestions = `${baseUrl}/currentadminquestion`;
const AdminUpdatingQuestion = `${baseUrl}/updatequestion`;

/* eslint-disable no-console */
export default {
  namespaced: true,
  state: {
    subject: "",
    chapter: 1,
    subtopicnumber: 1,
    subtopictitle: "",
    content: "",
    imageURL: "",
    answer: [],
    currenttotalchapter: "",
    currenttotalsubtopic: "",
    question: [
      {
        questions: "",
        option_1: " ",
        option_2: " ",
        option_3: " ",
        option_4: " ",
        correct_answer: " "
      }
    ],
    currentPage: 1,
    pageSize: 5
  },
  getters: {
    processedQuestions: state => {
      let index = (state.currentPage - 1) * state.pageSize;
      return state.question.slice(index, index + state.pageSize);
    },
    pageCount: state => Math.ceil(state.question.length / state.pageSize)
  },
  mutations: {
    setCurrentPage(state, page) {
      state.currentPage = page;
    },
    setEditingData(state, data) {
      state.subject = data.currentediting[0].subject_name;
      state.chapter = data.currentediting[0].chapter_no;
      state.subtopicnumber = data.currentediting[0].subtopic_no;
      state.subtopictitle = data.currentediting[0].subtopic_title;
      state.content = data.currentediting[0].content;
      state.imageURL = data.currentediting[0].image_link;
      state.currenttotalchapter = data.currentChapternoedit;
      state.currenttotalsubtopic = data.currentSubtopicnoedit;
      state.question = [
        {
          questions: "",
          option_1: " ",
          option_2: " ",
          option_3: " ",
          option_4: " ",
          correct_answer: " "
        }
      ];
    },
    changeChapter(state, chapter) {
      state.chapter = chapter;
      state.subtopicnumber = 1;
      state.question = [
        {
          questions: "",
          option_1: " ",
          option_2: " ",
          option_3: " ",
          option_4: " ",
          correct_answer: " "
        }
      ];
    },
    changeSubtopic(state, subtopic) {
      state.subtopicnumber = subtopic;
      state.question = [
        {
          questions: "",
          option_1: " ",
          option_2: " ",
          option_3: " ",
          option_4: " ",
          correct_answer: " "
        }
      ];
    },
    updatesubtopictitle(state, message) {
      state.subtopictitle = message;
    },
    updatecontent(state, message) {
      state.content = message;
    },
    updatequestion(state, message) {
      state.question = message;
    },
    updateimageURL(state, message) {
      state.imageURL = message;
    },
    setAdminQuestionData(state, data) {
      state.subject = data.currentQuestion[0].subject_name;
      state.question = data.currentQuestion;
    }
  },
  actions: {
    async getAdminEditing(context) {
      let subjectcurrent = {
        subject_name: localStorage.admineditsubject,
        chapter_no: this.state.admin.chapter,
        subtopic_no: this.state.admin.subtopicnumber
      };
      let currentediting = (
        await axios.post(AdminEditing, subjectcurrent, {
          headers: { authorization: localStorage.token_admin }
        })
      ).data;
      let currentChapternoedit = (
        await axios.post(noofchaptercurrentedit, subjectcurrent, {
          headers: { authorization: localStorage.token_admin }
        })
      ).data;
      let currentSubtopicnoedit = (
        await axios.post(noofsubtopiccurrentedit, subjectcurrent, {
          headers: { authorization: localStorage.token_admin }
        })
      ).data;
      context.commit("setEditingData", {
        currentediting,
        currentChapternoedit,
        currentSubtopicnoedit
      });
    },
    async updateSubjectSyllabus() {
      let subjectcurrent = {
        subject_name: localStorage.admineditsubject,
        chapter_no: this.state.admin.chapter,
        subtopic_no: this.state.admin.subtopicnumber,
        subtopic_title: this.state.admin.subtopictitle,
        content: this.state.admin.content,
        imageURL: this.state.admin.imageURL
      };
      await axios.post(AdminUpdating, subjectcurrent, {
        headers: { authorization: localStorage.token_admin }
      });
    },
    async getAdminCurrentQuestion(context) {
      let subjectcurrent = {
        subject_name: localStorage.admineditsubject,
        chapter_no: this.state.admin.chapter,
        subtopic_no: this.state.admin.subtopicnumber
      };
      let currentQuestion = (
        await axios.post(AdminQuestions, subjectcurrent, {
          headers: { authorization: localStorage.token_admin }
        })
      ).data;
      context.commit("setAdminQuestionData", { currentQuestion });
    },
    async updateQuestion(state, questionnum) {
      let subjectcurrent = {
        subject_name: localStorage.admineditsubject,
        chapter_no: this.state.admin.chapter,
        subtopic_no: this.state.admin.subtopicnumber,
        subtopic_title: this.state.admin.subtopictitle,
        question: this.state.admin.question[questionnum]
      };
      await axios.post(AdminUpdatingQuestion, subjectcurrent, {
        headers: { authorization: localStorage.token_admin }
      });
    }
  }
};
