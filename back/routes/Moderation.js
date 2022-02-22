const express = require('express');
const router = express.Router();

const AdminCtrl = require('../controllers/Moderation');
const messageCtrl = require('../controllers/Message');
const commentCtrl = require('../controllers/Comment');
const checkAdmin = require('../middlewares/checkAdmin');
const checkMod = require('../middlewares/checkMod');
const userCtrl = require('../controllers/User');
const auth = require('../middlewares/auth');

router.post('/admin/users/:id/setmod', auth, checkAdmin, AdminCtrl.setModerator);
router.post('/admin/users/:id/removemod', auth, checkAdmin, AdminCtrl.removeModerator);

router.delete('/admin/users/:id/delete', auth, checkAdmin, userCtrl.deleteOneUser);
router.delete('/messages/:id/delete', auth, checkMod, messageCtrl.deleteMessage);
router.delete('/comments/:id/delete', auth, checkMod, commentCtrl.deleteComment);

module.exports = router;