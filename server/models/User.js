const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: String,
    lastname: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    birthdate: String,
    gender: String,
    role: String,
    country: String,
    state: String,
    district: String,
    school: String,
    form: String
})

const User = mongoose.model('User', userSchema);
module.exports = User;