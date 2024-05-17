const express = require('express');
const convertAndSend = require('../controllers/convertAndSendController');
const router = express.Router();

router.post('/convertandsend', convertAndSend);

module.exports = router;
