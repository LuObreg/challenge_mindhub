const { Router  } = require('../authCase/authModule');
const router = new  Router();
const { login  } = require('../authCase/authController');
const { check } = require('express-validator');
const passport = require('passport');


////////////////////////////
// POST        login      //
////////////////////////////
router.post("/signin", 
[
    check('email', 'Must add a valid mail').isEmail(),
    check('password', 'Must add a valid password').not().isEmpty(),
],
login.login);
router.get('/signinls', passport.authenticate('jwt', { session: false }), login.loginls);


module.exports = router;