const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');

// Middleware to verify token
function auth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.sendStatus(403);
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Create Appointment with global time slot check
router.post('/', auth, async (req, res) => {
  const { date, time, service } = req.body; 

  try {
    const existing = await Appointment.findOne({ date, time });
    if (existing) return res.status(409).json({ error: 'Time slot already booked' });

    const appointment = new Appointment({ userId: req.user.id, date, time, service });
    await appointment.save();

    try {
      const user = await User.findById(req.user.id);
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Appointment Confirmation',
        text: `Hi ${user.name}, your appointment for "${service}" is confirmed on ${date} at ${time}.`
      });
    } catch (emailError) {
      console.error("Email sending failed:", emailError.message);
    }

    res.status(201).json(appointment);
  } catch (error) {
    console.error("Booking failed:", error.message);
    res.status(500).json({ error: 'Something went wrong while booking.' });
  }
});

// Get Appointments for the logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.user.id });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

// Cancel Appointment
router.delete('/:id', auth, async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Cancelled' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to cancel appointment' });
  }
});

// Reschedule Appointment with global time slot check
router.put('/:id', auth, async (req, res) => {
  const { date, time, service } = req.body; 

  try {
    const existing = await Appointment.findOne({ date, time });
    if (existing) return res.status(409).json({ error: 'Time slot already booked' });

    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      { date, time, service }, 
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to reschedule appointment' });
  }
});

module.exports = router;

