const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({ msg: 'Unauthorized - Please log in' });
    }
    next();
};

module.exports = auth;
