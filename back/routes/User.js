const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const validPw = require('../middlewares/validPassword');

const userCtrl = require('../controllers/User');

router.get('/users', userCtrl.selectAllUsers);
router.post('/users/:id', userCtrl.selectOneUser);
router.post('/signup', validPw, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;