const express = require('express');
const router = express.Router();
const itineraryModel = require('../models/itineraryModel');

router.get('/', get.getAll);
router.get('/city', get.getByCityID);

module.exports = router;