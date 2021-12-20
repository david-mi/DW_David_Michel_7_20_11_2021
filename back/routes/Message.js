const express = require('express');
const router = express.Router();

const messageCtrl = require('../controllers/Message');

router.post('/new', messageCtrl.postMessage);

module.exports = router;