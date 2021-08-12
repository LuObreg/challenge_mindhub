const { Router  } = require('../itineraryCase/itineraryModule')
const router = new  Router()
const { get  } = require('../itineraryCase/itineraryController')


////////////////////////////
// GET        itinerarios //
////////////////////////////
router.get('/itineraries', get.getAllItineraries);
router.get('/itineraries/:id', get.getbyCityID);
//router.get('/api/checkuser/:id', passport.authenticate("jwt", { session: false }), get.getUserComments)
// passport.authenticate('jwt', { session: false }), login.loginls
module.exports = router;