const shortId = require('shortid');
const multer = require('multer');

const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    console.log(file);
    console.log(req.route.path);
    if (req.route.path === '/users/:id/profileupdate') cb(null, 'images/user');
    if (req.route.path === '/new' || req.route.path === '/:id') {
      console.log('bonne route');
      cb(null, 'images/post');
    }
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

  limits: { fileSize: 2097152 },

  storage

}).single('image');


module.exports = upload;