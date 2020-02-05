import axios from "axios";

const baseUrl = 'subjects';
const UserEnrolledUrl = `${baseUrl}/getUserEnrolled`;
const UpdateEnrolledUrl = `${baseUrl}/addenrolled`;
const DeleteEnrolledUrl = `${baseUrl}/deleteenrolled`;


/* eslint-disable no-console */
export default {
    namespaced: true,
    state: {
        lines: [],
        currentuserenrolled: [],
        messageduplicatecourse: ''
    },
    mutations: {
        addProduct(state, product) {
            let line  = state.currentuserenrolled.find(line => line.reference_id == product.reference_id);
            if (line != null) {
                state.messageduplicatecourse = 'You already Enrolled in this course';
                alert(state.messageduplicatecourse)
            } else {
                state.currentuserenrolled.push(product);
                axios.post(UpdateEnrolledUrl, product, {
                    headers: {
                        'authorization': localStorage.token
                    }
                })
            }
        },
        removeProduct(state, lineToRemove) {
            let index  = state.currentuserenrolled.findIndex(line => line == lineToRemove);
            if (index > -1) {
                state.currentuserenrolled.splice(index, 1);
            }
            axios.post(DeleteEnrolledUrl, lineToRemove, {
                headers: {
                    'authorization': localStorage.token
                }
            })

        },
        setUserData(state, data) {
            state.currentuserenrolled = data.enrolleddata;
        }
    },
    actions: {
        async getUserEnrolledData(context) {
            let enrolleddata = (await axios.get(UserEnrolledUrl, {headers: {'authorization': localStorage.token}} )).data;
            context.commit("setUserData", { enrolleddata} );
        }
    }
}