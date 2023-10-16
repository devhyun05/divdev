const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    blogId: {
        type: String, 
        required: true
    },
    postTime: {
        type: String,
        required: true 
    }, 
    text: {
        type: String,
        required: true 
    },
    author: {
        type: Array, 
        required: true 
    },
    noOfLikes: {
        type: Integer,
        required: true 
    }
})

const Comment = mongoose.model("Comment", CommentSchema); 
module.exports = Comment; 