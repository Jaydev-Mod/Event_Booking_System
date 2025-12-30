const Booking = require('../models/bookingModel');
const Event = require('../models/eventModel');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
  const { eventId, numberOfTickets } = req.body;

  const event = await Event.findById(eventId);

  if (event) {
    const totalAmount = event.price * numberOfTickets;

    if (event.availableSeats < numberOfTickets) {
      return res.status(400).json({ message: 'Not enough seats available' });
    }

    const booking = new Booking({
      user: req.user._id,
      event: eventId,
      numberOfTickets,
      totalAmount,
    });

    event.availableSeats = event.availableSeats - numberOfTickets;
    await event.save();

    const createdBooking = await booking.save();
    res.status(201).json(createdBooking);
  } else {
    res.status(404).json({ message: 'Event not found' });
  }
};

// @desc    Get logged in user's bookings
// @route   GET /api/bookings/mybookings
// @access  Private
const getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).populate('event');
  res.json(bookings);
};

module.exports = { createBooking, getMyBookings };