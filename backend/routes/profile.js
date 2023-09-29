const express = require('express'); 
const router = express.Router(); 

let myHeaders = new Headers(); 
myHeaders.append("apikey", process.env.skillsAPI); 

let requestOptions = {
    method: 'GET',
    redirect: 'follow', 
    headers: myHeaders 
};

router.post("/",  async (req, res)=>{
           
    await fetch(`https://api.apilayer.com/skills?q=${req.body.keyword}`, requestOptions)
    .then(response => response.text()) 
    .then(result => res.json(result))
    .catch(error => console.log('error', error)); 

    
});

module.exports = router; 