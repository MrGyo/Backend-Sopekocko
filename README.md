# OC - Parcours Développeur Web - Projet 6

## Construisez une API sécurisée pour une application d'avis gastronomiques

Vous êtes développeur backend freelance et vous travaillez depuis quelques années sur des projets web pour des startups ou des grandes entreprises. La semaine dernière, vous avez reçu un mail vous proposant un nouveau projet. La marque So Pekocko, qui crée des sauces piquantes, connaît un franc succès, en partie grâce à sa chaîne de vidéos YouTube “La piquante”.

L’entreprise souhaite désormais développer une application d’évaluation de ses sauces piquantes, appelée “Piquante”.

Même si l’application deviendra peut-être un magasin en ligne dans un futur proche, Sophie, la product owner de So Pekocko, a décidé que le MVP du projet sera une application web permettant aux utilisateurs d’ajouter leurs sauces préférées et de liker ou disliker les sauces ajoutées par les autres utilisateurs.

## Technologies utilisées

* NodeJS
* Express
* MongoDB
* Mongoose

## Documentation

* [Note de cadrage](https://github.com/MrGyo/p6/blob/master/documentation/P6_Note%20de%20cadrage%20So%20Pekocko_V3.pdf)
* [Guidelines API](https://github.com/MrGyo/p6/blob/master/documentation/Guidelines%2BAPI.pdf)

## Compétences évaluées 

* Implémenter un modèle logique de données conformément à la réglementation
* Stocker des données de manière sécurisée
* Mettre en œuvre des opérations CRUD de manière sécurisée

## Résultats

Dans le cadre de ce projet, seule la partie backend a été réalisée. 

Créer un fichier "auth.config.js" dans le dossier 'config' et saisir une clé secrète : 

```javascript
module.exports = {
  secret: "(key)"
}
```

Installer toutes les dépendances nécessaires qui se trouvent dans le fichier package.json en utilisant la commande suivante : 

```
npm install
```

Une fois les dépendances installées, lancer le serveur : 

```
nodemon server
```

La partie frontend est fournie par OpenClassrooms.
La procédure à suivre est disponible dans les spécifications du projet. Toutefois un soucis avec SASS nécessite de procéder à une installation spécifique : 

```
npm install node-sass
```
Une fois node sass installé (+ suivi de la procédure dédié au frontend) : 

```
ng serve
```
Puis ouvrez votre navigateur sur [localhost:4200](http://localhost:4200/)

Synthèse

Le document de présentation est disponible [ICI](https://github.com/MrGyo/p6/blob/master/soutenance/SOUTENANCE_P6_WEBDEV_20200720_2.pptx)
