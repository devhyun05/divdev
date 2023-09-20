const User = require('../models/user');

// Add new user to the database
export const insertUser = (obj) => {
    User.insertOne(obj, function(err, res) {
        if (err) throw err; 
        
    })
}