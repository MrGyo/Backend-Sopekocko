// On prend toute la logique métier pour la déporter dans le fichier sauce.js de controllers, on ne garde que la logique de routing dans le fichier sauce.js du router. On importe aussi le model Sauce. 
// On a ajouté le controller sauce avec une constante sauceCtrl dans le fichier sauc.js du router.

// Récupération le modèle créé grâce à la fonction schéma de mongoose
const Sauce = require('../models/Sauce');
// Récupéation du file système
const fs = require('fs');

exports.createSauce = (req, res, next) => {
    // On va extraire l'objet JSON
    const sauceObject = JSON.parse(req.body.sauce);
    // On utilise sauceObject
    const sauce = new Sauce({
      ...sauceObject,
      // On modifie l'URL de l'image, on veut l'URL complète, quelque chose dynamique avec les segments de l'URL
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    // On enregistre grâce à la méthode save qui enregistre l'objet dans la base de données MongoDB
    sauce.save()
      // On envoi une réponse au frontend avec un statut 201 sinon on a une expiration de la requête
      .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
      // On ajoute un code erreur en cas de problème
      .catch(error => res.status(400).json({ error }));
  };

exports.modifySauce = (req, res, next) => {
    // On utilise l'opérateur ternaire pour savoir s'il existe on a un type d'objet sinon on a un autre type d'objet
    const sauceObject = req.file ?
        {
        // Si le fichier existe, on récupère avec JSON.parse et on génère une nouvelle image
        ...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
        .catch(error => res.status(400).json({ error }));
    };

exports.deleteSauce = (req, res, next) => {
    // Avant de suppr l'objet, on va le chercher pour obtenir l'url de l'image et supprimer le fichier image de la base
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
        // Pour extraire ce fichier, on récupère l'url de la sauce, et on le split autour de la chaine de caractères, donc le nom du fichier
        const filename = sauce.imageUrl.split('/images/')[1];
        // Avec ce nom de fichier, on appelle unlink pour suppr le fichier
        fs.unlink(`images/${filename}`, () => {
            Sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
            .catch(error => res.status(400).json({ error }));
        });
        })
        .catch(error => res.status(500).json({ error }));
    };

exports.getOneSauce = (req, res, next) => {
    // On utilise la méthode findOne et on lui passe l'objet de comparaison, on veut que l'id de la sauce soit le même que le paramètre de requête
    Sauce.findOne({ _id: req.params.id })
      // Si on on retourne une réponse et l'objet
      .then(sauce => res.status(200).json(sauce))
      // Si erreur on génère une erreur 404 pour dire qu'on ne trouve pas l'objet
      .catch(error => res.status(404).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
    // On utilise la méthode find pour obtenir la liste complète des sauces trouvées dans la base, l'array de toutes les sauves de la base de données
    Sauce.find()
    // Si OK on retourne un tableau de toutes les données
    .then(sauces => res.status(200).json(sauces))
    // Si erreur on retourne un message d'erreur
    .catch(error => res.status(400).json({ error }));
};

exports.addLikeDislike = (req, res, next) => {
    // Pour la route POST = Ajout/suppression d'un like / dislike à une sauce
    const like = req.body.like
    const user = req.body.userId
    const sauceId = req.params.id
    if (like === 1) { // Si il s'agit d'un like
      Sauce.updateOne(
        { _id: sauceId },
        {
          $push: { usersLiked: user },
          $inc: { likes: like },
        }
      )
        .then(() => res.status(200).json({ message: 'Like ajouté !' }))
        .catch((error) => res.status(400).json({ error }))
    }
    if (like === -1) {
      Sauce.updateOne( // Si il s'agit d'un dislike
        { _id: sauceId },
        { // cf commande mongoose pour modification sur une variable, push tu rajoutes user id et inc (incrémentation) ça fait +1
          $push: { usersDisliked: user },
          $inc: { dislikes: -like },
        }
      )
        .then(() => {
          res.status(200).json({ message: 'Dislike ajouté !' })
        })
        .catch((error) => res.status(400).json({ error }))
    }
    if (like === 0) { // Si il s'agit d'annuler un like ou un dislike
      Sauce.findOne({ _id: sauceId })
        .then((sauce) => {
          if (sauce.usersLiked.includes(user)) { // Si il s'agit d'annuler un like
            Sauce.updateOne(
              { _id: sauceId },
              {
                $pull: { usersLiked: user },
                $inc: { likes: -1 },
              }
            )
              .then(() => res.status(200).json({ message: 'Like retiré !' }))
              .catch((error) => res.status(400).json({ error }))
          }
          if (sauce.usersDisliked.includes(user)) { // Si il s'agit d'annuler un dislike
            Sauce.updateOne(
              { _id: sauceId },
              {
                $pull: { usersDisliked: user },
                $inc: { dislikes: -1 },
              }
            )
              .then(() => res.status(200).json({ message: 'Dislike retiré !' }))
              .catch((error) => res.status(400).json({ error }))
          }
        })
        .catch((error) => res.status(404).json({ error }))
    }
  }