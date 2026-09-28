const express = require('express');
const { generateWebsiteDemo, generateWebsite } = require('../controllers/website');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post("/generateDemo", generateWebsiteDemo);
router.post("/generate", auth, generateWebsite);

module.exports = router;