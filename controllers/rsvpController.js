// controllers/rsvpController.js
const Rsvp = require('../models/Rsvp');
const { validationResult } = require('express-validator');

// Get all RSVPs
const getRsvps = async (req, res) => {
    try {
        const rsvps = await Rsvp.find().populate('eventId userId', '-password');
        res.json(rsvps);
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};

// Create an RSVP
const createRsvp = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { eventId, userId, status } = req.body;
        const rsvp = new Rsvp({ eventId, userId, status });
        await rsvp.save();
        res.status(201).json({ msg: 'RSVP submitted successfully', rsvp });
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};

// Update an RSVP
const updateRsvp = async (req, res) => {
    try {
        let rsvp = await Rsvp.findById(req.params.id);
        if (!rsvp) return res.status(404).json({ msg: 'RSVP not found' });
        
        rsvp.status = req.body.status || rsvp.status;
        await rsvp.save();
        res.json({ msg: 'RSVP updated successfully', rsvp });
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};

// Delete an RSVP
const deleteRsvp = async (req, res) => {
    try {
        let rsvp = await Rsvp.findById(req.params.id);
        if (!rsvp) return res.status(404).json({ msg: 'RSVP not found' });
        
        await Rsvp.findByIdAndDelete(req.params.id);
        res.json({ msg: 'RSVP deleted successfully' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};

module.exports = { getRsvps, createRsvp, updateRsvp, deleteRsvp };