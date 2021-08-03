const express = require('express');
const router = express.Router();
const cityModel = require('../models/cityModel');

////////////////////////////
// GET todas las ciudades //
////////////////////////////

router.get('/all', (req, res) => {
    cityModel.find ({})
    .then (data => {
        res.send(data)
        })
    .catch(err => console.log (err));
    });


////////////////////////////
// POST    nueva city //////
////////////////////////////

 router.post('/', (req, res) => {

    cityModel.find ({ "name": req.body.name })
    .then( cityFound=>{
        if (cityFound.length == 0){
            const newCity = new cityModel({
                name: req.body.name,
                country: req.body.country,
                img:  req.body.img
                })
    
            newCity.save()
                .then(city => {
                    res.send(city)
                })
                .catch (err => {
                    res.status(500).send("Server error")
                })
        }
        else{
            res.status(500).send (req.body.name + " already exists")
        }
    })
    .catch(err => {
            res.status(500).send ("Server error")
        });  
    }  
)


module.exports = router;