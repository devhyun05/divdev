const express = require('express'); 
const router = express.Router(); 
const db = require('../lib/db'); 


router.post("/", async (req, res) =>{
    try {
        const check = await db.collection('Users').findOne({email: req.body.email}); 
       
        if (check.password === req.body.password) {
            res.json(check.username);
        } else {
            throw new Error ("Password does not match!");
        }
    } catch (error) {
         res.json();
    }
})
module.exports = router;