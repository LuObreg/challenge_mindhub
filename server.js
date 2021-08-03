const express = require("express");

const app = express();

const port = process.env.PORT || 5000;

const cors = require("cors");

app.use(express.json());

const db = require('./keys').mongoURI

app.use(

    express.urlencoded({
        extended: true
        })
    );

const mongoose = require('mongoose')

mongoose.connect(db, {useNewUrlParser: true, useCreateIndex: true,                                                                                 useUnifiedTopology: true})

                    .then(() => console.log ('Conexión a MongoDB establecida'))

                    .catch(err => console.log (err))

app.use(cors());

app.use('/cities', require ('./routes/cities'));


app.listen (port, () => {
	console.log("El servidor se está ejecutando en el port " + port);
});