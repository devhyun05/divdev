const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true, 
    }, 
    email: {
        type: String, 
        required: true 
    }, 
    password: {
        type: String, 
        required: true 
    },
    redirectURL: {
        type: String, 
        required: true
    },
    emailVerfied: {
        type: Boolean,
        required: true 
    },
    profileDescription: {
        type: String,
        required: true 
    },
    skills: {
        type: Array, 
        required: true 
    },
    mediaLinks: {
        type: Array,
        required: true 
    },
    photoURL: {
        type: String,
        required: true 
    },
    category: {
        type: Array, 
        required: true
    }
}); 

const User = mongoose.model("User", UserSchema);

module.exports = User; 