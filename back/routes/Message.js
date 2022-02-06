const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const idMsgCompare = require('../middlewares/idMsgCompare');
const messageCtrl = require('../controllers/Message');
const multer = require('../middlewares/multer');
const postSchema = require('../middlewares/YupValidation/postSchema');


router.get('/all', auth, messageCtrl.getAllMessages);
router.get('/', auth, messageCtrl.getUserMessages);
router.get('/:id', messageCtrl.getUserMessagesById);
router.post('/new', auth, multer, postSchema, messageCtrl.postMessage);
router.delete('/:id', auth, idMsgCompare, messageCtrl.deleteMessage);
router.delete('/:id/delimg', auth, idMsgCompare, messageCtrl.deleteMessageImage);
router.put('/:id', auth, idMsgCompare, multer, postSchema, messageCtrl.editMessage);

module.exports = router;