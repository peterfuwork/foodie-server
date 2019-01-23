const mongoose = require('mongoose');
const PostSchema = require('./post');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    first_name: {
        type: String,
        validate: {
            validator: (first_name) => first_name.length > 1,
            message: 'First name must be longer than 1 character.'
        },
        required: [true, 'First name is required.']
    },
    last_name: String,
    gender: String,
    ethnicity: String,
    birth_year: Number,
    birth_place: String,
    user_image: String,
    email: String,
    password: String,
    posts: [PostSchema],
    foods: [{
        type: Schema.Types.ObjectId,
        ref: 'food'
    }]
});

const User = mongoose.model('user', UserSchema);

module.exports = User;