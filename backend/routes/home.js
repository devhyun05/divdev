const express = require('express'); 
const router = express.Router(); 
const db = require('../lib/db');

router.post('/:username/set-image', async (req, res) => {
    try {
        const username = req.body.username; 
        const user = await db.collection('Users').findOne({username: username}); 
        const userInfo = {userImage: user.photoURL}
        const categoryList = user ? user.category : []; 

        
        res.json({userInfo: userInfo, categoryList: categoryList}); 
    } catch (error) {
        console.error('Error: ' + error); 
    }
});    

router.post('/:username/add-category', async (req, res) => {
    try {
        const category = req.body.category; 
        const username = req.body.username; 
        db.collection('Users').updateOne(
            { "username" : username },
            {
                $push: {
                    "category": category 
                }
            }
        )        

        const user = await db.collection('Users').findOne({ "username": username}); 
        const categoryList = user ? user.category : []; 
  
        res.json(categoryList); 
    } catch (error) {
        console.error(error);
    }
});

router.post('/:username/sort-post', async (req, res) => {
    try {
        const category = req.body.category;
       console.log(category);
        const posts = db.collection('Posts').find({category: category});

        const postsArray = await posts.toArray(); 
        console.log(postsArray);
        res.json(postsArray); 
    } catch (error) {
        console.error(error); 
    }
});
module.exports = router;