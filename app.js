const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const cors = require("cors");

app.use(express.json());
app.use(
    express.urlencoded({
    extended: true
    })
);
app.use(cors());

const db = require('./keys').mongoURI
const mongoose = require('mongoose')

mongoose.connect(db, {useNewUrlParser: true, useCreateIndex: true,                                                                                 useUnifiedTopology: true})
        .then(() => console.log ('Conexión a MongoDB establecida'))
        .catch(err => console.log (err))

app.use('/api', require ('./routes/cities'));

module.exports = {
    port,
    app
    }
    