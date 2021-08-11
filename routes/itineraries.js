const { Router  } = require('../itineraryCase/itineraryModule')
const router = new  Router()
const { get  } = require('../itineraryCase/itineraryController')

////////////////////////////
// GET        itinerarios //
////////////////////////////
router.get('/', get.getAllItineraries);
router.get('/:city', get.getbyCityID);


module.exports = router;