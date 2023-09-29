const mongoose = require("mongoose"); 

const { createModel } = require('mongoose-gridfs');
const { Readable } = require('stream');

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

module.exports = db;