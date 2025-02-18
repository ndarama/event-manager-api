// controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Register User
const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { username, email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        // 🔹 Hash the password before saving
        const salt = await bcrypt.genSalt(10); // Generate salt
        const hashedPassword = await bcrypt.hash(password, salt); // Hash password

        user = new User({ username, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};

// Login User
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};

// Logout User
const logout = (req, res) => {
    res.json({ msg: 'User logged out successfully' });
};

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};

// Get user by ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ msg: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};

// Update user
const updateUser = async (req, res) => {
    try {
        const { username, email } = req.body;
        let user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });
        
        user.username = username || user.username;
        user.email = email || user.email;

        await user.save();
        res.json({ msg: 'User updated successfully', user });
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};

// Delete user
const deleteUser = async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });
        
        await User.findByIdAndDelete(req.params.id);
        res.json({ msg: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};

// Export all functions
module.exports = { register, login, logout, getUsers, getUserById, updateUser, deleteUser };
