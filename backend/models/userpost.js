const { mongoose } = require('mongoose');
const { Schema } = mongoose

const userPostSchema = new Schema({
    userPosted: {
        type: String,
        required: true
    },
    content: {
        type: String
    },
    fileContent: {
        type: String
    },
    postedOn: {
        type: Date,
        default: Date.now
    },
    likes: { type: [String] },
    comments: [{
        Comment: { type: String },
        commentedOn: {
            type: Date,
            default: Date.now
        },
        userCommented: {
            type: String,
            required: true
        }
    }]
})

const userpost = mongoose.model("Post",userPostSchema);

module.exports = userpost;