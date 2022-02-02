const shortId = require('shortid');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'userPicture') cb(null, 'images/user');
    if (file.fieldname === 'postPicture') cb(null, 'images/post');
  },
  filename: (req, file, cb) => {
    const ext = '.' + file.mimetype.split('/')[1];
    const name = shortId.generate() + ext;
    cb(null, name);
  }
});

module.exports = multer({ storage }).fields([
  { name: 'userPicture', maxCount: 1 },
  { name: 'postPicture', maxCount: 1 }
]);