const express = require("express"); 
const mongoose = require("mongoose"); 
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

const registerRoute = require('./routes/register'); 

app.use("/register", registerRoute); 
app.use("/verify", registerRoute); 


app.listen(3000, () => {
    console.log("Server is running at port 3000");
});