const express = require('express');
const router = express.Router();

const superAdminCtrl = require('../controllers/SuperAdmin');

router.delete('/delmessages', superAdminCtrl.deleteAllMessage);
router.delete('/delusers', superAdminCtrl.deleteAllUsers);
router.get('/getAllMessages', superAdminCtrl.getMessages);
router.get('/getAllUsers', superAdminCtrl.getAllUsers);

module.exports = router;