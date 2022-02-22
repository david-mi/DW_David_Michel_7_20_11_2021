// LIBRARIES
const express = require('express');
const router = express.Router();

// MIDDLEWARES
const auth = require('../middlewares/auth');
const registerSchema = require('../middlewares/YupValidation/registerSchema');
const loginSchema = require('../middlewares/YupValidation/loginSchema');
const userValid = require('../middlewares/YupValidation/userSchema');
const userIdCompare = require('../middlewares/userIdCompare');
const multer = require('../middlewares/multer');

// CONTROLLERS
const userCtrl = require('../controllers/User');


router.get('/users', auth, userCtrl.getAllUsers);
router.get('/users/:id/profile', auth, userIdCompare, userCtrl.showProfile);
router.get('/users/:id', auth, userCtrl.showProfile);

router.post('/signup', registerSchema, userCtrl.signup);
router.post('/login', loginSchema, userCtrl.login);

router.put('/users/:id/emailupdate', auth, userIdCompare, userValid, userCtrl.mailUpdate);
router.put('/users/:id/pwupdate', auth, userIdCompare, userValid, userCtrl.passwordUpdate);
router.put('/users/:id/profileupdate', auth, userIdCompare, multer, userValid, userCtrl.updateProfile);

router.delete('/users/:id', auth, userIdCompare, userCtrl.deleteOneUser);
router.delete('/users/:id/delimg', auth, userIdCompare, userCtrl.deleteUserImage);

module.exports = router;