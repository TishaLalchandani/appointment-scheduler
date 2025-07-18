const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: String,
  time: String,
  service: String, 
  status: { type: String, default: 'booked' }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
