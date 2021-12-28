const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const validPw = require('../middlewares/validPassword');
const userIdCompare = require('../middlewares/userIdCompare');
const userCtrl = require('../controllers/User');

router.get('/users/:id', userCtrl.showProfile);
router.post('/signup', validPw, userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/users/:id', auth, userIdCompare, userCtrl.updateProfile);

module.exports = router;