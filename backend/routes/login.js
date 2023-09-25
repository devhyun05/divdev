const express = require('express'); 
const router = express.Router(); 
const db = require('../lib/db'); 


router.post("/", async (req, res) =>{
    try {
        const check = await db.collection('Users').findOne({email: req.body.email}); 
       
        if (check.password === req.body.password) {
            console.log(check);
            res.json(check.username);
        } else {
            res.status(401);
            res.json({message: "Password does not match"});
        }
    } catch {
        res.status(401);
        res.json({message: "User email does not exist"});
    }
})
module.exports = router;