const express = require('express');
const router = express.Router();
const likesCtrl = require('../controllers/Likes');
const auth = require('../middlewares/auth');

router.post('/:id/like', auth, likesCtrl.likeMessage);
router.post('/:id/dislike', auth, likesCtrl.dislikeMessage);
router.get('/likes/all', auth, likesCtrl.showAllLikes);
module.exports = router;