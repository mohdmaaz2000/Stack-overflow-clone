const { mongoose } = require('mongoose');
const { Schema } = mongoose

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    about: { type: String },
    tags: { type: [String] },
    joinedOn: { type: Date, default: Date.now },
    chatbot: [{
        question: String,
        answer: String
    }],
    otp: {
        type: String
    },
    verified: {
        type: Boolean,
        default: false
    },
    profilePhoto:{
        type:String
    }
})

const user = mongoose.model("User", userSchema);
module.exports = user;