const { Router  } = require('../userCase/userModule');
const router = new  Router();
const { create, get  } = require('../userCase/userController');


////////////////////////////
// POST    nuevo user //////
////////////////////////////
router.post('/', create.create);

////////////////////////////
// GET              users //
////////////////////////////
router.get('/:id', get.getUserById);
router.get('/', get.getUserByMail);

module.exports = router;