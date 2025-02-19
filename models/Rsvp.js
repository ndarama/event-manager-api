// models/Rsvp.js
const mongoose = require('mongoose');

const RsvpSchema = new mongoose.Schema({
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['Confirmed', 'Maybe', 'Not Confirmed'], required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Rsvp', RsvpSchema);