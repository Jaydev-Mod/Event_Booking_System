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
  const { title, description, category, date, time, location, price, totalSeats, image } = req.body;

  const event = new Event({
    title,
    description,
    category,
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

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private/Admin
const deleteEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (event) {
    await event.deleteOne();
    res.json({ message: 'Event removed' });
  } else {
    res.status(404).json({ message: 'Event not found' });
  }
};

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private/Admin
const updateEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (event) {
    event.title = req.body.title || event.title;
    event.description = req.body.description || event.description;
    event.category = req.body.category || event.category;
    event.date = req.body.date || event.date;
    event.time = req.body.time || event.time;
    event.location = req.body.location || event.location;
    event.price = req.body.price || event.price;
    event.totalSeats = req.body.totalSeats || event.totalSeats;
    event.image = req.body.image || event.image;

    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } else {
    res.status(404).json({ message: 'Event not found' });
  }
};

module.exports = { getEvents, getEventById, createEvent, deleteEvent, updateEvent };