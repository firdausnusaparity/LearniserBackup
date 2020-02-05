<template>
    <div>
        <button class="btn btn-info float-right" @click="isadding = !isadding, message = ''">Add</button>
        <div v-if="isadding && message == ''">
          <h6><input type="text" v-model="new_questions.question" style="width: 60rem" placeholder="Insert new Question"/></h6>
          <div class="card text-dark" style="width: 30rem;">
            <ul class="list-group list-group-flush">
              <div class="alert alert-primary float-right" role="alert">
                Answer Options, Please make sure to tick the right answer
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item"><input type="text" v-model="new_questions.option_1" class="rounded" style="width: 25rem;" /><input class="form-check-input" v-model="new_questions.correct_answer" type="radio" name="question1" :value="new_questions.option_1"></li>
                <li class="list-group-item"><input type="text" v-model="new_questions.option_2" class="rounded" style="width: 25rem;" /><input class="form-check-input" v-model="new_questions.correct_answer" type="radio" name="question2" :value="new_questions.option_2"></li>
                <li class="list-group-item"><input type="text" v-model="new_questions.option_3" class="rounded" style="width: 25rem;" /><input class="form-check-input" v-model="new_questions.correct_answer" type="radio" name="question3" :value="new_questions.option_3"></li>
                <li class="list-group-item"><input type="text" v-model="new_questions.option_4" class="rounded" style="width: 25rem;" /><input class="form-check-input" v-model="new_questions.correct_answer" type="radio" name="question4" :value="new_questions.option_4"></li>
              </ul>
            </ul>
          </div>
        </div>
        <div v-if="message != ''" class="text-center text-success">
            <h6>{{message}}</h6>
        </div>
        <button v-if="isadding && message == ''" class="btn btn-success float-right" @click="save()">Save</button><br><br>
    </div>
</template>

<script>
import { mapState } from "vuex";
/* eslint-disable no-console */
import axios from 'axios';

export default {
    name: 'addquestion',
    data() {
        return {
            isadding: false,
            new_questions: {
                question: '',
                option_1: '',
                option_2: '',
                option_3: '',
                option_4: '',
                correct_answer: ''
            },
            message: '',
            
        };
    },
    methods: {
        save() {
            let question = {
                questions: this.new_questions.question,
                option_1: this.new_questions.option_1,
                option_2: this.new_questions.option_2,
                option_3: this.new_questions.option_3,
                option_4: this.new_questions.option_4,
                correct_answer: this.new_questions.correct_answer,
                subject_name: this.adding.subject,
                chapter_no: this.adding.chapter,
                subtopic_no: this.adding.subtopicnumber,
                subtopic_title: this.adding.subtopictitle
            }
            axios.post('subjects/addquestion', question, {headers: {'authorization': localStorage.token}})
                .then(res => {
                    if (res) {
                        this.message = 'Add Success';
                        this.new_questions.question = '',
                        this.new_questions.option_1 = '',
                        this.new_questions.option_2 = '',
                        this.new_questions.option_3 = '',
                        this.new_questions.option_4 = '',
                        this.new_questions.correct_answer = ''
                    }
                }, err => {
                    this.message = 'Add Failed' + err.response.data ;
                })
        }
    },
    computed: {
        ...mapState({
            adding: state => state.admin
        })
    },

}
</script>