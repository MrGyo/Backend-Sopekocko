// On a besoin d'Express,
const express = require('express');
// On crée un router avec la méthode mise à disposition par Express,
const router = express.Router();

// On associe les fonctions aux différentes routes, on importe le controller
const userCtrl = require('../controllers/user');

// Deux routes POST signup et login avec des fonctions dédiées
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;