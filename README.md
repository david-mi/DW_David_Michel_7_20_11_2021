<p align="center">
<img src="front\public\images\logos\logo-for-gihub.png">
</p>

# Installation du Projet 7 - Groupomania (à faire dans l'ordre)

## Backend

- Retirer l'extension .example sur le .env situé à la racine du dossier back
- Mettez vos valeurs personnelles dans les champs DB_USERNAME et DB_PW
- Mettez les valeurs ADMIN_MAIL ET ADMIN_PW fournies à la racine du .zip
- Se  positionner dans le dossier backend via un terminal et rentrer la commande **npm i** pour y installer les dépendances
- rentrer la commande **`npx sequelize db:create`** qui va créer la base de donnée
- rentrer la commande **`npx sequelize db:migrate`** qui va configurer la base de donnée
- rentrer la commande **`npx sequelize db:seed:all`** qui va ajouter un administrateur préconfiguré dans dans la base de donnée
- rentrer la commande **`node server`** afin de lancer le serveur

## Frontend

- Se positionner dans le dossier front via un terminal et rentrer la commande **`npm i`** pour y installer les dépendances
- Rentrer le commande **npm start**  afin de lancer le projet React