const express = require('express');
const {logIn, logOut} = require('../controllers/auth');

const router = express.Router();

router.post('/login', logIn);

router.get('/logout', logOut);

module.exports = router;