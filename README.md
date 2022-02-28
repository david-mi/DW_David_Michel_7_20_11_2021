
<p  align="center"><img  src="front\public\images\logos\logo-for-gihub.png"></p>

# Installation du Projet 7 - Groupomania (à faire dans l'ordre)

## Backend

- Retirer l'extension .example sur le .env situé à la racine du dossier back

- Mettez vos informations Mysql dans les champs DB_USERNAME et DB_PW

- Laissez les valeurs ADMIN_MAIL ET ADMIN_PW fournies proposées pour le compte administrateur ou alors mettez des valeurs personnalisées en respectant les conditions mises dans le .env

- Se positionner dans le dossier backend et rentrer la commande **`npm i`** pour y installer les dépendances

- Dans ce même dossier, exécuter la commande **`npm run init-database`** qui aura pour effet de lancer les 3 commandes suivantes:

| nom|rôle  |
|--|--|
| npx sequelize db:drop| supprimer la base de donnée si elle existe déjà  
| npx sequelize db:create |  créer la base de donnée mysql 
| npx sequelize db:migrate | effectuer la migration des tables
| npx sequelize db:seed:all | injecter un compte administrateur dans la base de donnée

- exécuter la commande npm start afin de lancer le serveur

## Frontend

- Se positionner dans le dossier front via un terminal et rentrer la commande **`npm i`** pour y installer les dépendances

- Rentrer le commande **npm start** afin de lancer le projet React