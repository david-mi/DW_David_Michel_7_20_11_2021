<p align="center">
<img src="front\public\images\logos\logo-for-gihub.png">
</p>

# Installation du Projet 7 - Groupomania (à faire dans l'ordre)

## Backend

- Retirer l'extension .example sur le .env situé à la racine du dossier back
- Mettez vos valeurs personnelles dans les champs DB_USERNAME et DB_PW
- Mettez les valeurs ADMIN_MAIL ET ADMIN_PW fournies à la racine du .zip
- Se positionner dans le dossier backend et rentrer la commande **`npm i`** pour y installer les dépendances
- Dans ce même dossier, exécuter la commande **`npm run init-database`** qui aura pour effet de lancer les 4 commandes suivantes: npx sequelize db:drop pour supprimer la base de donnée si elle existe déjà npx sequelize db:create pour créer la base de donnée mysql, npx sequelize db:migrate afin d'effectuer la migration des tables et npx sequelize db:seed:all afin d'injecter le compte administrateur
- rentrer la commande **`node server`** afin de lancer le serveur

## Frontend

- Se positionner dans le dossier front via un terminal et rentrer la commande **`npm i`** pour y installer les dépendances
- Rentrer le commande **npm start**  afin de lancer le projet React