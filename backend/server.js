const express = require("express"); 
const cors = require('cors'); 


// using environment variable 
require('dotenv').config(); 

const db = require('./lib/db'); 

const app = express(); 

app.use(express.json()); 

const corsOptions = {
    origin: ["http://localhost:3001"], // accept domain list
    methods: ["GET", "POST", "PUT", "DELETE"], // accept HTTP methods list
    allowHeaders: ["Content-Type", "Authorization"] // accept header list
}

app.use(cors(corsOptions)); 

const registerRoute = require('./routes/register'); 

app.use("/register", registerRoute); 
app.use("/verify", registerRoute); 


app.listen(3000, () => {
    console.log("Server is running at port 3000");
});