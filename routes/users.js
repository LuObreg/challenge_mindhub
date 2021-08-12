const { Router  } = require('../userCase/userModule');
const router = new  Router();
const { create, get  } = require('../userCase/userController');
const { check } = require('express-validator');



////////////////////////////
// POST    nuevo user //////
////////////////////////////
router.post('/signup', 
[
    check('firstName', 'Must add a valid first name').isString().not().isEmpty(),
    check('lastName', 'Must add a valid last name').isString().not().isEmpty(),
    check('email', 'Must add a valid mail').isEmail(),
    check('password', 'Must add a valid password').not().isEmpty(),
    check('userPic', 'Must add a valid user pic').isString().not().isEmpty(),
    check('country', 'Must add a valid country').isString().not().isEmpty()
], 
create.create);

////////////////////////////
// GET              users //
////////////////////////////
router.get('/:id', get.getUserById);
router.get('/', get.getUserByMail);

module.exports = router;