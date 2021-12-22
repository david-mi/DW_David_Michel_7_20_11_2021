const express = require('express');
const router = express.Router();

const superAdminCtrl = require('../controllers/SuperAdmin');

router.post('/delmessages', superAdminCtrl.deleteAllMessage);
router.post('/delusers', superAdminCtrl.deleteAllUsers);

module.exports = router;