// On importe express
const express = require('express');
// Pour gérer la demande POST provenant de l'application front-end, nous devrons être capables d'extraire l'objet JSON de la demande, on importe donc body-parser
const bodyParser = require('body-parser');
// On importe mongoose pour pouvoir utiliser la base de données
const mongoose = require('mongoose');
// On importe mongooseConfig pour la gestion du mdp user mongoDB et de la clé pour le token
const mongooseConfig= require('./config/mongoose.config')
// On corrige le problème relatif à la dépréciation ('https://mongoosejs.com/docs/deprecations.html')
mongoose.set('useCreateIndex', true);
// On donne accès au chemin de notre système de fichier
const path = require('path');
// On importe la route dédiée aux sauces
const sauceRoutes = require('./routes/sauce');
// On importe la route dédiée aux utilisateurs
const userRoutes = require('./routes/user')

// L'un des avantages que nous avons à utiliser Mongoose pour gérer notre base de données MongoDB est que nous pouvons implémenter des schémas de données stricts, qui permettent de rendre notre application plus robuste
mongoose.connect(`mongodb+srv://${mongooseConfig.id}:${mongooseConfig.pwd}@cluster0-dgeac.mongodb.net/hottest?retryWrites=true&w=majority`,
{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// On utilise la méthode express
const app = express();

// Il faut ajouter des headers, des entêtes à l'objet réponse en ajoutant un middleware, C'est un middleware général, il n'y a pas de routes. Cela va permettre à l'application d'accéder à l'api
app.use((req, res, next) => {
    // On donne accès à toute origine (*)
    res.setHeader('Access-Control-Allow-Origin', '*');
    // On donne la possibilité d'utiliser certains headers sur l'objet réponse
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // On donne la possibilité d'utiliser les méthodes listées
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// On utilise une méthode body-parser transformation du corps de la requête en JSON, en objet JS utilisable
// Sachant que l'on va créer une requête post pour permettre à l'utilisateur de mettre en ligne une sauce sur la base d'un schéma créer dans Sauce.js il va falloir traiter les données associées à cette requête, autrement dit d'extraire l'objet JSON de la demande en provenance du frontend : on aura recours à body-parser. Il faut qu'elle soit soit formatée pour être utilisée
app.use(bodyParser.json());

// Va servir le dossier image
app.use('/images', express.static(path.join(__dirname, 'images')));

// Va servir les routes dédiées aux sauces
app.use('/api/sauces', sauceRoutes);

// Va servir les routes dédiées aux utilisateurs
app.use('/api/auth', userRoutes);

module.exports = app;