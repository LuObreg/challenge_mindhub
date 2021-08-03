const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
    res.send ({msg: 'Ruta de prueba de ciudades.'});
})

module.exports = router;