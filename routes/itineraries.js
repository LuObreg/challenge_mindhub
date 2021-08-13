const { Router  } = require('../itineraryCase/itineraryModule')
const router = new  Router()
const { get  } = require('../itineraryCase/itineraryController')
const passport = require("passport")


////////////////////////////
// GET        itinerarios //
////////////////////////////
router.get('/itineraries', get.getAllItineraries);
router.get('/itineraries/:id', get.getbyCityID);
router.get('/checkuser/:id', passport.authenticate("jwt", { session: false }), get.getUserComments);
router.post('/comments/:id', passport.authenticate("jwt", { session: false }), get.postComment);
//router.put('/comments/:id', passport.authenticate("jwt", { session: false }), get.deleteComment);
//router.put('/comments/:id', passport.authenticate("jwt", { session: false }), get.editComment);
router.get('/like/:id', passport.authenticate("jwt", { session: false }), get.likeIt)
// passport.authenticate('jwt', { session: false }), login.loginls
router.delete('/comment/:id', passport.authenticate("jwt", { session: false }), get.deleteComment)
module.exports = router;