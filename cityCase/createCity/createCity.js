const { City, response } = require('../cityModule');
const { validationResult } = require('express-validator');

const create = async(req, res = response) => {
      // Check for errors
      const errores = validationResult(req);
      if( !errores.isEmpty() ){
          return res.status(400).json({ errores: errores.array() });
      };
    City.find ({ "name": req.body.name })
    .then( cityFound=>{
        if (cityFound.length == 0){
            const newCity = new City({
                name: req.body.name,
                country: req.body.country,
                img:  req.body.img
                })
    
            newCity.save( (err, cityDB ))
                .then(cityDB => {
                    const city = cityDB  
                    res.status(201).json({
                        ok: true,
                        message:  'Ciudad creada correctamente',
                        city
                    })
                })
                .catch (err => {
                    return  res.status(500).json({
                        ok:false,
                        message:  'Error interno del servidor',
                        err
                      })
                })
        }
        else{
            return res.status(500).json ({
                ok: false,
                message: req.body.name + " already exists"
            })
        }
    })
    .catch (err => {
        return  res.status(500).json({
            ok:false,
            message:  'Error interno del servidor',
            err
          })
    })
}  


module.exports = {
    create
}