const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/Comment');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer');
const commentSchema = require('../middlewares/YupValidation/commentSchema');

router.get('/:messageid/comment/', auth, commentCtrl.getCommentByMessageId);

router.put('/:messageid/comment/:commentid', auth, multer, commentSchema, commentCtrl.editComment);

router.post('/:id/comment/new', auth, multer, commentSchema, commentCtrl.postComment);

router.delete('/:messageid/comment/:commentid', auth, commentCtrl.deleteComment);

module.exports = router;