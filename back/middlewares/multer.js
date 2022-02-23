const shortId = require('shortid');
const multer = require('multer');

const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    const pathRoute = req.route.path;
    // on définit dans quel dossier seront stocké les images selon l'enpoint de la requête
    if (pathRoute === '/users/:id/profileupdate') cb(null, 'images/user');
    if (pathRoute === '/new' || pathRoute === '/:id') cb(null, 'images/post');
    if (pathRoute === '/messages/:id/comments/new' || pathRoute == '/comments/:id') cb(null, 'images/comment');
  },

  filename: (req, file, cb) => {
    // on récupère l'extension de notre image
    const ext = file.mimetype.split('/')[1];
    /* on génère une petite id aléatoire à l'aide de la librairie 
    shortid qu'on va utiliser pour construire le nom de notre image*/
    const name = shortId.generate() + '.' + ext;
    cb(null, name);
  }
});

const upload = multer({

  fileFilter: (req, file, cb) => {
    /* on récupère l'extension de notre image et 
    on applique une regex pour définir les extensions que l'on souhaite
    accepter au sein du middleware */
    const ext = file.mimetype.split('/')[1];
    const regExt = /^png|jpe?g|webp|gif$/;
    if (regExt.test(ext)) cb(null, true);
    if (!regExt.test(ext)) cb(({ message: "Type de fichier non accepté" }));
  },

  // on impose une limite de taille à l'image de 3mo
  limits: { fileSize: 3145728 },

  storage,
  // image sera le champ dédié aux fichiers images dans le formData
}).single('image');


module.exports = (req, res, next) => {
  upload(req, res, (err) => err
    ? res.status(400).json(err)
    : next());
};
