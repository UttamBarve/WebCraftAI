const express = require('express');
const { generateWebsiteDemo, generateWebsite, getWebsiteById, getAllWebsites, updateWebsite, saveWebsiteCode } = require('../controllers/website');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post("/generateDemo", generateWebsiteDemo);
router.post("/generateWebsite", auth, generateWebsite);
router.get('/getWebsite/:id', auth, getWebsiteById)
router.post("/updateWebsite/:id", auth, updateWebsite);
router.get("/getAllWebsites", auth, getAllWebsites);
router.put("/saveWebsiteCode/:id", auth, saveWebsiteCode);

module.exports = router;