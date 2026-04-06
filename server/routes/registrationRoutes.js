const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const registrationController = require('../controllers/registrationController');

router.post('/', protect, registrationController.registerForEvent);
router.get('/', protect, registrationController.getUserRegistrations);

module.exports = router;
