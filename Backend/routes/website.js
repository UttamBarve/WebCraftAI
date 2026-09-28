const express = require('express');
const { generateWebsiteDemo, generateWebsite } = require('../controllers/website');

const router = express.Router();

router.get("/generateDemo", generateWebsiteDemo);
router.get("/generate", generateWebsite);

module.exports = router;