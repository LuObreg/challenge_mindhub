const { Router  } = require('../cityCase/cityModule');
const router = new  Router();
const { create, get  } = require('../cityCase/cityController');
const { check } = require('express-validator');


////////////////////////////
// GET           ciudades //
////////////////////////////
router.get('/cities', get.getCities);
router.get('/cityby/:id', get.getCity);
router.get('/city', get.getCityByQuery);

////////////////////////////
// POST    nueva city //////
////////////////////////////
router.post('/', 
[
    check('name', 'Must add a name').isString().not().isEmpty(),
    check('country', 'Must add a country').isString().not().isEmpty(),
    check('img', 'Must add an img').isString().not().isEmpty(),
    check('phrase', 'Must add a valid phrase').isString()
], 
    create.create);

module.exports = router;