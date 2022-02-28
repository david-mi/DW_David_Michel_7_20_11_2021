
<p  align="center"><img  src="front\public\images\logos\logo-for-gihub.png"></p>

# Installation du Projet 7 - Groupomania (à faire dans l'ordre)

## Backend

- Retirer l'extension .example sur le .env situé à la racine du dossier back

- Dans ce même fichier, mettez vos informations MySQL dans les champs DB_USERNAME (nom d'utilisateur MySQL) et DB_PW (mot de passe MySQL). 

Pour les champs ADMIN_MAIL (email de l'administrateur) ET ADMIN_PW (mot de passe de l'administrateur) vous pouvez laisser les valeurs proposées par défaut ou alors mettre vos propres valeurs en respectant les conditions données dans le .env

- Se positionner dans le dossier back et exécuter la commande **`npm i`** pour y installer les dépendances et exécuter la commande **`npm run db-init`** qui aura pour effet de lancer les 3 commandes suivantes:

| nom|rôle  |
|--|--|
| npx sequelize db:drop| supprimer la base de donnée si elle existe déjà  
| npx sequelize db:create |  créer la base de donnée MyqSQL 
| npx sequelize db:migrate | effectuer la migration des tables
| npx sequelize db:seed:all | injecter un compte administrateur dans la base de donnée

- Exécuter la commande npm start afin de lancer le serveur backend

## Frontend

- Retirer l'extension .example sur le .env situé à la racine du dossier front
- Se positionner dans le dossier front et exécuter la commande **`npm i`** pour y installer les dépendances et exécuter ensuite la commande **`npm start`** afin de lancer le serveur front. Il devrait démarrer sur le port 3001