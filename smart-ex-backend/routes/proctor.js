const express = require('express');
const { detectSuspiciousActivity } = require('../middlewares/proctorMiddleware');
const router = express.Router();

router.post('/detect', detectSuspiciousActivity);

module.exports = router;
