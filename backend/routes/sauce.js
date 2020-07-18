// Dans le routeur on ne veut QUE la logique de routing ainsi la logique métier sera enregistrée dans le controller sauce.js

// On a besoin d'Express
const express = require('express');
// On crée un router avec la méthode mise à disposition par Express
const router = express.Router();
// On associe les fonctions aux différentes routes, on importe le controller
const sauceCtrl = require('../controllers/sauce');
// On importe le process d'identification
const auth = require('../middleware/auth');
// On importe multer pour la gestion des images
const multer = require('../middleware/multer-config');

// En exportant dans le controller la logique métier, les fonctions, on voit plus clairement quelles sont les routes dont on dispose et on utilisera une sémantique très claire pour comprendre ce qu'elles permettent. On a quelque chose de plus modulaire plus facile à comprendre et plus facile à maintenir

// Route qui permet de créer "une sauce"
router.post('/', auth, multer, sauceCtrl.createSauce);
// Route qui permet de modifier "une sauce"
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
// Route qui permet de supprimer "une sauce"
router.delete('/:id', auth, sauceCtrl.deleteSauce);
// Route qui permet de cliquer sur une des sauces 
router.get('/:id', auth, sauceCtrl.getOneSauce);
// Route qui permet de récupérer toutes les sauces
router.get('/', auth, sauceCtrl.getAllSauces);
// Route qui permet de gérer les likes des sauces
router.post('/:id/like', auth, sauceCtrl.addLikeDislike)

module.exports = router;