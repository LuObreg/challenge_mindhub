const express = require("express");

const app = express();

const port = process.env.PORT || 5000;

const cors = require("cors");

app.use(express.json());

app.use(

    express.urlencoded({
        extended: true
        })
    );

app.use(cors());

app.use('/cities', require ('./routes/cities'));


app.listen (port, () => {
	console.log("El servidor se está ejecutando en el port " + port);
});