const express = require('express'); 
const router = express.Router(); 

router.get('/:username/profile', (req, res) => {
    console.log("Custom url");
});    

module.exports = router; 