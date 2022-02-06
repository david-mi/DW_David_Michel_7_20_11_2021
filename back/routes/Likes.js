const express = require('express');
const router = express.Router();
const likesCtrl = require('../controllers/Likes');
const auth = require('../middlewares/auth');

router.post('/:id/like', auth, likesCtrl.likeMessage);
router.get('/likes/all', likesCtrl.showAllLikes);
module.exports = router;