const express = require('express'); 
const router = express.Router(); 
const db = require('../lib/db'); 


router.post("/", async (req, res) =>{
    try {       
        const email = req.body.email; 
        const password = req.body.password;

        const user = await db.collection('Users').findOne({email: email}); 

        if (user) {
            if (user.password === password) {
            
                res.json({username: user.username, email: user.email, password: user.password});
            } else {
                throw new Error ("Password does not match!");
            }
        } else {
            throw new Error ("Email does not exist!");
        }
    } catch (error) {
       if (error.message === "Email does not exist!") {
            res.status(404).json();
       } else if (error.message === "Password does not match!") {
            res.status(401).json();
       }
    }
})
module.exports = router;