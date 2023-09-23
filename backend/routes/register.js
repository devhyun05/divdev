const express = require('express'); 
const router = express.Router(); 
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const db = require('../lib/db'); 

const token = jwt.sign({
    data: 'Token Data',
}, 'ourSecretKey', { expiresIn: '10m' }  
); 

router.get('/:token', (req, res) => {
    const {token} = req.params; 

    // Verifying the JWT token
    jwt.verify(token, 'ourSecretKey', function(err, decoded){
        if (err) {
            console.log(err);
            res.send("Email verification failed, possibly the link is invalid or expired");
        } else {
            res.redirect('http://localhost:3001');
        }
    })
});


router.post("/", async (req, res)=> {
   
    const check = await db.collection('Users').findOne(({email: req.body.email}))
    if (check) {
        throw new Error("Email already exists!");
    } else {
        console.log("Succeed");
        db.collection('Users').insertOne({ email: req.body.email,username: 
                                           req.body.username, 
                                           password: req.body.password, 
                                           redirectURL: `/${req.body.username}`,
                                           emailVerfied: true})
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.PASSWORD 
            }
        });
        const mailConfigurations = (userMail) => ({
            from: `${process.env.EMAIL_USERNAME}`,
            to: `${userMail}`,
        
            subject: 'Email Verification',
        
            // Text of email body 
            text: `Hi! There, You have recently visited 
            our website and entered your email.
            Please follow the given link to verify your email
            http://localhost:3000/verify/${token} 
            Thanks`
        });

        transporter.sendMail(mailConfigurations(req.body.email), function(error, info) {
            if (error) {
                console.log(error);
            } else {
                res.json({dataValidation: true});
            }
        });
    }
});

module.exports = router;