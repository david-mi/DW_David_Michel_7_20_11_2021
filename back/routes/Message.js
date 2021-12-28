const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const idMsgCompare = require('../middlewares/idMsgCompare');
const messageCtrl = require('../controllers/Message');

router.get('/', messageCtrl.getUserMessages);
router.post('/new', auth, messageCtrl.postMessage);
router.delete('/:id', auth, idMsgCompare, messageCtrl.deleteMessage);
router.put('/:id', auth, idMsgCompare, messageCtrl.editMessage);

module.exports = router;