const { response  } = require('../cityModule');
const cityRepository  = require('../../repositories/cityRepository');

const getCities = async(req,  res = response) =>  { 
try {
    const citiesDb  = await cityRepository.getAll()
    const count = await cityRepository.count()  
  
    if(!citiesDb){
      return  res.status(401).json({
        ok:false,
        message: 'No se han encontrado registros',
      })
    }

    res.status(200).json({
      ok: true,
      message:  'Ciudades',
      cities: citiesDb,
      total: count
    })  
  } catch (error) {
    res.status(500).json({
      ok:false,
        message:  'Error Interno del Servidor',
        err: error
    })
  }
}


const getCity = async (req, res = response) =>  {
    const id  = req.params.id
  
    try {
  
        const cityDb  = await cityRepository.getOne(id)
        console.log(cityDb);
  
        if(!cityDb){
          return  res.status(400).json({
            ok:false,
            message:  '',
            err
          })
        }
    
       return res.status(200).json({
          ok: true,
          message:  'Ciudad',
          cities: cityDb,
        })  
  
      } catch (error) {
        res.status(500).json({
          ok:false,
          message:  'Error Interno del Servidor',
          error
        })
      }
  }
  
  const getCityByQuery  = async (req, res = response) =>  {
    console.log(req);
    const name  = req.query.name
  
    try {
  
        const cityDb  = await cityRepository.getCityByName(name)
        console.log(cityDb);
  
        if(!cityDb){
          return  res.status(400).json({
            ok:false,
            message:  '',
            err
          })
        }
    
       return res.status(200).json({
          ok: true,
          message:  'Ciudad',
          cities: cityDb,
        })  
  
      } catch (error) {
        res.status(500).json({
          ok:false,
          message:  'Error Interno del Servidor',
          error
        })
      }
  }
  
  module.exports  = {
    getCities,
    getCity,
    getCityByQuery
  }
  