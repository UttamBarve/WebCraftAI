const express = require('express');
const {logIn, logOut} = require('../controllers/auth');

const router = express.Router();

router.post('/login', logIn);

router.post('/logout', logOut);

module.exports = router;