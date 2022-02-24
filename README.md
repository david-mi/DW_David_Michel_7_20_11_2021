<p align="center">
<img src="front\public\images\logos\logo-for-gihub.png">
</p>

# Installation du Projet 7 - Groupomania

## Backend

- Copier le .env fourni à la racine du .zip et le mettre dans le dossier back
- Ajouter les valeurs correspondantes à vos informations de connexion mysql dans le fichier .env (DB_PW et DB_USERNAME)
- Se  positionner dans le dossier backend via un terminal et rentrer la commande **npm i** pour y installer les dépendances
- rentrer la commande **`npx sequelize db:create`** qui va créer la base de donnée
- rentrer la commande **`npx sequelize db:migrate`** qui va configurer la base de donnée
- rentrer la commande **`npx sequelize db:seed:all`** qui va ajouter un administrateur préconfiguré dans dans la base de donnée
- rentrer la commande **`node server`** afin de lancer le serveur

## Frontend

- Se positionner dans le dossier front via un terminal et rentrer la commande **`npm i`** pour y installer les dépendances
- Rentrer le commande **npm start**  afin de lancer le projet React