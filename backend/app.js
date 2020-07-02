// On importe express
const express = require('express');
// Pour rendre le corps de la requête plus facilement exploitable on va utilsier body-parser, on le transforme en objet JSON
const bodyParser = require('body-parser');
// On importe mongoose pour pouvoir utiliser la base de données
const mongoose = require('mongoose');
const mongooseConfig= require('./config/mongoose.config')
// On donne accès au chemin de notre système de fichier
const path = require('path');
// On importe nos routeurs
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user')

// L'un des avantages que nous avons à utiliser Mongoose pour gérer notre base de données MongoDB est que nous pouvons implémenter des schémas de données stricts, qui permettent de rendre notre application plus robuste. Commençons par créer un schéma Thing (« chose ») pour tout objet mis en vente dans notre application.
mongoose.connect(`mongodb+srv://${mongooseConfig.id}:${mongooseConfig.pwd}@cluster0-dgeac.mongodb.net/hottest?retryWrites=true&w=majority`,
{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

// Il faut ajouter des headers, des entêtes à l'objet réponse en ajoutant un middleware, c'est le premier
// Cela va permettre à l'application d'accéder à l'api
app.use((req, res, next) => {
    // On donne accès  à toute origine (*)
    res.setHeader('Access-Control-Allow-Origin', '*');
    // On donne la possibilité d'utiliser des headers sur l'objet réponse
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // On donne la possibilité d'utiliser les actions listées (GET, PUT...)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// On utilise une méthode body-parser transformation du corps de la requête en JSON, en objet JS utilisable
app.use(bodyParser.json());

// Va servir le dossier image
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;