const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    postTime: {
        type: Timestamp, 
        required: true
    },
    noOfLikes: {
        type: Integer,
        required: true  
    },
    noOfComments: {
        type: Integer, 
        required: true
    }, 
    comments: {
        type: Array, 
        required: true 
    },
    titleImage: {
        type: String, 
        required: true
    },
    Author: {
        type: Array,
        required: true 
    }
});

const Post = mongoose.model("Post", PostSchema); 

module.exports = Post; 