const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name: String,
    last_name: String,
    gender: String,
    ethnicity: String,
    birth_year: Number,
    birth_place: String,
    user_image: String,
    email: String,
    password: String
});

const User = mongoose.model('user', UserSchema);

module.exports = User;