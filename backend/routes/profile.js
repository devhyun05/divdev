const express = require('express'); 
const router = express.Router(); 

const db = require('../lib/db');

// profile 
router.post("/get-profile", async (req, res) => {
    try {

        const username = req.body.username; 
        const user = await db.collection('Users').findOne({username: username}); 

        const userInfo = {profileDesc: user.profileDescription, userSkills: user.skills, userMedia: user.mediaLinks}
        res.json(userInfo); 
    } catch (error) {
        console.error('Error: ', error); 
    }
})

// profile update
let myHeaders = new Headers(); 
myHeaders.append("apikey", process.env.skillsAPI); 

let requestOptions = {
    method: 'GET',
    redirect: 'follow', 
    headers: myHeaders 
};

router.post("/",  async (req, res)=>{           
    try {
        const response = await fetch(`https://api.apilayer.com/skills?q=${req.body.keyword}`, requestOptions); 
        const result = await response.text(); 

        const resultArray = result.split(',').map((skills, index) => ({
            id: index + 1,
            skills: skills.replace(/["[\]]/g, '').trim()  // Remove double quotes and square brackets
        }));
  
        res.json(resultArray); 
    } catch (error) {
        console.error('Error: ', error); 
        res.status(500).json({error: 'Internal Server Error'});
    }   
});



router.put("/update-profile", async (req, res) => {

    try {
        const username = req.body.username; 
        const profileSummary = req.body.profileDesc; 
        const userSkills = req.body.userSkills; 
        const userMedia = req.body.userMedia; 
        
        db.collection('Users').updateOne(
            { "username": username }, 
            {
                $set: {
                    "profileDescription": profileSummary,
                    "skills": userSkills,
                    "mediaLinks": userMedia
                }
            }
        );
        res.json("Succeed");
    } catch (error) {
        console.error('Error', error); 
    }
}); 

router.put("/update-icon", (req, res) => {
    try {
        db.collection('Users').updateOne(
            {  "mediaLinks.mediaURL": req.body.url},
            { $pull: { "mediaLinks": { "mediaURL": req.body.url}}}
        )
        res.json("Succeed");
    } catch (error) {
        console.error('Error', error); 
    }
});
module.exports = router; 