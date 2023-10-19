const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const db = require('../lib/db');


const token = jwt.sign({
    data: 'Token Data',
}, 'ourSecretKey', { expiresIn: '10m' }
);

let userCredentials = {
    email: "", 
    username: "", 
    password: "" 
}

let forgotPasswordState = false; 

router.get('/:token', (req, res) => {
   
    const { token } = req.params;

    // Verifying the JWT token
    jwt.verify(token, 'ourSecretKey', function (err, decoded) {
   
        if (err) {
            console.log(err);
            res.send("Email verification failed, possibly the link is invalid or expired");
        } else {
            if (forgotPasswordState) {                  
                res.redirect('http://localhost:3001/resetpassword');
            } else {
                db.collection('Users').insertOne({
                    email: userCredentials.email, 
                    username: userCredentials.username,                     
                    password: userCredentials.password,
                    redirectURL: `/${userCredentials.username}`,
                    emailVerfied: true
                })
                res.redirect('http://localhost:3001');
            }       
        }
    })
});


// forgot password 
router.post("/forgotpassword", async (req, res) => {
    try {

        const email = req.body.email; 

        const user = await db.collection('Users').findOne({email: email});  
        userCredentials.email = email; 
        forgotPasswordState = true; 

        if (user) {     
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
                text: `Hi! click below link to reset
                your password
                http://localhost:3000/verify/${token}
                Thanks`     
            });     
      
            transporter.sendMail(mailConfigurations(req.body.email), function (error, info) {
                if (error) {
                    console.log(error);
                } else {                    
                    req.session.email = req.body.email; 
                    res.json({ dataValidation: true });
                }
            });

        
        } else {
    
            throw new Error("Email does not exist")
        }
    } catch (error) {
        if (error.message === "Email does not exist") {
            res.status(404).json("Email does not exist");
        } else {
            console.error(error); 
        }
    }
}); 

// reset password
router.post("/resetpassword", async (req, res) => {
    try {
        console.log(req.session.email);
        const email = req.session.email; 
        const newPassword = req.body.password; 

        await db.collection('Users').updateOne(
            {"email" : email}, 
            {
                $set: {
                    "password": newPassword 
                }
            }
        )

        res.json(); 
    } catch (error) {
        console.error(error); 
    }
}); 

router.post("/", async (req, res) => {

    try {
        const user = await db.collection('Users').findOne({ username: req.body.username });

        if (user) {
            if (user.email) {
                throw new Error("1");
            } else if (user.username) {
                throw new Error("2");
            }
        }
        else {
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

            userCredentials = { email: req.body.email, username: req.body.username, password: req.body.password };
                
            transporter.sendMail(mailConfigurations(req.body.email), function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    res.json({ dataValidation: true });
                }
            });
        }
    } catch (error) {
        if (error.message === "1") {
            res.status(403).json("1");
        } else if (error.message === "2") {
            res.status(403).json("2");
        } else {
            console.error(error);
        }
    }
});

module.exports = router;