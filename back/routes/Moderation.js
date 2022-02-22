// LIBRAIRIES
const express = require('express');
const router = express.Router();

// MIDDLEWARES
const checkAdmin = require('../middlewares/checkAdmin');
const checkMod = require('../middlewares/checkMod');
const auth = require('../middlewares/auth');

// CONTROLLERS
const userCtrl = require('../controllers/User');
const messageCtrl = require('../controllers/Message');
const commentCtrl = require('../controllers/Comment');
const moderationCtrl = require('../controllers/Moderation');

router.post('/admin/users/:id/setmod', auth, checkAdmin, moderationCtrl.setModerator);
router.post('/admin/users/:id/removemod', auth, checkAdmin, moderationCtrl.removeModerator);

router.delete('/admin/users/:id/delete', auth, checkAdmin, userCtrl.deleteOneUser);
router.delete('/messages/:id/delete', auth, checkMod, messageCtrl.deleteMessage);
router.delete('/comments/:id/delete', auth, checkMod, commentCtrl.deleteComment);

module.exports = router;