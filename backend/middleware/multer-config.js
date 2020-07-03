// On importe multer
const multer = require('multer');

// On prépare les extensions de fichiers images
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// On crée un objet de configuration
// On va enregistrer sur le disque
const storage = multer.diskStorage({
  // On donne la destination d'enregistrement des fichiers
  destination: (req, file, callback) => {
    // On passe le dossier images qu'on a créé dans le backend
    callback(null, 'images');
  },
  // On explique à multer quel nom de fichier on utilise
  filename: (req, file, callback) => {
    // On génère le nouveau nom avec le nom d'origine, on supprime les espaces (white space avec split) et on insère des underscores à la place
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    // On appelle le callback, on passe null pour dire qu'il n'y a pas d'erreur, et on crée le filename en entier, on ajoute un timestamp, un point et enfin l'extension du fichier
    callback(null, name + Date.now() + '.' + extension);
  }
});

// On export notre module, on lui passe l'objet storage, la méthode single pour dire que c'est un fichier unique et on précise que c'est une image
module.exports = multer({storage: storage}).single('image');