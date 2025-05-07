// routes/registrationRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const registrationController = require('../controllers/registrationController');

router.post('/', authMiddleware.protect, registrationController.registerForEvent);
router.get('/', authMiddleware.protect, registrationController.getUserRegistrations);
module.exports = router;