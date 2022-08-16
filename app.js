// app.js

const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
var cors = require('cors');

// routes
const books = require('./routes/api/books');

const app = express();

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, './cise_ass1a_worksheet3/build')))

    app.get("*", (req, res)=> {
        res.sendFile(path.join(__dirname,'cise_ass1a_worksheet3/build' ,'index.html'))
    })
    
}
else {
    app.get('/',(req,res)=>{
        res.send("Api running!!");
    });
}

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Hello world!'));

// use Routes
app.use('/api/books', books);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));