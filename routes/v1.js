var express = require('express');
var router = express.Router();

const playerController = require('../controller/players.controller');

router.post('/registerUmpire', playerController.registerumpire);
router.post('/registerPlayer', playerController.registerPlayer);
router.post('/login', playerController.login);
router.get('/getCurrentUser', playerController.currentUser);

module.exports = router;