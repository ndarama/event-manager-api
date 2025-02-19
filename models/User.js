const mongoose = require('mongoose'); 
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
    googleId: { type: String, unique: true, sparse: true },
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, select: false },
    tokens: [{ token: { type: String } }],  // Store only tokens
    createdAt: { type: Date, default: Date.now }
});

UserSchema.index({ googleId: 1, email: 1 }, { unique: true });

module.exports = mongoose.model('User', UserSchema);
