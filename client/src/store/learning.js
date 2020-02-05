import axios from "axios";

const baseUrl = 'subjects';
const UserCurrentLearnUrl = `${baseUrl}/currentlearn`;
const noofchaptercurrentlearn = `${baseUrl}/nochaptersincurrentlearning`;
const noofsubtopiccurrentlearn = `${baseUrl}/nosubtopicincurrentlearning`;
const currentsubtopicquestions = `${baseUrl}/currentquestion`;
/* eslint-disable no-console */
export default {
    namespaced: true,
    state: {
        subject: '',
        chapter: 1,
        subtopicnumber: 1,
        subtopictitle: '',
        content: '',
        imageURL: '',
        answer: [],
        currenttotalchapter: '',
        currenttotalsubtopic: '',
        question: [{ "questions": "",
                     "option_1": " ", 
                     "option_2": " ",
                     "option_3": " ", 
                     "option_4": " ", 
                     "correct_answer": " " 
        }],
        currentPage: 1,
        pageSize: 3
    },
    getters: {
        processedQuestions: state => {
            let index = (state.currentPage -1) * state.pageSize;
            return state.question.slice(index, index + state.pageSize);
        },
        pageCount: state => Math.ceil(state.question.length / state.pageSize)
    },
    mutations: {
        setCurrentPage(state, page) {
            state.currentPage = page;
        },
        setPageSize(state, size) {
            state.pageSize = size;
            state.currentPage = 1;
        },
        setCurrentLearnData(state, data) {
            state.subject = data.currentlearn[0].subject_name;
            state.chapter = data.currentlearn[0].chapter_no;
            state.subtopicnumber = data.currentlearn[0].subtopic_no;
            state.subtopictitle = data.currentlearn[0].subtopic_title;
            state.content = data.currentlearn[0].content;
            state.imageURL = data.currentlearn[0].image_link;
            state.currenttotalchapter = data.currentChapternolearn;
            state.currenttotalsubtopic = data.currentSubtopicnolearn;
        },
        setCurrentQuestionData(state, data) {
            state.question = data.currentQuestion;
        },
        changeChapter(state, chapter) {
            state.chapter = chapter;
            state.subtopicnumber = 1;
            state.question = [{ 
                "questions": "",
                "option_1": " ", 
                "option_2": " ",
                "option_3": " ", 
                "option_4": " ", 
                "correct_answer": " " 
            }];
        },
        changeSubtopic(state, subtopic) {
            state.subtopicnumber = subtopic;
            state.question = [{ 
                "questions": "",
                "option_1": " ", 
                "option_2": " ",
                "option_3": " ", 
                "option_4": " ", 
                "correct_answer": " " 
            }];
        },
        resetLearning(state) {
            state.subject = '';
            state.chapter = 1;
            state.subtopicnumber = 1;
            state.subtopictitle = '';
            state.content = '';
            state.question = [{ 
                "questions": "",
                "option_1": " ", 
                "option_2": " ",
                "option_3": " ", 
                "option_4": " ", 
                "correct_answer": " " 
            }];
        }
    },
    actions: {
        async getUserCurrentLearning(context) {
            let subjectcurrent = {
                subject_name: localStorage.currentsubject,
                chapter_no: this.state.learn.chapter,
                subtopic_no: this.state.learn.subtopicnumber
            }
            let currentlearn = (await axios.post(UserCurrentLearnUrl, subjectcurrent, {headers: {'authorization': localStorage.token}} )).data;
            let currentChapternolearn = (await axios.post(noofchaptercurrentlearn, subjectcurrent, {headers: {'authorization': localStorage.token}} )).data;            
            let currentSubtopicnolearn = (await axios.post(noofsubtopiccurrentlearn, subjectcurrent, {headers: {'authorization': localStorage.token}} )).data;            
            context.commit("setCurrentLearnData", { currentlearn, currentChapternolearn, currentSubtopicnolearn } );
        },
        async getUserCurrentQuestion(context) {
            let subjectcurrent = {
                subject_name: localStorage.currentsubject,
                chapter_no: this.state.learn.chapter,
                subtopic_no: this.state.learn.subtopicnumber
            }
            let currentQuestion = (await axios.post(currentsubtopicquestions, subjectcurrent, {headers: {'authorization': localStorage.token}} )).data;            
            context.commit("setCurrentQuestionData", { currentQuestion } );
        }
    }
}