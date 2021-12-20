const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const userCtrl = require('../controllers/User');

router.get('/users', auth, userCtrl.selectAllUsers);
router.post('/users', userCtrl.selectOneUser);
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;