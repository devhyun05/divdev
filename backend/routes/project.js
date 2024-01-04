const express = require('express');
const router = express.Router(); 
const db = require('../lib/db');
const {upload, deleteFromS3} = require('../middlewares/s3Operations'); 

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

router.post("/add-project", upload.single('image'), async (req, res)=>{
    try {
        let projectImage; 

        if (req.file) {
            projectImage = req.file.location; 
        }
        const userName = req.body.userName; 
        const projectName = req.body.projectName; 
        const projectDesc = req.body.projectDesc; 
        const projectLink = req.body.projectLink; 

        await db.collection('Users').updateOne(
            { "username": userName },
            {
              $push: {
                "projects": {
                  "project_image": projectImage,
                  "project_name": projectName,
                  "project_desc": projectDesc,
                  "project_link": projectLink
                }
              }
            }
          );

        res.json();
    } catch (error) {
        console.error("Error: ", error);
    }
})

router.delete("/delete-project", async(req, res) => {
    try {

        const userName = req.body.username; 
        const projectImageLink = req.body.projectImage; 

        const result = await db.collection('Users').updateOne(
            { username: userName },  
            { $pull: {projects: {project_image: projectImageLink}}}
        ); 
        const s3Filename = "user-profile-picture/" + projectImageLink.split('/').pop();
 
        await deleteFromS3(s3Filename); 

        res.json(); 
    } catch (error) {
        console.error("Error: ", error); 
    }
}); 

module.exports = router; 