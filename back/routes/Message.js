// LIBRARIES
const express = require('express');
const router = express.Router();

// MIDDLEWARES
const auth = require('../middlewares/auth');
const idMsgCompare = require('../middlewares/idMsgCompare');
const multer = require('../middlewares/multer');
const postSchema = require('../middlewares/YupValidation/messageSchema');

// CONTROLLERS
const messageCtrl = require('../controllers/Message');
const messageVote = require('../controllers/MessageVote');

router.get('/all', auth, messageCtrl.getAllMessages);

router.post('/new', auth, multer, postSchema, messageCtrl.postMessage);
router.post('/:id/dislike', auth, messageVote.dislikeMessage);
router.post('/:id/like', auth, messageVote.likeMessage);

router.delete('/:id', auth, idMsgCompare, messageCtrl.deleteMessage);
router.delete('/:id/delimg', auth, idMsgCompare, messageCtrl.deleteMessageImage);

router.put('/:id', auth, idMsgCompare, multer, postSchema, messageCtrl.editMessage);

module.exports = router;