const express = require("express"); 
const mongoose = require("mongoose"); 
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const cors = require('cors'); 

const app = express(); 

app.use(express.json()); 

// using environment variable 
require('dotenv').config(); 

const corsOptions = {
    origin: ["http://localhost:3001"], // accept domain list
    methods: ["GET", "POST", "PUT", "DELETE"], // accept HTTP methods list
    allowHeaders: ["Content-Type", "Authorization"] // accept header list
}

app.use(cors(corsOptions)); 

mongoose.connect(
    `mongodb+srv://${process.env.dbUsername}:${process.env.dbPassword}@${process.env.clusterName}.9aegbu2.mongodb.net/${process.env.dbName}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true
    }
);

const db = mongoose.connection; 

db.on("error", console.error.bind(console, "connection error: ")); 
db.once("open", function() {
    console.log("Connected successfully");
});

const token = jwt.sign({
    data: 'Token Data',
}, 'ourSecretKey', { expiresIn: '10m' }  
); 

app.get('/verify/:token', (req, res) => {
    const {token} = req.params; 

    // Verifying the JWT token
    jwt.verify(token, 'ourSecretKey', function(err, decoded){
        if (err) {
            console.log(err);
            res.send("Email verification failed, possibly the link is invalid or expired");
        } else {
            res.send("Email verified successfully"); 
        }
    })
});

app.post("/register", async (req, res)=> {
    console.log(req.body);
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

    transporter.sendMail (mailConfigurations(req.body.email), function(error, info) {
        if (error) {
            console.log(error);
        } else {

        }
    });

});

app.listen(3000, () => {
    console.log("Server is running at port 3000");
});