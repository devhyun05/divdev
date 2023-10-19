const session = require('express-session'); 

const sessionMiddleware = session({
    secret: 'Unknown cat', 
    resave: false, 
    saveUninitialized: true,
    cookie: { secure: false }
});

module.exports = sessionMiddleware; 