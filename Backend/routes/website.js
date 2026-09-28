const express = require('express');
const { generateWebsiteDemo, generateWebsite } = require('../controllers/website');

const router = express.Router();

router.post("/generateDemo", generateWebsiteDemo);
router.post("/generate", generateWebsite);

module.exports = router;