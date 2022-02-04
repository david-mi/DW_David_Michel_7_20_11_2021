const shortId = require('shortid');
const multer = require('multer');

const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    if (req.route.path === '/users/:id') cb(null, 'images/user');
    if (req.route.path === "/posts/:id") cb(null, 'images/user');
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