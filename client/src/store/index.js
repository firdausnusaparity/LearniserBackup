import Vue from "vue";
import Vuex from "vuex";

import axios from "axios";
import EnrolledModule from "./enrolled";
import learningModule from "./learning";
import adminModule from "./admin";

Vue.use(Vuex);

const baseUrl = "subjects";
const subjectForm5Url = `${baseUrl}/form5`;
const subjectForm4Url = `${baseUrl}/form4`;

/* eslint-disable no-console */
export default new Vuex.Store({
  strict: true,
  modules: {
    cart: EnrolledModule,
    learn: learningModule,
    admin: adminModule
  },
  state: {
    subjectsForm5: [],
    subjectsForm4: [],
    subjectsTotal: 0
  },
  mutations: {
    setData(state, data) {
      state.subjectsForm5 = data.s5data;
      state.subjectsForm4 = data.s4data;
      state.subcjectsTotal = data.s5data.length;
    }
  },
  actions: {
    async getData(context) {
      let s5data = (
        await axios.get(subjectForm5Url, {
          headers: {
            authorization: localStorage.token || localStorage.token_admin
          }
        })
      ).data;
      let s4data = (
        await axios.get(subjectForm4Url, {
          headers: {
            authorization: localStorage.token || localStorage.token_admin
          }
        })
      ).data;
      context.commit("setData", { s5data, s4data });
    }
  }
});
