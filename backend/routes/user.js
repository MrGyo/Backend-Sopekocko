const express = require('express');
const router = express.Router();

// On associe les fonctions aux différentes routes
const userCtrl = require('../controllers/user');

// Deux routes POST signup et login avec des fonctions dédiées
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;