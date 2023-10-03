const express = require('express'); 
const router = express.Router(); 
const db = require('../lib/db'); 


router.post("/", async (req, res) =>{
    try {
        const check = await db.collection('Users').findOne({email: req.body.email}); 
       
        if (check) {
            if (check.password === req.body.password) {
                res.json(check.username);
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