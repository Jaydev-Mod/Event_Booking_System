const Event = require('../models/eventModel');

// @desc    Fetch all events
// @route   GET /api/events
// @access  Public
const getEvents = async (req, res) => {
  const events = await Event.find({});
  res.json(events);
};

// @desc    Fetch single event
// @route   GET /api/events/:id
// @access  Public
const getEventById = async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (event) {
    res.json(event);
  } else {
    res.status(404).json({ message: 'Event not found' });
  }
};

// @desc    Create an event
// @route   POST /api/events
// @access  Public (We will make this Admin only later)
const createEvent = async (req, res) => {
  const { title, description, date, time, location, price, totalSeats, image } = req.body;

  const event = new Event({
    title,
    description,
    date,
    time,
    location,
    price,
    totalSeats,
    availableSeats: totalSeats,
    image, 
  });

  const createdEvent = await event.save();
  res.status(201).json(createdEvent);
};

module.exports = { getEvents, getEventById, createEvent };