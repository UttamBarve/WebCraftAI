const express = require('express');
const { generateWebsiteDemo, generateWebsite, getWebsiteById } = require('../controllers/website');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post("/generateDemo", generateWebsiteDemo);
router.post("/generate", auth, generateWebsite);
router.get('/getWebsite/:id', auth, getWebsiteById)

module.exports = router;