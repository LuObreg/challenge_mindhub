const { Router  } = require('../authCase/authModule');
const router = new  Router();
const { login  } = require('../authCase/authController');

////////////////////////////
// POST        login      //
////////////////////////////
router.post("/", login.login);

module.exports = router;