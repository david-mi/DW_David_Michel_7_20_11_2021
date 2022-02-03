const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const registerSchema = require('../middlewares/YupValidation/registerSchema');
const loginSchema = require('../middlewares/YupValidation/loginSchema');
const profileSchema = require('../middlewares/YupValidation/profileSchema');
const userIdCompare = require('../middlewares/userIdCompare');
const userCtrl = require('../controllers/User');
const multer = require('../middlewares/multer');

router.get('/users/:id', userCtrl.showProfile);
router.post('/signup', registerSchema, userCtrl.signup);
router.post('/login', loginSchema, userCtrl.login);
router.put('/users/:id', auth, userIdCompare, multer, profileSchema, userCtrl.updateProfile);
router.delete('/users/:id', auth, userIdCompare, userCtrl.deleteOneUser);

module.exports = router;