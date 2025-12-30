const express = require('express');
const { getEvents, getEventById, createEvent } = require('../controllers/eventController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(getEvents).post(protect, admin, createEvent);
router.route('/:id').get(getEventById);

module.exports = router;