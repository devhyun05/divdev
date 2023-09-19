const express = require('express'); 
const mongoose = require('mongoose'); 
const app = express(); 

// db connection info
const username = "devhyun05";
const password = "DQpCv6QwsatK440v";
const cluster = "cluster"; 
const dbname = "divbug"; 

app.use(express.json()); 

mongoose.connect(
    `mongodb+srv://${username}:${password}@${cluster}.9aegbu2.mongodb.net/${dbname}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true
    }
);

const db = mongoose.connection; 

db.on("error", console.error.bind(console, "connection error: ")); 
db.once("open", function() {
    console.log("Connected successfully");
});



app.listen(3000, () => {
    console.log("Server is running at port 3000");
});