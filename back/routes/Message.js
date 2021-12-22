const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const messageCtrl = require('../controllers/Message');

router.get('/', messageCtrl.selectAllMessages);
router.post('/new', auth, messageCtrl.postMessage);

module.exports = router;