const express = require('express');
const { billing } = require('../controllers/billing');
const router = express.Router();

router.post("/purchase", billing);

module.exports = router;