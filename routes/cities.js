const { Router  } = require('../cityCase/cityModule')
const router = new  Router()
const { create, get  } = require('../cityCase/cityController')

////////////////////////////
// GET           ciudades //
////////////////////////////
router.get('/cities', get.getCities);
router.get('/city/:id', get.getCity);
router.get('/city', get.getCityByQuery);

////////////////////////////
// POST    nueva city //////
////////////////////////////
router.post('/', create.create);

module.exports = router;