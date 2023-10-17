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
router.get('/:token', (req, res) => {
    const { token } = req.params;

    // Verifying the JWT token
    jwt.verify(token, 'ourSecretKey', function (err, decoded) {
        if (err) {
            console.log(err);
            res.send("Email verification failed, possibly the link is invalid or expired");
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
    })
});


router.post("/", async (req, res) => {
    console.log("Received");
    try {
        const user = await db.collection('Users').findOne({ username: req.body.username });
        console.log(user); 
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