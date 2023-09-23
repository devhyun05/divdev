const express = require('express'); 
const router = express.Router(); 
const db = require('../lib/db'); 


router.post("/", async (req, res) =>{
   
    try {
        const check = await db.collection('Users').findOne({email: req.body.email}); 
       
        if (check.password === req.body.password) {
            res.json("succeed");
        } else {
            res.send("wrong password"); 
        }
    } catch {
        res.send("wrong details");
    }
})
module.exports = router;