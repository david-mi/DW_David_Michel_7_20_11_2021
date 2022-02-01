const express = require('express');
const router = express.Router();
const likesCtrl = require('../controllers/Likes');

router.post('/:id/like', likesCtrl.likeMessage);

module.exports = router;