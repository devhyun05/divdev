const express = require('express');
const router = express.Router(); 
const db = require('../lib/db');
const upload = require('../middlewares/multer'); 

router.post("/get-project", async (req, res) => {
    try {
        const username = req.body.username; 
        const user = await db.collection('Users').findOne({username: username});

        const userProjects = user.projects;

        res.json(userProjects);
    } catch (error) {
        console.error("Error: ", error); 
    }
}); 

router.put("/upload-image", upload.single('image'), async(req, res) => {
    try {

        res.json(req.file.location);
    } catch (error) {
        console.error("Error: ", error); 
    }
}); 

router.put("/update-project",  async (req, res)=>{
    try {

        await db.collection('Users').updateOne(
            {"username": req.body.username}, 
            {
                $set: {
                    "projects": req.body.projects
                }
            }
        )

        res.json();
    } catch (error) {
        console.error("Error: ", error);
    }
})

module.exports = router; 