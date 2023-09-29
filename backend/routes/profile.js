const express = require('express'); 
const router = express.Router(); 

router.get('/:username/profile', (req, res) => {
    console.log("Custom url");
});    

router.get("/:username/profileupdate", (req, res)=>{
    console.log(req.body); 
    console.log("a");
});

module.exports = router; 