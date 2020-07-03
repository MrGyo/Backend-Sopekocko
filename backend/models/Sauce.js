const mongoose = require('mongoose');

// Le shéma mongoose doit refléter les différents champs attendus par le backend 
// On utilise la fonction schéma mis à disposition par mongoose et on va créer un objet schéma. L'id est généré automatiquement par MongoDB
const sauceSchema = mongoose.Schema({
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    heat: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    mainPepper: { type: String, required: true },
    userId: { type: String, required: true },
    usersLiked: { type: [String] },
    usersDisliked: { type: [String] },
    likes: { type: Number, default:0},
    dislikes: { type: Number, default:0 },
  });

// On exporte ce shéma afin de pouvoir utiliser le modèle terminé, avec ce code simple, on a un shéma de données et on peut l'exporter, on va donc pouvoir utiliser ce modèle pour intéragir avec l'application
module.exports = mongoose.model('Sauce', sauceSchema);

