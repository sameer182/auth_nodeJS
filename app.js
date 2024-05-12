const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

//Mongodb config
const db = require('./config/keys').MongoURI;


//Connect to mongodb
mongoose.connect(db)
 .then(() => console.log("MongoDB connected successfully...."))
 .catch(err => console.log(err));

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Body parser
app.use(express.urlencoded({ extended: false}));


//Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));



const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server listening on port: ${PORT}`));