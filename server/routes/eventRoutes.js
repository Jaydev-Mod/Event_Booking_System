const express = require('express');
const { getEvents, getEventById, createEvent, deleteEvent, updateEvent } = require('../controllers/eventController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(getEvents).post(protect, admin, createEvent);
router.route('/:id').get(getEventById).delete(protect, admin, deleteEvent).put(protect, admin, updateEvent);

module.exports = router;