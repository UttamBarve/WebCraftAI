const express = require('express');
const { generateWebsiteDemo } = require('../controllers/website');

const router = express.Router();

router.get("/generateDemo", generateWebsiteDemo);

module.exports = router;