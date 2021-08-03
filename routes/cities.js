const express = require('express');
const router = express.Router();
const cityModel = require('../models/cityModel');

////////////////////////////
// GET todas las ciudades //
////////////////////////////
router.get('/all', (req, res) => {
    cityModel.find ({})
    .then (data => {
        res.send (data)
        })
    .catch (err => console.log (err));
    });


////////////////////////////
// POST    nueva city //////
////////////////////////////
 router.post('/', (req, res) => {

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

     res.status(500) .send ("Error del servidor")})

});    

module.exports = router;