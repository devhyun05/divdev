const express = require('express'); 
const router = express.Router(); 
const db = require('../lib/db');
const upload = require('../middlewares/multer'); 
const { ObjectId } = require('mongodb');

router.post("/get-blog-post", async (req, res) => {
    try {        
        const username = req.body.username; 
        const posts = db.collection('Posts').find({userName: username});

        const postsArray = await posts.toArray();        
        res.json(postsArray); 
    } catch (error) {
        console.error(error); 
    }
}); 

router.post("/get-post-details", async (req, res) => {
    try {        

        const postTitle = req.body.title;
        const post = await db.collection('Posts').findOne({title: postTitle}); 

        res.json(post); 
    } catch (error) {
        console.error(error); 
    }
});

router.post("/get-category-lists", async (req, res) => {
    try {

        const username = req.body.username;    
        const user = await db.collection('Users').findOne({username: username});  
        const categoryList = user ? user.category : [];
        res.json(categoryList);  
    } catch (error) {
        console.error(error); 
    }
}); 
router.post("/add-post-info", upload.single('image'), async (req, res) => { 
    const userName = req.body.username;
    const title = req.body.title; 
    const thumbnailImage = req.file.location; 
    const category = req.body.category; 
    const postContent = req.body.postContent; 
    const postTime = req.body.postTime; 
    const noOfLikes = req.body.noOfLikes; 
    const noOfComments = req.body.noOfComments; 

    try {
        const newPost = {
                            userName: userName, 
                            title: title, 
                            thumbnailImage: thumbnailImage, 
                            category: category, 
                            postContent: postContent, 
                            postTime: postTime, 
                            noOfLikes: noOfLikes,
                            noOfComments: noOfComments 
                        }; 
        const result = await db.collection('Posts').insertOne(newPost); 
     
        res.json(); 
    } catch (error) {
        console.error(error); 
    }
});

router.put("/update-post", upload.single('image'), async (req, res) => {
    const prevPostId = req.body.prevPostId; 
    const userName = req.body.username;
    const title = req.body.title; 
    const thumbnailImage = req.file.location; 
    const category = req.body.category; 
    const postContent = req.body.postContent; 
    const postTime = req.body.postTime; 


    try {       
        await db.collection('Posts').updateOne(
            { "_id": new ObjectId(prevPostId) }, 
            {
                $set: {
                    "userName": userName, 
                    "title": title, 
                    "thumbnailImage": thumbnailImage, 
                    "category": category, 
                    "postContent": postContent, 
                    "postTime": postTime,                     
                }
            }
        )

        res.json(); 
    } catch (error) {
        console.error(error); 
    }
}); 

router.delete("/delete-post", async (req, res) => {
    try {
        const postTitle = req.body.title;  
        await db.collection('Posts').deleteOne({title: postTitle}); 
        res.json(); 
    } catch (error) {
        console.error(error); 
    }
}); 

module.exports = router; 