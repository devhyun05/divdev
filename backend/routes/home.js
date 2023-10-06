const express = require('express'); 
const router = express.Router(); 
const db = require('../lib/db');

router.post('/:username/set-image', async (req, res) => {
    try {
   
        const user = await db.collection('Users').findOne({username: req.body.username}); 
        const userInfo = {userImage: user.photoURL}

        res.json(userInfo); 
    } catch (error) {
        console.error('Error: ' + error); 
    }

});    

module.exports = router;