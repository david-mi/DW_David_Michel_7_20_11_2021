const shortId = require('shortid');
const multer = require('multer');

const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    const pathRoute = req.route.path;
    if (pathRoute === '/users/:id/profileupdate') cb(null, 'images/user');
    if (pathRoute === '/new' || pathRoute === '/:id') cb(null, 'images/post');
    if (pathRoute === '/messages/:id/comments/new' || pathRoute == '/comments/:id') cb(null, 'images/comment');
  },

  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    const name = shortId.generate() + '.' + ext;
    cb(null, name);
  }
});

const upload = multer({

  fileFilter: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    const regExt = /^png|jpe?g|svg|webp|gif$/;
    if (regExt.test(ext)) cb(null, true);
    if (!regExt.test(ext)) cb(new Error("Type de fichier non accepté"));
  },

  limits: { fileSize: 3145728 },

  storage

}).single('image');


module.exports = upload;