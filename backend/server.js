const express = require("express"); 
const path = require('path'); 
const cors = require('cors'); 
const sessionMiddleware = require('./middlewares/session'); 

// using environment variable 
require('dotenv').config(); 

const db = require('./lib/db'); 

const app = express(); 

app.use(express.json()); 
app.use(sessionMiddleware); 
app.use(express.static(path.join(__dirname + "/public"))); 

const corsOptions = {
    origin: ["https://divdev-d22537adf889.herokuapp.com",
             "https://www.divdev.pro",
             "http://localhost:3000"], // accept domain list
    methods: ["GET", "POST", "PUT", "DELETE"], // accept HTTP methods list
    allowHeaders: ["Content-Type", "Authorization", "text/plain"] // accept header list
}

app.use(cors(corsOptions)); 

const homeRoute = require('./routes/home');
const registerRoute = require('./routes/register'); 
const loginRoute = require('./routes/login'); 
const profileRoute = require('./routes/profile');
const projectRoute = require('./routes/project'); 
const postRoute = require('./routes/post'); 


app.use("/", homeRoute); 
app.use("/:username", homeRoute); 
app.use("/register", registerRoute); 
app.use("/verify", registerRoute); 
app.use("/login", loginRoute); 
app.use("/profile", profileRoute); 
app.use("/:username/profile", profileRoute); 
app.use("/:username/profileupdate", profileRoute); 
app.use("/:username/project", projectRoute);
app.use("/:username/projectadd", projectRoute); 
app.use("/:username/post", postRoute); 

app.listen(process.env.PORT || 8000, () => {
    console.log("Server is running at port 8000");
});