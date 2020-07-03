// Middleware qui protégera les routes sélectionnées et vérifier que l'utilisateur est authentifié avant d'autoriser l'envoi de ses requêtes.

// On récupère le package jsonwebtoken
const jwt = require('jsonwebtoken');
// Récupération de la clef pour le TOKEN
const config = require('../config/auth.config') 

module.exports = (req, res, next) => {
  try {
    // On récupère le token dans le header autorisation, on utilise le header authorisation de la requête, on récupère uniquement le deuxième élément du tableau (car split)
    const token = req.headers.authorization.split(' ')[1];
    // On décode le token grâce à la fonction verify et on vérifie le token en mettant la clé secrète, les clés doivent correspondre
    const decodedToken = jwt.verify(token, config.secret);
    // On récupère le userID
    const userId = decodedToken.userId;
    // Si on a un user ID dans le corps de la requête et qu'il est différent du userID on dit que c'est invalid sinon next()
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({ error: new Error('Invalid request!') });
  }
};