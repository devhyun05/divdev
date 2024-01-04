const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    userName: {
        type: String, 
        required: true
    }, 
    thumbnailImage: {
        type: String, 
        required: true 
    },
    category: {
        type: String,
        required: true 
    }, 
    title: {
        type: String,
        required: true
    }, 
    postContent: {
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
    userListClickLike: {
        type: Array, 
        required: true 
    }
}); 

const Post = mongoose.model("Post", PostSchema);

module.exports = Post; 