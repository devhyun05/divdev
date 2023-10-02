const mongoose = require("mongoose"); 

const crypto = require('crypto');
const multer = require('multer'); 
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream'); 

const mongoURI = `mongodb+srv://${process.env.dbUsername}:${process.env.dbPassword}@${process.env.clusterName}.9aegbu2.mongodb.net/${process.env.dbName}?retryWrites=true&w=majority`;

mongoose.connect(
    `mongodb+srv://${process.env.dbUsername}:${process.env.dbPassword}@${process.env.clusterName}.9aegbu2.mongodb.net/${process.env.dbName}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true
    }
);

// const db = mongoose.createConnection(mongoURI);
const db = mongoose.connection; 

// Init gfs
let gfs; 


db.on("error", console.error.bind(console, "connection error: ")); 

db.once("open", ()=> {
    // Init stream
    // gfs = Grid(db.db, mongoose.mongo); 
    // gfs.collection('uploads');
    console.log("Connected successfully");
});

// Create storage engine 
// const storage = new GridFsStorage({
//     url: mongoURI,
//     file: (req, file) => {
//         return new Promise((resolve, reject) => {
//             crypto.randomBytes(16, (err, buf) => {
//                 if (err) {
//                     return reject(err); 
//                 }
//                 const filename = buf.toString('hex') + path.extname(file.originalname); 
//                 const fileInfo = {
//                     filename: filename,
//                     bucketName: 'uploads'
//                 };
//                 resolve(fileInfo);
//             });
//         });
//     }
// });

// const upload = multer({ storage });

module.exports = db;