const AWS = require('aws-sdk'); 
require("aws-sdk/lib/maintenance_mode_message").suppress = true;
const multer = require('multer'); 
const multerS3 = require('multer-s3'); 
const path = require('path'); 
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const upload = multer({
    // store in s3 bucket
    storage: multerS3({
        s3: new AWS.S3(),
        bucket: process.env.AWS_BUCKET_NAME,
        acl: "public-read",
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key(req, file, cb) {
            const newFileName = Date.now() + "-" + file.originalname; 
            cb(null, `user-profile-picture/` + newFileName); 
        },
    }),

    // maximum file size
    limits: { fileSize: 5 * 1024 * 1024}
})

module.exports = upload; 