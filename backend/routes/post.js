const express = require('express'); 
const router = express.Router(); 
const db = require('../lib/db');
const { upload, deleteFromS3 } = require('../middlewares/s3Operations'); 
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
        const userName = req.body.username; 
        const postId = req.body.postId;
        const post = await db.collection('Posts').findOne({_id: new ObjectId(postId)}); 
        const user = await db.collection('Users').findOne({username: userName}); 
        const userId = user._id; 

        res.json({post, userId}); 
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

router.post("/update-post-like", async (req, res) => {
    try {
        const postId = req.body.postId; 
        const username = req.body.username; 
        const noOfLikes = req.body.noOfLikes; 
  
        const user = await db.collection('Users').findOne({username: username});  

        const findPostUser = await db.collection('Posts').findOne({ 'userListClickLike.userId': new ObjectId(user._id) }); 

        
        if (findPostUser) {
            await db.collection('Posts').updateOne(
                { "_id": new ObjectId(postId) }, 
                {
                    $set: {
                        "noOfLikes": noOfLikes
                    },
                    $pull: {
                        "userListClickLike": {
                            "userId": new ObjectId(user._id) 
                        }
                    }
                }            
            );
        } else {         
            await db.collection('Posts').updateOne(
                { "_id": new ObjectId(postId) }, 
                {
                    $set: {
                        "noOfLikes": noOfLikes
                    },
                    $push: {
                        "userListClickLike": {
                            "userId": new ObjectId(user._id) 
                        }
                    }
                }            
            );
        }

       
        res.json(noOfLikes); 
    } catch (error) {
        console.error(error); 
    }
}); 



router.post("/add-post-info", upload.single('image'), async (req, res) => { 
    const userName = req.body.username;
    const title = req.body.title; 
    let thumbnailImage;  // Initialize thumbnailImage variable
  
    if (req.file) {
        thumbnailImage = req.file.location;         
    }
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

        await db.collection('Posts').insertOne(newPost); 
     
        res.json(); 
    } catch (error) {
        console.error(error); 
    }
});


router.put("/update-post", upload.single('image'), async (req, res) => {
    const postId = req.body.postId; 
    const userName = req.body.username;
    const title = req.body.title; 

    let thumbnailImage; 

    if (req.file) {
        thumbnailImage = req.file.location;         
    }

    const category = req.body.category; 
    const postContent = req.body.postContent; 
    const postTime = req.body.postTime; 

    const currPost = await db.collection('Posts').findOne({ "_id": new ObjectId(postId) });
    const prevThumbnailImage = currPost.thumbnailImage;

  
    try {       
        const updateFields = {
            "userName": userName, 
            "title": title, 
            "category": category, 
            "postContent": postContent, 
            "postTime": postTime,
        };

        if (thumbnailImage) {
            updateFields.thumbnailImage = thumbnailImage;
            const s3Filename = "user-profile-picture/" + prevThumbnailImage.split('/').pop();
            await deleteFromS3(s3Filename); 
        }

        await db.collection('Posts').updateOne(
            { "_id": new ObjectId(postId) }, 
            {
                $set: updateFields
            }
        );



        res.json(); 
    } catch (error) {
        console.error(error); 
    }
}); 

router.delete("/delete-post", async (req, res) => {
    try {
        const postId = req.body.postId;  
        const currPost = await db.collection('Posts').findOne({_id: new ObjectId(postId) });
        
        await db.collection('Posts').deleteOne({_id: new ObjectId(postId)}); 

        if (currPost.thumbnailImage) {
            const s3Filename = "user-profile-picture/" + currPost.thumbnailImage.split('/').pop();
            deleteFromS3(s3Filename); 
        }
        res.json(); 
    } catch (error) {
        console.error(error); 
    }
}); 

module.exports = router; 