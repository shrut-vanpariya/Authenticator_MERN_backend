const express = require('express');
const app = express();
const router = require("./routes/router");
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('./db/conn')
require('dotenv').config();


const PORT = process.env.PORT || 8009;

// const PORT = 8009


// app.get("/", (req, res) => {
//     // console.log("get responce!");
//     res.status(201).json("server created");
// });

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'https://authmern.netlify.app',
    credentials: true,
})); // to remove CORS(cross oregin resource shering) error (front end  port 3000 and back end port 8009) 
app.use(router);

app.listen(PORT, () => {
    console.log(`Server is running at port no : ${PORT}`);
})