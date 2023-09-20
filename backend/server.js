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

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.PASSWORD 
    }
});

const token = jwt.sign({
    data: 'Token Data' 
}, 'secretKey', {
    expiresIn: '10m'
}); 

const mailConfigurations = {
    from: `${process.env.EMAIL_USERNAME}`,
    to: '',

    subject: 'Email Verification',

    // Text of email body 
    text: `Hi! there, you have recently visited out website
    and entered your email. Please follow the given link
    to verify your email 
    <form action="/login" method="POST">
    <button>Verify Email</button>
    </form>`
};


app.post("/register", async (req, res)=> {
    console.log(req.body);
    transporter.sendMail (mailConfigurations, function(error, info) {
        if (error) throw Error(error);
        console.log('Email sent successfully'); 
        console.log(info); 
    });

});

app.listen(3000, () => {
    console.log("Server is running at port 3000");
});