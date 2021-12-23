const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const userIdCompare = require('../middlewares/userIdCompare');
const messageCtrl = require('../controllers/Message');

router.get('/', messageCtrl.selectAllMessages);
router.post('/new', auth, messageCtrl.postMessage);
router.delete('/:id', auth, userIdCompare, messageCtrl.deleteMessage);

module.exports = router;